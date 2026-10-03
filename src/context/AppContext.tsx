import React, { createContext, useContext, useState, useEffect } from 'react';
import { ActiveTab, Language, FarmerProfile, NotificationItem } from '../types';
import { DEFAULT_FARMER_PROFILE, DEMO_NOTIFICATIONS } from '../data/mockData';

import { User } from 'firebase/auth';
import { initAuth, googleSignIn, logoutGoogle } from '../services/googleDriveService';

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
  t: (key: string) => string;
  // Google Drive
  driveUser: User | null;
  isDriveConnected: boolean;
  connectDrive: () => Promise<boolean>;
  disconnectDrive: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Multilingual translations for key UI navigation and phrases
const TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    'nav.dashboard': 'Dashboard',
    'nav.cropRecommendation': 'Crop Recommendation',
    'nav.diseaseDetection': 'Disease Detection',
    'nav.marketPrices': 'Market Prices',
    'nav.pricePrediction': 'Price Prediction',
    'nav.marketComparison': 'Market Comparison',
    'nav.yieldPrediction': 'Yield Prediction',
    'nav.irrigation': 'Smart Irrigation',
    'nav.farmCalendar': 'Farm Calendar',
    'nav.farmOperations': 'Farm Operations',
    'nav.farmProfile': 'Farm Profile',
    'nav.googleDrive': 'Google Drive Records',
    'nav.notifications': 'Notifications',
    'nav.settings': 'Settings',
    'app.tagline': 'AI-Powered Smart Agriculture Decision Support System',
    'app.secondaryTagline': 'From Soil to Market — Intelligent Farming Assistance',
    'proto.badge': 'Prototype / Demo Prediction',
    'proto.banner': 'Demonstration Prototype — Machine learning models and live APMC feeds will be integrated in subsequent phases.',
  },
  mr: {
    'nav.dashboard': 'डॅशबोर्ड',
    'nav.cropRecommendation': 'पीक निवड',
    'nav.diseaseDetection': 'रोग ओळख',
    'nav.marketPrices': 'बाजारभाव',
    'nav.pricePrediction': 'किंमत अंदाज',
    'nav.marketComparison': 'बाजार तुलना',
    'nav.yieldPrediction': 'उत्पादन अंदाज',
    'nav.irrigation': 'सिंचन सल्ला',
    'nav.farmCalendar': 'शेती दिनदर्शिका',
    'nav.farmOperations': 'शेती मशागत व कामे',
    'nav.farmProfile': 'शेतकरी प्रोफाईल',
    'nav.googleDrive': 'गुगल ड्राईव्ह दस्तऐवज',
    'nav.notifications': 'सूचना',
    'nav.settings': 'सेटिंग्ज',
    'app.tagline': 'स्मार्ट शेती निर्णय सहाय्य प्रणाली',
    'app.secondaryTagline': 'मातीपासून बाजारापर्यंत — शेतीसाठी बुद्धिमान तंत्रज्ञान',
    'proto.badge': 'प्रोटोटाइप / नमुना अंदाज',
    'proto.banner': 'डेमो प्रोटोटाइप — भविष्यात प्रत्यक्ष मशीन लर्निंग मॉडेल्स आणि थेट बाजारभाव जोडले जातील.',
  },
  hi: {
    'nav.dashboard': 'डैशबोर्ड',
    'nav.cropRecommendation': 'फसल चयन',
    'nav.diseaseDetection': 'रोग पहचान',
    'nav.marketPrices': 'मंडी भाव',
    'nav.pricePrediction': 'मूल्य पूर्वानुमान',
    'nav.marketComparison': 'मंडी तुलना',
    'nav.yieldPrediction': 'उपज अनुमान',
    'nav.irrigation': 'स्मार्ट सिंचाई',
    'nav.farmCalendar': 'कृषि कैलेंडर',
    'nav.farmOperations': 'कृषि कार्य व प्रबंधन',
    'nav.farmProfile': 'किसान प्रोफाइल',
    'nav.googleDrive': 'गूगल ड्राइव अभिलेख',
    'nav.notifications': 'सूचनाएं',
    'nav.settings': 'सेटिंग्स',
    'app.tagline': 'एआई-संचालित स्मार्ट कृषि निर्णय समर्थन प्रणाली',
    'app.secondaryTagline': 'मिट्टी से मंडी तक — किसानों के लिए बुद्धिमान सहायता',
    'proto.badge': 'प्रोटोटाइप / डेमो पूर्वानुमान',
    'proto.banner': 'डेमो प्रोटोटाइप — वास्तविक एमएल मॉडल और सरकारी मंडी एपीआई बाद में जोड़े जाएंगे।',
  },
};

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
        return JSON.parse(saved);
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

  useEffect(() => {
    localStorage.setItem('krushi_lang', language);
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
    showToast(
      lang === 'mr' ? 'भाषा मराठी निवडली' : lang === 'hi' ? 'भाषा हिंदी चुनी गई' : 'Language set to English',
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

  const t = (key: string): string => {
    return TRANSLATIONS[language]?.[key] || TRANSLATIONS.en[key] || key;
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
