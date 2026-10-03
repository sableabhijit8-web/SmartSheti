import { CropName, SoilType, IrrigationAvailability, YieldPredictionResult } from '../types';

export interface YieldPredictionParams {
  crop: CropName;
  farmArea: number; // in hectares
  soilType: SoilType;
  irrigation: IrrigationAvailability;
  rainfall: number; // mm
  temperature: number; // °C
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  season: 'Kharif' | 'Rabi' | 'Summer' | 'Annual';
}

const CROP_BENCHMARK_YIELDS: Record<CropName, { baseTonnesPerHa: number; stdDev: number }> = {
  Soybean: { baseTonnesPerHa: 2.2, stdDev: 0.4 },
  Cotton: { baseTonnesPerHa: 1.8, stdDev: 0.35 },
  Wheat: { baseTonnesPerHa: 3.6, stdDev: 0.5 },
  Onion: { baseTonnesPerHa: 22.0, stdDev: 3.5 },
  Tomato: { baseTonnesPerHa: 28.0, stdDev: 4.8 },
  Chickpea: { baseTonnesPerHa: 1.4, stdDev: 0.25 },
  Sorghum: { baseTonnesPerHa: 2.1, stdDev: 0.35 },
  Rice: { baseTonnesPerHa: 3.8, stdDev: 0.6 },
  Sugarcane: { baseTonnesPerHa: 95.0, stdDev: 12.0 },
  Maize: { baseTonnesPerHa: 4.5, stdDev: 0.7 },
};

/**
 * Service abstraction for Crop Yield Prediction.
 * Ready for future Python FastAPI endpoint:
 * POST /api/yield-prediction (backed by XGBoost / Multi-Layer Perceptron)
 */
export async function estimateCropYield(
  params: YieldPredictionParams
): Promise<YieldPredictionResult> {
  await new Promise((resolve) => setTimeout(resolve, 350));

  const benchmark = CROP_BENCHMARK_YIELDS[params.crop] || { baseTonnesPerHa: 2.5, stdDev: 0.4 };
  let multiplier = 1.0;
  const positiveFactors: string[] = [];
  const limitingFactors: string[] = [];

  // Soil factor
  if (params.soilType === 'Black Soil') {
    multiplier += 0.08;
    positiveFactors.push('Deep water-holding capacity of Black Vertisol boosts biomass.');
  } else if (params.soilType === 'Laterite Soil') {
    multiplier -= 0.06;
    limitingFactors.push('Laterite soil typically exhibits lower cation exchange capacity and phosphorus fixation.');
  }

  // Irrigation factor
  if (params.irrigation === 'Perennial / Ample' || params.irrigation === 'Borewell / Well') {
    multiplier += 0.12;
    positiveFactors.push('Assured irrigation enables timely critical stage watering (flowering & grain fill).');
  } else if (params.irrigation === 'Rainfed Only') {
    multiplier -= 0.15;
    limitingFactors.push('Rainfed dependence creates vulnerability to dry spells during pod or ear development.');
  }

  // Rainfall factor
  if (params.rainfall >= 650 && params.rainfall <= 1100) {
    multiplier += 0.05;
    positiveFactors.push(`Seasonal rainfall (${params.rainfall} mm) aligns with crop evapotranspiration envelope.`);
  } else if (params.rainfall < 450) {
    multiplier -= 0.10;
    limitingFactors.push('Sub-optimal seasonal rainfall may restrict total vegetative canopy growth.');
  }

  // Nutrient balance
  if (params.nitrogen > 60 && params.phosphorus > 40 && params.potassium > 30) {
    multiplier += 0.07;
    positiveFactors.push('Adequate NPK baseline supports balanced root and shoot physiology.');
  } else if (params.nitrogen < 40 || params.phosphorus < 20) {
    multiplier -= 0.08;
    limitingFactors.push('Low available N or P acts as a primary vegetative growth limiter.');
  }

  const yieldPerHa = Number((benchmark.baseTonnesPerHa * multiplier).toFixed(2));
  const area = Math.max(0.1, params.farmArea);
  const totalProduction = Number((yieldPerHa * area).toFixed(2));
  
  const spreadTonnes = Number((benchmark.stdDev * area).toFixed(2));
  const minExpected = Number(Math.max(0.1, totalProduction - spreadTonnes).toFixed(2));
  const maxExpected = Number((totalProduction + spreadTonnes).toFixed(2));

  return {
    crop: params.crop,
    farmArea: area,
    estimatedYieldPerHectare: yieldPerHa,
    estimatedTotalProduction: totalProduction,
    minExpectedProduction: minExpected,
    maxExpectedProduction: maxExpected,
    positiveFactors,
    limitingFactors,
    modelNote: 'Prototype estimate — actual XGBoost/Neural Network model trained on ICAR / ICRISAT field trial datasets will be connected later.',
  };
}
