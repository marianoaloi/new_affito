import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useLazyGetMapListingsQuery } from '../features/map/mapApi';
import {
  selectFilteredListings,
  setAllListings,
  setError,
  setLoading,
  selectMapLoading,
  selectMapError,
} from '../features/map/mapSlice';
import { selectSharedFilters, setMapView } from '../features/shared/filtersSlice';
import { refreshDone, selectRefreshNonce } from '../features/ui/uiSlice';
import MapView from '../components/map/MapView';
import ListingDetailModal from '../components/listings/ListingDetailModal';
import {
  MapPageWrapper,
  MapContainer,
  LoadingOverlay,
  ErrorOverlay,
} from './MapPage.styled';

const PROVINCE_CENTERS: Record<string, { lat: number; lng: number; zoom: number }> = {
  Udine: { lat: 46.0689, lng: 13.2224, zoom: 13 },
  Trieste: { lat: 45.643837, lng: 13.795002, zoom: 13 },
  Padova: { lat: 45.4064, lng: 11.8768, zoom: 13 },
};

export default function MapPage() {
  const dispatch = useAppDispatch();
  const sharedFilters = useAppSelector(selectSharedFilters);
  const filteredListings = useAppSelector(selectFilteredListings);
  const loading = useAppSelector(selectMapLoading);
  const error = useAppSelector(selectMapError);
  const [myLocation, setMyLocation] = useState<GeolocationCoordinates | null>(null);
  const [detailId, setDetailId] = useState<number | null>(null);
  const refreshNonce = useAppSelector(selectRefreshNonce);

  const [trigger] = useLazyGetMapListingsQuery();

  const fetchListings = useCallback(async (): Promise<void> => {
    dispatch(setLoading(true));
    try {
      const province = sharedFilters.province || 'Udine';
      const type = sharedFilters.deal || undefined;
      // preferCacheValue false: the refresh button must always hit the server
      const data = await trigger({ province, type }, false).unwrap();
      dispatch(setAllListings(data));
    } catch {
      dispatch(setError('Errore nel caricamento degli annunci'));
    } finally {
      dispatch(refreshDone());
    }
  }, [dispatch, trigger, sharedFilters.province, sharedFilters.deal]);

  // Also re-runs when the sidebar's refresh button bumps refreshNonce
  useEffect(() => {
    fetchListings();
  }, [sharedFilters.province, sharedFilters.deal, refreshNonce]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => setMyLocation(pos.coords),
      () => setMyLocation(null)
    );
  }, []);

  // A saved viewport wins over the province default, so the position and zoom
  // survive re-renders, refetches and reloads. mapZoom 0 = never panned yet.
  const { mapLat, mapLng, mapZoom } = sharedFilters;
  const view = useMemo(() => {
    if (mapZoom > 0) return { lat: mapLat, lng: mapLng, zoom: mapZoom };
    return PROVINCE_CENTERS[sharedFilters.province] ?? PROVINCE_CENTERS.Udine;
  }, [mapLat, mapLng, mapZoom, sharedFilters.province]);

  // Changing city is the one case that should override a saved viewport.
  const prevProvince = useRef(sharedFilters.province);
  useEffect(() => {
    if (prevProvince.current === sharedFilters.province) return;
    prevProvince.current = sharedFilters.province;
    const c = PROVINCE_CENTERS[sharedFilters.province] ?? PROVINCE_CENTERS.Udine;
    dispatch(setMapView({ lat: c.lat, lng: c.lng, zoom: c.zoom }));
  }, [sharedFilters.province, dispatch]);

  const onViewChange = useCallback(
    (lat: number, lng: number, zoom: number) => {
      dispatch(setMapView({ lat, lng, zoom }));
    },
    [dispatch]
  );

  return (
    <MapPageWrapper>
      <MapContainer>
        <MapView
          listings={filteredListings}
          center={[view.lat, view.lng]}
          zoom={view.zoom}
          myLocation={myLocation}
          onOpenDetail={setDetailId}
          onViewChange={onViewChange}
        />
      </MapContainer>

      {/* Outside MapContainer: its z-index:0 stacking context would trap the modal below the drawer */}
      {detailId !== null && (
        <ListingDetailModal listingId={detailId} onClose={() => setDetailId(null)} />
      )}

      {loading && <LoadingOverlay>Caricamento...</LoadingOverlay>}

      {error && (
        <ErrorOverlay>
          <span>{error}</span>
          <button className="btn-sm" onClick={() => fetchListings()}>
            Riprova
          </button>
        </ErrorOverlay>
      )}
    </MapPageWrapper>
  );
}
