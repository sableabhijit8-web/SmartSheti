import React, { useState } from 'react';
import { 
  User, 
  MapPin, 
  Layers, 
  Droplets, 
  Check, 
  RotateCcw, 
  Save, 
  FileCheck,
  ChevronRight,
  ChevronLeft,
  Sprout,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MAHARASHTRA_DISTRICTS, ALL_CROPS } from '../../data/mockData';
import { SoilType, IrrigationAvailability, CropName, FarmerProfile } from '../../types';
import { PrototypeBanner } from '../layout/PrototypeBanner';

const STEPS = [
  { id: 1, name: 'Location' },
  { id: 2, name: 'Holding' },
  { id: 3, name: 'Soil Profile' },
  { id: 4, name: 'Water & Irrigation' },
  { id: 5, name: 'Crop Portfolio' },
  { id: 6, name: 'Review & Complete' },
];

export const FarmProfileView: React.FC = () => {
  const { farmerProfile, updateFarmerProfile, resetFarmerProfile, showToast, setActiveTab } = useApp();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<FarmerProfile>({ ...farmerProfile });
  const [previousCrop, setPreviousCrop] = useState<CropName>('Wheat');

  const handleFieldChange = (field: keyof FarmerProfile, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleCrop = (crop: CropName) => {
    const current = formData.mainCrops || [];
    let updated: CropName[];
    if (current.includes(crop)) {
      if (current.length === 1) {
        showToast('At least one primary crop must remain selected', 'warning');
        return;
      }
      updated = current.filter((c) => c !== crop);
    } else {
      updated = [...current, crop];
    }
    handleFieldChange('mainCrops', updated);
  };

  const nextStep = () => {
    if (currentStep === 1 && !formData.name.trim()) {
      showToast('Please enter farmer name', 'warning');
      return;
    }
    if (currentStep === 2 && formData.farmArea <= 0) {
      showToast('Farm size must be greater than 0', 'warning');
      return;
    }
    setCurrentStep((prev) => Math.min(6, prev + 1));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  const handleComplete = (e: React.FormEvent) => {
    e.preventDefault();
    updateFarmerProfile(formData);
    showToast('Farm profile verified and saved to memory!', 'success');
  };

  const handleReset = () => {
    resetFarmerProfile();
    setFormData({ ...farmerProfile });
    setCurrentStep(1);
    showToast('Reset to baseline progressive farmer profile', 'info');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-16">
      {/* Title */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
            <User className="w-5 h-5" />
          </span>
          <h2 className="text-2xl font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight">
            Farmer Profile & Farm Onboarding
          </h2>
        </div>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          A step-by-step setup ensuring customized AI predictions, irrigation thresholds, and mandi price tracking for your holding.
        </p>
      </div>

      <PrototypeBanner 
        subtext="Farmer profile is stored locally in browser memory and ready for Cloud SQL / Supabase sync. Data personalizes all decision-support models."
      />

      {/* Progress Step Header */}
      <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
            Step {currentStep} of 6: <strong className="text-neutral-900 dark:text-neutral-100">{STEPS[currentStep - 1].name}</strong>
          </span>
          <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400">
            {Math.round((currentStep / 6) * 100)}% Completed
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 rounded-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
          <div 
            className="h-full bg-emerald-600 transition-all duration-300 rounded-full"
            style={{ width: `${(currentStep / 6) * 100}%` }}
          />
        </div>

        {/* Step dots */}
        <div className="hidden sm:grid grid-cols-6 gap-2 mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800 text-[11px]">
          {STEPS.map((s) => (
            <button
              key={s.id}
              onClick={() => setCurrentStep(s.id)}
              className={`text-left py-1 transition-colors ${
                currentStep === s.id
                  ? 'text-emerald-800 dark:text-emerald-300 font-bold'
                  : currentStep > s.id
                  ? 'text-neutral-700 dark:text-neutral-300'
                  : 'text-neutral-400'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                  currentStep === s.id
                    ? 'bg-emerald-700 text-white'
                    : currentStep > s.id
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-neutral-200 text-neutral-600'
                }`}>
                  {s.id}
                </span>
                <span className="truncate">{s.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Step Form Container */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs space-y-6">
        {/* Step 1: Location & Identity */}
        {currentStep === 1 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100 pb-2 border-b border-neutral-100 dark:border-neutral-800">
              Step 1: Farmer Identity & Geographical Location
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Farmer Full Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleFieldChange('name', e.target.value)}
                  placeholder="e.g. Abhijit Sable"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Mobile Number (SMS alerts)
                </label>
                <input
                  type="tel"
                  value={formData.phone || ''}
                  onChange={(e) => handleFieldChange('phone', e.target.value)}
                  placeholder="+91 98XXX XXXXX"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  State
                </label>
                <input
                  type="text"
                  value={formData.state}
                  disabled
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-500 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  District *
                </label>
                <select
                  value={formData.district}
                  onChange={(e) => handleFieldChange('district', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                >
                  {MAHARASHTRA_DISTRICTS.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Village / Tehsil
                </label>
                <input
                  type="text"
                  value={formData.village}
                  onChange={(e) => handleFieldChange('village', e.target.value)}
                  placeholder="e.g. Baramati"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Farm Details */}
        {currentStep === 2 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100 pb-2 border-b border-neutral-100 dark:border-neutral-800">
              Step 2: Farm Size & Holding Geometry
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Total Arable Land Area (Hectares) *
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  value={formData.farmArea}
                  onChange={(e) => handleFieldChange('farmArea', parseFloat(e.target.value) || 0)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-emerald-600 font-mono tabular-nums"
                />
                <p className="text-[11px] text-neutral-400 mt-1">
                  Equivalent to approximately {(formData.farmArea * 2.471).toFixed(2)} Acres / {(formData.farmArea * 98.84).toFixed(0)} Gunthas
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Holding Category
                </label>
                <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 text-xs">
                  <span className="font-bold text-neutral-900 dark:text-neutral-100 block mb-0.5">
                    {formData.farmArea <= 2 ? 'Small / Marginal Holder (< 2 Ha)' : formData.farmArea <= 10 ? 'Semi-Medium / Medium Farm (2 – 10 Ha)' : 'Large Farm Holding (> 10 Ha)'}
                  </span>
                  <p className="text-[11px] text-neutral-500">
                    Targeted agronomic policies and custom-hiring mechanization recommendations adjust accordingly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Soil Profile */}
        {currentStep === 3 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100 pb-2 border-b border-neutral-100 dark:border-neutral-800">
              Step 3: Soil Classification & Health Card
            </h3>
            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                Primary Soil Class on Farm Parcel:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { type: 'Black Soil' as SoilType, desc: 'Deep Vertisol with high clay content; superior moisture retention capacity.' },
                  { type: 'Red Soil' as SoilType, desc: 'Well-drained porous sandy-loam texture; suitable for groundnut and pulses.' },
                  { type: 'Alluvial Soil' as SoilType, desc: 'Fertile river basin silt loam; optimal for intensive wheat and sugarcane.' },
                  { type: 'Laterite Soil' as SoilType, desc: 'Porous acidic soil; requires organic matter and phosphorus supplementation.' },
                ].map((s) => (
                  <button
                    key={s.type}
                    type="button"
                    onClick={() => handleFieldChange('soilType', s.type)}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      formData.soilType === s.type
                        ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 ring-1 ring-emerald-600'
                        : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300'
                    }`}
                  >
                    <span className="text-xs font-bold block">{s.type}</span>
                    <span className="text-[11px] text-neutral-500 mt-0.5 block">{s.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Water & Irrigation */}
        {currentStep === 4 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100 pb-2 border-b border-neutral-100 dark:border-neutral-800">
              Step 4: Water Availability & Irrigation Infrastructure
            </h3>
            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                Water Source & Reliability:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { type: 'Borewell / Well' as IrrigationAvailability, title: 'Borewell / Open Well', desc: 'On-farm groundwater source with electric/solar pump.' },
                  { type: 'Seasonal / Canal' as IrrigationAvailability, title: 'Canal / Lift Irrigation', desc: 'Government canal rotation or cooperative river lift scheme.' },
                  { type: 'Perennial / Ample' as IrrigationAvailability, title: 'Perennial Unlimited', desc: 'Ample round-the-year reservoir or river connection.' },
                  { type: 'Rainfed Only' as IrrigationAvailability, title: 'Dryland Rainfed', desc: 'Dependent strictly on monsoon precipitation.' },
                ].map((w) => (
                  <button
                    key={w.type}
                    type="button"
                    onClick={() => handleFieldChange('irrigationType', w.type)}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      formData.irrigationType === w.type
                        ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 ring-1 ring-emerald-600'
                        : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300'
                    }`}
                  >
                    <span className="text-xs font-bold block">{w.title}</span>
                    <span className="text-[11px] text-neutral-500 mt-0.5 block">{w.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Crop Portfolio */}
        {currentStep === 5 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100 pb-2 border-b border-neutral-100 dark:border-neutral-800">
              Step 5: Active Crop Rotation Portfolio
            </h3>
            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                Select Current and Preferred Crops for Your Land:
              </label>
              <div className="flex flex-wrap gap-2">
                {ALL_CROPS.map((crop) => {
                  const isSelected = (formData.mainCrops || []).includes(crop);
                  return (
                    <button
                      key={crop}
                      type="button"
                      onClick={() => toggleCrop(crop)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-emerald-700 text-white shadow-xs'
                          : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      <span>{crop}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Previous Season Crop (Rotational Precursor):
                </label>
                <select
                  value={previousCrop}
                  onChange={(e) => setPreviousCrop(e.target.value as CropName)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100"
                >
                  {ALL_CROPS.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 text-xs text-emerald-800 dark:text-emerald-300 flex items-center">
                Legume-cereal rotation (e.g. Soybean followed by Wheat/Chickpea) reduces fertilizer expenditure by ~18%.
              </div>
            </div>
          </div>
        )}

        {/* Step 6: Review & Confirmation */}
        {currentStep === 6 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100 pb-2 border-b border-neutral-100 dark:border-neutral-800">
              Step 6: Review & Finalize Farm Dossier
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/40 text-xs border border-neutral-200/80 dark:border-neutral-700/60">
              <div>
                <span className="text-neutral-400 block text-[11px]">Farmer</span>
                <span className="font-bold text-neutral-900 dark:text-neutral-100">{formData.name}</span>
              </div>
              <div>
                <span className="text-neutral-400 block text-[11px]">Location</span>
                <span className="font-bold text-neutral-900 dark:text-neutral-100">{formData.village}, {formData.district}</span>
              </div>
              <div>
                <span className="text-neutral-400 block text-[11px]">Farm Area</span>
                <span className="font-bold text-neutral-900 dark:text-neutral-100 font-mono tabular-nums">{formData.farmArea} Ha</span>
              </div>
              <div>
                <span className="text-neutral-400 block text-[11px]">Soil Type</span>
                <span className="font-bold text-neutral-900 dark:text-neutral-100">{formData.soilType}</span>
              </div>
              <div className="col-span-2">
                <span className="text-neutral-400 block text-[11px]">Irrigation Setup</span>
                <span className="font-bold text-neutral-900 dark:text-neutral-100">{formData.irrigationType}</span>
              </div>
              <div className="col-span-2">
                <span className="text-neutral-400 block text-[11px]">Selected Crops</span>
                <span className="font-bold text-neutral-900 dark:text-neutral-100">{formData.mainCrops.join(', ')}</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-xs text-emerald-800 dark:text-emerald-300 flex items-start gap-2.5">
              <ShieldCheck className="w-5 h-5 shrink-0 text-emerald-600 mt-0.5" />
              <div>
                <span className="font-bold block mb-0.5">Profile Ready for Decision Support Engine</span>
                <p className="leading-relaxed">
                  Clicking "Save Farm Profile" will recalibrate all crop suitability scores, soil moisture thresholds, and mandi distance realizations across KrushiAI.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Wizard Navigation Buttons */}
        <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
          <div>
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                className="px-4 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center gap-1.5 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleReset}
                className="text-xs text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to Sample</span>
              </button>
            )}
          </div>

          <div>
            {currentStep < 6 ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs sm:text-sm font-semibold shadow-xs flex items-center gap-1.5 transition-colors"
              >
                <span>Next: {STEPS[currentStep].name}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleComplete}
                className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs sm:text-sm font-semibold shadow-xs flex items-center gap-1.5 transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>Save Farm Profile</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
