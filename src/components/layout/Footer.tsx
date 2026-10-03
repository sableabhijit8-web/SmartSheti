import React from 'react';
import { Sprout, MapPin } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SUPPORTED_LANGUAGES } from '../../locales';

export const Footer: React.FC = () => {
  const { setActiveTab, setLanguage, language, t } = useApp();

  return (
    <footer className="mt-16 bg-white dark:bg-neutral-900 border-t border-neutral-200/80 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 pb-10 border-b border-neutral-100 dark:border-neutral-800">
          {/* Brand & Mission */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-700 text-white flex items-center justify-center shadow-xs">
                <Sprout className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight">
                  KRUSHIAI
                </h3>
                <p className="text-[11px] font-medium text-emerald-700 dark:text-emerald-400">
                  {t('footer.tagline')}
                </p>
              </div>
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-sm">
              {t('footer.mission')}
            </p>
            <div className="flex items-center gap-2 text-xs text-neutral-500">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t('footer.indianZones')}</span>
            </div>
          </div>

          {/* Product Modules */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-200 mb-3">
              {t('footer.modulesTitle')}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => setActiveTab('crop-recommendation')}
                  className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  {t('nav.cropRecommendation')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('disease-detection')}
                  className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  {t('nav.diseaseDetection')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('market-prices')}
                  className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  {t('nav.marketPrices')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('price-prediction')}
                  className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  {t('nav.pricePrediction')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('irrigation')}
                  className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  {t('nav.irrigation')}
                </button>
              </li>
            </ul>
          </div>

          {/* Resources & Planning */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-200 mb-3">
              {t('footer.resourcesTitle')}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => setActiveTab('farm-calendar')}
                  className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  {t('nav.farmCalendar')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('farm-operations')}
                  className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  {t('nav.farmOperations')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('crop-spacing')}
                  className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  {t('nav.cropSpacing')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('google-drive')}
                  className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  {t('nav.googleDrive')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('settings')}
                  className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  {t('nav.settings')}
                </button>
              </li>
            </ul>
          </div>

          {/* Regional Languages */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-200 mb-3">
              {t('landing.indianLanguages')} (13)
            </h4>
            <div className="grid grid-cols-2 gap-1.5 text-xs max-h-48 overflow-y-auto pr-1">
              {SUPPORTED_LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLanguage(l.code)}
                  className={`text-left py-1 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors cursor-pointer truncate ${
                    language === l.code ? 'font-bold text-emerald-700 dark:text-emerald-400' : ''
                  }`}
                >
                  {l.nativeName}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-neutral-500">
            © {new Date().getFullYear()} KrushiAI. {t('footer.tagline')}.
          </p>

          <div className="flex items-center gap-1.5 font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1.5 rounded-lg border border-emerald-200 dark:border-emerald-800">
            <span>🇮🇳 {t('footer.copyright')}</span>
          </div>

          <div className="flex items-center gap-3 text-neutral-500 text-[11px]">
            <span>{t('common.prototypeTag')}</span>
            <span>·</span>
            <span>{t('footer.prototypeNotice')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
