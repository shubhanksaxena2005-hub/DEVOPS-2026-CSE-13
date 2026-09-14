import { useState } from 'react';
import { TrendingUp, Search, MapPin } from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  Legend,
} from 'recharts';

import PageHeader from '../../components/ui/PageHeader';
import PriceCard from '../../components/ui/PriceCard';
import Table from '../../components/ui/Table';
import Badge from '../../components/ui/Badge';

import {
  mandiPrices,
  cropOptions,
  marketOptions,
  priceHistory,
  marketComparison,
} from '../../data/mockData';

export default function MandiPrices() {
  const [selectedCrop, setSelectedCrop] = useState('Wheat');
  const [selectedMarket, setSelectedMarket] = useState('Nashik APMC');
  const [search, setSearch] = useState('');

  const filteredPrices = mandiPrices.filter((p) => {
    const matchesSearch =
      p.crop.toLowerCase().includes(search.toLowerCase()) ||
      p.market.toLowerCase().includes(search.toLowerCase());
    const matchesCrop = selectedCrop === 'All' || p.crop === selectedCrop;
    const matchesMarket = selectedMarket === 'All' || p.market === selectedMarket;
    return matchesSearch && matchesCrop && matchesMarket;
  });

  const selectedPriceInfo = mandiPrices.find((p) => p.crop === selectedCrop);

  const tableColumns = [
    { key: 'crop', label: 'Crop' },
    { key: 'market', label: 'Market' },
    {
      key: 'current',
      label: 'Current Price',
      render: (row) => <span className="font-semibold">₹{row.current.toLocaleString('en-IN')}</span>,
    },
    {
      key: 'previous',
      label: 'Previous',
      render: (row) => <span>₹{row.previous.toLocaleString('en-IN')}</span>,
    },
    {
      key: 'change',
      label: 'Change',
      render: (row) => (
        <span className={row.change >= 0 ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
          {row.change >= 0 ? '+' : ''}{row.change} (₹{row.changePercent}%)
        </span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (row) => (
        <Badge color={row.change >= 0 ? 'green' : 'red'}>
          {row.change >= 0 ? 'Increased' : 'Decreased'}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Mandi Prices"
        subtitle="Live prices from APMC markets in your region"
        icon={TrendingUp}
      />

      {/* Filters */}
      <div className="card p-5">
        <div className="grid md:grid-cols-4 gap-4">
          <div>
            <label className="label">Crop</label>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="input"
            >
              <option value="All">All Crops</option>
              {cropOptions.map((crop) => (
                <option key={crop} value={crop}>{crop}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">Market</label>
            <select
              value={selectedMarket}
              onChange={(e) => setSelectedMarket(e.target.value)}
              className="input"
            >
              <option value="All">All Markets</option>
              {marketOptions.map((market) => (
                <option key={market} value={market}>{market}</option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="label">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search crop or market..."
                className="input pl-10"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Price cards */}
      {selectedPriceInfo && (
        <div className="grid sm:grid-cols-3 gap-4">
          <PriceCard price={selectedPriceInfo} />
          <div className="card p-5 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Last Updated</p>
              <p className="text-lg font-bold text-gray-900">{selectedPriceInfo.date}, 2026</p>
              <p className="text-xs text-gray-500 mt-1">Mandi opening hours: 8 AM - 2 PM</p>
            </div>
            <MapPin className="h-8 w-8 text-earth-500" />
          </div>
          <div className="card p-5">
            <p className="text-sm text-gray-500">Price Trend</p>
            <p className="text-lg font-bold text-gray-900">
              {selectedPriceInfo.change >= 0 ? (
                <span className="text-green-600">↑ Rising</span>
              ) : (
                <span className="text-red-600">↓ Falling</span>
              )}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {selectedPriceInfo.market} — last 2 months
            </p>
          </div>
        </div>
      )}

      {/* Price history chart */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-gray-900">
              Historical Price — {selectedCrop === 'All' ? 'Wheat' : selectedCrop}
            </h3>
            <p className="text-xs text-gray-500">Last 2 months at {selectedMarket === 'All' ? 'Nashik APMC' : selectedMarket}</p>
          </div>
        </div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={priceHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
              <YAxis
                tick={{ fontSize: 11 }}
                tickLine={false}
                axisLine={false}
                domain={['dataMin - 50', 'dataMax + 50']}
                tickFormatter={(v) => `₹${v}`}
              />
              <Tooltip formatter={(value) => [`₹${value}`, 'Price']} />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#16a34a"
                strokeWidth={2.5}
                dot={{ r: 3, fill: '#16a34a' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Market comparison */}
      <div className="card p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Market Comparison</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={marketComparison}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="market" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
              <YAxis
                tick={{ fontSize: 11 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `₹${v}`}
              />
              <Tooltip formatter={(value) => [`₹${value}`, '']} />
              <Legend />
              <Bar dataKey="current" name="Current Price" fill="#16a34a" radius={[4, 4, 0, 0]} />
              <Bar dataKey="previous" name="Previous Price" fill="#d4b894" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Full price table */}
      <div className="card overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">All Mandi Prices</h3>
        </div>
        <Table columns={tableColumns} data={filteredPrices} emptyMessage="No prices match your filters" />
      </div>

      <p className="text-xs text-gray-400 text-center">
        Prices shown are mock data for frontend demonstration. Will be connected to real mandi API in the backend phase.
      </p>
    </div>
  );
}