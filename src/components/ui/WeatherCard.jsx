import { Cloud, Sun, CloudRain, CloudSun, Droplets, Wind, Thermometer } from 'lucide-react';

function getWeatherIcon(condition) {
  const c = condition.toLowerCase();
  if (c.includes('sun') || c.includes('clear')) return Sun;
  if (c.includes('rain') || c.includes('thunder')) return CloudRain;
  if (c.includes('cloud')) return Cloud;
  return CloudSun;
}

export default function WeatherCard({ weather, forecast = [], className = '' }) {
  const Icon = getWeatherIcon(weather.condition);

  return (
    <div className={`card p-5 ${className}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{weather.location}</p>
          <p className="text-xs text-gray-400">{weather.updatedAt}</p>
        </div>
        <Icon className="h-8 w-8 text-amber-500" />
      </div>

      <div className="mt-3 flex items-end gap-2">
        <span className="text-4xl font-bold text-gray-900">{weather.temperature}°</span>
        <span className="mb-1 text-sm text-gray-500">Feels {weather.feelsLike}°</span>
      </div>
      <p className="text-sm font-medium text-green-700">{weather.condition}</p>

      <div className="mt-4 grid grid-cols-3 gap-3 border-t border-gray-100 pt-4">
        <div className="flex items-center gap-1.5">
          <Droplets className="h-4 w-4 text-blue-500" />
          <div>
            <p className="text-xs text-gray-500">Humidity</p>
            <p className="text-sm font-semibold">{weather.humidity}%</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <Wind className="h-4 w-4 text-teal-500" />
          <div>
            <p className="text-xs text-gray-500">Wind</p>
            <p className="text-sm font-semibold">{weather.windSpeed} km/h</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <Thermometer className="h-4 w-4 text-amber-500" />
          <div>
            <p className="text-xs text-gray-500">Rainfall</p>
            <p className="text-sm font-semibold">{weather.rainfall} mm</p>
          </div>
        </div>
      </div>

      <div className="mt-4 border-t border-gray-100 pt-3 flex items-center justify-between text-xs text-gray-500">
        <span>Sunrise: <span className="font-medium text-gray-700">{weather.sunrise}</span></span>
        <span>Sunset: <span className="font-medium text-gray-700">{weather.sunset}</span></span>
      </div>
    </div>
  );
}