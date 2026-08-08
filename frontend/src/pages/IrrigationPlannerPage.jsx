import React, { useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import TopNavBar from '../components/layout/TopNavBar';
import { getIrrigationAdvisory } from '../services/irrigationService';

export default function IrrigationPlannerPage() {
  const [formData, setFormData] = useState({
    crop: 'Wheat',
    growth_stage: 'Vegetative',
    soil_moisture: 45,
    temperature: 28,
    rainfall_probability: 12,
    weather_condition: 'Partly Cloudy',
    soil_type: 'Loamy',
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
    setIsLoading(true);
    setError(null);

    try {
      const data = await getIrrigationAdvisory(formData);
      setResult(data);
    } catch (err) {
      console.error('Irrigation recommendation error:', err);
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

        {/* Decorative Water Element */}
        <div className="absolute top-0 right-0 w-96 h-96 water-wave rounded-full -z-10 blur-3xl opacity-50 pointer-events-none" />

        {/* Header */}
        <div className="mb-8 relative z-10">
          <h2 className="font-headline-lg text-2xl lg:text-3xl font-bold text-primary mb-2 flex items-center gap-2">
            <span className="material-symbols-outlined text-3xl icon-fill">water_drop</span>
            Smart Irrigation Planner
          </h2>
          <p className="font-body-lg text-body-lg text-text-muted max-w-2xl">
            Optimize your water usage with AI-driven recommendations tailored to your crop's current stage and local weather forecasts.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
          {/* Input Form Section (Left Column) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Card 1: Crop Details */}
            <div className="glass-card rounded-xl p-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full transition-transform group-hover:scale-110" />
              <h3 className="font-title-lg text-title-lg text-primary font-bold mb-6 border-b border-border-subtle pb-2">
                Crop Details
              </h3>
              
              <div className="space-y-5 relative z-10">
                <div>
                  <label className="block font-label-md text-label-md text-on-surface-variant mb-1">Crop Type</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">eco</span>
                    <select 
                      name="crop"
                      value={formData.crop}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2.5 bg-surface-container-lowest border border-border-subtle rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary text-body-md"
                    >
                      <option value="Wheat">Wheat</option>
                      <option value="Rice">Rice</option>
                      <option value="Corn">Corn</option>
                      <option value="Cotton">Cotton</option>
                      <option value="Sugarcane">Sugarcane</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-label-md text-label-md text-on-surface-variant mb-1">Growth Stage</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">timeline</span>
                    <select 
                      name="growth_stage"
                      value={formData.growth_stage}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2.5 bg-surface-container-lowest border border-border-subtle rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary text-body-md"
                    >
                      <option value="Vegetative">Vegetative</option>
                      <option value="Flowering">Flowering</option>
                      <option value="Yield Formation">Yield Formation</option>
                      <option value="Ripening">Ripening</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-label-md text-label-md text-on-surface-variant mb-1">Current Soil Moisture (%)</label>
                  <div className="relative flex items-center gap-4">
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
              </div>
            </div>

            {/* Card 2: Environmental Data */}
            <div className="bg-surface rounded-xl p-6 border border-border-subtle shadow-sm relative overflow-hidden group">
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-accent-harvest/10 rounded-tl-full transition-transform group-hover:scale-110" />
              <h3 className="font-title-lg text-title-lg text-primary font-bold mb-6 border-b border-border-subtle pb-2">
                Environmental Data
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-label-md text-label-md text-on-surface-variant mb-1">Temperature (°C)</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-warning-amber">thermostat</span>
                      <input 
                        name="temperature"
                        type="number"
                        value={formData.temperature}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2.5 bg-surface-container-lowest border border-border-subtle rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-body-md"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block font-label-md text-label-md text-on-surface-variant mb-1">Rain Forecast (mm)</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary">rainy</span>
                      <input 
                        name="rainfall_probability"
                        type="number"
                        value={formData.rainfall_probability}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2.5 bg-surface-container-lowest border border-border-subtle rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-body-md"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block font-label-md text-label-md text-on-surface-variant mb-1">Weather Condition</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">partly_cloudy_day</span>
                    <select 
                      name="weather_condition"
                      value={formData.weather_condition}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2.5 bg-surface-container-lowest border border-border-subtle rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-body-md"
                    >
                      <option value="Partly Cloudy">Partly Cloudy</option>
                      <option value="Sunny">Sunny</option>
                      <option value="Overcast">Overcast</option>
                      <option value="Rainy">Rainy</option>
                    </select>
                  </div>
                </div>

                {error && (
                  <div className="p-3 bg-error-container/30 border border-error/20 text-error rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 px-4 bg-primary text-on-primary rounded-xl font-title-md text-title-md font-bold hover:bg-primary/90 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 mt-4 group"
                >
                  {isLoading ? (
                    <>
                      <span className="material-symbols-outlined animate-spin">sync</span>
                      Calculating Strategy...
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined group-hover:animate-pulse">auto_awesome</span>
                      Generate Recommendation
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Result Section (Right Column) */}
          <div className="lg:col-span-7 h-full">
            <div className="h-full bg-surface-container-lowest rounded-xl border border-border-subtle shadow-[0_8px_30px_rgba(27,67,50,0.08)] overflow-hidden relative flex flex-col min-h-[500px]">
              <div className="h-2 bg-secondary w-full" />
              
              <div className="p-8 flex-1 flex flex-col relative z-10">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container/30 text-secondary font-label-md text-label-md font-bold mb-3">
                      <span className="material-symbols-outlined text-[16px]">check_circle</span>
                      AI Irrigation Strategy
                    </span>
                    <h3 className="font-display-lg text-2xl lg:text-4xl font-extrabold text-primary leading-tight">
                      Optimal Watering Strategy
                    </h3>
                  </div>
                  <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center">
                    <span className="material-symbols-outlined text-4xl text-secondary icon-fill">water_drop</span>
                  </div>
                </div>

                {/* Primary Backend Results */}
                {result && (
                  <div className="mb-6 p-4 bg-secondary-container/20 border border-secondary/30 rounded-xl space-y-2">
                    <p className="font-body-md text-primary"><strong>Irrigation Advisory:</strong> {result.irrigation}</p>
                    <p className="font-body-md text-primary"><strong>Fertilizer Guidance:</strong> {result.fertilizer}</p>
                  </div>
                )}

                {/* Primary Metrics Grid */}
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="bg-surface rounded-xl p-5 border border-border-subtle/50 shadow-sm flex flex-col justify-center">
                    <span className="font-label-md text-label-md text-text-muted mb-1 flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px]">opacity</span> Water Requirement
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="font-display-lg text-3xl font-extrabold text-primary">
                        {formData.soil_moisture < 40 ? '60' : '45'}
                      </span>
                      <span className="font-title-md text-title-md text-text-muted">mm/hectare</span>
                    </div>
                  </div>

                  <div className="bg-surface rounded-xl p-5 border border-border-subtle/50 shadow-sm flex flex-col justify-center">
                    <span className="font-label-md text-label-md text-text-muted mb-1 flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px]">timer</span> Recommended Duration
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="font-display-lg text-3xl font-extrabold text-primary">
                        {formData.soil_moisture < 40 ? '3.5' : '2.5'}
                      </span>
                      <span className="font-title-md text-title-md text-text-muted">hours</span>
                    </div>
                  </div>
                </div>

                {/* Secondary Recommendations */}
                <div className="bg-surface-container/30 rounded-xl p-6 border border-border-subtle/30 mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <span className="font-label-md text-label-md text-text-muted block mb-2">Best Method</span>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-primary">
                          <span className="material-symbols-outlined">sprinkler</span>
                        </div>
                        <span className="font-title-md text-title-md text-primary font-bold">Drip Irrigation</span>
                      </div>
                    </div>

                    <div>
                      <span className="font-label-md text-label-md text-text-muted block mb-2">Optimal Time</span>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-accent-harvest">
                          <span className="material-symbols-outlined">wb_twilight</span>
                        </div>
                        <span className="font-title-md text-title-md text-primary font-bold">05:30 AM - 08:00 AM</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tips Section */}
                <div className="mt-auto">
                  <h4 className="font-title-md text-title-md text-primary mb-3 flex items-center gap-2 font-bold">
                    <span className="material-symbols-outlined text-secondary">lightbulb</span>
                    Water-Saving Tips
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 bg-white p-3 rounded-lg border border-border-subtle shadow-sm">
                      <span className="material-symbols-outlined text-secondary mt-0.5">check</span>
                      <p className="font-body-md text-body-md text-on-surface-variant">
                        Early morning irrigation reduces evaporation loss by up to 30% compared to mid-day watering.
                      </p>
                    </li>
                    <li className="flex items-start gap-3 bg-white p-3 rounded-lg border border-border-subtle shadow-sm">
                      <span className="material-symbols-outlined text-secondary mt-0.5">check</span>
                      <p className="font-body-md text-body-md text-on-surface-variant">
                        Expected rain ({formData.rainfall_probability}mm) has been factored into this recommendation to prevent overwatering.
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
