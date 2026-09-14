import { useState } from 'react';
import { Bell, Check, CloudRain, TrendingUp, CalendarClock, ShieldCheck, UserCheck, ThermometerSun, AlertTriangle } from 'lucide-react';

import PageHeader from '../../components/ui/PageHeader';
import Badge from '../../components/ui/Badge';

import { notifications as initialNotifications } from '../../data/mockData';

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

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState('all');

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const filtered = notifications.filter((n) => {
    if (filter === 'unread') return !n.read;
    if (filter === 'weather') return n.type === 'weather';
    if (filter === 'mandi') return n.type === 'mandi';
    if (filter === 'reminder') return n.type === 'reminder';
    if (filter === 'scheme') return n.type === 'scheme';
    if (filter === 'expert') return n.type === 'expert';
    return true;
  });

  const typeLabels = {
    weather: 'Weather Alert',
    mandi: 'Mandi Price',
    reminder: 'Farm Reminder',
    scheme: 'Scheme Update',
    expert: 'Expert Response',
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Notifications"
        subtitle={`${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}`}
        icon={Bell}
        actions={
          unreadCount > 0 && (
            <button onClick={markAllRead} className="btn-secondary">
              <Check className="h-4 w-4" /> Mark All Read
            </button>
          )
        }
      />

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2">
        {[
          { key: 'all', label: 'All' },
          { key: 'unread', label: 'Unread' },
          { key: 'weather', label: 'Weather' },
          { key: 'mandi', label: 'Mandi' },
          { key: 'reminder', label: 'Reminders' },
          { key: 'scheme', label: 'Schemes' },
          { key: 'expert', label: 'Expert' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === tab.key
                ? 'bg-green-700 text-white'
                : 'bg-white border border-gray-200 text-gray-600 hover:border-green-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Notification list */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="card p-12 text-center text-gray-500">
            <Bell className="h-10 w-10 text-gray-300 mx-auto mb-3" />
            No notifications in this category
          </div>
        ) : (
          filtered.map((notification) => {
            const Icon = iconMap[notification.icon] || iconMap.default;
            const colorClass = colorMap[notification.color] || colorMap.blue;
            return (
              <div
                key={notification.id}
                className={`card p-4 flex items-start gap-4 ${
                  !notification.read ? 'border-green-300 bg-green-50/50' : ''
                }`}
                onClick={() => markAsRead(notification.id)}
                role="button"
                tabIndex="0"
              >
                <div className={`shrink-0 p-2.5 rounded-lg ${colorClass}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-gray-900 text-sm">{notification.title}</p>
                        <Badge color={notification.color || 'gray'}>
                          {typeLabels[notification.type] || notification.type}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">{notification.date}</p>
                    </div>
                    {!notification.read && (
                      <span className="shrink-0 h-2 w-2 rounded-full bg-green-600 mt-1" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-2 leading-relaxed">{notification.message}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}