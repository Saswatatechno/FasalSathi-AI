import React, { useState, useEffect } from 'react';
import Sidebar from '../components/layout/Sidebar';
import TopNavBar from '../components/layout/TopNavBar';
import { getMarketPrices } from '../services/marketService';

export default function MarketInsightsPage() {
  const [selectedCrop, setSelectedCrop] = useState('wheat');
  const [selectedMandi, setSelectedMandi] = useState('Punjab Mandi');
  const [timeframe, setTimeframe] = useState('1M');
  const [apiData, setApiData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData(selectedCrop);
  }, [selectedCrop]);

  const fetchData = async (crop) => {
    setIsLoading(true);
    try {
      const data = await getMarketPrices(crop);
      setApiData(data);
    } catch (err) {
      console.error('Failed to load market prices:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-bg-warm text-on-background min-h-screen flex font-sans antialiased">
      <Sidebar />

      <main className="flex-1 flex flex-col h-full lg:ml-[260px] w-full relative">
        <TopNavBar />

        {/* Scrollable Page Content */}
        <div className="flex-1 overflow-y-auto pt-24 pb-24 lg:pb-12 px-margin-mobile lg:px-margin-desktop">
          <div className="max-w-max-width mx-auto space-y-8">
            {/* Page Header & Filters */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h2 className="font-headline-lg text-2xl lg:text-3xl font-bold text-primary">
                  Market Insights
                </h2>
                <p className="font-body-lg text-body-lg text-text-muted mt-1">
                  Real-time commodity pricing and trend analysis.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <select 
                  value={selectedCrop}
                  onChange={(e) => setSelectedCrop(e.target.value)}
                  className="bg-surface border border-border-subtle rounded-lg px-4 py-2.5 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary-fixed min-w-[150px] shadow-sm"
                >
                  <option value="wheat">Wheat (Sona)</option>
                  <option value="rice">Rice (Basmati)</option>
                  <option value="cotton">Cotton</option>
                  <option value="sugarcane">Sugarcane</option>
                  <option value="tomato">Tomato</option>
                </select>

                <select 
                  value={selectedMandi}
                  onChange={(e) => setSelectedMandi(e.target.value)}
                  className="bg-surface border border-border-subtle rounded-lg px-4 py-2.5 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary-fixed min-w-[150px] shadow-sm"
                >
                  <option value="Punjab Mandi">Punjab Mandi</option>
                  <option value="Haryana Central">Haryana Central</option>
                  <option value="National Average">National Average</option>
                </select>

                <button 
                  onClick={() => fetchData(selectedCrop)}
                  className="bg-primary-container text-on-primary px-4 py-2.5 rounded-lg flex items-center gap-2 font-title-md hover:bg-primary transition-colors shadow-sm"
                >
                  <span className="material-symbols-outlined text-sm">refresh</span>
                  Refresh
                </button>
              </div>
            </div>

            {/* API Best Market Callout Banner */}
            {apiData?.best_market && (
              <div className="p-4 bg-secondary-container/30 border border-secondary/40 rounded-xl text-primary flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                <div>
                  <span className="font-label-md text-text-muted uppercase tracking-wider block">AI Optimal Mandi Recommendation</span>
                  <span className="font-title-lg font-bold text-secondary">
                    {apiData.best_market.market_name} ({apiData.best_market.location})
                  </span>
                  <span className="text-sm text-text-muted ml-2">
                    — Distance: {apiData.best_market.distance_km} km
                  </span>
                </div>
                <div className="bg-primary text-white px-4 py-2 rounded-lg font-bold">
                  ₹{(apiData.best_market.price_per_kg * 100).toLocaleString()}/quintal (₹{apiData.best_market.price_per_kg}/kg)
                </div>
              </div>
            )}

            {/* KPI Cards (4 grid items) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Current Price */}
              <div className="bg-surface-container-lowest rounded-xl p-6 border border-border-subtle shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-title-md text-title-md text-on-surface-variant font-semibold">Current Price</h3>
                  <div className="p-2 bg-primary-fixed rounded-lg text-primary">
                    <span className="material-symbols-outlined">payments</span>
                  </div>
                </div>
                <div className="flex items-end gap-3">
                  <span className="font-headline-lg text-3xl font-extrabold text-primary">₹2,450</span>
                  <span className="font-body-md text-body-md text-text-muted mb-1">/ quintal</span>
                </div>
                <div className="mt-4 flex items-center gap-2 text-success-natural font-label-md text-label-md bg-secondary-fixed-dim/20 w-fit px-2 py-1 rounded font-bold">
                  <span className="material-symbols-outlined text-[16px]">arrow_upward</span>
                  <span>+4.2% vs last week</span>
                </div>
              </div>

              {/* Market Trend */}
              <div className="bg-surface-container-lowest rounded-xl p-6 border border-border-subtle shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-title-md text-title-md text-on-surface-variant font-semibold">Market Trend</h3>
                  <div className="p-2 bg-secondary-container rounded-lg text-on-secondary-container">
                    <span className="material-symbols-outlined">monitoring</span>
                  </div>
                </div>
                <div className="flex flex-col justify-end">
                  <span className="font-headline-md text-2xl text-on-surface font-extrabold">Bullish</span>
                  <div className="w-full bg-surface-variant rounded-full h-2 mt-4 overflow-hidden">
                    <div className="bg-success-natural h-2 rounded-full" style={{ width: '75%' }} />
                  </div>
                  <span className="font-label-md text-label-md text-text-muted mt-2 text-right">75% Confidence</span>
                </div>
              </div>

              {/* 52W High */}
              <div className="bg-surface-container-lowest rounded-xl p-6 border border-border-subtle shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-title-md text-title-md text-on-surface-variant font-semibold">52W High</h3>
                  <div className="p-2 bg-surface-container-high rounded-lg text-on-surface">
                    <span className="material-symbols-outlined">vertical_align_top</span>
                  </div>
                </div>
                <div className="flex items-end gap-3">
                  <span className="font-headline-lg text-3xl font-extrabold text-on-surface">₹2,800</span>
                </div>
                <p className="font-body-md text-body-md text-text-muted mt-4">Recorded on Oct 12, 2025</p>
              </div>

              {/* 52W Low */}
              <div className="bg-surface-container-lowest rounded-xl p-6 border border-border-subtle shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-title-md text-title-md text-on-surface-variant font-semibold">52W Low</h3>
                  <div className="p-2 bg-surface-container-high rounded-lg text-on-surface">
                    <span className="material-symbols-outlined">vertical_align_bottom</span>
                  </div>
                </div>
                <div className="flex items-end gap-3">
                  <span className="font-headline-lg text-3xl font-extrabold text-on-surface">₹2,100</span>
                </div>
                <p className="font-body-md text-body-md text-text-muted mt-4">Recorded on Apr 04, 2025</p>
              </div>
            </div>

            {/* Main Chart Area */}
            <div className="bg-surface-container-lowest rounded-xl p-6 border border-border-subtle shadow-sm">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h3 className="font-title-lg text-title-lg text-primary font-bold">
                  Price Movement ({selectedCrop.toUpperCase()})
                </h3>
                <div className="flex bg-surface-container-high rounded-lg p-1">
                  {['1W', '1M', '3M', '1Y'].map((tf) => (
                    <button
                      key={tf}
                      onClick={() => setTimeframe(tf)}
                      className={`px-4 py-1.5 rounded-md font-label-md text-label-md transition-colors ${
                        timeframe === tf
                          ? 'bg-surface shadow-sm text-primary font-bold'
                          : 'text-on-surface-variant hover:bg-surface-container'
                      }`}
                    >
                      {tf}
                    </button>
                  ))}
                </div>
              </div>

              {/* Visual Price Trend Graphic */}
              <div className="w-full h-64 bg-surface-container-low rounded-xl p-4 flex flex-col justify-between border border-border-subtle relative overflow-hidden">
                <div className="flex justify-between text-xs text-text-muted">
                  <span>₹2,600</span>
                  <span className="bg-secondary-container/40 text-secondary px-2 py-0.5 rounded font-bold">Peak Trend</span>
                </div>
                
                {/* SVG Curve */}
                <div className="w-full h-36 my-2 relative">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 500 120" preserveAspectRatio="none">
                    <path 
                      d="M 0,90 Q 70,110 140,70 T 280,40 T 420,30 T 500,10" 
                      fill="none" 
                      stroke="#1B4332" 
                      strokeWidth="4" 
                    />
                    <path 
                      d="M 0,90 Q 70,110 140,70 T 280,40 T 420,30 T 500,10 L 500,120 L 0,120 Z" 
                      fill="url(#greenGradient)" 
                      opacity="0.15" 
                    />
                    <defs>
                      <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#1B4332" />
                        <stop offset="100%" stopColor="#ffffff" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                <div className="flex justify-between text-xs text-text-muted pt-2 border-t border-border-subtle">
                  <span>Week 1</span>
                  <span>Week 2</span>
                  <span>Week 3</span>
                  <span>Week 4</span>
                  <span>Week 5</span>
                  <span>Week 6</span>
                  <span>Week 7</span>
                  <span>Week 8</span>
                </div>
              </div>
            </div>

            {/* Recent Market Activity Table */}
            <div className="bg-surface-container-lowest rounded-xl border border-border-subtle shadow-sm overflow-hidden mb-8">
              <div className="p-6 border-b border-border-subtle flex justify-between items-center bg-bg-warm">
                <h3 className="font-title-lg text-title-lg text-primary font-bold">Recent Market Activity</h3>
                <span className="text-sm text-text-muted">Updated today</span>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-container-low text-on-surface-variant font-label-md text-label-md uppercase tracking-wider border-b border-border-subtle">
                      <th className="px-6 py-4 font-semibold">Market / Mandi</th>
                      <th className="px-6 py-4 font-semibold">Commodity</th>
                      <th className="px-6 py-4 font-semibold">Arrival Date</th>
                      <th className="px-6 py-4 font-semibold text-right">Min Price (₹)</th>
                      <th className="px-6 py-4 font-semibold text-right">Max Price (₹)</th>
                      <th className="px-6 py-4 font-semibold text-right">Modal Price (₹)</th>
                      <th className="px-6 py-4 font-semibold text-center">Trend</th>
                    </tr>
                  </thead>
                  <tbody className="font-body-md text-body-md text-on-surface divide-y divide-border-subtle">
                    {/* Real API Markets if loaded */}
                    {apiData?.markets?.map((m, idx) => (
                      <tr key={idx} className="hover:bg-surface-container-low transition-colors">
                        <td className="px-6 py-4 font-medium">{m.market_name}, {m.location}</td>
                        <td className="px-6 py-4 capitalize">{apiData.crop}</td>
                        <td className="px-6 py-4 text-text-muted">Today</td>
                        <td className="px-6 py-4 text-right">₹{(m.price_per_kg * 95).toFixed(0)}</td>
                        <td className="px-6 py-4 text-right">₹{(m.price_per_kg * 105).toFixed(0)}</td>
                        <td className="px-6 py-4 text-right font-bold text-primary">₹{(m.price_per_kg * 100).toFixed(0)}</td>
                        <td className="px-6 py-4 text-center">
                          <span className="inline-flex items-center justify-center px-2 py-1 rounded bg-secondary-fixed-dim/20 text-success-natural">
                            <span className="material-symbols-outlined text-[16px]">trending_up</span>
                          </span>
                        </td>
                      </tr>
                    ))}

                    {/* Static Mandi Rows */}
                    <tr className="hover:bg-surface-container-low transition-colors">
                      <td className="px-6 py-4 font-medium">Ludhiana, Punjab</td>
                      <td className="px-6 py-4 capitalize">{selectedCrop}</td>
                      <td className="px-6 py-4 text-text-muted">Today, 08:30 AM</td>
                      <td className="px-6 py-4 text-right">2,400</td>
                      <td className="px-6 py-4 text-right">2,510</td>
                      <td className="px-6 py-4 text-right font-bold">2,450</td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center justify-center px-2 py-1 rounded bg-secondary-fixed-dim/20 text-success-natural">
                          <span className="material-symbols-outlined text-[16px]">trending_up</span>
                        </span>
                      </td>
                    </tr>

                    <tr className="hover:bg-surface-container-low transition-colors bg-surface/50">
                      <td className="px-6 py-4 font-medium">Amritsar, Punjab</td>
                      <td className="px-6 py-4 capitalize">{selectedCrop}</td>
                      <td className="px-6 py-4 text-text-muted">Today, 07:45 AM</td>
                      <td className="px-6 py-4 text-right">2,380</td>
                      <td className="px-6 py-4 text-right">2,490</td>
                      <td className="px-6 py-4 text-right font-bold">2,430</td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center justify-center px-2 py-1 rounded bg-secondary-fixed-dim/20 text-success-natural">
                          <span className="material-symbols-outlined text-[16px]">trending_up</span>
                        </span>
                      </td>
                    </tr>

                    <tr className="hover:bg-surface-container-low transition-colors">
                      <td className="px-6 py-4 font-medium">Karnal, Haryana</td>
                      <td className="px-6 py-4 capitalize">{selectedCrop}</td>
                      <td className="px-6 py-4 text-text-muted">Yesterday</td>
                      <td className="px-6 py-4 text-right">2,410</td>
                      <td className="px-6 py-4 text-right">2,520</td>
                      <td className="px-6 py-4 text-right font-bold">2,460</td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center justify-center px-2 py-1 rounded bg-error-container/50 text-error">
                          <span className="material-symbols-outlined text-[16px]">trending_down</span>
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
