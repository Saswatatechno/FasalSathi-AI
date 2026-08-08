import React, { useState, useEffect } from 'react';
import { Store, Search, TrendingUp, AlertCircle, MapPin } from 'lucide-react';
import { getMarketPrices } from '../services/marketAPI';

export default function MarketPrices() {
  const [cropQuery, setCropQuery] = useState('tomato');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const fetchPrices = async (crop) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getMarketPrices(crop);
      setResult(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch market prices.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrices('tomato');
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (cropQuery.trim()) {
      fetchPrices(cropQuery.trim());
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3 pb-4 border-b border-slate-700">
        <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded-xl text-purple-400">
          <Store className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Market Price Comparison</h2>
          <p className="text-slate-400 text-sm">
            Search produce prices across regional Mandis to discover optimal selling locations.
          </p>
        </div>
      </div>

      {/* Search Input Bar */}
      <form onSubmit={handleSearch} className="flex gap-3">
        <div className="relative flex-1">
          <Search className="w-5 h-5 absolute left-3 top-3.5 text-slate-400" />
          <input
            type="text"
            value={cropQuery}
            onChange={(e) => setCropQuery(e.target.value)}
            placeholder="Search crop (e.g. tomato, wheat, rice)..."
            className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-purple-500 text-sm shadow-inner"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-xl shadow-lg transition-all"
        >
          {loading ? 'Searching...' : 'Compare Prices'}
        </button>
      </form>

      {/* Error display */}
      {error && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300 text-sm flex items-center space-x-2">
          <AlertCircle className="w-5 h-5 shrink-0 text-rose-400" />
          <span>{error}</span>
        </div>
      )}

      {/* Results Container */}
      {result && (
        <div className="space-y-6">
          {/* Best Market Highlight Card */}
          <div className="bg-gradient-to-r from-purple-900/40 to-slate-800 border border-purple-500/40 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center space-x-2 text-purple-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <TrendingUp className="w-4 h-4" />
              <span>Optimal Market Recommendation</span>
            </div>
            {result.best_market ? (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
                <div>
                  <h3 className="text-xl font-bold text-white">{result.best_market.market_name}</h3>
                  <div className="flex items-center space-x-2 text-slate-400 text-xs mt-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{result.best_market.location} • {result.best_market.distance_km} km away</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-black text-emerald-400">
                    ₹{result.best_market.price_per_kg} <span className="text-xs font-normal text-slate-400">/ kg</span>
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-slate-400 mt-1">
                No active market data integrated yet for <span className="text-white font-semibold">{result.crop}</span>.
              </p>
            )}
          </div>

          {/* All Markets Table */}
          <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-white mb-4">Mandi Price Directory ({result.crop})</h3>

            {result.markets.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-300">
                  <thead className="bg-slate-900/60 text-xs uppercase text-slate-400 border-b border-slate-700">
                    <tr>
                      <th className="py-3 px-4">Market / Mandi</th>
                      <th className="py-3 px-4">Location</th>
                      <th className="py-3 px-4">Distance</th>
                      <th className="py-3 px-4 text-right">Price per kg</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/60">
                    {result.markets.map((m, idx) => (
                      <tr key={idx} className="hover:bg-slate-700/40">
                        <td className="py-3 px-4 font-semibold text-white">{m.market_name}</td>
                        <td className="py-3 px-4">{m.location}</td>
                        <td className="py-3 px-4">{m.distance_km} km</td>
                        <td className="py-3 px-4 text-right font-bold text-emerald-400">₹{m.price_per_kg}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 text-slate-500 text-sm">
                No pricing records returned from market service.
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-slate-700/60 text-xs text-slate-500">
              Endpoint: <code className="text-purple-400 font-mono">GET /api/market/prices?crop={result.crop}</code>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
