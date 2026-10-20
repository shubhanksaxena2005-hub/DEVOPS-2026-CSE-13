import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LoadingState } from './components/ui/StatusState';
import ProtectedRoute from './components/ProtectedRoute';

// Layouts
import DashboardLayout from './components/layout/DashboardLayout';

// Public pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// Farmer pages (lazy-loaded so each route ships its own chunk)
const FarmerDashboard = lazy(() => import('./pages/farmer/FarmerDashboard'));
const MyFarm = lazy(() => import('./pages/farmer/MyFarm'));
const FarmExpenses = lazy(() => import('./pages/farmer/FarmExpenses'));
const FarmJournal = lazy(() => import('./pages/farmer/FarmJournal'));
const ProfileSettings = lazy(() => import('./pages/farmer/ProfileSettings'));

export default function App() {
  return (
    <Suspense fallback={<LoadingState text="Loading page..." />}>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Farmer routes (login required) */}
        <Route
          path="/farmer"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/farmer/dashboard" replace />} />
          <Route path="dashboard" element={<FarmerDashboard />} />
          <Route path="my-farm" element={<MyFarm />} />
          <Route path="expenses" element={<FarmExpenses />} />
          <Route path="journal" element={<FarmJournal />} />
          <Route path="profile" element={<ProfileSettings />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
