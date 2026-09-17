import { Cloud, Sun, CloudSun, CloudRain, Droplets, Wind, Thermometer, AlertTriangle } from 'lucide-react';

import PageHeader from '../../components/ui/PageHeader';
import WeatherCard from '../../components/ui/WeatherCard';
import AlertCard from '../../components/ui/AlertCard';
import Badge from '../../components/ui/Badge';

import { currentWeather, weatherForecast, weatherAlerts } from '../../data/mockData';

function ForecastIcon({ condition }) {
  const c = condition.toLowerCase();
  if (c.includes('sun')) return <Sun className="h-6 w-6 text-amber-500" />;
  if (c.includes('rain') || c.includes('thunder')) return <CloudRain className="h-6 w-6 text-blue-500" />;
  if (c.includes('cloud')) return <Cloud className="h-6 w-6 text-gray-400" />;
  return <CloudSun className="h-6 w-6 text-amber-400" />;
}

export default function WeatherPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Weather"
        subtitle="Local weather and farming advisories"
        icon={Cloud}
      />

      <div className="grid lg:grid-cols-3 gap-6">
        <WeatherCard weather={currentWeather} />
        <div className="lg:col-span-2">
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">7-Day Forecast</h3>
              <Badge color="blue">Updated: {currentWeather.updatedAt}</Badge>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-7 gap-3">
              {weatherForecast.map((day) => (
                <div key={day.date} className="p-3 rounded-lg bg-earth-50 text-center">
                  <p className="text-xs font-semibold text-gray-700">{day.day}</p>
                  <p className="text-[10px] text-gray-400">{day.date}</p>
                  <div className="my-2 flex justify-center">
                    <ForecastIcon condition={day.condition} />
                  </div>
                  <p className="text-sm font-bold text-gray-900">{day.high}°</p>
                  <p className="text-xs text-gray-500">{day.low}°</p>
                  <p className="text-[10px] text-blue-600 mt-1">
                    {day.rainfall > 0 ? `${day.rainfall} mm rain` : 'No rain'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Detailed weather metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card p-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-amber-100 text-amber-700">
              <Thermometer className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Temperature</p>
              <p className="text-xl font-bold text-gray-900">{currentWeather.temperature}°C</p>
            </div>
          </div>
        </div>
        <div className="card p-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-blue-100 text-blue-700">
              <Droplets className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Humidity</p>
              <p className="text-xl font-bold text-gray-900">{currentWeather.humidity}%</p>
            </div>
          </div>
        </div>
        <div className="card p-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-teal-100 text-teal-700">
              <Wind className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Wind Speed</p>
              <p className="text-xl font-bold text-gray-900">{currentWeather.windSpeed} km/h</p>
            </div>
          </div>
        </div>
        <div className="card p-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-purple-100 text-purple-700">
              <Droplets className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Rainfall Today</p>
              <p className="text-xl font-bold text-gray-900">{currentWeather.rainfall} mm</p>
            </div>
          </div>
        </div>
      </div>

      {/* Farming alerts */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-amber-600" /> Farming Alerts
        </h3>
        <div className="space-y-3">
          {weatherAlerts.map((alert) => (
            <AlertCard
              key={alert.id}
              alert={{
                ...alert,
                title: alert.type,
                icon: alert.type === 'Rain Alert' ? 'cloudRain' : 'calendarClock',
                color: alert.severity === 'Moderate' ? 'blue' : 'green',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}