import { useState } from 'react';
import { UserCheck, Search, Plus, Star, Eye, CheckCircle2, XCircle } from 'lucide-react';

import PageHeader from '../../components/ui/PageHeader';
import Table from '../../components/ui/Table';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import { Input, Select, FieldGroup, TextArea } from '../../components/ui/FormInputs';

import { adminExperts } from '../../data/mockData';

export default function ManageExperts() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [experts, setExperts] = useState(adminExperts);
  const [viewExpert, setViewExpert] = useState(null);
  const [showAddExpert, setShowAddExpert] = useState(false);

  const filtered = experts.filter((e) => {
    const matchesSearch =
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.specialty.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || e.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const updateStatus = (id, status) => {
    setExperts((prev) => prev.map((e) => (e.id === id ? { ...e, status } : e)));
    setViewExpert(null);
  };

  const columns = [
    { key: 'id', label: 'ID', render: (row) => <span className="font-mono text-xs">{row.id}</span> },
    { key: 'name', label: 'Name' },
    { key: 'specialty', label: 'Specialty' },
    { key: 'experience', label: 'Experience' },
    {
      key: 'rating',
      label: 'Rating',
      render: (row) => (
        <span className="flex items-center gap-1">
          <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
          {row.rating}
        </span>
      ),
    },
    { key: 'consultations', label: 'Consultations' },
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
        title="Manage Experts"
        subtitle={`${experts.length} agricultural experts`}
        icon={UserCheck}
        actions={
          <button onClick={() => setShowAddExpert(true)} className="btn-primary">
            <Plus className="h-4 w-4" /> Add Expert
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
                placeholder="Search by name or specialty..."
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
              <option>On Leave</option>
              <option>Pending</option>
            </select>
          </div>
        </div>
      </div>

      {/* Experts table */}
      <div className="card overflow-hidden">
        <Table
          columns={columns}
          data={filtered}
          emptyMessage="No experts match your filters"
          actions={(row) => (
            <button
              onClick={() => setViewExpert(row)}
              className="p-2 text-green-700 hover:bg-green-50 rounded-lg"
            >
              <Eye className="h-4 w-4" />
            </button>
          )}
        />
      </div>

      {/* Expert detail modal */}
      <Modal open={!!viewExpert} onClose={() => setViewExpert(null)} title={viewExpert?.name} size="lg">
        {viewExpert && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{viewExpert.id}</p>
                <h4 className="text-lg font-semibold text-gray-900">{viewExpert.name}</h4>
                <p className="text-sm text-green-700">{viewExpert.specialty}</p>
              </div>
              <Badge color={viewExpert.status === 'Active' ? 'green' : viewExpert.status === 'Pending' ? 'amber' : 'gray'}>
                {viewExpert.status}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-earth-50 p-3 rounded-lg">
                <p className="text-xs text-gray-500">Experience</p>
                <p className="font-medium">{viewExpert.experience}</p>
              </div>
              <div className="bg-earth-50 p-3 rounded-lg">
                <p className="text-xs text-gray-500">Rating</p>
                <p className="font-medium">★ {viewExpert.rating}</p>
              </div>
              <div className="bg-earth-50 p-3 rounded-lg">
                <p className="text-xs text-gray-500">Consultations</p>
                <p className="font-medium">{viewExpert.consultations}</p>
              </div>
              <div className="bg-earth-50 p-3 rounded-lg">
                <p className="text-xs text-gray-500">Joined</p>
                <p className="font-medium">{viewExpert.joined}</p>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
              {viewExpert.status === 'Pending' ? (
                <>
                  <button
                    onClick={() => updateStatus(viewExpert.id, 'Active')}
                    className="btn-primary"
                  >
                    <CheckCircle2 className="h-4 w-4" /> Approve
                  </button>
                  <button onClick={() => updateStatus(viewExpert.id, 'Inactive')} className="btn-secondary">
                    <XCircle className="h-4 w-4" /> Reject
                  </button>
                </>
              ) : (
                <button
                  onClick={() => updateStatus(viewExpert.id, viewExpert.status === 'Active' ? 'On Leave' : 'Active')}
                  className="btn-secondary"
                >
                  {viewExpert.status === 'Active' ? 'Set On Leave' : 'Set Active'}
                </button>
              )}
            </div>
          </div>
        )}
      </Modal>

      {/* Add expert modal */}
      <Modal open={showAddExpert} onClose={() => setShowAddExpert(false)} title="Add New Expert" size="lg">
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setShowAddExpert(false); }}>
          <FieldGroup cols={2}>
            <Input label="Full Name" placeholder="e.g. Dr. Prakash Ghule" required />
            <Select label="Specialty" required>
              <option value="">Select specialty</option>
              <option>Agronomy</option>
              <option>Plant Pathology</option>
              <option>Horticulture</option>
              <option>Crop Nutrition</option>
              <option>Entomology</option>
            </Select>
          </FieldGroup>
          <FieldGroup cols={2}>
            <Input label="Experience (years)" type="number" min="0" placeholder="e.g. 15" required />
            <Input label="Location" placeholder="e.g. Nashik, Maharashtra" required />
          </FieldGroup>
          <FieldGroup cols={2}>
            <Input label="Email" type="email" placeholder="expert@gmail.com" required />
            <Input label="Phone" type="tel" placeholder="10-digit number" required />
          </FieldGroup>
          <div>
            <label className="label">Short Bio</label>
            <TextArea
              required
              placeholder="Brief description of expertise and experience..."
              minLength={30}
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setShowAddExpert(false)} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Add Expert
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}