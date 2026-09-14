import { Link } from 'react-router-dom';
import {
  Cloud,
  Sprout,
  AlertTriangle,
  Wallet,
  ChevronRight,
  Map,
  ShieldCheck,
} from 'lucide-react';
import { useState } from 'react';
import { ResponsiveContainer, AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

import DashboardCard from '../../components/ui/DashboardCard';
import WeatherCard from '../../components/ui/WeatherCard';
import CropCard from '../../components/ui/CropCard';
import PriceCard from '../../components/ui/PriceCard';
import AlertCard from '../../components/ui/AlertCard';
import Badge from '../../components/ui/Badge';

import {
  currentWeather,
  mandiPrices,
  currentCrops,
  weatherAlerts,
  upcomingActivities,
  cropHealthStatus,
  notifications as allNotifications,
  expenses,
  priceHistory,
} from '../../data/mockData';

const healthDot = {
  Good: 'bg-green-500',
  Fair: 'bg-amber-500',
  Poor: 'bg-red-500',
};

export default function FarmerDashboard() {
  const [alerts, setAlerts] = useState(weatherAlerts);
  const notifications = allNotifications.filter((n) => !n.read);
  const recentExpenses = expenses.slice(0, 3);
  const totalMonthlyExpense = expenses.reduce((sum, e) => sum + e.amount, 0);
  const unreadCount = notifications.length;

  const dismissAlert = (id) => setAlerts((prev) => prev.filter((a) => a.id !== id));

  return (
    <div className="space-y-6">
      {/* Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">नमस्ते, Ramesh Yadav</h2>
          <p className="text-gray-500 text-sm">Here's what's happening on your farm today.</p>
        </div>
        <Link
          to="/farmer/my-farm"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-green-700 hover:text-green-800"
        >
          <Map className="h-4 w-4" /> View Farm Details <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Weather & Mandi prices */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <WeatherCard weather={currentWeather} />
        </div>

        {/* Mandi prices */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900">Today's Mandi Prices</h3>
            <Link
              to="/farmer/mandi-prices"
              className="text-sm font-medium text-green-700 hover:text-green-800 flex items-center gap-1"
            >
              View all <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {mandiPrices.slice(0, 4).map((price) => (
              <PriceCard key={price.id} price={price} />
            ))}
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard
          title="Active Crops"
          value={currentCrops.length}
          subtitle={`${currentCrops.reduce((s, c) => s + parseFloat(c.area), 0)} acres total`}
          icon={Sprout}
          color="green"
        />
        <DashboardCard
          title="Weather"
          value={`${currentWeather.temperature}°C`}
          subtitle={currentWeather.condition}
          icon={Cloud}
          color="blue"
        />
        <DashboardCard
          title="Unread Notifications"
          value={unreadCount}
          subtitle="Weather, prices & reminders"
          icon={AlertTriangle}
          color="amber"
        />
        <DashboardCard
          title="This Month Expenses"
          value={`₹${totalMonthlyExpense.toLocaleString('en-IN')}`}
          subtitle="Fertilizers, labor & more"
          icon={Wallet}
          color="earth"
        />
      </div>

      {/* Crop health + price chart */}
      <div className="grid lg:grid-cols-5 gap-6">
        {/* Crop health */}
        <div className="lg:col-span-2">
          <div className="card p-5 h-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Crop Health Status</h3>
              <Link
                to="/farmer/disease-detection"
                className="text-xs font-medium text-green-700 hover:text-green-800"
              >
                Check Disease
              </Link>
            </div>
            <div className="space-y-4">
              {cropHealthStatus.map((crop) => (
                <div key={crop.crop} className="flex items-start gap-3">
                  <div className={`mt-1.5 h-2.5 w-2.5 rounded-full shrink-0 ${healthDot[crop.health]}`} />
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-gray-900">{crop.crop}</p>
                      <Badge color={crop.color}>{crop.health}</Badge>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{crop.note}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-4 border-t border-gray-100">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                Upcoming Activities
              </h4>
              <div className="space-y-3">
                {upcomingActivities.map((act) => (
                  <div key={act.id} className="flex items-start gap-3">
                    <div className="shrink-0 w-14 text-center">
                      <p className="text-xs font-semibold text-gray-800">{act.date}</p>
                    </div>
                    <div className="flex-1 text-sm text-gray-600">{act.text}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Price trend chart */}
        <div className="lg:col-span-3">
          <div className="card p-5 h-full">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-900">Wheat Price Trend</h3>
                <p className="text-xs text-gray-500">Nashik APMC — last 2 months</p>
              </div>
              <Link
                to="/farmer/mandi-prices"
                className="text-xs font-medium text-green-700 hover:text-green-800"
              >
                See all prices
              </Link>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={priceHistory}>
                  <defs>
                    <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#16a34a" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                  <YAxis
                    tick={{ fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                    domain={['dataMin - 50', 'dataMax + 50']}
                    tickFormatter={(v) => `₹${v}`}
                  />
                  <Tooltip formatter={(value) => [`₹${value}`, 'Price']} />
                  <Area
                    type="monotone"
                    dataKey="price"
                    stroke="#16a34a"
                    strokeWidth={2}
                    fill="url(#priceGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Active crops + alerts + notifications */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Active crops */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900">Your Active Crops</h3>
            <Link
              to="/farmer/my-farm"
              className="text-sm font-medium text-green-700 hover:text-green-800 flex items-center gap-1"
            >
              Manage <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="space-y-4">
            {currentCrops.map((crop) => (
              <CropCard key={crop.id} crop={crop} />
            ))}
          </div>
        </div>

        {/* Weather alerts */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-600" /> Weather Advisories
          </h3>
          <div className="space-y-3">
            {alerts.map((alert) => (
              <AlertCard
                key={alert.id}
                alert={{
                  ...alert,
                  title: alert.type,
                  icon: alert.type === 'Rain Alert' ? 'cloudRain' : 'calendarClock',
                  color: alert.severity === 'Moderate' ? 'blue' : 'green',
                }}
                onDismiss={dismissAlert}
              />
            ))}
          </div>

          <h3 className="font-semibold text-gray-900 mb-3 mt-6 flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-green-600" /> Scheme Alert
          </h3>
          <div className="card p-4 bg-green-50 border-green-200">
            <Badge color="amber">Deadline Approaching</Badge>
            <h4 className="font-semibold text-gray-900 mt-2">PM Fasal Bima Yojana</h4>
            <p className="text-sm text-gray-600 mt-1">
              Last date to enroll for Kharif crop insurance is July 31. Protect your soybean and cotton crops.
            </p>
            <Link
              to="/farmer/schemes"
              className="inline-flex items-center gap-1 text-sm font-medium text-green-700 hover:text-green-800 mt-2"
            >
              View scheme <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Notifications + Recent expenses */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900">Important Notifications</h3>
            <Link
              to="/farmer/notifications"
              className="text-sm font-medium text-green-700 hover:text-green-800 flex items-center gap-1"
            >
              View all <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="card divide-y divide-gray-100">
            {notifications.slice(0, 3).map((n) => (
              <div key={n.id} className="p-4">
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{n.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{n.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h3 className="font-semibold text-gray-900 mt-6 mb-3">Recent Expenses</h3>
          <div className="card divide-y divide-gray-100">
            {recentExpenses.map((e) => (
              <div key={e.id} className="flex items-center justify-between p-4">
                <div>
                  <p className="text-sm font-medium text-gray-900">{e.description}</p>
                  <p className="text-xs text-gray-500">{e.date} • {e.category}</p>
                </div>
                <span className="text-sm font-semibold text-gray-900">₹{e.amount.toLocaleString('en-IN')}</span>
              </div>
            ))}
            <Link
              to="/farmer/expenses"
              className="block p-3 text-center text-sm font-medium text-green-700 hover:bg-green-50 rounded-b-xl"
            >
              View all expenses
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}