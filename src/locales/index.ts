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
}

export const SUPPORTED_LANGUAGES: LanguageMeta[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇮🇳', region: 'All India' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', region: 'North / Central India' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳', region: 'Maharashtra' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇮🇳', region: 'West Bengal' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳', region: 'Andhra Pradesh & Telangana' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳', region: 'Tamil Nadu' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳', region: 'Gujarat' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳', region: 'Karnataka' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', flag: '🇮🇳', region: 'Kerala' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flag: '🇮🇳', region: 'Punjab' },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', flag: '🇮🇳', region: 'Odisha' },
  { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া', flag: '🇮🇳', region: 'Assam' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', flag: '🇮🇳', region: 'Pan-India' },
];

export interface TranslationDictionary {
  'nav.home': string;
  'nav.dashboard': string;
  'nav.cropRecommendation': string;
  'nav.diseaseDetection': string;
  'nav.marketPrices': string;
  'nav.pricePrediction': string;
  'nav.marketComparison': string;
  'nav.yieldPrediction': string;
  'nav.irrigation': string;
  'nav.farmCalendar': string;
  'nav.farmOperations': string;
  'nav.cropSpacing': string;
  'nav.farmProfile': string;
  'nav.googleDrive': string;
  'nav.settings': string;
  'nav.landing': string;

  'hero.tagline': string;
  'hero.subtitle': string;
  'hero.ctaStart': string;
  'hero.ctaExplore': string;

  'dash.greeting': string;
  'dash.subtitle': string;
  'dash.todayActions': string;
  'dash.irrigateWheat': string;
  'dash.recommendedIrrigation': string;
  'dash.rainTomorrow': string;
  'dash.marketPriceUp': string;
  'dash.diseaseRiskDetected': string;

  'badge.prototype': string;
  'badge.demoData': string;
  'badge.aiEstimate': string;
  'footer.builtForIndia': string;
}

