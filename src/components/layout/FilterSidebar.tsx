import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectSharedFilters,
  setSharedFilter,
  resetSharedFilters,
} from '../../features/shared/filtersSlice';
import { selectSidebarOpen, closeSidebar } from '../../features/ui/uiSlice';
import {
  selectUpdatedAtBounds,
  type AccessibilityFilter,
  type ElevatorFilter,
  type StateMaloiFilter,
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
  RangeWrap,
  RangeTrack,
  RangeFill,
  RangeInput,
  RangeLabels,
  ResultsFooter,
  ResultsCount,
  Backdrop,
  SidebarCloseBtn,
  MobileResultsBtn,
} from './FilterSidebar.styled';

interface FilterSidebarProps {
  count: number;
}

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);
const DAY = 86400;

const fmtDay = (unixSec: number) =>
  new Date(unixSec * 1000).toLocaleDateString('it-IT', {
    day: '2-digit',
    month: 'short',
    year: '2-digit',
  });

export default function FilterSidebar({ count }: FilterSidebarProps) {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectSharedFilters);
  const bounds = useAppSelector(selectUpdatedAtBounds);
  const open = useAppSelector(selectSidebarOpen);
  const close = () => dispatch(closeSidebar());

  // Slider handles: 0 in redux means "inactive" — handle rests at the bound
  const updFrom = bounds
    ? filters.updFrom > 0
      ? clamp(filters.updFrom, bounds.min, bounds.max)
      : bounds.min
    : 0;
  const updTo = bounds
    ? filters.updTo > 0
      ? clamp(filters.updTo, bounds.min, bounds.max)
      : bounds.max
    : 0;

  const setUpdFrom = (raw: number) => {
    if (!bounds) return;
    const value = Math.min(raw, updTo);
    dispatch(setSharedFilter({ key: 'updFrom', value: value <= bounds.min ? 0 : value }));
  };
  const setUpdTo = (raw: number) => {
    if (!bounds) return;
    const value = Math.max(raw, updFrom);
    dispatch(setSharedFilter({ key: 'updTo', value: value >= bounds.max ? 0 : value }));
  };

  const span = bounds ? Math.max(bounds.max - bounds.min, 1) : 1;
  const fillLeft = bounds ? ((updFrom - bounds.min) / span) * 100 : 0;
  const fillRight = bounds ? 100 - ((updTo - bounds.min) / span) * 100 : 0;

  // Mobile drawer: lock body scroll and close on Esc while open
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dispatch(closeSidebar());
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, dispatch]);

  return (
    <>
      {open && <Backdrop onClick={close} aria-hidden="true" />}
      <SidebarWrapper $open={open} id="filter-drawer" aria-label="Filtri">
      <SidebarHeader>
        <SidebarTitle>Filtri / Filters</SidebarTitle>
        <ResetButton type="button" onClick={() => dispatch(resetSharedFilters())}>
          Azzera
        </ResetButton>
        <SidebarCloseBtn type="button" onClick={close} aria-label="Chiudi filtri">
          ×
        </SidebarCloseBtn>
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

      {bounds && bounds.max > bounds.min && (
        <Section>
          <SectionLabel>Aggiornato / Updated</SectionLabel>
          <RangeWrap>
            <RangeTrack />
            <RangeFill $left={fillLeft} $right={fillRight} />
            <RangeInput
              type="range"
              min={bounds.min}
              max={bounds.max}
              step={DAY}
              value={updFrom}
              onChange={(e) => setUpdFrom(Number(e.target.value))}
              aria-label="Aggiornato da"
              style={{ zIndex: updFrom > (bounds.min + bounds.max) / 2 ? 4 : 3 }}
            />
            <RangeInput
              type="range"
              min={bounds.min}
              max={bounds.max}
              step={DAY}
              value={updTo}
              onChange={(e) => setUpdTo(Number(e.target.value))}
              aria-label="Aggiornato fino a"
              style={{ zIndex: 3 }}
            />
          </RangeWrap>
          <RangeLabels>
            <span>{fmtDay(updFrom)}</span>
            <span>{fmtDay(updTo)}</span>
          </RangeLabels>
        </Section>
      )}

      <ResultsFooter>
        <ResultsCount>{count}</ResultsCount> risultati
        <MobileResultsBtn type="button" onClick={close}>
          Vedi {count} risultati
        </MobileResultsBtn>
      </ResultsFooter>
      </SidebarWrapper>
    </>
  );
}
