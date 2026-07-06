import { NO_CHOICE_STATE, type StateMaloiOrNone } from '../../types';

interface StateBadgeProps {
  state?: StateMaloiOrNone;
}

const CONFIG: Record<StateMaloiOrNone, { label: string; className: string }> = {
  0: { label: 'Non buono', className: 'badge badge-red' },
  1: { label: 'Buono', className: 'badge badge-green' },
  2: { label: 'Così così', className: 'badge badge-yellow' },
  [NO_CHOICE_STATE]: { label: 'Senza scelta', className: 'badge badge-gray' },
};

export default function StateBadge({ state }: StateBadgeProps) {
  const { label, className } = CONFIG[state ?? NO_CHOICE_STATE];
  return <span className={className}>{label}</span>;
}
