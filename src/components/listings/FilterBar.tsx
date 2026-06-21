import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectFilters,
  setFilter,
  resetFilters,
  type ListingsFilters,
} from '../../features/listings/listingsSlice';

const SORT_FIELDS = [
  { value: '', label: 'Nessun ordinamento' },
  { value: 'price', label: 'Prezzo' },
  { value: 'surfaceValue', label: 'Superficie' },
  { value: 'mLastUpdate', label: 'Ultimo aggiornamento' },
];

export default function FilterBar() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectFilters);

  const update = (key: keyof ListingsFilters, value: string) =>
    dispatch(setFilter({ key, value }));

  return (
    <div className="filter-bar">
      <select
        className="filter-select"
        value={filters.province}
        onChange={(e) => update('province', e.target.value)}
      >
        <option value="">Tutte le province</option>
        <option value="Udine">Udine</option>
        <option value="Trieste">Trieste</option>
        <option value="Padova">Padova</option>
      </select>
      <select
        className="filter-select"
        value={filters.type}
        onChange={(e) => update('type', e.target.value)}
      >
        <option value="">Tutti i tipi</option>
        <option value="a">Affito</option>
        <option value="c">Compra</option>
      </select>
      <select
        className="filter-select"
        value={filters.stateMaloi}
        onChange={(e) => update('stateMaloi', e.target.value)}
      >
        <option value="">Tutti gli stati</option>
        <option value="1">Buono</option>
        <option value="0">Non buono</option>
        <option value="2">Così così</option>
        <option value="empty">Senza scelta</option>
      </select>
      <select
        className="filter-select"
        value={filters.sortField}
        onChange={(e) => update('sortField', e.target.value)}
      >
        {SORT_FIELDS.map((f) => (
          <option key={f.value} value={f.value}>
            {f.label}
          </option>
        ))}
      </select>
      <select
        className="filter-select"
        value={filters.sortOrder}
        onChange={(e) => update('sortOrder', e.target.value)}
        disabled={!filters.sortField}
      >
        <option value="asc">Crescente</option>
        <option value="desc">Decrescente</option>
      </select>
      <button className="btn btn-secondary" onClick={() => dispatch(resetFilters())}>
        Reset
      </button>
    </div>
  );
}
