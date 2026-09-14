import { useState } from 'react';
import { Sprout, Search, Plus, Pencil, Trash2, Droplets, Calendar } from 'lucide-react';

import PageHeader from '../../components/ui/PageHeader';
import Table from '../../components/ui/Table';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import { Input, Select, FieldGroup } from '../../components/ui/FormInputs';

import { cropInformation } from '../../data/mockData';

export default function ManageCrops() {
  const [search, setSearch] = useState('');
  const [showAddCrop, setShowAddCrop] = useState(false);

  const filtered = cropInformation.filter(
    (crop) =>
      crop.name.toLowerCase().includes(search.toLowerCase()) ||
      crop.varieties.toLowerCase().includes(search.toLowerCase()) ||
      crop.season.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      key: 'name',
      label: 'Crop',
      render: (row) => (
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded bg-green-100 text-green-700">
            <Sprout className="h-4 w-4" />
          </div>
          <span className="font-medium">{row.name}</span>
        </div>
      ),
    },
    { key: 'varieties', label: 'Recommended Varieties' },
    {
      key: 'season',
      label: 'Season',
      render: (row) => <Badge color={row.season === 'Kharif' ? 'green' : row.season === 'Rabi' ? 'amber' : 'blue'}>{row.season}</Badge>,
    },
    { key: 'sowingWindow', label: 'Sowing Window' },
    { key: 'harvestWindow', label: 'Harvest Window' },
    { key: 'duration', label: 'Duration' },
    {
      key: 'waterRequirement',
      label: 'Water',
      render: (row) => (
        <span className="flex items-center gap-1 text-xs">
          <Droplets className="h-3.5 w-3.5 text-blue-500" /> {row.waterRequirement}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Manage Crop Information"
        subtitle="Crop database used for recommendations and calendar"
        icon={Sprout}
        actions={
          <button onClick={() => setShowAddCrop(true)} className="btn-primary">
            <Plus className="h-4 w-4" /> Add Crop
          </button>
        }
      />

      {/* Search */}
      <div className="card p-5">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search crops, varieties, or season..."
            className="input pl-10"
          />
        </div>
      </div>

      {/* Crops table */}
      <div className="card overflow-hidden">
        <Table
          columns={columns}
          data={filtered}
          emptyMessage="No crops match your search"
          actions={() => (
            <>
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

      {/* Add crop modal */}
      <Modal open={showAddCrop} onClose={() => setShowAddCrop(false)} title="Add New Crop" size="lg">
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setShowAddCrop(false); }}>
          <FieldGroup cols={2}>
            <Input label="Crop Name" placeholder="e.g. Soybean" required />
            <Select label="Season" required>
              <option value="">Select season</option>
              <option>Kharif</option>
              <option>Rabi</option>
              <option>Kharif/Rabi</option>
              <option>Perennial</option>
            </Select>
          </FieldGroup>
          <div>
            <label className="label">Recommended Varieties</label>
            <input
              type="text"
              required
              placeholder="e.g. JS-9560, MAUS-158, MACS-1407"
              className="input"
            />
          </div>
          <FieldGroup cols={2}>
            <Input label="Sowing Window" placeholder="e.g. Jun - Jul" required />
            <Input label="Harvest Window" placeholder="e.g. Oct - Nov" required />
          </FieldGroup>
          <FieldGroup cols={2}>
            <Input label="Duration" placeholder="e.g. 90-110 days" required />
            <Input label="Water Requirement" placeholder="e.g. 450-600 mm" required />
          </FieldGroup>
          <FieldGroup cols={2}>
            <Input label="Soil Type" placeholder="e.g. Black, Alluvial" required />
            <Select label="Crop Type" required>
              <option value="">Select type</option>
              <option>Food Crop</option>
              <option>Cash Crop</option>
              <option>Vegetable</option>
              <option>Fruit</option>
            </Select>
          </FieldGroup>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setShowAddCrop(false)} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Add Crop
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}