import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { toggleSelectId, selectSelectedIds } from '../../features/listings/listingsSlice';
import { useUpdateStateMutation } from '../../features/listings/listingsApi';
import { recordStateUpdate, selectDecision } from '../../features/decisions/decisionsSlice';
import { addToast } from '../../features/ui/uiSlice';
import StateBadge from './StateBadge';
import { NO_CHOICE_STATE, type ListingDTO, type StateMaloi } from '../../types';

const eur = new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' });

interface ListingRowProps {
  listing: ListingDTO;
  onEditDescription: (id: number, description: string) => void;
}

export default function ListingRow({ listing, onEditDescription }: ListingRowProps) {
  const dispatch = useAppDispatch();
  const selectedIds = useAppSelector(selectSelectedIds);
  const decision = useAppSelector(selectDecision(listing.id));
  const [updateState, { isLoading }] = useUpdateStateMutation();

  const stateMaloi = decision?.stateMaloi ?? listing.stateMaloi ?? NO_CHOICE_STATE;
  const description = decision?.description ?? listing.description ?? '';
  const checked = selectedIds.includes(listing.id);

  const setState = async (next: StateMaloi) => {
    dispatch(recordStateUpdate({ id: listing.id, stateMaloi: next }));
    try {
      await updateState({ id: listing.id, stateMaloi: next }).unwrap();
      dispatch(addToast({ message: 'Stato aggiornato', type: 'success' }));
    } catch {
      dispatch(addToast({ message: 'Errore aggiornamento stato', type: 'error' }));
    }
  };

  const price =
    typeof listing.price === 'number' && !Number.isNaN(listing.price)
      ? eur.format(listing.price)
      : listing.priceFormatted ?? '—';

  return (
    <tr>
      <td>
        <input
          type="checkbox"
          checked={checked}
          onChange={() => dispatch(toggleSelectId(listing.id))}
          aria-label={`Seleziona ${listing.title ?? listing.id}`}
        />
      </td>
      <td>{listing.title ?? '—'}</td>
      <td>{price}</td>
      <td>{listing.energyClass ?? '—'}</td>
      <td>{listing.surfaceValue ? `${listing.surfaceValue}` : '—'}</td>
      <td>{listing.contractValue ?? '—'}</td>
      <td>
        <StateBadge state={stateMaloi} />
      </td>
      <td>
        <div className="row-actions">
          <button
            className="btn-sm btn-green"
            disabled={isLoading}
            onClick={() => void setState(1)}
            title="Buono"
          >
            ✓
          </button>
          <button
            className="btn-sm btn-red"
            disabled={isLoading}
            onClick={() => void setState(0)}
            title="Non buono"
          >
            ✕
          </button>
          <button
            className="btn-sm btn-yellow"
            disabled={isLoading}
            onClick={() => void setState(2)}
            title="Così così"
          >
            ~
          </button>
          <button
            className="btn-sm btn-secondary"
            onClick={() => onEditDescription(listing.id, description)}
            title="Modifica descrizione"
          >
            ✎
          </button>
        </div>
      </td>
    </tr>
  );
}
