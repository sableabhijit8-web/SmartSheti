import React, { createContext, useContext, useState, useEffect } from 'react';
import { ActiveTab, Language, FarmerProfile, NotificationItem } from '../types';
import { DEFAULT_FARMER_PROFILE, DEMO_NOTIFICATIONS } from '../data/mockData';

import { User } from 'firebase/auth';
import { initAuth, googleSignIn, logoutGoogle } from '../services/googleDriveService';
import { TRANSLATIONS, SupportedLanguage, SUPPORTED_LANGUAGES, getTranslation } from '../locales';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}

interface AppContextType {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  farmerProfile: FarmerProfile;
  updateFarmerProfile: (profile: FarmerProfile) => void;
  resetFarmerProfile: () => void;
  notifications: NotificationItem[];
  unreadCount: number;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
  isNotificationsOpen: boolean;
  setIsNotificationsOpen: (open: boolean) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  // Google Drive
  driveUser: User | null;
  isDriveConnected: boolean;
  connectDrive: () => Promise<boolean>;
  disconnectDrive: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('krushi_lang') as Language) || 'en';
  });
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('krushi_theme') as 'light' | 'dark') || 'light';
  });
  const [farmerProfile, setFarmerProfile] = useState<FarmerProfile>(() => {
    const saved = localStorage.getItem('krushi_profile');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.name === 'Ramesh Patil') {
          parsed.name = 'Abhijit Sable';
          localStorage.setItem('krushi_profile', JSON.stringify(parsed));
        }
        return parsed;
      } catch {
        return DEFAULT_FARMER_PROFILE;
      }
    }
    return DEFAULT_FARMER_PROFILE;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('krushi_notifications');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return DEMO_NOTIFICATIONS;
      }
    }
    return DEMO_NOTIFICATIONS;
  });

  const [toasts, setToasts] = useState<Toast[]>([]);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Google Drive Auth state (token stored strictly in memory via googleDriveService)
  const [driveUser, setDriveUser] = useState<User | null>(null);
  const [isDriveConnected, setIsDriveConnected] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = initAuth(
      (user, _token) => {
        setDriveUser(user);
        setIsDriveConnected(true);
      },
      () => {
        setDriveUser(null);
        setIsDriveConnected(false);
      }
    );
    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, []);

  const connectDrive = async (): Promise<boolean> => {
    try {
      const result = await googleSignIn();
      if (result) {
        setDriveUser(result.user);
        setIsDriveConnected(true);
        showToast(`Connected Google Drive as ${result.user.displayName || result.user.email}`, 'success');
        return true;
      }
      return false;
    } catch (err: any) {
      console.error('Drive connection error:', err);
      showToast(err.message || 'Google Drive sign-in aborted or failed', 'warning');
      return false;
    }
  };

  const disconnectDrive = async (): Promise<void> => {
    await logoutGoogle();
    setDriveUser(null);
    setIsDriveConnected(false);
    showToast('Google Drive disconnected', 'info');
  };

  // Sync Language and Direction (RTL for Urdu)
  useEffect(() => {
    localStorage.setItem('krushi_lang', language);
    const meta = SUPPORTED_LANGUAGES.find((l) => l.code === language);
    const direction = meta?.dir || 'ltr';
    document.documentElement.setAttribute('dir', direction);
    document.documentElement.setAttribute('lang', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('krushi_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('krushi_profile', JSON.stringify(farmerProfile));
  }, [farmerProfile]);

  useEffect(() => {
    localStorage.setItem('krushi_notifications', JSON.stringify(notifications));
  }, [notifications]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    const meta = SUPPORTED_LANGUAGES.find((l) => l.code === lang);
    showToast(
      meta ? `Language switched to ${meta.name} (${meta.nativeName})` : 'Language updated',
      'info'
    );
  };

  const updateFarmerProfile = (newProfile: FarmerProfile) => {
    setFarmerProfile(newProfile);
    showToast('Farm profile updated successfully', 'success');
  };

  const resetFarmerProfile = () => {
    setFarmerProfile(DEFAULT_FARMER_PROFILE);
    showToast('Farm profile reset to default sample data', 'info');
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast('All notifications marked as read', 'info');
  };

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'info') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const t = (key: string, params?: Record<string, string | number>): string => {
    return getTranslation(language, key, params);
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        language,
        setLanguage,
        theme,
        toggleTheme,
        farmerProfile,
        updateFarmerProfile,
        resetFarmerProfile,
        notifications,
        unreadCount,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        toasts,
        showToast,
        isNotificationsOpen,
        setIsNotificationsOpen,
        t,
        driveUser,
        isDriveConnected,
        connectDrive,
        disconnectDrive,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
