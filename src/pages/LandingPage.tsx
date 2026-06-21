import { Link } from 'react-router-dom';
import { useAuth } from '../features/auth/useAuth';
import { useGetSummaryQuery } from '../features/stats/statsApi';
import SummaryCards from '../components/stats/SummaryCards';

export default function LandingPage() {
  const { user, isAuthenticated, signIn } = useAuth();
  const { data, isLoading, isError, refetch } = useGetSummaryQuery();

  return (
    <main className="page">
      {isAuthenticated ? (
        <section className="hero">
          <h1>Benvenuto {user?.displayName ?? user?.email ?? ''}</h1>
          <Link to="/tabella" className="btn btn-primary btn-lg">
            Vai alla tabella
          </Link>
        </section>
      ) : (
        <section className="hero">
          <h1>Affitti Udine</h1>
          <p>Accedi per gestire gli annunci.</p>
          <button className="btn btn-primary btn-lg" onClick={() => void signIn()}>
            Accedi con Google
          </button>
        </section>
      )}

      <section className="stats-section">
        <h2>Statistiche</h2>
        {isLoading && <div className="spinner" />}
        {isError && (
          <div className="error-box">
            Errore nel caricamento delle statistiche.
            <button className="btn btn-secondary" onClick={() => void refetch()}>
              Riprova
            </button>
          </div>
        )}
        {data && <SummaryCards data={data} />}
      </section>
    </main>
  );
}
