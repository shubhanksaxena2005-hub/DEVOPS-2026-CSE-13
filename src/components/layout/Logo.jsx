import { Sprout } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Logo({ size = 'md', variant = 'dark' }) {
  const textColor = variant === 'light' ? 'text-white' : 'text-gray-900';
  const subColor = variant === 'light' ? 'text-green-200' : 'text-green-700';

  const sizes = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
  };

  return (
    <Link to="/" className="flex items-center gap-2.5">
      <div className={`${sizes[size]} rounded-xl bg-green-700 flex items-center justify-center`}>
        <Sprout className="h-2/3 w-2/3 text-white" />
      </div>
      <div className="leading-tight">
        <span className={`font-display font-bold text-lg ${textColor}`}>AgriSathi</span>
        <p className={`text-[11px] ${subColor}`}>Smart Farming Platform</p>
      </div>
    </Link>
  );
}