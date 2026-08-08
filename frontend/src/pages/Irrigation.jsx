import React, { useState } from 'react';
import { Droplets, AlertCircle } from 'lucide-react';
import { recommendIrrigation } from '../services/irrigationAPI';

export default function Irrigation() {
  const [formData, setFormData] = useState({
    crop: 'Tomato',
    soil_moisture: 30.0,
    temperature: 28.5,
    rainfall_probability: 10.0,
    growth_stage: 'Vegetative',
    soil_type: 'Loamy',
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const value = e.target.type === 'number' ? parseFloat(e.target.value) || 0 : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const data = await recommendIrrigation(formData);
      setResult(data);
    } catch (err) {
      setError(err.message || 'Failed to get irrigation advisory.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3 pb-4 border-b border-slate-700">
        <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-xl text-blue-400">
          <Droplets className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Irrigation & Fertilizer Advisory</h2>
          <p className="text-slate-400 text-sm">
            Optimize water schedule and fertilizer application according to crop lifecycle and field moisture.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Form Column */}
        <div className="md:col-span-2 bg-slate-800/80 border border-slate-700 rounded-2xl p-6 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-2">
              Field & Growth Data
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Crop Name</label>
                <input
                  type="text"
                  name="crop"
                  value={formData.crop}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Growth Stage</label>
                <select
                  name="growth_stage"
                  value={formData.growth_stage}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 text-sm"
                >
                  <option value="Seedling">Seedling</option>
                  <option value="Vegetative">Vegetative</option>
                  <option value="Flowering">Flowering</option>
                  <option value="Yield Formation">Yield Formation</option>
                  <option value="Ripening">Ripening</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Soil Moisture (%)</label>
                <input
                  type="number"
                  step="0.1"
                  name="soil_moisture"
                  value={formData.soil_moisture}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Soil Type</label>
                <select
                  name="soil_type"
                  value={formData.soil_type}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 text-sm"
                >
                  <option value="Clay">Clay</option>
                  <option value="Sandy">Sandy</option>
                  <option value="Loamy">Loamy</option>
                  <option value="Silty">Silty</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Temperature (°C)</label>
                <input
                  type="number"
                  step="0.1"
                  name="temperature"
                  value={formData.temperature}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Rainfall Probability (%)</label>
                <input
                  type="number"
                  step="0.1"
                  name="rainfall_probability"
                  value={formData.rainfall_probability}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2"
            >
              {loading ? <span>Generating Advisory...</span> : <span>Get Resource Advisory</span>}
            </button>
          </form>
        </div>

        {/* Results Column */}
        <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6 shadow-lg flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Advisory Output</h3>
            {error && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300 text-xs flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{error}</span>
              </div>
            )}

            {result ? (
              <div className="space-y-4">
                <div className="p-4 bg-slate-900/60 border border-slate-700/60 rounded-xl space-y-2">
                  <h4 className="text-xs font-semibold text-blue-400 uppercase">Irrigation Needed</h4>
                  <p className="text-sm font-medium text-slate-200">{result.irrigation}</p>
                </div>
                <div className="p-4 bg-slate-900/60 border border-slate-700/60 rounded-xl space-y-2">
                  <h4 className="text-xs font-semibold text-emerald-400 uppercase">Fertilizer Guidance</h4>
                  <p className="text-sm font-medium text-slate-200">{result.fertilizer}</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-10 text-slate-500 space-y-2">
                <Droplets className="w-10 h-10 mx-auto text-slate-600" />
                <p className="text-xs">Submit field parameters to generate advisory</p>
              </div>
            )}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-700/60 text-xs text-slate-500">
            Endpoint: <code className="text-blue-400 font-mono">POST /api/irrigation/recommend</code>
          </div>
        </div>
      </div>
    </div>
  );
}
