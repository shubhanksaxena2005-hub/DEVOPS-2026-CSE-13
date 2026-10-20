import { useCallback, useEffect, useState } from 'react';
import { Map, Plus, Pencil, Trash2, MapPin, Droplets, Layers } from 'lucide-react';

import PageHeader from '../../components/ui/PageHeader';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';
import { Input, Select, FieldGroup } from '../../components/ui/FormInputs';
import { LoadingState, ErrorState, EmptyState } from '../../components/ui/StatusState';
import { api } from '../../lib/api';

const soilTypes = ['Black', 'Red', 'Alluvial', 'Laterite', 'Sandy', 'Clay', 'Loamy'];
const waterSources = ['Borewell', 'Well', 'Canal', 'River', 'Drip Irrigation', 'Rain-fed'];

const emptyForm = {
  name: '',
  village: '',
  district: '',
  state: '',
  landArea: '',
  landUnit: 'acres',
  soilType: '',
  soilPh: '',
  waterSource: '',
};

const toForm = (farm) => ({
  name: farm.name,
  village: farm.location?.village || '',
  district: farm.location?.district || '',
  state: farm.location?.state || '',
  landArea: String(farm.landArea ?? ''),
  landUnit: farm.landUnit || 'acres',
  soilType: farm.soilType || '',
  soilPh: farm.soilPh ?? '',
  waterSource: farm.waterSource || '',
});

export default function MyFarm() {
  const [farms, setFarms] = useState(null);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(null); // null = closed, {} = new, farm = edit
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState('');
  const [saving, setSaving] = useState(false);

  const load = useCallback(() => {
    setError('');
    api
      .get('/farms')
      .then((res) => setFarms(res.farms))
      .catch((err) => setError(err.message));
  }, []);

  useEffect(load, [load]);

  const openNew = () => {
    setForm(emptyForm);
    setFormError('');
    setEditing({});
  };

  const openEdit = (farm) => {
    setForm(toForm(farm));
    setFormError('');
    setEditing(farm);
  };

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return setFormError('Farm name is required');
    if (!(Number(form.landArea) > 0)) return setFormError('Land area must be greater than 0');
    if (form.soilPh !== '' && (Number(form.soilPh) < 0 || Number(form.soilPh) > 14)) {
      return setFormError('Soil pH must be between 0 and 14');
    }

    const payload = {
      name: form.name.trim(),
      location: { village: form.village.trim(), district: form.district.trim(), state: form.state.trim() },
      landArea: Number(form.landArea),
      landUnit: form.landUnit,
      soilType: form.soilType,
      soilPh: form.soilPh === '' ? null : Number(form.soilPh),
      waterSource: form.waterSource,
    };

    setSaving(true);
    try {
      if (editing._id) {
        const res = await api.put(`/farms/${editing._id}`, payload);
        setFarms((prev) => prev.map((f) => (f._id === editing._id ? res.farm : f)));
      } else {
        const res = await api.post('/farms', payload);
        setFarms((prev) => [res.farm, ...prev]);
      }
      setEditing(null);
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (farm) => {
    if (!window.confirm(`Delete "${farm.name}"? This cannot be undone.`)) return;
    try {
      await api.delete(`/farms/${farm._id}`);
      setFarms((prev) => prev.filter((f) => f._id !== farm._id));
    } catch (err) {
      window.alert(err.message);
    }
  };

  if (error) return <ErrorState message={error} onRetry={load} />;
  if (!farms) return <LoadingState text="Loading your farms..." />;

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Farm"
        subtitle="Your land, soil and water details"
        icon={Map}
        actions={
          <button onClick={openNew} className="btn-primary">
            <Plus className="h-4 w-4" /> Add Farm
          </button>
        }
      />

      {farms.length === 0 ? (
        <div className="card">
          <EmptyState
            icon={Map}
            title="No farms yet"
            message='Click "Add Farm" to record your first farm.'
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {farms.map((farm) => {
            const place = [farm.location?.village, farm.location?.district, farm.location?.state]
              .filter(Boolean)
              .join(', ');
            return (
              <div key={farm._id} className="card p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">{farm.name}</h2>
                    {place && (
                      <p className="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="h-3.5 w-3.5" /> {place}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => openEdit(farm)}
                      aria-label={`Edit ${farm.name}`}
                      className="p-2 rounded-lg text-gray-500 hover:bg-gray-100"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(farm)}
                      aria-label={`Delete ${farm.name}`}
                      className="p-2 rounded-lg text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-lg bg-green-50 p-3">
                    <dt className="text-gray-500">Land area</dt>
                    <dd className="font-semibold text-gray-900">
                      {farm.landArea} {farm.landUnit}
                    </dd>
                  </div>
                  <div className="rounded-lg bg-earth-50 p-3">
                    <dt className="text-gray-500 flex items-center gap-1">
                      <Layers className="h-3.5 w-3.5" /> Soil
                    </dt>
                    <dd className="font-semibold text-gray-900">
                      {farm.soilType || '—'}
                      {farm.soilPh != null && ` (pH ${farm.soilPh})`}
                    </dd>
                  </div>
                  <div className="rounded-lg bg-blue-50 p-3 col-span-2">
                    <dt className="text-gray-500 flex items-center gap-1">
                      <Droplets className="h-3.5 w-3.5" /> Water source
                    </dt>
                    <dd className="font-semibold text-gray-900">{farm.waterSource || '—'}</dd>
                  </div>
                </dl>
              </div>
            );
          })}
        </div>
      )}

      <Modal open={editing !== null} onClose={() => setEditing(null)} title={editing?._id ? 'Edit Farm' : 'Add Farm'}>
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {formError && <p role="alert" className="text-sm text-red-600">{formError}</p>}
          <Input id="name" name="name" label="Farm name *" value={form.name} onChange={handleChange} />
          <FieldGroup cols={2}>
            <Input id="village" name="village" label="Village" value={form.village} onChange={handleChange} />
            <Input id="district" name="district" label="District" value={form.district} onChange={handleChange} />
          </FieldGroup>
          <Input id="state" name="state" label="State" value={form.state} onChange={handleChange} />
          <FieldGroup cols={2}>
            <Input
              id="landArea"
              name="landArea"
              type="number"
              min="0"
              step="0.01"
              label="Land area *"
              value={form.landArea}
              onChange={handleChange}
            />
            <Select id="landUnit" name="landUnit" label="Unit" value={form.landUnit} onChange={handleChange}>
              <option value="acres">Acres</option>
              <option value="hectares">Hectares</option>
              <option value="guntha">Guntha</option>
            </Select>
          </FieldGroup>
          <FieldGroup cols={2}>
            <Select id="soilType" name="soilType" label="Soil type" value={form.soilType} onChange={handleChange}>
              <option value="">Select soil type</option>
              {soilTypes.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </Select>
            <Input
              id="soilPh"
              name="soilPh"
              type="number"
              min="0"
              max="14"
              step="0.1"
              label="Soil pH"
              value={form.soilPh}
              onChange={handleChange}
            />
          </FieldGroup>
          <Select id="waterSource" name="waterSource" label="Water source" value={form.waterSource} onChange={handleChange}>
            <option value="">Select water source</option>
            {waterSources.map((w) => (
              <option key={w}>{w}</option>
            ))}
          </Select>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" onClick={() => setEditing(null)}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? 'Saving...' : 'Save Farm'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
