import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Menu, Bell } from 'lucide-react';
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';

export default function DashboardLayout({ role = 'farmer' }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const pageTitles = {
    '/farmer/dashboard': 'Dashboard',
    '/farmer/my-farm': 'My Farm',
    '/farmer/crop-recommendation': 'Crop Recommendation',
    '/farmer/disease-detection': 'Disease Detection',
    '/farmer/weather': 'Weather',
    '/farmer/mandi-prices': 'Mandi Prices',
    '/farmer/fertilizer-recommendation': 'Fertilizer Recommendation',
    '/farmer/schemes': 'Government Schemes',
    '/farmer/crop-calendar': 'Crop Calendar',
    '/farmer/expenses': 'Farm Expenses',
    '/farmer/journal': 'Farm Activity Journal',
    '/farmer/experts': 'Expert Consultation',
    '/farmer/notifications': 'Notifications',
    '/farmer/profile': 'Profile & Settings',
    '/admin/dashboard': 'Admin Dashboard',
    '/admin/farmers': 'Manage Farmers',
    '/admin/experts': 'Manage Experts',
    '/admin/schemes': 'Manage Schemes',
    '/admin/crops': 'Manage Crop Information',
    '/admin/reports': 'Manage Reports',
  };

  const currentTitle = pageTitles[location.pathname] || 'AgriSathi';

  return (
    <div className="min-h-screen bg-earth-50">
      {/* Desktop sidebar */}
      <div className="hidden lg:block fixed inset-y-0 left-0 z-30">
        <Sidebar role={role} />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div className="absolute inset-y-0 left-0">
            <Sidebar role={role} onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-20 bg-white/95 backdrop-blur border-b border-gray-200">
          <div className="flex items-center justify-between px-4 sm:px-6 py-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
              >
                <Menu className="h-5 w-5 text-gray-600" />
              </button>
              <h1 className="text-lg font-semibold text-gray-900">{currentTitle}</h1>
            </div>
            {role === 'farmer' ? (
              <Link
                to="/farmer/notifications"
                className="relative p-2 rounded-lg hover:bg-gray-100 text-gray-600"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500" />
              </Link>
            ) : null}
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}