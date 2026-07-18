import { useMemo, useState } from 'react';
import type { StatisticRawDoc } from '../../types';
import { Controls, Control, TableWrap, Table } from './PivotTable.styled';

// ── Dimensions & measures ──────────────────────────────────────────────────

type DimKey = 'province' | 'type' | 'stateMaloi' | 'accesso' | 'elevator' | 'energyClass';
type MeasureKey = 'count' | 'price' | 'surfaceValue' | 'pricePerSquareMeter' | 'condominiumExpenses' | 'deposit';
type AggKey = 'avg' | 'sum' | 'min' | 'max';

const SENZA = 'Senza info';

export function normalizeElevator(v: unknown): string {
  const s = String(v ?? '').trim().toLowerCase();
  if (['true', 'sì', 'si', 'yes', '1'].includes(s)) return 'Sì';
  if (['false', 'no', '0'].includes(s)) return 'No';
  return SENZA;
}

function mapType(raw: string | undefined): string {
  const t = (raw ?? '').toLowerCase();
  if (t === 'a') return 'Affitto';
  if (t === 'c') return 'Compra';
  return raw || SENZA;
}

const TYPE_SHORT: Record<string, string> = { a: 'Aff', c: 'Com' };

const DIMS: Record<DimKey, { label: string; bucket: (d: StatisticRawDoc) => string }> = {
  // Same grouping as the charts: province + contract type (e.g. "Udine-Aff")
  province: {
    label: 'Provincia',
    bucket: (d) => `${d.province || SENZA}-${TYPE_SHORT[(d.type ?? '').toLowerCase()] ?? d.type ?? '?'}`,
  },
  type: { label: 'Contratto', bucket: (d) => mapType(d.type) },
  stateMaloi: {
    label: 'Stato',
    bucket: (d) =>
      d.stateMaloi === 1 ? 'Buono' : d.stateMaloi === 0 ? 'Non buono' : d.stateMaloi === 2 ? 'Così così' : SENZA,
  },
  accesso: {
    label: 'Accesso disabili',
    bucket: (d) => (d.Accesso_per_disabili === 1 ? 'Sì' : d.Accesso_per_disabili === 0 ? 'No' : SENZA),
  },
  elevator: { label: 'Ascensore', bucket: (d) => normalizeElevator(d.elevator) },
  energyClass: { label: 'Classe energetica', bucket: (d) => d.energyClass || SENZA },
};

const MEASURES: Record<MeasureKey, string> = {
  count: 'Conteggio',
  price: 'Prezzo (€)',
  surfaceValue: 'Superficie (m²)',
  pricePerSquareMeter: '€/m²',
  condominiumExpenses: 'Spese condominio (€)',
  deposit: 'Deposito (€)',
};

const AGGS: Record<AggKey, string> = { avg: 'Media', sum: 'Somma', min: 'Minimo', max: 'Massimo' };

function aggregate(values: number[], agg: AggKey): number | null {
  if (values.length === 0) return null;
  if (agg === 'sum') return values.reduce((a, b) => a + b, 0);
  if (agg === 'avg') return values.reduce((a, b) => a + b, 0) / values.length;
  if (agg === 'min') return Math.min(...values);
  return Math.max(...values);
}

// ── Component ──────────────────────────────────────────────────────────────

interface Props {
  docs: StatisticRawDoc[];
}

