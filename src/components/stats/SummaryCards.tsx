import type { SummaryResponse } from '../../types';

interface SummaryCardsProps {
  data: SummaryResponse;
}

export default function SummaryCards({ data }: SummaryCardsProps) {
  const totals = data?.totals;
  const groups = data?.groups ?? [];

  return (
    <div className="summary">
      <div className="summary-totals">
        <div className="summary-card">
          <span className="summary-value">{totals?.total ?? 0}</span>
          <span className="summary-label">Totale</span>
        </div>
        <div className="summary-card">
          <span className="summary-value">{totals?.accept ?? 0}</span>
          <span className="summary-label">Accettati</span>
        </div>
        <div className="summary-card">
          <span className="summary-value">{totals?.deny ?? 0}</span>
          <span className="summary-label">Rifiutati</span>
        </div>
        <div className="summary-card">
          <span className="summary-value">{totals?.wait ?? 0}</span>
          <span className="summary-label">In attesa</span>
        </div>
        <div className="summary-card">
          <span className="summary-value">{totals?.emptyChoise ?? 0}</span>
          <span className="summary-label">Senza scelta</span>
        </div>
      </div>

      {groups.length > 0 && (
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Provincia</th>
                <th>Tipo</th>
                <th>Totale</th>
                <th>Accettati</th>
                <th>Rifiutati</th>
                <th>In attesa</th>
                <th>Senza scelta</th>
              </tr>
            </thead>
            <tbody>
              {groups.map((g, i) => (
                <tr key={`${g.province ?? '—'}-${g.type ?? '—'}-${i}`}>
                  <td>{g.province ?? '—'}</td>
                  <td>{g.type ?? '—'}</td>
                  <td>{g.total ?? 0}</td>
                  <td>{g.accept ?? 0}</td>
                  <td>{g.deny ?? 0}</td>
                  <td>{g.wait ?? 0}</td>
                  <td>{g.emptyChoise ?? 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
