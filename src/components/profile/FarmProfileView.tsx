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
  ShieldAlert
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MAHARASHTRA_DISTRICTS, ALL_CROPS } from '../../data/mockData';
import { SoilType, IrrigationAvailability, CropName, FarmerProfile } from '../../types';
import { PrototypeBanner } from '../layout/PrototypeBanner';

export const FarmProfileView: React.FC = () => {
  const { farmerProfile, updateFarmerProfile, resetFarmerProfile, showToast } = useApp();

  const [formData, setFormData] = useState<FarmerProfile>({ ...farmerProfile });
  const [hasChanges, setHasChanges] = useState(false);

  const handleFieldChange = (field: keyof FarmerProfile, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setHasChanges(true);
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

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.farmArea <= 0) {
      showToast('Farm area must be greater than 0', 'warning');
      return;
    }
    updateFarmerProfile(formData);
    setHasChanges(false);
  };

  const handleReset = () => {
    resetFarmerProfile();
    setFormData({ ...farmerProfile });
    setHasChanges(false);
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
            Farmer & Land Profile
          </h2>
        </div>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Manage your holding specifications, primary crop portfolio, and regional agro-climatic coordinates.
        </p>
      </div>

      <PrototypeBanner 
        subtext="Farmer profile is saved locally in browser storage. In production, Supabase / PostgreSQL tables will sync user land parcels with PM-Kisan & 7/12 land records."
      />

      <form onSubmit={handleSave} className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs space-y-6">
        {/* Section 1: Farmer Identity */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 mb-4">
            1. Farmer Identity & Contact
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Farmer Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleFieldChange('name', e.target.value)}
                required
                className="w-full px-3 py-2 text-xs rounded-lg bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-1 focus:ring-emerald-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Mobile Number (for SMS Alerts)
              </label>
              <input
                type="tel"
                value={formData.phone || ''}
                onChange={(e) => handleFieldChange('phone', e.target.value)}
                placeholder="+91 98XXX XXXXX"
                className="w-full px-3 py-2 text-xs rounded-lg bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-1 focus:ring-emerald-600 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Geographical Coordinates */}
        <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800">
          <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 mb-4">
            2. Landholding Geography
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
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
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                District
              </label>
              <select
                value={formData.district}
                onChange={(e) => handleFieldChange('district', e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-1 focus:ring-emerald-600 focus:outline-none"
              >
                {MAHARASHTRA_DISTRICTS.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Village / Tehsil
              </label>
              <input
                type="text"
                value={formData.village}
                onChange={(e) => handleFieldChange('village', e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-1 focus:ring-emerald-600 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Farm Holding & Agronomy */}
        <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800">
          <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 mb-4">
            3. Parcel Metrics & Agronomic Profile
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Total Arable Area (Hectares)
              </label>
              <input
                type="number"
                step="0.1"
                min="0.1"
                value={formData.farmArea}
                onChange={(e) => handleFieldChange('farmArea', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 text-xs rounded-lg bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-1 focus:ring-emerald-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Predominant Soil Class
              </label>
              <select
                value={formData.soilType}
                onChange={(e) => handleFieldChange('soilType', e.target.value as SoilType)}
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
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Primary Irrigation Setup
              </label>
              <select
                value={formData.irrigationType}
                onChange={(e) => handleFieldChange('irrigationType', e.target.value as IrrigationAvailability)}
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

        {/* Section 4: Main Crop Portfolio */}
        <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800">
          <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 mb-2">
            4. Active Crop Rotation Portfolio
          </h3>
          <p className="text-xs text-neutral-500 mb-3">
            Select the crops cultivated on your landholding for personalized alerts and dashboard feeds.
          </p>

          <div className="flex flex-wrap gap-2">
            {ALL_CROPS.map((crop) => {
              const isSelected = (formData.mainCrops || []).includes(crop);
              return (
                <button
                  key={crop}
                  type="button"
                  onClick={() => toggleCrop(crop)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-emerald-700 text-white shadow-xs font-semibold'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  <span>{crop}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Actions Bar */}
        <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Sample Profile</span>
          </button>

          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-xs sm:text-sm shadow-sm transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Save Farm Profile</span>
          </button>
        </div>
      </form>
    </div>
  );
};
