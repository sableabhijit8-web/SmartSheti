import { CropName, SoilType, IrrigationRecommendation } from '../types';

export interface IrrigationParams {
  crop: CropName;
  soilType: SoilType;
  growthStage: 'Initial / Germination' | 'Vegetative' | 'Flowering / Blossom' | 'Pod / Grain Filling' | 'Maturity / Senescence';
  temperature: number; // °C
  rainfall: number; // mm in last 48h
  humidity: number; // %
  farmArea: number; // ha
  daysSinceLastIrrigation: number;
}

const CROP_WATER_NEEDS: Record<CropName, 'Low' | 'Medium' | 'High'> = {
  Soybean: 'Medium',
  Cotton: 'Medium',
  Wheat: 'High',
  Onion: 'Medium',
  Tomato: 'High',
  Chickpea: 'Low',
  Sorghum: 'Low',
  Rice: 'High',
  Sugarcane: 'High',
  Maize: 'Medium',
};

/**
 * Service abstraction for Smart Irrigation Recommendation.
 * Ready for future Python FastAPI endpoint:
 * POST /api/irrigation (backed by Penman-Monteith ET0 + ML + IoT soil moisture sensor feeds)
 */
export async function getIrrigationAdvice(
  params: IrrigationParams
): Promise<IrrigationRecommendation> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const baseNeed = CROP_WATER_NEEDS[params.crop] || 'Medium';

  // Calculate simulated soil moisture depletion based on days, temp, rainfall
  let baselineMoisture = 65; // %
  // Rainfall replenishes
  baselineMoisture += params.rainfall * 1.5;
  // High temp depletes faster
  const dailyDepletion = (params.temperature > 32 ? 4.5 : 3.0) * (params.humidity < 50 ? 1.3 : 0.9);
  baselineMoisture -= params.daysSinceLastIrrigation * dailyDepletion;

  // Soil retention modifier
  if (params.soilType === 'Black Soil') {
    baselineMoisture += 8; // high clay content holds water longer
  } else if (params.soilType === 'Laterite Soil' || params.soilType === 'Red Soil') {
    baselineMoisture -= 6; // coarser texture drains faster
  }

  const clampedMoisture = Math.max(18, Math.min(92, Math.round(baselineMoisture)));

  let status: 'Recommended' | 'Monitor' | 'Not Required' = 'Not Required';
  let nextEstimate = 'Within 5 to 7 days';
  let recommendedMm = 0;
  let actionNote = '';

  const isSensitiveStage = params.growthStage === 'Flowering / Blossom' || params.growthStage === 'Pod / Grain Filling';

  if (clampedMoisture < 40 || (isSensitiveStage && clampedMoisture < 48)) {
    status = 'Recommended';
    recommendedMm = baseNeed === 'High' ? 45 : baseNeed === 'Medium' ? 35 : 25;
    nextEstimate = 'Immediate to within 24 hours';
    actionNote = `Soil moisture has depleted to ${clampedMoisture}%. Critical growth stage (${params.growthStage}) demands protective watering to prevent blossom drop or poor grain filling.`;
  } else if (clampedMoisture < 58) {
    status = 'Monitor';
    recommendedMm = 20;
    nextEstimate = 'Within 48 to 72 hours if no rain occurs';
    actionNote = `Current moisture is adequate (${clampedMoisture}%), but root-zone depletion is ongoing. Check tensiometer/probe readings tomorrow morning.`;
  } else {
    status = 'Not Required';
    recommendedMm = 0;
    nextEstimate = 'Beyond 5 days';
    actionNote = `Soil profile holds sufficient moisture (${clampedMoisture}%). Additional irrigation now risks nutrient leaching or root aeration reduction.`;
  }

  return {
    crop: params.crop,
    soilMoisturePercent: clampedMoisture,
    waterRequirement: baseNeed,
    irrigationStatus: status,
    recommendedQuantityMm: recommendedMm,
    nextIrrigationEstimate: nextEstimate,
    soilRetentionCapacity: params.soilType === 'Black Soil' ? 'High (Deep Vertisol)' : 'Medium (Well-drained loam)',
    actionNote,
  };
}
