import { useState } from 'react';
import styled from '@emotion/styled';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectIsAdmin } from '../../features/auth/authSlice';
import {
  useGetListingByIdQuery,
  useUpdateStateMutation,
  useUpdateDescriptionMutation,
} from '../../features/listings/listingsApi';
import { recordStateUpdate, recordDescriptionUpdate } from '../../features/decisions/decisionsSlice';
import { addToast } from '../../features/ui/uiSlice';
import { NO_CHOICE_STATE, type ListingDetailDTO, type StateMaloi } from '../../types';
import PhotoGridModal from './PhotoGridModal';
import { googleMapsSearchUrl, googleMapsDirectionsUrl } from '../../utils/gmaps';

// ── Styled ─────────────────────────────────────────────────────────────────

const Overlay = styled.div`
  position: fixed; inset: 0; background: rgba(0,0,0,.48);
  display: flex; align-items: center; justify-content: center;
  z-index: 1000; padding: 16px;
`;
const Sheet = styled.div`
  background: #fff; border-radius: 20px;
  width: min(96vw, 720px); max-height: 92vh;
  display: flex; flex-direction: column; overflow: hidden;
  box-shadow: 0 24px 64px rgba(0,0,0,.2);
`;
const SheetHeader = styled.div`
  display: flex; align-items: flex-start; gap: 10px;
  padding: 20px 24px 14px; flex-shrink: 0;
  border-bottom: 1px solid #F1F2EE;
`;
const SheetTitle = styled.h2`
  margin: 0; font-size: 17px; font-weight: 700;
  letter-spacing: -.015em; color: #181B22; flex: 1;
`;
const SheetCaption = styled.p`
  margin: 3px 0 0; font-size: 13px; color: #5E6573; font-weight: 400; line-height: 1.4;
`;
const CloseBtn = styled.button`
  border: none; background: #F1F2EE; border-radius: 50%;
  width: 32px; height: 32px; font-size: 18px; line-height: 1;
  color: #5E6573; cursor: pointer; flex-shrink: 0;
`;
const Body = styled.div`
  overflow-y: auto; flex: 1; padding: 0 24px 28px;
`;

/* Gallery */
const Gallery = styled.div`
  position: relative; margin: 18px 0 10px; border-radius: 14px; overflow: hidden; background: #ECECE6;
`;
const GalleryImg = styled.img`width: 100%; height: 300px; object-fit: cover; display: block;`;
const GalleryPlaceholder = styled.div`
  height: 180px; display: flex; align-items: center; justify-content: center;
  color: #9097A2; font-size: 14px; font-style: italic;
`;
const GalleryNav = styled.button<{ $side: 'left' | 'right' }>`
  position: absolute; top: 50%; transform: translateY(-50%);
  ${({ $side }) => $side}: 10px;
  background: rgba(255,255,255,.88); border: none; border-radius: 50%;
  width: 36px; height: 36px; font-size: 20px; cursor: pointer; box-shadow: 0 2px 8px rgba(0,0,0,.15);
  display: flex; align-items: center; justify-content: center;
`;
const GalleryCaption = styled.div`
  position: absolute; bottom: 0; left: 0; right: 0;
  background: linear-gradient(transparent, rgba(0,0,0,.5));
  color: #fff; font-size: 12px; padding: 22px 14px 10px;
  display: flex; justify-content: space-between; align-items: flex-end;
`;
const GalleryDots = styled.div`display: flex; gap: 5px; justify-content: center; margin-bottom: 14px;`;
const Dot = styled.span<{ $active: boolean }>`
  width: 7px; height: 7px; border-radius: 50%; cursor: pointer;
  background: ${({ $active }) => ($active ? '#28528C' : '#D9D9D2')};
`;

