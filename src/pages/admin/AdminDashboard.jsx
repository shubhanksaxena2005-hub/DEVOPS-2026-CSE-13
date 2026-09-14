import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Users,
  UserCheck,
  Landmark,
  FileBarChart2,
  ChevronRight,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

import PageHeader from '../../components/ui/PageHeader';
import DashboardCard from '../../components/ui/DashboardCard';
import Table from '../../components/ui/Table';
import Badge from '../../components/ui/Badge';

import { adminStats, adminFarmers, adminReports } from '../../data/mockData';

const registrationTrend = [
  { month: 'Feb', farmers: 80 },
  { month: 'Mar', farmers: 140 },
  { month: 'Apr', farmers: 110 },
  { month: 'May', farmers: 190 },
  { month: 'Jun', farmers: 230 },
  { month: 'Jul', farmers: 270 },
  { month: 'Aug', farmers: 240 },
];

const consultationsByExpert = [
  { name: 'Dr. Patil', consultations: 58 },
  { name: 'Dr. Deshmukh', consultations: 46 },
  { name: 'Dr. More', consultations: 34 },
  { name: 'Dr. Jadhav', consultations: 41 },
  { name: 'Dr. Ghule', consultations: 22 },
];

export default function AdminDashboard() {
  const recentFarmers = adminFarmers.slice(0, 5);

  const farmerColumns = [
    { key: 'id', label: 'Farmer ID' },
    { key: 'name', label: 'Name' },
    { key: 'village', label: 'Village' },
    { key: 'district', label: 'District' },
    {
      key: 'crops',
      label: 'Crops',
      render: (row) => (
        <div className="flex gap-1 flex-wrap">
          {row.crops.map((crop) => (
            <Badge key={crop} color="green">{crop}</Badge>
          ))}
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (row) => (
        <Badge color={row.status === 'Active' ? 'green' : row.status === 'Pending' ? 'amber' : 'gray'}>
          {row.status}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Admin Dashboard"
        subtitle="Platform overview and key metrics"
        icon={ShieldCheck}
      />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard
          title="Total Farmers"
          value={adminStats.totalFarmers.toLocaleString()}
          subtitle={`${adminStats.activeFarmers.toLocaleString()} active`}
          icon={Users}
          color="green"
          change="+8% this month"
          changeType="up"
        />
        <DashboardCard
          title="Registered Experts"
          value={adminStats.totalExperts}
          subtitle={`${adminStats.activeExperts} active`}
          icon={UserCheck}
          color="blue"
          change="+2 this month"
          changeType="up"
        />
        <DashboardCard
          title="Schemes Listed"
          value={adminStats.schemesListed}
          subtitle="Government programs"
          icon={Landmark}
          color="amber"
        />
        <DashboardCard
          title="Reports Generated"
          value={adminStats.totalReportsGenerated}
          subtitle={`Avg response ${adminStats.avgResponseTime}`}
          icon={FileBarChart2}
          color="earth"
          change="-3% this month"
          changeType="down"
        />
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Farmer registrations */}
        <div className="card p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Farmer Registrations</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={registrationTrend}>
                <defs>
                  <linearGradient id="farmerGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16a34a" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                <Tooltip formatter={(value) => [value, 'Farmers']} />
                <Area
                  type="monotone"
                  dataKey="farmers"
                  stroke="#16a34a"
                  strokeWidth={2}
                  fill="url(#farmerGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Consultations by expert */}
        <div className="card p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Consultations by Expert</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={consultationsByExpert}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                <Tooltip formatter={(value) => [value, 'Consultations']} />
                <Bar dataKey="consultations" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent farmers */}
      <div className="card overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">Recent Farmer Registrations</h3>
          <Link
            to="/admin/farmers"
            className="text-sm font-medium text-green-700 hover:text-green-800 flex items-center gap-1"
          >
            View all <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <Table columns={farmerColumns} data={recentFarmers} />
      </div>

      {/* Recent reports */}
      <div className="card overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">Recent Reports</h3>
          <Link
            to="/admin/reports"
            className="text-sm font-medium text-green-700 hover:text-green-800 flex items-center gap-1"
          >
            View all <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="divide-y divide-gray-100">
          {adminReports.slice(0, 3).map((report) => (
            <div key={report.id} className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-earth-100 text-earth-700">
                  <FileBarChart2 className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{report.name}</p>
                  <p className="text-xs text-gray-500">{report.type} • {report.period} • {report.size}</p>
                </div>
              </div>
              <Badge color={report.status === 'Ready' ? 'green' : 'amber'}>{report.status}</Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}