import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LoadingState } from './components/ui/StatusState';

// Layouts
import DashboardLayout from './components/layout/DashboardLayout';

// Public pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// Farmer pages (lazy-loaded so each route ships its own chunk)
const FarmerDashboard = lazy(() => import('./pages/farmer/FarmerDashboard'));
const MyFarm = lazy(() => import('./pages/farmer/MyFarm'));
const CropRecommendation = lazy(() => import('./pages/farmer/CropRecommendation'));
const DiseaseDetection = lazy(() => import('./pages/farmer/DiseaseDetection'));
const WeatherPage = lazy(() => import('./pages/farmer/WeatherPage'));
const MandiPrices = lazy(() => import('./pages/farmer/MandiPrices'));
const FertilizerRecommendation = lazy(() => import('./pages/farmer/FertilizerRecommendation'));
const GovernmentSchemes = lazy(() => import('./pages/farmer/GovernmentSchemes'));
const CropCalendar = lazy(() => import('./pages/farmer/CropCalendar'));
const FarmExpenses = lazy(() => import('./pages/farmer/FarmExpenses'));
const FarmJournal = lazy(() => import('./pages/farmer/FarmJournal'));
const ExpertConsultation = lazy(() => import('./pages/farmer/ExpertConsultation'));
const NotificationsPage = lazy(() => import('./pages/farmer/NotificationsPage'));
const ProfileSettings = lazy(() => import('./pages/farmer/ProfileSettings'));

// Admin pages (lazy-loaded so each route ships its own chunk)
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const ManageFarmers = lazy(() => import('./pages/admin/ManageFarmers'));
const ManageExperts = lazy(() => import('./pages/admin/ManageExperts'));
const ManageSchemes = lazy(() => import('./pages/admin/ManageSchemes'));
const ManageCrops = lazy(() => import('./pages/admin/ManageCrops'));
const ManageReports = lazy(() => import('./pages/admin/ManageReports'));

export default function App() {
  return (
    <Suspense fallback={<LoadingState text="Loading page..." />}>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Farmer routes */}
        <Route path="/farmer" element={<DashboardLayout role="farmer" />}>
          <Route index element={<Navigate to="/farmer/dashboard" replace />} />
          <Route path="dashboard" element={<FarmerDashboard />} />
          <Route path="my-farm" element={<MyFarm />} />
          <Route path="crop-recommendation" element={<CropRecommendation />} />
          <Route path="disease-detection" element={<DiseaseDetection />} />
          <Route path="weather" element={<WeatherPage />} />
          <Route path="mandi-prices" element={<MandiPrices />} />
          <Route path="fertilizer-recommendation" element={<FertilizerRecommendation />} />
          <Route path="schemes" element={<GovernmentSchemes />} />
          <Route path="crop-calendar" element={<CropCalendar />} />
          <Route path="expenses" element={<FarmExpenses />} />
          <Route path="journal" element={<FarmJournal />} />
          <Route path="experts" element={<ExpertConsultation />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="profile" element={<ProfileSettings />} />
        </Route>

        {/* Admin routes */}
        <Route path="/admin" element={<DashboardLayout role="admin" />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="farmers" element={<ManageFarmers />} />
          <Route path="experts" element={<ManageExperts />} />
          <Route path="schemes" element={<ManageSchemes />} />
          <Route path="crops" element={<ManageCrops />} />
          <Route path="reports" element={<ManageReports />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
