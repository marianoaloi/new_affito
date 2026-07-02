import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectSharedFilters,
  setSharedFilter,
  resetSharedFilters,
} from '../../features/shared/filtersSlice';
import type {
  AccessibilityFilter,
  ElevatorFilter,
  StateMaloiFilter,
} from '../../features/map/mapSlice';
import {
  SidebarWrapper,
  SidebarHeader,
  SidebarTitle,
  ResetButton,
  Section,
  SectionLabel,
  SegmentedGroup,
  SegmentBtn,
  SidebarSelect,
  CheckboxLabel,
  ResultsFooter,
  ResultsCount,
} from './FilterSidebar.styled';

interface FilterSidebarProps {
  count: number;
}

export default function FilterSidebar({ count }: FilterSidebarProps) {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectSharedFilters);

  return (
    <SidebarWrapper>
      <SidebarHeader>
        <SidebarTitle>Filtri / Filters</SidebarTitle>
        <ResetButton type="button" onClick={() => dispatch(resetSharedFilters())}>
          Azzera
        </ResetButton>
      </SidebarHeader>

      <Section>
        <SectionLabel>Città / City</SectionLabel>
        <SidebarSelect
          value={filters.province}
          onChange={(e) =>
            dispatch(setSharedFilter({ key: 'province', value: e.target.value }))
          }
        >
          <option value="">Tutte le città</option>
          <option value="Udine">Udine</option>
          <option value="Trieste">Trieste</option>
          <option value="Padova">Padova</option>
        </SidebarSelect>
      </Section>

      <Section>
        <SectionLabel>Contratto / Deal</SectionLabel>
        <SegmentedGroup>
          <SegmentBtn
            type="button"
            $active={filters.deal === ''}
            onClick={() => dispatch(setSharedFilter({ key: 'deal', value: '' }))}
          >
            Tutti
          </SegmentBtn>
          <SegmentBtn
            type="button"
            $active={filters.deal === 'a'}
            onClick={() => dispatch(setSharedFilter({ key: 'deal', value: 'a' }))}
          >
            Affitto
          </SegmentBtn>
          <SegmentBtn
            type="button"
            $active={filters.deal === 'c'}
            onClick={() => dispatch(setSharedFilter({ key: 'deal', value: 'c' }))}
          >
            Vendita
          </SegmentBtn>
        </SegmentedGroup>
      </Section>

      <Section>
        <SectionLabel>Ascensore / Elevator</SectionLabel>
        <SidebarSelect
          value={filters.elevator}
          onChange={(e) =>
            dispatch(
              setSharedFilter({
                key: 'elevator',
                value: e.target.value as ElevatorFilter,
              })
            )
          }
        >
          <option value="">Tutti</option>
          <option value="has">Sì</option>
          <option value="no">No</option>
          <option value="no_info">Nessuna info</option>
        </SidebarSelect>
      </Section>

      <Section>
        <SectionLabel>Accessibile / Accessible</SectionLabel>
        <SidebarSelect
          value={filters.accessibility}
          onChange={(e) =>
            dispatch(
              setSharedFilter({
                key: 'accessibility',
                value: e.target.value as AccessibilityFilter,
              })
            )
          }
        >
          <option value="">Tutti</option>
          <option value="accessible">Sì</option>
          <option value="not_accessible">No</option>
          <option value="no_info">Nessuna info</option>
        </SidebarSelect>
      </Section>

      <Section>
        <SectionLabel>Piano terra / Ground floor</SectionLabel>
        <CheckboxLabel>
          <input
            type="checkbox"
            checked={filters.terra}
            onChange={(e) =>
              dispatch(setSharedFilter({ key: 'terra', value: e.target.checked }))
            }
          />
          Solo piano terra (piano T)
        </CheckboxLabel>
      </Section>

      <Section>
        <SectionLabel>Stato / State</SectionLabel>
        <SidebarSelect
          value={filters.stateMaloi}
          onChange={(e) =>
            dispatch(
              setSharedFilter({
                key: 'stateMaloi',
                value: e.target.value as StateMaloiFilter,
              })
            )
          }
        >
          <option value="">Tutti</option>
          <option value="1">Buono</option>
          <option value="2">Così così</option>
          <option value="0">Non buono</option>
          <option value="empty">Senza scelta</option>
        </SidebarSelect>
      </Section>

      <ResultsFooter>
        <ResultsCount>{count}</ResultsCount> risultati
      </ResultsFooter>
    </SidebarWrapper>
  );
}
