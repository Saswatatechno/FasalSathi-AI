import React, { useCallback, useEffect, useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import TopNavBar from '../components/layout/TopNavBar';
import { getMarketPrices } from '../services/marketService';

const CROPS = [
  ['wheat', 'Wheat'],
  ['rice', 'Rice'],
  ['cotton', 'Cotton'],
  ['sugarcane', 'Sugarcane'],
  ['tomato', 'Tomato'],
];

export default function MarketInsightsPage() {
  const [selectedCrop, setSelectedCrop] = useState('tomato');
  const [location, setLocation] = useState('');
  const [apiData, setApiData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchData = useCallback(async (crop = selectedCrop, selectedLocation = location) => {
    setIsLoading(true);
    setError('');
    try {
      const data = await getMarketPrices(crop, selectedLocation);
      setApiData(data);
    } catch (err) {
      setApiData(null);
      setError(err.message || 'Unable to fetch market prices.');
    } finally {
      setIsLoading(false);
    }
  }, [location, selectedCrop]);

  useEffect(() => {
    fetchData('tomato', '');
  }, []);

  const best = apiData?.best_market;
  const markets = apiData?.markets || [];

  return (
    <div className="bg-bg-warm text-on-background min-h-screen flex font-sans antialiased">
      <Sidebar />
      <main className="flex-1 flex flex-col h-full lg:ml-[260px] w-full relative">
        <TopNavBar />
        <div className="flex-1 overflow-y-auto pt-24 pb-24 lg:pb-12 px-margin-mobile lg:px-margin-desktop">
          <div className="max-w-max-width mx-auto space-y-8">
            <div>
              <h2 className="font-headline-lg text-2xl lg:text-3xl font-bold text-primary">Market Price Comparison</h2>
              <p className="font-body-lg text-text-muted mt-1">Compare current mandi prices and find the highest available modal price.</p>
            </div>

            <section className="bg-surface-container-lowest rounded-xl p-5 lg:p-6 border border-border-subtle shadow-sm">
              <div className="flex flex-col lg:flex-row lg:items-end gap-4">
                <div className="flex-1">
                  <label className="block font-label-md text-text-muted mb-2">Crop</label>
                  <select value={selectedCrop} onChange={(e) => setSelectedCrop(e.target.value)} className="w-full bg-surface border border-border-subtle rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-fixed">
                    {CROPS.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block font-label-md text-text-muted mb-2">Location (optional)</label>
                  <input value={location} onChange={(e) => setLocation(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && fetchData()} placeholder="State, district or market" className="w-full bg-surface border border-border-subtle rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-fixed" />
                </div>
                <button onClick={() => fetchData()} disabled={isLoading} className="bg-primary text-on-primary px-6 py-3 rounded-lg flex items-center justify-center gap-2 font-title-md hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed">
                  <span className="material-symbols-outlined text-sm">search</span>{isLoading ? 'Fetching...' : 'Get Prices'}
                </button>
              </div>
            </section>

            {isLoading && <div className="bg-surface-container-lowest rounded-xl p-8 border border-border-subtle text-center"><span className="material-symbols-outlined animate-spin text-primary text-3xl">progress_activity</span><p className="mt-3 text-text-muted">Fetching market prices...</p></div>}

            {error && !isLoading && <div className="p-5 rounded-xl border border-error/30 bg-error-container/30 text-on-error-container"><div className="flex gap-3 items-start"><span className="material-symbols-outlined">error</span><div><p className="font-bold">Unable to fetch market prices</p><p className="text-sm mt-1">{error}</p></div></div></div>}

            {!isLoading && !error && apiData && best && (
              <section className="p-6 bg-secondary-container/30 border border-secondary/40 rounded-xl">
                <div className="flex flex-col md:flex-row justify-between gap-5 md:items-center">
                  <div><span className="font-label-md text-text-muted uppercase tracking-wider block">Best Available Price</span><h3 className="font-title-lg text-xl font-bold text-secondary mt-1">{best.market}</h3><p className="text-text-muted mt-1">{best.location}</p></div>
                  <div className="bg-primary text-white px-5 py-3 rounded-lg text-right"><div className="text-2xl font-extrabold">₹{best.price.toLocaleString('en-IN')}</div><div className="text-sm opacity-90">per {best.unit}</div></div>
                </div>
              </section>
            )}

            {!isLoading && !error && apiData && markets.length === 0 && <div className="bg-surface-container-lowest rounded-xl p-8 border border-border-subtle text-center"><span className="material-symbols-outlined text-4xl text-text-muted">search_off</span><p className="font-bold mt-3">No market price data is currently available.</p><p className="text-sm text-text-muted mt-1">Try another crop or remove the location filter.</p></div>}

            {!isLoading && !error && markets.length > 0 && (
              <section className="bg-surface-container-lowest rounded-xl border border-border-subtle shadow-sm overflow-hidden">
                <div className="p-6 border-b border-border-subtle flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 bg-bg-warm">
                  <div><h3 className="font-title-lg text-xl text-primary font-bold">Market Prices</h3><p className="text-sm text-text-muted mt-1">{markets.length} market{markets.length === 1 ? '' : 's'} available</p></div>
                  <span className="text-sm text-text-muted">Source: {apiData.source}</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead><tr className="bg-surface-container-low text-on-surface-variant text-xs uppercase tracking-wider border-b border-border-subtle"><th className="px-6 py-4">Market</th><th className="px-6 py-4">Location</th><th className="px-6 py-4 text-right">Min</th><th className="px-6 py-4 text-right">Max</th><th className="px-6 py-4 text-right">Modal Price</th><th className="px-6 py-4">Arrival Date</th><th className="px-6 py-4">Variety / Grade</th></tr></thead>
                    <tbody className="text-sm divide-y divide-border-subtle">
                      {markets.map((market, index) => {
                        const isBest = best?.market === market.market && best?.location === market.location && best?.price === market.price;
                        return <tr key={`${market.market}-${market.location}-${index}`} className={isBest ? 'bg-secondary-container/20' : 'hover:bg-surface-container-low transition-colors'}>
                          <td className="px-6 py-4 font-semibold"><div className="flex items-center gap-2">{isBest && <span className="material-symbols-outlined text-secondary text-lg">emoji_events</span>}{market.market}</div></td>
                          <td className="px-6 py-4 text-text-muted">{market.location}</td>
                          <td className="px-6 py-4 text-right">₹{market.min_price?.toLocaleString('en-IN') ?? '—'}</td>
                          <td className="px-6 py-4 text-right">₹{market.max_price?.toLocaleString('en-IN') ?? '—'}</td>
                          <td className="px-6 py-4 text-right font-bold text-primary">₹{market.price.toLocaleString('en-IN')} / {market.unit}</td>
                          <td className="px-6 py-4 text-text-muted">{market.arrival_date || '—'}</td>
                          <td className="px-6 py-4 text-text-muted">{market.variety || '—'}{market.grade ? ` / ${market.grade}` : ''}</td>
                        </tr>;
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="px-6 py-4 border-t border-border-subtle bg-surface-container-low text-xs text-text-muted">Prices shown are modal mandi prices reported by {apiData.source}. Market data is time-sensitive; check the arrival date before making selling decisions.</div>
              </section>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
