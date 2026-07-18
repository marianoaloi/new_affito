import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectSelectedIds,
  clearSelection,
} from '../../features/listings/listingsSlice';
import { useBulkUpdateStateMutation } from '../../features/listings/listingsApi';
import { recordStateUpdate } from '../../features/decisions/decisionsSlice';
import { addToast } from '../../features/ui/uiSlice';
import { selectIsAdmin } from '../../features/auth/authSlice';
import type { StateMaloi } from '../../types';

const ACTIONS: { state: StateMaloi; label: string; className: string }[] = [
  { state: 1, label: 'Buono', className: 'btn btn-green' },
  { state: 0, label: 'Non buono', className: 'btn btn-red' },
  { state: 2, label: 'Così così', className: 'btn btn-yellow' },
];

export default function BulkActionBar() {
  const dispatch = useAppDispatch();
  const selectedIds = useAppSelector(selectSelectedIds);
  const isAdmin = useAppSelector(selectIsAdmin);
  const [bulkUpdateState, { isLoading }] = useBulkUpdateStateMutation();
  const [pending, setPending] = useState<StateMaloi | null>(null);

  if (selectedIds.length === 0) return null;

  const apply = async (stateMaloi: StateMaloi) => {
    try {
      await bulkUpdateState({ ids: selectedIds, stateMaloi }).unwrap();
      selectedIds.forEach((id) => dispatch(recordStateUpdate({ id, stateMaloi })));
      dispatch(addToast({ message: `Stato applicato a ${selectedIds.length} affitti`, type: 'success' }));
      dispatch(clearSelection());
    } catch {
      dispatch(addToast({ message: 'Errore aggiornamento di gruppo', type: 'error' }));
    } finally {
      setPending(null);
    }
  };

  return (
    <div className="bulk-bar">
      <span className="bulk-count">{selectedIds.length} selezionati</span>
      {pending === null ? (
        <>
          {isAdmin && ACTIONS.map((a) => (
            <button
              key={a.state}
              className={a.className}
              disabled={isLoading}
              onClick={() => setPending(a.state)}
            >
              {a.label}
            </button>
          ))}
          <button
            className="btn btn-secondary"
            disabled={isLoading}
            onClick={() => dispatch(clearSelection())}
          >
            Deseleziona
          </button>
        </>
      ) : (
        <>
          <span className="bulk-confirm">
            Applicare stato a {selectedIds.length} affitti?
          </span>
          <button
            className="btn btn-primary"
            disabled={isLoading}
            onClick={() => void apply(pending)}
          >
            {isLoading ? 'Applicazione…' : 'Conferma'}
          </button>
          <button
            className="btn btn-secondary"
            disabled={isLoading}
            onClick={() => setPending(null)}
          >
            Annulla
          </button>
        </>
      )}
    </div>
  );
}
