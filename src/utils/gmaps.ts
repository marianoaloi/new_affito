const TRIESTE_POINT =
  'Train+station+Trieste+Centrale,+Piazza+della+Libert%C3%A0,+11,+34132+Trieste+TS';
const UDINE_POINT = 'V.le+Europa+Unita,+33100+Udine+UD';
const PADOVA_POINT = 'Stazione+di+Padova,+Piazzale+della+Stazione,+35131+Padova+PD';

export function googleMapsSearchUrl(latitude: number, longitude: number): string {
  return `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
}

export function googleMapsDirectionsUrl(
  province: string | undefined,
  latitude: number,
  longitude: number
): string {
  const origin =
    province === 'Udine' ? UDINE_POINT : province === 'Padova' ? PADOVA_POINT : TRIESTE_POINT;
  return `https://www.google.com/maps/dir/${origin}/${latitude},${longitude}`;
}
