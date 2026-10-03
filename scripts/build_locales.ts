import fs from 'fs';
import path from 'path';

// Complete dictionary generator for KrushiAI
import { generateAllLocales } from './locale_data';

const outDir = path.resolve(process.cwd(), 'src/locales');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const locales = generateAllLocales();
const languages = Object.keys(locales);

console.log(`Generating locales for ${languages.length} languages...`);

// Helper to extract all dot paths from an object
function getKeys(obj: any, prefix = ''): string[] {
  let keys: string[] = [];
  for (const k of Object.keys(obj)) {
    const fullKey = prefix ? `${prefix}.${k}` : k;
    if (typeof obj[k] === 'object' && obj[k] !== null && !Array.isArray(obj[k])) {
      keys = keys.concat(getKeys(obj[k], fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys;
}

const enKeys = new Set(getKeys(locales.en));
console.log(`Base English has ${enKeys.size} distinct translation keys.`);

let hasError = false;

languages.forEach((lang) => {
  const filePath = path.join(outDir, `${lang}.json`);
  fs.writeFileSync(filePath, JSON.stringify(locales[lang], null, 2), 'utf-8');
  
  // Verification
  const langKeys = new Set(getKeys(locales[lang]));
  const missing = [...enKeys].filter((k) => !langKeys.has(k));
  if (missing.length > 0) {
    console.error(`[ERROR] Language ${lang} is missing ${missing.length} keys:`, missing.slice(0, 5));
    hasError = true;
  } else {
    console.log(`✓ ${lang}.json generated and verified (100% key parity: ${langKeys.size} keys)`);
  }
});

if (hasError) {
  process.exit(1);
} else {
  console.log('All 13 translation files successfully built and verified!');
}
