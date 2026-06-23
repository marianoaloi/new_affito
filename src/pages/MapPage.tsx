import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useLazyGetMapListingsQuery } from '../features/map/mapApi';
import {
  selectFilteredListings,
  selectMapFilters,
  setAllListings,
  setError,
  setLoading,
  selectMapLoading,
  selectMapError,
} from '../features/map/mapSlice';
import MapFilters from '../components/map/MapFilters';
import MapView from '../components/map/MapView';
import { MapPageWrapper, MapStatus, MapContent, LoadingOverlay } from './MapPage.styled';

const PROVINCE_CENTERS: Record<string, { lat: number; lng: number; zoom: number }> = {
  Udine: { lat: 46.0689, lng: 13.2224, zoom: 13 },
  Trieste: { lat: 45.643837, lng: 13.795002, zoom: 13 },
  Padova: { lat: 45.4064, lng: 11.8768, zoom: 13 },
};

export default function MapPage() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectMapFilters);
  const filteredListings = useAppSelector(selectFilteredListings);
  const loading = useAppSelector(selectMapLoading);
  const error = useAppSelector(selectMapError);
  const [myLocation, setMyLocation] = useState<GeolocationCoordinates | null>(null);

  const [trigger] = useLazyGetMapListingsQuery();

  const fetchListings = useCallback(
    async (override?: { province?: string; type?: string }): Promise<void> => {
      dispatch(setLoading(true));
      try {
        const province = override?.province ?? filters.province;
        const type = override?.type ?? filters.type;
        const data = await trigger({ province, type: type || undefined }).unwrap();
        dispatch(setAllListings(data));
      } catch {
        dispatch(setError('Errore nel caricamento degli annunci'));
      }
    },
    [dispatch, trigger, filters.province, filters.type]
  );

  useEffect(() => {
    fetchListings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => setMyLocation(pos.coords),
      () => setMyLocation(null)
    );
  }, []);

  const center = useMemo(() => {
    return PROVINCE_CENTERS[filters.province] ?? PROVINCE_CENTERS.Udine;
  }, [filters.province]);

  return (
    <MapPageWrapper>
      <MapFilters onProvinceTypeChange={(override) => fetchListings(override)} />
      <MapStatus>
        {error ? (
          <span>
            {error}{' '}
            <button className="btn-sm" onClick={() => fetchListings()}>
              Riprova
            </button>
          </span>
        ) : (
          `${filteredListings.length} annunci visibili`
        )}
      </MapStatus>
      <MapContent>
        {loading && <LoadingOverlay>Caricamento...</LoadingOverlay>}
        <MapView
          listings={filteredListings}
          center={[center.lat, center.lng]}
          zoom={center.zoom}
          myLocation={myLocation}
        />
      </MapContent>
    </MapPageWrapper>
  );
}