/* Price block */
const PriceRow = styled.div`display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-bottom: 4px;`;
const DealBadge = styled.span<{ $sale: boolean }>`
  font-size: 11px; font-weight: 700; border-radius: 6px; padding: 4px 9px;
  background: ${({ $sale }) => ($sale ? '#F4ECE2' : '#EAF0F8')};
  color: ${({ $sale }) => ($sale ? '#A9683A' : '#28528C')};
`;
const StateBadge = styled.span<{ $state?: number | null }>`
  font-size: 11px; font-weight: 700; border-radius: 6px; padding: 4px 9px;
  background: ${({ $state }) => $state === 1 ? '#DCFCE7' : $state === 0 ? '#FEE2E2' : $state === 2 ? '#FEF9C3' : '#F1F2EE'};
  color: ${({ $state }) => $state === 1 ? '#16a34a' : $state === 0 ? '#dc2626' : $state === 2 ? '#ca8a04' : '#9097A2'};
`;
const ImmoLink = styled.a`
  margin-left: auto; font-size: 12px; font-weight: 600; color: #28528C;
  text-decoration: none; &:hover { text-decoration: underline; }
`;
const Price = styled.div`
  font-family: 'IBM Plex Mono', monospace; font-size: 26px; font-weight: 600;
  color: #181B22; letter-spacing: -.01em;
`;
const PricePerM2 = styled.span`
  font-size: 13px; color: #9097A2; font-weight: 400; margin-left: 10px;
`;

/* Section */
const SectionTitle = styled.div`
  font-size: 11px; font-weight: 700; color: #9097A2; text-transform: uppercase;
  letter-spacing: .06em; margin: 20px 0 10px;
`;
const Divider = styled.div`height: 1px; background: #F1F2EE; margin: 18px 0 0;`;

/* Details grid 2 col */
const Grid2 = styled.div`display: grid; grid-template-columns: 1fr 1fr; gap: 0;`;
const Cell = styled.div`
  padding: 8px 0; border-bottom: 1px solid #F1F2EE;
  &:nth-of-type(odd) { padding-right: 18px; }
`;
const CLabel = styled.div`font-size: 11px; font-weight: 700; color: #9097A2; text-transform: uppercase; letter-spacing: .04em; margin-bottom: 2px;`;
const CValue = styled.div`font-size: 14px; color: #181B22; font-weight: 500;`;

/* Feature chips */
const ChipGrid = styled.div`display: flex; flex-wrap: wrap; gap: 7px;`;
const FeatureChip = styled.span`
  background: #F1F2EE; color: #181B22; border-radius: 7px;
  padding: 5px 10px; font-size: 12px; font-weight: 600;
`;
const DescText = styled.p`
  margin: 0; font-size: 14px; color: #3B4151; line-height: 1.65; white-space: pre-line;
`;

/* Actions */
const ActionRow = styled.div`display: flex; gap: 8px; flex-wrap: wrap;`;
const ActionBtn = styled.button<{ $color: string; $active: boolean }>`
  flex: 1; min-width: 110px; padding: 11px 14px; border-radius: 10px; border: 2px solid;
  font-size: 13px; font-weight: 700; cursor: pointer; transition: all .12s;
  border-color: ${({ $color }) => $color};
  background: ${({ $active, $color }) => ($active ? $color : '#fff')};
  color: ${({ $active, $color }) => ($active ? '#fff' : $color)};
  &:disabled { opacity: .5; cursor: not-allowed; }
`;

/* Note */
const NoteArea = styled.textarea`
  width: 100%; resize: vertical; border-radius: 10px; font-size: 14px;
  border: 1px solid #E7E7E2; padding: 10px 12px; line-height: 1.55;
  color: #181B22; font-family: inherit; min-height: 80px;
  &:focus { outline: none; border-color: #28528C; }
`;
const SaveRow = styled.div`display: flex; justify-content: flex-end; margin-top: 8px;`;

const LoadingBox = styled.div`padding: 60px 0; text-align: center; color: #9097A2; font-size: 14px;`;
const ErrorBox = styled.div`
  padding: 16px; background: #FEF2F2; border: 1px solid #FECACA;
  border-radius: 10px; color: #dc2626; font-size: 14px; margin: 16px 0;
`;

