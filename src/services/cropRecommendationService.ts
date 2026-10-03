import { CropName, CropSuitabilityResult, SoilType, IrrigationAvailability } from '../types';

export interface CropRecommendationParams {
  state: string;
  district: string;
  village?: string;
  soilType: SoilType;
  nitrogen: number; // N in kg/ha (0 - 300)
  phosphorus: number; // P in kg/ha (0 - 150)
  potassium: number; // K in kg/ha (0 - 300)
  ph: number; // 4.0 - 9.0
  temperature: number; // °C
  humidity: number; // %
  rainfall: number; // mm
  month: string;
  irrigation: IrrigationAvailability;
  farmArea: number; // ha
}

/**
 * Service abstraction for AI Crop Recommendation.
 * Ready for future integration with Python FastAPI endpoint:
 * POST /api/crop-recommendation (backed by Random Forest / XGBoost model)
 */
export async function getCropRecommendations(
  params: CropRecommendationParams
): Promise<CropSuitabilityResult[]> {
  // Simulate network / inference latency (350ms)
  await new Promise((resolve) => setTimeout(resolve, 400));

  const results: CropSuitabilityResult[] = [];
  const { soilType, ph, rainfall, temperature, irrigation, nitrogen, phosphorus, potassium } = params;

  // 1. Soybean
  let soybeanScore = 78;
  if (soilType === 'Black Soil' || soilType === 'Alluvial Soil') soybeanScore += 8;
  if (ph >= 6.0 && ph <= 7.8) soybeanScore += 5;
  if (rainfall >= 600 && rainfall <= 1100) soybeanScore += 6;
  if (temperature >= 22 && temperature <= 34) soybeanScore += 4;
  soybeanScore = Math.min(94, Math.max(45, soybeanScore));

  results.push({
    crop: 'Soybean',
    suitabilityScore: soybeanScore,
    suitabilityLevel: soybeanScore >= 80 ? 'Highly Suitable' : 'Moderately Suitable',
    cropDuration: '90 - 105 days',
    waterRequirement: 'Medium',
    suitableSoil: 'Deep black soil, well-drained alluvial',
    growingSeason: 'Kharif',
    reasons: [
      `Well-suited for ${soilType} with pH ${ph.toFixed(1)} and moderate monsoon rainfall (${rainfall} mm).`,
      'Leguminous crop that fixes atmospheric nitrogen, improving soil biology for subsequent rabi rotation.',
      'Established processing plants and APMC liquidity across Maharashtra.'
    ],
    keyRisks: [
      'Vulnerable to yellow mosaic virus during prolonged humid spells.',
      'Shattering risk if harvest is delayed after pod maturity.'
    ]
  });

  // 2. Cotton
  let cottonScore = 74;
  if (soilType === 'Black Soil') cottonScore += 10;
  if (rainfall >= 500 && rainfall <= 950) cottonScore += 5;
  if (temperature >= 25 && temperature <= 38) cottonScore += 6;
  if (irrigation === 'Perennial / Ample' || irrigation === 'Borewell / Well') cottonScore += 4;
  cottonScore = Math.min(92, Math.max(40, cottonScore));

  results.push({
    crop: 'Cotton',
    suitabilityScore: cottonScore,
    suitabilityLevel: cottonScore >= 80 ? 'Highly Suitable' : 'Moderately Suitable',
    cropDuration: '150 - 180 days',
    waterRequirement: 'Medium',
    suitableSoil: 'Deep black cotton soil (Regur)',
    growingSeason: 'Kharif',
    reasons: [
      'High cash crop realization with deep moisture retention capacity of black vertisols.',
      'Tolerates higher ambient temperatures during vegetative and boll-filling phases.',
      'Compatible with Maharashtra ginning & pressing market hubs.'
    ],
    keyRisks: [
      'Susceptible to pink bollworm and sucking pest pressure if scouted irregularly.',
      'Requires effective drainage during heavy monsoon cloudbursts.'
    ]
  });

  // 3. Chickpea (Gram / Harbara)
  let chickpeaScore = 70;
  if (ph >= 6.5 && ph <= 8.2) chickpeaScore += 8;
  if (temperature <= 28) chickpeaScore += 8;
  if (soilType === 'Black Soil' || soilType === 'Alluvial Soil') chickpeaScore += 6;
  chickpeaScore = Math.min(91, Math.max(42, chickpeaScore));

  results.push({
    crop: 'Chickpea',
    suitabilityScore: chickpeaScore,
    suitabilityLevel: chickpeaScore >= 78 ? 'Highly Suitable' : 'Moderately Suitable',
    cropDuration: '95 - 110 days',
    waterRequirement: 'Low',
    suitableSoil: 'Well-drained medium to heavy black soil',
    growingSeason: 'Rabi',
    reasons: [
      'Thrives on residual moisture profile without heavy seasonal irrigation demands.',
      'Stable MSP support and robust pulse consumer demand across Indian mandis.',
      'Enriches soil nitrogen reserves for the succeeding Kharif crop.'
    ],
    keyRisks: [
      'Intolerant of waterlogging; root rot occurs in saturated heavy soils.',
      'Foliar fungal blight if humid cloudy days persist in winter.'
    ]
  });

  // 4. Wheat
  let wheatScore = 68;
  if (irrigation === 'Perennial / Ample' || irrigation === 'Seasonal / Canal') wheatScore += 12;
  if (temperature <= 26) wheatScore += 6;
  if (soilType === 'Alluvial Soil' || soilType === 'Black Soil') wheatScore += 5;
  wheatScore = Math.min(89, Math.max(38, wheatScore));

  results.push({
    crop: 'Wheat',
    suitabilityScore: wheatScore,
    suitabilityLevel: wheatScore >= 78 ? 'Highly Suitable' : 'Moderately Suitable',
    cropDuration: '110 - 125 days',
    waterRequirement: 'High',
    suitableSoil: 'Fertile loamy and clayey soils',
    growingSeason: 'Rabi',
    reasons: [
      'Standard staple crop with guaranteed procurement infrastructure and stable price floor.',
      'Excellent winter cereal rotation for balanced agronomic land use.',
      'Yield responds reliably to balanced NPK fertigation.'
    ],
    keyRisks: [
      'Sensitive to sudden temperature rise (terminal heat) during grain filling.',
      'Requires 4-6 timed irrigations for economic yield.'
    ]
  });

  // 5. Sorghum (Jowar)
  let sorghumScore = 72;
  if (soilType === 'Black Soil' || soilType === 'Red Soil') sorghumScore += 6;
  if (rainfall < 700 || irrigation === 'Rainfed Only') sorghumScore += 10;
  sorghumScore = Math.min(90, Math.max(45, sorghumScore));

  results.push({
    crop: 'Sorghum',
    suitabilityScore: sorghumScore,
    suitabilityLevel: sorghumScore >= 78 ? 'Highly Suitable' : 'Moderately Suitable',
    cropDuration: '100 - 120 days',
    waterRequirement: 'Low',
    suitableSoil: 'Light to medium black soils, red loams',
    growingSeason: 'Rabi',
    reasons: [
      'Exceptional drought tolerance and water-use efficiency under rainfed stress.',
      'Provides both nutritious human grain and highly valued animal fodder (stover/kadbi).',
      'Minimal synthetic pesticide expenditure required.'
    ],
    keyRisks: [
      'Shoot fly damage during the first 30 days if sowing is delayed.',
      'Bird depredation during dough stage requires vigilant field scaring.'
    ]
  });

  // Sort descending by suitability score
  results.sort((a, b) => b.suitabilityScore - a.suitabilityScore);
  return results;
}
