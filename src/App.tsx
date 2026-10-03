import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/layout/Sidebar';
import { TopBar } from './components/layout/TopBar';
import { MobileNav } from './components/layout/MobileNav';
import { NotificationsDrawer } from './components/notifications/NotificationsDrawer';

import { LandingPageView } from './components/landing/LandingPageView';
import { DashboardView } from './components/dashboard/DashboardView';
import { CropRecommendationView } from './components/crops/CropRecommendationView';
import { DiseaseDetectionView } from './components/disease/DiseaseDetectionView';
import { MarketPricesView } from './components/market/MarketPricesView';
import { PricePredictionView } from './components/market/PricePredictionView';
import { MarketComparisonView } from './components/market/MarketComparisonView';
import { YieldPredictionView } from './components/yield/YieldPredictionView';
import { IrrigationView } from './components/irrigation/IrrigationView';
import { FarmCalendarView } from './components/calendar/FarmCalendarView';
import { FarmOperationsView } from './components/operations/FarmOperationsView';
import { CropSpacingView } from './components/operations/CropSpacingView';
import { FarmProfileView } from './components/profile/FarmProfileView';
import { GoogleDriveView } from './components/drive/GoogleDriveView';
import { SettingsView } from './components/settings/SettingsView';

const MainLayout: React.FC = () => {
  const { activeTab, toasts } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const renderActiveView = () => {
    switch (activeTab) {
      case 'landing':
        return <LandingPageView />;
      case 'dashboard':
        return <DashboardView />;
      case 'crop-recommendation':
        return <CropRecommendationView />;
      case 'disease-detection':
        return <DiseaseDetectionView />;
      case 'market-prices':
        return <MarketPricesView />;
      case 'price-prediction':
        return <PricePredictionView />;
      case 'market-comparison':
        return <MarketComparisonView />;
      case 'yield-prediction':
        return <YieldPredictionView />;
      case 'irrigation':
        return <IrrigationView />;
      case 'farm-calendar':
        return <FarmCalendarView />;
      case 'farm-operations':
        return <FarmOperationsView />;
      case 'crop-spacing':
        return <CropSpacingView />;
      case 'farm-profile':
        return <FarmProfileView />;
      case 'google-drive':
        return <GoogleDriveView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen flex bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 font-sans">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar onOpenMobileMenu={() => setMobileMenuOpen(true)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {renderActiveView()}
        </main>
      </div>

      {/* Mobile Drawer & Bottom Bar */}
      <MobileNav 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)} 
      />

      {/* Notifications Slide-over */}
      <NotificationsDrawer />

      {/* Toast Notifications */}
      <div className="fixed bottom-16 sm:bottom-6 right-4 sm:right-6 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto px-4 py-2.5 rounded-xl shadow-lg text-xs font-medium border flex items-center gap-2 animate-in slide-in-from-bottom-2 duration-200 ${
              toast.type === 'success'
                ? 'bg-emerald-800 text-white border-emerald-700'
                : toast.type === 'warning'
                ? 'bg-amber-800 text-white border-amber-700'
                : 'bg-neutral-900 dark:bg-neutral-800 text-white border-neutral-700'
            }`}
          >
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
