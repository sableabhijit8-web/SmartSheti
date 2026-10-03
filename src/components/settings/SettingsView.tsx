import React, { useState } from 'react';
import { 
  Settings, 
  Moon, 
  Sun, 
  Languages, 
  Bell, 
  Layers, 
  Cpu, 
  Check, 
  Database,
  Server,
  Code
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Language } from '../../types';
import { PrototypeBanner } from '../layout/PrototypeBanner';

export const SettingsView: React.FC = () => {
  const { language, setLanguage, theme, toggleTheme, showToast } = useApp();

  const [unitSystem, setUnitSystem] = useState<'metric' | 'acre'>('metric');
  const [notifPreferences, setNotifPreferences] = useState({
    weatherAlerts: true,
    marketSwings: true,
    irrigationReminders: true,
    pestScouting: true,
  });

  const handleUnitToggle = (unit: 'metric' | 'acre') => {
    setUnitSystem(unit);
    showToast(`Unit preference set to ${unit === 'metric' ? 'Hectares & Quintals' : 'Acres & Kilograms'}`, 'info');
  };

  const toggleNotif = (key: keyof typeof notifPreferences) => {
    setNotifPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
    showToast('Notification preference updated', 'info');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-16">
      {/* Title */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
            <Settings className="w-5 h-5" />
          </span>
          <h2 className="text-2xl font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight">
            System & Application Settings
          </h2>
        </div>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Configure linguistic preferences, visual themes, measurement units, and review the technical ML architecture.
        </p>
      </div>

      <PrototypeBanner 
        subtext="Settings configure the prototype client experience. Endpoints and backend services operate in simulated local mode."
      />

      <div className="space-y-6">
        {/* Appearance & Language */}
        <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs space-y-5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 pb-2 border-b border-neutral-100 dark:border-neutral-800">
            1. Language & Appearance
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Language */}
            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                User Interface Language
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'en' as Language, label: 'English', sub: 'Standard' },
                  { id: 'mr' as Language, label: 'मराठी', sub: 'Marathi' },
                  { id: 'hi' as Language, label: 'हिंदी', sub: 'Hindi' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setLanguage(item.id)}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      language === item.id
                        ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-bold ring-1 ring-emerald-600'
                        : 'border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-neutral-300'
                    }`}
                  >
                    <span className="block text-xs font-semibold">{item.label}</span>
                    <span className="text-[10px] text-neutral-400">{item.sub}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Theme */}
            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                Visual Theme
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => theme !== 'light' && toggleTheme()}
                  className={`p-2.5 rounded-xl border flex items-center justify-center gap-2 transition-all ${
                    theme === 'light'
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-800 font-bold ring-1 ring-emerald-600'
                      : 'border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400'
                  }`}
                >
                  <Sun className="w-4 h-4 text-amber-500" />
                  <span className="text-xs">Light Mode</span>
                </button>

                <button
                  onClick={() => theme !== 'dark' && toggleTheme()}
                  className={`p-2.5 rounded-xl border flex items-center justify-center gap-2 transition-all ${
                    theme === 'dark'
                      ? 'border-emerald-600 bg-emerald-950/40 text-emerald-300 font-bold ring-1 ring-emerald-600'
                      : 'border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400'
                  }`}
                >
                  <Moon className="w-4 h-4 text-neutral-300" />
                  <span className="text-xs">Dark Mode</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Units & Measurement Standards */}
        <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 pb-2 border-b border-neutral-100 dark:border-neutral-800">
            2. Agronomic Measurement Standard
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div
              onClick={() => handleUnitToggle('metric')}
              className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                unitSystem === 'metric'
                  ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 ring-1 ring-emerald-600'
                  : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
                  Standard Metric (India / ICAR)
                </span>
                {unitSystem === 'metric' && <Check className="w-4 h-4 text-emerald-600" />}
              </div>
              <p className="text-[11px] text-neutral-500">
                Land in Hectares (1 Ha = 2.47 Acres), Harvest & Mandi rates in Quintals (1 Qtl = 100 kg).
              </p>
            </div>

            <div
              onClick={() => handleUnitToggle('acre')}
              className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                unitSystem === 'acre'
                  ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 ring-1 ring-emerald-600'
                  : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
                  Acre / Guntha Standard
                </span>
                {unitSystem === 'acre' && <Check className="w-4 h-4 text-emerald-600" />}
              </div>
              <p className="text-[11px] text-neutral-500">
                Land in Acres / Gunthas, Mandi rates per Kilogram or 50kg bag.
              </p>
            </div>
          </div>
        </div>

        {/* Technical Architecture & API Mapping Checklist */}
        <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-neutral-100 dark:border-neutral-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
              3. Future Machine Learning & Backend Architecture
            </h3>
            <span className="text-[11px] font-mono text-neutral-400">FastAPI / PyTorch Ready</span>
          </div>

          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
            The KrushiAI frontend is decoupled through structured service abstractions, allowing seamless drop-in integration with real-world ML microservices:
          </p>

          <div className="divide-y divide-neutral-100 dark:divide-neutral-800 text-xs">
            <div className="py-2.5 flex items-center justify-between">
              <div>
                <span className="font-semibold text-neutral-800 dark:text-neutral-200 block">
                  Crop Recommendation Model
                </span>
                <span className="text-[11px] text-neutral-400 font-mono">POST /api/crop-recommendation</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                Random Forest / XGBoost
              </span>
            </div>

            <div className="py-2.5 flex items-center justify-between">
              <div>
                <span className="font-semibold text-neutral-800 dark:text-neutral-200 block">
                  Disease Detection CNN
                </span>
                <span className="text-[11px] text-neutral-400 font-mono">POST /api/disease-detection</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                MobileNetV3 / EfficientNet
              </span>
            </div>

            <div className="py-2.5 flex items-center justify-between">
              <div>
                <span className="font-semibold text-neutral-800 dark:text-neutral-200 block">
                  Price Time-Series Forecaster
                </span>
                <span className="text-[11px] text-neutral-400 font-mono">POST /api/price-prediction</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                LSTM / GRU / Agmarknet
              </span>
            </div>

            <div className="py-2.5 flex items-center justify-between">
              <div>
                <span className="font-semibold text-neutral-800 dark:text-neutral-200 block">
                  Crop Yield Estimator
                </span>
                <span className="text-[11px] text-neutral-400 font-mono">POST /api/yield-prediction</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                XGBoost Regressor
              </span>
            </div>

            <div className="py-2.5 flex items-center justify-between">
              <div>
                <span className="font-semibold text-neutral-800 dark:text-neutral-200 block">
                  Irrigation ET0 Advisor
                </span>
                <span className="text-[11px] text-neutral-400 font-mono">POST /api/irrigation</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                Penman-Monteith + IoT
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
