import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  setPage,
  selectAllIds,
  clearSelection,
  selectSelectedIds,
  selectPage,
  toggleSelectId,
} from '../features/listings/listingsSlice';
import { selectSharedFilters } from '../features/shared/filtersSlice';
import {
  useGetListingsQuery,
  useUpdateStateMutation,
} from '../features/listings/listingsApi';
import { recordStateUpdate, selectDecision } from '../features/decisions/decisionsSlice';
import { addToast, setListingsCount } from '../features/ui/uiSlice';
import BulkActionBar from '../components/listings/BulkActionBar';
import DescriptionModal from '../components/listings/DescriptionModal';
import ListingDetailModal from '../components/listings/ListingDetailModal';
import PhotoGridModal from '../components/listings/PhotoGridModal';
import StateBadge from '../components/listings/StateBadge';
import type { ListingDTO, ListingsQuery, StateMaloi } from '../types';
import {
  PageContent,
  PageHeader,
  HeaderText,
  PageTitle,
  PageSubtitle,
  HeaderControls,
  SortControl,
  StyleSwitcher,
  StyleBtn,
  ErrorBox,
  ClassicGrid,
  ClassicCard,
  CardImg,
  CardImgText,
  CardBody,
  CardTitle,
  CardSub,
  CardPrice,
  CardSpecs,
  ChipRow,
  Chip,
  DealBadge,
  HorizGrid,
  HorizCard,
  HorizImg,
  HorizBody,
  HorizPrice,
  CompactList,
  CompactRow,
  AccentBar,
  CompactBadge,
  CompactMain,
  CompactTitle,
  CompactSub,
  CompactSpecs,
  CompactPrice,
  CardActions,
  SelectCheck,
  EmptyState,
  Pagination,
  SkeletonCard,
} from './TabellaPage.styled';

type CardStyle = 'classic' | 'horiz' | 'compact';

const eur = new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' });

const SORT_FIELDS: { value: string; label: string }[] = [
  { value: '', label: 'Nessun ordinamento' },
  { value: 'price', label: 'Prezzo' },
  { value: 'surfaceValue', label: 'Superficie' },
  { value: 'mLastUpdate', label: 'Aggiornamento' },
];

interface ModalState {
  id: number;
  description: string;
}

function isSale(listing: ListingDTO): boolean {
  return listing.type === 'c';
}

function priceText(listing: ListingDTO): string {
  return typeof listing.price === 'number' && !Number.isNaN(listing.price)
    ? eur.format(listing.price)
    : listing.priceFormatted ?? '—';
}

function dealLabel(listing: ListingDTO): string {
  return isSale(listing) ? 'Vendita' : 'Affitto';
}

function specsText(listing: ListingDTO): string {
  const parts: string[] = [];
  if (listing.surfaceValue) parts.push(`${listing.surfaceValue}m²`);
  if (listing.floor?.value) parts.push(listing.floor.value);
  if (listing.energyClass) parts.push(listing.energyClass);
  return parts.length ? parts.join(' · ') : '—';
}

function perM2(listing: ListingDTO): string | null {
  const surface = Number(listing.surfaceValue);
  if (typeof listing.price !== 'number' || Number.isNaN(listing.price)) return null;
  if (!surface || Number.isNaN(surface)) return null;
  return `${eur.format(listing.price / surface)}/m²`;
}

function chips(listing: ListingDTO): string[] {
  const out: string[] = [];
  if (listing.elevator) out.push('Ascensore');
  if (listing.floor?.abbreviation === 'T') out.push('Piano terra');
  return out;
}

function accessibilityChip(listing: ListingDTO): { icon: string; label: string } {
  if (listing.accessibility === 1) return { icon: '♿', label: 'Accessibile' };
  if (listing.accessibility === 0) return { icon: '❌', label: 'Non accessibile' };
  return { icon: '🟡', label: 'Senza info' };
}

interface CardControlsProps {
  listing: ListingDTO;
  onEditDescription: (id: number, description: string) => void;
  onOpenDetail: (listing: ListingDTO) => void;
  onOpenPhotos: (listing: ListingDTO) => void;
}

