import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SplashPage() {
  const navigate = useNavigate();
  const [statusText, setStatusText] = useState('Please wait...');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStatusText('Ready');
      setIsReady(true);
    }, 2500);

    const redirectTimer = setTimeout(() => {
      navigate('/dashboard');
    }, 3200);

    return () => {
      clearTimeout(timer);
      clearTimeout(redirectTimer);
    };
  }, [navigate]);

  return (
    <div className="h-screen w-screen overflow-hidden relative font-sans antialiased flex flex-col justify-between bg-background text-on-background">
      {/* Background Image with Blur Overlay */}
      <div className="absolute inset-0 w-full h-full z-0">
        <div 
          className="w-full h-full bg-cover bg-center absolute inset-0"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2000&q=80')`
          }}
        />
        <div className="absolute inset-0 bg-background/85 backdrop-blur-md" />
      </div>

      {/* Main Content Area */}
      <main className="relative z-10 flex flex-col items-center justify-center flex-grow w-full max-w-max-width mx-auto px-margin-mobile md:px-margin-desktop">
        {/* Logo & Icon */}
        <div className="flex flex-col items-center text-center space-y-6 fade-in-up delay-100">
          <div className="w-32 h-32 md:w-40 md:h-40 flex items-center justify-center mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-full h-full">
              <defs>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
              
              {/* Outer Ring with pulse */}
              <circle cx="50" cy="50" r="45" fill="none" stroke="#1b4332" strokeWidth="2" opacity="0.2">
                <animate attributeName="r" values="45;48;45" dur="3s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.2;0.4;0.2" dur="3s" repeatCount="indefinite" />
              </circle>

              {/* Main Logo Container */}
              <g transform-origin="50 50">
                <circle cx="50" cy="50" r="35" fill="#ffffff" className="drop-shadow-lg" />
                
                {/* Leaf Icon with breathing scale */}
                <path 
                  d="M50 30 C65 30 75 45 75 60 C75 75 60 75 50 75 C40 75 25 75 25 60 C25 45 35 30 50 30 Z M50 35 C50 35 40 45 40 60 C40 68 45 70 50 70 C55 70 60 68 60 60 C60 45 50 35 50 35 Z" 
                  fill="#1b4332"
                >
                  <animateTransform attributeName="transform" type="scale" values="1;1.05;1" dur="3s" repeatCount="indefinite" additive="sum" />
                </path>

                {/* Center vein line */}
                <path d="M50 40 L50 70" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.8">
                  <animate attributeName="stroke-dasharray" values="0,100; 30,100; 0,100" dur="3s" repeatCount="indefinite" />
                </path>
              </g>
            </svg>
          </div>

          <h1 className="font-headline-lg text-4xl md:text-5xl font-extrabold text-primary tracking-tight">
            FasalSathi AI
          </h1>
          <p className="font-title-lg text-lg md:text-xl text-on-surface-variant max-w-md fade-in-up delay-200">
            Your Intelligent Farming Companion
          </p>
        </div>
      </main>

      {/* Bottom Loading Bar Area */}
      <footer className="relative z-10 w-full pb-12 px-margin-mobile md:px-margin-desktop fade-in-up delay-300 max-w-md mx-auto">
        <div className="flex flex-col space-y-3">
          <div className="flex justify-between items-center text-on-surface-variant">
            <span className="font-label-md text-label-md">Initializing Systems</span>
            <span className={`font-label-md text-label-md ${isReady ? 'text-success-natural font-bold' : 'animate-pulse'}`}>
              {statusText}
            </span>
          </div>

          {/* Loading Track */}
          <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden shadow-inner">
            <div className="h-full bg-success-natural rounded-full loading-bar relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
            </div>
          </div>

          <button 
            onClick={() => navigate('/dashboard')}
            className="text-xs text-text-muted hover:text-primary text-center pt-2 underline transition-colors"
          >
            Skip to Dashboard →
          </button>
        </div>
      </footer>
    </div>
  );
}
