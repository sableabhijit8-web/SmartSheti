import React, { useState } from 'react';
import { 
  Sprout, 
  Leaf, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  HelpCircle, 
  RotateCcw,
  Clock,
  Droplets,
  Calendar,
  Layers,
  ChevronDown
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MAHARASHTRA_DISTRICTS } from '../../data/mockData';
import { SoilType, IrrigationAvailability, CropSuitabilityResult } from '../../types';
import { getCropRecommendations, CropRecommendationParams } from '../../services/cropRecommendationService';
import { PrototypeBanner } from '../layout/PrototypeBanner';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const CropRecommendationView: React.FC = () => {
  const { farmerProfile, showToast, t } = useApp();

  const [formData, setFormData] = useState<CropRecommendationParams>({
    state: farmerProfile.state || 'Maharashtra',
    district: farmerProfile.district || 'Pune',
    village: farmerProfile.village || 'Baramati',
    soilType: farmerProfile.soilType || 'Black Soil',
    nitrogen: 78,
    phosphorus: 44,
    potassium: 38,
    ph: 7.2,
    temperature: 28,
    humidity: 65,
    rainfall: 820,
    month: 'June',
    irrigation: farmerProfile.irrigationType || 'Borewell / Well',
    farmArea: farmerProfile.farmArea || 5.0,
  });

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<CropSuitabilityResult[] | null>(null);

  const validate = (): boolean => {
    const errors: Record<string, string> = {};

    if (formData.farmArea <= 0) {
      errors.farmArea = 'Farm area must be greater than 0 hectares';
    }
    if (formData.ph < 3.5 || formData.ph > 9.5) {
      errors.ph = 'Soil pH must be between 3.5 and 9.5';
    }
    if (formData.nitrogen < 0 || formData.nitrogen > 400) {
      errors.nitrogen = 'Nitrogen (N) must be between 0 and 400 kg/ha';
    }
    if (formData.phosphorus < 0 || formData.phosphorus > 250) {
      errors.phosphorus = 'Phosphorus (P) must be between 0 and 250 kg/ha';
    }
    if (formData.potassium < 0 || formData.potassium > 350) {
      errors.potassium = 'Potassium (K) must be between 0 and 350 kg/ha';
    }
    if (formData.rainfall < 0) {
      errors.rainfall = 'Rainfall cannot be negative';
    }
    if (formData.temperature < 5 || formData.temperature > 55) {
      errors.temperature = 'Temperature must be between 5°C and 55°C';
    }
    if (formData.humidity < 5 || formData.humidity > 100) {
      errors.humidity = 'Humidity must be between 5% and 100%';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRunRecommendation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      showToast('Please fix the errors in the agronomic form', 'warning');
      return;
    }

    setIsLoading(true);
    try {
      const recommendations = await getCropRecommendations(formData);
      setResults(recommendations);
      showToast(t('common.success'), 'success');
    } catch {
      showToast(t('common.error'), 'warning');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetDefaults = () => {
    setFormData({
      state: 'Maharashtra',
      district: 'Pune',
      village: 'Baramati',
      soilType: 'Black Soil',
      nitrogen: 78,
      phosphorus: 44,
      potassium: 38,
      ph: 7.2,
      temperature: 28,
      humidity: 65,
      rainfall: 820,
      month: 'June',
      irrigation: 'Borewell / Well',
      farmArea: 5.0,
    });
    setValidationErrors({});
    showToast(t('common.reset'), 'info');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16 font-sans">
      {/* Title & Introduction */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="p-1.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
            <Leaf className="w-5 h-5" />
          </span>
          <h2 className="text-2xl font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight">
            {t('cropRecommendation.title')}
          </h2>
        </div>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {t('cropRecommendation.subtitle')}
        </p>
      </div>

      <PrototypeBanner />

      {/* Main Form */}
      <div className="p-5 sm:p-7 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs">
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-neutral-100 dark:border-neutral-800">
          <div>
            <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
              {t('cropRecommendation.soilSection')}
            </h3>
            <p className="text-xs text-neutral-500">
              {t('cropRecommendation.subtitle')}
            </p>
          </div>
          <button
            type="button"
            onClick={handleResetDefaults}
            className="flex items-center gap-1.5 text-xs text-neutral-600 dark:text-neutral-400 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t('common.reset')}</span>
          </button>
        </div>

        <form onSubmit={handleRunRecommendation} className="space-y-6">
          {/* Section 1: Location & Land Details */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 mb-3">
              {t('cropRecommendation.locationSection')}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  {t('cropRecommendation.state')}
                </label>
                <input
                  type="text"
                  value={formData.state}
                  disabled
                  className="w-full px-3 py-2 text-xs rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  {t('cropRecommendation.district')}
                </label>
                <select
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-1 focus:ring-emerald-600 focus:outline-none"
                >
                  {MAHARASHTRA_DISTRICTS.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  {t('cropRecommendation.village')}
                </label>
                <input
                  type="text"
                  value={formData.village}
                  onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                  placeholder="e.g. Baramati"
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-1 focus:ring-emerald-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  {t('dashboard.farmArea')} ({t('common.hectares')})
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  value={formData.farmArea}
                  onChange={(e) => setFormData({ ...formData, farmArea: parseFloat(e.target.value) || 0 })}
                  className={`w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-neutral-800 border text-neutral-900 dark:text-neutral-100 focus:outline-none ${
                    validationErrors.farmArea ? 'border-red-500 ring-1 ring-red-500' : 'border-neutral-300 dark:border-neutral-700 focus:ring-1 focus:ring-emerald-600'
                  }`}
                />
                {validationErrors.farmArea && (
                  <p className="text-[10px] text-red-500 mt-1">{validationErrors.farmArea}</p>
                )}
              </div>
            </div>
          </div>

          {/* Section 2: Soil Chemistry & Type */}
          <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 mb-3">
              {t('cropRecommendation.soilSection')}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
              <div>
                <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  {t('cropRecommendation.soilType')}
                </label>
                <select
                  value={formData.soilType}
                  onChange={(e) => setFormData({ ...formData, soilType: e.target.value as SoilType })}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-1 focus:ring-emerald-600 focus:outline-none"
                >
                  <option value="Black Soil">{t('soils.blackSoil')}</option>
                  <option value="Red Soil">{t('soils.redSoil')}</option>
                  <option value="Alluvial Soil">{t('soils.alluvialSoil')}</option>
                  <option value="Laterite Soil">{t('soils.lateriteSoil')}</option>
                  <option value="Other">{t('soils.otherSoil')}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  {t('cropRecommendation.nitrogen')}
                </label>
                <input
                  type="number"
                  value={formData.nitrogen}
                  onChange={(e) => setFormData({ ...formData, nitrogen: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-1 focus:ring-emerald-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  {t('cropRecommendation.phosphorus')}
                </label>
                <input
                  type="number"
                  value={formData.phosphorus}
                  onChange={(e) => setFormData({ ...formData, phosphorus: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-1 focus:ring-emerald-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  {t('cropRecommendation.potassium')}
                </label>
                <input
                  type="number"
                  value={formData.potassium}
                  onChange={(e) => setFormData({ ...formData, potassium: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-1 focus:ring-emerald-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  {t('cropRecommendation.ph')}
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.ph}
                  onChange={(e) => setFormData({ ...formData, ph: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-1 focus:ring-emerald-600 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Climate & Irrigation */}
          <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 mb-3">
              3. Climate & Water Source
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  {t('cropRecommendation.rainfall')}
                </label>
                <input
                  type="number"
                  value={formData.rainfall}
                  onChange={(e) => setFormData({ ...formData, rainfall: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-1 focus:ring-emerald-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  {t('cropRecommendation.temperature')}
                </label>
                <input
                  type="number"
                  value={formData.temperature}
                  onChange={(e) => setFormData({ ...formData, temperature: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-1 focus:ring-emerald-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Month
                </label>
                <select
                  value={formData.month}
                  onChange={(e) => setFormData({ ...formData, month: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-1 focus:ring-emerald-600 focus:outline-none"
                >
                  {MONTHS.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  {t('cropRecommendation.irrigation')}
                </label>
                <select
                  value={formData.irrigation}
                  onChange={(e) => setFormData({ ...formData, irrigation: e.target.value as IrrigationAvailability })}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-1 focus:ring-emerald-600 focus:outline-none"
                >
                  <option value="Perennial / Ample">{t('irrigationTypes.perennialAmple')}</option>
                  <option value="Seasonal / Canal">{t('irrigationTypes.seasonalCanal')}</option>
                  <option value="Borewell / Well">{t('irrigationTypes.borewellWell')}</option>
                  <option value="Rainfed Only">{t('irrigationTypes.rainfedOnly')}</option>
                </select>
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>{t('cropRecommendation.analyzing')}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>{t('cropRecommendation.runModel')}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Results Section */}
      {results && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
              {t('cropRecommendation.resultsTitle')}
            </h3>
            <span className="text-xs text-neutral-500">
              {t('cropRecommendation.disclaimer')}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {results.map((rec) => (
              <div 
                key={rec.crop}
                className="p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
                      {t(`crops.${rec.crop}`)}
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400">
                      {t('cropRecommendation.demoScore', { score: rec.suitabilityScore })}
                    </span>
                  </div>

                  <h4 className="text-xl font-extrabold text-neutral-900 dark:text-neutral-100 mb-1">
                    {t(`crops.${rec.crop}`)}
                  </h4>

                  <div className="space-y-1 text-xs text-neutral-600 dark:text-neutral-400 mb-4">
                    <p>{t('cropRecommendation.duration', { duration: rec.cropDuration })}</p>
                    <p>{t('cropRecommendation.waterRequirement', { water: t(`common.${rec.waterRequirement.toLowerCase()}`) })}</p>
                    <p>{t('cropRecommendation.growingSeason', { season: t(`seasons.${rec.growingSeason.toLowerCase()}`) })}</p>
                  </div>

                  <div className="space-y-2 border-t border-neutral-100 dark:border-neutral-800 pt-3">
                    <span className="text-[11px] font-bold text-neutral-700 dark:text-neutral-300 block">
                      {t('cropRecommendation.reasonsTitle')}:
                    </span>
                    <ul className="text-[11px] text-neutral-600 dark:text-neutral-400 space-y-1">
                      {rec.reasons.map((r, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800 text-[10px] text-neutral-400">
                  {t('cropRecommendation.disclaimer')}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