export default function PivotTable({ docs }: Props) {
  const [rowDim, setRowDim] = useState<DimKey>('province');
  const [colDim, setColDim] = useState<DimKey>('stateMaloi');
  const [measure, setMeasure] = useState<MeasureKey>('count');
  const [agg, setAgg] = useState<AggKey>('avg');

  const pivot = useMemo(() => {
    const rowOf = DIMS[rowDim].bucket;
    const colOf = DIMS[colDim].bucket;

    // bucket → bucket → raw values
    const cells = new Map<string, Map<string, number[]>>();
    const colSet = new Set<string>();

    for (const doc of docs) {
      let value = 1;
      if (measure !== 'count') {
        const raw = doc[measure];
        if (typeof raw !== 'number' || !Number.isFinite(raw)) continue;
        value = raw;
      }
      const r = rowOf(doc);
      const c = colOf(doc);
      colSet.add(c);
      let row = cells.get(r);
      if (!row) {
        row = new Map();
        cells.set(r, row);
      }
      row.get(c)?.push(value) ?? row.set(c, [value]);
    }

    const effAgg: AggKey = measure === 'count' ? 'sum' : agg;
    const rowKeys = [...cells.keys()].sort((a, b) => a.localeCompare(b, 'it'));
    const colKeys = [...colSet].sort((a, b) => a.localeCompare(b, 'it'));

    const body = rowKeys.map((r) => {
      const row = cells.get(r)!;
      const vals = colKeys.map((c) => aggregate(row.get(c) ?? [], effAgg));
      const all = colKeys.flatMap((c) => row.get(c) ?? []);
      return { key: r, vals, total: aggregate(all, effAgg) };
    });

    const colTotals = colKeys.map((c) => {
      const all = rowKeys.flatMap((r) => cells.get(r)!.get(c) ?? []);
      return aggregate(all, effAgg);
    });
    const grand = aggregate(
      rowKeys.flatMap((r) => colKeys.flatMap((c) => cells.get(r)!.get(c) ?? [])),
      effAgg
    );

    return { rowKeys, colKeys, body, colTotals, grand };
  }, [docs, rowDim, colDim, measure, agg]);

  const fmt = useMemo(
    () =>
      new Intl.NumberFormat('it-IT', {
        maximumFractionDigits: measure !== 'count' && agg === 'avg' ? 1 : 0,
      }),
    [measure, agg]
  );
  const cell = (v: number | null, key?: string | number, total = false) => (
    <td key={key} className={`${v === null ? 'empty' : ''} ${total ? 'total' : ''}`.trim() || undefined}>
      {v === null ? '—' : fmt.format(v)}
    </td>
  );

  return (
    <div>
      <Controls>
        <Control>
          Righe
          <select value={rowDim} onChange={(e) => setRowDim(e.target.value as DimKey)}>
            {(Object.keys(DIMS) as DimKey[]).map((k) => (
              <option key={k} value={k} disabled={k === colDim}>{DIMS[k].label}</option>
            ))}
          </select>
        </Control>
        <Control>
          Colonne
          <select value={colDim} onChange={(e) => setColDim(e.target.value as DimKey)}>
            {(Object.keys(DIMS) as DimKey[]).map((k) => (
              <option key={k} value={k} disabled={k === rowDim}>{DIMS[k].label}</option>
            ))}
          </select>
        </Control>
        <Control>
          Valore
          <select value={measure} onChange={(e) => setMeasure(e.target.value as MeasureKey)}>
            {(Object.keys(MEASURES) as MeasureKey[]).map((k) => (
              <option key={k} value={k}>{MEASURES[k]}</option>
            ))}
          </select>
        </Control>
        {measure !== 'count' && (
          <Control>
            Aggregazione
            <select value={agg} onChange={(e) => setAgg(e.target.value as AggKey)}>
              {(Object.keys(AGGS) as AggKey[]).map((k) => (
                <option key={k} value={k}>{AGGS[k]}</option>
              ))}
            </select>
          </Control>
        )}
      </Controls>

      <TableWrap>
        <Table>
          <thead>
            <tr>
              <th>{DIMS[rowDim].label} \ {DIMS[colDim].label}</th>
              {pivot.colKeys.map((c) => <th key={c}>{c}</th>)}
              <th className="total">Totale</th>
            </tr>
          </thead>
          <tbody>
            {pivot.body.map((row) => (
              <tr key={row.key}>
                <th>{row.key}</th>
                {row.vals.map((v, i) => cell(v, pivot.colKeys[i]))}
                {cell(row.total, '__total', true)}
              </tr>
            ))}
            <tr className="totals">
              <th>Totale</th>
              {pivot.colTotals.map((v, i) => cell(v, pivot.colKeys[i]))}
              {cell(pivot.grand, '__total', true)}
            </tr>
          </tbody>
        </Table>
      </TableWrap>
    </div>
  );
}
