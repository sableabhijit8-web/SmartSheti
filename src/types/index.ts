import { SupportedLanguage } from '../locales';

export type Language = SupportedLanguage;

export type SoilType = 'Black Soil' | 'Red Soil' | 'Alluvial Soil' | 'Laterite Soil' | 'Other';

export type IrrigationAvailability = 'Perennial / Ample' | 'Seasonal / Canal' | 'Borewell / Well' | 'Rainfed Only';

export type CropName = 
  | 'Soybean' 
  | 'Cotton' 
  | 'Wheat' 
  | 'Onion' 
  | 'Tomato' 
  | 'Chickpea' 
  | 'Sorghum' 
  | 'Rice' 
  | 'Sugarcane' 
  | 'Maize';

export interface FarmerProfile {
  name: string;
  phone?: string;
  state: string;
  district: string;
  village: string;
  farmArea: number; // in hectares
  soilType: SoilType;
  irrigationType: IrrigationAvailability;
  mainCrops: CropName[];
}

export interface WeatherData {
  temperature: number; // °C
  humidity: number; // %
  rainfall: number; // mm
  condition: string;
  location: string;
  isDemo: boolean;
}

export interface MarketPriceRecord {
  id: string;
  crop: CropName;
  market: string;
  district: string;
  state: string;
  minPrice: number; // ₹/quintal
  maxPrice: number;
  modalPrice: number;
  priceChange: number; // percentage or diff
  lastUpdated: string;
  isDemo: boolean;
}

export interface PriceForecastPoint {
  date: string;
  historicalPrice?: number;
  predictedPrice?: number;
  lowerBound?: number;
  upperBound?: number;
  isForecast: boolean;
}

export interface CropSuitabilityResult {
  crop: CropName;
  suitabilityScore: number; // 0 - 100 demo score
  suitabilityLevel: 'Highly Suitable' | 'Moderately Suitable' | 'Marginal';
  cropDuration: string;
  waterRequirement: 'Low' | 'Medium' | 'High';
  suitableSoil: string;
  growingSeason: 'Kharif' | 'Rabi' | 'Zaid' | 'Annual';
  reasons: string[];
  keyRisks: string[];
}

export interface DiseaseDetectionResult {
  crop: string;
  disease: string;
  confidenceLabel: string; // e.g. "Demo Result"
  severity: 'Mild' | 'Moderate' | 'Severe' | 'Healthy';
  symptoms: string[];
  possibleCauses: string[];
  recommendedManagement: string[];
  prevention: string[];
  disclaimer: string;
}

export interface MarketComparisonResult {
  market: string;
  district: string;
  marketPrice: number; // ₹/quintal
  distanceKm: number;
  transportCostPerQuintal: number;
  totalTransportCost: number;
  grossRevenue: number;
  estimatedNetRevenue: number;
  isHigherRealization: boolean;
}

export interface YieldPredictionResult {
  crop: CropName;
  farmArea: number;
  estimatedYieldPerHectare: number; // tonnes/ha
  estimatedTotalProduction: number; // tonnes
  minExpectedProduction: number;
  maxExpectedProduction: number;
  limitingFactors: string[];
  positiveFactors: string[];
  modelNote: string;
}

export interface IrrigationRecommendation {
  crop: CropName;
  soilMoisturePercent: number; // 0 - 100
  waterRequirement: 'Low' | 'Medium' | 'High';
  irrigationStatus: 'Recommended' | 'Monitor' | 'Not Required';
  recommendedQuantityMm: number;
  nextIrrigationEstimate: string;
  soilRetentionCapacity: string;
  actionNote: string;
}

export interface CropTimelineStage {
  stage: string;
  daysFromSowing: string;
  description: string;
  criticalTasks: string[];
  caution: string;
}

export interface CropCalendarEntry {
  crop: CropName;
  season: string;
  sowingMonths: string[];
  harvestMonths: string[];
  timeline: CropTimelineStage[];
}

export interface FarmOperationSpec {
  crop: CropName;
  rowSpacingCm: string;
  plantSpacingCm: string;
  tillageInfo: string;
  labourPerHectare: {
    sowingDays: number;
    weedingDays: number;
    sprayingDays: number;
    harvestDays: number;
    totalDays: number;
  };
  scheduleGuidelines: {
    tillage: string;
    sowing: string;
    weeding: string;
    fertilization: string;
    irrigation: string;
    spraying: string;
    harvest: string;
  };
  disclaimer: string;
}

export interface NotificationItem {
  id: string;
  type: 'rain' | 'market' | 'irrigation' | 'crop' | 'disease';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority: 'high' | 'medium' | 'low';
}

export interface DriveFileItem {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
  createdTime?: string;
  modifiedTime?: string;
  webViewLink?: string;
  iconLink?: string;
}

export type ActiveTab =
  | 'landing'
  | 'dashboard'
  | 'crop-recommendation'
  | 'disease-detection'
  | 'market-prices'
  | 'price-prediction'
  | 'market-comparison'
  | 'yield-prediction'
  | 'irrigation'
  | 'farm-calendar'
  | 'farm-operations'
  | 'crop-spacing'
  | 'farm-profile'
  | 'google-drive'
  | 'notifications'
  | 'settings';
