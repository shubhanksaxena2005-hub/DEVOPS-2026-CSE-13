import { useState } from 'react';
import { Settings, User, Bell, Languages, Shield, Save } from 'lucide-react';

import PageHeader from '../../components/ui/PageHeader';
import Modal from '../../components/ui/Modal';
import { Input, Select, FieldGroup } from '../../components/ui/FormInputs';
import { InfoBanner } from '../../components/ui/StatusState';

export default function ProfileSettings() {
  const [showChangePassword, setShowChangePassword] = useState(false);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Profile & Settings"
        subtitle="Manage your account details and preferences"
        icon={Settings}
      />

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile summary */}
        <div className="card p-6 text-center">
          <div className="mx-auto h-20 w-20 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold text-2xl mb-3">
            RY
          </div>
          <h3 className="font-semibold text-gray-900 text-lg">Ramesh Yadav</h3>
          <p className="text-sm text-gray-500">Farmer • Dindori, Nashik</p>
          <div className="mt-4 px-4 py-3 bg-earth-50 rounded-lg text-left text-sm">
            <div className="flex justify-between py-1">
              <span className="text-gray-500">Member since</span>
              <span className="font-medium text-gray-800">Jan 2025</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-gray-500">Farm verified</span>
              <span className="font-medium text-green-700">✓ Verified</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-gray-500">Language</span>
              <span className="font-medium text-gray-800">Marathi, Hindi</span>
            </div>
          </div>
        </div>

        {/* Account details form */}
        <div className="lg:col-span-2">
          <div className="card p-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <User className="h-4 w-4 text-green-600" /> Account Details
            </h3>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <FieldGroup cols={2}>
                <Input label="Full Name" defaultValue="Ramesh Yadav" />
                <Input label="Mobile Number" defaultValue="98765 43210" />
              </FieldGroup>
              <FieldGroup cols={2}>
                <Input label="Email Address" type="email" defaultValue="ramesh.yadav@gmail.com" />
                <Select label="Preferred Language" defaultValue="Marathi">
                  <option>Marathi</option>
                  <option>Hindi</option>
                  <option>English</option>
                  <option>Gujarati</option>
                </Select>
              </FieldGroup>
              <FieldGroup cols={2}>
                <Input label="Village / Taluka" defaultValue="Dindori" />
                <Input label="District" defaultValue="Nashik" />
              </FieldGroup>
              <button type="submit" className="btn-primary">
                <Save className="h-4 w-4" /> Save Changes
              </button>
            </form>
          </div>

          {/* Notification preferences */}
          <div className="card p-6 mt-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Bell className="h-4 w-4 text-green-600" /> Notification Preferences
            </h3>
            <div className="space-y-3">
              {[
                { label: 'Weather alerts', desc: 'Rain, temperature and irrigation advisories', default: true },
                { label: 'Mandi price changes', desc: 'When prices change significantly for your crops', default: true },
                { label: 'Farming reminders', desc: 'Fertilization, weeding and sowing dates', default: true },
                { label: 'Scheme updates', desc: 'New schemes and application deadlines', default: true },
                { label: 'Expert responses', desc: 'When an expert answers your question', default: true },
              ].map((pref) => (
                <div key={pref.label} className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{pref.label}</p>
                    <p className="text-xs text-gray-500">{pref.desc}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked={pref.default} className="sr-only peer" />
                    <div className="w-10 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-green-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-600" />
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Security */}
          <div className="card p-6 mt-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Shield className="h-4 w-4 text-green-600" /> Security
            </h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Password</p>
                <p className="text-xs text-gray-500">Last changed 3 months ago</p>
              </div>
              <button onClick={() => setShowChangePassword(true)} className="btn-secondary">
                Change Password
              </button>
            </div>
          </div>

          <div className="mt-6">
            <InfoBanner
              icon={Languages}
              title="Multilingual support"
              message="AgriSathi content is being prepared in Marathi and Hindi. Language switching will be available in an upcoming update."
              color="blue"
            />
          </div>
        </div>
      </div>

      {/* Change password modal */}
      <Modal open={showChangePassword} onClose={() => setShowChangePassword(false)} title="Change Password">
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setShowChangePassword(false); }}>
          <Input label="Current Password" type="password" required />
          <Input label="New Password" type="password" required minLength={6} />
          <Input label="Confirm New Password" type="password" required minLength={6} />
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setShowChangePassword(false)} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Update Password
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}