import { useState } from 'react';
import { Landmark, Search, Plus, Eye, Pencil, Trash2 } from 'lucide-react';

import PageHeader from '../../components/ui/PageHeader';
import Table from '../../components/ui/Table';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';

import { governmentSchemes } from '../../data/mockData';

export default function ManageSchemes() {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [schemes, setSchemes] = useState(governmentSchemes);
  const [showAddScheme, setShowAddScheme] = useState(false);

  const filtered = schemes.filter((scheme) => {
    const matchesSearch =
      scheme.name.toLowerCase().includes(search.toLowerCase()) ||
      scheme.summary.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || scheme.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const columns = [
    { key: 'id', label: 'ID', render: (row) => <span className="font-mono text-xs">{row.id}</span> },
    { key: 'name', label: 'Scheme Name' },
    {
      key: 'category',
      label: 'Category',
      render: (row) => <Badge color="blue">{row.category}</Badge>,
    },
    { key: 'state', label: 'State' },
    {
      key: 'deadline',
      label: 'Deadline',
      render: (row) => (
        <span className="text-xs text-amber-700 bg-amber-50 px-2 py-1 rounded-full">{row.deadline}</span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Manage Schemes"
        subtitle="Government schemes listed on the platform"
        icon={Landmark}
        actions={
          <button onClick={() => setShowAddScheme(true)} className="btn-primary">
            <Plus className="h-4 w-4" /> Add Scheme
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
                placeholder="Search schemes..."
                className="input pl-10"
              />
            </div>
          </div>
          <div>
            <label className="label">Category</label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="input"
            >
              <option>All</option>
              <option>Income Support</option>
              <option>Crop Insurance</option>
              <option>Training & Skill Development</option>
              <option>Credit & Loan</option>
              <option>Irrigation</option>
              <option>Soil Testing</option>
              <option>Market Access</option>
              <option>Equipment Subsidy</option>
            </select>
          </div>
        </div>
      </div>

      {/* Schemes table */}
      <div className="card overflow-hidden">
        <Table
          columns={columns}
          data={filtered}
          emptyMessage="No schemes match your filters"
          actions={() => (
            <>
              <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                <Eye className="h-4 w-4" />
              </button>
              <button className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg">
                <Pencil className="h-4 w-4" />
              </button>
              <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                <Trash2 className="h-4 w-4" />
              </button>
            </>
          )}
        />
      </div>

      {/* Add scheme modal */}
      <Modal open={showAddScheme} onClose={() => setShowAddScheme(false)} title="Add New Scheme" size="lg">
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setShowAddScheme(false); }}>
          <div>
            <label className="label">Scheme Name</label>
            <input type="text" required placeholder="e.g. PM-KISAN" className="input" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="label">Category</label>
              <select required className="input">
                <option value="">Select category</option>
                <option>Income Support</option>
                <option>Crop Insurance</option>
                <option>Training & Skill Development</option>
                <option>Credit & Loan</option>
                <option>Irrigation</option>
                <option>Soil Testing</option>
                <option>Market Access</option>
                <option>Equipment Subsidy</option>
              </select>
            </div>
            <div>
              <label className="label">State</label>
              <select required className="input">
                <option value="">Select state</option>
                <option>All India</option>
                <option>Maharashtra</option>
                <option>Gujarat</option>
                <option>Punjab</option>
                <option>Karnataka</option>
              </select>
            </div>
          </div>
          <div>
            <label className="label">Summary</label>
            <textarea required placeholder="Brief description of the scheme..." className="input min-h-[80px]" />
          </div>
          <div>
            <label className="label">Official Source URL</label>
            <input type="url" required placeholder="https://..." className="input" />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setShowAddScheme(false)} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Add Scheme
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}