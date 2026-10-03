import React from 'react';
import { 
  Sprout, 
  Leaf, 
  Bug, 
  Store, 
  TrendingUp, 
  BarChart3, 
  Scale, 
  Droplets, 
  Calendar, 
  Tractor, 
  User, 
  Settings,
  Bell,
  Cpu,
  HardDrive,
  Sparkles,
  Ruler
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ActiveTab } from '../../types';

interface NavItem {
  id: ActiveTab;
  labelKey: string;
  icon: React.ElementType;
}

interface NavGroup {
  groupKey?: string;
  items: NavItem[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    items: [
      { id: 'landing', labelKey: 'nav.landing', icon: Sparkles },
      { id: 'dashboard', labelKey: 'nav.dashboard', icon: Sprout },
    ],
  },
  {
    groupKey: 'groups.agronomyProtection',
    items: [
      { id: 'crop-recommendation', labelKey: 'nav.cropRecommendation', icon: Leaf },
      { id: 'disease-detection', labelKey: 'nav.diseaseDetection', icon: Bug },
      { id: 'irrigation', labelKey: 'nav.irrigation', icon: Droplets },
    ],
  },
  {
    groupKey: 'groups.mandiEconomics',
    items: [
      { id: 'market-prices', labelKey: 'nav.marketPrices', icon: Store },
      { id: 'price-prediction', labelKey: 'nav.pricePrediction', icon: TrendingUp },
      { id: 'market-comparison', labelKey: 'nav.marketComparison', icon: Scale },
      { id: 'yield-prediction', labelKey: 'nav.yieldPrediction', icon: BarChart3 },
    ],
  },
  {
    groupKey: 'groups.planningOperations',
    items: [
      { id: 'farm-calendar', labelKey: 'nav.farmCalendar', icon: Calendar },
      { id: 'farm-operations', labelKey: 'nav.farmOperations', icon: Tractor },
      { id: 'crop-spacing', labelKey: 'nav.cropSpacing', icon: Ruler },
    ],
  },
  {
    groupKey: 'groups.accountStorage',
    items: [
      { id: 'farm-profile', labelKey: 'nav.farmProfile', icon: User },
      { id: 'google-drive', labelKey: 'nav.googleDrive', icon: HardDrive },
      { id: 'settings', labelKey: 'nav.settings', icon: Settings },
    ],
  },
];

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, t, unreadCount, setIsNotificationsOpen } = useApp();

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 h-screen sticky top-0 shrink-0 select-none z-20">
      {/* Brand Header */}
      <div className="p-5 border-b border-neutral-100 dark:border-neutral-800">
        <div 
          onClick={() => setActiveTab('landing')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-2xl bg-emerald-700 text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            <Sprout className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-emerald-900 dark:text-emerald-300">
              KRUSHIAI
            </h1>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 font-medium leading-none mt-0.5">
              {t('footer.tagline')}
            </p>
          </div>
        </div>

        {/* Prototype indicator tag */}
        <div className="mt-3.5 flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50/80 dark:bg-emerald-950/40 rounded-lg border border-emerald-200/60 dark:border-emerald-800/40">
          <Cpu className="w-3 h-3 text-emerald-700 dark:text-emerald-400 shrink-0" />
          <span className="text-[11px] font-semibold text-emerald-800 dark:text-emerald-300">
            {t('common.prototypeTag')}
          </span>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 ml-auto font-mono">
            v1.2
          </span>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-4">
        {NAV_GROUPS.map((group, idx) => (
          <div key={idx} className="space-y-1">
            {group.groupKey && (
              <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 py-1">
                {t(group.groupKey)}
              </div>
            )}
            {group.items.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-emerald-700 text-white shadow-xs font-semibold'
                      : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800/70 hover:text-emerald-800 dark:hover:text-emerald-300'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-neutral-500 dark:text-neutral-400'}`} />
                  <span className="truncate">{t(item.labelKey)}</span>
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Quick Notification Drawer Trigger & Footer */}
      <div className="p-3 border-t border-neutral-100 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900/60">
        <button
          onClick={() => setIsNotificationsOpen(true)}
          className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-neutral-600 dark:text-neutral-300 hover:bg-white dark:hover:bg-neutral-800 border border-neutral-200/60 dark:border-neutral-700/60 transition-colors cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <Bell className="w-3.5 h-3.5 text-neutral-500" />
            <span>{t('nav.notifications')}</span>
          </span>
          {unreadCount > 0 ? (
            <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-white font-mono">
              {unreadCount}
            </span>
          ) : (
            <span className="text-[10px] text-neutral-400">0</span>
          )}
        </button>
      </div>
    </aside>
  );
};