function useCardControls({ listing, onEditDescription, onOpenDetail }: Omit<CardControlsProps, 'onOpenPhotos'>) {
  const dispatch = useAppDispatch();
  const selectedIds = useAppSelector(selectSelectedIds);
  const decision = useAppSelector(selectDecision(listing.id));
  const [updateState, { isLoading }] = useUpdateStateMutation();

  const stateMaloi = decision?.stateMaloi ?? listing.stateMaloi;
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

  const toggle = () => dispatch(toggleSelectId(listing.id));
  const edit = () => onEditDescription(listing.id, description);
  const openDetail = () => onOpenDetail(listing);

  return { stateMaloi, checked, isLoading, setState, toggle, edit, openDetail };
}

function CardActionButtons({
  isLoading,
  setState,
  edit,
}: {
  isLoading: boolean;
  setState: (s: StateMaloi) => void;
  edit: () => void;
}) {
  return (
    <CardActions>
      <button className="btn-sm btn-green" disabled={isLoading} onClick={() => setState(1)} title="Buono">
        ✓
      </button>
      <button className="btn-sm btn-red" disabled={isLoading} onClick={() => setState(0)} title="Non buono">
        ✕
      </button>
      <button className="btn-sm btn-yellow" disabled={isLoading} onClick={() => setState(2)} title="Così così">
        ~
      </button>
      <button className="btn-sm btn-secondary" onClick={edit} title="Modifica descrizione">
        ✎
      </button>
    </CardActions>
  );
}

