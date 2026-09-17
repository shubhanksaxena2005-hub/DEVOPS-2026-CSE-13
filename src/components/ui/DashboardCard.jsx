import { TrendingUp, TrendingDown } from 'lucide-react';

export default function DashboardCard({
  title,
  value,
  icon: Icon,
  subtitle,
  change,
  changeType,
  color = 'green',
  loading = false,
}) {
  const colorClasses = {
    green: 'bg-green-100 text-green-700',
    blue: 'bg-blue-100 text-blue-700',
    amber: 'bg-amber-100 text-amber-700',
    red: 'bg-red-100 text-red-700',
    earth: 'bg-earth-100 text-earth-700',
    purple: 'bg-purple-100 text-purple-700',
  };

  return (
    <div className="card p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          {loading ? (
            <div className="mt-2 h-8 w-24 bg-gray-200 animate-pulse rounded" />
          ) : (
            <p className="mt-1 text-2xl font-bold text-gray-900">{value}</p>
          )}
          {subtitle && !loading && <p className="mt-1 text-xs text-gray-500">{subtitle}</p>}
        </div>
        {Icon && (
          <div className={`p-2.5 rounded-lg ${colorClasses[color] || colorClasses.green}`}>
            <Icon className="h-5 w-5" />
          </div>
        )}
      </div>
      {change !== undefined && !loading && (
        <div className="mt-3 flex items-center gap-1 text-xs">
          {changeType === 'up' ? (
            <TrendingUp className="h-3.5 w-3.5 text-green-600" />
          ) : changeType === 'down' ? (
            <TrendingDown className="h-3.5 w-3.5 text-red-600" />
          ) : null}
          <span className={changeType === 'down' ? 'text-red-600 font-medium' : 'text-green-600 font-medium'}>
            {change}
          </span>
        </div>
      )}
    </div>
  );
}