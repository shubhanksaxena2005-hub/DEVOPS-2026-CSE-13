import { useRef, useState } from 'react';
import { Bug, Upload, Loader2, Image as ImageIcon, ScanLine } from 'lucide-react';

import PageHeader from '../../components/ui/PageHeader';
import { InfoBanner } from '../../components/ui/StatusState';

export default function DiseaseDetection() {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const fileInputRef = useRef(null);

  const handleFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target.result);
      setResult(null);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleAnalyze = () => {
    if (!previewUrl) return;
    setAnalyzing(true);
    setResult(null);

    // Simulate AI analysis delay — replace with real /api/disease-detection request
    setTimeout(() => {
      setResult({
        disease: 'Prediction will appear here',
        confidence: '--',
        isPlaceholder: true,
      });
      setAnalyzing(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Disease Detection"
        subtitle="Upload a photo of your crop to check for diseases"
        icon={Bug}
      />

      <InfoBanner
        icon={ScanLine}
        title="AI detection coming soon"
        message="This feature will use AI to identify crop diseases from photos. The upload interface is ready — the ML model will be connected in a later phase."
        color="amber"
      />

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Upload area */}
        <div className="card p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Upload Crop Photo</h3>

          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current.click()}
            className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors ${
              dragging ? 'border-green-500 bg-green-50' : 'border-earth-300 hover:border-green-400 hover:bg-earth-50'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFile(e.target.files[0])}
            />

            {!previewUrl ? (
              <>
                <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <Upload className="h-8 w-8 text-green-700" />
                </div>
                <h4 className="font-medium text-gray-900">Drag & drop your crop photo</h4>
                <p className="text-sm text-gray-500 mt-1">
                  or click to browse from your device
                </p>
                <p className="text-xs text-gray-400 mt-4">
                  Recommended: clear photo of the affected leaf, <br />
                  JPG or PNG, up to 10MB
                </p>
              </>
            ) : (
              <div className="space-y-4">
                <div className="rounded-lg overflow-hidden bg-earth-100">
                  <img
                    src={previewUrl}
                    alt="Crop preview"
                    className="max-h-72 mx-auto object-contain"
                  />
                </div>
                <div className="flex justify-center gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setPreviewUrl(null);
                      setResult(null);
                    }}
                    className="text-sm font-medium text-red-600 hover:text-red-700"
                  >
                    Remove
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setPreviewUrl(null);
                      setResult(null);
                      fileInputRef.current.click();
                    }}
                    className="text-sm font-medium text-green-700 hover:text-green-800"
                  >
                    Change Photo
                  </button>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={handleAnalyze}
            disabled={!previewUrl || analyzing}
            className="btn-primary w-full mt-5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {analyzing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Analyzing...
              </>
            ) : (
              <>
                <ScanLine className="h-4 w-4" /> Analyze Image
              </>
            )}
          </button>
        </div>

        {/* Result */}
        <div className="card p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Analysis Result</h3>

          {analyzing ? (
            <div className="py-20 text-center">
              <Loader2 className="h-10 w-10 animate-spin text-green-700 mx-auto mb-4" />
              <p className="text-sm text-gray-500">Processing image...</p>
            </div>
          ) : result ? (
            <div className="space-y-5">
              {/* Placeholder result — real AI output will go here */}
              <div className="p-5 bg-earth-50 rounded-xl border border-earth-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-amber-100 text-amber-700">
                    <ImageIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Detected Disease</p>
                    <p className="font-semibold text-gray-900 text-lg">{result.disease}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-earth-200">
                  <div>
                    <p className="text-xs text-gray-500">Confidence</p>
                    <p className="font-semibold text-gray-900">{result.confidence}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Affected Area</p>
                    <p className="font-semibold text-gray-900">--</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Severity</p>
                    <p className="font-semibold text-gray-900">--</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-900">
                  <span className="font-semibold">Note:</span> The AI model has not been connected yet.
                  Once the detection API is available, disease name, confidence score and recommended
                  treatment will appear here automatically.
                </p>
              </div>
            </div>
          ) : (
            <div className="py-20 text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-earth-100 flex items-center justify-center mb-4">
                <Bug className="h-8 w-8 text-earth-500" />
              </div>
              <h4 className="font-medium text-gray-900">No analysis yet</h4>
              <p className="text-sm text-gray-500 mt-1 max-w-xs mx-auto">
                Upload a clear photo of the affected leaf and click "Analyze Image" to see the result.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}