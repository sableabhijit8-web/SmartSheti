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
import { compareMarkets } from '../../services/marketComparisonService';
import { PrototypeBanner } from '../layout/PrototypeBanner';
import { useApp } from '../../context/AppContext';

export const MarketComparisonView: React.FC = () => {
  const { farmerProfile, showToast, t } = useApp();

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
      showToast(t('common.error'), 'warning');
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
    <div className="space-y-6 max-w-5xl mx-auto pb-16 font-sans">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="p-1.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
            <Scale className="w-5 h-5" />
          </span>
          <h2 className="text-2xl font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight">
            {t('marketComparison.title')}
          </h2>
        </div>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {t('marketComparison.subtitle')}
        </p>
      </div>

      <PrototypeBanner />

      {/* Input Parameters Box */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
              {t('marketComparison.crop')}
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
              {t('marketComparison.quantity')}
            </label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-1 focus:ring-emerald-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
              {t('marketComparison.farmerLocation')}
            </label>
            <input
              type="text"
              value={farmerLocation}
              onChange={(e) => setFarmerLocation(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-1 focus:ring-emerald-600 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Bar Chart Comparison */}
      <div className="p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
            {t('marketComparison.title')}
          </h3>
          <span className="text-xs text-neutral-500">
            {quantity} {t('common.quintals')} {t(`crops.${selectedCrop}`)}
          </span>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} opacity={0.6} />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={(val) => `₹${val / 1000}k`} />
              <Tooltip 
                formatter={(val: any) => [`₹${Number(val).toLocaleString('en-IN')}`, t('marketComparison.netRevenueCol')]}
              />
              <Bar dataKey="netRevenue" radius={[6, 6, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.isTop ? '#059669' : '#9ca3af'} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="rounded-3xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-50 dark:bg-neutral-800/60 text-neutral-500 uppercase tracking-wider font-semibold border-b border-neutral-200 dark:border-neutral-800">
              <tr>
                <th className="p-4">{t('marketComparison.marketCol')}</th>
                <th className="p-4">{t('marketPrices.districtCol')}</th>
                <th className="p-4 text-right">{t('marketComparison.rateCol')}</th>
                <th className="p-4 text-right">{t('marketComparison.distanceCol')}</th>
                <th className="p-4 text-right">{t('marketComparison.freightCol')}</th>
                <th className="p-4 text-right">{t('marketComparison.grossRevenueCol')}</th>
                <th className="p-4 text-right font-bold text-neutral-900 dark:text-neutral-100">
                  {t('marketComparison.netRevenueCol')}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
              {comparisonResults.map((res) => (
                <tr 
                  key={res.market}
                  className={`transition-colors ${
                    res.isHigherRealization 
                      ? 'bg-emerald-50/60 dark:bg-emerald-950/30 font-semibold' 
                      : 'hover:bg-neutral-50/70 dark:hover:bg-neutral-800/40'
                  }`}
                >
                  <td className="p-4 flex items-center gap-2">
                    <span className="text-neutral-900 dark:text-neutral-100">{res.market}</span>
                    {res.isHigherRealization && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-600 text-white">
                        {t('marketComparison.highestRealizationBadge')}
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-neutral-500">{res.district}</td>
                  <td className="p-4 text-right font-mono tabular-nums">₹{res.marketPrice}</td>
                  <td className="p-4 text-right text-neutral-500">{res.distanceKm} {t('common.km')}</td>
                  <td className="p-4 text-right text-neutral-500">₹{res.transportCostPerQuintal}</td>
                  <td className="p-4 text-right font-mono tabular-nums">₹{res.grossRevenue.toLocaleString('en-IN')}</td>
                  <td className={`p-4 text-right font-mono font-bold tabular-nums ${
                    res.isHigherRealization ? 'text-emerald-700 dark:text-emerald-300 text-sm' : 'text-neutral-900 dark:text-neutral-100'
                  }`}>
                    ₹{res.estimatedNetRevenue.toLocaleString('en-IN')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 bg-neutral-50/50 dark:bg-neutral-800/30 border-t border-neutral-100 dark:border-neutral-800 text-[11px] text-neutral-500">
          {t('marketComparison.formulaNote')}
        </div>
      </div>
    </div>
  );
};
