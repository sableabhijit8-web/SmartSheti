import React, { useState, useRef, useEffect } from 'react';
import { 
  Bell, 
  Moon, 
  Sun, 
  Languages, 
  ChevronDown, 
  User, 
  Menu,
  HardDrive,
  Sparkles,
  LayoutDashboard
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SUPPORTED_LANGUAGES } from '../../locales';

interface TopBarProps {
  onOpenMobileMenu?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onOpenMobileMenu }) => {
  const { 
    activeTab, 
    language, 
    setLanguage, 
    theme, 
    toggleTheme, 
    farmerProfile, 
    unreadCount, 
    setIsNotificationsOpen,
    t,
    setActiveTab
  } = useApp();

  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLangMeta = SUPPORTED_LANGUAGES.find((l) => l.code === language) || SUPPORTED_LANGUAGES[0];

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 sm:px-6 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800">
      {/* Zone 1: Breadcrumb and Mobile Menu Toggle */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 rounded-xl text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none cursor-pointer"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-sm">
          <button
            onClick={() => setActiveTab('landing')}
            className="font-extrabold text-emerald-800 dark:text-emerald-400 hover:underline cursor-pointer"
          >
            KrushiAI
          </button>
          <span className="text-neutral-300 dark:text-neutral-700" aria-hidden="true">/</span>
          <span className="font-semibold text-neutral-800 dark:text-neutral-200 truncate max-w-[130px] sm:max-w-xs text-xs sm:text-sm">
            {t(`nav.${activeTab.replace(/-([a-z])/g, (_, c) => c.toUpperCase())}`) || activeTab}
          </span>
        </div>
      </div>

      {/* Zone 2: Overview / Dashboard Switcher */}
      <div className="hidden md:flex items-center gap-2">
        <button
          onClick={() => setActiveTab(activeTab === 'landing' ? 'dashboard' : 'landing')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
            activeTab === 'landing'
              ? 'bg-emerald-600 text-white border-emerald-500 shadow-xs'
              : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60 hover:bg-emerald-100'
          }`}
        >
          {activeTab === 'landing' ? (
            <>
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Enter Farmer Dashboard</span>
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Product Story & Overview</span>
            </>
          )}
        </button>
      </div>

      {/* Zone 3: Actions (Language, Theme, Notifications, Profile) */}
      <div className="flex items-center gap-2 sm:gap-2.5">
        {/* Language Selector Dropdown */}
        <div className="relative" ref={langMenuRef}>
          <button
            onClick={() => setLangMenuOpen(!langMenuOpen)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 transition-colors cursor-pointer"
            aria-expanded={langMenuOpen}
            aria-label="Select language"
          >
            <Languages className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
            <span className="hidden sm:inline">{currentLangMeta.nativeName}</span>
            <span className="sm:hidden font-mono uppercase text-[11px]">{currentLangMeta.code}</span>
            <ChevronDown className="w-3 h-3 text-neutral-400" />
          </button>

          {langMenuOpen && (
            <div className="absolute right-0 mt-1.5 w-60 max-h-80 overflow-y-auto rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
              <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 border-b border-neutral-100 dark:border-neutral-800">
                13 Indian Languages
              </div>
              {SUPPORTED_LANGUAGES.map((opt) => (
                <button
                  key={opt.code}
                  onClick={() => {
                    setLanguage(opt.code);
                    setLangMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium transition-colors cursor-pointer ${
                    language === opt.code
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-semibold'
                      : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{opt.nativeName}</span>
                    <span className="text-[10px] text-neutral-400">({opt.name})</span>
                  </div>
                  <span className="text-[10px] text-neutral-400 truncate max-w-[80px]">{opt.region}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Google Drive Status Button */}
        <button
          onClick={() => setActiveTab('google-drive')}
          className={`relative p-2 rounded-xl transition-colors cursor-pointer ${
            activeTab === 'google-drive'
              ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
              : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
          }`}
          title="Google Drive Farm Records"
          aria-label="Google Drive Farm Records"
        >
          <HardDrive className="w-4 h-4" />
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
          title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
          aria-label="Toggle color theme"
        >
          {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
        </button>

        {/* Notifications Icon Button */}
        <button
          onClick={() => setIsNotificationsOpen(true)}
          className="relative p-2 rounded-xl text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
          aria-label="View notifications"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
          )}
        </button>

        {/* Profile Pill Button */}
        <button
          onClick={() => setActiveTab('farm-profile')}
          className="flex items-center gap-2 pl-1.5 pr-2.5 py-1 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer border border-transparent hover:border-neutral-200 dark:hover:border-neutral-700"
        >
          <div className="w-7 h-7 rounded-lg bg-emerald-800 text-white flex items-center justify-center font-bold text-xs">
            {farmerProfile.name.charAt(0)}
          </div>
          <span className="hidden sm:inline text-xs font-semibold text-neutral-800 dark:text-neutral-200 truncate max-w-[100px]">
            {farmerProfile.name}
          </span>
        </button>
      </div>
    </header>
  );
};
