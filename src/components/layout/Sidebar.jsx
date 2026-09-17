import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Map,
  Sprout,
  Bug,
  Cloud,
  TrendingUp,
  FlaskConical,
  Landmark,
  CalendarDays,
  Wallet,
  BookOpen,
  Users,
  Bell,
  Settings,
  LogOut,
  UserCheck,
  FileBarChart2,
  X,
} from 'lucide-react';
import Logo from './Logo';

const farmerNav = [
  { to: '/farmer/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/farmer/my-farm', label: 'My Farm', icon: Map },
  { to: '/farmer/crop-recommendation', label: 'Crop Recommendation', icon: Sprout },
  { to: '/farmer/disease-detection', label: 'Disease Detection', icon: Bug },
  { to: '/farmer/weather', label: 'Weather', icon: Cloud },
  { to: '/farmer/mandi-prices', label: 'Mandi Prices', icon: TrendingUp },
  { to: '/farmer/fertilizer-recommendation', label: 'Fertilizer', icon: FlaskConical },
  { to: '/farmer/schemes', label: 'Govt Schemes', icon: Landmark },
  { to: '/farmer/crop-calendar', label: 'Crop Calendar', icon: CalendarDays },
  { to: '/farmer/expenses', label: 'Expenses', icon: Wallet },
  { to: '/farmer/journal', label: 'Activity Journal', icon: BookOpen },
  { to: '/farmer/experts', label: 'Expert Consultation', icon: Users },
  { to: '/farmer/notifications', label: 'Notifications', icon: Bell },
  { to: '/farmer/profile', label: 'Profile', icon: Settings },
];

const adminNav = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/farmers', label: 'Farmers', icon: Users },
  { to: '/admin/experts', label: 'Experts', icon: UserCheck },
  { to: '/admin/schemes', label: 'Schemes', icon: Landmark },
  { to: '/admin/crops', label: 'Crop Information', icon: Sprout },
  { to: '/admin/reports', label: 'Reports', icon: FileBarChart2 },
];

function NavItems({ items, onNavigate }) {
  return (
    <nav className="flex-1 space-y-1 px-3">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-green-700 text-white'
                  : 'text-gray-600 hover:bg-green-50 hover:text-green-800'
              }`
            }
          >
            <Icon className="h-4.5 w-4.5 shrink-0" />
            <span className="truncate">{item.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
}

export default function Sidebar({ role = 'farmer', onClose }) {
  const navigate = useNavigate();
  const navItems = role === 'admin' ? adminNav : farmerNav;

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-full">
      <div className="flex items-center justify-between px-5 py-5 border-b border-gray-100">
        <Logo size="sm" />
        {onClose && (
          <button onClick={onClose} className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100">
            <X className="h-5 w-5 text-gray-500" />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <NavItems items={navItems} onNavigate={onClose} />
      </div>

      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="h-9 w-9 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-semibold">
            RY
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">Ramesh Yadav</p>
            <p className="text-xs text-gray-500">Dindori, Nashik</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="mt-2 w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut className="h-4.5 w-4.5" />
          Logout
        </button>
      </div>
    </aside>
  );
}