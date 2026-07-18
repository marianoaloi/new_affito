import { useState } from 'react';
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
import {
  Overlay,
  Sheet,
  SheetHeader,
  SheetTitle,
  SheetCaption,
  CloseBtn,
  Body,
  Gallery,
  GalleryImg,
  GalleryPlaceholder,
  GalleryNav,
  GalleryCaption,
  GalleryDots,
  Dot,
  PriceRow,
  DealBadge,
  StateBadge,
  ImmoLink,
  Price,
  PricePerM2,
  SectionTitle,
  Divider,
  Grid2,
  Cell,
  CLabel,
  CValue,
  ChipGrid,
  FeatureChip,
  DescText,
  ActionRow,
  ActionBtn,
  NoteArea,
  SaveRow,
  LoadingBox,
  ErrorBox,
} from './ListingDetailModal.styled';

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
