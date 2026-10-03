import { CropName, MarketComparisonResult } from '../types';

export interface MarketComparisonParams {
  crop: CropName;
  quantityQuintals: number;
  farmerLocation: string; // e.g., 'Baramati, Pune'
}

interface MarketGeography {
  market: string;
  district: string;
  baseDistanceKm: number; // approximate from central Pune / Baramati belt
  priceVariance: number; // difference in ₹/quintal from base
}

const MARKET_GEOGRAPHIES: MarketGeography[] = [
  { market: 'Pune APMC (Gultekdi)', district: 'Pune', baseDistanceKm: 65, priceVariance: 50 },
  { market: 'Nashik APMC', district: 'Nashik', baseDistanceKm: 210, priceVariance: -40 },
  { market: 'Lasalgaon APMC', district: 'Nashik', baseDistanceKm: 245, priceVariance: 110 },
  { market: 'Ahmednagar APMC', district: 'Ahmednagar', baseDistanceKm: 125, priceVariance: -20 },
  { market: 'Jalna APMC', district: 'Jalna', baseDistanceKm: 310, priceVariance: 160 },
  { market: 'Solapur APMC', district: 'Solapur', baseDistanceKm: 180, priceVariance: 30 },
  { market: 'Sangli APMC', district: 'Sangli', baseDistanceKm: 195, priceVariance: 10 },
];

const CROP_BASE_PRICES: Record<CropName, number> = {
  Soybean: 4850,
  Cotton: 7200,
  Wheat: 2450,
  Onion: 2800,
  Tomato: 2200,
  Chickpea: 5650,
  Sorghum: 3100,
  Rice: 3550,
  Sugarcane: 3250,
  Maize: 2180,
};

/**
 * Service to compare APMC markets and compute Estimated Net Realization.
 * Formula: Estimated Net Revenue = (Market Price * Quantity) - Estimated Transport Cost
 */
export async function compareMarkets(
  params: MarketComparisonParams
): Promise<MarketComparisonResult[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const basePrice = CROP_BASE_PRICES[params.crop] || 3500;
  const qty = Math.max(1, params.quantityQuintals);

  // Typical small commercial vehicle (e.g. Bolero Maxi Truck / Pick-up) transport cost model:
  // Base fixed loading/unloading ₹400 + ₹3.50 per quintal per km
  const results: MarketComparisonResult[] = MARKET_GEOGRAPHIES.map((geo) => {
    // Specific crop adjustment (e.g. Onion is traditionally higher in Lasalgaon)
    let marketPrice = basePrice + geo.priceVariance;
    if (params.crop === 'Onion' && geo.market.includes('Lasalgaon')) {
      marketPrice += 220;
    }
    if (params.crop === 'Cotton' && geo.district === 'Jalna') {
      marketPrice += 180;
    }

    const distanceKm = geo.baseDistanceKm;
    
    // Transport estimation: ₹3.2 per km per quintal + basic APMC cess/handling allowance
    const ratePerKmPerQuintal = 2.4;
    const transportCostPerQuintal = Math.round(distanceKm * ratePerKmPerQuintal + 35);
    const totalTransportCost = transportCostPerQuintal * qty;

    const grossRevenue = marketPrice * qty;
    const estimatedNetRevenue = grossRevenue - totalTransportCost;

    return {
      market: geo.market,
      district: geo.district,
      marketPrice,
      distanceKm,
      transportCostPerQuintal,
      totalTransportCost,
      grossRevenue,
      estimatedNetRevenue,
      isHigherRealization: false,
    };
  });

  // Sort descending by Estimated Net Revenue
  results.sort((a, b) => b.estimatedNetRevenue - a.estimatedNetRevenue);

  // Mark the top candidate as "Higher Estimated Net Realization"
  if (results.length > 0) {
    results[0].isHigherRealization = true;
  }

  return results;
}
