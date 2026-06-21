import { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { useUpdateDescriptionMutation } from '../../features/listings/listingsApi';
import { recordDescriptionUpdate } from '../../features/decisions/decisionsSlice';
import { addToast } from '../../features/ui/uiSlice';

interface DescriptionModalProps {
  listingId: number;
  currentDescription: string;
  onClose: () => void;
}

export default function DescriptionModal({
  listingId,
  currentDescription,
  onClose,
}: DescriptionModalProps) {
  const dispatch = useAppDispatch();
  const [text, setText] = useState(currentDescription);
  const [updateDescription, { isLoading }] = useUpdateDescriptionMutation();

  const isDirty = text !== currentDescription;

  const handleClose = () => {
    if (isDirty && !window.confirm('Modifiche non salvate. Chiudere comunque?')) {
      return;
    }
    onClose();
  };

  const handleSave = async () => {
    try {
      await updateDescription({ id: listingId, description: text }).unwrap();
      dispatch(recordDescriptionUpdate({ id: listingId, description: text }));
      dispatch(addToast({ message: 'Descrizione salvata', type: 'success' }));
      onClose();
    } catch {
      dispatch(addToast({ message: 'Errore nel salvataggio', type: 'error' }));
    }
  };

  return (
    <div className="modal-overlay" onMouseDown={handleClose}>
      <div className="modal" onMouseDown={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Modifica descrizione</h3>
          <button className="modal-close" onClick={handleClose} aria-label="Chiudi">
            ×
          </button>
        </div>
        <label className="modal-label" htmlFor="description-text">
          Descrizione
        </label>
        <textarea
          id="description-text"
          className="modal-textarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={6}
          disabled={isLoading}
        />
        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={handleClose} disabled={isLoading}>
            Annulla
          </button>
          <button className="btn btn-primary" onClick={() => void handleSave()} disabled={isLoading}>
            {isLoading ? 'Salvataggio…' : 'Salva'}
          </button>
        </div>
      </div>
    </div>
  );
}
