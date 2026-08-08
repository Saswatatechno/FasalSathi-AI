import React, { useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import TopNavBar from '../components/layout/TopNavBar';
import { getIrrigationAdvisory } from '../services/irrigationService';

const initialFormData = {
  crop: 'Wheat',
  growth_stage: 'Vegetative',
  soil_moisture: 45,
  temperature: 28,
  rainfall_probability: 12,
  nitrogen: 90,
  phosphorus: 42,
  potassium: 43,
};

export default function IrrigationPlannerPage() {
  const [formData, setFormData] = useState(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setError(null);

    const numericFields = [
      ['soil_moisture', 'Soil moisture'],
      ['temperature', 'Temperature'],
      ['rainfall_probability', 'Rainfall probability'],
      ['nitrogen', 'Nitrogen'],
      ['phosphorus', 'Phosphorus'],
      ['potassium', 'Potassium'],
    ];

    for (const [field, label] of numericFields) {
      if (formData[field] === '' || !Number.isFinite(Number(formData[field]))) {
        setError(`${label} must be a valid number.`);
        return;
      }
    }

    const ranges = [
      ['soil_moisture', 0, 100, 'Soil moisture'],
      ['temperature', -20, 60, 'Temperature'],
      ['rainfall_probability', 0, 100, 'Rainfall probability'],
      ['nitrogen', 0, 500, 'Nitrogen'],
      ['phosphorus', 0, 500, 'Phosphorus'],
      ['potassium', 0, 500, 'Potassium'],
    ];

    for (const [field, min, max, label] of ranges) {
      const value = Number(formData[field]);
      if (value < min || value > max) {
        setError(`${label} must be between ${min} and ${max}.`);
        return;
      }
    }

    setIsLoading(true);

    try {
      const response = await getIrrigationAdvisory(formData);
      if (!response?.success || !response?.data) {
        throw new Error('The advisory service returned an invalid response.');
      }
      setResult(response.data);
    } catch (err) {
      console.error('Irrigation recommendation error:', err);
      setResult(null);
      setError(err.message || 'Failed to generate irrigation advice.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-bg-warm text-on-surface font-sans antialiased min-h-screen overflow-x-hidden">
      <Sidebar />

      <main className="lg:ml-[260px] pt-16 min-h-screen p-margin-mobile lg:p-margin-desktop water-gradient relative overflow-hidden">
        <TopNavBar />

        <div className="absolute top-0 right-0 w-96 h-96 water-wave rounded-full -z-10 blur-3xl opacity-50 pointer-events-none" />

        <div className="mb-8 relative z-10">
          <h2 className="font-headline-lg text-2xl lg:text-3xl font-bold text-primary mb-2 flex items-center gap-2">
            <span className="material-symbols-outlined text-3xl icon-fill">water_drop</span>
            Smart Irrigation & Fertilizer Advisory
          </h2>
          <p className="font-body-lg text-body-lg text-text-muted max-w-2xl">
            Get transparent, rule-based guidance from your crop, soil moisture, weather and NPK values.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-card rounded-xl p-6 relative overflow-hidden">
              <h3 className="font-title-lg text-title-lg text-primary font-bold mb-6 border-b border-border-subtle pb-2">
                Crop & Field Data
              </h3>

              <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                <div>
                  <label className="block font-label-md text-label-md text-on-surface-variant mb-1">Crop Type</label>
                  <select
                    name="crop"
                    value={formData.crop}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-surface-container-lowest border border-border-subtle rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-body-md"
                  >
                    <option>Wheat</option>
                    <option>Rice</option>
                    <option>Corn</option>
                    <option>Maize</option>
                    <option>Cotton</option>
                    <option>Sugarcane</option>
                    <option>Tomato</option>
                    <option>Potato</option>
                    <option>Soybean</option>
                  </select>
                </div>

                <div>
                  <label className="block font-label-md text-label-md text-on-surface-variant mb-1">Growth Stage</label>
                  <select
                    name="growth_stage"
                    value={formData.growth_stage}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-surface-container-lowest border border-border-subtle rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-body-md"
                  >
                    <option>Seedling</option>
                    <option>Vegetative</option>
                    <option>Flowering</option>
                    <option>Yield Formation</option>
                    <option>Ripening</option>
                  </select>
                </div>

                <div>
                  <label className="block font-label-md text-label-md text-on-surface-variant mb-1">
                    Current Soil Moisture (%)
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      name="soil_moisture"
                      type="range"
                      min="0"
                      max="100"
                      value={formData.soil_moisture}
                      onChange={handleChange}
                      className="w-full h-2 bg-surface-variant rounded-lg appearance-none cursor-pointer accent-secondary"
                    />
                    <span className="font-title-md text-title-md font-bold text-primary w-12 text-right">
                      {formData.soil_moisture}%
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <h4 className="font-label-md text-label-md text-text-muted uppercase tracking-wider mb-3">
                    Soil Nutrients (mg/kg)
                  </h4>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      ['nitrogen', 'Nitrogen (N)'],
                      ['phosphorus', 'Phosphorus (P)'],
                      ['potassium', 'Potassium (K)'],
                    ].map(([name, label]) => (
                      <div key={name}>
                        <label className="block font-label-md text-label-md text-on-surface-variant mb-1">
                          {label}
                        </label>
                        <input
                          name={name}
                          type="number"
                          min="0"
                          max="500"
                          step="0.1"
                          value={formData[name]}
                          onChange={handleChange}
                          className="w-full px-3 py-2.5 bg-surface-container-lowest border border-border-subtle rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-body-md"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <h4 className="font-label-md text-label-md text-text-muted uppercase tracking-wider mb-3">
                    Environmental Data
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-label-md text-label-md text-on-surface-variant mb-1">Temperature (°C)</label>
                      <input
                        name="temperature"
                        type="number"
                        min="-20"
                        max="60"
                        step="0.1"
                        value={formData.temperature}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 bg-surface-container-lowest border border-border-subtle rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-body-md"
                      />
                    </div>
                    <div>
                      <label className="block font-label-md text-label-md text-on-surface-variant mb-1">
                        Rainfall Probability (%)
                      </label>
                      <input
                        name="rainfall_probability"
                        type="number"
                        min="0"
                        max="100"
                        step="1"
                        value={formData.rainfall_probability}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 bg-surface-container-lowest border border-border-subtle rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-body-md"
                      />
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="p-3 bg-error-container/30 border border-error/20 text-error rounded-lg text-sm flex items-start gap-2">
                    <span className="material-symbols-outlined text-[18px]">error</span>
                    <span>{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 px-4 bg-primary text-on-primary rounded-xl font-title-md text-title-md font-bold hover:bg-primary/90 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <span className="material-symbols-outlined animate-spin">sync</span>
                      Calculating Advisory...
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined">auto_awesome</span>
                      Generate Advisory
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-7 h-full">
            <div className="h-full bg-surface-container-lowest rounded-xl border border-border-subtle shadow-[0_8px_30px_rgba(27,67,50,0.08)] overflow-hidden relative flex flex-col min-h-[500px]">
              <div className="h-2 bg-secondary w-full" />

              <div className="p-8 flex-1 flex flex-col relative z-10">
                {!result && !isLoading && (
                  <div className="flex-1 flex flex-col items-center justify-center text-center min-h-[460px]">
                    <div className="w-20 h-20 rounded-full bg-secondary-container/30 flex items-center justify-center text-secondary mb-5">
                      <span className="material-symbols-outlined text-4xl icon-fill">water_drop</span>
                    </div>
                    <h3 className="font-title-lg text-title-lg font-bold text-primary mb-2">Awaiting Field Data</h3>
                    <p className="font-body-md text-body-md text-text-muted max-w-md">
                      Enter your current field conditions and NPK values to receive separate irrigation and fertilizer guidance.
                    </p>
                  </div>
                )}

                {isLoading && (
                  <div className="flex-1 flex flex-col items-center justify-center text-center min-h-[460px] space-y-4">
                    <div className="w-16 h-16 rounded-full bg-secondary-container flex items-center justify-center text-secondary animate-pulse">
                      <span className="material-symbols-outlined text-3xl animate-spin">auto_awesome</span>
                    </div>
                    <h3 className="font-title-lg text-title-lg font-bold text-primary">Evaluating Field Conditions...</h3>
                    <p className="font-body-md text-body-md text-text-muted">
                      Applying transparent irrigation and NPK screening rules.
                    </p>
                  </div>
                )}

                {result && !isLoading && (
                  <div className="space-y-6">
                    <div>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container/30 text-secondary font-label-md text-label-md font-bold mb-3">
                        <span className="material-symbols-outlined text-[16px]">check_circle</span>
                        Advisory Ready
                      </span>
                      <h3 className="font-display-lg text-2xl lg:text-4xl font-extrabold text-primary leading-tight">
                        Your Field Advisory
                      </h3>
                      <p className="font-body-md text-body-md text-text-muted mt-2">
                        Guidance is based only on the values you provided.
                      </p>
                    </div>

                    <section className="bg-sky-50/60 border border-sky-100 rounded-xl p-6">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-secondary shadow-sm">
                          <span className="material-symbols-outlined icon-fill">water_drop</span>
                        </div>
                        <div>
                          <h4 className="font-title-lg text-title-lg font-bold text-primary">Irrigation Advisory</h4>
                          <p className="font-body-md text-body-md text-primary mt-1 font-semibold">
                            {result.irrigation.recommendation}
                          </p>
                        </div>
                      </div>
                      <div className="ml-0 md:ml-[52px] p-4 bg-white/80 rounded-lg border border-border-subtle">
                        <p className="font-body-md text-body-md text-on-surface-variant">
                          <strong className="text-primary">Why:</strong> {result.irrigation.reason}
                        </p>
                      </div>
                    </section>

                    <section className="bg-amber-50/60 border border-amber-100 rounded-xl p-6">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-accent-harvest shadow-sm">
                          <span className="material-symbols-outlined icon-fill">grass</span>
                        </div>
                        <div>
                          <h4 className="font-title-lg text-title-lg font-bold text-primary">Fertilizer Advisory</h4>
                          <p className="font-body-md text-body-md text-primary mt-1 font-semibold">
                            {result.fertilizer.recommendation}
                          </p>
                        </div>
                      </div>
                      <div className="ml-0 md:ml-[52px] p-4 bg-white/80 rounded-lg border border-border-subtle">
                        <p className="font-body-md text-body-md text-on-surface-variant">
                          <strong className="text-primary">Why:</strong> {result.fertilizer.reason}
                        </p>
                      </div>
                      {result.fertilizer.nutrients_needing_attention?.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {result.fertilizer.nutrients_needing_attention.map((nutrient) => (
                            <span key={nutrient} className="px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-sm font-semibold">
                              {nutrient}
                            </span>
                          ))}
                        </div>
                      )}
                    </section>

                    <div className="p-4 bg-surface-container-low rounded-xl border border-border-subtle text-sm text-text-muted">
                      <strong className="text-primary">Note:</strong> These are screening-level decision-support rules, not exact fertilizer doses or guaranteed outcomes. Confirm fertilizer decisions with a local soil test and crop-specific guidance.
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
