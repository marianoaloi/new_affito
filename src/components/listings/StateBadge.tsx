import type { StateMaloi } from '../../types';

interface StateBadgeProps {
  state?: StateMaloi;
}

const CONFIG: Record<StateMaloi, { label: string; className: string }> = {
  0: { label: 'Non buono', className: 'badge badge-red' },
  1: { label: 'Buono', className: 'badge badge-green' },
  2: { label: 'Così così', className: 'badge badge-yellow' },
};

export default function StateBadge({ state }: StateBadgeProps) {
  if (state === undefined || !(state in CONFIG)) {
    return <span className="badge badge-gray">—</span>;
  }
  const { label, className } = CONFIG[state];
  return <span className={className}>{label}</span>;
}
