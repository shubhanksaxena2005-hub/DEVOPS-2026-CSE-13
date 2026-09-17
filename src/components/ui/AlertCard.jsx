import { AlertTriangle, CloudRain, Droplets, CalendarClock, ShieldCheck, TrendingUp, UserCheck, ThermometerSun } from 'lucide-react';
import Badge from './Badge';

const iconMap = {
  cloudRain: CloudRain,
  trendingUp: TrendingUp,
  calendarClock: CalendarClock,
  shieldCheck: ShieldCheck,
  userCheck: UserCheck,
  thermometerSun: ThermometerSun,
  default: AlertTriangle,
};

const colorMap = {
  blue: 'bg-blue-100 text-blue-700',
  green: 'bg-green-100 text-green-700',
  amber: 'bg-amber-100 text-amber-700',
  earth: 'bg-earth-100 text-earth-700',
  orange: 'bg-orange-100 text-orange-700',
  red: 'bg-red-100 text-red-700',
};

const severityBadge = {
  Low: 'green',
  Moderate: 'amber',
  High: 'red',
  Critical: 'red',
};

export default function AlertCard({ alert, onDismiss, className = '' }) {
  const Icon = iconMap[alert.icon] || iconMap.default;
  const colorClass = colorMap[alert.color] || colorMap.blue;

  return (
    <div className={`card p-4 flex gap-3 ${className}`}>
      <div className={`shrink-0 p-2.5 rounded-lg ${colorClass}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="font-semibold text-gray-900 text-sm">{alert.title}</p>
            <p className="text-xs text-gray-500 mt-0.5">{alert.date}</p>
          </div>
          {alert.severity && (
            <Badge color={severityBadge[alert.severity] || 'gray'}>{alert.severity}</Badge>
          )}
        </div>
        <p className="text-sm text-gray-600 mt-1.5 leading-relaxed">{alert.message}</p>
      </div>
      {onDismiss && (
        <button
          onClick={() => onDismiss(alert.id)}
          className="text-gray-400 hover:text-gray-600 text-xs font-medium shrink-0"
        >
          Dismiss
        </button>
      )}
    </div>
  );
}