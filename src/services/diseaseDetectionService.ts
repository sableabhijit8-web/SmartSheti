import { DiseaseDetectionResult } from '../types';

export interface DiseaseDetectionPayload {
  imageFile?: File;
  imageUrl?: string;
  cropHint?: string;
}

/**
 * Service abstraction for AI Crop Disease Detection.
 * Ready for future Python FastAPI endpoint:
 * POST /api/disease-detection (backed by MobileNet / EfficientNet / ResNet CNN)
 */
export async function detectCropDisease(
  payload: DiseaseDetectionPayload
): Promise<DiseaseDetectionResult> {
  // Simulate neural network inference latency (600ms)
  await new Promise((resolve) => setTimeout(resolve, 600));

  const urlOrName = (payload.imageUrl || payload.imageFile?.name || '').toLowerCase();

  // If leaf image indicates healthy or user specified healthy
  if (urlOrName.includes('healthy')) {
    return {
      crop: 'Soybean',
      disease: 'Healthy Crop (No Active Foliar Pathogen Detected)',
      confidenceLabel: 'Demo Result',
      severity: 'Healthy',
      symptoms: [
        'Vibrant green color with intact foliar cuticle and uniform chloroplast distribution.',
        'No chlorotic halos, necrotic lesions, pustules, or leaf curl observed.',
        'Normal venation with healthy cellular turgidity.'
      ],
      possibleCauses: [
        'Balanced mineral nutrition (NPK + micronutrients).',
        'Good soil moisture balance and absence of stagnant standing water.',
        'Proper spacing allowing air circulation through the canopy.'
      ],
      recommendedManagement: [
        'Maintain routine scouting once weekly through the vegetative and flowering phases.',
        'Ensure clean weeding to prevent alternate hosts near field borders.',
        'Conserve beneficial insect predators (ladybird beetles, chrysoperla) by avoiding unnecessary chemical sprays.'
      ],
      prevention: [
        'Follow crop rotation with cereal crops (Maize or Sorghum) to break potential soil pathogen cycles.',
        'Inspect leaf undersides during early morning hours for early signs of fungal spore establishment.'
      ],
      disclaimer: 'This is a prototype demonstration and not a substitute for professional agricultural diagnosis. Follow registered product label instructions and consult a local agricultural expert before applying any agricultural input.'
    };
  }

  // Default demo case: Tomato Early Blight (Alternaria solani)
  return {
    crop: payload.cropHint || 'Tomato',
    disease: 'Early Blight (Alternaria solani)',
    confidenceLabel: 'Demo Result',
    severity: 'Moderate',
    symptoms: [
      'Small, circular dark brown to black spots appearing on older lower leaves first.',
      'Characteristic concentric concentric rings ("target board" pattern) within lesions.',
      'Distinct yellow chlorotic halo surrounding necrotic spots.',
      'Premature defoliation starting from the lower canopy moving upwards.'
    ],
    possibleCauses: [
      'Fungal pathogen Alternaria solani surviving in soil debris or solanaceous volunteer plants.',
      'High relative humidity (>80%) accompanied by warm temperatures (24°C - 30°C).',
      'Overhead irrigation or splash dispersal from heavy rainfall onto lower foliage.',
      'Dense canopy with limited air circulation.'
    ],
    recommendedManagement: [
      'Prune and safely destroy lower infected leaves showing lesions to reduce spore load in the field.',
      'Transition from overhead sprinkler irrigation to drip irrigation to keep foliage dry.',
      'Ensure proper staking and trellising to elevate branches away from damp soil surface.',
      'For registered chemical or bio-fungicide options, follow registered product label instructions and consult a local agricultural expert before applying any pesticide.'
    ],
    prevention: [
      'Practice minimum 2-3 year crop rotation away from solanaceous crops (potato, brinjal, chili).',
      'Use certified disease-free seeds or treat seeds with registered bio-antagonists (e.g. Trichoderma).',
      'Apply organic mulching (straw or plastic mulch) to minimize soil spore splashback.',
      'Maintain wide row spacing for optimal sunlight penetration and wind aeration.'
    ],
    disclaimer: 'This is a prototype demonstration and not a substitute for professional agricultural diagnosis. Follow registered product label instructions and consult a local agricultural expert before applying any pesticide.'
  };
}
