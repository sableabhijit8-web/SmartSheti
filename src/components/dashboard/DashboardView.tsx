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
  HardDrive,
  CheckCircle2,
  Clock,
  Compass,
  Wind,
  ShieldCheck,
  Check,
  Bell
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ComposedChart
} from 'recharts';
import { useApp } from '../../context/AppContext';
import { DEMO_WEATHER } from '../../data/mockData';
import { CropName } from '../../types';
import { PrototypeBanner } from '../layout/PrototypeBanner';

const HERO_IMAGE_URL = '/src/assets/images/krushi_hero_farm_1791035102459.jpg';

export const DashboardView: React.FC = () => {
  const { farmerProfile, setActiveTab, t } = useApp();
  const [selectedCrop, setSelectedCrop] = useState<CropName>('Soybean');
  const [timeRange, setTimeRange] = useState<'7' | '15' | '30'>('15');
  const [completedActions, setCompletedActions] = useState<Record<string, boolean>>({});

  const toggleAction = (id: string) => {
    setCompletedActions(prev => ({ ...prev, [id]: !prev[id] }));
  };

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
      });
    }

    // Future days
    for (let i = 1; i <= days; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() + i);
      const predVal = Math.round(basePrice + (i * slope) + (Math.sin(i * 0.6) * 20));
      data.push({
        date: d.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
        historicalPrice: null,
        predictedPrice: predVal,
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

  const completedCount = Object.values(completedActions).filter(Boolean).length;

  return (
    <div className="space-y-6 sm:space-y-8 pb-16 font-sans">
      {/* 1. TOP SECTION GREETING */}
      <div className="relative rounded-3xl overflow-hidden bg-neutral-900 text-white shadow-md border border-neutral-200 dark:border-neutral-800">
        <img
          src={HERO_IMAGE_URL}
          alt="Lush green farmlands of Maharashtra"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover opacity-35 mix-blend-luminosity scale-105"
          onError={(e) => {
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/95 via-emerald-900/80 to-transparent" />

        <div className="relative p-6 sm:p-8 md:p-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 backdrop-blur-xs text-emerald-200 text-xs font-semibold mb-3 border border-emerald-700/60">
            <span>{t('common.prototypeTag')}</span>
            <span aria-hidden="true">·</span>
            <span>{farmerProfile.district}, {farmerProfile.state}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-2">
            {t('dashboard.greeting', { name: farmerProfile.name })}
          </h1>
          <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed mb-6 font-normal">
            {t('dashboard.subtitle', { area: farmerProfile.farmArea })}
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setActiveTab('crop-recommendation')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm shadow-sm transition-all cursor-pointer"
            >
              <span>{t('dashboard.exploreCropBtn')}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveTab('disease-detection')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm backdrop-blur-xs border border-white/20 transition-all cursor-pointer"
            >
              <span>{t('dashboard.scanLeafBtn')}</span>
            </button>
            <button
              onClick={() => setActiveTab('google-drive')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-950/70 hover:bg-emerald-900/90 text-emerald-200 font-semibold text-xs sm:text-sm backdrop-blur-xs border border-emerald-600/40 transition-all cursor-pointer"
            >
              <HardDrive className="w-4 h-4" />
              <span>{t('dashboard.driveLockerBtn')}</span>
            </button>
          </div>
        </div>
      </div>

      <PrototypeBanner />

      {/* 2. TODAY'S FARM ACTION - CRITICAL ADVISORY STRIP */}
      <div className="p-6 rounded-3xl bg-white dark:bg-neutral-900 border-2 border-emerald-500/30 dark:border-emerald-500/20 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-100 dark:border-neutral-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-neutral-900 dark:text-neutral-100">
                {t('dashboard.todayActionsTitle')}
              </h2>
              <p className="text-xs text-neutral-500">
                {t('dashboard.todayActionsSubtitle')}
              </p>
            </div>
          </div>
          <span className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1 rounded-full font-semibold self-start sm:self-auto">
            {t('dashboard.completedCount', { completed: completedCount, total: 4 })}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
          {/* Action 1: Irrigation */}
          <div 
            onClick={() => toggleAction('irrigation')}
            className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
              completedActions['irrigation'] 
                ? 'bg-neutral-50 dark:bg-neutral-800/40 border-neutral-200 dark:border-neutral-700 opacity-60' 
                : 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200/80 dark:border-emerald-800/60 hover:border-emerald-400'
            }`}
          >
            <div className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center border transition-colors shrink-0 ${
              completedActions['irrigation'] ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-neutral-300 dark:border-neutral-600'
            }`}>
              {completedActions['irrigation'] && <Check className="w-3.5 h-3.5" />}
            </div>
            <div className="space-y-1 flex-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-neutral-900 dark:text-neutral-100">
                  {t('dashboard.holdIrrigationTitle')}
                </span>
                <span className="text-[10px] font-bold text-sky-700 dark:text-sky-300 bg-sky-100 dark:bg-sky-950/50 px-2 py-0.5 rounded">
                  {t('dashboard.holdIrrigationBadge')}
                </span>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {t('dashboard.holdIrrigationDesc', { moisture: 42, rain: 14.2 })}
              </p>
            </div>
          </div>

          {/* Action 2: Crop Health */}
          <div 
            onClick={() => toggleAction('scout')}
            className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
              completedActions['scout'] 
                ? 'bg-neutral-50 dark:bg-neutral-800/40 border-neutral-200 dark:border-neutral-700 opacity-60' 
                : 'bg-amber-50/40 dark:bg-amber-950/20 border-amber-200/80 dark:border-amber-800/60 hover:border-amber-400'
            }`}
          >
            <div className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center border transition-colors shrink-0 ${
              completedActions['scout'] ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-neutral-300 dark:border-neutral-600'
            }`}>
              {completedActions['scout'] && <Check className="w-3.5 h-3.5" />}
            </div>
            <div className="space-y-1 flex-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-neutral-900 dark:text-neutral-100">
                  {t('dashboard.scoutCanopyTitle')}
                </span>
                <span className="text-[10px] font-bold text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/50 px-2 py-0.5 rounded">
                  {t('dashboard.scoutCanopyBadge')}
                </span>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {t('dashboard.scoutCanopyDesc', { humidity: DEMO_WEATHER.humidity })}
              </p>
            </div>
          </div>

          {/* Action 3: Market Selling Window */}
          <div 
            onClick={() => toggleAction('mandi')}
            className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
              completedActions['mandi'] 
                ? 'bg-neutral-50 dark:bg-neutral-800/40 border-neutral-200 dark:border-neutral-700 opacity-60' 
                : 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200/80 dark:border-emerald-800/60 hover:border-emerald-400'
            }`}
          >
            <div className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center border transition-colors shrink-0 ${
              completedActions['mandi'] ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-neutral-300 dark:border-neutral-600'
            }`}>
              {completedActions['mandi'] && <Check className="w-3.5 h-3.5" />}
            </div>
            <div className="space-y-1 flex-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-neutral-900 dark:text-neutral-100">
                  {t('dashboard.monitorPriceTitle')}
                </span>
                <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/50 px-2 py-0.5 rounded">
                  {t('dashboard.monitorPriceBadge')}
                </span>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {t('dashboard.monitorPriceDesc', { price: '4,850', trend: '+1.5%' })}
              </p>
            </div>
          </div>

          {/* Action 4: Farm Calendar Activity */}
          <div 
            onClick={() => toggleAction('weeding')}
            className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
              completedActions['weeding'] 
                ? 'bg-neutral-50 dark:bg-neutral-800/40 border-neutral-200 dark:border-neutral-700 opacity-60' 
                : 'bg-neutral-50/60 dark:bg-neutral-800/40 border-neutral-200/80 dark:border-neutral-700/60 hover:border-neutral-300'
            }`}
          >
            <div className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center border transition-colors shrink-0 ${
              completedActions['weeding'] ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-neutral-300 dark:border-neutral-600'
            }`}>
              {completedActions['weeding'] && <Check className="w-3.5 h-3.5" />}
            </div>
            <div className="space-y-1 flex-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-neutral-900 dark:text-neutral-100">
                  {t('dashboard.scheduleWeedingTitle')}
                </span>
                <span className="text-[10px] font-bold text-neutral-600 dark:text-neutral-300 bg-neutral-200 dark:bg-neutral-700 px-2 py-0.5 rounded">
                  {t('dashboard.scheduleWeedingBadge')}
                </span>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {t('dashboard.scheduleWeedingDesc')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. FARM CONDITIONS & WEATHER CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Today's Weather */}
        <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-neutral-500 mb-2">
              <span className="font-semibold flex items-center gap-1.5">
                <CloudSun className="w-4 h-4 text-amber-500" />
                <span>{t('dashboard.weatherTitle')}</span>
              </span>
              <span className="text-[10px] font-mono text-emerald-600">{t('common.demoBadge')}</span>
            </div>
            <div className="flex items-baseline justify-between mb-1">
              <span className="text-3xl font-extrabold text-neutral-900 dark:text-neutral-100 font-mono tabular-nums">
                {DEMO_WEATHER.temperature}°C
              </span>
              <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                {DEMO_WEATHER.condition}
              </span>
            </div>
            <p className="text-xs text-neutral-500 flex items-center gap-1 mb-3">
              <MapPin className="w-3.5 h-3.5 text-neutral-400" />
              <span>{farmerProfile.district}, {farmerProfile.state}</span>
            </p>
          </div>

          <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 grid grid-cols-2 gap-2 text-[11px] text-neutral-600 dark:text-neutral-400">
            <div>
              <span className="text-neutral-400 block">{t('dashboard.rainProbability')}</span>
              <span className="font-bold text-neutral-800 dark:text-neutral-200">25%</span>
            </div>
            <div>
              <span className="text-neutral-400 block">{t('dashboard.humidity')}</span>
              <span className="font-bold text-neutral-800 dark:text-neutral-200">{DEMO_WEATHER.humidity}%</span>
            </div>
          </div>
        </div>

        {/* Soil Condition */}
        <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-neutral-500 mb-2">
              <span className="font-semibold flex items-center gap-1.5">
                <Sprout className="w-4 h-4 text-emerald-600" />
                <span>{t('dashboard.soilConditionTitle')}</span>
              </span>
              <span className="text-[10px] font-mono text-emerald-600">{t('common.optimal')}</span>
            </div>
            <p className="text-2xl font-extrabold text-neutral-900 dark:text-neutral-100 truncate">
              {farmerProfile.soilType}
            </p>
            <span className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold block mt-0.5">
              {t('dashboard.soilStatusOptimal', { moisture: 42, ph: 7.2 })}
            </span>
          </div>

          <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 text-[11px] text-neutral-500">
            <span>{t('dashboard.soilTempDesc', { temp: 26.2 })}</span>
          </div>
        </div>

        {/* Irrigation Recommendation */}
        <div 
          onClick={() => setActiveTab('irrigation')}
          className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs hover:border-emerald-500 cursor-pointer transition-all flex flex-col justify-between group"
        >
          <div>
            <div className="flex items-center justify-between text-xs text-neutral-500 mb-2">
              <span className="font-semibold flex items-center gap-1.5">
                <Droplets className="w-4 h-4 text-sky-600" />
                <span>{t('dashboard.irrigationTitle')}</span>
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-emerald-600" />
            </div>
            <p className="text-2xl font-extrabold text-neutral-900 dark:text-neutral-100">
              {t('dashboard.irrigationHold')}
            </p>
            <span className="text-xs text-sky-700 dark:text-sky-400 font-semibold block mt-0.5">
              {t('dashboard.rainReceived', { rain: 14.2 })}
            </span>
          </div>

          <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 text-[11px] text-neutral-500 flex justify-between">
            <span>{t('dashboard.todayNeedZero')}</span>
            <span className="text-emerald-600 font-semibold">{t('dashboard.simulateMeterLink')}</span>
          </div>
        </div>

        {/* Crop Health Status */}
        <div 
          onClick={() => setActiveTab('disease-detection')}
          className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs hover:border-emerald-500 cursor-pointer transition-all flex flex-col justify-between group"
        >
          <div>
            <div className="flex items-center justify-between text-xs text-neutral-500 mb-2">
              <span className="font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>{t('dashboard.cropHealthTitle')}</span>
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-emerald-600" />
            </div>
            <p className="text-2xl font-extrabold text-neutral-900 dark:text-neutral-100">
              {t('dashboard.watchFoliage')}
            </p>
            <span className="text-xs text-amber-700 dark:text-amber-400 font-semibold block mt-0.5">
              {t('dashboard.fungalRisk')}
            </span>
          </div>

          <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 text-[11px] text-neutral-500 flex justify-between">
            <span>{t('dashboard.nextTaskPrefix')}</span>
            <span className="text-emerald-600 font-semibold">{t('dashboard.scanLeafLink')}</span>
          </div>
        </div>
      </div>

      {/* 4. TODAY'S MARKET PRICES SNAPSHOT ROW */}
      <div className="p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                {t('dashboard.apmcRatesTitle')}
              </h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 uppercase tracking-wider">
                {t('common.demoBadge')}
              </span>
            </div>
            <p className="text-xs text-neutral-500 mt-0.5">
              {t('dashboard.apmcRatesSubtitle')}
            </p>
          </div>
          <button
            onClick={() => setActiveTab('market-prices')}
            className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1 self-start sm:self-auto cursor-pointer"
          >
            <span>{t('dashboard.fullBoardLink')}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {marketSnapshotCrops.map((item) => (
            <div
              key={item.crop}
              onClick={() => setSelectedCrop(item.crop)}
              className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                selectedCrop === item.crop
                  ? 'border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/30 ring-2 ring-emerald-600/30 shadow-xs'
                  : 'border-neutral-200/70 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700'
              }`}
            >
              <div className="flex items-center justify-between text-xs text-neutral-500 mb-1.5">
                <span className="font-bold text-neutral-900 dark:text-neutral-100">
                  {t(`crops.${item.crop}`)}
                </span>
                <span className={`inline-flex items-center text-[11px] font-bold ${item.up ? 'text-emerald-600' : 'text-red-500'}`}>
                  {item.diff}
                </span>
              </div>
              <p className="text-xl font-bold font-mono text-neutral-900 dark:text-neutral-100 tabular-nums">
                ₹{item.price.toLocaleString('en-IN')}
              </p>
              <span className="text-[10px] text-neutral-400">{t('dashboard.perQuintal')}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 5. INTERACTIVE PRICE TREND CHART & WEATHER RADAR */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Price Trend Chart */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                    {t('dashboard.priceTrendTitle')}
                  </h3>
                  <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded">
                    {t(`crops.${selectedCrop}`)}
                  </span>
                </div>
                <p className="text-xs text-neutral-500 mt-0.5">
                  {t('dashboard.priceTrendSubtitle')}
                </p>
              </div>

              {/* Time Range Selector */}
              <div className="flex items-center gap-1 p-1 bg-neutral-100 dark:bg-neutral-800 rounded-xl self-start sm:self-auto">
                {(['7', '15', '30'] as const).map((r) => (
                  <button
                    key={r}
                    onClick={() => setTimeRange(r)}
                    className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                      timeRange === r
                        ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 shadow-xs'
                        : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
                    }`}
                  >
                    {t('dashboard.daysHorizon', { days: r })}
                  </button>
                ))}
              </div>
            </div>

            {/* Recharts Chart */}
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
                  <Line 
                    type="monotone" 
                    dataKey="historicalPrice" 
                    stroke="#047857" 
                    strokeWidth={2.5} 
                    dot={{ r: 3, fill: '#047857' }} 
                    activeDot={{ r: 5 }}
                    isAnimationActive={true}
                    name={t('dashboard.historicalLine')}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="predictedPrice" 
                    stroke="#10b981" 
                    strokeWidth={2.5} 
                    strokeDasharray="4 4" 
                    dot={{ r: 3, fill: '#10b981' }}
                    isAnimationActive={true}
                    name={t('dashboard.forecastLine')}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800 flex flex-wrap items-center justify-between text-xs text-neutral-500 gap-2">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-neutral-700 dark:text-neutral-300">{t('dashboard.trendSignal')}</span>
              <span className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-semibold">
                <TrendingUp className="w-3.5 h-3.5" />
                {t('dashboard.bullishSignal')}
              </span>
            </div>
            <button
              onClick={() => setActiveTab('price-prediction')}
              className="text-emerald-700 dark:text-emerald-400 font-bold hover:underline cursor-pointer"
            >
              {t('dashboard.analyzeHorizonLink')}
            </button>
          </div>
        </div>

        {/* Upcoming Farm Activities Card */}
        <div className="p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
                <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                  {t('dashboard.upcomingTitle')}
                </h3>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded">
                {t('dashboard.upcomingSubtitle')}
              </span>
            </div>

            <div className="space-y-3.5 text-xs">
              <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-100 dark:border-neutral-700/60">
                <div className="flex items-center justify-between text-neutral-400 mb-1">
                  <span>Day 25 Post-Sowing</span>
                  <span className="text-emerald-600 font-bold">{t('dashboard.inDays', { days: 3 })}</span>
                </div>
                <h4 className="font-bold text-neutral-800 dark:text-neutral-200">
                  {t('dashboard.day25Title')}
                </h4>
                <p className="text-[11px] text-neutral-500 mt-0.5">
                  {t('dashboard.day25Desc')}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-100 dark:border-neutral-700/60">
                <div className="flex items-center justify-between text-neutral-400 mb-1">
                  <span>Day 35 Post-Sowing</span>
                  <span>{t('dashboard.inDays', { days: 13 })}</span>
                </div>
                <h4 className="font-bold text-neutral-800 dark:text-neutral-200">
                  {t('dashboard.day35Title')}
                </h4>
                <p className="text-[11px] text-neutral-500 mt-0.5">
                  {t('dashboard.day35Desc')}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-100 dark:border-neutral-700/60">
                <div className="flex items-center justify-between text-neutral-400 mb-1">
                  <span>Day 50 Post-Sowing</span>
                  <span>{t('dashboard.inDays', { days: 28 })}</span>
                </div>
                <h4 className="font-bold text-neutral-800 dark:text-neutral-200">
                  {t('dashboard.day50Title')}
                </h4>
                <p className="text-[11px] text-neutral-500 mt-0.5">
                  {t('dashboard.day50Desc')}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800">
            <button
              onClick={() => setActiveTab('farm-calendar')}
              className="w-full py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-semibold text-xs hover:bg-emerald-100 text-center transition-colors cursor-pointer"
            >
              {t('dashboard.viewCalendarBtn')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
