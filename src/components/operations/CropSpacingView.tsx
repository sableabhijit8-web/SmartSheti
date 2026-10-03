import React, { useState } from 'react';
import { 
  Ruler, 
  Layers, 
  Sprout, 
  Info, 
  CheckCircle2, 
  Maximize2, 
  Compass,
  ArrowRightLeft,
  ArrowUpDown
} from 'lucide-react';
import { ALL_CROPS, FARM_OPERATION_SPECS } from '../../data/mockData';
import { CropName } from '../../types';
import { PrototypeBanner } from '../layout/PrototypeBanner';

interface SpacingDetails {
  rowCm: number;
  plantCm: number;
  densityPerHa: string;
  canopyStyle: string;
  interRowClearance: string;
  notes: string;
}

const CROP_SPACING_DATA: Record<CropName, SpacingDetails> = {
  Soybean: {
    rowCm: 45,
    plantCm: 5,
    densityPerHa: '440,000 – 480,000 plants/ha',
    canopyStyle: 'Medium erect to semi-spreading bushy canopy',
    interRowClearance: 'Compatible with 3-tyne bullock hoe or small tractor cultivator',
    notes: 'Maintain uniform seed depth (3-4 cm) in moist soil bed to achieve optimal stand count.'
  },
  Cotton: {
    rowCm: 90,
    plantCm: 60,
    densityPerHa: '18,500 – 22,000 plants/ha',
    canopyStyle: 'Tall sympodial branching bush with wide square formation envelope',
    interRowClearance: 'Wide ridge-furrow layout allows power tiller inter-culturing',
    notes: 'Allows sunlight penetration into bottom bolls to reduce boll-rot losses.'
  },
  Wheat: {
    rowCm: 22.5,
    plantCm: 5,
    densityPerHa: '880,000 – 1,000,000 plants/ha',
    canopyStyle: 'Dense erect tillering cereal canopy with high biomass index',
    interRowClearance: 'Standard 9-tyne tractor seed drill spacing for North & Central zones',
    notes: 'Closer row spacing suppresses competitive winter broadleaf weeds like Chenopodium.'
  },
  Onion: {
    rowCm: 15,
    plantCm: 10,
    densityPerHa: '660,000 – 700,000 plants/ha',
    canopyStyle: 'Erect cylindrical hollow leaves on flat or raised bed (BBF)',
    interRowClearance: 'Manual hand weeding or high-clearance wheel hoeing',
    notes: 'Uniform spacing prevents deformed twin/split bulbs and optimizes market grade size.'
  },
  Tomato: {
    rowCm: 90,
    plantCm: 45,
    densityPerHa: '24,000 – 28,000 plants/ha',
    canopyStyle: 'Determinate or indeterminate vine staked on bamboo trellis',
    interRowClearance: 'Allows walking path for spraying and sequential 3-day pickings',
    notes: 'Air circulation through 90cm corridors drastically reduces foliar early blight pressure.'
  },
  Chickpea: {
    rowCm: 30,
    plantCm: 10,
    densityPerHa: '330,000 plants/ha',
    canopyStyle: 'Compact branching pulse canopy with taproot system',
    interRowClearance: 'Bullock-drawn hoe at 25 DAS before canopy closes',
    notes: 'Shallow sowings lead to root collar exposure in hot residual moisture soils.'
  },
  Sorghum: {
    rowCm: 45,
    plantCm: 15,
    densityPerHa: '148,000 – 160,000 plants/ha',
    canopyStyle: 'Single stout culm with alternate broad drooping leaves',
    interRowClearance: 'Inter-row pass at 21 and 35 days suppresses weed growth',
    notes: 'Prevents lodging during sudden monsoon thunderstorms and grain-filling stage.'
  },
  Rice: {
    rowCm: 20,
    plantCm: 15,
    densityPerHa: '330,000 hills/ha (2-3 seedlings per hill)',
    canopyStyle: 'Puddled aquatic tillering canopy with shallow root crown',
    interRowClearance: 'Compatible with Japanese rotary cono-weeder under 3cm standing water',
    notes: 'Line transplanting increases productive panicle count per square meter by 22%.'
  },
  Sugarcane: {
    rowCm: 120,
    plantCm: 30,
    densityPerHa: '75,000 – 85,000 millable canes/ha',
    canopyStyle: 'Deep heavy perennial tall biomass canopy with thick tillering clump',
    interRowClearance: 'Furrow width accommodates mini-tractor ridger for earthing-up',
    notes: 'Wide row spacing enables trash mulching and drip lateral placement.'
  },
  Maize: {
    rowCm: 60,
    plantCm: 20,
    densityPerHa: '83,000 plants/ha',
    canopyStyle: 'Robust erect stem with prop roots and single/double cob placement',
    interRowClearance: 'Tractor ridger earthing-up at knee-high stage (30 DAS)',
    notes: 'Adequate intra-plant distance prevents cob barrenness during drought stress.'
  },
};

