import en from './en.json';
import hi from './hi.json';
import mr from './mr.json';
import bn from './bn.json';
import te from './te.json';
import ta from './ta.json';
import gu from './gu.json';
import kn from './kn.json';
import ml from './ml.json';
import pa from './pa.json';
import orLocale from './or.json';
import asLocale from './as.json';
import ur from './ur.json';

export type SupportedLanguage = 
  | 'en' 
  | 'hi' 
  | 'mr' 
  | 'bn' 
  | 'te' 
  | 'ta' 
  | 'gu' 
  | 'kn' 
  | 'ml' 
  | 'pa' 
  | 'or' 
  | 'as' 
  | 'ur';

export interface LanguageMeta {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  flag: string;
  region: string;
  dir: 'ltr' | 'rtl';
}

export const SUPPORTED_LANGUAGES: LanguageMeta[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇮🇳', region: 'All India', dir: 'ltr' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', region: 'North / Central India', dir: 'ltr' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳', region: 'Maharashtra', dir: 'ltr' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇮🇳', region: 'West Bengal', dir: 'ltr' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳', region: 'Andhra Pradesh & Telangana', dir: 'ltr' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳', region: 'Tamil Nadu', dir: 'ltr' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳', region: 'Gujarat', dir: 'ltr' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳', region: 'Karnataka', dir: 'ltr' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', flag: '🇮🇳', region: 'Kerala', dir: 'ltr' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flag: '🇮🇳', region: 'Punjab', dir: 'ltr' },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', flag: '🇮🇳', region: 'Odisha', dir: 'ltr' },
  { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া', flag: '🇮🇳', region: 'Assam', dir: 'ltr' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', flag: '🇮🇳', region: 'Pan-India', dir: 'rtl' },
];

export const TRANSLATIONS: Record<SupportedLanguage, any> = {
  en,
  hi,
  mr,
  bn,
  te,
  ta,
  gu,
  kn,
  ml,
  pa,
  or: orLocale,
  as: asLocale,
  ur,
};

/**
 * Universal nested key resolver with English fallback and variable interpolation {{param}}.
 */
export function getTranslation(
  lang: SupportedLanguage,
  key: string,
  params?: Record<string, string | number>
): string {
  const dictionary = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const enDictionary = TRANSLATIONS.en;

  const resolvePath = (dict: any, pathStr: string): any => {
    if (!dict) return undefined;
    const parts = pathStr.split('.');
    let curr = dict;
    for (const p of parts) {
      if (curr && typeof curr === 'object' && p in curr) {
        curr = curr[p];
      } else {
        return undefined;
      }
    }
    return curr;
  };

  let value = resolvePath(dictionary, key);
  if (value === undefined) {
    value = resolvePath(enDictionary, key);
  }

  if (value === undefined) {
    // Return key as fallback
    return key;
  }

  if (typeof value !== 'string') {
    return String(value);
  }

  // Parameter replacement: {{name}} -> value
  if (params) {
    return value.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, varName) => {
      return params[varName] !== undefined ? String(params[varName]) : `{{${varName}}}`;
    });
  }

  return value;
}
