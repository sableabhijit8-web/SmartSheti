import React, { useState, useRef, useEffect } from 'react';
import { 
  Bell, 
  Moon, 
  Sun, 
  Languages, 
  ChevronDown, 
  User, 
  Menu,
  HardDrive
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Language } from '../../types';

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

  const languageOptions: { code: Language; label: string; sub: string }[] = [
    { code: 'en', label: 'English', sub: 'Default' },
    { code: 'mr', label: 'मराठी', sub: 'Marathi' },
    { code: 'hi', label: 'हिंदी', sub: 'Hindi' },
  ];

  const currentLangLabel = languageOptions.find((l) => l.code === language)?.label || 'English';

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 sm:px-6 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800">
      {/* Zone 1: Breadcrumb and Mobile Menu Toggle */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 rounded-lg text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-sm">
          <span className="font-extrabold text-emerald-800 dark:text-emerald-400">
            KrushiAI
          </span>
          <span className="text-neutral-400 dark:text-neutral-600" aria-hidden="true">/</span>
          <span className="font-semibold text-neutral-800 dark:text-neutral-200 truncate max-w-[140px] sm:max-w-xs">
            {t(`nav.${activeTab.replace(/-([a-z])/g, (_, c) => c.toUpperCase())}`) || activeTab}
          </span>
        </div>
      </div>

      {/* Zone 2: Prototype Mode Pill / Context */}
      <div className="hidden md:flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        <span className="font-medium text-neutral-700 dark:text-neutral-300">
          Prototype Mode
        </span>
        <span aria-hidden="true">·</span>
        <span>Simulated ML Inference</span>
      </div>

      {/* Zone 3: Actions (Language, Theme, Notifications, Profile) */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Language Selector Dropdown */}
        <div className="relative" ref={langMenuRef}>
          <button
            onClick={() => setLangMenuOpen(!langMenuOpen)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 transition-colors"
            aria-expanded={langMenuOpen}
            aria-label="Select language"
          >
            <Languages className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
            <span>{currentLangLabel}</span>
            <ChevronDown className="w-3 h-3 text-neutral-400" />
          </button>

          {langMenuOpen && (
            <div className="absolute right-0 mt-1.5 w-36 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-lg py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
              {languageOptions.map((opt) => (
                <button
                  key={opt.code}
                  onClick={() => {
                    setLanguage(opt.code);
                    setLangMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium transition-colors ${
                    language === opt.code
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-semibold'
                      : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800'
                  }`}
                >
                  <span>{opt.label}</span>
                  <span className="text-[10px] text-neutral-400">{opt.sub}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Google Drive Status Button */}
        <button
          onClick={() => setActiveTab('google-drive')}
          className={`relative p-2 rounded-lg transition-colors ${
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
          className="p-2 rounded-lg text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          aria-label="Toggle theme"
        >
          {theme === 'light' ? (
            <Moon className="w-4 h-4 text-neutral-700" />
          ) : (
            <Sun className="w-4 h-4 text-amber-400" />
          )}
        </button>

        {/* Notifications Trigger */}
        <button
          onClick={() => setIsNotificationsOpen(true)}
          className="relative p-2 rounded-lg text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          title="Notifications"
          aria-label="Open notifications"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-600 ring-2 ring-white dark:ring-neutral-900" />
          )}
        </button>

        {/* Farmer Profile Button */}
        <button
          onClick={() => setActiveTab('farm-profile')}
          className="flex items-center gap-2 pl-2 pr-2.5 py-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-left"
          title="View Farm Profile"
        >
          <div className="w-7 h-7 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 flex items-center justify-center font-bold text-xs">
            {farmerProfile.name.charAt(0)}
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 leading-none">
              {farmerProfile.name}
            </p>
            <p className="text-[10px] text-neutral-500 dark:text-neutral-400 leading-none mt-0.5">
              {farmerProfile.village}, {farmerProfile.district}
            </p>
          </div>
        </button>
      </div>
    </header>
  );
};