// ── Helpers ────────────────────────────────────────────────────────────────

function fmt(ts?: number): string {
  if (!ts) return '—';
  return new Date(ts * 1000).toLocaleDateString('it-IT', { day: '2-digit', month: 'short', year: 'numeric' });
}

function D({ label, value }: { label: string; value?: string | number | null }) {
  if (value == null || value === '' || value === '—') return null;
  return (
    <Cell>
      <CLabel>{label}</CLabel>
      <CValue>{String(value)}</CValue>
    </Cell>
  );
}

const STATE_LABELS: Record<number, string> = {
  1: 'Buono',
  2: 'Così così',
  0: 'Non buono',
  [NO_CHOICE_STATE]: 'Senza scelta',
};

function buildFeatures(d: ListingDetailDTO): string[] {
  const out: string[] = [];
  if (d.hasBalcony) out.push('Balcone');
  if (d.hasTerrace) out.push('Terrazza');
  if (d.hasCellar) out.push('Cantina');
  if (d.hasGarden) out.push('Giardino');
  if (d.hasPool) out.push('Piscina');
  if (d.hasAlarm) out.push('Impianto allarme');
  if (d.hasVideoIntercom) out.push('Videocitofono');
  if (d.hasSecureDoor) out.push('Porta blindata');
  if (d.hasFiber) out.push('Fibra ottica');
  return out;
}

// ── Component ──────────────────────────────────────────────────────────────

interface Props {
  listingId: number;
  onClose: () => void;
}

