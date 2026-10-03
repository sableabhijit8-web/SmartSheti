import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  IndianRupee, 
  AlertCircle, 
  Sparkles, 
  ArrowRight,
  Info,
  Clock,
  Cpu
} from 'lucide-react';
import { 
  ComposedChart, 
  Line, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { ALL_CROPS } from '../../data/mockData';
import { CropName } from '../../types';
import { getPricePrediction, PricePredictionResponse } from '../../services/pricePredictionService';
import { PrototypeBanner } from '../layout/PrototypeBanner';
import { useApp } from '../../context/AppContext';

const APMC_MARKETS = [
  'Pune APMC',
  'Nashik APMC',
  'Lasalgaon APMC',
  'Ahmednagar APMC',
  'Jalna APMC',
  'Solapur APMC',
  'Sangli APMC',
];

export const PricePredictionView: React.FC = () => {
  const { showToast, t } = useApp();

  const [selectedCrop, setSelectedCrop] = useState<CropName>('Soybean');
  const [selectedMarket, setSelectedMarket] = useState<string>('Pune APMC');
  const [horizonDays, setHorizonDays] = useState<7 | 15 | 30>(15);
  const [isLoading, setIsLoading] = useState(false);
  const [predictionData, setPredictionData] = useState<PricePredictionResponse | null>(null);

  const fetchPrediction = async (crop: CropName, market: string, horizon: 7 | 15 | 30) => {
    setIsLoading(true);
    try {
      const res = await getPricePrediction({ crop, market, horizonDays: horizon });
      setPredictionData(res);
    } catch {
      showToast(t('common.error'), 'warning');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPrediction(selectedCrop, selectedMarket, horizonDays);
  }, [selectedCrop, selectedMarket, horizonDays]);

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16 font-sans">
      {/* Title */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="p-1.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
            <TrendingUp className="w-5 h-5" />
          </span>
          <h2 className="text-2xl font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight">
            {t('pricePrediction.title')}
          </h2>
        </div>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {t('pricePrediction.subtitle')}
        </p>
      </div>

      <PrototypeBanner />

      {/* Input Selection Bar */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
              {t('pricePrediction.selectCrop')}
            </label>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value as CropName)}
              className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-1 focus:ring-emerald-600 focus:outline-none"
            >
              {ALL_CROPS.map((c) => (
                <option key={c} value={c}>{t(`crops.${c}`)}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
              {t('pricePrediction.selectMarket')}
            </label>
            <select
              value={selectedMarket}
              onChange={(e) => setSelectedMarket(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-1 focus:ring-emerald-600 focus:outline-none"
            >
              {APMC_MARKETS.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
              {t('pricePrediction.horizonLabel')}
            </label>
            <div className="flex items-center gap-1 p-1 bg-neutral-100 dark:bg-neutral-800 rounded-xl">
              <button
                type="button"
                onClick={() => setHorizonDays(7)}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  horizonDays === 7
                    ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 shadow-xs'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
                }`}
              >
                {t('dashboard.daysHorizon', { days: 7 })}
              </button>
              <button
                type="button"
                onClick={() => setHorizonDays(15)}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  horizonDays === 15
                    ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 shadow-xs'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
                }`}
              >
                {t('dashboard.daysHorizon', { days: 15 })}
              </button>
              <button
                type="button"
                onClick={() => setHorizonDays(30)}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  horizonDays === 30
                    ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 shadow-xs'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
                }`}
              >
                {t('dashboard.daysHorizon', { days: 30 })}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      {predictionData && (
        <div className="p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                  {t('pricePrediction.chartTitle')} ({t(`crops.${selectedCrop}`)})
                </h3>
                <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded">
                  {selectedMarket}
                </span>
              </div>
              <p className="text-xs text-neutral-500 mt-0.5">
                {t('dashboard.priceTrendSubtitle')}
              </p>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-neutral-600 dark:text-neutral-300">
                <span className="w-3 h-0.5 bg-emerald-700 inline-block"></span>
                <span>{t('dashboard.historicalLine')}</span>
              </span>
              <span className="flex items-center gap-1.5 text-neutral-600 dark:text-neutral-300">
                <span className="w-3 h-0.5 bg-emerald-500 border-b border-dashed border-emerald-500 inline-block"></span>
                <span>{t('dashboard.forecastLine')}</span>
              </span>
            </div>
          </div>

          {/* Recharts */}
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={predictionData.points} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} opacity={0.6} />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 11, fill: '#6b7280' }} 
                  axisLine={{ stroke: '#e5e7eb' }}
                  tickLine={false}
                />
                <YAxis 
                  domain={['auto', 'auto']}
                  tick={{ fontSize: 11, fill: '#6b7280' }} 
                  axisLine={{ stroke: '#e5e7eb' }}
                  tickLine={false}
                  tickFormatter={(val) => `₹${val}`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                    borderRadius: '12px', 
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', 
                    border: '1px solid #e5e7eb',
                    fontSize: '12px' 
                  }}
                  formatter={(value: any, name: any) => [
                    `₹${Number(value).toLocaleString('en-IN')}`,
                    name === 'historicalPrice' ? t('dashboard.historicalLine') : t('dashboard.forecastLine')
                  ]}
                />
                <Area 
                  type="monotone" 
                  dataKey="upperBound" 
                  stroke="none" 
                  fill="#10b981" 
                  fillOpacity={0.12} 
                />
                <Line 
                  type="monotone" 
                  dataKey="historicalPrice" 
                  stroke="#047857" 
                  strokeWidth={2.5} 
                  dot={{ r: 3, fill: '#047857' }} 
                  activeDot={{ r: 5 }}
                  name="historicalPrice"
                />
                <Line 
                  type="monotone" 
                  dataKey="predictedPrice" 
                  stroke="#10b981" 
                  strokeWidth={2.5} 
                  strokeDasharray="4 4" 
                  dot={{ r: 3, fill: '#10b981' }}
                  name="predictedPrice"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* Metrics Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-neutral-100 dark:border-neutral-800">
            <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200/70 dark:border-neutral-700/60">
              <span className="text-xs text-neutral-500 block mb-1">
                {t('pricePrediction.currentModal', { price: predictionData.currentModalPrice.toLocaleString('en-IN') })}
              </span>
              <p className="text-xl font-bold font-mono text-neutral-900 dark:text-neutral-100">
                ₹{predictionData.currentModalPrice.toLocaleString('en-IN')}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200/70 dark:border-neutral-700/60">
              <span className="text-xs text-neutral-500 block mb-1">
                {t('pricePrediction.predictedModal', { days: horizonDays, price: predictionData.predictedPriceAtHorizon.toLocaleString('en-IN') })}
              </span>
              <p className="text-xl font-bold font-mono text-neutral-900 dark:text-neutral-100">
                ₹{predictionData.predictedPriceAtHorizon.toLocaleString('en-IN')}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200/70 dark:border-neutral-700/60">
              <span className="text-xs text-neutral-500 block mb-1">
                {t('pricePrediction.projectedShift', { shift: predictionData.projectedPercentageShift })}
              </span>
              <div className="flex items-center gap-1.5">
                {predictionData.projectedPercentageShift >= 0 ? (
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                ) : (
                  <TrendingDown className="w-5 h-5 text-red-600" />
                )}
                <span className={`text-xl font-bold font-mono ${
                  predictionData.projectedPercentageShift >= 0 ? 'text-emerald-600' : 'text-red-600'
                }`}>
                  {predictionData.projectedPercentageShift > 0 ? `+${predictionData.projectedPercentageShift}%` : `${predictionData.projectedPercentageShift}%`}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
