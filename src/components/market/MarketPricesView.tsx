import React, { useState, useMemo } from 'react';
import { 
  Store, 
  Search, 
  Filter, 
  TrendingUp, 
  TrendingDown, 
  RotateCcw,
  Landmark,
  ArrowUpDown,
  Download
} from 'lucide-react';
import { DEMO_MARKET_PRICES, ALL_CROPS, MAHARASHTRA_DISTRICTS } from '../../data/mockData';
import { MarketPriceRecord, CropName } from '../../types';
import { PrototypeBanner } from '../layout/PrototypeBanner';
import { useApp } from '../../context/AppContext';

export const MarketPricesView: React.FC = () => {
  const { showToast, t } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCrop, setSelectedCrop] = useState<string>('All');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All');
  const [sortField, setSortField] = useState<'modalPrice' | 'crop' | 'market'>('modalPrice');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const filteredPrices = useMemo(() => {
    return DEMO_MARKET_PRICES.filter((record) => {
      const matchesSearch = 
        record.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.market.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.district.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCrop = selectedCrop === 'All' || record.crop === selectedCrop;
      const matchesDistrict = selectedDistrict === 'All' || record.district === selectedDistrict;

      return matchesSearch && matchesCrop && matchesDistrict;
    }).sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      if (typeof aVal === 'string') {
        return sortDirection === 'asc' 
          ? (aVal as string).localeCompare(bVal as string)
          : (bVal as string).localeCompare(aVal as string);
      }
      return sortDirection === 'asc' ? (aVal as number) - (bVal as number) : (bVal as number) - (aVal as number);
    });
  }, [searchTerm, selectedCrop, selectedDistrict, sortField, sortDirection]);

  const handleSort = (field: 'modalPrice' | 'crop' | 'market') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const handleExportCSV = () => {
    showToast(t('common.download'), 'info');
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16 font-sans">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
              <Store className="w-5 h-5" />
            </span>
            <h2 className="text-2xl font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight">
              {t('marketPrices.title')}
            </h2>
          </div>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {t('marketPrices.subtitle')}
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 transition-colors self-start sm:self-auto cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span>{t('common.download')} CSV</span>
        </button>
      </div>

      <PrototypeBanner />

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs space-y-3 sm:space-y-0 sm:flex sm:items-center sm:gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t('marketPrices.searchPlaceholder')}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-emerald-600"
          />
        </div>

        {/* Filter: District */}
        <div className="w-full sm:w-44">
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 focus:outline-none"
          >
            <option value="All">{t('common.all')} {t('cropRecommendation.district')}</option>
            {MAHARASHTRA_DISTRICTS.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        {/* Filter: Crop */}
        <div className="w-full sm:w-44">
          <select
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 focus:outline-none"
          >
            <option value="All">{t('common.all')} {t('common.actions')}</option>
            {ALL_CROPS.map((c) => (
              <option key={c} value={c}>{t(`crops.${c}`)}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-3xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-50 dark:bg-neutral-800/60 text-neutral-500 uppercase tracking-wider font-semibold border-b border-neutral-200 dark:border-neutral-800">
              <tr>
                <th 
                  onClick={() => handleSort('crop')}
                  className="p-4 cursor-pointer hover:text-neutral-800 dark:hover:text-neutral-200 select-none"
                >
                  <div className="flex items-center gap-1.5">
                    <span>{t('marketPrices.cropCol')}</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th 
                  onClick={() => handleSort('market')}
                  className="p-4 cursor-pointer hover:text-neutral-800 dark:hover:text-neutral-200 select-none"
                >
                  <div className="flex items-center gap-1.5">
                    <span>{t('marketPrices.mandiCol')}</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="p-4">{t('marketPrices.districtCol')}</th>
                <th 
                  onClick={() => handleSort('modalPrice')}
                  className="p-4 cursor-pointer hover:text-neutral-800 dark:hover:text-neutral-200 select-none text-right"
                >
                  <div className="flex items-center justify-end gap-1.5">
                    <span>{t('marketPrices.modalPriceCol')}</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="p-4 text-right">{t('marketPrices.minMaxCol')}</th>
                <th className="p-4 text-center">{t('marketPrices.changeCol')}</th>
                <th className="p-4 text-right">{t('marketPrices.updatedCol')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
              {filteredPrices.length > 0 ? (
                filteredPrices.map((record) => (
                  <tr 
                    key={record.id}
                    className="hover:bg-neutral-50/70 dark:hover:bg-neutral-800/40 transition-colors"
                  >
                    <td className="p-4 font-bold text-neutral-900 dark:text-neutral-100">
                      {t(`crops.${record.crop}`)}
                    </td>
                    <td className="p-4 text-neutral-700 dark:text-neutral-300">
                      {record.market}
                    </td>
                    <td className="p-4 text-neutral-500">
                      {record.district}
                    </td>
                    <td className="p-4 font-mono font-bold text-neutral-900 dark:text-neutral-100 text-right tabular-nums">
                      ₹{record.modalPrice.toLocaleString('en-IN')}
                    </td>
                    <td className="p-4 font-mono text-neutral-500 text-right tabular-nums">
                      ₹{record.minPrice} - ₹{record.maxPrice}
                    </td>
                    <td className="p-4 text-center">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold ${
                        record.priceChange >= 0
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400'
                          : 'bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-400'
                      }`}>
                        {record.priceChange >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        <span>{record.priceChange > 0 ? `+${record.priceChange}%` : `${record.priceChange}%`}</span>
                      </span>
                    </td>
                    <td className="p-4 text-neutral-400 text-right text-[11px]">
                      {record.lastUpdated}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-neutral-500">
                    <p className="font-semibold text-neutral-800 dark:text-neutral-200">
                      {t('marketPrices.emptyTitle')}
                    </p>
                    <p className="text-xs text-neutral-400 mt-1">
                      {t('marketPrices.emptyDesc')}
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