export const TRANSLATIONS: Record<SupportedLanguage, TranslationDictionary> = {
  en: {
    'nav.home': 'Home',
    'nav.dashboard': 'Dashboard',
    'nav.cropRecommendation': 'Crop Recommendation',
    'nav.diseaseDetection': 'Disease Detection',
    'nav.marketPrices': 'Mandi Market',
    'nav.pricePrediction': 'Price Forecast',
    'nav.marketComparison': 'Compare Markets',
    'nav.yieldPrediction': 'Expected Yield',
    'nav.irrigation': 'Smart Irrigation',
    'nav.farmCalendar': 'Farm Calendar',
    'nav.farmOperations': 'Farm Tasks',
    'nav.cropSpacing': 'Crop Spacing',
    'nav.farmProfile': 'Farm Profile',
    'nav.googleDrive': 'Drive Locker',
    'nav.settings': 'Settings',
    'nav.landing': 'About KrushiAI',

    'hero.tagline': 'Smart Farming Starts With Better Decisions',
    'hero.subtitle': 'KrushiAI brings AI-powered crop recommendations, disease detection, market intelligence, irrigation guidance and farm planning into one simple platform.',
    'hero.ctaStart': 'Start Farming Smarter',
    'hero.ctaExplore': 'Explore KrushiAI',

    'dash.greeting': 'Good Morning 👋',
    'dash.subtitle': "Here's your farm intelligence for today.",
    'dash.todayActions': "Today's Actions",
    'dash.irrigateWheat': 'Irrigate your wheat field today',
    'dash.recommendedIrrigation': 'Recommended irrigation: 25 minutes',
    'dash.rainTomorrow': 'Rain expected tomorrow (65% probability)',
    'dash.marketPriceUp': 'Tomato market price increased +4.2% today',
    'dash.diseaseRiskDetected': 'Early blight fungal risk detected in leaf canopy',

    'badge.prototype': 'Demo Prediction',
    'badge.demoData': 'Demo Data',
    'badge.aiEstimate': 'AI-generated estimate',
    'footer.builtForIndia': 'Built for Indian Agriculture 🇮🇳',
  },
  hi: {
    'nav.home': 'होम',
    'nav.dashboard': 'डैशबोर्ड',
    'nav.cropRecommendation': 'फसल चयन',
    'nav.diseaseDetection': 'रोग पहचान',
    'nav.marketPrices': 'मंडी भाव',
    'nav.pricePrediction': 'मूल्य पूर्वानुमान',
    'nav.marketComparison': 'मंडी तुलना',
    'nav.yieldPrediction': 'उपज अनुमान',
    'nav.irrigation': 'स्मार्ट सिंचाई',
    'nav.farmCalendar': 'कृषि कैलेंडर',
    'nav.farmOperations': 'कृषि कार्य',
    'nav.cropSpacing': 'फसल दूरी',
    'nav.farmProfile': 'किसान प्रोफाइल',
    'nav.googleDrive': 'गूगल ड्राइव',
    'nav.settings': 'सेटिंग्स',
    'nav.landing': 'कृषिAI के बारे में',

    'hero.tagline': 'स्मार्ट खेती की शुरुआत बेहतर निर्णयों से होती है',
    'hero.subtitle': 'कृषिAI फसल सिफारिश, रोग पहचान, मंडी भाव, सिंचाई सलाह और खेत योजना को एक आसान मंच पर लाता है।',
    'hero.ctaStart': 'स्मार्ट खेती शुरू करें',
    'hero.ctaExplore': 'कृषिAI देखें',

    'dash.greeting': 'सुप्रभात 👋',
    'dash.subtitle': 'यह है आज के लिए आपके खेत की मुख्य जानकारी।',
    'dash.todayActions': 'आज के मुख्य कार्य',
    'dash.irrigateWheat': 'आज गेहूं के खेत में सिंचाई करें',
    'dash.recommendedIrrigation': 'अनुशंसित सिंचाई अवधि: 25 मिनट',
    'dash.rainTomorrow': 'कल बारिश की संभावना (65% अनुमान)',
    'dash.marketPriceUp': 'आज टमाटर के मंडी भाव में +4.2% की वृद्धि',
    'dash.diseaseRiskDetected': 'पत्तियों में फफूंद रोग का जोखिम देखा गया',

    'badge.prototype': 'डेमो पूर्वानुमान',
    'badge.demoData': 'डेमो डेटा',
    'badge.aiEstimate': 'एआई-जनित अनुमान',
    'footer.builtForIndia': 'भारतीय कृषि के लिए निर्मित 🇮🇳',
  },
  mr: {
    'nav.home': 'मुख्यपृष्ठ',
    'nav.dashboard': 'डॅशबोर्ड',
    'nav.cropRecommendation': 'पीक निवड',
    'nav.diseaseDetection': 'रोग ओळख',
    'nav.marketPrices': 'बाजारभाव',
    'nav.pricePrediction': 'किंमत अंदाज',
    'nav.marketComparison': 'बाजार तुलना',
    'nav.yieldPrediction': 'उत्पादन अंदाज',
    'nav.irrigation': 'सिंचन सल्ला',
    'nav.farmCalendar': 'शेती दिनदर्शिका',
    'nav.farmOperations': 'शेती कामे',
    'nav.cropSpacing': 'पीक अंतर',
    'nav.farmProfile': 'शेतकरी प्रोफाईल',
    'nav.googleDrive': 'गुगल ड्राईव्ह',
    'nav.settings': 'सेटिंग्ज',
    'nav.landing': 'कृषीAI माहिती',

    'hero.tagline': 'स्मार्ट शेतीची सुरुवात अचूक निर्णयांनी होते',
    'hero.subtitle': 'कृषीAI पीक निवड, रोग ओळख, बाजारभाव अंदाज, पाणी व्यवस्थापन आणि शेती नियोजन एका सोप्या व्यासपीठावर आणते.',
    'hero.ctaStart': 'स्मार्ट शेती सुरू करा',
    'hero.ctaExplore': 'कृषीAI पहा',

    'dash.greeting': 'शुभ सकाळ 👋',
    'dash.subtitle': 'आजची तुमच्या शेताची संपूर्ण माहिती.',
    'dash.todayActions': 'आजची महत्त्वाची कामे',
    'dash.irrigateWheat': 'आज गव्हाच्या शेताला पाणी द्या',
    'dash.recommendedIrrigation': 'शिफारस वेळ: 25 मिनिटे ठिबक सिंचन',
    'dash.rainTomorrow': 'उद्या पावसाची शक्यता (65% अंदाज)',
    'dash.marketPriceUp': 'आज टोमॅटोच्या बाजारभावात +4.2% वाढ',
    'dash.diseaseRiskDetected': 'पानांवर बुरशीजन्य रोगाचा प्राथमिक धोका',

    'badge.prototype': 'डेमो अंदाज',
    'badge.demoData': 'डेमो डेटा',
    'badge.aiEstimate': 'एआय-आधारित अंदाज',
    'footer.builtForIndia': 'भारतीय शेतीसाठी विकसित 🇮🇳',
  },
  bn: {
    'nav.home': 'হোম',
    'nav.dashboard': 'ড্যাশবোর্ড',
    'nav.cropRecommendation': 'ফসল নির্বাচন',
    'nav.diseaseDetection': 'রোগ নির্ণয়',
    'nav.marketPrices': 'বাজার দর',
    'nav.pricePrediction': 'মূল্য পূর্বাভাস',
    'nav.marketComparison': 'বাজার তুলনা',
    'nav.yieldPrediction': 'ফলন অনুমান',
    'nav.irrigation': 'স্মার্ট সেচ',
    'nav.farmCalendar': 'কৃষি ক্যালেন্ডার',
    'nav.farmOperations': 'খামার কাজ',
    'nav.cropSpacing': 'ফসলের দূরত্ব',
    'nav.farmProfile': 'কৃষক প্রোফাইল',
    'nav.googleDrive': 'গুগল ড্রাইভ',
    'nav.settings': 'সেটিংস',
    'nav.landing': 'কৃষিAI পরিচয়',

    'hero.tagline': 'সঠিক সিদ্ধান্তের মাধ্যমে আধুনিক কৃষির সূচনা',
    'hero.subtitle': 'কৃষিAI ফসল নির্বাচন, রোগ নির্ণয়, বাজার গোয়েন্দা এবং সেচ পরামর্শ একসাথে এনেছে।',
    'hero.ctaStart': 'আধুনিক চাষ শুরু করুন',
    'hero.ctaExplore': 'কৃষিAI অন্বেষণ করুন',

    'dash.greeting': 'শুভ সকাল 👋',
    'dash.subtitle': 'আজকের খামার বুদ্ধিমত্তা এক নজরে।',
    'dash.todayActions': 'আজকের করণীয়',
    'dash.irrigateWheat': 'আজ গমের জমিতে সেচ দিন',
    'dash.recommendedIrrigation': 'প্রস্তাবিত সেচ সময়: ২৫ মিনিট',
    'dash.rainTomorrow': 'কাল বৃষ্টির সম্ভাবনা (৬৫%)',
    'dash.marketPriceUp': 'আজ টমেটোর বাজারদর বৃদ্ধি পেয়েছে',
    'dash.diseaseRiskDetected': 'পাতায় ছত্রাকজনিত রোগের ঝুঁকি সনাক্ত হয়েছে',

    'badge.prototype': 'ডেমো পূর্বাভাস',
    'badge.demoData': 'ডেমো তথ্য',
    'badge.aiEstimate': 'এআই অনুমান',
    'footer.builtForIndia': 'ভারতীয় কৃষির জন্য তৈরি 🇮🇳',
  },
  te: {
    'nav.home': 'హోమ్',
    'nav.dashboard': 'డాష్‌బోర్డ్',
    'nav.cropRecommendation': 'పంట సిఫార్సు',
    'nav.diseaseDetection': 'తెగుళ్ల గుర్తింపు',
    'nav.marketPrices': 'మార్కెట్ ధరలు',
    'nav.pricePrediction': 'ధరల అంచనా',
    'nav.marketComparison': 'మార్కెట్ పోలిక',
    'nav.yieldPrediction': 'దిగుబడి అంచనా',
    'nav.irrigation': 'స్మార్ట్ నీటిపారుదల',
    'nav.farmCalendar': 'వ్యవసాయ క్యాలెండర్',
    'nav.farmOperations': 'పొలం పనులు',
    'nav.cropSpacing': 'పంట దూరం',
    'nav.farmProfile': 'రైతు ప్రొఫైల్',
    'nav.googleDrive': 'గూగుల్ డ్రైవ్',
    'nav.settings': 'సెట్టింగ్‌లు',
    'nav.landing': 'కృషిAI గురించి',

    'hero.tagline': 'మంచి నిర్ణయాలతో స్మార్ట్ వ్యవసాయం మొదలవుతుంది',
    'hero.subtitle': 'పంట ఎంపిక, వ్యాధి గుర్తింపు, మార్కెట్ ధరలు మరియు నీటి నిర్వహణ ఒకే వేదికపై.',
    'hero.ctaStart': 'స్మార్ట్ వ్యవసాయం ప్రారంభించండి',
    'hero.ctaExplore': 'కృషిAI చూడండి',

    'dash.greeting': 'శుభోదయం 👋',
    'dash.subtitle': 'ఈ రోజు మీ పొలం సమాచారం ఒక చూపులో.',
    'dash.todayActions': 'ఈ రోజు పనులు',
    'dash.irrigateWheat': 'ఈ రోజు గోధుమ పంటకు నీరు పెట్టండి',
    'dash.recommendedIrrigation': 'సిఫార్సు చేయబడిన సమయం: 25 నిమిషాలు',
    'dash.rainTomorrow': 'రేపు వర్షం పడే అవకాశం (65%)',
    'dash.marketPriceUp': 'టమోటా మార్కెట్ ధర ఈ రోజు పెరిగింది',
    'dash.diseaseRiskDetected': 'ఆకులపై తెగులు ప్రమాదం గమనించబడింది',

    'badge.prototype': 'డెమో అంచనా',
    'badge.demoData': 'డెమో సమాచారం',
    'badge.aiEstimate': 'AI అంచనా',
    'footer.builtForIndia': 'భారతీయ వ్యవసాయం కోసం రూపొందించబడింది 🇮🇳',
  },
  ta: {
    'nav.home': 'முகப்பு',
    'nav.dashboard': 'டாஷ்போர்டு',
    'nav.cropRecommendation': 'பயிர் தேர்வு',
    'nav.diseaseDetection': 'நோய் கண்டறிதல்',
    'nav.marketPrices': 'சந்தை விலை',
    'nav.pricePrediction': 'விலை முன்னறிவிப்பு',
    'nav.marketComparison': 'சந்தை ஒப்பீடு',
    'nav.yieldPrediction': 'மகசூல் கணிப்பு',
    'nav.irrigation': 'நீர்ப்பாசன ஆலோசனை',
    'nav.farmCalendar': 'விவசாய நாள்காட்டி',
    'nav.farmOperations': 'பண்ணை பணிகள்',
    'nav.cropSpacing': 'பயிர் இடைவெளி',
    'nav.farmProfile': 'விவசாயி சுயவிவரம்',
    'nav.googleDrive': 'கூகிள் டிரைவ்',
    'nav.settings': 'அமைப்புகள்',
    'nav.landing': 'க்ருஷிAI பற்றி',

    'hero.tagline': 'சிறந்த முடிவுகளுடன் தொடங்கும் நவீன விவசாயம்',
    'hero.subtitle': 'பயிர் ஆலோசனை, நோய் கண்டறிதல், சந்தை நுண்ணறிவு மற்றும் நீர்ப்பாசனம் ஒரே தளத்தில்.',
    'hero.ctaStart': 'தொடங்குங்கள்',
    'hero.ctaExplore': 'அறிந்து கொள்ளுங்கள்',

    'dash.greeting': 'காலை வணக்கம் 👋',
    'dash.subtitle': 'இன்றைய பண்ணை நுண்ணறிவு தகவல்கள்.',
    'dash.todayActions': 'இன்றைய முக்கிய பணிகள்',
    'dash.irrigateWheat': 'இன்று கோதுமை நிலத்திற்கு பாசனம் செய்யவும்',
    'dash.recommendedIrrigation': 'பரிந்துரைக்கப்பட்ட நேரம்: 25 நிமிடங்கள்',
    'dash.rainTomorrow': 'நாளை மழை பெய்ய வாய்ப்புள்ளது (65%)',
    'dash.marketPriceUp': 'தக்காளி சந்தை விலை இன்று அதிகரித்துள்ளது',
    'dash.diseaseRiskDetected': 'இலைகளில் பூஞ்சை நோய் ஆபத்து கண்டறியப்பட்டது',

    'badge.prototype': 'மாதிரி கணிப்பு',
    'badge.demoData': 'மாதிரி தரவு',
    'badge.aiEstimate': 'AI மதிப்பீடு',
    'footer.builtForIndia': 'இந்திய விவசாயத்திற்காக உருவாக்கப்பட்டது 🇮🇳',
  },
  gu: {
    'nav.home': 'હોમ',
    'nav.dashboard': 'ડેશબોર્ડ',
    'nav.cropRecommendation': 'પાકની પસંદગી',
    'nav.diseaseDetection': 'રોગ ઓળખ',
    'nav.marketPrices': 'બજાર ભાવ',
    'nav.pricePrediction': 'ભાવ આગાહી',
    'nav.marketComparison': 'બજાર સરખામણી',
    'nav.yieldPrediction': 'ઉત્પાદન અંદાજ',
    'nav.irrigation': 'સિંચાઈ સલાહ',
    'nav.farmCalendar': 'ખેતી કેલેન્ડર',
    'nav.farmOperations': 'ખેતી કામો',
    'nav.cropSpacing': 'પાકનું અંતર',
    'nav.farmProfile': 'ખેડૂત પ્રોફાઇલ',
    'nav.googleDrive': 'ગુગલ ડ્રાઇવ',
    'nav.settings': 'સેટિંગ્સ',
    'nav.landing': 'કૃષિAI પરિચય',

    'hero.tagline': 'સ્માર્ટ ખેતીની શરૂઆત બહેતર નિર્ણયોથી થાય છે',
    'hero.subtitle': 'પાકની પસંદગી, રોગ નિદાન, બજાર ભાવ અને સિંચાઈ એક જ સરળ મંચ પર.',
    'hero.ctaStart': 'સ્માર્ટ ખેતી શરૂ કરો',
    'hero.ctaExplore': 'કૃષિAI જુઓ',

    'dash.greeting': 'સુપ્રભાત 👋',
    'dash.subtitle': 'આજે તમારા ખેતરની માહિતી.',
    'dash.todayActions': 'આજના મુખ્ય કાર્યો',
    'dash.irrigateWheat': 'આજે ઘઉંના ખેતરમાં પિયત આપો',
    'dash.recommendedIrrigation': 'ભલામણ સમય: 25 મિનિટ',
    'dash.rainTomorrow': 'આવતીકાલે વરસાદની શક્યતા (65%)',
    'dash.marketPriceUp': 'આજે ટામેટાના બજાર ભાવમાં વધારો',
    'dash.diseaseRiskDetected': 'પાંદડામાં ફૂગના રોગનું જોખમ જણાયું',

    'badge.prototype': 'ડેમો આગાહી',
    'badge.demoData': 'ડેમો ડેટા',
    'badge.aiEstimate': 'AI અંદાજ',
    'footer.builtForIndia': 'ભારતીય ખેતી માટે સમર્પિત 🇮🇳',
  },
  kn: {
    'nav.home': 'ಮುಖಪುಟ',
    'nav.dashboard': 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    'nav.cropRecommendation': 'ಬೆಳೆ ಶಿಫಾರಸು',
    'nav.diseaseDetection': 'ರೋಗ ಪತ್ತೆ',
    'nav.marketPrices': 'ಮಾರುಕಟ್ಟೆ ದರ',
    'nav.pricePrediction': 'ಬೆಲೆ ಮುನ್ಸೂಚನೆ',
    'nav.marketComparison': 'ಮಾರುಕಟ್ಟೆ ಹೋಲಿಕೆ',
    'nav.yieldPrediction': 'ಇಳುವರಿ ಅಂದಾಜು',
    'nav.irrigation': 'ಸ್ಮಾರ್ಟ್ ನೀರಾವರಿ',
    'nav.farmCalendar': 'ಕೃಷಿ ಕ್ಯಾಲೆಂಡರ್',
    'nav.farmOperations': 'ಕೃಷಿ ಕಾರ್ಯಗಳು',
    'nav.cropSpacing': 'ಬೆಳೆ ಅಂತರ',
    'nav.farmProfile': 'ರೈತ ಪ್ರೊಫೈಲ್',
    'nav.googleDrive': 'ಗೂಗಲ್ ಡ್ರೈವ್',
    'nav.settings': 'ಸೆಟ್ಟಿಂಗ್‌ಗಳು',
    'nav.landing': 'ಕೃಷಿAI ಕುರಿತು',

    'hero.tagline': 'ಉತ್ತಮ ನಿರ್ಧಾರಗಳೊಂದಿಗೆ ಸ್ಮಾರ್ಟ್ ಕೃಷಿ ಆರಂಭವಾಗುತ್ತದೆ',
    'hero.subtitle': 'ಬೆಳೆ ಆಯ್ಕೆ, ರೋಗ ಪತ್ತೆ, ಮಾರುಕಟ್ಟೆ ದರ ಮತ್ತು ನೀರಾವರಿ ಸಲಹೆ ಒಂದೇ ವೇದಿಕೆಯಲ್ಲಿ.',
    'hero.ctaStart': 'ಕೃಷಿ ಆರಂಭಿಸಿ',
    'hero.ctaExplore': 'ವಿವರ ತಿಳಿಯಿರಿ',

    'dash.greeting': 'ಶುಭೋದಯ 👋',
    'dash.subtitle': 'ಇಂದಿನ ನಿಮ್ಮ ಜಮೀನಿನ ಮಾಹಿತಿ.',
    'dash.todayActions': 'ಇಂದಿನ ಪ್ರಮುಖ ಕೆಲಸಗಳು',
    'dash.irrigateWheat': 'ಇಂದು ಗೋಧಿ ಬೆಳೆಗೆ ನೀರು ಹಾಯಿಸಿ',
    'dash.recommendedIrrigation': 'ಶಿಫಾರಸು ಮಾಡಿದ ಸಮಯ: 25 ನಿಮಿಷಗಳು',
    'dash.rainTomorrow': 'ನಾಳೆ ಮಳೆಯಾಗುವ ಸಾಧ್ಯತೆ (65%)',
    'dash.marketPriceUp': 'ಟೊಮೆಟೊ ಮಾರುಕಟ್ಟೆ ದರ ಇಂದು ಏರಿಕೆಯಾಗಿದೆ',
    'dash.diseaseRiskDetected': 'ಎಲೆಗಳಲ್ಲಿ ಶಿಲೀಂಧ್ರ ರೋಗದ ಅಪಾಯ ಪತ್ತೆಯಾಗಿದೆ',

    'badge.prototype': 'ಡೆಮೊ ಅಂದಾಜು',
    'badge.demoData': 'ಡೆಮೊ ಡೇಟಾ',
    'badge.aiEstimate': 'AI ಅಂದಾಜು',
    'footer.builtForIndia': 'ಭಾರತೀಯ ಕೃಷಿಗಾಗಿ ನಿರ್ಮಿಸಲಾಗಿದೆ 🇮🇳',
  },
  ml: {
    'nav.home': 'ഹോം',
    'nav.dashboard': 'ഡാഷ്‌ബോർഡ്',
    'nav.cropRecommendation': 'വിള നിർദ്ദേശം',
    'nav.diseaseDetection': 'രോഗ നിർണയം',
    'nav.marketPrices': 'വിപണി വില',
    'nav.pricePrediction': 'വില പ്രവചനം',
    'nav.marketComparison': 'വിപണി താരതമ്യം',
    'nav.yieldPrediction': 'വിളവ് കണക്കാക്കൽ',
    'nav.irrigation': 'സ്മാർട്ട് ജലസേചനം',
    'nav.farmCalendar': 'കൃഷി കലണ്ടർ',
    'nav.farmOperations': 'കൃഷി ജോലികൾ',
    'nav.cropSpacing': 'വിള അകലം',
    'nav.farmProfile': 'കർഷക പ്രൊഫൈൽ',
    'nav.googleDrive': 'ഗൂഗിൾ ഡ്രൈവ്',
    'nav.settings': 'ക്രമീകരണങ്ങൾ',
    'nav.landing': 'കൃഷിAI കുറിച്ച്',

    'hero.tagline': 'മികച്ച തീരുമാനങ്ങളിലൂടെ സ്മാർട്ട് കൃഷി',
    'hero.subtitle': 'വിള തിരഞ്ഞെടുക്കൽ, രോഗനിർണയം, വിപണി വിവരങ്ങൾ ഒറ്റ പ്ലാറ്റ്‌ഫോമിൽ.',
    'hero.ctaStart': 'തുടങ്ങാം',
    'hero.ctaExplore': 'കൂടുതലറിയാൻ',

    'dash.greeting': 'സുപ്രഭാതം 👋',
    'dash.subtitle': 'ഇന്നത്തെ നിങ്ങളുടെ കൃഷിയിട വിവരങ്ങൾ.',
    'dash.todayActions': 'ഇന്നത്തെ പ്രധാന ജോലികൾ',
    'dash.irrigateWheat': 'ഇന്ന് ഗോതമ്പ് പാടത്ത് നനയ്ക്കുക',
    'dash.recommendedIrrigation': 'ശുപാർശ ചെയ്യുന്ന സമയം: 25 മിനിറ്റ്',
    'dash.rainTomorrow': 'നാളെ മഴയ്ക്ക് സാധ്യത (65%)',
    'dash.marketPriceUp': 'തക്കാളി വിപണി വില ഇന്ന് വർദ്ധിച്ചു',
    'dash.diseaseRiskDetected': 'ഇലകളിൽ കുമിൾ രോഗ സാധ്യത കണ്ടെത്തി',

    'badge.prototype': 'ഡെമോ പ്രവചനം',
    'badge.demoData': 'ഡെമോ ഡാറ്റ',
    'badge.aiEstimate': 'AI കണക്കുകൂട്ടൽ',
    'footer.builtForIndia': 'ഭാരതീയ കൃഷിക്കായി നിർമ്മിച്ചത് 🇮🇳',
  },
  pa: {
    'nav.home': 'ਹੋਮ',
    'nav.dashboard': 'ਡੈਸ਼ਬੋਰਡ',
    'nav.cropRecommendation': 'ਫ਼ਸਲ ਚੋਣ',
    'nav.diseaseDetection': 'ਬਿਮਾਰੀ ਦੀ ਪਛਾਣ',
    'nav.marketPrices': 'ਮੰਡੀ ਭਾਅ',
    'nav.pricePrediction': 'ਕੀਮਤ ਅੰਦਾਜ਼ਾ',
    'nav.marketComparison': 'ਮੰਡੀ ਤੁਲਨਾ',
    'nav.yieldPrediction': 'ਉਤਪਾਦਨ ਅੰਦਾਜ਼ਾ',
    'nav.irrigation': 'ਸਮਾਰਟ ਸਿੰਚਾਈ',
    'nav.farmCalendar': 'ਖੇਤੀ ਕੈਲੰਡਰ',
    'nav.farmOperations': 'ਖੇਤੀ ਦੇ ਕੰਮ',
    'nav.cropSpacing': 'ਫ਼ਸਲੀ ਵਿੱਥ',
    'nav.farmProfile': 'ਕਿਸਾਨ ਪ੍ਰੋਫਾਈਲ',
    'nav.googleDrive': 'ਗੂਗਲ ਡਰਾਈਵ',
    'nav.settings': 'ਸੈਟਿੰਗਾਂ',
    'nav.landing': 'ਕ੍ਰਿਸ਼ੀAI ਬਾਰੇ',

    'hero.tagline': 'ਚੰਗੇ ਫੈਸਲਿਆਂ ਨਾਲ ਸ਼ੁਰੂ ਹੁੰਦੀ ਹੈ ਸਮਾਰਟ ਖੇਤੀ',
    'hero.subtitle': 'ਫ਼ਸਲ ਦੀ ਚੋਣ, ਬਿਮਾਰੀਆਂ ਦੀ ਪਛਾਣ, ਮੰਡੀ ਭਾਅ ਅਤੇ ਸਿੰਚਾਈ ਇੱਕੋ ਮੰਚ ਉੱਤੇ।',
    'hero.ctaStart': 'ਸਮਾਰਟ ਖੇਤੀ ਸ਼ੁਰੂ ਕਰੋ',
    'hero.ctaExplore': 'ਕ੍ਰਿਸ਼ੀAI ਜਾਣੋ',

    'dash.greeting': 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ 👋',
    'dash.subtitle': 'ਅੱਜ ਤੁਹਾਡੇ ਖੇਤ ਦੀ ਤਾਜ਼ਾ ਜਾਣਕਾਰੀ।',
    'dash.todayActions': 'ਅੱਜ ਦੇ ਜ਼ਰੂਰੀ ਕੰਮ',
    'dash.irrigateWheat': 'ਅੱਜ ਕਣਕ ਦੇ ਖੇਤ ਨੂੰ ਪਾਣੀ ਲਾਓ',
    'dash.recommendedIrrigation': 'ਸਿਫ਼ਾਰਸ਼ ਕੀਤਾ ਸਮਾਂ: 25 ਮਿੰਟ',
    'dash.rainTomorrow': 'ਕੱਲ੍ਹ ਮੀਂਹ ਪੈਣ ਦੀ ਸੰਭਾਵਨਾ (65%)',
    'dash.marketPriceUp': 'ਅੱਜ ਟਮਾਟਰ ਦਾ ਮੰਡੀ ਭਾਅ ਵਧਿਆ',
    'dash.diseaseRiskDetected': 'ਪੱਤਿਆਂ ਤੇ ਉੱਲੀ ਰੋਗ ਦਾ ਖਤਰਾ ਪਾਇਆ ਗਿਆ',

    'badge.prototype': 'ਡੈਮੋ ਅੰਦਾਜ਼ਾ',
    'badge.demoData': 'ਡੈਮੋ ਡਾਟਾ',
    'badge.aiEstimate': 'AI ਅੰਦਾਜ਼ਾ',
    'footer.builtForIndia': 'ਭਾਰਤੀ ਖੇਤੀਬਾੜੀ ਲਈ ਤਿਆਰ 🇮🇳',
  },
  or: {
    'nav.home': 'ମୂଳପୃଷ୍ଠା',
    'nav.dashboard': 'ଡ୍ୟାସବୋର୍ଡ',
    'nav.cropRecommendation': 'ଫସଲ ଚୟନ',
    'nav.diseaseDetection': 'ରୋଗ ଚିହ୍ନଟ',
    'nav.marketPrices': 'ମଣ୍ଡି ଦର',
    'nav.pricePrediction': 'ମୂଲ୍ୟ ପୂର୍ବାନୁମାନ',
    'nav.marketComparison': 'ମଣ୍ଡି ତୁଳନା',
    'nav.yieldPrediction': 'ଅମଳ ଅନୁମାନ',
    'nav.irrigation': 'ସ୍ମାର୍ଟ ଜଳସେଚନ',
    'nav.farmCalendar': 'କୃଷି କ୍ୟାଲେଣ୍ଡର',
    'nav.farmOperations': 'କୃଷି କାର୍ଯ୍ୟ',
    'nav.cropSpacing': 'ଫସଲ ବ୍ୟବଧାନ',
    'nav.farmProfile': 'କୃଷକ ପ୍ରୋଫାଇଲ୍',
    'nav.googleDrive': 'ଗୁଗୁଲ ଡ୍ରାଇଭ',
    'nav.settings': 'ସେଟିଂସ୍',
    'nav.landing': 'କୃଷିAI ପରିଚୟ',

    'hero.tagline': 'ଉତ୍ତମ ନିଷ୍ପତ୍ତି ସହ ସ୍ମାର୍ଟ କୃଷିର ଆରମ୍ଭ',
    'hero.subtitle': 'ଫସଲ ଚୟନ, ରୋଗ ଚିହ୍ନଟ, ବଜାର ଦର ଏବଂ ଜଳସେଚନ ଗୋଟିଏ ସରଳ ମଞ୍ଚରେ।',
    'hero.ctaStart': 'ଆରମ୍ଭ କରନ୍ତୁ',
    'hero.ctaExplore': 'ଦେଖନ୍ତୁ',

    'dash.greeting': 'ଶୁଭ ସକାଳ 👋',
    'dash.subtitle': 'ଆଜି ଆପଣଙ୍କ ଜମିର ପ୍ରମୁଖ ତଥ୍ୟ।',
    'dash.todayActions': 'ଆଜିର ମୁଖ୍ୟ କାର୍ଯ୍ୟ',
    'dash.irrigateWheat': 'ଆଜି ଗହମ ଜମିରେ ପାଣି ଦିଅନ୍ତୁ',
    'dash.recommendedIrrigation': 'ପରାମର୍ଶିତ ସମୟ: ୨୫ ମିନିଟ୍',
    'dash.rainTomorrow': 'କାଲି ବର୍ଷା ସମ୍ଭାବନା (୬୫%)',
    'dash.marketPriceUp': 'ଆଜି ବିଲାତି ବଜାର ଦର ବୃଦ୍ଧି ପାଇଛି',
    'dash.diseaseRiskDetected': 'ପତ୍ରରେ କବକ ରୋଗର ଆଶଙ୍କା ଦେଖାଦେଇଛି',

    'badge.prototype': 'ଡେମୋ ଅନୁମାନ',
    'badge.demoData': 'ଡେମୋ ଡାଟା',
    'badge.aiEstimate': 'AI ଅନୁମାନ',
    'footer.builtForIndia': 'ଭାରତୀୟ କୃଷି ପାଇଁ ନିର୍ମିତ 🇮🇳',
  },
  as: {
    'nav.home': 'ঘৰ',
    'nav.dashboard': 'ডেশ্বব’ৰ্ড',
    'nav.cropRecommendation': 'শস্য নিৰ্বাচন',
    'nav.diseaseDetection': 'ৰোগ চিনাক্তকৰণ',
    'nav.marketPrices': 'বজাৰ দৰ',
    'nav.pricePrediction': 'মূল্যৰ আগলি বতৰা',
    'nav.marketComparison': 'বজাৰ তুলনা',
    'nav.yieldPrediction': 'উৎপাদনৰ অনুমান',
    'nav.irrigation': 'স্মাৰ্ট জলসিঞ্চন',
    'nav.farmCalendar': 'কৃষি দিনপঞ্জী',
    'nav.farmOperations': 'কৃষি কাম-কাজ',
    'nav.cropSpacing': 'শস্যৰ দূৰত্ব',
    'nav.farmProfile': 'কৃষক প্ৰফাইল',
    'nav.googleDrive': 'গুগল ড্ৰাইভ',
    'nav.settings': 'ছেটিংছ',
    'nav.landing': 'কৃষিAI পৰিচয়',

    'hero.tagline': 'উন্নত সিদ্ধান্তৰে আধুনিক কৃষিৰ আৰম্ভণি',
    'hero.subtitle': 'শস্য বাছনি, ৰোগ নিৰ্ণয়, বজাৰ তথ্য আৰু জলসিঞ্চনৰ সঠিক দিহা।',
    'hero.ctaStart': 'আৰম্ভ কৰক',
    'hero.ctaExplore': 'অধিক জানক',

    'dash.greeting': 'শুভ প্ৰভাত 👋',
    'dash.subtitle': 'আজিৰ আপোনাৰ পথাৰৰ গুৰুত্বপূৰ্ণ তথ্য।',
    'dash.todayActions': 'আজিৰ কৰণীয়',
    'dash.irrigateWheat': 'আজি ঘেঁহুৰ পথাৰত পানী দিয়ক',
    'dash.recommendedIrrigation': 'পৰামৰ্শিত সময়: ২৫ মিনিট',
    'dash.rainTomorrow': 'কাইলৈ বৰষুণৰ সম্ভাৱনা (৬৫%)',
    'dash.marketPriceUp': 'আজি বিলাহীৰ বজাৰ মূল্য বৃদ্ধি পাইছে',
    'dash.diseaseRiskDetected': 'পাতত ভেঁকুৰজনিত ৰোগৰ লক্ষণ ধৰা পৰিছে',

    'badge.prototype': 'ডেম’ অনুমান',
    'badge.demoData': 'ডেম’ তথ্য',
    'badge.aiEstimate': 'AI অনুমান',
    'footer.builtForIndia': 'ভাৰতীয় কৃষিৰ বাবে নিৰ্মিত 🇮🇳',
  },
  ur: {
    'nav.home': 'ہوم',
    'nav.dashboard': 'ڈیش بورڈ',
    'nav.cropRecommendation': 'فصل کی سفارش',
    'nav.diseaseDetection': 'بیماری کی شناخت',
    'nav.marketPrices': 'منڈی بھاؤ',
    'nav.pricePrediction': 'قیمت کی پیشگوئی',
    'nav.marketComparison': 'منڈی کا موازنہ',
    'nav.yieldPrediction': 'پیداوار کا تخمینہ',
    'nav.irrigation': 'سمارٹ آبپاشی',
    'nav.farmCalendar': 'زرعی کیلنڈر',
    'nav.farmOperations': 'کھیت کے کام',
    'nav.cropSpacing': 'فصل کا فاصلہ',
    'nav.farmProfile': 'کسان پروفائل',
    'nav.googleDrive': 'گوگل ڈرائیو',
    'nav.settings': 'سیٹنگز',
    'nav.landing': 'کرشی اے آئی تعارف',

    'hero.tagline': 'بہتر فیصلوں کے ساتھ سمارٹ زراعت کا آغاز',
    'hero.subtitle': 'فصل کا انتخاب، بیماری کی تشخیص، منڈی کے ریٹ اور آبپاشی ایک پلیٹ فارم پر۔',
    'hero.ctaStart': 'شروع کریں',
    'hero.ctaExplore': 'مزید جانیں',

    'dash.greeting': 'صبح بخیر 👋',
    'dash.subtitle': 'آج کے لیے آپ کے کھیت کی مکمل معلومات۔',
    'dash.todayActions': 'آج کے اہم کام',
    'dash.irrigateWheat': 'آج گندم کے کھیت کو پانی لگائیں',
    'dash.recommendedIrrigation': 'تجویز کردہ وقت: 25 منٹ',
    'dash.rainTomorrow': 'کل بارش کا امکان (65%)',
    'dash.marketPriceUp': 'آج ٹماٹر کے منڈی ریٹ میں اضافہ ہوا ہے',
    'dash.diseaseRiskDetected': 'پتوں میں پھپھوندی کا خطرہ پایا گیا',

    'badge.prototype': 'ڈیمو تخمینہ',
    'badge.demoData': 'ڈیمو ڈیٹا',
    'badge.aiEstimate': 'AI تخمینہ',
    'footer.builtForIndia': 'ہندوستانی زراعت کے لیے تیار کردہ 🇮🇳',
  },
};
