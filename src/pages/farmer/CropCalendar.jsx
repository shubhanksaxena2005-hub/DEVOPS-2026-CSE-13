import { useState } from 'react';
import { CalendarDays, Tractor, Sprout, Leaf, Flower2, CircleDot, Package, Info } from 'lucide-react';

import PageHeader from '../../components/ui/PageHeader';
import Badge from '../../components/ui/Badge';
import { Select } from '../../components/ui/FormInputs';
import { InfoBanner } from '../../components/ui/StatusState';

import { cropCalendarData } from '../../data/mockData';

const stageIcons = {
  tractor: Tractor,
  sprout: Sprout,
  leaf: Leaf,
  flower: Flower2,
  circleDot: CircleDot,
  package: Package,
  transplant: Sprout,
};

export default function CropCalendar() {
  const [selectedCrop, setSelectedCrop] = useState('Soybean');
  const stages = cropCalendarData[selectedCrop] || [];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Crop Calendar"
        subtitle="Season-wise farming activities for your crop"
        icon={CalendarDays}
      />

      <div className="flex flex-col sm:flex-row sm:items-end gap-4">
        <div className="w-full sm:w-72">
          <Select label="Select Crop" value={selectedCrop} onChange={(e) => setSelectedCrop(e.target.value)}>
            {Object.keys(cropCalendarData).map((crop) => (
              <option key={crop}>{crop}</option>
            ))}
          </Select>
        </div>
        <div className="sm:pb-1">
          <Badge color="green">
            {selectedCrop} — {stages.length} growth stages
          </Badge>
        </div>
      </div>

      <InfoBanner
        icon={Info}
        title={`${selectedCrop} Season Calendar`}
        message={`Typical ${selectedCrop} cultivation timeline for Maharashtra region. Dates may vary based on local rainfall patterns and variety.`}
        color="blue"
      />

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-5 sm:left-6 top-0 bottom-0 w-0.5 bg-green-200" />

        <div className="space-y-6">
          {stages.map((stage, idx) => {
            const Icon = stageIcons[stage.icon] || Sprout;
            const isLast = idx === stages.length - 1;
            return (
              <div key={stage.stage} className="relative pl-14 sm:pl-16">
                {/* Dot on timeline */}
                <div className="absolute left-3.5 sm:left-[19px] top-5 w-4 h-4 rounded-full bg-white border-2 border-green-600" />

                <div className="card p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-lg bg-green-100 text-green-700">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{stage.stage}</h3>
                        <p className="text-xs text-gray-500">{stage.period}</p>
                      </div>
                    </div>
                    <Badge color={idx === stages.length - 1 ? 'amber' : 'green'}>
                      {idx === stages.length - 1 ? 'Harvest' : `Stage ${idx + 1}`}
                    </Badge>
                  </div>

                  <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {stage.activities.map((activity, i) => (
                      <div key={i} className="flex items-start gap-2 bg-earth-50 rounded-lg p-3">
                        <span className="text-green-700 font-semibold text-sm mt-0.5">{i + 1}.</span>
                        <span className="text-sm text-gray-700">{activity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}