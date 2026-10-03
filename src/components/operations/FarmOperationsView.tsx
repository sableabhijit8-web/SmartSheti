import React, { useState } from 'react';
import { 
  Tractor, 
  Users, 
  Layers, 
  Clock, 
  AlertCircle, 
  Info, 
  CheckCircle2, 
  Sparkles,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { FARM_OPERATION_SPECS, ALL_CROPS } from '../../data/mockData';
import { CropName, SoilType } from '../../types';
import { PrototypeBanner } from '../layout/PrototypeBanner';
import { useApp } from '../../context/AppContext';

export const FarmOperationsView: React.FC = () => {
  const { farmerProfile, showToast } = useApp();

  const [selectedCrop, setSelectedCrop] = useState<CropName>('Soybean');
  const [selectedSoil, setSelectedSoil] = useState<SoilType>(farmerProfile.soilType || 'Black Soil');
  const [farmArea, setFarmArea] = useState<number>(farmerProfile.farmArea || 5.0);
  const [mechanizationLevel, setMechanizationLevel] = useState<'Manual' | 'Semi-Mechanized' | 'Fully Mechanized'>('Semi-Mechanized');

  const spec = FARM_OPERATION_SPECS[selectedCrop] || FARM_OPERATION_SPECS.Soybean;

  // Mechanization multiplier
  const mechMultiplier = 
    mechanizationLevel === 'Manual' ? 1.35 : mechanizationLevel === 'Semi-Mechanized' ? 1.0 : 0.45;

  const sowingLabour = Math.round(spec.labourPerHectare.sowingDays * farmArea * mechMultiplier);
  const weedingLabour = Math.round(spec.labourPerHectare.weedingDays * farmArea * mechMultiplier);
  const sprayingLabour = Math.round(spec.labourPerHectare.sprayingDays * farmArea * mechMultiplier);
  const harvestLabour = Math.round(spec.labourPerHectare.harvestDays * farmArea * mechMultiplier);
  const totalLabour = sowingLabour + weedingLabour + sprayingLabour + harvestLabour;

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Title */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
            <Tractor className="w-5 h-5" />
          </span>
          <h2 className="text-2xl font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight">
            Farm Operations & Labour Management
          </h2>
        </div>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Standardized spacing geometry, agronomic tillage guidelines, and interactive human-labour requirement planning.
        </p>
      </div>

      <PrototypeBanner 
        subtext="Prototype estimate — precise seed-drill calibrations, local tractor custom-hiring tariffs, and variety-specific tillage depths require verified reference data from your district extension office."
      />

      {/* Configuration Strip */}
      <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
              Select Crop
            </label>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value as CropName)}
              className="w-full px-3 py-2 text-xs rounded-lg bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-1 focus:ring-emerald-600 focus:outline-none"
            >
              {ALL_CROPS.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
              Soil Type
            </label>
            <select
              value={selectedSoil}
              onChange={(e) => setSelectedSoil(e.target.value as SoilType)}
              className="w-full px-3 py-2 text-xs rounded-lg bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-1 focus:ring-emerald-600 focus:outline-none"
            >
              <option value="Black Soil">Black Soil</option>
              <option value="Red Soil">Red Soil</option>
              <option value="Alluvial Soil">Alluvial Soil</option>
              <option value="Laterite Soil">Laterite Soil</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
              Farm Area (Hectares)
            </label>
            <input
              type="number"
              step="0.5"
              min="0.5"
              value={farmArea}
              onChange={(e) => setFarmArea(Math.max(0.1, parseFloat(e.target.value) || 1))}
              className="w-full px-3 py-2 text-xs rounded-lg bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-1 focus:ring-emerald-600 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Geometry & Tillage Specs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs">
          <span className="text-xs text-neutral-500 block mb-1">Standard Row Spacing</span>
          <p className="text-xl sm:text-2xl font-bold font-mono text-neutral-900 dark:text-neutral-100 tabular-nums">
            {spec.rowSpacingCm}
          </p>
          <span className="text-[11px] text-neutral-400">Inter-row tractor / bullock clearance</span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs">
          <span className="text-xs text-neutral-500 block mb-1">Intra-Row Plant Spacing</span>
          <p className="text-xl sm:text-2xl font-bold font-mono text-neutral-900 dark:text-neutral-100 tabular-nums">
            {spec.plantSpacingCm}
          </p>
          <span className="text-[11px] text-neutral-400">Canopy aeration and plant population</span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs">
          <span className="text-xs text-neutral-500 block mb-1">Tillage Guidelines</span>
          <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed font-medium">
            {spec.tillageInfo}
          </p>
          <span className="text-[10px] text-amber-700 dark:text-amber-400 mt-2 block">
            Exact pan depth: Reference data required
          </span>
        </div>
      </div>

      {/* Interactive Labour Estimator */}
      <div className="p-5 sm:p-7 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-100 dark:border-neutral-800">
          <div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-emerald-600" />
              <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                Farm Labour Estimator
              </h3>
            </div>
            <p className="text-xs text-neutral-500">
              Calculate seasonal person-day manpower requirements based on holding size and mechanization level.
            </p>
          </div>

          {/* Mechanization Level Toggle */}
          <div className="flex items-center gap-1 p-1 bg-neutral-100 dark:bg-neutral-800 rounded-lg self-start sm:self-auto">
            {(['Manual', 'Semi-Mechanized', 'Fully Mechanized'] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setMechanizationLevel(lvl)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  mechanizationLevel === lvl
                    ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 shadow-xs font-bold'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Labour Breakdown Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-100 dark:border-neutral-700/60">
            <span className="text-[11px] text-neutral-500 block mb-0.5">Sowing & Bed Prep</span>
            <p className="text-lg sm:text-xl font-bold font-mono text-neutral-900 dark:text-neutral-100 tabular-nums">
              {sowingLabour} <span className="text-xs font-normal text-neutral-400">days</span>
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-100 dark:border-neutral-700/60">
            <span className="text-[11px] text-neutral-500 block mb-0.5">Weeding & Inter-culture</span>
            <p className="text-lg sm:text-xl font-bold font-mono text-neutral-900 dark:text-neutral-100 tabular-nums">
              {weedingLabour} <span className="text-xs font-normal text-neutral-400">days</span>
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-100 dark:border-neutral-700/60">
            <span className="text-[11px] text-neutral-500 block mb-0.5">Spraying & Protection</span>
            <p className="text-lg sm:text-xl font-bold font-mono text-neutral-900 dark:text-neutral-100 tabular-nums">
              {sprayingLabour} <span className="text-xs font-normal text-neutral-400">days</span>
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-100 dark:border-neutral-700/60">
            <span className="text-[11px] text-neutral-500 block mb-0.5">Harvesting & Bagging</span>
            <p className="text-lg sm:text-xl font-bold font-mono text-neutral-900 dark:text-neutral-100 tabular-nums">
              {harvestLabour} <span className="text-xs font-normal text-neutral-400">days</span>
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 col-span-2 sm:col-span-1">
            <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300 block mb-0.5">Total Person-Days</span>
            <p className="text-xl sm:text-2xl font-extrabold font-mono text-emerald-900 dark:text-emerald-200 tabular-nums">
              {totalLabour} <span className="text-xs font-normal text-emerald-700">days</span>
            </p>
          </div>
        </div>

        <p className="text-[11px] text-neutral-400 italic">
          Prototype estimate: Assumes 8-hour workday standards. Mechanization saves ~55% manual labor on harvesting and primary seed drilling.
        </p>
      </div>

      {/* Operations Guidelines Schedule */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
          Core Agronomic Operation Guidelines
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-100 dark:border-neutral-700/60">
            <span className="font-bold text-neutral-800 dark:text-neutral-200 block mb-1">Tillage & Seedbed</span>
            <p className="text-neutral-600 dark:text-neutral-400">{spec.scheduleGuidelines.tillage}</p>
          </div>

          <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-100 dark:border-neutral-700/60">
            <span className="font-bold text-neutral-800 dark:text-neutral-200 block mb-1">Sowing Windows</span>
            <p className="text-neutral-600 dark:text-neutral-400">{spec.scheduleGuidelines.sowing}</p>
          </div>

          <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-100 dark:border-neutral-700/60">
            <span className="font-bold text-neutral-800 dark:text-neutral-200 block mb-1">Weed Eradication</span>
            <p className="text-neutral-600 dark:text-neutral-400">{spec.scheduleGuidelines.weeding}</p>
          </div>

          <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-100 dark:border-neutral-700/60">
            <span className="font-bold text-neutral-800 dark:text-neutral-200 block mb-1">Nutrient Application</span>
            <p className="text-neutral-600 dark:text-neutral-400">{spec.scheduleGuidelines.fertilization}</p>
          </div>

          <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-100 dark:border-neutral-700/60">
            <span className="font-bold text-neutral-800 dark:text-neutral-200 block mb-1">Irrigation Regimen</span>
            <p className="text-neutral-600 dark:text-neutral-400">{spec.scheduleGuidelines.irrigation}</p>
          </div>

          <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-100 dark:border-neutral-700/60">
            <span className="font-bold text-neutral-800 dark:text-neutral-200 block mb-1">Harvest & Threshing</span>
            <p className="text-neutral-600 dark:text-neutral-400">{spec.scheduleGuidelines.harvest}</p>
          </div>
        </div>

        {/* Safety & Reference data notice */}
        <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/50 text-[11px] text-amber-800 dark:text-amber-300">
          <span className="font-bold block mb-0.5">Verified Knowledge Sources:</span>
          {spec.disclaimer} For exact chemical sprayer nozzles, calibration charts, and seed dressings, reference data from registered ICAR / CIBRC publications is required.
        </div>
      </div>
    </div>
  );
};
