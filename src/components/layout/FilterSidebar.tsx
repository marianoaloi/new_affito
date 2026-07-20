import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectSharedFilters,
  setSharedFilter,
  resetSharedFilters,
} from '../../features/shared/filtersSlice';
import { selectSidebarOpen, closeSidebar } from '../../features/ui/uiSlice';
import {
  selectUpdatedAtDays,
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
  DateInput,
  ResultsFooter,
  ResultsCount,
  Backdrop,
  SidebarCloseBtn,
  MobileResultsBtn,
} from './FilterSidebar.styled';

interface FilterSidebarProps {
  count: number;
}

const DAY = 86400;

/** Day-start unix seconds → "YYYY-MM-DD" (UTC, matching the day bucketing). */
const toISODay = (unixSec: number) => new Date(unixSec * 1000).toISOString().slice(0, 10);

/** "YYYY-MM-DD" → day-start unix seconds (UTC), or null when unparsable. */
function fromISODay(value: string): number | null {
  const ms = Date.parse(`${value}T00:00:00Z`);
  return Number.isNaN(ms) ? null : Math.floor(ms / 1000);
}

/** First index whose day >= ts, or fallback when none. */
function firstDayGE(days: number[], ts: number, fallback: number): number {
  const i = days.findIndex((d) => d >= ts);
  return i === -1 ? fallback : i;
}

/** Last index whose day <= ts, or fallback when none. */
function lastDayLE(days: number[], ts: number, fallback: number): number {
  let ans = fallback;
  for (let i = 0; i < days.length; i++) {
    if (days[i] <= ts) ans = i;
    else break;
  }
  return ans;
}

export default function FilterSidebar({ count }: FilterSidebarProps) {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectSharedFilters);
  const days = useAppSelector(selectUpdatedAtDays);
  const open = useAppSelector(selectSidebarOpen);
  const close = () => dispatch(closeSidebar());

  // Index-based slider over the distinct days present in the data (data-density
  // scale: no dead zones between sparse dates). Redux keeps unix seconds:
  // updFrom = day start, updTo = day end; 0 = inactive (handle at the end).
  const last = days.length - 1;
  const toIdxRaw = filters.updTo > 0 ? lastDayLE(days, filters.updTo, last) : last;
  const fromIdx = Math.min(
    filters.updFrom > 0 ? firstDayGE(days, filters.updFrom, 0) : 0,
    toIdxRaw
  );
  const toIdx = Math.max(toIdxRaw, fromIdx);

  const setFromIdx = (raw: number) => {
    const idx = Math.min(raw, toIdx);
    dispatch(setSharedFilter({ key: 'updFrom', value: idx <= 0 ? 0 : days[idx] }));
  };
  const setToIdx = (raw: number) => {
    const idx = Math.max(raw, fromIdx);
    dispatch(setSharedFilter({ key: 'updTo', value: idx >= last ? 0 : days[idx] + DAY - 1 }));
  };

  // Typed exact dates: clamped to the data range and to from <= to;
  // a date at (or beyond) the ends stores 0 = inactive.
  const onFromDate = (value: string) => {
    const ts = fromISODay(value);
    if (ts == null || days.length === 0) return;
    const clamped = Math.min(Math.max(ts, days[0]), days[toIdx]);
    dispatch(setSharedFilter({ key: 'updFrom', value: clamped <= days[0] ? 0 : clamped }));
  };
  const onToDate = (value: string) => {
    const ts = fromISODay(value);
    if (ts == null || days.length === 0) return;
    const clamped = Math.min(Math.max(ts, days[fromIdx]), days[last]);
    dispatch(
      setSharedFilter({ key: 'updTo', value: clamped >= days[last] ? 0 : clamped + DAY - 1 })
    );
  };

  const span = Math.max(last, 1);
  const fillLeft = (fromIdx / span) * 100;
  const fillRight = 100 - (toIdx / span) * 100;

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

      {days.length > 1 && (
        <Section>
          <SectionLabel>Aggiornato / Updated</SectionLabel>
          <RangeWrap>
            <RangeTrack />
            <RangeFill $left={fillLeft} $right={fillRight} />
            <RangeInput
              type="range"
              min={0}
              max={last}
              step={1}
              value={fromIdx}
              onChange={(e) => setFromIdx(Number(e.target.value))}
              aria-label="Aggiornato da"
              style={{ zIndex: fromIdx > last / 2 ? 4 : 3 }}
            />
            <RangeInput
              type="range"
              min={0}
              max={last}
              step={1}
              value={toIdx}
              onChange={(e) => setToIdx(Number(e.target.value))}
              aria-label="Aggiornato fino a"
              style={{ zIndex: 3 }}
            />
          </RangeWrap>
          <RangeLabels>
            <DateInput
              type="date"
              value={toISODay(days[fromIdx])}
              min={toISODay(days[0])}
              max={toISODay(days[last])}
              onChange={(e) => onFromDate(e.target.value)}
              aria-label="Aggiornato dal giorno"
            />
            <DateInput
              type="date"
              value={toISODay(days[toIdx])}
              min={toISODay(days[0])}
              max={toISODay(days[last])}
              onChange={(e) => onToDate(e.target.value)}
              aria-label="Aggiornato fino al giorno"
            />
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
