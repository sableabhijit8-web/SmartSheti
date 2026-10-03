import React, { useState, useEffect } from 'react';
import { 
  Scale, 
  MapPin, 
  Truck, 
  IndianRupee, 
  TrendingUp, 
  Info, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { ALL_CROPS } from '../../data/mockData';
import { CropName, MarketComparisonResult } from '../../types';
import { compareMarkets, MarketComparisonParams } from '../../services/marketComparisonService';
import { PrototypeBanner } from '../layout/PrototypeBanner';
import { useApp } from '../../context/AppContext';

export const MarketComparisonView: React.FC = () => {
  const { farmerProfile, showToast } = useApp();

  const [selectedCrop, setSelectedCrop] = useState<CropName>('Soybean');
  const [quantity, setQuantity] = useState<number>(45); // in quintals
  const [farmerLocation, setFarmerLocation] = useState<string>(
    `${farmerProfile.village || 'Baramati'}, ${farmerProfile.district || 'Pune'}`
  );
  const [isLoading, setIsLoading] = useState(false);
  const [comparisonResults, setComparisonResults] = useState<MarketComparisonResult[]>([]);

  const handleRunComparison = async (crop: CropName, qty: number, loc: string) => {
    if (qty <= 0) {
      showToast('Quantity must be greater than zero quintals', 'warning');
      return;
    }
    setIsLoading(true);
    try {
      const res = await compareMarkets({
        crop,
        quantityQuintals: qty,
        farmerLocation: loc,
      });
      setComparisonResults(res);
    } catch {
      showToast('Error calculating market realization', 'warning');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleRunComparison(selectedCrop, quantity, farmerLocation);
  }, [selectedCrop, quantity]);

  // Transform data for Recharts Bar Chart
  const chartData = comparisonResults.map((r) => ({
    name: r.market.replace(' APMC', ''),
    netRevenue: r.estimatedNetRevenue,
    grossRevenue: r.grossRevenue,
    transportCost: r.totalTransportCost,
    isTop: r.isHigherRealization,
  }));

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
            <Scale className="w-5 h-5" />
          </span>
          <h2 className="text-2xl font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight">
            Compare Markets (Net Realization Calculator)
          </h2>
        </div>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Compute net take-home realization by factoring distance, logistics freight, and regional mandi prices.
        </p>
      </div>

      <PrototypeBanner 
        subtext="Prototype calculation — freight rates and mandi price spreads represent demonstration estimates. Local transport negotiation and quality grading differences will impact final realization."
      />

      {/* Input Parameters Box */}
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
              Total Quantity (Quintals / 100kg bags)
            </label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full px-3 py-2 text-xs rounded-lg bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-1 focus:ring-emerald-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
              Farmer Origin Location
            </label>
            <input
              type="text"
              value={farmerLocation}
              onChange={(e) => setFarmerLocation(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-1 focus:ring-emerald-600 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Realization Bar Chart */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
              Estimated Net Revenue Comparison
            </h3>
            <p className="text-xs text-neutral-500">
              Formula: (Market Price × {quantity} Quintals) − Total Freight & APMC Logistics
            </p>
          </div>
          <span className="text-xs text-emerald-800 dark:text-emerald-400 font-semibold self-start sm:self-auto">
            Green Bar: Higher Estimated Net Realization
          </span>
        </div>

        <div className="h-64 sm:h-72 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} opacity={0.6} />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 11, fill: '#6b7280' }} 
                axisLine={{ stroke: '#e5e7eb' }}
                tickLine={false}
              />
              <YAxis 
                tick={{ fontSize: 11, fill: '#6b7280' }} 
                axisLine={{ stroke: '#e5e7eb' }}
                tickLine={false}
                tickFormatter={(val) => `₹${(val / 1000).toFixed(0)}k`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                  borderRadius: '8px', 
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', 
                  border: '1px solid #e5e7eb',
                  fontSize: '12px' 
                }}
                formatter={(value: any) => [`₹${Number(value).toLocaleString('en-IN')}`, 'Estimated Net Revenue']}
              />
              <Bar dataKey="netRevenue" radius={[6, 6, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.isTop ? '#047857' : '#94a3b8'} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Comparison Detail Cards / Table */}
      <div className="space-y-3">
        <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
          Mandi Breakdown & Transport Math
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {comparisonResults.map((item) => (
            <div
              key={item.market}
              className={`p-4 rounded-xl border transition-all ${
                item.isHigherRealization
                  ? 'border-emerald-600 bg-emerald-50/40 dark:bg-emerald-950/20 ring-1 ring-emerald-600'
                  : 'border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                      {item.market}
                    </h4>
                    {item.isHigherRealization && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-700 text-white">
                        Higher Estimated Net Realization
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-neutral-500">
                    District: {item.district} · Distance from origin: ~{item.distanceKm} km
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-neutral-100 dark:border-neutral-800 text-xs">
                <div>
                  <span className="text-[10px] text-neutral-400 block">Mandi Rate</span>
                  <span className="font-semibold text-neutral-800 dark:text-neutral-200 font-mono tabular-nums">
                    ₹{item.marketPrice}/Qtl
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-neutral-400 block">Est. Freight/Qtl</span>
                  <span className="font-semibold text-neutral-800 dark:text-neutral-200 font-mono tabular-nums">
                    ₹{item.transportCostPerQuintal}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-neutral-400 block">Gross Revenue</span>
                  <span className="font-semibold text-neutral-800 dark:text-neutral-200 font-mono tabular-nums">
                    ₹{item.grossRevenue.toLocaleString('en-IN')}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-neutral-400 block">Est. Net Revenue</span>
                  <span className="font-extrabold text-emerald-800 dark:text-emerald-300 font-mono tabular-nums">
                    ₹{item.estimatedNetRevenue.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-3.5 rounded-xl bg-neutral-100 dark:bg-neutral-800/50 text-xs text-neutral-500 text-center">
        “Note: Formulated as Higher Estimated Net Realization rather than absolute Best Market, as actual mandi commission charges, weighing cess, and daily truck availability fluctuate.”
      </div>
    </div>
  );
};
