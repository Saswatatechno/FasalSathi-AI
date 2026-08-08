import React, { useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import TopNavBar from '../components/layout/TopNavBar';
import { recommendCrop } from '../services/cropService';

export default function CropRecommendationPage() {
  const [formData, setFormData] = useState({
    region: 'Punjab, India',
    temperature: 25.5,
    rainfall: 200,
    soilType: 'loamy',
    nitrogen: 90,
    phosphorus: 42,
    potassium: 43,
    ph: 6.5,
    humidity: 80,
  });

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

    const { nitrogen, phosphorus, potassium, ph, temperature, humidity, rainfall } = formData;

    if (
      nitrogen === '' || nitrogen === null || isNaN(Number(nitrogen)) ||
      phosphorus === '' || phosphorus === null || isNaN(Number(phosphorus)) ||
      potassium === '' || potassium === null || isNaN(Number(potassium)) ||
      ph === '' || ph === null || isNaN(Number(ph)) ||
      temperature === '' || temperature === null || isNaN(Number(temperature)) ||
      humidity === '' || humidity === null || isNaN(Number(humidity)) ||
      rainfall === '' || rainfall === null || isNaN(Number(rainfall))
    ) {
      setError('Please provide valid numeric values for all soil and climate parameters.');
      return;
    }

    const numPh = Number(ph);
    if (numPh < 0 || numPh > 14) {
      setError('Soil pH level must be between 0 and 14.');
      return;
    }

    setIsLoading(true);

    try {
      const apiResponse = await recommendCrop({
        nitrogen: Number(nitrogen),
        phosphorus: Number(phosphorus),
        potassium: Number(potassium),
        ph: numPh,
        temperature: Number(temperature),
        humidity: Number(humidity),
        rainfall: Number(rainfall),
      });

      if (apiResponse && apiResponse.success) {
        setResult(apiResponse);
      } else {
        setError('Unable to generate crop recommendation. Please check your inputs and try again.');
      }
    } catch (err) {
      console.error('Crop recommendation error:', err);
      setError('Unable to generate crop recommendation. Please check your inputs and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-background text-on-surface font-sans antialiased min-h-screen flex">
      <Sidebar />

      <main className="flex-1 ml-0 lg:ml-[260px] mt-16 p-margin-mobile lg:p-margin-desktop min-h-[calc(100vh-64px)] overflow-x-hidden">
        <TopNavBar />

        <div className="max-w-max-width mx-auto">
          {/* Page Header */}
          <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="font-headline-lg text-2xl lg:text-3xl font-bold text-primary">
                AI Crop Recommendation
              </h2>
              <p className="font-body-lg text-body-lg text-text-muted mt-2 max-w-2xl">
                Input your field parameters to receive scientifically backed, AI-driven crop suggestions optimized for yield and soil health.
              </p>
            </div>
          </div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
            {/* Input Form Panel (Spans 5 columns) */}
            <div className="xl:col-span-5 bg-surface-container-lowest rounded-xl border border-border-subtle shadow-[0_4px_24px_rgba(27,67,50,0.04)] p-6">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border-subtle">
                <div className="w-8 h-8 rounded bg-primary-container/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">tune</span>
                </div>
                <h3 className="font-title-lg text-title-lg text-on-surface font-semibold">Field Parameters</h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Location & Climate */}
                <div className="space-y-4">
                  <h4 className="font-label-md text-label-md text-text-muted uppercase tracking-wider">
                    Location & Climate
                  </h4>
                  <div>
                    <label className="block font-label-md text-label-md text-on-surface-variant mb-1">Region / Location</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-[18px]">location_on</span>
                      <input 
                        name="region"
                        value={formData.region}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2.5 bg-surface rounded-lg border border-border-subtle focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all font-body-md text-body-md" 
                        placeholder="e.g., Punjab, India" 
                        type="text"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-label-md text-label-md text-on-surface-variant mb-1">Avg Temp (°C)</label>
                      <input 
                        name="temperature"
                        value={formData.temperature}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 bg-surface rounded-lg border border-border-subtle focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all font-body-md text-body-md" 
                        placeholder="25.5" 
                        type="number"
                        step="0.1"
                      />
                    </div>
                    <div>
                      <label className="block font-label-md text-label-md text-on-surface-variant mb-1">Humidity (%)</label>
                      <input 
                        name="humidity"
                        value={formData.humidity}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 bg-surface rounded-lg border border-border-subtle focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all font-body-md text-body-md" 
                        placeholder="80" 
                        type="number"
                        step="0.1"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-label-md text-label-md text-on-surface-variant mb-1">Rainfall (mm)</label>
                    <input 
                      name="rainfall"
                      value={formData.rainfall}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-surface rounded-lg border border-border-subtle focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all font-body-md text-body-md" 
                      placeholder="200" 
                      type="number"
                      step="0.1"
                    />
                  </div>
                </div>

                {/* Soil Composition */}
                <div className="space-y-4 pt-2">
                  <h4 className="font-label-md text-label-md text-text-muted uppercase tracking-wider">
                    Soil Health (NPK & pH)
                  </h4>
                  <div>
                    <label className="block font-label-md text-label-md text-on-surface-variant mb-1">Soil Type</label>
                    <select 
                      name="soilType"
                      value={formData.soilType}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-surface rounded-lg border border-border-subtle focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all font-body-md text-body-md text-on-surface"
                    >
                      <option value="loamy">Loamy</option>
                      <option value="clay">Clay</option>
                      <option value="sandy">Sandy</option>
                      <option value="silt">Silt</option>
                      <option value="peat">Peat</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block font-label-md text-label-md text-on-surface-variant mb-1">Nitrogen (N)</label>
                      <input 
                        name="nitrogen"
                        value={formData.nitrogen}
                        onChange={handleChange}
                        className="w-full px-3 py-2.5 bg-surface rounded-lg border border-border-subtle focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all font-body-md text-body-md text-center" 
                        placeholder="90" 
                        type="number"
                        step="0.1"
                      />
                    </div>
                    <div>
                      <label className="block font-label-md text-label-md text-on-surface-variant mb-1">Phosphorus (P)</label>
                      <input 
                        name="phosphorus"
                        value={formData.phosphorus}
                        onChange={handleChange}
                        className="w-full px-3 py-2.5 bg-surface rounded-lg border border-border-subtle focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all font-body-md text-body-md text-center" 
                        placeholder="42" 
                        type="number"
                        step="0.1"
                      />
                    </div>
                    <div>
                      <label className="block font-label-md text-label-md text-on-surface-variant mb-1">Potassium (K)</label>
                      <input 
                        name="potassium"
                        value={formData.potassium}
                        onChange={handleChange}
                        className="w-full px-3 py-2.5 bg-surface rounded-lg border border-border-subtle focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all font-body-md text-body-md text-center" 
                        placeholder="43" 
                        type="number"
                        step="0.1"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-label-md text-label-md text-on-surface-variant mb-1">pH Level (0-14)</label>
                    <div className="flex items-center gap-4">
                      <input 
                        name="ph"
                        type="range"
                        min="0"
                        max="14"
                        step="0.1"
                        value={formData.ph}
                        onChange={handleChange}
                        className="w-full h-2 bg-surface-container-high rounded-lg appearance-none cursor-pointer accent-secondary"
                      />
                      <span className="font-body-md font-semibold text-on-surface w-8 text-right">{formData.ph}</span>
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="p-3 bg-error-container/30 border border-error/20 text-error rounded-lg text-sm flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">error</span>
                    <span>{error}</span>
                  </div>
                )}

                <div className="pt-4">
                  <button 
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 bg-primary text-on-primary rounded-xl font-title-md text-title-md font-bold hover:bg-primary-container transition-all flex items-center justify-center gap-2 group shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <span className="material-symbols-outlined animate-spin">sync</span>
                        Computing Recommendation...
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-outlined group-hover:rotate-180 transition-transform duration-500">auto_awesome</span>
                        Generate Recommendations
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Results Panel (Spans 7 columns) */}
            <div className="xl:col-span-7 space-y-6 relative">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-title-lg text-title-lg text-on-surface font-semibold flex items-center gap-2">
                  <span className="material-symbols-outlined text-success-natural">verified</span>
                  AI Crop Recommendation
                </h3>
                <span className="font-label-md text-label-md text-text-muted bg-surface-container-high px-3 py-1 rounded-full">
                  Gemini AI Engine
                </span>
              </div>

              {/* Pre-submission Empty State */}
              {!result && !isLoading && (
                <div className="bg-surface-container-lowest rounded-xl border border-border-subtle p-8 text-center flex flex-col items-center justify-center min-h-[320px]">
                  <div className="w-16 h-16 rounded-full bg-primary-fixed-dim/20 flex items-center justify-center text-primary mb-4">
                    <span className="material-symbols-outlined text-3xl">psychiatry</span>
                  </div>
                  <h4 className="font-title-lg text-title-lg font-bold text-primary mb-2">Awaiting Parameters</h4>
                  <p className="font-body-md text-body-md text-text-muted max-w-md">
                    Fill in your soil health (NPK, pH) and microclimate parameters on the left, then click <strong>Generate Recommendations</strong> to receive an AI-driven crop selection.
                  </p>
                </div>
              )}

              {/* Loading State */}
              {isLoading && (
                <div className="bg-surface-container-lowest rounded-xl border border-border-subtle p-8 text-center flex flex-col items-center justify-center min-h-[320px] space-y-4">
                  <div className="w-16 h-16 rounded-full bg-secondary-container flex items-center justify-center text-secondary animate-pulse">
                    <span className="material-symbols-outlined text-3xl animate-spin">auto_awesome</span>
                  </div>
                  <h4 className="font-title-lg text-title-lg font-bold text-primary">Evaluating Field Parameters...</h4>
                  <p className="font-body-md text-body-md text-text-muted">Analyzing nitrogen, phosphorus, potassium, pH, and climate data with Gemini AI.</p>
                </div>
              )}

              {/* Dynamic Result Card */}
              {result && !isLoading && (
                <div className="bg-surface-container-lowest rounded-xl border border-border-subtle shadow-[0_8px_30px_rgba(27,67,50,0.06)] overflow-hidden group">
                  <div className="h-2 w-full bg-gradient-to-r from-success-natural to-secondary" />
                  <div className="p-6 space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-primary-fixed flex items-center justify-center text-primary shrink-0 shadow-sm">
                        <span className="material-symbols-outlined text-3xl icon-fill">eco</span>
                      </div>
                      <div className="flex-1">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-secondary-container/40 text-on-secondary-container font-label-md text-label-md font-bold mb-2">
                          <span className="material-symbols-outlined text-[14px]">stars</span> Optimal Crop Selected
                        </span>
                        <h4 className="font-headline-lg text-3xl font-extrabold text-primary">
                          🌾 {result.recommended_crop}
                        </h4>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border-subtle space-y-3">
                      <h5 className="font-title-md text-title-md font-bold text-primary flex items-center gap-2">
                        <span className="material-symbols-outlined text-secondary">lightbulb</span>
                        Recommendation Reason
                      </h5>
                      <div className="p-4 bg-surface rounded-xl border border-border-subtle text-body-md text-on-surface-variant leading-relaxed">
                        {result.reason}
                      </div>
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button 
                        onClick={() => setResult(null)}
                        className="px-4 py-2 text-sm font-semibold text-text-muted hover:text-primary transition-colors flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-sm">refresh</span>
                        Reset Analysis
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
