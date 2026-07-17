import { useMap } from 'react-leaflet';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectIsAdmin } from '../../features/auth/authSlice';
import { useUpdateStateMutation } from '../../features/listings/listingsApi';
import { recordStateUpdate } from '../../features/decisions/decisionsSlice';
import { updateListingStateMaloi } from '../../features/map/mapSlice';
import { addToast } from '../../features/ui/uiSlice';
import type { MapListingDTO, StateMaloi } from '../../types';
import PhotoGallery from './PhotoGallery';
import { googleMapsSearchUrl, googleMapsDirectionsUrl } from '../../utils/gmaps';

function timeAgo(unixTs: number): string {
  if (!unixTs) return '—';
  const diff = Date.now() - unixTs * 1000;
  const days = Math.floor(diff / 86400000);
  if (days < 1) return 'oggi';
  if (days < 30) return `${days}g fa`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}m fa`;
  return `${Math.floor(months / 12)}a fa`;
}

interface ListingPopupProps {
  listing: MapListingDTO;
  onClose: () => void;
  onOpenDetail: (id: number) => void;
}

export default function ListingPopup({ listing, onClose, onOpenDetail }: ListingPopupProps) {
  const dispatch = useAppDispatch();
  const map = useMap();
  const isAdmin = useAppSelector(selectIsAdmin);
  const [updateState, { isLoading }] = useUpdateStateMutation();

  const { latitude, longitude } = listing.location;

  function openGoogleMaps() {
    window.open(googleMapsSearchUrl(latitude ?? 0, longitude ?? 0), '_blank');
  }

  function openDirections() {
    window.open(
      googleMapsDirectionsUrl(listing.location.province, latitude ?? 0, longitude ?? 0),
      '_blank'
    );
  }

  async function setState(stateMaloi: StateMaloi) {
    try {
      await updateState({ id: listing.id, stateMaloi }).unwrap();
      dispatch(recordStateUpdate({ id: listing.id, stateMaloi }));
      dispatch(updateListingStateMaloi({ id: listing.id, stateMaloi }));
      dispatch(addToast({ message: 'Stato aggiornato', type: 'success' }));
      map.closePopup();
      onClose();
    } catch {
      dispatch(addToast({ message: 'Errore aggiornamento', type: 'error' }));
    }
  }

  const ascensore =
    listing.featureElevator ??
    (listing.elevator ? 'Sì' : listing.elevator === false ? 'No' : '—');

  const accessibilita =
    listing.accessibility === 1 ? '♿' : listing.accessibility === 0 ? '❌' : '🟡';

  return (
    <div className="popup-content">
      <h3>
        <a
          href={`https://www.immobiliare.it/annunci/${listing.id}`}
          target="_blank"
          rel="noreferrer"
        >
          {listing.title}
        </a>
      </h3>

      <div className="popup-field">
        <label>Prezzo</label>
        <span>{listing.priceFormatted}</span>
      </div>
      <div className="popup-field">
        <label>Contratto</label>
        <span>{listing.contractValue}</span>
      </div>
      <div className="popup-field">
        <label>Piano</label>
        <span>{listing.floor?.abbreviation ?? '—'}</span>
      </div>
      <div className="popup-field">
        <label>Ascensore</label>
        <span>{ascensore}</span>
      </div>
      <div className="popup-field">
        <label>Superficie</label>
        <span>{listing.surfaceValue ? `${listing.surfaceValue} m²` : '—'}</span>
      </div>
      <div className="popup-field">
        <label>Accessibilità</label>
        <span>{accessibilita}</span>
      </div>
      <div className="popup-field">
        <label>Pubblicato (Immobiliare)</label>
        <span>{timeAgo(listing.createdAt)}</span>
      </div>
      <div className="popup-field">
        <label>Aggiornato (Immobiliare)</label>
        <span>{timeAgo(listing.updatedAt)}</span>
      </div>
      <div className="popup-field">
        <label>Altitudine</label>
        <span>{listing.elevation != null ? `${Math.ceil(listing.elevation)} m` : '—'}</span>
      </div>

      <div className="popup-actions">
        <button className="btn-sm" title="Google Maps" onClick={openGoogleMaps}>
          📍
        </button>
        <button className="btn-sm" title="Indicazioni" onClick={openDirections}>
          🗺️
        </button>
        <button className="btn-sm" title="Dettagli" onClick={() => onOpenDetail(listing.id)}>
          ℹ️
        </button>
      </div>

      {isAdmin && (
        <div className="popup-state-btns">
          <button className="btn-sm" disabled={isLoading} onClick={() => setState(1)}>
            Buono 🟢
          </button>
          <button className="btn-sm" disabled={isLoading} onClick={() => setState(2)}>
            Così così 🟡
          </button>
          <button className="btn-sm" disabled={isLoading} onClick={() => setState(0)}>
            Non buono 🔴
          </button>
        </div>
      )}

      <PhotoGallery photos={listing.photos} />
    </div>
  );
}