export const CropSpacingView: React.FC = () => {
  const [selectedCrop, setSelectedCrop] = useState<CropName>('Soybean');
  const spacing = CROP_SPACING_DATA[selectedCrop] || CROP_SPACING_DATA.Soybean;

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Title */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
            <Ruler className="w-5 h-5" />
          </span>
          <h2 className="text-2xl font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight">
            Crop Spacing & Field Geometry
          </h2>
        </div>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Visual recommendations for optimal plant population, inter-row air circulation, and tractor tillage clearance.
        </p>
      </div>

      <PrototypeBanner 
        subtext="Agronomic recommendations based on ICAR package of practices. Soil moisture and specific hybrid vigor may warrant minor field adjustments."
      />

      {/* Crop Selector Ribbon */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs">
        <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
          Select Crop for Geometry Specifications:
        </label>
        <div className="flex flex-wrap gap-2">
          {ALL_CROPS.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCrop(c)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCrop === c
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs">
          <span className="text-xs text-neutral-500 block mb-1">Row-to-Row Spacing</span>
          <p className="text-3xl font-extrabold font-mono text-emerald-800 dark:text-emerald-300 tabular-nums">
            {spacing.rowCm} <span className="text-base font-sans font-medium text-neutral-500">cm</span>
          </p>
          <span className="text-[11px] text-neutral-400">Inter-row implement clearance</span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs">
          <span className="text-xs text-neutral-500 block mb-1">Plant-to-Plant Spacing</span>
          <p className="text-3xl font-extrabold font-mono text-emerald-800 dark:text-emerald-300 tabular-nums">
            {spacing.plantCm} <span className="text-base font-sans font-medium text-neutral-500">cm</span>
          </p>
          <span className="text-[11px] text-neutral-400">Intra-row hill interval</span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs">
          <span className="text-xs text-neutral-500 block mb-1">Estimated Plant Population</span>
          <p className="text-xl sm:text-2xl font-extrabold font-mono text-neutral-900 dark:text-neutral-100 tabular-nums">
            {spacing.densityPerHa}
          </p>
          <span className="text-[11px] text-neutral-400">Optimal biomass per hectare</span>
        </div>
      </div>

      {/* Visual Farm Geometry Diagram (SVG) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-neutral-100 dark:border-neutral-800">
          <div>
            <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
              Interactive Field Bed Diagram: {selectedCrop}
            </h3>
            <p className="text-xs text-neutral-500">
              Top-down agronomic representation of row spacing, furrow orientation, and root aeration corridor.
            </p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 self-start sm:self-auto">
            {spacing.canopyStyle}
          </span>
        </div>

        {/* Scaled SVG Diagram */}
        <div className="relative rounded-2xl bg-neutral-900/90 dark:bg-neutral-950 p-6 sm:p-8 overflow-hidden border border-neutral-800">
          <svg className="w-full h-48 sm:h-56" viewBox="0 0 700 240" fill="none">
            {/* Soil bed background lines */}
            <line x1="50" y1="50" x2="650" y2="50" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" />
            <line x1="50" y1="120" x2="650" y2="120" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" />
            <line x1="50" y1="190" x2="650" y2="190" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" />

            {/* Row 1 Plants */}
            {[100, 200, 300, 400, 500, 600].map((x) => (
              <g key={`r1-${x}`}>
                <circle cx={x} cy={50} r="14" fill="#047857" opacity="0.3" />
                <circle cx={x} cy={50} r="7" fill="#10b981" />
                <circle cx={x} cy={50} r="2" fill="#ffffff" />
              </g>
            ))}

            {/* Row 2 Plants */}
            {[100, 200, 300, 400, 500, 600].map((x) => (
              <g key={`r2-${x}`}>
                <circle cx={x} cy={120} r="14" fill="#047857" opacity="0.3" />
                <circle cx={x} cy={120} r="7" fill="#10b981" />
                <circle cx={x} cy={120} r="2" fill="#ffffff" />
              </g>
            ))}

            {/* Row 3 Plants */}
            {[100, 200, 300, 400, 500, 600].map((x) => (
              <g key={`r3-${x}`}>
                <circle cx={x} cy={190} r="14" fill="#047857" opacity="0.3" />
                <circle cx={x} cy={190} r="7" fill="#10b981" />
                <circle cx={x} cy={190} r="2" fill="#ffffff" />
              </g>
            ))}

            {/* Dimension Lines: Row-to-Row */}
            <line x1="70" y1="50" x2="70" y2="120" stroke="#fbbf24" strokeWidth="2" />
            <polygon points="67,52 70,45 73,52" fill="#fbbf24" />
            <polygon points="67,118 70,125 73,118" fill="#fbbf24" />
            <text x="35" y="90" fill="#fbbf24" fontSize="12" fontWeight="bold">
              {spacing.rowCm} cm
            </text>

            {/* Dimension Lines: Plant-to-Plant */}
            <line x1="300" y1="30" x2="400" y2="30" stroke="#38bdf8" strokeWidth="2" />
            <polygon points="302,27 295,30 302,33" fill="#38bdf8" />
            <polygon points="398,27 405,30 398,33" fill="#38bdf8" />
            <text x="330" y="24" fill="#38bdf8" fontSize="12" fontWeight="bold">
              {spacing.plantCm} cm
            </text>
          </svg>

          <div className="flex flex-wrap items-center justify-between text-xs text-neutral-400 pt-2 border-t border-neutral-800">
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
              <span>Green Nodes: Hill Planting Points</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="w-3 h-0.5 bg-amber-400 inline-block" />
              <span>Yellow Indicator: Row Spacing ({spacing.rowCm} cm)</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="w-3 h-0.5 bg-sky-400 inline-block" />
              <span>Blue Indicator: Plant Spacing ({spacing.plantCm} cm)</span>
            </span>
          </div>
        </div>

        {/* Agronomic Details Card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200/80 dark:border-neutral-700/60">
            <h4 className="font-bold text-neutral-900 dark:text-neutral-100 mb-1 flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-emerald-600" />
              <span>Mechanization & Tractor Compatibility</span>
            </h4>
            <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
              {spacing.interRowClearance}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200/80 dark:border-neutral-700/60">
            <h4 className="font-bold text-neutral-900 dark:text-neutral-100 mb-1 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Field Recommendation</span>
            </h4>
            <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
              {spacing.notes}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
