import { useState } from 'react';
import {
  FileBarChart2,
  Search,
  Download,
  Eye,
  FileText,
  Calendar,
  RefreshCw,
  FileSpreadsheet,
  FilePieChart,
} from 'lucide-react';

import PageHeader from '../../components/ui/PageHeader';
import Table from '../../components/ui/Table';
import Badge from '../../components/ui/Badge';

import { adminReports } from '../../data/mockData';

const reportTypeIcons = {
  Farmers: FileText,
  Crops: FileSpreadsheet,
  Mandi: FileBarChart2,
  Schemes: FilePieChart,
  Consultations: FileText,
  default: FileBarChart2,
};

export default function ManageReports() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');

  const filtered = adminReports.filter((report) => {
    const matchesSearch =
      report.name.toLowerCase().includes(search.toLowerCase()) ||
      report.type.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === 'All' || report.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const columns = [
    {
      key: 'name',
      label: 'Report',
      render: (row) => {
        const Icon = reportTypeIcons[row.type] || reportTypeIcons.default;
        return (
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-earth-100 text-earth-700">
              <Icon className="h-4 w-4" />
            </div>
            <div>
              <p className="font-medium text-gray-900">{row.name}</p>
              <p className="text-xs text-gray-500">{row.id}</p>
            </div>
          </div>
        );
      },
    },
    {
      key: 'type',
      label: 'Type',
      render: (row) => <Badge color="blue">{row.type}</Badge>,
    },
    { key: 'period', label: 'Period' },
    {
      key: 'generated',
      label: 'Generated',
      render: (row) => (
        <span className="flex items-center gap-1.5 text-sm text-gray-600">
          <Calendar className="h-3.5 w-3.5 text-gray-400" /> {row.generated}
        </span>
      ),
    },
    { key: 'size', label: 'Size' },
    {
      key: 'status',
      label: 'Status',
      render: (row) => (
        <Badge color={row.status === 'Ready' ? 'green' : 'amber'}>
          {row.status === 'Ready' && <RefreshCw className="h-3 w-3 inline mr-1 -mt-0.5" />}
          {row.status}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Manage Reports"
        subtitle="Generated platform reports and analytics"
        icon={FileBarChart2}
        actions={
          <button className="btn-primary">
            <RefreshCw className="h-4 w-4" /> Generate New Report
          </button>
        }
      />

      {/* Filters */}
      <div className="card p-5">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="label">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search reports..."
                className="input pl-10"
              />
            </div>
          </div>
          <div>
            <label className="label">Type</label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="input"
            >
              <option>All</option>
              <option>Farmers</option>
              <option>Crops</option>
              <option>Mandi</option>
              <option>Schemes</option>
              <option>Consultations</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reports table */}
      <div className="card overflow-hidden">
        <Table
          columns={columns}
          data={filtered}
          emptyMessage="No reports match your filters"
          actions={(row) => (
            <>
              <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg" title="View">
                <Eye className="h-4 w-4" />
              </button>
              <button
                className="p-2 text-green-700 hover:bg-green-50 rounded-lg"
                title="Download"
                disabled={row.status !== 'Ready'}
              >
                <Download className="h-4 w-4" />
              </button>
            </>
          )}
        />
      </div>
    </div>
  );
}