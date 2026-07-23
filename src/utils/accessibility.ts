export interface AccessibilityIcon {
  icon: string;
  label: string;
}

interface ListingAccessibilityFields {
  accessibility?: number | null;
  elevator?: boolean;
  floor?: { abbreviation?: string | null };
}

export function getAccessibilityIcon(listing: ListingAccessibilityFields): AccessibilityIcon {
  if (listing.accessibility === 1) return { icon: '♿', label: 'Accessibile' };
  if (listing.accessibility === 0) return { icon: '❌', label: 'Non accessibile' };

  const abbreviation = listing.floor?.abbreviation;
  if (listing.elevator === false && abbreviation) {
    return abbreviation.includes('T')
      ? { icon: '✅', label: 'Piano terra, senza ascensore' }
      : { icon: '⛔️', label: 'Senza ascensore, non piano terra' };
  }

  return { icon: '🟡', label: 'Senza info' };
}
