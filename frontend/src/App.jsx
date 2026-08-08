import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SplashPage from './pages/SplashPage';
import DashboardPage from './pages/DashboardPage';
import DiseaseDetectionPage from './pages/DiseaseDetectionPage';
import CropRecommendationPage from './pages/CropRecommendationPage';
import IrrigationPlannerPage from './pages/IrrigationPlannerPage';
import MarketInsightsPage from './pages/MarketInsightsPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/disease" element={<DiseaseDetectionPage />} />
        <Route path="/crop" element={<CropRecommendationPage />} />
        <Route path="/irrigation" element={<IrrigationPlannerPage />} />
        <Route path="/market" element={<MarketInsightsPage />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}
