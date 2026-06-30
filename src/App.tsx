import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useAuthListener } from './features/auth/useAuth';
import { useAppSelector } from './app/hooks';
import { selectListingsCount } from './features/ui/uiSlice';
import { selectFilteredListings } from './features/map/mapSlice';
import Header from './components/Header';
import Toasts from './components/Toasts';
import ProtectedRoute from './components/ProtectedRoute';
import FilterSidebar from './components/layout/FilterSidebar';
import LandingPage from './pages/LandingPage';
import TabellaPage from './pages/TabellaPage';
import MapPage from './pages/MapPage';
import StatsPage from './pages/StatsPage';

function AppShell({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const listingsCount = useAppSelector(selectListingsCount);
  const mapListings = useAppSelector(selectFilteredListings);
  const count = location.pathname === '/mappa' ? mapListings.length : listingsCount;
  return (
    <div style={{ display: 'flex', flex: 1, overflow: 'hidden', height: 'calc(100vh - 64px)' }}>
      <FilterSidebar count={count} />
      <div style={{ flex: 1, overflow: 'hidden' }}>{children}</div>
    </div>
  );
}

export default function App() {
  useAuthListener();

  return (
    <BrowserRouter>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <Header />
        <Toasts />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/tabella"
            element={
              <ProtectedRoute>
                <AppShell>
                  <TabellaPage />
                </AppShell>
              </ProtectedRoute>
            }
          />
          <Route
            path="/mappa"
            element={
              <ProtectedRoute>
                <AppShell>
                  <MapPage />
                </AppShell>
              </ProtectedRoute>
            }
          />
          <Route
            path="/statistiche"
            element={
              <ProtectedRoute>
                <AppShell>
                  <StatsPage />
                </AppShell>
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
