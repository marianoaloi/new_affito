import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { NO_CHOICE_STATE, type MapListingDTO, type StateMaloiOrNone } from '../../types';
import ListingPopup from './ListingPopup';

delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

function makeIcon(color: 'red' | 'green' | 'yellow' | 'blue') {
  const colors = { red: '#e53e3e', green: '#38a169', yellow: '#d69e2e', blue: '#3182ce' };
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="24" height="36">
    <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 24 12 24s12-15 12-24C24 5.4 18.6 0 12 0z" fill="${colors[color]}" stroke="white" stroke-width="1.5"/>
    <circle cx="12" cy="12" r="5" fill="white"/>
  </svg>`;
  return L.divIcon({
    html: svg,
    className: '',
    iconSize: [24, 36],
    iconAnchor: [12, 36],
    popupAnchor: [0, -36],
  });
}

function makeStarIcon() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="28" height="28">
    <path d="M16 2 L19.23 11.55 L29.32 11.67 L21.23 17.70 L24.23 27.33 L16 21.5 L7.77 27.33 L10.77 17.70 L2.69 11.67 L12.77 11.55 Z" fill="#3182ce" stroke="white" stroke-width="1.5" stroke-linejoin="round"/>
  </svg>`;
  return L.divIcon({
    html: svg,
    className: '',
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -14],
  });
}

function pinColor(stateMaloi: StateMaloiOrNone): 'red' | 'green' | 'yellow' | 'blue' {
  if (stateMaloi === 0) return 'red';
  if (stateMaloi === 1) return 'green';
  if (stateMaloi === 2) return 'yellow';
  return 'blue'; // NO_CHOICE_STATE (-1) — senza scelta
}

const myLocationIcon = L.divIcon({
  html: '🫵',
  className: 'my-location-icon',
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

/**
 * Applies a commanded view, but only when it actually differs from what the
 * user is currently looking at. Primitive deps (not a [lat, lng] array, which
 * is a new identity on every parent render) plus this guard are what keep the
 * map from snapping back to the province center while working on a listing.
 */
function MapCenterController({ lat, lng, zoom }: { lat: number; lng: number; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    const current = map.getCenter();
    const samePosition =
      Math.abs(current.lat - lat) < 1e-6 && Math.abs(current.lng - lng) < 1e-6;
    if (samePosition && map.getZoom() === zoom) return;
    map.setView([lat, lng], zoom);
  }, [lat, lng, zoom, map]);
  return null;
}

/** Reports the viewport after every pan/zoom so it can be persisted. */
function MapViewTracker({ onViewChange }: { onViewChange: MapViewProps['onViewChange'] }) {
  const report = (e: L.LeafletEvent) => {
    const map = e.target as L.Map;
    const center = map.getCenter();
    onViewChange?.(center.lat, center.lng, map.getZoom());
  };
  useMapEvents({ moveend: report, zoomend: report });
  return null;
}

interface MapViewProps {
  listings: MapListingDTO[];
  center: [number, number];
  zoom: number;
  myLocation: GeolocationCoordinates | null;
  onOpenDetail: (id: number) => void;
  /** Called on pan/zoom end with the live viewport. */
  onViewChange?: (lat: number, lng: number, zoom: number) => void;
}

export default function MapView({
  listings,
  center,
  zoom,
  myLocation,
  onOpenDetail,
  onViewChange,
}: MapViewProps) {
  return (
    <MapContainer center={center} zoom={zoom} className="map-container">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MapCenterController lat={center[0]} lng={center[1]} zoom={zoom} />
      <MapViewTracker onViewChange={onViewChange} />
      {listings.map((listing) => {
        const { latitude, longitude } = listing.location;
        if (latitude == null || longitude == null) return null;
        return (
          <Marker
            key={listing.id}
            icon={
              listing.followed === true
                ? makeStarIcon()
                : makeIcon(pinColor(listing.stateMaloi ?? NO_CHOICE_STATE))
            }
            position={[latitude, longitude]}
          >
            <Popup maxWidth={400}>
              <ListingPopup listing={listing} onClose={() => {}} onOpenDetail={onOpenDetail} />
            </Popup>
          </Marker>
        );
      })}
      {myLocation && (
        <Marker position={[myLocation.latitude, myLocation.longitude]} icon={myLocationIcon} />
      )}
    </MapContainer>
  );
}
