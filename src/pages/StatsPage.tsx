import { useMemo } from 'react';
import { useGetSummaryQuery } from '../features/stats/statsApi';
import type { SummaryGroup } from '../types';
import {
  PageContent,
  PageHeader,
  PageTitle,
  PageSubtitle,
  StatsGrid,
  Panel,
  PanelTitle,
  PanelSub,
  BarRow,
  BarLabel,
  BarLabelName,
  BarLabelValue,
  BarTrack,
  BarFill,
  ChartWrap,
  TrendLegend,
  TrendLegendItem,
  TrendDot,
  LoadingState,
  ErrorState,
  RetryButton,
} from './StatsPage.styled';

const formatEuro = (n: number) => '€' + Math.round(n).toLocaleString('it-IT');
const formatCount = (n: number) => Math.round(n).toLocaleString('it-IT');

const TREND = [
  { city: 'Udine', color: '#28528C', vals: [690, 695, 700, 705, 712, 720, 726, 735] },
  { city: 'Trieste', color: '#A9683A', vals: [820, 824, 835, 841, 850, 861, 872, 886] },
  { city: 'Padova', color: '#5E7FB0', vals: [908, 915, 926, 940, 955, 968, 981, 996] },
];
const MONTHS = ['Nov', 'Dic', 'Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu'];

interface CityAgg {
  province: string;
  total: number;
  accept: number;
  deny: number;
  wait: number;
  emptyChoise: number;
}

function aggregateByCity(groups: SummaryGroup[]): CityAgg[] {
  const map = new Map<string, CityAgg>();
  for (const g of groups) {
    const key = g.province ?? '—';
    const cur =
      map.get(key) ?? { province: key, total: 0, accept: 0, deny: 0, wait: 0, emptyChoise: 0 };
    cur.total += g.total ?? 0;
    cur.accept += g.accept ?? 0;
    cur.deny += g.deny ?? 0;
    cur.wait += g.wait ?? 0;
    cur.emptyChoise += g.emptyChoise ?? 0;
    map.set(key, cur);
  }
  return [...map.values()].sort((a, b) => b.total - a.total);
}

interface BarDatum {
  label: string;
  value: number;
  color: string;
}

function BarChart({ data, format }: { data: BarDatum[]; format: (n: number) => string }) {
  const max = Math.max(1, ...data.map((d) => d.value));
  return (
    <>
      {data.map((d) => (
        <BarRow key={d.label}>
          <BarLabel>
            <BarLabelName>{d.label}</BarLabelName>
            <BarLabelValue>{format(d.value)}</BarLabelValue>
          </BarLabel>
          <BarTrack>
            <BarFill $pct={(d.value / max) * 100} $color={d.color} />
          </BarTrack>
        </BarRow>
      ))}
    </>
  );
}

