import { useState } from 'react';
import { FlaskConical, Loader2, Clock, Target, Sun, Info } from 'lucide-react';

import PageHeader from '../../components/ui/PageHeader';
import Badge from '../../components/ui/Badge';
import { Input, Select, FieldGroup } from '../../components/ui/FormInputs';
import { InfoBanner } from '../../components/ui/StatusState';

export default function FertilizerRecommendation() {
  const [formData, setFormData] = useState({
    crop: 'Soybean',
    soilType: 'Black',
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    ph: '',
    stage: 'Vegetative Growth',
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call — replace with real /api/fertilizer-recommendation
    setTimeout(() => {
      setResult({
        crop: formData.crop,
        stage: formData.stage,
        recommendation: `Based on your ${formData.soilType} soil, current NPK levels and ${formData.crop} at ${formData.stage.toLowerCase()} stage, the following fertilizer plan is recommended.`,
        fertilizers: [
          { name: 'DAP (18-46-0)', dose: '120 kg/acre', timing: 'At sowing (Basal dose)', purpose: 'Phosphorus for root development', icon: Target },
          { name: 'Urea (46-0-0)', dose: '65 kg/acre', timing: '30-35 days after sowing', purpose: 'Nitrogen for vegetative growth', icon: Sun },
          { name: 'MOP (0-0-60)', dose: '30 kg/acre', timing: 'At sowing (Basal dose)', purpose: 'Potassium for disease resistance', icon: Clock },
        ],
        organic: {
          name: 'Farm Yard Manure (FYM)',
          dose: '4-5 ton/acre',
          timing: '2-3 weeks before sowing',
          purpose: 'Improve soil structure and organic carbon',
        },
      });
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Fertilizer Recommendation"
        subtitle="Get a balanced fertilizer plan for your crop"
        icon={FlaskConical}
      />

      <InfoBanner
        icon={Info}
        title="Fertilizer guidance"
        message="Enter your soil nutrient values and crop growth stage. The recommendation includes both chemical and organic fertilizer options."
        color="green"
      />

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="card p-6 space-y-4">
            <h3 className="font-semibold text-gray-900">Crop & Soil Details</h3>

            <FieldGroup cols={2}>
              <Select label="Crop" name="crop" value={formData.crop} onChange={handleChange}>
                <option>Soybean</option>
                <option>Cotton</option>
                <option>Onion</option>
                <option>Wheat</option>
                <option>Sugarcane</option>
                <option>Maize</option>
                <option>Rice</option>
              </Select>
              <Select label="Soil Type" name="soilType" value={formData.soilType} onChange={handleChange}>
                <option>Black</option>
                <option>Red</option>
                <option>Alluvial</option>
                <option>Sandy</option>
                <option>Clay</option>
              </Select>
            </FieldGroup>

            <FieldGroup cols={3}>
              <Input
                label="N (kg/ha)"
                type="number"
                name="nitrogen"
                value={formData.nitrogen}
                onChange={handleChange}
                placeholder="e.g. 42"
                required
              />
              <Input
                label="P (kg/ha)"
                type="number"
                name="phosphorus"
                value={formData.phosphorus}
                onChange={handleChange}
                placeholder="e.g. 38"
                required
              />
              <Input
                label="K (kg/ha)"
                type="number"
                name="potassium"
                value={formData.potassium}
                onChange={handleChange}
                placeholder="e.g. 45"
                required
              />
            </FieldGroup>

            <FieldGroup cols={2}>
              <Input
                label="Soil pH"
                type="number"
                step="0.1"
                min="0"
                max="14"
                name="ph"
                value={formData.ph}
                onChange={handleChange}
                placeholder="e.g. 7.1"
                required
              />
              <Select label="Growth Stage" name="stage" value={formData.stage} onChange={handleChange}>
                <option>Sowing</option>
                <option>Vegetative Growth</option>
                <option>Flowering</option>
                <option>Fruiting / Pod Formation</option>
                <option>Maturity</option>
              </Select>
            </FieldGroup>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Calculating...
                </>
              ) : (
                'Get Fertilizer Plan'
              )}
            </button>
          </form>
        </div>

        {/* Result */}
        <div className="lg:col-span-3">
          {!result && !loading && (
            <div className="card p-10 text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-earth-100 flex items-center justify-center mb-4">
                <FlaskConical className="h-8 w-8 text-earth-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">No fertilizer plan yet</h3>
              <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">
                Enter your crop and soil details to get a balanced fertilizer recommendation.
              </p>
            </div>
          )}

          {loading && (
            <div className="card p-10 text-center">
              <Loader2 className="h-10 w-10 animate-spin text-green-700 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900">Preparing your fertilizer plan...</h3>
            </div>
          )}

          {result && !loading && (
            <div className="space-y-4">
              <div className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Fertilizer Plan — {result.crop}
                    </h3>
                    <Badge color="green" className="mt-1">{result.stage}</Badge>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{result.recommendation}</p>

                {/* Fertilizers */}
                <div className="mt-5 space-y-3">
                  {result.fertilizers.map((f, i) => {
                    const Icon = f.icon;
                    return (
                      <div key={i} className="flex items-start gap-4 p-4 bg-earth-50 rounded-lg">
                        <div className="p-2 rounded-lg bg-green-100 text-green-700 shrink-0">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <p className="font-medium text-gray-900">{f.name}</p>
                            <span className="text-sm font-semibold text-green-700">{f.dose}</span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{f.timing}</p>
                          <p className="text-xs text-gray-600 mt-0.5">{f.purpose}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Organic amendment */}
              <div className="card p-6 bg-green-50 border-green-200">
                <h4 className="font-semibold text-gray-900 mb-3">Organic Amendment</h4>
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-earth-100 text-earth-700 shrink-0">
                    <Sun className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="font-medium text-gray-900">{result.organic.name}</p>
                      <span className="text-sm font-semibold text-earth-700">{result.organic.dose}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{result.organic.timing}</p>
                    <p className="text-xs text-gray-600 mt-0.5">{result.organic.purpose}</p>
                  </div>
                </div>
              </div>

              <p className="text-xs text-gray-400 text-center">
                This is a sample recommendation shown for UI demonstration. Connect the backend/ML system for actual analysis.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}