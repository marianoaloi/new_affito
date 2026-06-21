import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuthListener } from './features/auth/useAuth';
import Header from './components/Header';
import Toasts from './components/Toasts';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import TabellaPage from './pages/TabellaPage';
import PlaceholderPage from './pages/PlaceholderPage';

export default function App() {
  useAuthListener();

  return (
    <BrowserRouter>
      <Header />
      <Toasts />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/tabella"
          element={
            <ProtectedRoute>
              <TabellaPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mappa"
          element={
            <ProtectedRoute>
              <PlaceholderPage title="Mappa" />
            </ProtectedRoute>
          }
        />
        <Route
          path="/analisi"
          element={
            <ProtectedRoute>
              <PlaceholderPage title="Analisi" />
            </ProtectedRoute>
          }
        />
        <Route
          path="/senza-scelta"
          element={
            <ProtectedRoute>
              <PlaceholderPage title="Senza Scelta" />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
