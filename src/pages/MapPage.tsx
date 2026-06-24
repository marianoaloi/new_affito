import { useCallback, useEffect, useMemo, useState } from 'react';
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
import { selectSharedFilters } from '../features/shared/filtersSlice';
import MapView from '../components/map/MapView';
import {
  MapPageWrapper,
  MapContainer,
  LegendOverlay,
  LegendTitle,
  LegendItem,
  LegendDot,
  LegendDivider,
  LegendCount,
  CounterOverlay,
  LoadingOverlay,
  ErrorOverlay,
} from './MapPage.styled';

const PROVINCE_CENTERS: Record<string, { lat: number; lng: number; zoom: number }> = {
  Udine: { lat: 46.0689, lng: 13.2224, zoom: 13 },
  Trieste: { lat: 45.643837, lng: 13.795002, zoom: 13 },
  Padova: { lat: 45.4064, lng: 11.8768, zoom: 13 },
};

const RENT_COLOR = '#28528C';
const SALE_COLOR = '#A9683A';

export default function MapPage() {
  const dispatch = useAppDispatch();
  const sharedFilters = useAppSelector(selectSharedFilters);
  const filteredListings = useAppSelector(selectFilteredListings);
  const loading = useAppSelector(selectMapLoading);
  const error = useAppSelector(selectMapError);
  const [myLocation, setMyLocation] = useState<GeolocationCoordinates | null>(null);

  const [trigger] = useLazyGetMapListingsQuery();

  const fetchListings = useCallback(async (): Promise<void> => {
    dispatch(setLoading(true));
    try {
      const province = sharedFilters.province || 'Udine';
      const type = sharedFilters.deal || undefined;
      const data = await trigger({ province, type }).unwrap();
      dispatch(setAllListings(data));
    } catch {
      dispatch(setError('Errore nel caricamento degli annunci'));
    }
  }, [dispatch, trigger, sharedFilters.province, sharedFilters.deal]);

  useEffect(() => {
    fetchListings();
  }, [sharedFilters.province, sharedFilters.deal]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => setMyLocation(pos.coords),
      () => setMyLocation(null)
    );
  }, []);

  const center = useMemo(() => {
    return PROVINCE_CENTERS[sharedFilters.province] ?? PROVINCE_CENTERS.Udine;
  }, [sharedFilters.province]);

  return (
    <MapPageWrapper>
      <MapContainer>
        <MapView
          listings={filteredListings}
          center={[center.lat, center.lng]}
          zoom={center.zoom}
          myLocation={myLocation}
        />
      </MapContainer>

      {loading && <LoadingOverlay>Caricamento...</LoadingOverlay>}

      <LegendOverlay>
        <LegendTitle>Legenda</LegendTitle>
        <LegendItem>
          <LegendDot $color={RENT_COLOR} />
          Affitto / Rent
        </LegendItem>
        <LegendItem>
          <LegendDot $color={SALE_COLOR} />
          Vendita / Sale
        </LegendItem>
        <LegendDivider />
        <LegendCount>{filteredListings.length} annunci · OSM</LegendCount>
      </LegendOverlay>

      <CounterOverlay>{filteredListings.length} annunci visibili</CounterOverlay>

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
