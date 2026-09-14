import { Sprout, Calendar, CalendarClock, Droplets } from 'lucide-react';
import Badge from './Badge';

const healthColors = {
  Good: 'green',
  Fair: 'amber',
  Poor: 'red',
};

export default function CropCard({ crop, className = '' }) {
  return (
    <div className={`card p-5 ${className}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-green-100 text-green-700">
            <Sprout className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{crop.name}</h3>
            <p className="text-xs text-gray-500">{crop.variety}</p>
          </div>
        </div>
        <Badge color={healthColors[crop.health] || 'gray'}>{crop.health}</Badge>
      </div>

      <div className="mt-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">Area</span>
          <span className="font-medium text-gray-800">{crop.area}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Status</span>
          <span className="font-medium text-gray-800">{crop.status}</span>
        </div>
      </div>

      <div className="mt-4 space-y-1.5 border-t border-gray-100 pt-3 text-xs">
        <div className="flex items-center gap-1.5 text-gray-600">
          <Calendar className="h-3.5 w-3.5 text-green-600" />
          Planted: <span className="font-medium">{crop.plantedDate}</span>
        </div>
        <div className="flex items-center gap-1.5 text-gray-600">
          <CalendarClock className="h-3.5 w-3.5 text-amber-600" />
          Harvest: <span className="font-medium">{crop.expectedHarvest}</span>
        </div>
      </div>

      <div className="mt-3">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>Growth Progress</span>
          <span>{crop.progress}%</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-600 rounded-full"
            style={{ width: `${crop.progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}