import React, { useState } from 'react';
import { 
  BarChart3, 
  Sparkles, 
  Layers
} from 'lucide-react';
import { ALL_CROPS } from '../../data/mockData';
import { CropName, SoilType, IrrigationAvailability, YieldPredictionResult } from '../../types';
import { estimateCropYield, YieldPredictionParams } from '../../services/yieldPredictionService';
import { PrototypeBanner } from '../layout/PrototypeBanner';
import { useApp } from '../../context/AppContext';

export const YieldPredictionView: React.FC = () => {
  const { farmerProfile, showToast, t } = useApp();

  const [formData, setFormData] = useState<YieldPredictionParams>({
    crop: 'Soybean',
    farmArea: farmerProfile.farmArea || 5.0,
    soilType: farmerProfile.soilType || 'Black Soil',
    irrigation: farmerProfile.irrigationType || 'Borewell / Well',
    rainfall: 850,
    temperature: 29,
    nitrogen: 75,
    phosphorus: 40,
    potassium: 35,
    season: 'Kharif',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<YieldPredictionResult | null>(null);

  const handleEstimate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.farmArea <= 0) {
      showToast(t('yieldPrediction.validationArea'), 'warning');
      return;
    }

    setIsLoading(true);
    try {
      const res = await estimateCropYield(formData);
      setResult(res);
      showToast(t('common.success'), 'success');
    } catch {
      showToast(t('common.error'), 'warning');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16 font-sans">
      {/* Title */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="p-1.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
            <BarChart3 className="w-5 h-5" />
          </span>
          <h2 className="text-2xl font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight">
            {t('yieldPrediction.title')}
          </h2>
        </div>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {t('yieldPrediction.subtitle')}
        </p>
      </div>

      <PrototypeBanner />

      {/* Input Form */}
      <div className="p-5 sm:p-7 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs">
        <form onSubmit={handleEstimate} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                {t('yieldPrediction.crop')}
              </label>
              <select
                value={formData.crop}
                onChange={(e) => setFormData({ ...formData, crop: e.target.value as CropName })}
                className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-1 focus:ring-emerald-600 focus:outline-none"
              >
                {ALL_CROPS.map((c) => (
                  <option key={c} value={c}>{t(`crops.${c}`)}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                {t('yieldPrediction.farmArea')}
              </label>
              <input
                type="number"
                step="0.1"
                min="0.1"
                value={formData.farmArea}
                onChange={(e) => setFormData({ ...formData, farmArea: parseFloat(e.target.value) || 0 })}
                className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-1 focus:ring-emerald-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                {t('yieldPrediction.soilType')}
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
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                {t('yieldPrediction.season')}
              </label>
              <select
                value={formData.season}
                onChange={(e) => setFormData({ ...formData, season: e.target.value as any })}
                className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-1 focus:ring-emerald-600 focus:outline-none"
              >
                <option value="Kharif">{t('seasons.kharif')}</option>
                <option value="Rabi">{t('seasons.rabi')}</option>
                <option value="Summer">{t('seasons.zaid')}</option>
                <option value="Annual">{t('seasons.annual')}</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                {t('yieldPrediction.irrigation')}
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

            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                {t('yieldPrediction.rainfall')}
              </label>
              <input
                type="number"
                value={formData.rainfall}
                onChange={(e) => setFormData({ ...formData, rainfall: parseFloat(e.target.value) || 0 })}
                className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-1 focus:ring-emerald-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                {t('yieldPrediction.temperature')}
              </label>
              <input
                type="number"
                value={formData.temperature}
                onChange={(e) => setFormData({ ...formData, temperature: parseFloat(e.target.value) || 0 })}
                className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-1 focus:ring-emerald-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                {t('cropRecommendation.soilSection')} (N-P-K)
              </label>
              <div className="flex gap-1.5">
                <input
                  type="number"
                  placeholder="N"
                  value={formData.nitrogen}
                  onChange={(e) => setFormData({ ...formData, nitrogen: parseFloat(e.target.value) || 0 })}
                  className="w-1/3 px-2 py-2 text-xs rounded-xl bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-center text-neutral-900 dark:text-neutral-100"
                />
                <input
                  type="number"
                  placeholder="P"
                  value={formData.phosphorus}
                  onChange={(e) => setFormData({ ...formData, phosphorus: parseFloat(e.target.value) || 0 })}
                  className="w-1/3 px-2 py-2 text-xs rounded-xl bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-center text-neutral-900 dark:text-neutral-100"
                />
                <input
                  type="number"
                  placeholder="K"
                  value={formData.potassium}
                  onChange={(e) => setFormData({ ...formData, potassium: parseFloat(e.target.value) || 0 })}
                  className="w-1/3 px-2 py-2 text-xs rounded-xl bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-center text-neutral-900 dark:text-neutral-100"
                />
              </div>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-xs sm:text-sm shadow-sm transition-all disabled:opacity-50 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isLoading ? t('yieldPrediction.calculating') : t('yieldPrediction.estimateBtn')}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Output Results */}
      {result && (
        <div className="space-y-4 animate-in fade-in duration-300">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs">
              <span className="text-xs text-neutral-500 block mb-1">
                {t('yieldPrediction.yieldPerHa')}
              </span>
              <p className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-800 dark:text-emerald-300 tabular-nums">
                {result.estimatedYieldPerHectare} <span className="text-sm font-sans font-medium text-neutral-500">{t('common.tonnes')}/Ha</span>
              </p>
              <span className="text-[11px] text-neutral-400">{t('yieldPrediction.resultsTitle')}</span>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs">
              <span className="text-xs text-neutral-500 block mb-1">
                {t('yieldPrediction.totalProduction')}
              </span>
              <p className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-800 dark:text-emerald-300 tabular-nums">
                {result.estimatedTotalProduction} <span className="text-sm font-sans font-medium text-neutral-500">{t('common.tonnes')}</span>
              </p>
              <span className="text-[11px] text-neutral-400">{result.farmArea} {t('common.hectares')}</span>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs">
              <span className="text-xs text-neutral-500 block mb-1">
                {t('yieldPrediction.expectedRange', { min: result.minExpectedProduction, max: result.maxExpectedProduction })}
              </span>
              <p className="text-2xl sm:text-3xl font-extrabold font-mono text-neutral-800 dark:text-neutral-200 tabular-nums">
                {result.minExpectedProduction} – {result.maxExpectedProduction} <span className="text-sm font-sans font-medium text-neutral-500">{t('common.tonnes')}</span>
              </p>
              <span className="text-[11px] text-neutral-400">{t('common.optimal')}</span>
            </div>
          </div>

          {/* Factor Breakdown */}
          <div className="p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs">
            <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 mb-3">
              {t('yieldPrediction.resultsTitle')}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="font-semibold text-emerald-800 dark:text-emerald-400 block mb-1.5">
                  {t('yieldPrediction.positiveDrivers')}:
                </span>
                <ul className="space-y-1 list-disc list-inside text-neutral-600 dark:text-neutral-300">
                  {result.positiveFactors.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="font-semibold text-amber-800 dark:text-amber-400 block mb-1.5">
                  {t('yieldPrediction.limitingFactors')}:
                </span>
                <ul className="space-y-1 list-disc list-inside text-neutral-600 dark:text-neutral-300">
                  {result.limitingFactors.length > 0 ? (
                    result.limitingFactors.map((f, i) => <li key={i}>{f}</li>)
                  ) : (
                    <li>{t('common.optimal')}</li>
                  )}
                </ul>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800 text-[11px] text-neutral-400">
              {t('yieldPrediction.modelDisclaimer')}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
