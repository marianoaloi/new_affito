import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectFilters,
  setFilter,
  resetFilters,
} from '../../features/listings/listingsSlice';
import type {
  AccessibilityFilter,
  ElevatorFilter,
  StateMaloiFilter,
} from '../../features/map/mapSlice';

const SORT_FIELDS = [
  { value: '', label: 'Nessun ordinamento' },
  { value: 'price', label: 'Prezzo' },
  { value: 'surfaceValue', label: 'Superficie' },
  { value: 'mLastUpdate', label: 'Ultimo aggiornamento' },
];

export default function FilterBar() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectFilters);

  return (
    <div className="filter-bar">
      <select
        className="filter-select"
        value={filters.province}
        onChange={(e) => dispatch(setFilter({ key: 'province', value: e.target.value }))}
      >
        <option value="">Tutte le province</option>
        <option value="Udine">Udine</option>
        <option value="Trieste">Trieste</option>
        <option value="Padova">Padova</option>
      </select>

      <select
        className="filter-select"
        value={filters.type}
        onChange={(e) => dispatch(setFilter({ key: 'type', value: e.target.value }))}
      >
        <option value="">Tutti i tipi</option>
        <option value="a">Affito</option>
        <option value="c">Compra</option>
      </select>

      <select
        className="filter-select"
        value={filters.accessibility}
        onChange={(e) =>
          dispatch(setFilter({ key: 'accessibility', value: e.target.value as AccessibilityFilter }))
        }
      >
        <option value="">Tutti</option>
        <option value="accessible">Accessibili</option>
        <option value="not_accessible">Non accessibili</option>
        <option value="no_info">Nessuna info</option>
      </select>

      <select
        className="filter-select"
        value={filters.elevator}
        onChange={(e) =>
          dispatch(setFilter({ key: 'elevator', value: e.target.value as ElevatorFilter }))
        }
      >
        <option value="">Tutti</option>
        <option value="has">Con ascensore</option>
        <option value="no">Senza ascensore</option>
        <option value="no_info">Nessuna info</option>
      </select>

      <select
        className="filter-select"
        value={filters.stateMaloi}
        onChange={(e) =>
          dispatch(setFilter({ key: 'stateMaloi', value: e.target.value as StateMaloiFilter }))
        }
      >
        <option value="">Tutti gli stati</option>
        <option value="1">Buono</option>
        <option value="2">Così così</option>
        <option value="0">Non buono</option>
        <option value="empty">Senza scelta</option>
      </select>

      <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <input
          type="checkbox"
          checked={filters.terra}
          onChange={(e) => dispatch(setFilter({ key: 'terra', value: e.target.checked }))}
        />
        Solo terra (piano T)
      </label>

      <select
        className="filter-select"
        value={filters.sortField}
        onChange={(e) => dispatch(setFilter({ key: 'sortField', value: e.target.value }))}
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
        onChange={(e) => dispatch(setFilter({ key: 'sortOrder', value: e.target.value }))}
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
