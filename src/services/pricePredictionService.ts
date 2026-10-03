import { CropName, PriceForecastPoint } from '../types';

export interface PricePredictionParams {
  crop: CropName;
  market: string;
  horizonDays: 7 | 15 | 30;
}

export interface PricePredictionResponse {
  crop: CropName;
  market: string;
  horizonDays: number;
  currentPrice: number;
  predictedForecast: number;
  minRange: number;
  maxRange: number;
  trend: 'Increasing' | 'Stable' | 'Decreasing';
  trendPercent: number;
  forecastPoints: PriceForecastPoint[];
  forecastSummary: {
    day7: number;
    day15: number;
    day30: number;
  };
  modelNote: string;
  disclaimer: string;
}

const CROP_BASE_PRICES: Record<CropName, { base: number; trend: 'Increasing' | 'Stable' | 'Decreasing'; slope: number }> = {
  Soybean: { base: 4850, trend: 'Increasing', slope: 8 },
  Cotton: { base: 7200, trend: 'Stable', slope: 2 },
  Wheat: { base: 2450, trend: 'Increasing', slope: 4 },
  Onion: { base: 2800, trend: 'Decreasing', slope: -12 },
  Tomato: { base: 2200, trend: 'Increasing', slope: 15 },
  Chickpea: { base: 5650, trend: 'Stable', slope: 1 },
  Sorghum: { base: 3100, trend: 'Increasing', slope: 5 },
  Rice: { base: 3550, trend: 'Stable', slope: -1 },
  Sugarcane: { base: 3250, trend: 'Stable', slope: 0 },
  Maize: { base: 2180, trend: 'Increasing', slope: 3 },
};

/**
 * Service abstraction for AI Crop Price Prediction.
 * Ready for future Python FastAPI endpoint:
 * POST /api/price-prediction (backed by LSTM / GRU / XGBoost time-series model)
 */
export async function getPricePrediction(
  params: PricePredictionParams
): Promise<PricePredictionResponse> {
  // Simulate time-series inference latency
  await new Promise((resolve) => setTimeout(resolve, 350));

  const baseConfig = CROP_BASE_PRICES[params.crop] || { base: 3000, trend: 'Stable', slope: 2 };
  const currentPrice = baseConfig.base;

  // Generate 14 days of historical data + N days of forecast
  const forecastPoints: PriceForecastPoint[] = [];
  const today = new Date();

  // 14 days historical
  for (let i = 14; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
    
    // Slight simulated realistic variance
    const variance = Math.sin(i * 0.7) * 45 - (i * baseConfig.slope * 0.4);
    const histPrice = Math.round(currentPrice + variance);

    forecastPoints.push({
      date: dateStr,
      historicalPrice: histPrice,
      isForecast: false,
    });
  }

  // Anchor today
  const lastHistorical = forecastPoints[forecastPoints.length - 1];
  lastHistorical.predictedPrice = lastHistorical.historicalPrice;
  lastHistorical.lowerBound = lastHistorical.historicalPrice;
  lastHistorical.upperBound = lastHistorical.historicalPrice;

  // Next N days forecast
  const daysToForecast = params.horizonDays;
  let runningPrice = currentPrice;

  for (let i = 1; i <= daysToForecast; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    const dateStr = d.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });

    runningPrice += baseConfig.slope + (Math.sin(i * 0.5) * 12);
    const roundedPred = Math.round(runningPrice);
    const uncertaintyBand = Math.round(40 + i * 8); // expanding cone of uncertainty

    forecastPoints.push({
      date: dateStr,
      predictedPrice: roundedPred,
      lowerBound: roundedPred - uncertaintyBand,
      upperBound: roundedPred + uncertaintyBand,
      isForecast: true,
    });
  }

  // Key day horizons
  const day7Est = Math.round(currentPrice + baseConfig.slope * 7);
  const day15Est = Math.round(currentPrice + baseConfig.slope * 15);
  const day30Est = Math.round(currentPrice + baseConfig.slope * 30);

  const targetEst = params.horizonDays === 7 ? day7Est : params.horizonDays === 15 ? day15Est : day30Est;
  const spread = Math.round(params.horizonDays * 12 + 60);

  return {
    crop: params.crop,
    market: params.market,
    horizonDays: params.horizonDays,
    currentPrice,
    predictedForecast: targetEst,
    minRange: targetEst - spread,
    maxRange: targetEst + spread,
    trend: baseConfig.trend,
    trendPercent: Number(((targetEst - currentPrice) / currentPrice * 100).toFixed(1)),
    forecastPoints,
    forecastSummary: {
      day7: day7Est,
      day15: day15Est,
      day30: day30Est,
    },
    modelNote: 'LSTM / XGBoost time-series model endpoint will connect here. Current projections demonstrate expected API schema and visualization telemetry.',
    disclaimer: 'Prototype Forecast — real LSTM/XGBoost model and Agmarknet / eNAM live feeds will be connected later. Do not make commercial holding or selling decisions solely on demo data.',
  };
}
