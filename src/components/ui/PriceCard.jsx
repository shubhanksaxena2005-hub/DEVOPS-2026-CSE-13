import { TrendingUp, TrendingDown } from 'lucide-react';

export default function PriceCard({ price, className = '' }) {
  const isUp = price.change > 0;
  const isDown = price.change < 0;

  return (
    <div className={`card p-5 ${className}`}>
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-gray-900">{price.crop}</h3>
          <p className="text-xs text-gray-500">{price.market}</p>
        </div>
        {isUp ? (
          <span className="flex items-center gap-1 text-xs font-medium text-green-700 bg-green-50 px-2 py-1 rounded-full">
            <TrendingUp className="h-3 w-3" /> +{price.changePercent}%
          </span>
        ) : isDown ? (
          <span className="flex items-center gap-1 text-xs font-medium text-red-700 bg-red-50 px-2 py-1 rounded-full">
            <TrendingDown className="h-3 w-3" /> {price.changePercent}%
          </span>
        ) : (
          <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">0%</span>
        )}
      </div>

      <div className="mt-3 flex items-end gap-1">
        <span className="text-2xl font-bold text-gray-900">₹{price.current.toLocaleString('en-IN')}</span>
        <span className="text-xs text-gray-500 mb-1">{price.unit}</span>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3 text-xs">
        <div className="text-gray-500">
          Previous: <span className="font-medium text-gray-700">₹{price.previous.toLocaleString('en-IN')}</span>
        </div>
        <div className="flex items-center gap-1">
          {isUp && <TrendingUp className="h-3 w-3 text-green-600" />}
          {isDown && <TrendingDown className="h-3 w-3 text-red-600" />}
          <span className={isUp ? 'text-green-600 font-medium' : isDown ? 'text-red-600 font-medium' : 'text-gray-500 font-medium'}>
            {isUp ? '+' : ''}₹{price.change.toLocaleString('en-IN')}
          </span>
        </div>
      </div>
    </div>
  );
}