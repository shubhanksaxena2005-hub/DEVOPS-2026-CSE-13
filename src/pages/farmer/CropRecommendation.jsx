import { useState } from 'react';
import { Sprout, Loader2, CheckCircle2, Award, Info } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import Badge from '../../components/ui/Badge';
import { Input, Select, FieldGroup } from '../../components/ui/FormInputs';
import { InfoBanner } from '../../components/ui/StatusState';

export default function CropRecommendation() {
  const [formData, setFormData] = useState({
    location: 'Nashik',
    soilType: 'Black',
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    ph: '',
    temperature: '',
    humidity: '',
    rainfall: '',
    season: 'Kharif',
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call delay — replace with real /api/crop-recommendation request
    setTimeout(() => {
      setResult({
        crop: 'Soybean',
        confidence: 92,
        reasons: [
          `Black soil with pH ${formData.ph || '7.1'} is highly suitable for soybean cultivation`,
          `Current N-P-K levels (${formData.nitrogen || '42'}-${formData.phosphorus || '38'}-${formData.potassium || '45'}) are within the ideal range for soybean`,
          `${formData.season} season fits the sowing window in ${formData.location} region`,
          `Expected rainfall of ${formData.rainfall || '800'}mm matches soybean water requirements`,
        ],
        alternatives: [
          { crop: 'Cotton', confidence: 84, note: 'Requires higher phosphorus (40+) and good drainage' },
          { crop: 'Tur (Arhar)', confidence: 78, note: 'Suitable for black soil, requires less irrigation' },
        ],
        tips: [
          'Use treated seeds (carbendazim 2g/kg seeds) before sowing',
          'Maintain row spacing of 45cm and plant-to-plant distance of 10-12cm',
          'Apply 20:60:40 NPK as basal dose at sowing time',
        ],
      });
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Crop Recommendation"
        subtitle="Get the best crop suggestions for your soil and climate"
        icon={Sprout}
      />

      <InfoBanner
        icon={Info}
        title="How it works"
        message="Enter your soil test values and local conditions. The system will compare your inputs with crop requirements and recommend the most suitable crops. ML model API will be connected in a later phase."
        color="blue"
      />

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="card p-6 space-y-4">
            <h3 className="font-semibold text-gray-900">Farming Conditions</h3>

            <FieldGroup cols={2}>
              <Select label="Location" name="location" value={formData.location} onChange={handleChange}>
                <option>Nashik</option>
                <option>Pune</option>
                <option>Sangli</option>
                <option>Aurangabad</option>
                <option>Nagpur</option>
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
                label="Nitrogen (N)"
                type="number"
                name="nitrogen"
                value={formData.nitrogen}
                onChange={handleChange}
                placeholder="kg/ha"
                required
              />
              <Input
                label="Phosphorus (P)"
                type="number"
                name="phosphorus"
                value={formData.phosphorus}
                onChange={handleChange}
                placeholder="kg/ha"
                required
              />
              <Input
                label="Potassium (K)"
                type="number"
                name="potassium"
                value={formData.potassium}
                onChange={handleChange}
                placeholder="kg/ha"
                required
              />
            </FieldGroup>

            <FieldGroup cols={3}>
              <Input
                label="pH Level"
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
              <Input
                label="Temperature (°C)"
                type="number"
                name="temperature"
                value={formData.temperature}
                onChange={handleChange}
                placeholder="e.g. 28"
              />
              <Input
                label="Humidity (%)"
                type="number"
                name="humidity"
                value={formData.humidity}
                onChange={handleChange}
                placeholder="e.g. 65"
              />
            </FieldGroup>

            <FieldGroup cols={2}>
              <Input
                label="Rainfall (mm)"
                type="number"
                name="rainfall"
                value={formData.rainfall}
                onChange={handleChange}
                placeholder="e.g. 800"
              />
              <Select label="Season" name="season" value={formData.season} onChange={handleChange}>
                <option>Kharif</option>
                <option>Rabi</option>
                <option>Zaid</option>
              </Select>
            </FieldGroup>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Analyzing...
                </>
              ) : (
                'Get Recommendation'
              )}
            </button>
          </form>
        </div>

        {/* Result */}
        <div className="lg:col-span-3">
          {!result && !loading && (
            <div className="card p-10 text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <Sprout className="h-8 w-8 text-green-700" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">No recommendation yet</h3>
              <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">
                Fill in your soil and weather details on the left to see crop suggestions tailored to your farm.
              </p>
            </div>
          )}

          {loading && (
            <div className="card p-10 text-center">
              <Loader2 className="h-10 w-10 animate-spin text-green-700 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900">Analyzing your farm conditions...</h3>
              <p className="text-sm text-gray-500 mt-2">
                Comparing {formData.nitrogen || 'N'}-{formData.phosphorus || 'P'}-{formData.potassium || 'K'} with crop requirements
              </p>
            </div>
          )}

          {result && !loading && (
            <div className="space-y-4">
              {/* Main recommendation */}
              <div className="card p-6 border-green-200">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Recommended Crop</p>
                    <h3 className="text-2xl font-bold text-green-800 mt-1">{result.crop}</h3>
                  </div>
                  <div className="flex items-center gap-1.5 bg-green-50 px-3 py-1.5 rounded-full">
                    <Award className="h-4 w-4 text-green-700" />
                    <span className="text-sm font-semibold text-green-800">{result.confidence}% match</span>
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Why this crop?</h4>
                  <ul className="space-y-2">
                    {result.reasons.map((reason, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                        {reason}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Alternatives */}
              <div className="card p-6">
                <h4 className="font-semibold text-gray-900 mb-3">Alternative Options</h4>
                <div className="space-y-3">
                  {result.alternatives.map((alt) => (
                    <div key={alt.crop} className="flex items-center justify-between p-3 bg-earth-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{alt.crop}</p>
                        <p className="text-xs text-gray-500">{alt.note}</p>
                      </div>
                      <Badge color="green">{alt.confidence}% match</Badge>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cultivation tips */}
              <div className="card p-6 bg-green-50 border-green-200">
                <h4 className="font-semibold text-gray-900 mb-3">Cultivation Tips</h4>
                <ul className="space-y-2">
                  {result.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-green-700 font-medium mt-0.5">{i + 1}.</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-xs text-gray-400 text-center">
                This is a sample recommendation shown for UI demonstration. Connect the ML API to receive actual predictions.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}