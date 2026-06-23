import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectMapFilters,
  setMapFilter,
  type AccessibilityFilter,
  type ElevatorFilter,
  type StateMaloiFilter,
} from '../../features/map/mapSlice';

interface MapFiltersProps {
  onProvinceTypeChange: (override?: { province?: string; type?: string }) => void;
}

export default function MapFilters({ onProvinceTypeChange }: MapFiltersProps) {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectMapFilters);

  return (
    <div className="map-filter-bar">
      <select
        className="filter-select"
        value={filters.province}
        onChange={(e) => {
          dispatch(setMapFilter({ key: 'province', value: e.target.value }));
          onProvinceTypeChange({ province: e.target.value });
        }}
      >
        <option value="Udine">Udine</option>
        <option value="Trieste">Trieste</option>
        <option value="Padova">Padova</option>
      </select>

      <select
        className="filter-select"
        value={filters.type}
        onChange={(e) => {
          dispatch(setMapFilter({ key: 'type', value: e.target.value }));
          onProvinceTypeChange({ type: e.target.value });
        }}
      >
        <option value="a">Affito</option>
        <option value="c">Compra</option>
      </select>

      <select
        className="filter-select"
        value={filters.accessibility}
        onChange={(e) =>
          dispatch(
            setMapFilter({ key: 'accessibility', value: e.target.value as AccessibilityFilter })
          )
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
          dispatch(setMapFilter({ key: 'elevator', value: e.target.value as ElevatorFilter }))
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
          dispatch(setMapFilter({ key: 'stateMaloi', value: e.target.value as StateMaloiFilter }))
        }
      >
        <option value="">Tutti</option>
        <option value="1">Buono</option>
        <option value="2">Così così</option>
        <option value="0">Non buono</option>
        <option value="empty">Senza Scelta</option>
      </select>

      <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <input
          type="checkbox"
          checked={filters.terra}
          onChange={(e) => dispatch(setMapFilter({ key: 'terra', value: e.target.checked }))}
        />
        Solo terra (piano T)
      </label>
    </div>
  );
}
