import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  selectFilters,
  setPage,
  selectAllIds,
  clearSelection,
  selectSelectedIds,
} from '../features/listings/listingsSlice';
import { useGetListingsQuery } from '../features/listings/listingsApi';
import FilterBar from '../components/listings/FilterBar';
import BulkActionBar from '../components/listings/BulkActionBar';
import ListingRow from '../components/listings/ListingRow';
import DescriptionModal from '../components/listings/DescriptionModal';
import type { ListingsQuery } from '../types';
import {
  PageWrapper,
  ErrorBox,
  TableWrap,
  StyledTable,
  EmptyCell,
  Pagination,
  SkeletonCell,
} from './TabellaPage.styled';

interface ModalState {
  id: number;
  description: string;
}

export default function TabellaPage() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectFilters);
  const selectedIds = useAppSelector(selectSelectedIds);
  const [modal, setModal] = useState<ModalState | null>(null);

  const query: ListingsQuery = {
    page: filters.page,
    limit: filters.limit,
    province: filters.province || undefined,
    type: filters.type || undefined,
    stateMaloi: filters.stateMaloi || undefined,
    accessibility: filters.accessibility || undefined,
    elevator: filters.elevator || undefined,
    terra: filters.terra ? 'true' : undefined,
    sortField: filters.sortField || undefined,
    sortOrder: filters.sortField ? filters.sortOrder : undefined,
  };

  const { data, isLoading, isFetching, isError, refetch } = useGetListingsQuery(query);

  const rows = data?.data ?? [];
  const totalPages = data?.pages ?? 1;
  const currentPage = data?.page ?? filters.page;

  const allSelected = rows.length > 0 && rows.every((r) => selectedIds.includes(r.id));
  const toggleAll = () => {
    if (allSelected) {
      dispatch(clearSelection());
    } else {
      dispatch(selectAllIds(rows.map((r) => r.id)));
    }
  };

  return (
    <PageWrapper>
      <h1>Tabella affitti</h1>
      <FilterBar />
      <BulkActionBar />

      {isError ? (
        <ErrorBox>
          Errore nel caricamento.
          <button className="btn btn-secondary" onClick={() => void refetch()}>
            Riprova
          </button>
        </ErrorBox>
      ) : (
        <TableWrap>
          <StyledTable>
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleAll}
                    aria-label="Seleziona tutti"
                  />
                </th>
                <th>Titolo</th>
                <th>Prezzo</th>
                <th>Classe energetica</th>
                <th>Superficie</th>
                <th>Contratto</th>
                <th>Stato</th>
                <th>Azioni</th>
              </tr>
            </thead>
            <tbody>
              {isLoading
                ? Array.from({ length: filters.limit }).map((_, i) => (
                    <tr key={`skeleton-${i}`}>
                      {Array.from({ length: 8 }).map((__, j) => (
                        <td key={j}>
                          <SkeletonCell />
                        </td>
                      ))}
                    </tr>
                  ))
                : rows.map((listing) => (
                    <ListingRow
                      key={listing.id}
                      listing={listing}
                      onEditDescription={(id, description) => setModal({ id, description })}
                    />
                  ))}
              {!isLoading && rows.length === 0 && (
                <tr>
                  <EmptyCell colSpan={8}>Nessun risultato</EmptyCell>
                </tr>
              )}
            </tbody>
          </StyledTable>
        </TableWrap>
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
    </PageWrapper>
  );
}
