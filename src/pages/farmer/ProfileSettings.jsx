import { useState } from 'react';
import { Settings, CheckCircle2 } from 'lucide-react';

import PageHeader from '../../components/ui/PageHeader';
import Button from '../../components/ui/Button';
import { Input, FieldGroup } from '../../components/ui/FormInputs';
import { useAuth } from '../../context/AuthContext';
import { api, formatDate } from '../../lib/api';

export default function ProfileSettings() {
  const { user, setUser } = useAuth();

  const [form, setForm] = useState({
    name: user.name || '',
    phone: user.phone || '',
    village: user.location?.village || '',
    district: user.location?.district || '',
    state: user.location?.state || '',
  });
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    setSaved(false);
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.name.trim()) return setError('Name is required');
    if (form.phone && !/^[0-9+\-\s]{7,15}$/.test(form.phone)) return setError('Enter a valid phone number');

    setSaving(true);
    try {
      const res = await api.put('/auth/profile', {
        name: form.name.trim(),
        phone: form.phone.trim(),
        location: { village: form.village.trim(), district: form.district.trim(), state: form.state.trim() },
      });
      setUser(res.user); // sidebar updates immediately
      setSaved(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <PageHeader title="Profile & Settings" subtitle="Keep your contact and location details up to date" icon={Settings} />

      <div className="card p-6">
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-sm">
          <div>
            <dt className="text-gray-500">Email (login)</dt>
            <dd className="font-medium text-gray-900">{user.email}</dd>
          </div>
          <div>
            <dt className="text-gray-500">Member since</dt>
            <dd className="font-medium text-gray-900">{formatDate(user.createdAt)}</dd>
          </div>
        </dl>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
          <Input id="name" name="name" label="Full name *" value={form.name} onChange={handleChange} />
          <Input id="phone" name="phone" label="Phone number" value={form.phone} onChange={handleChange} />
          <FieldGroup cols={2}>
            <Input id="village" name="village" label="Village" value={form.village} onChange={handleChange} />
            <Input id="district" name="district" label="District" value={form.district} onChange={handleChange} />
          </FieldGroup>
          <Input id="state" name="state" label="State" value={form.state} onChange={handleChange} />
          <div className="flex items-center justify-end gap-3 pt-2">
            {saved && (
              <span className="flex items-center gap-1 text-sm text-green-700">
                <CheckCircle2 className="h-4 w-4" /> Profile saved
              </span>
            )}
            <Button type="submit" disabled={saving}>
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
