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
  const { farmerProfile, showToast } = useApp();

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
      showToast('Crop suitability analysis completed', 'success');
    } catch {
      showToast('Unable to process recommendation model', 'warning');
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
    showToast('Form reset to standard Maharashtra baseline', 'info');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Title & Introduction */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
            <Leaf className="w-5 h-5" />
          </span>
          <h2 className="text-2xl font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight">
            AI Crop Recommendation
          </h2>
        </div>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Match your soil mineral chemistry, regional rainfall patterns, and seasonal conditions with agronomic suitability.
        </p>
      </div>

      <PrototypeBanner 
        subtext="Prototype recommendation — trained Random Forest / XGBoost model will be connected in future backend. Scores represent demo suitability calculations based on Maharashtra agro-ecological norms."
      />

      {/* Main Form */}
      <div className="p-5 sm:p-7 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs">
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-neutral-100 dark:border-neutral-800">
          <div>
            <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
              Farm & Soil Parameters
            </h3>
            <p className="text-xs text-neutral-500">
              Enter your soil test report values (NPK, pH) and micro-climate conditions.
            </p>
          </div>
          <button
            type="button"
            onClick={handleResetDefaults}
            className="flex items-center gap-1.5 text-xs text-neutral-600 dark:text-neutral-400 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>
        </div>

        <form onSubmit={handleRunRecommendation} className="space-y-6">
          {/* Section 1: Location & Land Details */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 mb-3">
              1. Location & Holding
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  State
                </label>
                <input
                  type="text"
                  value={formData.state}
                  disabled
                  className="w-full px-3 py-2 text-xs rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  District
                </label>
                <select
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-1 focus:ring-emerald-600 focus:outline-none"
                >
                  {MAHARASHTRA_DISTRICTS.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Village / Tehsil
                </label>
                <input
                  type="text"
                  value={formData.village}
                  onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                  placeholder="e.g. Baramati"
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-1 focus:ring-emerald-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Farm Area (Hectares)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  value={formData.farmArea}
                  onChange={(e) => setFormData({ ...formData, farmArea: parseFloat(e.target.value) || 0 })}
                  className={`w-full px-3 py-2 text-xs rounded-lg bg-white dark:bg-neutral-800 border text-neutral-900 dark:text-neutral-100 focus:outline-none ${
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
              2. Soil Characteristics & Chemistry (Soil Health Card)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
              <div>
                <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Soil Type
                </label>
                <select
                  value={formData.soilType}
                  onChange={(e) => setFormData({ ...formData, soilType: e.target.value as SoilType })}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-1 focus:ring-emerald-600 focus:outline-none"
                >
                  <option value="Black Soil">Black Soil (Vertisol)</option>
                  <option value="Red Soil">Red Soil</option>
                  <option value="Alluvial Soil">Alluvial Soil</option>
                  <option value="Laterite Soil">Laterite Soil</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Nitrogen (N) <span className="text-[10px] text-neutral-400">kg/ha</span>
                </label>
                <input
                  type="number"
                  value={formData.nitrogen}
                  onChange={(e) => setFormData({ ...formData, nitrogen: parseFloat(e.target.value) || 0 })}
                  className={`w-full px-3 py-2 text-xs rounded-lg bg-white dark:bg-neutral-800 border text-neutral-900 dark:text-neutral-100 focus:outline-none ${
                    validationErrors.nitrogen ? 'border-red-500' : 'border-neutral-300 dark:border-neutral-700 focus:ring-1 focus:ring-emerald-600'
                  }`}
                />
                {validationErrors.nitrogen && (
                  <p className="text-[10px] text-red-500 mt-1">{validationErrors.nitrogen}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Phosphorus (P) <span className="text-[10px] text-neutral-400">kg/ha</span>
                </label>
                <input
                  type="number"
                  value={formData.phosphorus}
                  onChange={(e) => setFormData({ ...formData, phosphorus: parseFloat(e.target.value) || 0 })}
                  className={`w-full px-3 py-2 text-xs rounded-lg bg-white dark:bg-neutral-800 border text-neutral-900 dark:text-neutral-100 focus:outline-none ${
                    validationErrors.phosphorus ? 'border-red-500' : 'border-neutral-300 dark:border-neutral-700 focus:ring-1 focus:ring-emerald-600'
                  }`}
                />
                {validationErrors.phosphorus && (
                  <p className="text-[10px] text-red-500 mt-1">{validationErrors.phosphorus}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Potassium (K) <span className="text-[10px] text-neutral-400">kg/ha</span>
                </label>
                <input
                  type="number"
                  value={formData.potassium}
                  onChange={(e) => setFormData({ ...formData, potassium: parseFloat(e.target.value) || 0 })}
                  className={`w-full px-3 py-2 text-xs rounded-lg bg-white dark:bg-neutral-800 border text-neutral-900 dark:text-neutral-100 focus:outline-none ${
                    validationErrors.potassium ? 'border-red-500' : 'border-neutral-300 dark:border-neutral-700 focus:ring-1 focus:ring-emerald-600'
                  }`}
                />
                {validationErrors.potassium && (
                  <p className="text-[10px] text-red-500 mt-1">{validationErrors.potassium}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Soil pH <span className="text-[10px] text-neutral-400">(4.0 - 9.0)</span>
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.ph}
                  onChange={(e) => setFormData({ ...formData, ph: parseFloat(e.target.value) || 0 })}
                  className={`w-full px-3 py-2 text-xs rounded-lg bg-white dark:bg-neutral-800 border text-neutral-900 dark:text-neutral-100 focus:outline-none ${
                    validationErrors.ph ? 'border-red-500' : 'border-neutral-300 dark:border-neutral-700 focus:ring-1 focus:ring-emerald-600'
                  }`}
                />
                {validationErrors.ph && (
                  <p className="text-[10px] text-red-500 mt-1">{validationErrors.ph}</p>
                )}
              </div>
            </div>
          </div>

          {/* Section 3: Weather, Irrigation & Timing */}
          <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 mb-3">
              3. Climate & Water Availability
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
              <div>
                <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Avg Temperature (°C)
                </label>
                <input
                  type="number"
                  value={formData.temperature}
                  onChange={(e) => setFormData({ ...formData, temperature: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-1 focus:ring-emerald-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Humidity (%)
                </label>
                <input
                  type="number"
                  value={formData.humidity}
                  onChange={(e) => setFormData({ ...formData, humidity: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-1 focus:ring-emerald-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Expected Rainfall (mm)
                </label>
                <input
                  type="number"
                  value={formData.rainfall}
                  onChange={(e) => setFormData({ ...formData, rainfall: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-1 focus:ring-emerald-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Planning Month
                </label>
                <select
                  value={formData.month}
                  onChange={(e) => setFormData({ ...formData, month: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-1 focus:ring-emerald-600 focus:outline-none"
                >
                  {MONTHS.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Irrigation Availability
                </label>
                <select
                  value={formData.irrigation}
                  onChange={(e) => setFormData({ ...formData, irrigation: e.target.value as IrrigationAvailability })}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-1 focus:ring-emerald-600 focus:outline-none"
                >
                  <option value="Perennial / Ample">Perennial / Ample</option>
                  <option value="Seasonal / Canal">Seasonal / Canal</option>
                  <option value="Borewell / Well">Borewell / Well</option>
                  <option value="Rainfed Only">Rainfed Only</option>
                </select>
              </div>
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-2 flex items-center justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-sm shadow-sm transition-all disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isLoading ? 'Synthesizing Agronomic Model...' : 'Get AI Crop Recommendation'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Results Section */}
      {results && (
        <div className="space-y-4 animate-in fade-in duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                Recommended Crops
              </h3>
              <p className="text-xs text-neutral-500">
                Ranked by demo suitability score based on your soil profile and climate inputs.
              </p>
            </div>
            <div className="text-xs text-neutral-500">
              Showing top 5 agronomic matches
            </div>
          </div>

          <div className="space-y-4">
            {results.map((cropItem, idx) => (
              <div
                key={cropItem.crop}
                className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 transition-all hover:border-emerald-500/50"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-extrabold text-sm flex items-center justify-center font-mono">
                      {idx + 1}
                    </span>
                    <div>
                      <h4 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                        {cropItem.crop}
                      </h4>
                      <p className="text-xs text-neutral-500">
                        Season: {cropItem.growingSeason} · Duration: {cropItem.cropDuration}
                      </p>
                    </div>
                  </div>

                  {/* Suitability score without fake percentage */}
                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <div className="text-right">
                      <span className="text-[11px] text-neutral-400 block leading-tight">Demo Suitability Score</span>
                      <span className="text-base font-extrabold text-emerald-800 dark:text-emerald-400 font-mono tabular-nums">
                        {cropItem.suitabilityScore} / 100
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                      {cropItem.suitabilityLevel}
                    </span>
                  </div>
                </div>

                {/* Key metadata grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/40 text-xs mb-3">
                  <div>
                    <span className="text-neutral-400 block text-[11px]">Water Requirement</span>
                    <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                      {cropItem.waterRequirement}
                    </span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block text-[11px]">Suitable Soil Type</span>
                    <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                      {cropItem.suitableSoil}
                    </span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block text-[11px]">Growing Season</span>
                    <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                      {cropItem.growingSeason}
                    </span>
                  </div>
                </div>

                {/* Why it is suitable */}
                <div className="space-y-1.5 text-xs text-neutral-700 dark:text-neutral-300 mb-3">
                  <span className="font-semibold text-neutral-900 dark:text-neutral-100 block">
                    Agronomic Suitability Factors:
                  </span>
                  <ul className="list-disc list-inside space-y-1 pl-1">
                    {cropItem.reasons.map((r, rIdx) => (
                      <li key={rIdx}>{r}</li>
                    ))}
                  </ul>
                </div>

                {/* Key risks */}
                <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 text-[11px] text-amber-800 dark:text-amber-300/90">
                  <span className="font-semibold">Agronomic Attention Points: </span>
                  {cropItem.keyRisks.join(' ')}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-neutral-100 dark:bg-neutral-800/50 text-xs text-neutral-500 text-center">
            “Prototype recommendation — trained Random Forest / XGBoost model will be connected in future backend. Field testing and soil moisture profiling recommended before commercial planting.”
          </div>
        </div>
      )}
    </div>
  );
};
