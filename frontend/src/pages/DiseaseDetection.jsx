import React, { useState } from 'react';
import { ShieldAlert, Upload, Image as ImageIcon, CheckCircle, AlertTriangle } from 'lucide-react';
import { predictDisease } from '../services/diseaseAPI';

export default function DiseaseDetection() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResult(null);
      setError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const data = await predictDisease(selectedFile);
      setResult(data);
    } catch (err) {
      setError(err.message || 'Failed to detect disease.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3 pb-4 border-b border-slate-700">
        <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-400">
          <ShieldAlert className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Crop Disease Detection</h2>
          <p className="text-slate-400 text-sm">
            Upload an image of the affected crop leaf to detect pests or diseases.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Upload Form Card */}
        <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="border-2 border-dashed border-slate-600 hover:border-emerald-500/50 rounded-xl p-6 text-center cursor-pointer transition-colors relative bg-slate-900/40">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              {previewUrl ? (
                <div className="space-y-3">
                  <img
                    src={previewUrl}
                    alt="Uploaded leaf preview"
                    className="max-h-48 mx-auto rounded-lg object-cover shadow"
                  />
                  <p className="text-xs text-slate-400">{selectedFile?.name}</p>
                </div>
              ) : (
                <div className="space-y-2 py-4">
                  <Upload className="w-10 h-10 text-slate-400 mx-auto" />
                  <p className="text-sm font-medium text-slate-300">
                    Click or drag & drop leaf image here
                  </p>
                  <p className="text-xs text-slate-500">PNG, JPG or JPEG up to 10MB</p>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2"
            >
              {loading ? (
                <span>Analyzing Image...</span>
              ) : (
                <>
                  <ImageIcon className="w-5 h-5" />
                  <span>Run Disease Detection</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Output Display Card */}
        <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6 shadow-lg flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Diagnosis Results</h3>
            {error && (
              <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300 text-sm flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {result ? (
              <div className="space-y-4">
                <div className="p-4 bg-slate-900/60 border border-slate-700/60 rounded-xl space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                    <span className="text-slate-400 text-sm">Crop:</span>
                    <span className="font-semibold text-white">{result.crop}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                    <span className="text-slate-400 text-sm">Detected Disease:</span>
                    <span className="font-semibold text-amber-400">{result.disease}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-sm">Confidence:</span>
                    <span className="font-semibold text-emerald-400">
                      {(result.confidence * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-slate-900/40 border border-slate-700/40 rounded-xl">
                  <h4 className="text-sm font-semibold text-slate-300 mb-1">Advisory Advice</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{result.advice}</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-slate-500 space-y-2">
                <ShieldAlert className="w-12 h-12 mx-auto text-slate-600" />
                <p className="text-sm">Submit an image to see diagnostic results</p>
              </div>
            )}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-700/60 text-xs text-slate-500">
            Endpoint: <code className="text-emerald-400 font-mono">POST /api/disease/predict</code>
          </div>
        </div>
      </div>
    </div>
  );
}
