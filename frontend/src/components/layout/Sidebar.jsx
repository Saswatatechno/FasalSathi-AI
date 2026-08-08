import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
    { path: '/disease', label: 'Disease Detection', icon: 'psychology' },
    { path: '/crop', label: 'Crop Recommendation', icon: 'psychiatry' },
    { path: '/irrigation', label: 'Irrigation Planner', icon: 'water_drop' },
    { path: '/market', label: 'Market Insights', icon: 'trending_up' },
  ];

  return (
    <aside className="h-screen w-sidebar-width fixed left-0 top-0 hidden lg:flex flex-col border-r border-border-subtle bg-surface z-50">
      <div className="flex flex-col h-full py-8">
        {/* Brand Header */}
        <div 
          className="px-6 mb-8 flex items-center gap-3 cursor-pointer"
          onClick={() => navigate('/dashboard')}
        >
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-on-primary shadow-sm">
            <span className="material-symbols-outlined icon-fill">eco</span>
          </div>
          <div>
            <h1 className="font-headline-md text-headline-md font-bold text-primary">FasalSathi AI</h1>
            <p className="font-label-md text-label-md text-on-surface-variant">Premium Smart Farming</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto hide-scrollbar">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-200 rounded-lg ${
                  isActive
                    ? 'text-primary font-bold border-l-4 border-primary bg-secondary-container/20 shadow-sm'
                    : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-high'
                }`}
              >
                <span 
                  className="material-symbols-outlined"
                  style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
                >
                  {item.icon}
                </span>
                <span className="font-body-md text-body-md">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Footer Area */}
        <div className="px-6 mt-auto flex flex-col gap-4">
          <button className="w-full py-3 bg-primary text-on-primary rounded-xl font-title-md text-title-md hover:shadow-md hover:-translate-y-0.5 transition-all">
            Upgrade to Pro
          </button>
          <div className="space-y-1 border-t border-border-subtle pt-3">
            <button 
              onClick={() => navigate('/dashboard')}
              className="w-full flex items-center gap-3 px-4 py-2 text-on-surface-variant hover:text-primary transition-colors rounded-lg text-left"
            >
              <span className="material-symbols-outlined text-[20px]">help</span>
              <span className="font-body-md text-body-md">Help Center</span>
            </button>
            <button 
              onClick={() => navigate('/')}
              className="w-full flex items-center gap-3 px-4 py-2 text-danger-muted hover:bg-surface-container-high transition-all duration-200 rounded-lg text-left"
            >
              <span className="material-symbols-outlined text-[20px]">logout</span>
              <span className="font-body-md text-body-md">Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
