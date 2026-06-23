import { useAuth } from '../features/auth/useAuth';
import { useGetSummaryQuery } from '../features/stats/statsApi';
import SummaryCards from '../components/stats/SummaryCards';
import { PageWrapper, HeroSection, StatsSection, ErrorBox, Spinner } from './LandingPage.styled';

export default function LandingPage() {
  const { user, isAuthenticated, signIn } = useAuth();
  const { data, isLoading, isError, refetch } = useGetSummaryQuery();

  return (
    <PageWrapper>
      {isAuthenticated ? (
        <HeroSection>
          <h1>Benvenuto {user?.displayName ?? user?.email ?? ''}</h1>
        </HeroSection>
      ) : (
        <HeroSection>
          <h1>Affitti Udine</h1>
          <p>Accedi per gestire gli annunci.</p>
          <button className="btn btn-primary btn-lg" onClick={() => void signIn()}>
            Accedi con Google
          </button>
        </HeroSection>
      )}

      <StatsSection>
        <h2>Statistiche</h2>
        {isLoading && <Spinner />}
        {isError && (
          <ErrorBox>
            Errore nel caricamento delle statistiche.
            <button className="btn btn-secondary" onClick={() => void refetch()}>
              Riprova
            </button>
          </ErrorBox>
        )}
        {data && <SummaryCards data={data} />}
      </StatsSection>
    </PageWrapper>
  );
}
