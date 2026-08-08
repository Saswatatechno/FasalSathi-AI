import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function TopNavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
    { path: '/disease', label: 'Disease Detection', icon: 'psychology' },
    { path: '/crop', label: 'Crop Recommendation', icon: 'psychiatry' },
    { path: '/irrigation', label: 'Irrigation Planner', icon: 'water_drop' },
    { path: '/market', label: 'Market Insights', icon: 'trending_up' },
  ];

  return (
    <>
      <header className="fixed top-0 right-0 w-full lg:w-[calc(100%-260px)] z-40 border-b border-border-subtle bg-surface/80 backdrop-blur-md flex justify-between items-center h-16 px-margin-mobile md:px-gutter">
        {/* Mobile Header & Toggle */}
        <div className="flex items-center lg:hidden gap-3">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-on-surface-variant hover:text-primary focus:outline-none"
          >
            <span className="material-symbols-outlined">{mobileMenuOpen ? 'close' : 'menu'}</span>
          </button>
          <span 
            onClick={() => navigate('/dashboard')}
            className="font-title-lg text-title-lg font-bold text-primary cursor-pointer"
          >
            FasalSathi AI
          </span>
        </div>

        {/* Search Bar (Desktop) */}
        <div className="hidden md:flex items-center max-w-md w-full focus-within:ring-2 focus-within:ring-secondary rounded-full bg-surface-container-high px-4 py-2 transition-all">
          <span className="material-symbols-outlined text-on-surface-variant mr-2">search</span>
          <input 
            className="bg-transparent border-none outline-none w-full font-body-md text-body-md text-on-surface placeholder:text-text-muted focus:ring-0 p-0" 
            placeholder="Search fields, crops, or insights..." 
            type="text"
          />
        </div>

        {/* Trailing Action Icons */}
        <div className="flex items-center gap-4 ml-auto">
          <button className="text-on-surface-variant hover:text-primary transition-colors relative p-1 rounded-full hover:bg-surface-container-high">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-1 right-1 w-2 h-2 bg-warning-amber rounded-full"></span>
          </button>
          <button className="text-on-surface-variant hover:text-primary transition-colors p-1 rounded-full hover:bg-surface-container-high">
            <span className="material-symbols-outlined">account_circle</span>
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-16 z-50 lg:hidden bg-background/95 backdrop-blur-md flex flex-col p-6 space-y-4 border-b border-border-subtle shadow-xl">
          <nav className="space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-xl transition-all ${
                    isActive
                      ? 'bg-primary text-on-primary font-bold shadow-md'
                      : 'text-on-surface-variant hover:bg-surface-container-high'
                  }`}
                >
                  <span className="material-symbols-outlined">{item.icon}</span>
                  <span className="font-body-md text-body-md">{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="pt-4 border-t border-border-subtle">
            <button 
              onClick={() => {
                navigate('/');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-danger-muted font-medium"
            >
              <span className="material-symbols-outlined">logout</span>
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
