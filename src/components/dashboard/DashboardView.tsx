import React, { useState } from 'react';
import { 
  Sprout, 
  MapPin, 
  Layers, 
  Droplets, 
  TrendingUp, 
  TrendingDown,
  CloudSun, 
  IndianRupee, 
  ArrowUpRight, 
  Calendar,
  AlertTriangle,
  ChevronRight,
  Info,
  HardDrive
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Area,
  ComposedChart
} from 'recharts';
import { useApp } from '../../context/AppContext';
import { DEMO_WEATHER, DEMO_MARKET_PRICES } from '../../data/mockData';
import { CropName } from '../../types';
import { PrototypeBanner } from '../layout/PrototypeBanner';

const HERO_IMAGE_URL = '/src/assets/images/krushi_hero_farm_1791035102459.jpg';

export const DashboardView: React.FC = () => {
  const { farmerProfile, setActiveTab } = useApp();
  const [selectedCrop, setSelectedCrop] = useState<CropName>('Soybean');
  const [timeRange, setTimeRange] = useState<'7' | '15' | '30'>('15');

  // Generate dynamic chart data based on selectedCrop and timeRange
  const generateTrendData = () => {
    const days = parseInt(timeRange);
    const basePrice = selectedCrop === 'Cotton' ? 7200 : selectedCrop === 'Onion' ? 2800 : selectedCrop === 'Wheat' ? 2450 : selectedCrop === 'Tomato' ? 2200 : 4850;
    const slope = selectedCrop === 'Onion' ? -15 : selectedCrop === 'Tomato' ? 18 : 8;

    const data = [];
    const today = new Date();

    // 7 days past
    for (let i = 7; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const val = Math.round(basePrice - (i * slope * 0.7) + (Math.sin(i) * 25));
      data.push({
        date: d.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
        historicalPrice: val,
        predictedPrice: i === 0 ? val : null,
        lowerBound: i === 0 ? val : null,
        upperBound: i === 0 ? val : null,
      });
    }

    // Future days
    for (let i = 1; i <= days; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() + i);
      const predVal = Math.round(basePrice + (i * slope) + (Math.sin(i * 0.6) * 20));
      const band = 35 + i * 8;
      data.push({
        date: d.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
        historicalPrice: null,
        predictedPrice: predVal,
        lowerBound: predVal - band,
        upperBound: predVal + band,
      });
    }

    return data;
  };

  const trendData = generateTrendData();

  const marketSnapshotCrops: { crop: CropName; price: number; diff: string; up: boolean }[] = [
    { crop: 'Soybean', price: 4850, diff: '+1.5%', up: true },
    { crop: 'Cotton', price: 7200, diff: '+0.8%', up: true },
    { crop: 'Onion', price: 2800, diff: '-2.1%', up: false },
    { crop: 'Wheat', price: 2450, diff: '+0.4%', up: true },
    { crop: 'Tomato', price: 2200, diff: '+4.2%', up: true },
  ];

  return (
    <div className="space-y-6 sm:space-y-8 pb-16">
      {/* Hero Welcome Section with Cinematic Agriculture Image */}
      <div className="relative rounded-2xl overflow-hidden bg-neutral-900 text-white shadow-sm border border-neutral-200 dark:border-neutral-800">
        <img
          src={HERO_IMAGE_URL}
          alt="Lush green farmlands of Maharashtra"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover opacity-35 mix-blend-luminosity scale-105 transition-transform duration-1000"
          onError={(e) => {
            // Safe fallback container styling
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/95 via-emerald-900/80 to-transparent" />

        <div className="relative p-6 sm:p-8 md:p-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-800/80 backdrop-blur-xs text-emerald-200 text-xs font-semibold mb-3 border border-emerald-700/60">
            <span>Decision Support System</span>
            <span aria-hidden="true">·</span>
            <span>Maharashtra Agronomy</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-2">
            Good Morning, {farmerProfile.name} 👋
          </h2>
          <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed mb-6">
            Your farm intelligence at a glance. Real-time agronomic models, market forecasting, and soil analytics tailored for your land.
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setActiveTab('crop-recommendation')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm shadow-sm transition-colors"
            >
              <span>Explore Crop Recommendation</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveTab('disease-detection')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm backdrop-blur-xs border border-white/20 transition-colors"
            >
              <span>Scan Leaf Health</span>
            </button>
            <button
              onClick={() => setActiveTab('google-drive')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-950/70 hover:bg-emerald-900/90 text-emerald-200 font-semibold text-xs sm:text-sm backdrop-blur-xs border border-emerald-600/40 transition-colors"
            >
              <HardDrive className="w-4 h-4" />
              <span>Google Drive Locker</span>
            </button>
          </div>
        </div>
      </div>

      <PrototypeBanner 
        subtext="This is currently a functional prototype for academic demonstration. All market valuations, yield projections, and advice cards represent demonstration models. Real LSTM, CNN, and Agmarknet feeds connect in production."
      />

      {/* Farm Summary Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800">
          <div className="flex items-center justify-between text-neutral-500 dark:text-neutral-400 text-xs mb-1">
            <span>Farm Area</span>
            <Layers className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100 font-mono tabular-nums">
            {farmerProfile.farmArea} <span className="text-sm font-sans font-medium text-neutral-500">Hectares</span>
          </p>
          <span className="text-[11px] text-neutral-500 dark:text-neutral-400">Total arable land</span>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800">
          <div className="flex items-center justify-between text-neutral-500 dark:text-neutral-400 text-xs mb-1">
            <span>Soil Type</span>
            <Sprout className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100 truncate">
            {farmerProfile.soilType}
          </p>
          <span className="text-[11px] text-neutral-500 dark:text-neutral-400">High moisture retention</span>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800">
          <div className="flex items-center justify-between text-neutral-500 dark:text-neutral-400 text-xs mb-1">
            <span>Current Crop</span>
            <Layers className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100">
            {farmerProfile.mainCrops[0] || 'Soybean'}
          </p>
          <span className="text-[11px] text-neutral-500 dark:text-neutral-400">Vegetative stage</span>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800">
          <div className="flex items-center justify-between text-neutral-500 dark:text-neutral-400 text-xs mb-1">
            <span>Location</span>
            <MapPin className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100 truncate">
            {farmerProfile.district}
          </p>
          <span className="text-[11px] text-neutral-500 dark:text-neutral-400">Maharashtra Region</span>
        </div>
      </div>

      {/* 4 Primary Intelligence Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div 
          onClick={() => setActiveTab('crop-recommendation')}
          className="group cursor-pointer p-5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all hover:shadow-xs"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
              🌱 Recommended Crop
            </span>
            <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-emerald-600 transition-colors" />
          </div>
          <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-1">
            Soybean
          </h3>
          <p className="text-xs text-neutral-600 dark:text-neutral-300">
            Best match for current Kharif soil moisture and black vertisol pH.
          </p>
          <div className="mt-3 pt-2.5 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-[11px]">
            <span className="text-emerald-700 dark:text-emerald-400 font-medium">Demo Suitability: High</span>
            <span className="text-neutral-400">Click to run analysis</span>
          </div>
        </div>

        <div 
          onClick={() => setActiveTab('market-prices')}
          className="group cursor-pointer p-5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all hover:shadow-xs"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
              💰 Today's Market
            </span>
            <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-emerald-600 transition-colors" />
          </div>
          <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-1 font-mono tabular-nums">
            ₹4,850 <span className="text-xs font-normal text-neutral-500">/ Quintal</span>
          </h3>
          <p className="text-xs text-neutral-600 dark:text-neutral-300">
            Pune APMC Modal Rate (Demo data). Up +1.5% from previous session.
          </p>
          <div className="mt-3 pt-2.5 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-[11px]">
            <span className="text-amber-700 dark:text-amber-400 font-medium">Demo Market Rate</span>
            <span className="text-neutral-400">View 10 APMCs</span>
          </div>
        </div>

        <div 
          onClick={() => setActiveTab('irrigation')}
          className="group cursor-pointer p-5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all hover:shadow-xs"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
              💧 Irrigation
            </span>
            <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-emerald-600 transition-colors" />
          </div>
          <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-1">
            Monitor Soil
          </h3>
          <p className="text-xs text-neutral-600 dark:text-neutral-300">
            Estimated moisture at ~42%. Next irrigation advised within 48-72h.
          </p>
          <div className="mt-3 pt-2.5 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-[11px]">
            <span className="text-sky-700 dark:text-sky-400 font-medium">IoT Sensor Ready</span>
            <span className="text-neutral-400">Simulate meter</span>
          </div>
        </div>

        <div 
          onClick={() => setActiveTab('yield-prediction')}
          className="group cursor-pointer p-5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all hover:shadow-xs"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
              🌾 Expected Yield
            </span>
            <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-emerald-600 transition-colors" />
          </div>
          <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-1 font-mono tabular-nums">
            2.38 <span className="text-xs font-normal text-neutral-500">Tonnes/Ha</span>
          </h3>
          <p className="text-xs text-neutral-600 dark:text-neutral-300">
            Total expected: ~11.9 Tonnes across your 5.0 Ha holding.
          </p>
          <div className="mt-3 pt-2.5 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-[11px]">
            <span className="text-emerald-700 dark:text-emerald-400 font-medium">Demo estimate</span>
            <span className="text-neutral-400">XGBoost preview</span>
          </div>
        </div>
      </div>

      {/* Market Snapshot Row */}
      <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                Market Snapshot
              </h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 uppercase tracking-wider">
                Demo Market Data
              </span>
            </div>
            <p className="text-xs text-neutral-500 mt-0.5">
              Demonstration APMC rates across key Maharashtra hubs (Never present as live quotes).
            </p>
          </div>
          <button
            onClick={() => setActiveTab('market-prices')}
            className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            <span>View Full Market Board</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {marketSnapshotCrops.map((item) => (
            <div
              key={item.crop}
              onClick={() => {
                setSelectedCrop(item.crop);
              }}
              className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                selectedCrop === item.crop
                  ? 'border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/30 ring-1 ring-emerald-600'
                  : 'border-neutral-200/70 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700'
              }`}
            >
              <div className="flex items-center justify-between text-xs text-neutral-500 mb-1">
                <span className="font-semibold text-neutral-900 dark:text-neutral-100">{item.crop}</span>
                <span className={`inline-flex items-center text-[11px] font-medium ${item.up ? 'text-emerald-600' : 'text-red-500'}`}>
                  {item.diff}
                </span>
              </div>
              <p className="text-base sm:text-lg font-bold font-mono text-neutral-900 dark:text-neutral-100 tabular-nums">
                ₹{item.price.toLocaleString('en-IN')}
              </p>
              <span className="text-[10px] text-neutral-400">per Quintal</span>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Price Trend Chart & Weather Card Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Price Trend Chart (2 columns on lg) */}
        <div className="lg:col-span-2 p-5 sm:p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                    Price Trend & Forecast
                  </h3>
                  <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                    {selectedCrop}
                  </span>
                </div>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Solid line: Historical APMC rate · Dashed line: Demo Forecast Band
                </p>
              </div>

              {/* Time Range Selector */}
              <div className="flex items-center gap-1 p-1 bg-neutral-100 dark:bg-neutral-800 rounded-lg self-start sm:self-auto">
                {(['7', '15', '30'] as const).map((r) => (
                  <button
                    key={r}
                    onClick={() => setTimeRange(r)}
                    className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                      timeRange === r
                        ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 shadow-xs'
                        : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
                    }`}
                  >
                    {r} Days
                  </button>
                ))}
              </div>
            </div>

            {/* Recharts Line / Area Chart */}
            <div className="h-64 sm:h-72 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={trendData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
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
                      name === 'historicalPrice' ? 'Historical APMC' : 'Demo Forecast'
                    ]}
                  />
                  {/* Historical Solid Line */}
                  <Line 
                    type="monotone" 
                    dataKey="historicalPrice" 
                    stroke="#047857" 
                    strokeWidth={2.5} 
                    dot={{ r: 3, fill: '#047857' }} 
                    activeDot={{ r: 5 }}
                    isAnimationActive={true}
                  />
                  {/* Forecast Dashed Line */}
                  <Line 
                    type="monotone" 
                    dataKey="predictedPrice" 
                    stroke="#10b981" 
                    strokeWidth={2.5} 
                    strokeDasharray="4 4" 
                    dot={{ r: 3, fill: '#10b981' }}
                    isAnimationActive={true}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800 flex flex-wrap items-center justify-between text-xs text-neutral-500 gap-2">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-neutral-700 dark:text-neutral-300">Trend:</span>
              <span className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-medium">
                <TrendingUp className="w-3.5 h-3.5" />
                Increasing (+1.5% projected slope)
              </span>
            </div>
            <p className="text-[11px] text-neutral-400 italic">
              Prototype Forecast — real LSTM/XGBoost model will be connected later.
            </p>
          </div>
        </div>

        {/* Weather Card */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <CloudSun className="w-5 h-5 text-amber-500" />
                <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                  Agri-Weather Desk
                </h3>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
                Demo Weather Data
              </span>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/10 via-sky-500/10 to-transparent border border-emerald-500/20 mb-4">
              <div className="flex items-baseline justify-between mb-1">
                <span className="text-3xl font-extrabold text-neutral-900 dark:text-neutral-100 font-mono tabular-nums">
                  {DEMO_WEATHER.temperature}°C
                </span>
                <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                  {DEMO_WEATHER.condition}
                </span>
              </div>
              <p className="text-xs text-neutral-500 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                <span>{DEMO_WEATHER.location}</span>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-100 dark:border-neutral-700/60">
                <span className="text-neutral-400 block mb-1">Relative Humidity</span>
                <span className="text-base font-bold text-neutral-800 dark:text-neutral-200 font-mono tabular-nums">
                  {DEMO_WEATHER.humidity}%
                </span>
              </div>
              <div className="p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-100 dark:border-neutral-700/60">
                <span className="text-neutral-400 block mb-1">Rainfall (48h)</span>
                <span className="text-base font-bold text-neutral-800 dark:text-neutral-200 font-mono tabular-nums">
                  {DEMO_WEATHER.rainfall} mm
                </span>
              </div>
            </div>

            <div className="mt-4 p-3 rounded-lg bg-sky-50 dark:bg-sky-950/30 border border-sky-200/60 dark:border-sky-800/40 text-xs text-sky-800 dark:text-sky-300 leading-relaxed">
              <span className="font-semibold block mb-0.5">Field Advisory:</span>
              Cloud cover favorable for vegetative growth. Delay heavy pesticide sprays until rain clouds clear.
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800 text-[11px] text-neutral-400">
            Structure prepared for IMD / Open-Meteo live API integration.
          </div>
        </div>
      </div>

      {/* AI Farm Insights Section */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                AI Farm Insights
              </h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 uppercase">
                Prototype Recommendations
              </span>
            </div>
            <p className="text-xs text-neutral-500 mt-0.5">
              Automated agronomic decision synthesis based on soil characteristics, weather patterns, and market indicators.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('farm-operations')}
            className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1"
          >
            <span>Operations Planner</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/30">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 dark:text-emerald-300 mb-2">
              <Sprout className="w-4 h-4 text-emerald-600" />
              <span>🌱 Crop Recommendation</span>
            </div>
            <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed mb-3">
              Black Vertisol with pH 7.2 demonstrates strong suitability for <strong className="font-semibold text-neutral-900 dark:text-white">Soybean</strong> followed by Rabi <strong className="font-semibold text-neutral-900 dark:text-white">Chickpea</strong>.
            </p>
            <span className="text-[10px] text-neutral-400 italic block">Prototype ML demo score</span>
          </div>

          <div className="p-4 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/30">
            <div className="flex items-center gap-2 text-xs font-semibold text-sky-800 dark:text-sky-300 mb-2">
              <Droplets className="w-4 h-4 text-sky-600" />
              <span>💧 Irrigation Reminder</span>
            </div>
            <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed mb-3">
              14.2mm rain received in the past 48h. Soil moisture estimated at 42%. Schedule borewell irrigation within the next 48-72 hours.
            </p>
            <span className="text-[10px] text-neutral-400 italic block">Calculated via ET0 demo model</span>
          </div>

          <div className="p-4 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/30">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 dark:text-amber-300 mb-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>⚠️ Crop Health Alert</span>
            </div>
            <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed mb-3">
              High atmospheric humidity (68%) creates conducive conditions for fungal leaf spots. Inspect lower canopy foliage for early lesions.
            </p>
            <span className="text-[10px] text-neutral-400 italic block">Early warning disease telemetry</span>
          </div>
        </div>
      </div>
    </div>
  );
};