function ClassicListingCard({ listing, onEditDescription, onOpenDetail, onOpenPhotos }: CardControlsProps) {
  const { stateMaloi, checked, isLoading, setState, toggle, edit, openDetail } = useCardControls({
    listing,
    onEditDescription,
    onOpenDetail,
  });
  const sale = isSale(listing);
  const tags = chips(listing);
  const accessibility = accessibilityChip(listing);

  return (
    <ClassicCard>
      <CardImg
        $url={listing.photo?.urls.small}
        onClick={listing.photo ? () => onOpenPhotos(listing) : undefined}
        style={listing.photo ? { cursor: 'pointer' } : undefined}
      >
        <DealBadge $sale={sale}>{dealLabel(listing)}</DealBadge>
        {!listing.photo && <CardImgText>foto</CardImgText>}
      </CardImg>
      <CardBody>
        <CardTitle style={{ cursor: 'pointer' }} onClick={openDetail}>{listing.title ?? '—'}</CardTitle>
        <CardSub>
          {listing.province ?? '—'}
          {listing.contractValue ? ` · ${listing.contractValue}` : ''}
        </CardSub>
        <a
          href={`https://www.immobiliare.it/annunci/${listing.id}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'none' }}
        >
          <CardPrice style={{ cursor: 'pointer' }}>{priceText(listing)}</CardPrice>
        </a>
        <CardSpecs>{specsText(listing)}</CardSpecs>
        <ChipRow>
          {tags.map((c) => (
            <Chip key={c}>{c}</Chip>
          ))}
          <Chip>{accessibility.icon} {accessibility.label}</Chip>
        </ChipRow>
        <ChipRow>
          <StateBadge state={stateMaloi} />
          <label>
            <SelectCheck
              type="checkbox"
              checked={checked}
              onChange={toggle}
              aria-label={`Seleziona ${listing.title ?? listing.id}`}
            />
          </label>
        </ChipRow>
        <CardActionButtons isLoading={isLoading} setState={(s) => void setState(s)} edit={edit} />
      </CardBody>
    </ClassicCard>
  );
}

function HorizListingCard({ listing, onEditDescription, onOpenDetail, onOpenPhotos }: CardControlsProps) {
  const { stateMaloi, checked, isLoading, setState, toggle, edit, openDetail } = useCardControls({
    listing,
    onEditDescription,
    onOpenDetail,
  });
  const sale = isSale(listing);
  const m2 = perM2(listing);
  const accessibility = accessibilityChip(listing);

  return (
    <HorizCard>
      <HorizImg
        $url={listing.photo?.urls.small}
        onClick={listing.photo ? () => onOpenPhotos(listing) : undefined}
        style={listing.photo ? { cursor: 'pointer' } : undefined}
      >
        <DealBadge $sale={sale}>{dealLabel(listing)}</DealBadge>
        {!listing.photo && <CardImgText>foto</CardImgText>}
      </HorizImg>
      <HorizBody>
        <CardTitle style={{ cursor: 'pointer' }} onClick={openDetail}>{listing.title ?? '—'}</CardTitle>
        <CardSub>
          {listing.province ?? '—'}
          {listing.contractValue ? ` · ${listing.contractValue}` : ''}
        </CardSub>
        <a
          href={`https://www.immobiliare.it/annunci/${listing.id}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'none' }}
        >
          <HorizPrice style={{ cursor: 'pointer' }}>{priceText(listing)}</HorizPrice>
        </a>
        <CardSpecs>
          {specsText(listing)}
          {m2 ? ` · ${m2}` : ''}
        </CardSpecs>
        <ChipRow>
          <Chip>{accessibility.icon} {accessibility.label}</Chip>
        </ChipRow>
        <ChipRow>
          <StateBadge state={stateMaloi} />
          <label>
            <SelectCheck
              type="checkbox"
              checked={checked}
              onChange={toggle}
              aria-label={`Seleziona ${listing.title ?? listing.id}`}
            />
          </label>
        </ChipRow>
        <CardActionButtons isLoading={isLoading} setState={(s) => void setState(s)} edit={edit} />
      </HorizBody>
    </HorizCard>
  );
}

function CompactListingRow({ listing, onEditDescription, onOpenDetail }: CardControlsProps) {
  const { stateMaloi, checked, isLoading, setState, toggle, edit, openDetail } = useCardControls({
    listing,
    onEditDescription,
    onOpenDetail,
  });
  const sale = isSale(listing);
  const accessibility = accessibilityChip(listing);

  return (
    <CompactRow>
      <AccentBar $sale={sale} />
      <SelectCheck
        type="checkbox"
        checked={checked}
        onChange={toggle}
        aria-label={`Seleziona ${listing.title ?? listing.id}`}
      />
      <CompactBadge>
        <DealBadge $sale={sale}>{dealLabel(listing)}</DealBadge>
      </CompactBadge>
      <CompactMain>
        <CompactTitle style={{ cursor: 'pointer' }} onClick={openDetail}>{listing.title ?? '—'}</CompactTitle>
        <CompactSub>
          {listing.province ?? '—'}
          {listing.contractValue ? ` · ${listing.contractValue}` : ''}
        </CompactSub>
      </CompactMain>
      <CompactSpecs>{specsText(listing)}</CompactSpecs>
      <Chip>{accessibility.icon} {accessibility.label}</Chip>
      <StateBadge state={stateMaloi} />
      <CardActionButtons isLoading={isLoading} setState={(s) => void setState(s)} edit={edit} />
      <a
        href={`https://www.immobiliare.it/annunci/${listing.id}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: 'none' }}
      >
        <CompactPrice style={{ cursor: 'pointer' }}>{priceText(listing)}</CompactPrice>
      </a>
    </CompactRow>
  );
}

export default function TabellaPage() {
  const dispatch = useAppDispatch();
  const sharedFilters = useAppSelector(selectSharedFilters);
  const page = useAppSelector(selectPage);
  const selectedIds = useAppSelector(selectSelectedIds);

  const [cardStyle, setCardStyle] = useState<CardStyle>('classic');
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [modal, setModal] = useState<ModalState | null>(null);
  const [detailId, setDetailId] = useState<number | null>(null);
  const [photoGridId, setPhotoGridId] = useState<number | null>(null);

  const query: ListingsQuery = {
    page,
    limit: 20,
    province: sharedFilters.province || undefined,
    type: sharedFilters.deal || undefined,
    stateMaloi: sharedFilters.stateMaloi || undefined,
    accessibility: sharedFilters.accessibility || undefined,
    elevator: sharedFilters.elevator || undefined,
    terra: sharedFilters.terra ? 'true' : undefined,
    sortField: sortField || undefined,
    sortOrder: sortField ? sortOrder : undefined,
  };

  const { data, isLoading, isFetching, isError, refetch } = useGetListingsQuery(query);

  useEffect(() => {
    dispatch(setListingsCount(data?.total ?? 0));
  }, [data?.total, dispatch]);

  const rows = data?.data ?? [];
  const totalPages = data?.pages ?? 1;
  const currentPage = data?.page ?? page;

  const allSelected = rows.length > 0 && rows.every((r) => selectedIds.includes(r.id));
  const toggleAll = () => {
    if (allSelected) {
      dispatch(clearSelection());
    } else {
      dispatch(selectAllIds(rows.map((r) => r.id)));
    }
  };

  const onEditDescription = (id: number, description: string) => setModal({ id, description });
  const onOpenDetail = (listing: ListingDTO) => setDetailId(listing.id);
  const onOpenPhotos = (listing: ListingDTO) => setPhotoGridId(listing.id);

  const renderCards = () => {
    if (cardStyle === 'horiz') {
      return (
        <HorizGrid>
          {rows.map((l) => (
            <HorizListingCard key={l.id} listing={l} onEditDescription={onEditDescription} onOpenDetail={onOpenDetail} onOpenPhotos={onOpenPhotos} />
          ))}
        </HorizGrid>
      );
    }
    if (cardStyle === 'compact') {
      return (
        <CompactList>
          {rows.map((l) => (
            <CompactListingRow key={l.id} listing={l} onEditDescription={onEditDescription} onOpenDetail={onOpenDetail} onOpenPhotos={onOpenPhotos} />
          ))}
        </CompactList>
      );
    }
    return (
      <ClassicGrid>
        {rows.map((l) => (
          <ClassicListingCard key={l.id} listing={l} onEditDescription={onEditDescription} onOpenDetail={onOpenDetail} onOpenPhotos={onOpenPhotos} />
        ))}
      </ClassicGrid>
    );
  };

  return (
    <PageContent>
      <PageHeader>
        <HeaderText>
          <PageTitle>Annunci</PageTitle>
          <PageSubtitle>Tre varianti di scheda · scegli uno stile</PageSubtitle>
        </HeaderText>
        <HeaderControls>
          <SortControl>
            <select value={sortField} onChange={(e) => setSortField(e.target.value)}>
              {SORT_FIELDS.map((f) => (
                <option key={f.value} value={f.value}>
                  {f.label}
                </option>
              ))}
            </select>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
              disabled={!sortField}
            >
              <option value="asc">Crescente</option>
              <option value="desc">Decrescente</option>
            </select>
          </SortControl>
          <StyleSwitcher>
            <StyleBtn $active={cardStyle === 'classic'} onClick={() => setCardStyle('classic')}>
              Classica
            </StyleBtn>
            <StyleBtn $active={cardStyle === 'horiz'} onClick={() => setCardStyle('horiz')}>
              Orizzontale
            </StyleBtn>
            <StyleBtn $active={cardStyle === 'compact'} onClick={() => setCardStyle('compact')}>
              Compatta
            </StyleBtn>
          </StyleSwitcher>
        </HeaderControls>
      </PageHeader>

      <BulkActionBar />

      {rows.length > 0 && (
        <CardActions style={{ marginBottom: 16 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}>
            <SelectCheck
              type="checkbox"
              checked={allSelected}
              onChange={toggleAll}
              aria-label="Seleziona tutti"
            />
            Seleziona tutti
          </label>
        </CardActions>
      )}

      {isError ? (
        <ErrorBox>
          Errore nel caricamento.
          <button className="btn btn-secondary" onClick={() => void refetch()}>
            Riprova
          </button>
        </ErrorBox>
      ) : isLoading ? (
        <ClassicGrid>
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </ClassicGrid>
      ) : rows.length === 0 ? (
        <EmptyState>
          <h2>Nessun annuncio</h2>
          <p>Modifica i filtri per vedere altri risultati.</p>
        </EmptyState>
      ) : (
        renderCards()
      )}

      {!isError && totalPages > 1 && (
        <Pagination>
          <button
            className="btn btn-secondary"
            disabled={currentPage <= 1 || isFetching}
            onClick={() => dispatch(setPage(currentPage - 1))}
          >
            Precedente
          </button>
          <span>{`Pagina ${currentPage} di ${totalPages}`}</span>
          <button
            className="btn btn-secondary"
            disabled={currentPage >= totalPages || isFetching}
            onClick={() => dispatch(setPage(currentPage + 1))}
          >
            Successiva
          </button>
        </Pagination>
      )}

      {modal && (
        <DescriptionModal
          listingId={modal.id}
          currentDescription={modal.description}
          onClose={() => setModal(null)}
        />
      )}

      {detailId !== null && (
        <ListingDetailModal
          listingId={detailId}
          onClose={() => setDetailId(null)}
        />
      )}

      {photoGridId !== null && (
        <PhotoGridModal
          listingId={photoGridId}
          onClose={() => setPhotoGridId(null)}
        />
      )}
    </PageContent>
  );
}
