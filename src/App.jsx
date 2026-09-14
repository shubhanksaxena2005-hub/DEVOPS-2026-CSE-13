import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import DashboardLayout from './components/layout/DashboardLayout';

// Public pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// Farmer pages
import FarmerDashboard from './pages/farmer/FarmerDashboard';
import MyFarm from './pages/farmer/MyFarm';
import CropRecommendation from './pages/farmer/CropRecommendation';
import DiseaseDetection from './pages/farmer/DiseaseDetection';
import WeatherPage from './pages/farmer/WeatherPage';
import MandiPrices from './pages/farmer/MandiPrices';
import FertilizerRecommendation from './pages/farmer/FertilizerRecommendation';
import GovernmentSchemes from './pages/farmer/GovernmentSchemes';
import CropCalendar from './pages/farmer/CropCalendar';
import FarmExpenses from './pages/farmer/FarmExpenses';
import FarmJournal from './pages/farmer/FarmJournal';
import ExpertConsultation from './pages/farmer/ExpertConsultation';
import NotificationsPage from './pages/farmer/NotificationsPage';
import ProfileSettings from './pages/farmer/ProfileSettings';

// Admin pages
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageFarmers from './pages/admin/ManageFarmers';
import ManageExperts from './pages/admin/ManageExperts';
import ManageSchemes from './pages/admin/ManageSchemes';
import ManageCrops from './pages/admin/ManageCrops';
import ManageReports from './pages/admin/ManageReports';

export default function App() {
  return (
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
  );
}