export default function ListingDetailModal({ listingId, onClose }: Props) {
  const dispatch = useAppDispatch();
  const isAdmin = useAppSelector(selectIsAdmin);
  const { data, isLoading, isError } = useGetListingByIdQuery(listingId);
  const [updateState, { isLoading: savingState }] = useUpdateStateMutation();
  const [updateDescription, { isLoading: savingDesc }] = useUpdateDescriptionMutation();

  const [photoIdx, setPhotoIdx] = useState(0);
  const [showPhotoGrid, setShowPhotoGrid] = useState(false);
  const [note, setNote] = useState<string | undefined>(undefined);
  const [localState, setLocalState] = useState<StateMaloi | undefined>(undefined);

  const description = note ?? data?.description ?? '';
  const stateMaloi = (localState !== undefined ? localState : data?.stateMaloi) ?? NO_CHOICE_STATE;

  const photos = data?.photos ?? [];
  const photo = photos[photoIdx];
  const isSale = data?.type === 'Compra';
  const features = data ? buildFeatures(data) : [];

  const handleState = async (s: StateMaloi) => {
    setLocalState(s);
    dispatch(recordStateUpdate({ id: listingId, stateMaloi: s }));
    try {
      await updateState({ id: listingId, stateMaloi: s }).unwrap();
      dispatch(addToast({ message: 'Stato aggiornato', type: 'success' }));
    } catch {
      dispatch(addToast({ message: 'Errore aggiornamento stato', type: 'error' }));
    }
  };

  const handleSave = async () => {
    if (note === undefined) return;
    try {
      await updateDescription({ id: listingId, description: note }).unwrap();
      dispatch(recordDescriptionUpdate({ id: listingId, description: note }));
      dispatch(addToast({ message: 'Nota salvata', type: 'success' }));
    } catch {
      dispatch(addToast({ message: 'Errore salvataggio', type: 'error' }));
    }
  };

  return (
    <Overlay onMouseDown={onClose}>
      <Sheet onMouseDown={(e) => e.stopPropagation()}>
        <SheetHeader>
          <div style={{ flex: 1 }}>
            <SheetTitle>{data?.title ?? (isLoading ? 'Caricamento…' : '—')}</SheetTitle>
            {data?.caption && <SheetCaption>{data.caption}</SheetCaption>}
          </div>
          <CloseBtn onClick={onClose} aria-label="Chiudi">×</CloseBtn>
        </SheetHeader>

        <Body>
          {isLoading && <LoadingBox>Caricamento dati dalla base…</LoadingBox>}
          {isError && <ErrorBox>Errore nel caricamento. Riprova.</ErrorBox>}

          {data && (
            <>
              {/* ── Gallery ── */}
              <Gallery>
                {photo ? (
                  <>
                    <GalleryImg
                      src={photo.urls.medium || photo.urls.small}
                      alt={photo.caption ?? ''}
                      style={{ cursor: 'pointer' }}
                      onClick={() => setShowPhotoGrid(true)}
                    />
                    {photos.length > 1 && (
                      <>
                        <GalleryNav $side="left" onClick={() => setPhotoIdx(i => (i - 1 + photos.length) % photos.length)}>‹</GalleryNav>
                        <GalleryNav $side="right" onClick={() => setPhotoIdx(i => (i + 1) % photos.length)}>›</GalleryNav>
                      </>
                    )}
                    <GalleryCaption>
                      <span>{photo.caption ?? ''}</span>
                      <span style={{ fontFamily: "'IBM Plex Mono'", fontSize: 11 }}>{photoIdx + 1} / {photos.length}</span>
                    </GalleryCaption>
                  </>
                ) : (
                  <GalleryPlaceholder>Nessuna foto disponibile</GalleryPlaceholder>
                )}
              </Gallery>
              {photos.length > 1 && (
                <GalleryDots>
                  {photos.map((_, i) => <Dot key={i} $active={i === photoIdx} onClick={() => setPhotoIdx(i)} />)}
                </GalleryDots>
              )}

              {/* ── Price ── */}
              <PriceRow>
                <DealBadge $sale={isSale}>{isSale ? 'Vendita' : 'Affitto'}</DealBadge>
                <StateBadge $state={stateMaloi}>{STATE_LABELS[stateMaloi]}</StateBadge>
                <ImmoLink href={`https://www.immobiliare.it/annunci/${listingId}`} target="_blank" rel="noopener noreferrer">
                  Immobiliare.it ↗
                </ImmoLink>
                {data.latitude != null && data.longitude != null && (
                  <>
                    <ImmoLink
                      style={{ marginLeft: 0 }}
                      href={googleMapsSearchUrl(data.latitude, data.longitude)}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Google Maps"
                    >
                      📍 Maps
                    </ImmoLink>
                    <ImmoLink
                      style={{ marginLeft: 0 }}
                      href={googleMapsDirectionsUrl(data.province, data.latitude, data.longitude)}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Indicazioni"
                    >
                      🗺️ Indicazioni
                    </ImmoLink>
                  </>
                )}
              </PriceRow>
              <Price>
                {data.priceFormatted || '—'}
                {data.pricePerSquareMeter && <PricePerM2>{data.pricePerSquareMeter}/m²</PricePerM2>}
              </Price>

              {/* ── Posizione ── */}
              <Divider />
              <SectionTitle>Posizione</SectionTitle>
              <Grid2>
                <D label="Città" value={data.city} />
                <D label="Provincia" value={data.province} />
                <D label="Indirizzo" value={data.address} />
                <D label="Zona" value={data.macrozone} />
                <D label="Quartiere" value={data.microzone} />
              </Grid2>

              {/* ── Caratteristiche ── */}
              <Divider />
              <SectionTitle>Caratteristiche principali</SectionTitle>
              <Grid2>
                <D label="Superficie" value={data.surfaceValue ? `${data.surfaceValue} m²` : undefined} />
                <D label="Locali" value={data.rooms} />
                <D label="Bagni" value={data.bathrooms} />
                <D label="Piano" value={data.floor?.value} />
                <D label="Ascensore" value={data.elevator === true ? 'Sì' : data.elevator === false ? 'No' : data.featureElevator} />
                <D label="Arredamento" value={data.furniture} />
                <D label="Anno costruzione" value={data.buildingYear} />
                <D label="Garage" value={data.garage} />
                <D label="Disponibilità" value={data.availability} />
                <D label="Accessibile disabili" value={data.accessibility === 1 ? 'Sì' : data.accessibility === 0 ? 'No' : undefined} />
                <D label="Disponibile a studenti" value={data.availableToStudents != null ? (data.availableToStudents ? 'Sì' : 'No') : undefined} />
              </Grid2>

              {/* ── Costi ── */}
              {(data.condominiumExpenses || data.heatingExpenses || data.deposit) && (
                <>
                  <Divider />
                  <SectionTitle>Costi</SectionTitle>
                  <Grid2>
                    <D label="Spese condominiali" value={data.condominiumExpenses} />
                    <D label="Spese riscaldamento" value={data.heatingExpenses} />
                    <D label="Cauzione" value={data.deposit} />
                  </Grid2>
                </>
              )}

              {/* ── Energia ── */}
              {(data.energyClass || data.heatingType || data.airConditioning || data.epi) && (
                <>
                  <Divider />
                  <SectionTitle>Energia &amp; Impianti</SectionTitle>
                  <Grid2>
                    <D label="Classe energetica" value={data.energyClass} />
                    <D label="EPI" value={data.epi != null ? `${data.epi} ${data.epiUm ?? ''}`.trim() : undefined} />
                    <D label="Riscaldamento" value={data.heatingType} />
                    <D label="Aria condizionata" value={data.airConditioning} />
                  </Grid2>
                </>
              )}

              {/* ── Dotazioni ── */}
              {features.length > 0 && (
                <>
                  <Divider />
                  <SectionTitle>Dotazioni</SectionTitle>
                  <ChipGrid>
                    {features.map((f) => <FeatureChip key={f}>{f}</FeatureChip>)}
                  </ChipGrid>
                </>
              )}

              {/* ── Descrizione ── */}
              {data.propertyDescription && (
                <>
                  <Divider />
                  <SectionTitle>Descrizione</SectionTitle>
                  <DescText>{data.propertyDescription}</DescText>
                </>
              )}

              {/* ── Date ── */}
              <Divider />
              <SectionTitle>Date</SectionTitle>
              <Grid2>
                <D label="Pubblicato" value={fmt(data.createdAt)} />
                <D label="Aggiornato (portale)" value={fmt(data.updatedAt)} />
                <D label="Aggiornato (interno)" value={fmt(data.mLastUpdate)} />
              </Grid2>

              {/* ── Valutazione (solo admin — l'API rifiuta gli altri con 403) ── */}
              {isAdmin && (
                <>
                  <Divider />
                  <SectionTitle>Valutazione</SectionTitle>
                  <ActionRow>
                    <ActionBtn $color="#16a34a" $active={stateMaloi === 1} disabled={savingState} onClick={() => void handleState(1)}>✓ Buono</ActionBtn>
                    <ActionBtn $color="#ca8a04" $active={stateMaloi === 2} disabled={savingState} onClick={() => void handleState(2)}>~ Così così</ActionBtn>
                    <ActionBtn $color="#dc2626" $active={stateMaloi === 0} disabled={savingState} onClick={() => void handleState(0)}>✕ Non buono</ActionBtn>
                  </ActionRow>
                </>
              )}

              {/* ── Note ── */}
              <Divider />
              <SectionTitle>Note personali</SectionTitle>
              <NoteArea
                rows={4}
                value={description}
                placeholder="Aggiungi una nota su questo annuncio…"
                onChange={(e) => setNote(e.target.value)}
                disabled={savingDesc}
              />
              <SaveRow>
                <button className="btn btn-primary" disabled={savingDesc || note === undefined} onClick={() => void handleSave()}>
                  {savingDesc ? 'Salvataggio…' : 'Salva nota'}
                </button>
              </SaveRow>
            </>
          )}
        </Body>

        {/* Nested inside Sheet so overlay clicks that close the grid don't bubble past Sheet's stopPropagation and close this modal too */}
        {showPhotoGrid && (
          <PhotoGridModal listingId={listingId} onClose={() => setShowPhotoGrid(false)} />
        )}
      </Sheet>
    </Overlay>
  );
}
