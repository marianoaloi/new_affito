import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectToasts, removeToast } from '../features/ui/uiSlice';

export default function Toasts() {
  const toasts = useAppSelector(selectToasts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (toasts.length === 0) return;
    const timers = toasts.map((t) =>
      setTimeout(() => dispatch(removeToast(t.id)), 4000)
    );
    return () => timers.forEach(clearTimeout);
  }, [toasts, dispatch]);

  if (toasts.length === 0) return null;

  return (
    <div className="toasts">
      {toasts.map((t) => (
        <div key={t.id} className={`toast toast-${t.type}`} onClick={() => dispatch(removeToast(t.id))}>
          {t.message}
        </div>
      ))}
    </div>
  );
}
