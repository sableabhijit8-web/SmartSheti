import React from 'react';
import { 
  Sprout, 
  Leaf, 
  Bug, 
  Store, 
  MoreHorizontal, 
  X, 
  TrendingUp, 
  BarChart3, 
  Scale, 
  Droplets, 
  Calendar, 
  Tractor, 
  User, 
  Settings,
  Bell,
  HardDrive,
  Sparkles,
  Ruler
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ActiveTab } from '../../types';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  const { activeTab, setActiveTab, t, unreadCount, setIsNotificationsOpen } = useApp();

  const handleSelectTab = (tab: ActiveTab) => {
    setActiveTab(tab);
    onClose();
  };

  const primaryTabs: { id: ActiveTab; label: string; icon: React.ElementType }[] = [
    { id: 'dashboard', label: 'Home', icon: Sprout },
    { id: 'crop-recommendation', label: 'Crops', icon: Leaf },
    { id: 'disease-detection', label: 'Disease', icon: Bug },
    { id: 'market-prices', label: 'Mandi', icon: Store },
  ];

  const drawerTabs: { id: ActiveTab; labelKey: string; icon: React.ElementType }[] = [
    { id: 'landing', labelKey: 'nav.landing', icon: Sparkles },
    { id: 'dashboard', labelKey: 'nav.dashboard', icon: Sprout },
    { id: 'crop-recommendation', labelKey: 'nav.cropRecommendation', icon: Leaf },
    { id: 'disease-detection', labelKey: 'nav.diseaseDetection', icon: Bug },
    { id: 'irrigation', labelKey: 'nav.irrigation', icon: Droplets },
    { id: 'market-prices', labelKey: 'nav.marketPrices', icon: Store },
    { id: 'price-prediction', labelKey: 'nav.pricePrediction', icon: TrendingUp },
    { id: 'market-comparison', labelKey: 'nav.marketComparison', icon: Scale },
    { id: 'yield-prediction', labelKey: 'nav.yieldPrediction', icon: BarChart3 },
    { id: 'farm-calendar', labelKey: 'nav.farmCalendar', icon: Calendar },
    { id: 'farm-operations', labelKey: 'nav.farmOperations', icon: Tractor },
    { id: 'crop-spacing', labelKey: 'nav.cropSpacing', icon: Ruler },
    { id: 'farm-profile', labelKey: 'nav.farmProfile', icon: User },
    { id: 'google-drive', labelKey: 'nav.googleDrive', icon: HardDrive },
    { id: 'settings', labelKey: 'nav.settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Drawer (Slide-over for full menu) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={onClose}
          />

          {/* Drawer content */}
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-white dark:bg-neutral-900 shadow-xl flex flex-col z-50 animate-in slide-in-from-left duration-200">
            <div className="p-4 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-700 text-white flex items-center justify-center">
                  <Sprout className="w-5 h-5" />
                </div>
                <span className="font-extrabold text-base text-emerald-900 dark:text-emerald-300">
                  KRUSHIAI
                </span>
              </div>
              <button 
                onClick={onClose}
                className="p-1.5 rounded-lg text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto p-3 space-y-1">
              {drawerTabs.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectTab(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-emerald-700 text-white font-semibold'
                        : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-neutral-500 dark:text-neutral-400'}`} />
                    <span>{t(item.labelKey)}</span>
                  </button>
                );
              })}
            </nav>

            <div className="p-3 border-t border-neutral-100 dark:border-neutral-800">
              <button
                onClick={() => {
                  setIsNotificationsOpen(true);
                  onClose();
                }}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-neutral-600 dark:text-neutral-300 bg-neutral-50 dark:bg-neutral-800/60"
              >
                <span className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-neutral-500" />
                  <span>Notifications</span>
                </span>
                {unreadCount > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-amber-500 text-white">
                    {unreadCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Sticky Tab Bar for Mobile */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border-t border-neutral-200 dark:border-neutral-800 pb-safe">
        <div className="flex items-center justify-around h-14">
          {primaryTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center justify-center flex-1 h-full py-1 ${
                  isActive
                    ? 'text-emerald-700 dark:text-emerald-400 font-bold'
                    : 'text-neutral-500 dark:text-neutral-400'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
                <span className="text-[10px] mt-0.5">{tab.label}</span>
              </button>
            );
          })}

          {/* More button */}
          <button
            onClick={() => handleSelectTab(activeTab === 'landing' ? 'dashboard' : 'landing')}
            className={`flex flex-col items-center justify-center flex-1 h-full py-1 ${
              activeTab === 'landing'
                ? 'text-emerald-700 dark:text-emerald-400 font-bold'
                : 'text-neutral-500 dark:text-neutral-400'
            }`}
          >
            <Sparkles className="w-5 h-5" />
            <span className="text-[10px] mt-0.5">Overview</span>
          </button>
        </div>
      </nav>
    </>
  );
};