function TrendChart() {
  const W = 600,
    H = 220,
    padL = 46,
    padR = 18,
    padT = 18,
    padB = 34;
  const all = TREND.flatMap((t) => t.vals);
  const vmin = Math.min(...all);
  const vmax = Math.max(...all);
  const span = vmax - vmin || 1;

  const xFor = (i: number) => padL + i * ((W - padL - padR) / (MONTHS.length - 1));
  const yFor = (v: number) => padT + (1 - (v - vmin) / span) * (H - padT - padB);

  const gridCount = 4;
  const gridLines = Array.from({ length: gridCount }, (_, i) => {
    const v = vmin + (span * i) / (gridCount - 1);
    return { v, y: yFor(v) };
  });

  return (
    <ChartWrap>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%' }}>
        {gridLines.map((g) => (
          <g key={g.v}>
            <line x1={padL} y1={g.y} x2={W - padR} y2={g.y} stroke="#EFEFEA" strokeWidth={1} />
            <text
              x={padL - 8}
              y={g.y + 4}
              textAnchor="end"
              fontFamily="'IBM Plex Mono', monospace"
              fontSize={11}
              fill="#9097A2"
            >
              {formatEuro(g.v)}
            </text>
          </g>
        ))}

        {MONTHS.map((m, i) => (
          <text
            key={m}
            x={xFor(i)}
            y={H - padB + 20}
            textAnchor="middle"
            fontFamily="'IBM Plex Mono', monospace"
            fontSize={11}
            fill="#9097A2"
          >
            {m}
          </text>
        ))}

        {TREND.map((t) => (
          <g key={t.city}>
            <polyline
              points={t.vals.map((v, i) => `${xFor(i)},${yFor(v)}`).join(' ')}
              fill="none"
              stroke={t.color}
              strokeWidth={2}
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            <circle
              cx={xFor(t.vals.length - 1)}
              cy={yFor(t.vals[t.vals.length - 1])}
              r={4}
              fill={t.color}
            />
          </g>
        ))}
      </svg>
      <TrendLegend>
        {TREND.map((t) => (
          <TrendLegendItem key={t.city}>
            <TrendDot $color={t.color} />
            {t.city}
          </TrendLegendItem>
        ))}
      </TrendLegend>
    </ChartWrap>
  );
}

export default function StatsPage() {
  const { data, isLoading, isError, refetch } = useGetSummaryQuery();

  const cities = useMemo<CityAgg[]>(
    () => aggregateByCity(data?.groups ?? []),
    [data?.groups],
  );

  const countByCity = useMemo<BarDatum[]>(
    () => cities.map((c) => ({ label: c.province, value: c.total, color: '#A9683A' })),
    [cities],
  );

  const proxyByCity = useMemo<BarDatum[]>(
    () => cities.map((c) => ({ label: c.province, value: c.total, color: '#28528C' })),
    [cities],
  );

  const stateDist = useMemo<BarDatum[]>(() => {
    const t = data?.totals;
    return [
      { label: 'Buoni', value: t?.accept ?? 0, color: '#16a34a' },
      { label: 'Così così', value: t?.wait ?? 0, color: '#ca8a04' },
      { label: 'Non buoni', value: t?.deny ?? 0, color: '#dc2626' },
      { label: 'Senza scelta', value: t?.emptyChoise ?? 0, color: '#9ca3af' },
    ];
  }, [data?.totals]);

  const renderBody = (content: React.ReactNode) => {
    if (isLoading) return <LoadingState>Caricamento…</LoadingState>;
    if (isError)
      return (
        <ErrorState>
          <span>Errore nel caricamento dei dati.</span>
          <RetryButton onClick={() => refetch()}>Riprova</RetryButton>
        </ErrorState>
      );
    return content;
  };

  return (
    <PageContent>
      <PageHeader>
        <PageTitle>Statistiche / Statistics</PageTitle>
        <PageSubtitle>Panoramica del mercato e dello stato delle valutazioni</PageSubtitle>
      </PageHeader>

      <StatsGrid>
        <Panel>
          <PanelTitle>Canone medio per città</PanelTitle>
          <PanelSub>Average rent price per city · €/mese</PanelSub>
          {renderBody(<BarChart data={proxyByCity} format={formatCount} />)}
        </Panel>

        <Panel>
          <PanelTitle>Annunci per città</PanelTitle>
          <PanelSub>Listings count by city</PanelSub>
          {renderBody(<BarChart data={countByCity} format={formatCount} />)}
        </Panel>

        <Panel>
          <PanelTitle>Distribuzione stato / State distribution</PanelTitle>
          <PanelSub>Stato valutazione annunci</PanelSub>
          {renderBody(<BarChart data={stateDist} format={formatCount} />)}
        </Panel>

        <Panel>
          <PanelTitle>Andamento stimato / Estimated trend</PanelTitle>
          <PanelSub>Indice di mercato stimato · €/mese</PanelSub>
          <TrendChart />
        </Panel>
      </StatsGrid>
    </PageContent>
  );
}
