import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, Map, Wallet, CalendarDays, BookOpen, ArrowRight, CheckCircle2, Circle } from 'lucide-react';

import PageHeader from '../../components/ui/PageHeader';
import DashboardCard from '../../components/ui/DashboardCard';
import Badge from '../../components/ui/Badge';
import { LoadingState, ErrorState, EmptyState } from '../../components/ui/StatusState';
import { api, formatDate, formatINR } from '../../lib/api';

// Total land, shown with its unit when every farm uses the same unit
function landSummary(farms) {
  if (farms.length === 0) return 'No farms added yet';
  const units = new Set(farms.map((f) => f.landUnit));
  const total = farms.reduce((sum, f) => sum + (f.landArea || 0), 0);
  return units.size === 1 ? `${total} ${[...units][0]} total` : `${total} (mixed units)`;
}

export default function FarmerDashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  const load = useCallback(() => {
    setError('');
    api
      .get('/dashboard')
      .then((res) => setData(res.dashboard))
      .catch((err) => setError(err.message));
  }, []);

  useEffect(load, [load]);

  if (error) return <ErrorState message={error} onRetry={load} />;
  if (!data) return <LoadingState text="Loading your dashboard..." />;

  const { farmer, farmsSummary, expensesSummary, activitiesSummary, recentExpenses, recentActivities } = data;
  const maxCategory = Math.max(...expensesSummary.byCategory.map((c) => c.total), 1);

  const steps = [
    { done: farmsSummary.count > 0, label: 'Add your farm details', to: '/farmer/my-farm' },
    { done: expensesSummary.count > 0, label: 'Record your first expense', to: '/farmer/expenses' },
    { done: activitiesSummary.count > 0, label: 'Log a farm activity', to: '/farmer/journal' },
  ];
  const isNewUser = steps.some((s) => !s.done);

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Namaste, ${farmer.name.split(' ')[0]}!`}
        subtitle="Here's a summary of everything you've recorded"
        icon={LayoutDashboard}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard
          title="My Farms"
          value={farmsSummary.count}
          subtitle={landSummary(farmsSummary.farms)}
          icon={Map}
          color="green"
        />
        <DashboardCard
          title="Total Expenses"
          value={formatINR(expensesSummary.total)}
          subtitle={`${expensesSummary.count} entries`}
          icon={Wallet}
          color="earth"
        />
        <DashboardCard
          title="This Month"
          value={formatINR(expensesSummary.thisMonth)}
          subtitle={new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
          icon={CalendarDays}
          color="amber"
        />
        <DashboardCard
          title="Journal Entries"
          value={activitiesSummary.count}
          subtitle="Farm activities logged"
          icon={BookOpen}
          color="blue"
        />
      </div>

      {isNewUser && (
        <div className="card p-5">
          <h2 className="font-semibold text-gray-900 mb-3">Get started</h2>
          <ul className="space-y-2">
            {steps.map((step) => (
              <li key={step.to}>
                <Link
                  to={step.to}
                  className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-green-50 text-sm"
                >
                  <span className="flex items-center gap-2">
                    {step.done ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    ) : (
                      <Circle className="h-5 w-5 text-gray-300" />
                    )}
                    <span className={step.done ? 'text-gray-400 line-through' : 'text-gray-700'}>{step.label}</span>
                  </span>
                  {!step.done && <ArrowRight className="h-4 w-4 text-green-700" />}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Spending by category */}
        <div className="card p-5">
          <h2 className="font-semibold text-gray-900 mb-4">Spending by Category</h2>
          {expensesSummary.byCategory.length === 0 ? (
            <EmptyState title="No expenses yet" message="Categories appear once you add expenses." />
          ) : (
            <ul className="space-y-3">
              {expensesSummary.byCategory.map((c) => (
                <li key={c.category}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700">{c.category}</span>
                    <span className="font-medium text-gray-900">{formatINR(c.total)}</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-100">
                    <div
                      className="h-2 rounded-full bg-green-600"
                      style={{ width: `${(c.total / maxCategory) * 100}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Recent expenses */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900">Recent Expenses</h2>
            <Link to="/farmer/expenses" className="text-sm font-medium text-green-700 hover:text-green-800">
              View all
            </Link>
          </div>
          {recentExpenses.length === 0 ? (
            <EmptyState title="Nothing recorded" />
          ) : (
            <ul className="divide-y divide-gray-100">
              {recentExpenses.map((e) => (
                <li key={e._id} className="py-2.5 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{e.description}</p>
                    <p className="text-xs text-gray-500">
                      {e.category} · {formatDate(e.date)}
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-gray-900 shrink-0">{formatINR(e.amount)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Recent activities */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900">Recent Activities</h2>
            <Link to="/farmer/journal" className="text-sm font-medium text-green-700 hover:text-green-800">
              View all
            </Link>
          </div>
          {recentActivities.length === 0 ? (
            <EmptyState title="No activities logged" />
          ) : (
            <ul className="divide-y divide-gray-100">
              {recentActivities.map((a) => (
                <li key={a._id} className="py-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium text-gray-800 truncate">{a.title}</p>
                    <Badge color="green">{a.activityType}</Badge>
                  </div>
                  <p className="text-xs text-gray-500">
                    {formatDate(a.date)}
                    {a.cropName && ` · ${a.cropName}`}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
