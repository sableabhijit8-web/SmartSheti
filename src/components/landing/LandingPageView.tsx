import React, { useState } from 'react';
import { 
  Sprout, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Leaf, 
  Bug, 
  Store, 
  TrendingUp, 
  Droplets, 
  Calendar, 
  Tractor, 
  Languages, 
  HardDrive, 
  Scale, 
  BarChart3,
  Layers,
  Sparkles,
  MapPin,
  Clock,
  Compass,
  AlertTriangle,
  HelpCircle,
  Cpu,
  Check,
  ChevronRight,
  Gauge,
  Thermometer,
  CloudRain
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SUPPORTED_LANGUAGES } from '../../locales';
import { Footer } from '../layout/Footer';
import { ALL_CROPS, DEMO_WEATHER } from '../../data/mockData';
import { CropName } from '../../types';

const HERO_IMG = '/src/assets/images/krushi_hero_farm_1791035102459.jpg';
const DISEASE_SAMPLE_IMG = '/src/assets/images/crop_leaf_blight_1791035117330.jpg';
const HEALTHY_SAMPLE_IMG = '/src/assets/images/crop_leaf_healthy_17910351310.jpg';

export const LandingPageView: React.FC = () => {
  const { setActiveTab, setLanguage, language, t } = useApp();

  // Interactive Demo state for Section 4 (Crop Intelligence Preview)
  const [demoCrop, setDemoCrop] = useState<CropName>('Soybean');
  const [demoNitrogen, setDemoNitrogen] = useState(85);
  const [demoPhosphorus, setDemoPhosphorus] = useState(45);
  const [demoPotassium, setDemoPotassium] = useState(40);

  // Interactive Demo state for Section 5 (Disease Detection Preview)
  const [activeLeafSample, setActiveLeafSample] = useState<'blight' | 'healthy'>('blight');

  // Interactive Demo state for Section 6 (Market Intelligence Preview)
  const [marketCrop, setMarketCrop] = useState<CropName>('Soybean');
  const [marketQuintals, setMarketQuintals] = useState(50);

  // Interactive Demo state for Section 7 (Irrigation Intelligence Preview)
  const [soilMoisture, setSoilMoisture] = useState(42);

  // Calculate dynamic demo suitability
  const suitabilityScore = Math.min(94, Math.max(45, Math.round(
    demoCrop === 'Soybean' ? 88 + (demoNitrogen - 80) * 0.2 :
    demoCrop === 'Cotton' ? 84 + (demoPhosphorus - 40) * 0.3 :
    demoCrop === 'Wheat' ? 90 + (demoPotassium - 40) * 0.25 : 82
  )));

  return (
    <div className="space-y-16 sm:space-y-28 pb-12 font-sans">
      {/* 1. HERO SECTION */}
      <section className="relative rounded-3xl overflow-hidden bg-neutral-950 text-white shadow-2xl border border-neutral-800">
        {/* Background Image with soft dark scrim */}
        <img
          src={HERO_IMG}
          alt="Modern Indian Farmlands"
          className="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-luminosity scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/95 via-emerald-900/85 to-neutral-950/70" />

        <div className="relative p-6 sm:p-12 lg:p-16 max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-800/80 border border-emerald-600/40 text-emerald-200 text-xs font-semibold backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>AI-Powered Decision Support for Indian Farmers 🇮🇳</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Smart Farming Starts With Better Decisions
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-emerald-100/90 leading-relaxed font-normal max-w-2xl">
            KrushiAI brings AI-powered crop recommendations, disease detection, market intelligence, irrigation guidance and farm planning into one simple platform.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => setActiveTab('dashboard')}
              className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm sm:text-base shadow-lg hover:shadow-emerald-600/20 transition-all flex items-center gap-2.5 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Start Farming Smarter</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('features-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else setActiveTab('crop-recommendation');
              }}
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm sm:text-base backdrop-blur-xs border border-white/20 transition-all cursor-pointer"
            >
              <span>Explore KrushiAI</span>
            </button>
          </div>

          {/* Quick Metrics Bar */}
          <div className="pt-8 border-t border-emerald-800/60 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="p-3 rounded-xl bg-black/20 border border-white/5">
              <span className="text-emerald-400 font-extrabold text-xl font-mono block tabular-nums">15+</span>
              <span className="text-emerald-200/80 text-[11px]">Agronomic Questions</span>
            </div>
            <div className="p-3 rounded-xl bg-black/20 border border-white/5">
              <span className="text-emerald-400 font-extrabold text-xl font-mono block tabular-nums">13</span>
              <span className="text-emerald-200/80 text-[11px]">Indian Languages</span>
            </div>
            <div className="p-3 rounded-xl bg-black/20 border border-white/5">
              <span className="text-emerald-400 font-extrabold text-xl font-mono block tabular-nums">7 - 30 d</span>
              <span className="text-emerald-200/80 text-[11px]">Mandi Price Forecast</span>
            </div>
            <div className="p-3 rounded-xl bg-black/20 border border-white/5">
              <span className="text-emerald-400 font-extrabold text-xl font-mono block tabular-nums">Soil → APMC</span>
              <span className="text-emerald-200/80 text-[11px]">End-to-End Decision Flow</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHAT KRUSHIAI DOES */}
      <section className="space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            End-to-End Agronomy Platform
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight">
            From Soil to Market — Complete Decision Support
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Traditional farming relies on guesswork, unverified advice, and distress sales. KrushiAI replaces uncertainty with data-grounded guidance across the full crop lifecycle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-7 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-sm hover:shadow-md transition-shadow space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 flex items-center justify-center font-bold text-lg">
              1
            </div>
            <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
              Pre-Sowing & Soil Analytics
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Match soil N-P-K mineral levels, pH balance, and seasonal monsoon rainfall with optimal crop candidates for maximum net margin before you buy seeds.
            </p>
            <ul className="text-xs text-neutral-600 dark:text-neutral-400 space-y-1.5 pt-2 border-t border-neutral-100 dark:border-neutral-800">
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Soil Health Card parameter matching</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Multi-factor suitability scoring</span>
              </li>
            </ul>
          </div>

          <div className="p-7 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-sm hover:shadow-md transition-shadow space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 flex items-center justify-center font-bold text-lg">
              2
            </div>
            <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
              Crop Protection & Smart Irrigation
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Scan leaf images for early blight lesions and monitor root-zone moisture to irrigate only when crops physiologically demand it, saving diesel & electricity.
            </p>
            <ul className="text-xs text-neutral-600 dark:text-neutral-400 space-y-1.5 pt-2 border-t border-neutral-100 dark:border-neutral-800">
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Computer vision foliar pathology</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Evapotranspiration soil moisture balance</span>
              </li>
            </ul>
          </div>

          <div className="p-7 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-sm hover:shadow-md transition-shadow space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 flex items-center justify-center font-bold text-lg">
              3
            </div>
            <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
              Mandi Realization & Post-Harvest
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Forecast 7 to 30 day mandi price movements and calculate transport freight to discover the highest estimated net realization across APMCs.
            </p>
            <ul className="text-xs text-neutral-600 dark:text-neutral-400 space-y-1.5 pt-2 border-t border-neutral-100 dark:border-neutral-800">
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>True net realization after trucking cost</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>7, 15, and 30 day forecast bands</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3. AI-POWERED FEATURES GRID */}
      <section id="features-section" className="space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            Intelligent Engines
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-neutral-100">
            8 Specialized Modules for Every Farming Stage
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
            Click any module below to immediately launch its interactive decision workspace.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              icon: Leaf,
              title: 'Crop Recommendation',
              tab: 'crop-recommendation' as const,
              desc: 'Soil health card analysis (N-P-K, pH, water) for optimal seasonal crop selection.',
              tag: 'Demo Score: 88/100',
            },
            {
              icon: Bug,
              title: 'Disease Scanner',
              tab: 'disease-detection' as const,
              desc: 'Computer-vision leaf pathology detection with safe IPM cultural controls.',
              tag: 'CV Leaf Analysis',
            },
            {
              icon: TrendingUp,
              title: 'Price Forecast',
              tab: 'price-prediction' as const,
              desc: 'Multi-horizon mandi price projections with historical variance bands.',
              tag: '7, 15, 30 Days',
            },
            {
              icon: Droplets,
              title: 'Smart Irrigation',
              tab: 'irrigation' as const,
              desc: 'Evapotranspiration-based soil water balance and scheduled watering durations.',
              tag: 'ET0 Sensor Model',
            },
            {
              icon: Scale,
              title: 'Compare Markets',
              tab: 'market-comparison' as const,
              desc: 'Calculate gross mandi price minus truck freight for true net realization.',
              tag: 'Net Realization',
            },
            {
              icon: BarChart3,
              title: 'Yield Estimation',
              tab: 'yield-prediction' as const,
              desc: 'Project gross harvest production (Tonnes/Ha) with positive & limiting drivers.',
              tag: 'XGBoost Baseline',
            },
            {
              icon: Calendar,
              title: 'Farm Calendar',
              tab: 'farm-calendar' as const,
              desc: 'Step-by-step month-by-month agricultural roadmap from ploughing to market.',
              tag: 'Day -15 to Harvest',
            },
            {
              icon: HardDrive,
              title: 'Drive Farm Locker',
              tab: 'google-drive' as const,
              desc: 'Back up farm dossiers, soil reports, and APMC spreadsheets to Google Drive.',
              tag: 'Cloud Backup',
            },
          ].map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                onClick={() => setActiveTab(feat.tab)}
                className="group cursor-pointer p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md">
                      {feat.tag}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors mb-1.5">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs text-emerald-700 dark:text-emerald-400 font-semibold">
                  <span>Launch Engine</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-emerald-900 to-neutral-950 text-white shadow-xl relative overflow-hidden">
        <div className="relative max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800 text-emerald-200 text-xs font-semibold">
            <Cpu className="w-3.5 h-3.5" />
            <span>Operational Architecture</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            How KrushiAI Delivers Farm Intelligence
          </h2>

          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
            A seamless three-step pipeline engineered for minimal friction, low bandwidth, and simple vernacular interaction.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15 space-y-3">
              <span className="w-8 h-8 rounded-full bg-emerald-500 text-neutral-950 font-bold flex items-center justify-center text-sm">
                01
              </span>
              <h3 className="text-base font-bold text-white">Input Farm & Soil Profile</h3>
              <p className="text-xs text-emerald-100/80 leading-relaxed">
                Provide your district, soil type, N-P-K values, or upload a photo of your crop foliage.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15 space-y-3">
              <span className="w-8 h-8 rounded-full bg-emerald-500 text-neutral-950 font-bold flex items-center justify-center text-sm">
                02
              </span>
              <h3 className="text-base font-bold text-white">AI & Agronomic Processing</h3>
              <p className="text-xs text-emerald-100/80 leading-relaxed">
                Rules-based agronomy algorithms and neural models process weather trends, APMC rates, and disease signs.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15 space-y-3">
              <span className="w-8 h-8 rounded-full bg-emerald-500 text-neutral-950 font-bold flex items-center justify-center text-sm">
                03
              </span>
              <h3 className="text-base font-bold text-white">Actionable Farmer Advisory</h3>
              <p className="text-xs text-emerald-100/80 leading-relaxed">
                Receive clear advisories: which crop to plant, when to irrigate, safe IPM treatments, and where to sell for best profit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CROP INTELLIGENCE SHOWCASE */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              Crop Intelligence
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-neutral-100">
              Scientific Crop Suitability Analysis
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1 max-w-xl">
              Match soil chemical composition and regional climate parameters against agronomic crop requirements. Try the interactive demo below:
            </p>
          </div>
          <button
            onClick={() => setActiveTab('crop-recommendation')}
            className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline"
          >
            <span>Open Full Crop Engine</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Interactive Crop Demo Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-sm grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
              1. Select Test Crop
            </h3>
            <div className="flex flex-wrap gap-2">
              {(['Soybean', 'Cotton', 'Wheat', 'Onion'] as CropName[]).map((c) => (
                <button
                  key={c}
                  onClick={() => setDemoCrop(c)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    demoCrop === c
                      ? 'bg-emerald-700 text-white font-semibold shadow-xs'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="pt-2 space-y-3">
              <div>
                <div className="flex justify-between text-xs text-neutral-500 mb-1">
                  <span>Nitrogen (N): {demoNitrogen} kg/ha</span>
                  <span className="font-mono">{demoNitrogen > 80 ? 'Optimal' : 'Low'}</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="140"
                  value={demoNitrogen}
                  onChange={(e) => setDemoNitrogen(Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-neutral-500 mb-1">
                  <span>Phosphorus (P): {demoPhosphorus} kg/ha</span>
                  <span className="font-mono">{demoPhosphorus > 35 ? 'Optimal' : 'Low'}</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="90"
                  value={demoPhosphorus}
                  onChange={(e) => setDemoPhosphorus(Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Result Gauge */}
          <div className="lg:col-span-2 p-5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-800/40 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                  Calculated Demonstration Match
                </span>
                <span className="text-[10px] uppercase font-bold text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/50 px-2 py-0.5 rounded">
                  Demo Score
                </span>
              </div>

              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-4xl sm:text-5xl font-extrabold text-emerald-900 dark:text-emerald-200 font-mono">
                  {suitabilityScore}/100
                </span>
                <span className="text-sm font-bold text-emerald-700 dark:text-emerald-400">
                  {suitabilityScore >= 80 ? 'Highly Suitable' : suitabilityScore >= 60 ? 'Moderately Suitable' : 'Marginal'}
                </span>
              </div>

              <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">
                {demoCrop} shows excellent responsiveness in Maharashtra Vertisol with current N:P balance. Expected harvest window: 90 - 105 days.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-emerald-200/60 dark:border-emerald-800/40 flex items-center justify-between text-xs">
              <span className="text-neutral-500">Water Requirement: <strong>Medium</strong></span>
              <button
                onClick={() => setActiveTab('crop-recommendation')}
                className="font-bold text-emerald-700 dark:text-emerald-300 hover:underline flex items-center gap-1"
              >
                <span>Full Soil Health Analysis</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. DISEASE DETECTION SHOWCASE */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              Disease Detection
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-neutral-100">
              Computer Vision Foliar Pathology
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1 max-w-xl">
              Identify early crop blight, rust, and pest signs from standard smartphone photos with safe cultural and IPM advisories.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('disease-detection')}
            className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline"
          >
            <span>Scan Foliage Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveLeafSample('blight')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeLeafSample === 'blight'
                    ? 'bg-red-700 text-white shadow-xs'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300'
                }`}
              >
                Test Blight Sample
              </button>
              <button
                onClick={() => setActiveLeafSample('healthy')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeLeafSample === 'healthy'
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300'
                }`}
              >
                Test Healthy Sample
              </button>
            </div>

            <div className="relative rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 aspect-video bg-neutral-950">
              <img
                src={activeLeafSample === 'blight' ? DISEASE_SAMPLE_IMG : HEALTHY_SAMPLE_IMG}
                alt="Crop leaf sample"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/70 backdrop-blur-xs text-[11px] font-mono text-white flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${activeLeafSample === 'blight' ? 'bg-amber-400' : 'bg-emerald-400'}`} />
                <span>{activeLeafSample === 'blight' ? 'Lesions Detected (Demo)' : 'Healthy Tissue (Demo)'}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/70 dark:border-neutral-700/60 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
                  Diagnosis Result
                </span>
                <span className="text-[10px] font-bold text-neutral-500 bg-neutral-200 dark:bg-neutral-700 px-2 py-0.5 rounded">
                  Prototype Demo
                </span>
              </div>

              <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                {activeLeafSample === 'blight' ? 'Tomato Early Blight (Alternaria solani)' : 'Healthy Soybean Foliage'}
              </h3>

              <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                {activeLeafSample === 'blight'
                  ? 'Concentric brown ring lesions with chlorotic yellow halos observed on lower foliage. Fungal pathogen thrives in high morning humidity.'
                  : 'Foliage demonstrates uniform chlorophyll pigmentation, robust stomatal integrity, and zero observable pathogen lesions.'}
              </p>

              <div className="pt-2 border-t border-neutral-200/60 dark:border-neutral-700 text-xs">
                <span className="font-semibold text-neutral-800 dark:text-neutral-200 block mb-1">
                  Safe Advisory Guideline:
                </span>
                <p className="text-[11px] text-neutral-500">
                  Prune infected bottom leaves. Avoid overhead sprinkler irrigation. Follow CIB&RC approved organic biocontrols and consult your Taluka Krishi Adhikari.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. MARKET INTELLIGENCE SHOWCASE */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              Market Intelligence
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-neutral-100">
              True Net Realization Across APMCs
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1 max-w-xl">
              A higher mandi rate doesn't guarantee more profit if transport freight consumes your margin. Compare net revenue directly:
            </p>
          </div>
          <button
            onClick={() => setActiveTab('market-comparison')}
            className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline"
          >
            <span>Compare 8 Markets</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-sm space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200/70 dark:border-neutral-700/60">
              <span className="text-xs text-neutral-500 block mb-1">Pune APMC (45 km)</span>
              <span className="text-2xl font-bold font-mono text-neutral-900 dark:text-neutral-100">₹4,850/q</span>
              <span className="text-[11px] text-emerald-700 dark:text-emerald-400 block mt-1">Net Realization: ₹2,40,750</span>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200/70 dark:border-neutral-700/60">
              <span className="text-xs text-neutral-500 block mb-1">Nashik APMC (180 km)</span>
              <span className="text-2xl font-bold font-mono text-neutral-900 dark:text-neutral-100">₹4,950/q</span>
              <span className="text-[11px] text-amber-700 dark:text-amber-400 block mt-1">Net Realization: ₹2,38,500 (High freight)</span>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200/70 dark:border-neutral-700/60">
              <span className="text-xs text-neutral-500 block mb-1">Lasalgaon APMC (210 km)</span>
              <span className="text-2xl font-bold font-mono text-neutral-900 dark:text-neutral-100">₹5,010/q</span>
              <span className="text-[11px] text-neutral-500 block mt-1">Net Realization: ₹2,39,800</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/40 text-xs text-emerald-900 dark:text-emerald-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0" />
              <span><strong>Decision Insight:</strong> Pune APMC yields ₹2,250 higher net profit for 50 quintals despite a lower gross quote, due to lower diesel trucking charges.</span>
            </div>
            <button
              onClick={() => setActiveTab('market-comparison')}
              className="font-bold underline shrink-0 ml-4"
            >
              Run with my quantity
            </button>
          </div>
        </div>
      </section>

      {/* 8. IRRIGATION INTELLIGENCE SHOWCASE */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              Irrigation Intelligence
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-neutral-100">
              Evapotranspiration & Soil Water Balance
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1 max-w-xl">
              Prevent root waterlogging and save irrigation energy by watering precisely when your crop demands it.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('irrigation')}
            className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline"
          >
            <span>Open Irrigation Station</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <span className="text-xs font-bold text-neutral-500">Soil Moisture Simulator</span>
            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span>Moisture Level:</span>
                <span className="font-bold text-emerald-700 dark:text-emerald-400">{soilMoisture}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="90"
                value={soilMoisture}
                onChange={(e) => setSoilMoisture(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Slide to test how KrushiAI dynamically shifts recommendations between <em>Recommended</em>, <em>Monitor</em>, and <em>Not Required</em>.
            </p>
          </div>

          <div className="md:col-span-2 p-5 rounded-2xl bg-sky-50/50 dark:bg-sky-950/20 border border-sky-200/60 dark:border-sky-800/40 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-sky-800 dark:text-sky-300">
                  Current Status (Demo Model)
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  soilMoisture < 35 ? 'bg-amber-100 text-amber-800' :
                  soilMoisture > 70 ? 'bg-neutral-100 text-neutral-700' : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {soilMoisture < 35 ? 'Irrigation Recommended' : soilMoisture > 70 ? 'Waterlogging Risk - Hold' : 'Adequate - Monitor'}
                </span>
              </div>

              <h4 className="text-2xl font-extrabold text-neutral-900 dark:text-neutral-100 mb-1">
                {soilMoisture < 35 ? 'Apply 35 mm (Borewell / Drip)' : soilMoisture > 70 ? 'Hold Irrigation' : 'Next Irrigation in 48-72h'}
              </h4>

              <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                Vegetative soybean requires 3.8 mm/day ET0 water replacement. Recent 14.2 mm rain provides sufficient buffering in Black Cotton Soil.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-sky-200/60 dark:border-sky-800/40 flex items-center justify-between text-xs text-sky-900 dark:text-sky-300">
              <span>Root Zone Depth: <strong>45 cm</strong></span>
              <button
                onClick={() => setActiveTab('irrigation')}
                className="font-bold underline flex items-center gap-1"
              >
                <span>Calculate for my field</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FARM PLANNING SHOWCASE */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              Farm Planning
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-neutral-100">
              Operations, Spacing & Labour Calculator
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1 max-w-xl">
              Eliminate operational delays with stage-by-stage agronomic timelines and human labour manday estimates.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('farm-calendar')}
            className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline"
          >
            <span>Explore Farm Calendar</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div 
            onClick={() => setActiveTab('farm-calendar')}
            className="p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs cursor-pointer hover:border-emerald-500 transition-all space-y-3"
          >
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
              Crop Calendar Timeline
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Step-by-step milestones: Land preparation (Day -15), Sowing (Day 0), Weeding (Day 25), and Harvest (Day 95).
            </p>
            <div className="pt-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
              <span>View Timeline</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

          <div 
            onClick={() => setActiveTab('crop-spacing')}
            className="p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs cursor-pointer hover:border-emerald-500 transition-all space-y-3"
          >
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 flex items-center justify-center">
              <Tractor className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
              Crop Spacing Blueprint
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Accurate Row-to-Row and Plant-to-Plant distance guides (e.g. 45cm × 5cm for Soybean) to ensure full sunlight capture.
            </p>
            <div className="pt-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
              <span>View Spacing Charts</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

          <div 
            onClick={() => setActiveTab('farm-operations')}
            className="p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs cursor-pointer hover:border-emerald-500 transition-all space-y-3"
          >
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 flex items-center justify-center">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
              Labour Manday Estimator
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Forecast human mandays needed for sowing, weeding, and harvesting per hectare to plan seasonal operational capital.
            </p>
            <div className="pt-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
              <span>Calculate Mandays</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </section>

      {/* 10. MULTILINGUAL SHOWCASE */}
      <section className="p-8 sm:p-12 rounded-3xl bg-emerald-900 text-white shadow-xl relative overflow-hidden">
        <div className="relative max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800 text-emerald-200 text-xs font-semibold">
            <Languages className="w-3.5 h-3.5" />
            <span>Pan-India Agricultural Language Support</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Farming in Your Mother Tongue
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed max-w-2xl">
            KrushiAI natively supports 13 major Indian languages with tailored Unicode rendering, ensuring every smallholder farmer across Maharashtra, Punjab, Karnataka, and beyond can operate without language barriers.
          </p>

          <div className="pt-3 flex flex-wrap gap-2.5">
            {SUPPORTED_LANGUAGES.map((l) => (
              <button
                key={l.code}
                onClick={() => setLanguage(l.code)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  language === l.code
                    ? 'bg-white text-emerald-900 shadow-md font-bold scale-105'
                    : 'bg-emerald-800/80 hover:bg-emerald-800 text-emerald-100'
                }`}
              >
                <span>{l.nativeName}</span>
                <span className="text-[10px] ml-1.5 opacity-70">({l.name})</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 11. WHY KRUSHIAI COMPARISON */}
      <section className="space-y-6">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            The Difference
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-neutral-100">
            Why Indian Farmers Choose KrushiAI
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
            How data-driven decision support compares against traditional unguided farming practices.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200/80 dark:border-neutral-800 overflow-hidden shadow-xs">
            <thead className="bg-neutral-50 dark:bg-neutral-800/60 text-neutral-500 uppercase tracking-wider font-semibold border-b border-neutral-200 dark:border-neutral-800">
              <tr>
                <th className="p-4 sm:p-5">Farming Decision</th>
                <th className="p-4 sm:p-5 text-neutral-400">Traditional Farming</th>
                <th className="p-4 sm:p-5 text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-50/50 dark:bg-emerald-950/30">
                  With KrushiAI Decision Support
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
              <tr>
                <td className="p-4 sm:p-5 font-semibold text-neutral-900 dark:text-neutral-100">
                  Seed & Crop Selection
                </td>
                <td className="p-4 sm:p-5 text-neutral-600 dark:text-neutral-400">
                  Follow local trend or previous season regardless of soil exhaustion.
                </td>
                <td className="p-4 sm:p-5 font-medium text-emerald-900 dark:text-emerald-200 bg-emerald-50/30 dark:bg-emerald-950/20">
                  Soil health card analysis matched against crop water demand and expected APMC returns.
                </td>
              </tr>
              <tr>
                <td className="p-4 sm:p-5 font-semibold text-neutral-900 dark:text-neutral-100">
                  Foliar Disease Control
                </td>
                <td className="p-4 sm:p-5 text-neutral-600 dark:text-neutral-400">
                  Apply generic high-cost chemicals after full canopy damage has occurred.
                </td>
                <td className="p-4 sm:p-5 font-medium text-emerald-900 dark:text-emerald-200 bg-emerald-50/30 dark:bg-emerald-950/20">
                  Early lesion detection with camera upload and organic IPM cultural preventive recommendations.
                </td>
              </tr>
              <tr>
                <td className="p-4 sm:p-5 font-semibold text-neutral-900 dark:text-neutral-100">
                  Water & Irrigation
                </td>
                <td className="p-4 sm:p-5 text-neutral-600 dark:text-neutral-400">
                  Flood irrigation whenever electricity is on, leading to soil compaction & root rot.
                </td>
                <td className="p-4 sm:p-5 font-medium text-emerald-900 dark:text-emerald-200 bg-emerald-50/30 dark:bg-emerald-950/20">
                  ET0 weather-aware moisture tracking. Irrigate only when field capacity falls below critical threshold.
                </td>
              </tr>
              <tr>
                <td className="p-4 sm:p-5 font-semibold text-neutral-900 dark:text-neutral-100">
                  Mandi Selling Point
                </td>
                <td className="p-4 sm:p-5 text-neutral-600 dark:text-neutral-400">
                  Sell at nearest local middleman without knowing current rates in neighboring APMCs.
                </td>
                <td className="p-4 sm:p-5 font-medium text-emerald-900 dark:text-emerald-200 bg-emerald-50/30 dark:bg-emerald-950/20">
                  Multi-market comparison factoring freight transport costs for true maximum net realization.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 12. CALL TO ACTION */}
      <section className="p-8 sm:p-14 rounded-3xl bg-neutral-950 text-white text-center space-y-6 border border-neutral-800 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/30 via-transparent to-emerald-900/30 pointer-events-none" />

        <div className="relative max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/80 text-emerald-300 text-xs font-semibold border border-emerald-700/60">
            <Sprout className="w-3.5 h-3.5" />
            <span>Ready for the Next Generation of Smart Agronomy</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Ready to Transform Your Farm Decisions?
          </h2>

          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
            Open your farmer dashboard now to inspect today's field actions, analyze soil parameters, and explore live mandi rates.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setActiveTab('dashboard')}
              className="px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base shadow-lg hover:shadow-emerald-600/30 transition-all flex items-center gap-2.5 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Launch KrushiAI Dashboard</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => setActiveTab('crop-recommendation')}
              className="px-6 py-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-semibold text-base transition-colors cursor-pointer"
            >
              <span>Test Crop Engine</span>
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};
