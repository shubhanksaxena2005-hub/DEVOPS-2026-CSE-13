import { useState } from 'react';
import { BookOpen, Plus, Camera, CalendarDays, Sprout, X } from 'lucide-react';

import PageHeader from '../../components/ui/PageHeader';
import Modal from '../../components/ui/Modal';
import Badge from '../../components/ui/Badge';
import { Input, Select, TextArea, FieldGroup } from '../../components/ui/FormInputs';

import { activities } from '../../data/mockData';

export default function FarmJournal() {
  const [showAddActivity, setShowAddActivity] = useState(false);
  const [journal, setJournal] = useState(activities);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith('image/')) return;

    const reader = new FileReader();
    reader.onload = (event) => setImagePreview(event.target.result);
    reader.readAsDataURL(file);
  };

  const handleAddActivity = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newActivity = {
      id: journal.length + 1,
      date: formData.get('date'),
      crop: formData.get('crop'),
      activity: formData.get('activity'),
      notes: formData.get('notes'),
      time: 'Recorded manually',
    };
    setJournal([newActivity, ...journal]);
    setShowAddActivity(false);
    setImagePreview(null);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Farm Activity Journal"
        subtitle="Keep a daily record of your farm activities"
        icon={BookOpen}
        actions={
          <button onClick={() => setShowAddActivity(true)} className="btn-primary">
            <Plus className="h-4 w-4" /> Add Activity
          </button>
        }
      />

      {/* Timeline */}
      <div className="relative">
        <div className="absolute left-5 sm:left-6 top-0 bottom-0 w-0.5 bg-green-200" />

        <div className="space-y-6">
          {journal.map((activity) => (
            <div key={activity.id} className="relative pl-14 sm:pl-16">
              <div className="absolute left-3.5 sm:left-[19px] top-5 w-4 h-4 rounded-full bg-white border-2 border-green-600" />

              <div className="card p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-green-100 text-green-700">
                      <Sprout className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{activity.activity}</h3>
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        <Badge color="green">{activity.crop}</Badge>
                        <span className="text-xs text-gray-500">
                          <CalendarDays className="h-3 w-3 inline mr-1 -mt-0.5" />
                          {activity.date}
                        </span>
                        <span className="text-xs text-gray-400">{activity.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-3 leading-relaxed">{activity.notes}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add activity modal */}
      <Modal open={showAddActivity} onClose={() => setShowAddActivity(false)} title="Add Farm Activity" size="lg">
        <form onSubmit={handleAddActivity} className="space-y-4">
          <FieldGroup cols={2}>
            <div>
              <label className="label">Date</label>
              <input type="date" name="date" required className="input" />
            </div>
            <div>
              <label className="label">Crop</label>
              <select name="crop" required className="input">
                <option value="">Select crop</option>
                <option>Soybean</option>
                <option>Cotton</option>
                <option>Onion</option>
                <option>Wheat</option>
                <option>All Crops</option>
              </select>
            </div>
          </FieldGroup>

          <div>
            <label className="label">Activity</label>
            <input
              type="text"
              name="activity"
              required
              placeholder="e.g. Weeding, Fertilizer application, Pest scouting"
              className="input"
            />
          </div>

          <div>
            <label className="label">Notes</label>
            <textarea
              name="notes"
              required
              placeholder="Describe what you did and any observations..."
              className="input min-h-[120px]"
            />
          </div>

          {/* Image upload */}
          <div>
            <label className="label">Photo (optional)</label>
            {!imagePreview ? (
              <label className="border-2 border-dashed border-earth-300 rounded-xl p-6 text-center cursor-pointer hover:border-green-400 hover:bg-earth-50 transition-colors block">
                <input type="file" accept="image/*" className="hidden" onChange={handleImageSelect} />
                <Camera className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Click to upload a farm photo</p>
                <p className="text-xs text-gray-400 mt-1">JPG or PNG</p>
              </label>
            ) : (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Activity preview"
                  className="max-h-48 rounded-lg object-contain bg-earth-100 mx-auto"
                />
                <button
                  type="button"
                  onClick={() => setImagePreview(null)}
                  className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow hover:bg-gray-100"
                >
                  <X className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setShowAddActivity(false)} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Save Activity
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}