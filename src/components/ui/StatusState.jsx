import { Loader2, Inbox, AlertTriangle } from 'lucide-react';

export function LoadingState({ text = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-gray-500">
      <Loader2 className="h-8 w-8 animate-spin text-green-600 mb-3" />
      <p className="text-sm">{text}</p>
    </div>
  );
}

export function EmptyState({ title = 'No data available', message, icon: Icon = Inbox }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <Icon className="h-12 w-12 text-gray-300 mb-3" />
      <p className="font-medium text-gray-700">{title}</p>
      {message && <p className="text-sm text-gray-500 mt-1">{message}</p>}
    </div>
  );
}

export function ErrorState({ title = 'Something went wrong', message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="p-3 rounded-full bg-red-100 text-red-600 mb-3">
        <AlertTriangle className="h-8 w-8" />
      </div>
      <p className="font-medium text-gray-700">{title}</p>
      {message && <p className="text-sm text-gray-500 mt-1 max-w-md">{message}</p>}
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 text-sm font-medium text-green-700 hover:text-green-800"
        >
          Try Again
        </button>
      )}
    </div>
  );
}

export function InfoBanner({ icon: Icon, title, message, color = 'blue' }) {
  const colors = {
    blue: 'bg-blue-50 border-blue-200 text-blue-800',
    green: 'bg-green-50 border-green-200 text-green-800',
    amber: 'bg-amber-50 border-amber-200 text-amber-800',
    gray: 'bg-gray-50 border-gray-200 text-gray-700',
  };

  return (
    <div className={`flex items-start gap-3 p-4 rounded-lg border ${colors[color]}`}>
      {Icon && <Icon className="h-5 w-5 shrink-0 mt-0.5" />}
      <div>
        <p className="font-medium text-sm">{title}</p>
        {message && <p className="text-sm mt-0.5 opacity-90">{message}</p>}
      </div>
    </div>
  );
}