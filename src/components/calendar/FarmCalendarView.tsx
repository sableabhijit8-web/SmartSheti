import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  ChevronRight,
  Filter,
  Layers
} from 'lucide-react';
import { CROP_CALENDARS, ALL_CROPS, MAHARASHTRA_DISTRICTS } from '../../data/mockData';
import { CropName } from '../../types';
import { PrototypeBanner } from '../layout/PrototypeBanner';
import { useApp } from '../../context/AppContext';

const MONTHS = [
  'All Months',
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const FarmCalendarView: React.FC = () => {
  const { farmerProfile } = useApp();

  const [selectedCrop, setSelectedCrop] = useState<CropName>('Soybean');
  const [selectedDistrict, setSelectedDistrict] = useState<string>(farmerProfile.district || 'Pune');
  const [selectedMonth, setSelectedMonth] = useState<string>('All Months');

  const calendarData = CROP_CALENDARS[selectedCrop] || CROP_CALENDARS.Soybean;

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Title */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
            <Calendar className="w-5 h-5" />
          </span>
          <h2 className="text-2xl font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight">
            Farm Calendar & Agronomic Timeline
          </h2>
        </div>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Step-by-step crop lifecycle schedules from initial tillage and seed treatment to harvest and APMC marketing.
        </p>
      </div>

      <PrototypeBanner 
        subtext="Prototype / Demo Crop Calendar — verify local agricultural recommendations and weather forecast with your local Krishi Vigyan Kendra (KVK) before field application."
      />

      {/* Filter Ribbon */}
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
              Agro-Climatic District
            </label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-1 focus:ring-emerald-600 focus:outline-none"
            >
              {MAHARASHTRA_DISTRICTS.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
              Calendar Month Filter
            </label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-1 focus:ring-emerald-600 focus:outline-none"
            >
              {MONTHS.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Season Summary Strip */}
        <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800 flex flex-wrap items-center justify-between text-xs text-neutral-500 gap-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-neutral-700 dark:text-neutral-300">Seasonal Window:</span>
            <span className="text-emerald-700 dark:text-emerald-400 font-medium">{calendarData.season}</span>
          </div>
          <div className="flex items-center gap-3">
            <span>Sowing: <strong>{calendarData.sowingMonths.join(', ')}</strong></span>
            <span>Harvest: <strong>{calendarData.harvestMonths.join(', ')}</strong></span>
          </div>
        </div>
      </div>

      {/* Timeline Steps */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
          Sequential Operations Workflow (Day -15 to Harvest & Market)
        </h3>

        <div className="relative pl-6 sm:pl-8 border-l-2 border-emerald-500/40 space-y-6">
          {calendarData.timeline.map((step, idx) => (
            <div key={idx} className="relative group">
              {/* Circle Marker */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-6 h-6 rounded-full bg-emerald-700 text-white flex items-center justify-center text-xs font-bold ring-4 ring-white dark:ring-neutral-950 font-mono">
                {idx + 1}
              </div>

              {/* Card Container */}
              <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs transition-all hover:border-emerald-500/60">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                  <h4 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                    {step.stage}
                  </h4>
                  <span className="text-xs font-mono font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-200/50 dark:border-emerald-800/40 self-start sm:self-auto">
                    {step.daysFromSowing}
                  </span>
                </div>

                <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed mb-3">
                  {step.description}
                </p>

                {/* Critical tasks */}
                <div className="mb-2">
                  <span className="text-[11px] font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider block mb-1">
                    Key Field Operations:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {step.criticalTasks.map((task, tIdx) => (
                      <span
                        key={tIdx}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-medium"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{task}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Caution note */}
                <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 text-[11px] text-amber-800 dark:text-amber-300/90 flex items-start gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-600" />
                  <span><strong>Agronomic Caution:</strong> {step.caution}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 rounded-xl bg-neutral-100 dark:bg-neutral-800/50 text-xs text-neutral-500 text-center">
        “Prototype / Demo Crop Calendar — verify local agricultural recommendations and weather forecast with your local Krishi Vigyan Kendra (KVK) before field application.”
      </div>
    </div>
  );
};
