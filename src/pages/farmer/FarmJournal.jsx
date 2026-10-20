import { useCallback, useEffect, useState } from 'react';
import { BookOpen, Plus, Pencil, Trash2, Clock, Sprout } from 'lucide-react';

import PageHeader from '../../components/ui/PageHeader';
import Modal from '../../components/ui/Modal';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { Input, Select, TextArea, FieldGroup } from '../../components/ui/FormInputs';
import { LoadingState, ErrorState, EmptyState } from '../../components/ui/StatusState';
import { api, formatDate, toDateInput } from '../../lib/api';

// Must match the activity types allowed by the FarmActivity model
export const ACTIVITY_TYPES = ['Sowing', 'Weeding', 'Fertilizer', 'Pesticide', 'Irrigation', 'Harvest', 'Inspection', 'Labor', 'Other'];

const typeColors = {
  Sowing: 'green',
  Weeding: 'earth',
  Fertilizer: 'purple',
  Pesticide: 'red',
  Irrigation: 'blue',
  Harvest: 'amber',
  Inspection: 'gray',
  Labor: 'earth',
  Other: 'gray',
};

const newForm = () => ({ date: toDateInput(), title: '', activityType: 'Sowing', cropName: '', timeSpent: '', notes: '' });

export default function FarmJournal() {
  const [activities, setActivities] = useState(null);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('All');
  const [editing, setEditing] = useState(null); // null = closed, {} = new, activity = edit
  const [form, setForm] = useState(newForm);
  const [formError, setFormError] = useState('');
  const [saving, setSaving] = useState(false);

  const load = useCallback(() => {
    setError('');
    api
      .get('/activities')
      .then((res) => setActivities(res.activities))
      .catch((err) => setError(err.message));
  }, []);

  useEffect(load, [load]);

  const openNew = () => {
    setForm(newForm());
    setFormError('');
    setEditing({});
  };

  const openEdit = (activity) => {
    setForm({
      date: toDateInput(activity.date),
      title: activity.title,
      activityType: activity.activityType,
      cropName: activity.cropName || '',
      timeSpent: activity.timeSpent || '',
      notes: activity.notes || '',
    });
    setFormError('');
    setEditing(activity);
  };

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return setFormError('Activity title is required');

    const payload = {
      date: form.date,
      title: form.title.trim(),
      activityType: form.activityType,
      cropName: form.cropName.trim(),
      timeSpent: form.timeSpent.trim(),
      notes: form.notes.trim(),
    };

    setSaving(true);
    try {
      const res = editing._id
        ? await api.put(`/activities/${editing._id}`, payload)
        : await api.post('/activities', payload);
      setActivities((prev) =>
        [res.activity, ...prev.filter((a) => a._id !== res.activity._id)].sort((a, b) => new Date(b.date) - new Date(a.date))
      );
      setEditing(null);
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (activity) => {
    if (!window.confirm(`Delete "${activity.title}"?`)) return;
    try {
      await api.delete(`/activities/${activity._id}`);
      setActivities((prev) => prev.filter((a) => a._id !== activity._id));
    } catch (err) {
      window.alert(err.message);
    }
  };

  if (error) return <ErrorState message={error} onRetry={load} />;
  if (!activities) return <LoadingState text="Loading journal..." />;

  const visible = filter === 'All' ? activities : activities.filter((a) => a.activityType === filter);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Farm Activity Journal"
        subtitle="A day-by-day log of the work done on your farm"
        icon={BookOpen}
        actions={
          <button onClick={openNew} className="btn-primary">
            <Plus className="h-4 w-4" /> Log Activity
          </button>
        }
      />

      <div className="card p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <h2 className="font-semibold text-gray-900">
            {activities.length} {activities.length === 1 ? 'entry' : 'entries'}
          </h2>
          <select
            aria-label="Filter by activity type"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="input sm:w-48"
          >
            <option>All</option>
            {ACTIVITY_TYPES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>

        {visible.length === 0 ? (
          <EmptyState
            icon={BookOpen}
            title={activities.length === 0 ? 'Your journal is empty' : 'No entries of this type'}
            message={activities.length === 0 ? 'Click "Log Activity" to add your first entry.' : undefined}
          />
        ) : (
          <ol className="relative border-l-2 border-green-100 ml-2 space-y-5">
            {visible.map((a) => (
              <li key={a._id} className="ml-5">
                <span className="absolute -left-[7px] mt-1.5 h-3 w-3 rounded-full bg-green-600 ring-4 ring-white" />
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs text-gray-500">{formatDate(a.date)}</p>
                    <h3 className="font-medium text-gray-900">{a.title}</h3>
                    <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-gray-500">
                      <Badge color={typeColors[a.activityType]}>{a.activityType}</Badge>
                      {a.cropName && (
                        <span className="flex items-center gap-1">
                          <Sprout className="h-3.5 w-3.5" /> {a.cropName}
                        </span>
                      )}
                      {a.timeSpent && (
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" /> {a.timeSpent}
                        </span>
                      )}
                    </div>
                    {a.notes && <p className="mt-2 text-sm text-gray-600 whitespace-pre-line">{a.notes}</p>}
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <button onClick={() => openEdit(a)} aria-label="Edit activity" className="p-1.5 rounded text-gray-500 hover:bg-gray-100">
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button onClick={() => handleDelete(a)} aria-label="Delete activity" className="p-1.5 rounded text-red-600 hover:bg-red-50">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>

      <Modal open={editing !== null} onClose={() => setEditing(null)} title={editing?._id ? 'Edit Activity' : 'Log Activity'}>
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {formError && <p role="alert" className="text-sm text-red-600">{formError}</p>}
          <Input
            id="title"
            name="title"
            label="What did you do? *"
            placeholder="e.g. Sowed wheat in north plot"
            value={form.title}
            onChange={handleChange}
          />
          <FieldGroup cols={2}>
            <Input id="date" name="date" type="date" label="Date" value={form.date} onChange={handleChange} />
            <Select id="activityType" name="activityType" label="Activity type" value={form.activityType} onChange={handleChange}>
              {ACTIVITY_TYPES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </Select>
          </FieldGroup>
          <FieldGroup cols={2}>
            <Input id="cropName" name="cropName" label="Crop" placeholder="e.g. Wheat" value={form.cropName} onChange={handleChange} />
            <Input id="timeSpent" name="timeSpent" label="Time spent" placeholder="e.g. 3 hours" value={form.timeSpent} onChange={handleChange} />
          </FieldGroup>
          <TextArea id="notes" name="notes" label="Notes" value={form.notes} onChange={handleChange} />
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" onClick={() => setEditing(null)}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? 'Saving...' : 'Save Entry'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
