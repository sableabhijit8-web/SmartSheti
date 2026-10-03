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
  HardDrive
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
    { id: 'dashboard', labelKey: 'nav.dashboard', icon: Sprout },
    { id: 'crop-recommendation', labelKey: 'nav.cropRecommendation', icon: Leaf },
    { id: 'disease-detection', labelKey: 'nav.diseaseDetection', icon: Bug },
    { id: 'market-prices', labelKey: 'nav.marketPrices', icon: Store },
    { id: 'price-prediction', labelKey: 'nav.pricePrediction', icon: TrendingUp },
    { id: 'market-comparison', labelKey: 'nav.marketComparison', icon: Scale },
    { id: 'yield-prediction', labelKey: 'nav.yieldPrediction', icon: BarChart3 },
    { id: 'irrigation', labelKey: 'nav.irrigation', icon: Droplets },
    { id: 'farm-calendar', labelKey: 'nav.farmCalendar', icon: Calendar },
    { id: 'farm-operations', labelKey: 'nav.farmOperations', icon: Tractor },
    { id: 'farm-profile', labelKey: 'nav.farmProfile', icon: User },
    { id: 'google-drive', labelKey: 'nav.googleDrive', icon: HardDrive },
    { id: 'settings', labelKey: 'nav.settings', icon: Settings },
  ];

  return (
    <>
      {/* Bottom Sticky Mobile Bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border-t border-neutral-200 dark:border-neutral-800 px-3 py-1 flex items-center justify-around">
        {primaryTabs.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center py-1.5 px-3 min-w-[56px] text-xs transition-colors ${
                isActive
                  ? 'text-emerald-700 dark:text-emerald-400 font-bold'
                  : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : ''}`} />
              <span className="text-[10px] mt-0.5">{item.label}</span>
            </button>
          );
        })}

        <button
          onClick={onClose}
          className="flex flex-col items-center justify-center py-1.5 px-3 min-w-[56px] text-xs text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200"
          aria-label="Open more tools menu"
        >
          <MoreHorizontal className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">More</span>
        </button>
      </nav>

      {/* Slide-in Full Drawer for Mobile */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity" 
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer container */}
          <div className="relative w-4/5 max-w-sm bg-white dark:bg-neutral-900 h-full flex flex-col shadow-2xl z-10">
            <div className="p-4 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center">
                  <Sprout className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-extrabold text-base text-emerald-900 dark:text-emerald-300">
                    KRUSHIAI
                  </h2>
                  <p className="text-[10px] text-neutral-500">Smart Agriculture System</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1">
              {drawerTabs.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectTab(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-emerald-700 text-white font-semibold shadow-xs'
                        : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{t(item.labelKey)}</span>
                  </button>
                );
              })}
            </div>

            <div className="p-4 border-t border-neutral-100 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900/60">
              <button
                onClick={() => {
                  onClose();
                  setIsNotificationsOpen(true);
                }}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-neutral-700 dark:text-neutral-300 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700"
              >
                <span className="flex items-center gap-2">
                  <Bell className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Notifications</span>
                </span>
                {unreadCount > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full bg-emerald-600 text-white font-bold text-[10px]">
                    {unreadCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
