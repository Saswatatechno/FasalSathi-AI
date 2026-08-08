import React, { useEffect, useState } from 'react';
import { Sprout, ShieldAlert, Droplets, Store, Activity, ArrowRight, CheckCircle2 } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

export default function Dashboard({ setActiveTab }) {
  const [healthStatus, setHealthStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/health`)
      .then((res) => res.json())
      .then((data) => {
        setHealthStatus(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Health check failed:', err);
        setHealthStatus({ status: 'offline', error: err.message });
        setLoading(false);
      });
  }, []);

  const modules = [
    {
      id: 'disease',
      title: 'Crop Disease Detection',
      description: 'Upload crop images to diagnose diseases, pests, and get instant advisory.',
      icon: ShieldAlert,
      color: 'from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-400',
    },
    {
      id: 'crop',
      title: 'Crop Recommendation',
      description: 'Input soil nutrients (N, P, K, pH) and weather conditions for optimal crop selection.',
      icon: Sprout,
      color: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-400',
    },
    {
      id: 'irrigation',
      title: 'Irrigation & Fertilizer Advisory',
      description: 'Optimize water schedule and fertilizer usage tailored to crop stage and soil moisture.',
      icon: Droplets,
      color: 'from-blue-500/20 to-cyan-500/10 border-blue-500/30 text-blue-400',
    },
    {
      id: 'market',
      title: 'Market Prices',
      description: 'Compare Mandi prices for produce across regional markets to maximize yield profit.',
      icon: Store,
      color: 'from-purple-500/20 to-indigo-500/10 border-purple-500/30 text-purple-400',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-800 via-slate-800 to-slate-900 border border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-3">
              <span>🌾 Hackathon MVP Scaffolding</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white">
              Welcome to FasalSathi AI
            </h2>
            <p className="text-slate-400 mt-2 max-w-2xl text-sm sm:text-base">
              Smart agricultural advisory system designed to empower smallholder farmers with modular AI services, resource management, and market intelligence.
            </p>
          </div>

          {/* Backend Status Card */}
          <div className="bg-slate-900/80 border border-slate-700/60 rounded-xl p-4 min-w-[220px]">
            <div className="flex items-center space-x-2 text-slate-400 text-xs font-medium mb-1">
              <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>Backend API Status</span>
            </div>
            {loading ? (
              <p className="text-sm text-slate-400">Checking API...</p>
            ) : healthStatus?.status === 'healthy' ? (
              <div className="flex items-center space-x-2 text-emerald-400 font-semibold text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Operational</span>
              </div>
            ) : (
              <p className="text-sm text-rose-400 font-semibold">Offline / Error</p>
            )}
            <p className="text-xs text-slate-500 mt-1">
              {healthStatus?.project || 'FasalSathi API'}
            </p>
          </div>
        </div>
      </div>

      {/* Feature Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {modules.map((mod) => {
          const Icon = mod.icon;
          return (
            <div
              key={mod.id}
              onClick={() => setActiveTab(mod.id)}
              className={`bg-slate-800/60 hover:bg-slate-800 border rounded-2xl p-6 transition-all cursor-pointer group shadow-lg hover:shadow-xl bg-gradient-to-br ${mod.color}`}
            >
              <div className="flex items-start justify-between">
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-700">
                  <Icon className="w-7 h-7" />
                </div>
                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </div>
              <h3 className="text-xl font-bold text-white mt-4 group-hover:text-emerald-300 transition-colors">
                {mod.title}
              </h3>
              <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                {mod.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
