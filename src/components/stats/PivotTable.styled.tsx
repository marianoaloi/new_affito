import styled from '@emotion/styled';

export const Controls = styled.div`
  display: flex; gap: 14px; flex-wrap: wrap; margin-bottom: 14px;
`;

export const Control = styled.label`
  display: flex; flex-direction: column; gap: 4px;
  font-size: 11px; font-weight: 600; color: var(--muted);
  text-transform: uppercase; letter-spacing: 0.05em;
  select { min-width: 150px; }
`;

export const TableWrap = styled.div`
  overflow-x: auto; border: 1px solid var(--border); border-radius: 10px;
`;

export const Table = styled.table`
  border-collapse: collapse; width: 100%; font-size: 13px;
  th, td { padding: 7px 12px; border-bottom: 1px solid #f0f0f0; white-space: nowrap; }
  thead th {
    background: #fafaf8; font-size: 11px; font-weight: 700; color: var(--muted);
    text-transform: uppercase; letter-spacing: 0.04em; text-align: right;
  }
  thead th:first-of-type { text-align: left; }
  tbody th { text-align: left; font-weight: 600; color: var(--text); }
  td { text-align: right; font-family: 'IBM Plex Mono', monospace; color: var(--text); }
  td.empty { color: #d1d5db; }
  tr.totals th, tr.totals td, td.total, th.total { font-weight: 700; background: #fafaf8; }
  tbody tr:last-of-type th, tbody tr:last-of-type td { border-bottom: none; }
`;
