import { useMemo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { useGetStatisticGroupsQuery } from '../features/stats/statsApi';
import type { StatisticGroup } from '../types';
import {
  PageContent, PageHeader, PageTitle, PageSubtitle,
  PanelStack, Panel, PanelTitle, PanelSub,
  ChartRow, ChartWrap,
  LoadingState, ErrorState, RetryButton,
} from './StatsPage.styled';

const C = { si: '#16a34a', senza: '#9ca3af', no: '#dc2626', cosi: '#ca8a04' };

const TYPE_SHORT: Record<string, string> = { A: 'Aff', C: 'Com', a: 'Aff', c: 'Com' };

function shortLabel(g: StatisticGroup): string {
  return `${g.province}-${TYPE_SHORT[g.type] ?? g.type}`;
}

interface Row { name: string; si: number; senza: number; no: number; cosi?: number; }

function toPct(row: Row): Row {
  const total = Math.max(1, row.si + row.senza + row.no + (row.cosi ?? 0));
  return {
    name: row.name,
    si:    Math.round((row.si    / total) * 100),
    senza: Math.round((row.senza / total) * 100),
    no:    Math.round((row.no    / total) * 100),
    ...(row.cosi !== undefined ? { cosi: Math.round((row.cosi / total) * 100) } : {}),
  };
}

interface ChartPanelProps {
  title: string;
  sub: string;
  data: Row[];
  withCosi?: boolean;
}

const TICK_STYLE = { fontSize: 11, fill: '#6b7280', fontFamily: 'IBM Plex Mono, monospace' };
const AXIS_LABEL_STYLE = { fontSize: 11, fill: '#9097a2' };
const LEGEND_STYLE = { fontSize: 12, paddingBottom: 8 };
const MARGIN = { top: 8, right: 8, left: 0, bottom: 24 };

function DualChart({ title, sub, data, withCosi = false }: ChartPanelProps) {
  const pctData = useMemo(() => data.map(toPct), [data]);

  const bars = [
    { key: 'si',    name: 'Yes',        fill: C.si },
    { key: 'senza', name: 'Senza Info', fill: C.senza },
    { key: 'no',    name: 'No',         fill: C.no },
    ...(withCosi ? [{ key: 'cosi', name: 'Così così', fill: C.cosi }] : []),
  ];

  return (
    <Panel>
      <PanelTitle>{title}</PanelTitle>
      <PanelSub>{sub}</PanelSub>
      <ChartRow>
        <ChartWrap>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={MARGIN} barCategoryGap="20%">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={TICK_STYLE} label={{ value: 'Province', position: 'insideBottom', offset: -12, style: AXIS_LABEL_STYLE }} />
              <YAxis tick={TICK_STYLE} label={{ value: 'Count', angle: -90, position: 'insideLeft', offset: 10, style: AXIS_LABEL_STYLE }} />
              <Tooltip />
              <Legend verticalAlign="top" wrapperStyle={LEGEND_STYLE} />
              {bars.map((b) => (
                <Bar key={b.key} dataKey={b.key} name={b.name} stackId="a" fill={b.fill} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </ChartWrap>
        <ChartWrap>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={pctData} margin={MARGIN} barCategoryGap="20%">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={TICK_STYLE} label={{ value: 'Province', position: 'insideBottom', offset: -12, style: AXIS_LABEL_STYLE }} />
              <YAxis domain={[0, 100]} tick={TICK_STYLE} label={{ value: '%', angle: -90, position: 'insideLeft', offset: 10, style: AXIS_LABEL_STYLE }} />
              <Tooltip />
              <Legend verticalAlign="top" wrapperStyle={LEGEND_STYLE} />
              {bars.map((b) => (
                <Bar key={b.key} dataKey={b.key} name={b.name} stackId="a" fill={b.fill} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </ChartWrap>
      </ChartRow>
    </Panel>
  );
}

export default function StatsPage() {
  const { data, isLoading, isError, refetch } = useGetStatisticGroupsQuery();

  const groups = useMemo<StatisticGroup[]>(
    () => [...(data?.groups ?? [])].sort((a, b) => b.total - a.total),
    [data?.groups],
  );

  const disableData = useMemo<Row[]>(
    () => groups.map((g) => ({ name: shortLabel(g), si: g.disable_si, senza: g.disable_senza, no: g.disable_no })),
    [groups],
  );

  const stateData = useMemo<Row[]>(
    () => groups.map((g) => ({ name: shortLabel(g), si: g.state_si, senza: g.state_senza, no: g.state_no, cosi: g.state_cosi })),
    [groups],
  );

  const elevatorData = useMemo<Row[]>(
    () => groups.map((g) => ({ name: shortLabel(g), si: g.elevator_si, senza: g.elevator_senza, no: g.elevator_no })),
    [groups],
  );

  if (isLoading) return <PageContent><LoadingState>Caricamento…</LoadingState></PageContent>;
  if (isError)
    return (
      <PageContent>
        <ErrorState>
          <span>Errore nel caricamento dei dati.</span>
          <RetryButton onClick={() => refetch()}>Riprova</RetryButton>
        </ErrorState>
      </PageContent>
    );

  return (
    <PageContent>
      <PageHeader>
        <PageTitle>Statistiche / Statistics</PageTitle>
        <PageSubtitle>Distribuzione per provincia e tipologia — confronto quantità e percentuale</PageSubtitle>
      </PageHeader>

      <PanelStack>
        <DualChart
          title="Statistics by Province and Disabled Access"
          sub="Property count distribution across provinces, segregated by Disabled Access"
          data={disableData}
        />
        <DualChart
          title="Statistics by Province and StateMaloi"
          sub="Property count distribution across provinces, segregated by state evaluation"
          data={stateData}
          withCosi
        />
        <DualChart
          title="Statistics by Province and Elevator"
          sub="Property count distribution across provinces, segregated by elevator status"
          data={elevatorData}
        />
      </PanelStack>
    </PageContent>
  );
}
