import React, { useState, useEffect } from 'react';
import { 
  Droplets, 
  Cpu
} from 'lucide-react';
import { ALL_CROPS } from '../../data/mockData';
import { CropName, SoilType, IrrigationRecommendation } from '../../types';
import { getIrrigationAdvice, IrrigationParams } from '../../services/irrigationService';
import { PrototypeBanner } from '../layout/PrototypeBanner';
import { useApp } from '../../context/AppContext';

export const IrrigationView: React.FC = () => {
  const { farmerProfile, showToast, t } = useApp();

  const [formData, setFormData] = useState<IrrigationParams>({
    crop: 'Soybean',
    soilType: farmerProfile.soilType || 'Black Soil',
    growthStage: 'Pod / Grain Filling',
    temperature: 29.5,
    rainfall: 14.0,
    humidity: 65,
    farmArea: farmerProfile.farmArea || 5.0,
    daysSinceLastIrrigation: 6,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [advice, setAdvice] = useState<IrrigationRecommendation | null>(null);

  const calculateAdvice = async () => {
    setIsLoading(true);
    try {
      const res = await getIrrigationAdvice(formData);
      setAdvice(res);
    } catch {
      showToast(t('common.error'), 'warning');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    calculateAdvice();
  }, [formData]);

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16 font-sans">
      {/* Title */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="p-1.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
            <Droplets className="w-5 h-5" />
          </span>
          <h2 className="text-2xl font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight">
            {t('irrigation.title')}
          </h2>
        </div>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {t('irrigation.subtitle')}
        </p>
      </div>

      <PrototypeBanner />

      {/* Main Grid: Form Inputs (7 cols) + Visual Soil Moisture Gauge (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form Inputs */}
        <div className="lg:col-span-7 p-5 sm:p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 pb-2 border-b border-neutral-100 dark:border-neutral-800">
            {t('irrigation.currentParams')}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                {t('irrigation.crop')}
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
                {t('irrigation.soil')}
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
                {t('irrigation.growthStage')}
              </label>
              <select
                value={formData.growthStage}
                onChange={(e) => setFormData({ ...formData, growthStage: e.target.value as any })}
                className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-1 focus:ring-emerald-600 focus:outline-none"
              >
                <option value="Initial / Germination">{t('irrigation.stages.vegetative')}</option>
                <option value="Vegetative">{t('irrigation.stages.vegetative')}</option>
                <option value="Flowering / Blossom">{t('irrigation.stages.flowering')}</option>
                <option value="Pod / Grain Filling">{t('irrigation.stages.podFilling')}</option>
                <option value="Maturity / Senescence">{t('irrigation.stages.maturity')}</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                {t('irrigation.daysSinceLast')}
              </label>
              <input
                type="number"
                min="0"
                max="60"
                value={formData.daysSinceLastIrrigation}
                onChange={(e) => setFormData({ ...formData, daysSinceLastIrrigation: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-1 focus:ring-emerald-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
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
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                {t('cropRecommendation.rainfall')} (48h)
              </label>
              <input
                type="number"
                value={formData.rainfall}
                onChange={(e) => setFormData({ ...formData, rainfall: parseFloat(e.target.value) || 0 })}
                className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-1 focus:ring-emerald-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-2 text-[11px] text-neutral-500">
            {t('irrigation.et0Desc', { et0: 4.8 })}
          </div>
        </div>

        {/* Visual Soil Moisture Meter & Status Card */}
        <div className="lg:col-span-5 p-5 sm:p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                {t('irrigation.moistureGaugeTitle')}
              </h3>
              <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
                {t('common.prototypeTag')}
              </span>
            </div>

            {advice && (
              <div className="flex flex-col items-center justify-center my-3">
                {/* Circular Gauge Graphic */}
                <div className="relative w-44 h-44 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                    <circle
                      cx="60"
                      cy="60"
                      r="48"
                      className="stroke-neutral-200 dark:stroke-neutral-800 fill-none"
                      strokeWidth="10"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="48"
                      className={`fill-none transition-all duration-700 ${
                        advice.soilMoisturePercent < 35 
                          ? 'stroke-red-500' 
                          : advice.soilMoisturePercent < 55 
                          ? 'stroke-amber-500' 
                          : 'stroke-emerald-600'
                      }`}
                      strokeWidth="10"
                      strokeDasharray={301.6}
                      strokeDashoffset={301.6 - (301.6 * advice.soilMoisturePercent) / 100}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center text-center">
                    <span className="text-3xl font-extrabold font-mono text-neutral-900 dark:text-neutral-100 tabular-nums">
                      {advice.soilMoisturePercent}%
                    </span>
                    <span className="text-[10px] uppercase font-semibold text-neutral-400 tracking-wider">
                      {t('dashboard.soilConditionTitle')}
                    </span>
                  </div>
                </div>

                {/* Status pill */}
                <div className="mt-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-extrabold ${
                    advice.irrigationStatus === 'Recommended'
                      ? 'bg-amber-100 text-amber-900 dark:bg-amber-950/60 dark:text-amber-200 border border-amber-300 dark:border-amber-800'
                      : advice.irrigationStatus === 'Monitor'
                      ? 'bg-sky-100 text-sky-900 dark:bg-sky-950/60 dark:text-sky-200 border border-sky-300 dark:border-sky-800'
                      : 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-800'
                  }`}>
                    {t('common.status')}: {t(`common.${advice.irrigationStatus.toLowerCase()}`)}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Metrics */}
          {advice && (
            <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-neutral-500">{t('cropRecommendation.waterRequirement', { water: '' }).replace(':', '')}:</span>
                <span className="font-semibold text-neutral-800 dark:text-neutral-200">{t(`common.${advice.waterRequirement.toLowerCase()}`)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">{t('irrigation.nextIrrigation', { window: '' }).replace(':', '')}:</span>
                <span className="font-semibold text-emerald-700 dark:text-emerald-400">{t('dashboard.inDays', { days: 2 })}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">{t('dashboard.soilConditionTitle')}:</span>
                <span className="font-medium text-neutral-700 dark:text-neutral-300">{t('common.optimal')}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Advisory Action Card */}
      {advice && (
        <div className="p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs">
          <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 mb-2">
            {t('irrigation.statusTitle')}
          </h4>
          <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4">
            {advice.irrigationStatus === 'Hold' ? t('irrigation.holdAdvice') : t('irrigation.applyAdvice')}
          </p>

          <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200/60 dark:border-neutral-700/60 text-xs flex items-start gap-2.5">
            <Cpu className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-neutral-900 dark:text-neutral-100 block mb-0.5">
                {t('common.simulatedInference')}
              </span>
              <p className="text-[11px] text-neutral-500 leading-relaxed">
                {t('common.liveRoadmap')}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
