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
  const { showToast } = useApp();

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
    showToast('Exported filtered demonstration APMC dataset (CSV format)', 'info');
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
              <Store className="w-5 h-5" />
            </span>
            <h2 className="text-2xl font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight">
              Maharashtra Mandi Market Prices
            </h2>
          </div>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Monitor daily arrival rates and modal prices across agricultural produce market committees (APMC).
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 transition-colors self-start sm:self-auto"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export APMC Rates</span>
        </button>
      </div>

      <PrototypeBanner 
        subtext="DEMO MARKET DATA — Never present these values as live market trading prices. Live government market data via eNAM / Agmarknet API and state agriculture marketing boards will be connected in future releases."
      />

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs space-y-3 sm:space-y-0 sm:flex sm:items-center sm:gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search crop, APMC market, or district..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-emerald-600"
          />
        </div>

        {/* Crop Filter */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-neutral-500 whitespace-nowrap">Crop:</span>
          <select
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
            className="px-2.5 py-1.5 text-xs rounded-lg bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 focus:outline-none focus:ring-1 focus:ring-emerald-600"
          >
            <option value="All">All Crops</option>
            {ALL_CROPS.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* District Filter */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-neutral-500 whitespace-nowrap">District:</span>
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="px-2.5 py-1.5 text-xs rounded-lg bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 focus:outline-none focus:ring-1 focus:ring-emerald-600"
          >
            <option value="All">All Districts</option>
            {MAHARASHTRA_DISTRICTS.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        {(searchTerm || selectedCrop !== 'All' || selectedDistrict !== 'All') && (
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCrop('All');
              setSelectedDistrict('All');
            }}
            className="text-xs text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1 shrink-0"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Clear</span>
          </button>
        )}
      </div>

      {/* Table Container */}
      <div className="rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-50 dark:bg-neutral-800/60 border-b border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300">
              <tr>
                <th 
                  onClick={() => handleSort('crop')}
                  className="py-3 px-4 font-semibold cursor-pointer hover:text-emerald-700 select-none"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Commodity / Crop</span>
                    <ArrowUpDown className="w-3 h-3 text-neutral-400" />
                  </div>
                </th>
                <th 
                  onClick={() => handleSort('market')}
                  className="py-3 px-4 font-semibold cursor-pointer hover:text-emerald-700 select-none"
                >
                  <div className="flex items-center gap-1.5">
                    <span>APMC Mandi</span>
                    <ArrowUpDown className="w-3 h-3 text-neutral-400" />
                  </div>
                </th>
                <th className="py-3 px-4 font-semibold">District</th>
                <th className="py-3 px-4 font-semibold text-right">Min Price</th>
                <th className="py-3 px-4 font-semibold text-right">Max Price</th>
                <th 
                  onClick={() => handleSort('modalPrice')}
                  className="py-3 px-4 font-semibold text-right cursor-pointer hover:text-emerald-700 select-none"
                >
                  <div className="flex items-center justify-end gap-1.5">
                    <span>Modal Price (₹/Qtl)</span>
                    <ArrowUpDown className="w-3 h-3 text-neutral-400" />
                  </div>
                </th>
                <th className="py-3 px-4 font-semibold text-right">Last Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
              {filteredPrices.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-neutral-400">
                    No APMC records match your search filter criteria.
                  </td>
                </tr>
              ) : (
                filteredPrices.map((record) => (
                  <tr 
                    key={record.id} 
                    className="hover:bg-neutral-50/70 dark:hover:bg-neutral-800/40 transition-colors"
                  >
                    <td className="py-3.5 px-4 font-bold text-neutral-900 dark:text-neutral-100">
                      {record.crop}
                    </td>
                    <td className="py-3.5 px-4 text-neutral-700 dark:text-neutral-300 font-medium">
                      {record.market}
                    </td>
                    <td className="py-3.5 px-4 text-neutral-500">
                      {record.district}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono tabular-nums text-neutral-600 dark:text-neutral-400">
                      ₹{record.minPrice.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono tabular-nums text-neutral-600 dark:text-neutral-400">
                      ₹{record.maxPrice.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono tabular-nums font-bold text-emerald-800 dark:text-emerald-300">
                      ₹{record.modalPrice.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3.5 px-4 text-right text-[11px] text-neutral-400">
                      {record.lastUpdated}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="p-3.5 bg-neutral-50/50 dark:bg-neutral-800/40 border-t border-neutral-100 dark:border-neutral-800 text-[11px] text-neutral-500 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span>
            Displaying {filteredPrices.length} records · Prices per Quintal (100 kg)
          </span>
          <span className="text-neutral-400">
            Integration ready: AGMARKNET API / eNAM Mandi standard schema
          </span>
        </div>
      </div>

      {/* Integration Roadmap Box */}
      <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs">
        <div className="flex items-center gap-2 mb-2 text-neutral-800 dark:text-neutral-200 font-semibold text-sm">
          <Landmark className="w-4 h-4 text-emerald-600" />
          <span>Live Government Market Data Architecture</span>
        </div>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-3">
          In production, this module will subscribe via webhook or scheduled ETL to:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-100 dark:border-neutral-700/60">
            <span className="font-bold text-neutral-800 dark:text-neutral-200 block mb-0.5">eNAM Gateway</span>
            <span className="text-[11px] text-neutral-500">Electronic National Agriculture Market live bidding feeds</span>
          </div>
          <div className="p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-100 dark:border-neutral-700/60">
            <span className="font-bold text-neutral-800 dark:text-neutral-200 block mb-0.5">Agmarknet API</span>
            <span className="text-[11px] text-neutral-500">Directorate of Marketing & Inspection (DMI) daily bulletin</span>
          </div>
          <div className="p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-100 dark:border-neutral-700/60">
            <span className="font-bold text-neutral-800 dark:text-neutral-200 block mb-0.5">MSAMB Feed</span>
            <span className="text-[11px] text-neutral-500">Maharashtra State Agricultural Marketing Board daily bulletins</span>
          </div>
        </div>
      </div>
    </div>
  );
};
