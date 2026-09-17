import { useState } from 'react';
import {
  MapPin,
  Ruler,
  FlaskConical,
  Droplets,
  Plus,
  Pencil,
  Beaker,
  Leaf,
} from 'lucide-react';

import PageHeader from '../../components/ui/PageHeader';
import CropCard from '../../components/ui/CropCard';
import Modal from '../../components/ui/Modal';
import Badge from '../../components/ui/Badge';
import { Input, Select, FieldGroup } from '../../components/ui/FormInputs';
import { InfoBanner } from '../../components/ui/StatusState';

import { farmProfile, currentCrops } from '../../data/mockData';

const soilNutrients = [
  { label: 'Nitrogen (N)', value: `${farmProfile.nitrogen} ppm`, status: farmProfile.nitrogen >= 40 ? 'Good' : 'Low', color: 'green' },
  { label: 'Phosphorus (P)', value: `${farmProfile.phosphorus} ppm`, status: farmProfile.phosphorus >= 35 ? 'Good' : 'Low', color: 'green' },
  { label: 'Potassium (K)', value: `${farmProfile.potassium} ppm`, status: farmProfile.potassium >= 40 ? 'Good' : 'Low', color: 'green' },
];

export default function MyFarm() {
  const [addCropOpen, setAddCropOpen] = useState(false);
  const [editFarmOpen, setEditFarmOpen] = useState(false);

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Farm"
        subtitle="Your farm profile, soil health and active crops"
        icon={MapPin}
        actions={
          <>
            <button
              onClick={() => setEditFarmOpen(true)}
              className="btn-secondary"
            >
              <Pencil className="h-4 w-4" /> Edit Farm
            </button>
            <button onClick={() => setAddCropOpen(true)} className="btn-primary">
              <Plus className="h-4 w-4" /> Add Crop
            </button>
          </>
        }
      />

      {/* Farm profile */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Farm details */}
        <div className="card p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Farm Details</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <MapPin className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs text-gray-500">Location</p>
                <p className="text-sm font-medium text-gray-800">{farmProfile.location}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Ruler className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs text-gray-500">Total Land Area</p>
                <p className="text-sm font-medium text-gray-800">{farmProfile.landArea}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FlaskConical className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs text-gray-500">Soil Type</p>
                <p className="text-sm font-medium text-gray-800">{farmProfile.soilType}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Droplets className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs text-gray-500">Water Source</p>
                <p className="text-sm font-medium text-gray-800">{farmProfile.waterSource}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Soil health */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Soil Health</h3>
            <Badge color="blue">Last test: Jun 2026</Badge>
          </div>

          {/* pH level */}
          <div className="mb-5">
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-gray-600">Soil pH</span>
              <span className="font-medium text-gray-900">{farmProfile.soilPh} (Neutral)</span>
            </div>
            <div className="h-2 rounded-full bg-gradient-to-r from-amber-400 via-green-500 to-red-500 relative">
              <div
                className="absolute top-1/2 -translate-y-1/2 h-4 w-4 rounded-full border-2 border-white bg-gray-800 shadow"
                style={{ left: `${farmProfile.soilPh >= 8 ? 100 : ((farmProfile.soilPh - 5) / 4) * 100}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Optimal range: 6.0 - 7.5 for most crops
            </p>
          </div>

          {/* Nutrients */}
          <div className="space-y-3">
            {soilNutrients.map((n) => (
              <div key={n.label} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Beaker className="h-4 w-4 text-earth-600" />
                  <span className="text-sm text-gray-600">{n.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-900">{n.value}</span>
                  <Badge color={n.color}>{n.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Active crops */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-4">Current Crops</h3>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {currentCrops.map((crop) => (
            <CropCard key={crop.id} crop={crop} />
          ))}
        </div>
      </div>

      {/* Soil advisory */}
      <InfoBanner
        icon={Leaf}
        title="Soil Advisory"
        message="Your black soil has good overall nutrient levels. Consider adding organic matter (FYM 4-5 ton/acre) before the rabi season to improve soil structure."
        color="green"
      />

      {/* Add Crop Modal */}
      <Modal open={addCropOpen} onClose={() => setAddCropOpen(false)} title="Add New Crop">
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setAddCropOpen(false); }}>
          <FieldGroup cols={2}>
            <Select label="Crop Name" required>
              <option value="">Select crop</option>
              <option>Soybean</option>
              <option>Cotton</option>
              <option>Onion</option>
              <option>Wheat</option>
              <option>Sugarcane</option>
              <option>Maize</option>
              <option>Rice</option>
            </Select>
            <Input label="Variety" placeholder="e.g. JS-9560" required />
          </FieldGroup>
          <FieldGroup cols={2}>
            <Input label="Area (acres)" type="number" step="0.1" min="0.1" placeholder="e.g. 2.5" required />
            <Input label="Planting Date" type="date" required />
          </FieldGroup>
          <FieldGroup cols={2}>
            <Select label="Expected Harvest Month">
              <option>October</option>
              <option>November</option>
              <option>December</option>
              <option>January</option>
              <option>February</option>
              <option>March</option>
              <option>April</option>
            </Select>
            <Select label="Soil Type">
              <option>Black Soil</option>
              <option>Red Soil</option>
              <option>Alluvial Soil</option>
              <option>Sandy Loam</option>
            </Select>
          </FieldGroup>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setAddCropOpen(false)} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Save Crop
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit Farm Modal */}
      <Modal open={editFarmOpen} onClose={() => setEditFarmOpen(false)} title="Edit Farm Details">
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setEditFarmOpen(false); }}>
          <FieldGroup cols={2}>
            <Input label="Land Area (acres)" type="number" step="0.1" defaultValue="5.2" required />
            <Select label="Soil Type" defaultValue="Black Soil">
              <option>Black Soil</option>
              <option>Red Soil</option>
              <option>Alluvial Soil</option>
              <option>Sandy Loam</option>
            </Select>
          </FieldGroup>
          <FieldGroup cols={2}>
            <Input label="Soil pH" type="number" step="0.1" min="4" max="9" defaultValue="7.1" required />
            <Select label="Water Source" defaultValue="Borewell + Canal">
              <option>Borewell</option>
              <option>Canal</option>
              <option>Well</option>
              <option>Borewell + Canal</option>
              <option>Rainfed</option>
            </Select>
          </FieldGroup>
          <FieldGroup cols={3}>
            <Input label="Nitrogen (ppm)" type="number" defaultValue="42" />
            <Input label="Phosphorus (ppm)" type="number" defaultValue="38" />
            <Input label="Potassium (ppm)" type="number" defaultValue="45" />
          </FieldGroup>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setEditFarmOpen(false)} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}