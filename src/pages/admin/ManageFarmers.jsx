import { useState } from 'react';
import { Users, Search, Eye, CheckCircle2, XCircle, UserPlus } from 'lucide-react';

import PageHeader from '../../components/ui/PageHeader';
import Table from '../../components/ui/Table';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';

import { adminFarmers } from '../../data/mockData';

export default function ManageFarmers() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [farmers, setFarmers] = useState(adminFarmers);
  const [viewFarmer, setViewFarmer] = useState(null);

  const filtered = farmers.filter((f) => {
    const matchesSearch =
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.id.toLowerCase().includes(search.toLowerCase()) ||
      f.village.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || f.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const updateStatus = (id, status) => {
    setFarmers((prev) => prev.map((f) => (f.id === id ? { ...f, status } : f)));
    setViewFarmer(null);
  };

  const columns = [
    { key: 'id', label: 'Farmer ID', render: (row) => <span className="font-mono text-xs">{row.id}</span> },
    { key: 'name', label: 'Name' },
    { key: 'village', label: 'Village' },
    { key: 'district', label: 'District' },
    { key: 'landSize', label: 'Land Size' },
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
    { key: 'joined', label: 'Joined' },
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
        title="Manage Farmers"
        subtitle={`${farmers.length} farmers registered`}
        icon={Users}
        actions={
          <button className="btn-primary">
            <UserPlus className="h-4 w-4" /> Add Farmer
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
                placeholder="Search by name, ID, or village..."
                className="input pl-10"
              />
            </div>
          </div>
          <div>
            <label className="label">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="input"
            >
              <option>All</option>
              <option>Active</option>
              <option>Inactive</option>
              <option>Pending</option>
            </select>
          </div>
        </div>
      </div>

      {/* Farmer table */}
      <div className="card overflow-hidden">
        <Table
          columns={columns}
          data={filtered}
          emptyMessage="No farmers match your filters"
          actions={(row) => (
            <button
              onClick={() => setViewFarmer(row)}
              className="p-2 text-green-700 hover:bg-green-50 rounded-lg"
            >
              <Eye className="h-4 w-4" />
            </button>
          )}
        />
      </div>

      {/* Farmer detail modal */}
      <Modal open={!!viewFarmer} onClose={() => setViewFarmer(null)} title={viewFarmer?.name} size="lg">
        {viewFarmer && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{viewFarmer.id}</p>
                <h4 className="text-lg font-semibold text-gray-900">{viewFarmer.name}</h4>
              </div>
              <Badge color={viewFarmer.status === 'Active' ? 'green' : viewFarmer.status === 'Pending' ? 'amber' : 'gray'}>
                {viewFarmer.status}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-earth-50 p-3 rounded-lg">
                <p className="text-xs text-gray-500">Village</p>
                <p className="font-medium">{viewFarmer.village}</p>
              </div>
              <div className="bg-earth-50 p-3 rounded-lg">
                <p className="text-xs text-gray-500">District</p>
                <p className="font-medium">{viewFarmer.district}</p>
              </div>
              <div className="bg-earth-50 p-3 rounded-lg">
                <p className="text-xs text-gray-500">Land Size</p>
                <p className="font-medium">{viewFarmer.landSize}</p>
              </div>
              <div className="bg-earth-50 p-3 rounded-lg">
                <p className="text-xs text-gray-500">Phone</p>
                <p className="font-medium">{viewFarmer.phone}</p>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700 mb-1">Crops Grown</p>
              <div className="flex gap-1.5 flex-wrap">
                {viewFarmer.crops.map((crop) => (
                  <Badge key={crop} color="green">{crop}</Badge>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
              {viewFarmer.status === 'Pending' ? (
                <>
                  <button
                    onClick={() => updateStatus(viewFarmer.id, 'Active')}
                    className="btn-primary"
                  >
                    <CheckCircle2 className="h-4 w-4" /> Approve
                  </button>
                  <button
                    onClick={() => updateStatus(viewFarmer.id, 'Inactive')}
                    className="btn-secondary"
                  >
                    <XCircle className="h-4 w-4" /> Reject
                  </button>
                </>
              ) : (
                <button
                  onClick={() => updateStatus(viewFarmer.id, viewFarmer.status === 'Active' ? 'Inactive' : 'Active')}
                  className="btn-secondary"
                >
                  {viewFarmer.status === 'Active' ? 'Deactivate' : 'Reactivate'}
                </button>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}