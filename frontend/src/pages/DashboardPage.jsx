import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import TopNavBar from '../components/layout/TopNavBar';

export default function DashboardPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-background text-on-surface font-sans min-h-screen flex overflow-x-hidden">
      <Sidebar />
      
      <div className="flex-1 lg:ml-[260px] flex flex-col min-h-screen">
        <TopNavBar />

        {/* Main Canvas Content */}
        <main className="flex-1 p-margin-mobile md:p-margin-desktop mt-16 max-w-max-width mx-auto w-full">
          {/* Greeting & Quick Stats */}
          <section className="mb-10">
            <h2 className="font-headline-lg text-2xl md:text-3xl font-bold text-primary mb-2">
              Welcome back, Farmer
            </h2>
            <p className="font-body-lg text-body-lg text-text-muted mb-8">
              Here is what's happening in your fields today.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Stat 1 */}
              <div className="bg-surface-container-lowest rounded-2xl p-6 border border-border-subtle shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center text-primary-container">
                    <span className="material-symbols-outlined icon-fill">psychology</span>
                  </div>
                  <span className="flex items-center text-success-natural font-label-md text-label-md bg-secondary-container/30 px-2 py-1 rounded-md">
                    <span className="material-symbols-outlined text-[14px] mr-1">arrow_upward</span> 12%
                  </span>
                </div>
                <p className="font-title-md text-title-md text-text-muted">Disease Analyses</p>
                <p className="font-display-lg text-3xl font-bold text-primary mt-1">1,248</p>
              </div>

              {/* Stat 2 */}
              <div className="bg-surface-container-lowest rounded-2xl p-6 border border-border-subtle shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary">
                    <span className="material-symbols-outlined icon-fill">psychiatry</span>
                  </div>
                  <span className="flex items-center text-success-natural font-label-md text-label-md bg-secondary-container/30 px-2 py-1 rounded-md">
                    <span className="material-symbols-outlined text-[14px] mr-1">check</span> 98%
                  </span>
                </div>
                <p className="font-title-md text-title-md text-text-muted">Healthy Crops</p>
                <p className="font-display-lg text-3xl font-bold text-primary mt-1">8,420</p>
              </div>

              {/* Stat 3 */}
              <div className="bg-surface-container-lowest rounded-2xl p-6 border border-border-subtle shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#E0F2FE] flex items-center justify-center text-[#0369A1]">
                    <span className="material-symbols-outlined icon-fill">water_drop</span>
                  </div>
                  <span className="flex items-center text-success-natural font-label-md text-label-md bg-secondary-container/30 px-2 py-1 rounded-md">
                    <span className="material-symbols-outlined text-[14px] mr-1">arrow_upward</span> 450L
                  </span>
                </div>
                <p className="font-title-md text-title-md text-text-muted">Water Saved</p>
                <p className="font-display-lg text-3xl font-bold text-primary mt-1">12.5k</p>
              </div>

              {/* Stat 4 */}
              <div className="bg-surface-container-lowest rounded-2xl p-6 border border-border-subtle shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-full bg-tertiary-fixed flex items-center justify-center text-tertiary">
                    <span className="material-symbols-outlined icon-fill">trending_up</span>
                  </div>
                  <span className="flex items-center text-success-natural font-label-md text-label-md bg-secondary-container/30 px-2 py-1 rounded-md">
                    <span className="material-symbols-outlined text-[14px] mr-1">arrow_upward</span> 8%
                  </span>
                </div>
                <p className="font-title-md text-title-md text-text-muted">Yield Improvement</p>
                <p className="font-display-lg text-3xl font-bold text-primary mt-1">+2.4T</p>
              </div>
            </div>
          </section>

          {/* Premium Feature Cards Grid */}
          <section className="mb-10">
            <div className="flex justify-between items-end mb-6">
              <h3 className="font-headline-md text-xl md:text-2xl font-bold text-primary">Core Modules</h3>
              <span className="font-label-md text-label-md text-secondary flex items-center gap-1 cursor-default">
                4 Active Features <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Feature 1: Disease Detection */}
              <div 
                onClick={() => navigate('/disease')}
                className="group relative overflow-hidden bg-surface-container-lowest rounded-2xl border border-border-subtle shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col md:flex-row cursor-pointer"
              >
                <div className="md:w-1/3 h-48 md:h-auto relative overflow-hidden bg-surface-container-high">
                  <div 
                    className="bg-cover bg-center w-full h-full group-hover:scale-105 transition-transform duration-500 min-h-[160px]"
                    style={{ backgroundImage: `url('https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=600&q=80')` }}
                  />
                </div>
                <div className="p-6 md:w-2/3 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-2 bg-error-container text-error rounded-lg">
                      <span className="material-symbols-outlined">psychology</span>
                    </div>
                    <h4 className="font-title-lg text-title-lg text-primary font-bold">Disease Detection</h4>
                  </div>
                  <p className="font-body-md text-body-md text-text-muted mb-4">
                    Instantly identify crop anomalies using Gemini Vision AI. Upload a photo for diagnosis and treatment.
                  </p>
                  <div className="mt-auto flex items-center text-primary font-label-md text-label-md font-bold group-hover:text-secondary transition-colors">
                    Run Scan <span class="material-symbols-outlined ml-1 text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </div>
                </div>
              </div>

              {/* Feature 2: Crop Recommendation */}
              <div 
                onClick={() => navigate('/crop')}
                className="group relative overflow-hidden bg-surface-container-lowest rounded-2xl border border-border-subtle shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col md:flex-row cursor-pointer"
              >
                <div className="md:w-1/3 h-48 md:h-auto relative overflow-hidden bg-surface-container-high">
                  <div 
                    className="bg-cover bg-center w-full h-full group-hover:scale-105 transition-transform duration-500 min-h-[160px]"
                    style={{ backgroundImage: `url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=600&q=80')` }}
                  />
                </div>
                <div className="p-6 md:w-2/3 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-2 bg-primary-fixed text-primary-container rounded-lg">
                      <span className="material-symbols-outlined">psychiatry</span>
                    </div>
                    <h4 className="font-title-lg text-title-lg text-primary font-bold">Crop Recommendation</h4>
                  </div>
                  <p className="font-body-md text-body-md text-text-muted mb-4">
                    Data-driven suggestions for your next planting cycle based on soil NPK, pH, and weather history.
                  </p>
                  <div className="mt-auto flex items-center text-primary font-label-md text-label-md font-bold group-hover:text-secondary transition-colors">
                    View Suggestions <span class="material-symbols-outlined ml-1 text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </div>
                </div>
              </div>

              {/* Feature 3: Irrigation Planner */}
              <div 
                onClick={() => navigate('/irrigation')}
                className="group relative overflow-hidden bg-surface-container-lowest rounded-2xl border border-border-subtle shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col md:flex-row cursor-pointer"
              >
                <div className="md:w-1/3 h-48 md:h-auto relative overflow-hidden bg-surface-container-high">
                  <div 
                    className="bg-cover bg-center w-full h-full group-hover:scale-105 transition-transform duration-500 min-h-[160px]"
                    style={{ backgroundImage: `url('https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&w=600&q=80')` }}
                  />
                </div>
                <div className="p-6 md:w-2/3 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-2 bg-[#E0F2FE] text-[#0369A1] rounded-lg">
                      <span className="material-symbols-outlined">water_drop</span>
                    </div>
                    <h4 className="font-title-lg text-title-lg text-primary font-bold">Irrigation Planning</h4>
                  </div>
                  <p className="font-body-md text-body-md text-text-muted mb-4">
                    Optimize water usage with AI-generated schedules that adapt to micro-weather and soil moisture.
                  </p>
                  <div className="mt-auto flex items-center text-primary font-label-md text-label-md font-bold group-hover:text-secondary transition-colors">
                    Adjust Schedule <span class="material-symbols-outlined ml-1 text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </div>
                </div>
              </div>

              {/* Feature 4: Market Insights */}
              <div 
                onClick={() => navigate('/market')}
                className="group relative overflow-hidden bg-surface-container-lowest rounded-2xl border border-border-subtle shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col md:flex-row cursor-pointer"
              >
                <div className="md:w-1/3 h-48 md:h-auto relative overflow-hidden bg-surface-container-high">
                  <div 
                    className="bg-cover bg-center w-full h-full group-hover:scale-105 transition-transform duration-500 min-h-[160px]"
                    style={{ backgroundImage: `url('https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?auto=format&fit=crop&w=600&q=80')` }}
                  />
                </div>
                <div className="p-6 md:w-2/3 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-2 bg-tertiary-fixed text-tertiary-container rounded-lg">
                      <span className="material-symbols-outlined">trending_up</span>
                    </div>
                    <h4 className="font-title-lg text-title-lg text-primary font-bold">Market Insights</h4>
                  </div>
                  <p className="font-body-md text-body-md text-text-muted mb-4">
                    Track mandi commodity prices, predict demand surges, and time your harvest sales for profit.
                  </p>
                  <div className="mt-auto flex items-center text-primary font-label-md text-label-md font-bold group-hover:text-secondary transition-colors">
                    Explore Markets <span class="material-symbols-outlined ml-1 text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Bottom Area: Activity & Weather */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-12">
            {/* Activity Feed */}
            <div className="lg:col-span-8 bg-surface-container-lowest rounded-2xl border border-border-subtle shadow-sm p-6">
              <h3 class="font-title-lg text-title-lg text-primary mb-6 font-bold">Recent Activity</h3>
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-surface-container-low border border-border-subtle flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary-fixed text-primary-container flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[20px]">psychology</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="font-title-md text-title-md text-primary font-semibold">Field A Scan Complete</h4>
                      <span className="font-label-md text-label-md text-text-muted">10m ago</span>
                    </div>
                    <p className="font-body-md text-body-md text-text-muted">Rice Blast detected in leaf scan. Treatment advisory generated.</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-surface-container-low border border-border-subtle flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#E0F2FE] text-[#0369A1] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[20px]">water_drop</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="font-title-md text-title-md text-primary font-semibold">Irrigation Adjusted</h4>
                      <span className="font-label-md text-label-md text-text-muted">2h ago</span>
                    </div>
                    <p className="font-body-md text-body-md text-text-muted">Reduced water output by 15% due to forecasted rain tonight.</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-surface-container-low border border-border-subtle flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-tertiary-fixed text-tertiary-container flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[20px]">trending_up</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="font-title-md text-title-md text-primary font-semibold">Market Alert</h4>
                      <span className="font-label-md text-label-md text-text-muted">Yesterday</span>
                    </div>
                    <p className="font-body-md text-body-md text-text-muted">Wheat prices up +4.2% in Punjab Mandi to ₹2,450/quintal.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Weather & AI Tip Stack */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              {/* Weather Card */}
              <div className="bg-primary text-on-primary rounded-2xl p-6 shadow-md relative overflow-hidden">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-title-md text-title-md font-semibold">Microclimate Forecast</h3>
                  <span className="material-symbols-outlined text-[28px]">partly_cloudy_day</span>
                </div>
                <div className="flex items-end gap-2 mb-4">
                  <span className="font-display-lg text-4xl font-extrabold leading-none">24°</span>
                  <span className="font-body-lg text-body-lg text-primary-fixed-dim pb-1">/ 18°C</span>
                </div>
                <p className="font-body-md text-body-md text-primary-fixed mb-4">Partly cloudy with 60% rain forecast around 18:00.</p>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
                  <div>
                    <p className="font-label-md text-label-md text-primary-fixed-dim">Humidity</p>
                    <p className="font-title-md text-title-md font-semibold">68%</p>
                  </div>
                  <div>
                    <p className="font-label-md text-label-md text-primary-fixed-dim">Wind</p>
                    <p className="font-title-md text-title-md font-semibold">12 km/h NE</p>
                  </div>
                </div>
              </div>

              {/* AI Tip of the Day */}
              <div className="bg-surface-container-lowest rounded-2xl border border-border-subtle shadow-sm p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                  <span className="material-symbols-outlined text-accent-harvest">lightbulb</span>
                  <h3 className="font-title-md text-title-md text-primary font-semibold">AI Tip of the Day</h3>
                </div>
                <p className="font-body-md text-body-md text-text-muted italic flex-1">
                  "Based on current soil moisture data in Sector 2, we recommend delaying scheduled irrigation by 24h to encourage deep root growth."
                </p>
                <div className="mt-4 pt-4 border-t border-border-subtle flex justify-end">
                  <button 
                    onClick={() => navigate('/irrigation')}
                    className="font-label-md text-label-md text-secondary font-bold hover:text-primary transition-colors"
                  >
                    View Irrigation →
                  </button>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
