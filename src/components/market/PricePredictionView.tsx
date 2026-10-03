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
  const { showToast } = useApp();

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
      showToast('Error forecasting price trend', 'warning');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPrediction(selectedCrop, selectedMarket, horizonDays);
  }, [selectedCrop, selectedMarket, horizonDays]);

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Title */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
            <TrendingUp className="w-5 h-5" />
          </span>
          <h2 className="text-2xl font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight">
            AI Crop Price Prediction
          </h2>
        </div>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Synthesize historical price volatility and seasonal harvest cycles to anticipate mandi price trajectories.
        </p>
      </div>

      <PrototypeBanner 
        subtext="Prototype Forecast — real LSTM / XGBoost time-series neural network and daily Agmarknet feeds will be connected in subsequent phases. Do not execute binding sales commitments purely on demo projections."
      />

      {/* Input Selection Bar */}
      <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
              Select Crop / Commodity
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
              APMC Mandi Hub
            </label>
            <select
              value={selectedMarket}
              onChange={(e) => setSelectedMarket(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-1 focus:ring-emerald-600 focus:outline-none"
            >
              {APMC_MARKETS.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
              Forecast Horizon
            </label>
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
              {([7, 15, 30] as const).map((h) => (
                <button
                  key={h}
                  type="button"
                  onClick={() => setHorizonDays(h)}
                  className={`py-1.5 text-xs font-medium rounded-md transition-colors ${
                    horizonDays === h
                      ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 shadow-xs font-bold'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
                  }`}
                >
                  {h} Days
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Prediction Display */}
      {predictionData && (
        <div className="space-y-6">
          {/* Key Horizon Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800">
              <span className="text-[11px] font-medium text-neutral-500 block mb-1">
                Current Demo Price
              </span>
              <p className="text-xl sm:text-2xl font-bold font-mono text-neutral-900 dark:text-neutral-100 tabular-nums">
                ₹{predictionData.currentPrice.toLocaleString('en-IN')}
              </p>
              <span className="text-[10px] text-neutral-400">per Quintal</span>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800">
              <span className="text-[11px] font-medium text-neutral-500 block mb-1">
                7-Day Forecast
              </span>
              <p className="text-xl sm:text-2xl font-bold font-mono text-emerald-800 dark:text-emerald-300 tabular-nums">
                ₹{predictionData.forecastSummary.day7.toLocaleString('en-IN')}
              </p>
              <span className="text-[10px] text-neutral-400">Short-term estimate</span>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800">
              <span className="text-[11px] font-medium text-neutral-500 block mb-1">
                15-Day Forecast
              </span>
              <p className="text-xl sm:text-2xl font-bold font-mono text-emerald-800 dark:text-emerald-300 tabular-nums">
                ₹{predictionData.forecastSummary.day15.toLocaleString('en-IN')}
              </p>
              <span className="text-[10px] text-neutral-400">Mid-term estimate</span>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800">
              <span className="text-[11px] font-medium text-neutral-500 block mb-1">
                30-Day Forecast
              </span>
              <p className="text-xl sm:text-2xl font-bold font-mono text-emerald-800 dark:text-emerald-300 tabular-nums">
                ₹{predictionData.forecastSummary.day30.toLocaleString('en-IN')}
              </p>
              <span className="text-[10px] text-neutral-400">Monthly projection</span>
            </div>
          </div>

          {/* Interactive Chart */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                  {selectedCrop} — {selectedMarket} Forecast Band ({horizonDays} Days)
                </h3>
                <p className="text-xs text-neutral-500">
                  Solid Line: Historical 14 Days · Dashed Line: Projected Mean · Shaded: Upper & Lower Uncertainty Bounds
                </p>
              </div>

              {/* Trend Badge */}
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span className="text-xs text-neutral-500">Trend:</span>
                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold ${
                  predictionData.trend === 'Increasing'
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                    : predictionData.trend === 'Decreasing'
                    ? 'bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300'
                }`}>
                  {predictionData.trend === 'Increasing' ? (
                    <TrendingUp className="w-3.5 h-3.5" />
                  ) : predictionData.trend === 'Decreasing' ? (
                    <TrendingDown className="w-3.5 h-3.5" />
                  ) : (
                    <ArrowRight className="w-3.5 h-3.5" />
                  )}
                  <span>{predictionData.trend} ({predictionData.trendPercent > 0 ? `+${predictionData.trendPercent}%` : `${predictionData.trendPercent}%`})</span>
                </span>
              </div>
            </div>

            <div className="h-72 sm:h-80 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={predictionData.forecastPoints} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
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
                      borderRadius: '8px', 
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', 
                      border: '1px solid #e5e7eb',
                      fontSize: '12px' 
                    }}
                    formatter={(value: any, name: any) => [
                      `₹${Number(value).toLocaleString('en-IN')}`,
                      name === 'historicalPrice' 
                        ? 'Historical Actual' 
                        : name === 'predictedPrice' 
                        ? 'Projected Modal' 
                        : name === 'upperBound'
                        ? 'Upper Uncertainty Bound'
                        : 'Lower Uncertainty Bound'
                    ]}
                  />
                  
                  {/* Historical Solid Line */}
                  <Line 
                    type="monotone" 
                    dataKey="historicalPrice" 
                    stroke="#047857" 
                    strokeWidth={2.5} 
                    dot={{ r: 3, fill: '#047857' }}
                  />

                  {/* Predicted Mean Line */}
                  <Line 
                    type="monotone" 
                    dataKey="predictedPrice" 
                    stroke="#10b981" 
                    strokeWidth={2.5} 
                    strokeDasharray="5 5" 
                    dot={{ r: 3, fill: '#10b981' }}
                  />

                  {/* Upper Bound */}
                  <Line 
                    type="monotone" 
                    dataKey="upperBound" 
                    stroke="#93c5fd" 
                    strokeWidth={1} 
                    strokeDasharray="2 2" 
                    dot={false}
                  />

                  {/* Lower Bound */}
                  <Line 
                    type="monotone" 
                    dataKey="lowerBound" 
                    stroke="#93c5fd" 
                    strokeWidth={1} 
                    strokeDasharray="2 2" 
                    dot={false}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            {/* Prediction Range Summary */}
            <div className="mt-4 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <span className="text-neutral-500">Estimated Horizon Realization Range: </span>
                <strong className="font-bold text-neutral-900 dark:text-neutral-100 font-mono tabular-nums">
                  ₹{predictionData.minRange.toLocaleString('en-IN')} – ₹{predictionData.maxRange.toLocaleString('en-IN')} / Quintal
                </strong>
              </div>
              <span className="text-[11px] text-neutral-400">
                Cone of uncertainty broadens over longer horizons
              </span>
            </div>
          </div>

          {/* Model Specification Card */}
          <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200/60 dark:border-neutral-700/60 text-xs">
            <div className="flex items-center gap-2 text-neutral-800 dark:text-neutral-200 font-semibold mb-1">
              <Cpu className="w-4 h-4 text-emerald-600" />
              <span>Machine Learning Model Architecture (Future Implementation)</span>
            </div>
            <p className="text-[11px] text-neutral-500 leading-relaxed">
              Endpoint: <code>POST /api/price-prediction</code>
              <br />
              Model candidates: Bidirectional LSTM / Gated Recurrent Units (GRU) stacked with XGBoost regressor, utilizing 10-year Agmarknet historical arrival volumes, rainfall indices, and festival demand seasonality.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
