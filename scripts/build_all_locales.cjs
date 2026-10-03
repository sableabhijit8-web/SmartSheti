const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, '../src/locales');
const en = JSON.parse(fs.readFileSync(path.join(localesDir, 'en.json'), 'utf-8'));

// Common crops in all languages
const cropTranslations = {
  hi: { Soybean: "सोयाबीन", Cotton: "कपास", Wheat: "गेहूं", Onion: "प्याज", Tomato: "टमाटर", Chickpea: "चना", Sorghum: "ज्वार", Rice: "चावल / धान", Sugarcane: "गन्ना", Maize: "मक्का" },
  mr: { Soybean: "सोयाबीन", Cotton: "कापूस", Wheat: "गहू", Onion: "कांदा", Tomato: "टोमॅटो", Chickpea: "हरभरा", Sorghum: "ज्वारी", Rice: "तांदूळ / भात", Sugarcane: "ऊस", Maize: "मका" },
  bn: { Soybean: "সয়াবিন", Cotton: "তুলা", Wheat: "গম", Onion: "পেঁয়াজ", Tomato: "টমেটো", Chickpea: "ছোলা", Sorghum: "জোয়ার", Rice: "ধান / চাল", Sugarcane: "আখ", Maize: "ভুট্টা" },
  te: { Soybean: "సోయాబీన్", Cotton: "పత్తి", Wheat: "గోధుమలు", Onion: "ఉల్లిపాయ", Tomato: "టమాట", Chickpea: "శనగలు", Sorghum: "జొన్నలు", Rice: "వరి", Sugarcane: "చెరకు", Maize: "మొక్కజొన్న" },
  ta: { Soybean: "சோயாபீன்", Cotton: "பருத்தி", Wheat: "கோதுமை", Onion: "வெங்காயம்", Tomato: "தக்காளி", Chickpea: "கொண்டைக்கடலை", Sorghum: "சோளம்", Rice: "நெல் / அரிசி", Sugarcane: "கரும்பு", Maize: "மக்காச்சோளம்" },
  gu: { Soybean: "સોયાબીન", Cotton: "કપાસ", Wheat: "ઘઉં", Onion: "ડુંગળી", Tomato: "ટામેટા", Chickpea: "ચણા", Sorghum: "જુવાર", Rice: "ડાંગર / ચોખા", Sugarcane: "શેરડી", Maize: "મકાઈ" },
  kn: { Soybean: "ಸೋಯಾಬೀನ್", Cotton: "ಹತ್ತಿ", Wheat: "ಗೋಧಿ", Onion: "ಈರುಳ್ಳಿ", Tomato: "ಟೊಮೆಟೊ", Chickpea: "ಕಡಲೆ", Sorghum: "ಜೋಳ", Rice: "ಭತ್ತ / ಅಕ್ಕಿ", Sugarcane: "ಕಬ್ಬು", Maize: "ಮೆಕ್ಕೆಜೋಳ" },
  ml: { Soybean: "സോയാബീൻ", Cotton: "പരുത്തി", Wheat: "ഗോതമ്പ്", Onion: "സവാള", Tomato: "തക്കാളി", Chickpea: "കടല", Sorghum: "ചോളം", Rice: "നെല്ല് / അരി", Sugarcane: "കരിമ്പ്", Maize: "മക്കച്ചോളം" },
  pa: { Soybean: "ਸੋਇਆਬੀਨ", Cotton: "ਨਰਮਾ / ਕਪਾਹ", Wheat: "ਕਣਕ", Onion: "ਗੰਢਾ / ਪਿਆਜ਼", Tomato: "ਟਮਾਟਰ", Chickpea: "ਛੋਲੇ", Sorghum: "ਜਵਾਰ", Rice: "ਝੋਨਾ / ਚੌਲ", Sugarcane: "ਗੰਨਾ", Maize: "ਮੱਕੀ" },
  or: { Soybean: "ସୋୟାବିନ", Cotton: "କପା", Wheat: "ଗହମ", Onion: "ପିଆଜ", Tomato: "ଟମାଟୋ", Chickpea: "ବୁଟ / ଚଣା", Sorghum: "ଜୁଆର", Rice: "ଧାନ / ଚାଉଳ", Sugarcane: "ଆଖୁ", Maize: "ମକା" },
  as: { Soybean: "ছয়াবিন", Cotton: "কপাহ", Wheat: "ঘেঁহু", Onion: "পিয়াঁজ", Tomato: "টমেটো", Chickpea: "বুট মাহ", Sorghum: "যুৱাৰ", Rice: "ধান / চাউল", Sugarcane: "কুঁহিয়াৰ", Maize: "মাকৈ" },
  ur: { Soybean: "سویا بین", Cotton: "کپاس", Wheat: "گندم", Onion: "پیاز", Tomato: "ٹماٹر", Chickpea: "چنا", Sorghum: "جوار", Rice: "چاول / دھان", Sugarcane: "گنا", Maize: "مکئی" }
};

// Common soils in all languages
const soilTranslations = {
  hi: { blackSoil: "काली मिट्टी", redSoil: "लाल मिट्टी", alluvialSoil: "जलोढ़ मिट्टी", lateriteSoil: "लैटेराइट मिट्टी", otherSoil: "अन्य मिट्टी", blackSoilDesc: "उच्च नमी धारण क्षमता, कपास और सोयाबीन के लिए आदर्श", redSoilDesc: "अच्छी जल निकासी, दलहन और मोटे अनाजों के लिए उपयुक्त", alluvialSoilDesc: "दोमट से भरपूर, गेहूं और चावल के लिए अत्यधिक उपजाऊ", lateriteSoilDesc: "छिद्रयुक्त, अम्लीय, बागवानी फसलों के लिए उपयुक्त" },
  mr: { blackSoil: "काळी कसदार माती", redSoil: "तांबडी माती", alluvialSoil: "गाळाची सुपीक माती", lateriteSoil: "जांभा माती", otherSoil: "इतर माती", blackSoilDesc: "उच्च ओलावा टिकवून ठेवणारी, कापूस आणि सोयाबीनसाठी उत्तम", redSoilDesc: "उत्कृष्ट निचरा, डाळी आणि भरड धान्यासाठी उपयुक्त", alluvialSoilDesc: "गाळाने समृद्ध, गहू आणि भातासाठी अत्यंत सुपीक", lateriteSoilDesc: "सच्छिद्र, आम्लयुक्त, बागायती पिकांसाठी योग्य" },
  bn: { blackSoil: "কালো মাটি", redSoil: "লাল মাটি", alluvialSoil: "পলি মাটি", lateriteSoil: "ল্যাটেরাইট মাটি", otherSoil: "অন্যান্য মাটি", blackSoilDesc: "উচ্চ আর্দ্রতা ধারণ ক্ষমতা, তুলা ও সয়াবিনের জন্য আদর্শ", redSoilDesc: "ভালো নিষ্কাশন ব্যবস্থা, ডাল ও দানাদার ফসলের জন্য উপযোগী", alluvialSoilDesc: "উর্বর পলিমাটি, গম ও ধানের জন্য অত্যন্ত উপযোগী", lateriteSoilDesc: "ছিদ্রযুক্ত ও অম্লীয়, বাগিচা ফসলের জন্য উপযুক্ত" },
  te: { blackSoil: "నల్లరేగడి నేల", redSoil: "ఎర్ర నేల", alluvialSoil: "ఒండ్రు నేల", lateriteSoil: "లాటరైట్ నేల", otherSoil: "ఇతర నేల", blackSoilDesc: "ఎక్కువ తేమను నిలుపుకునే గుణం, పత్తి మరియు సోయాబీన్‌కు అనుకూలం", redSoilDesc: "మంచి నీటి పారుదల, పప్పుదినుసులకు అనుకూలం", alluvialSoilDesc: "అత్యంత సారవంతమైనది, వరి మరియు గోధుమలకు శ్రేష్టం", lateriteSoilDesc: "ఆమ్ల గుణం కలది, తోట పంటలకు అనుకూలం" },
  ta: { blackSoil: "கரிசல் மண்", redSoil: "செம்மண்", alluvialSoil: "வண்டல் மண்", lateriteSoil: "சரளை மண்", otherSoil: "மற்ற மண்", blackSoilDesc: "அதிக ஈரப்பதம் தாங்கும் திறன், பருத்தி மற்றும் சோயாபீனுக்கு ஏற்றது", redSoilDesc: "நல்ல வடிகால் வசதி, பருப்பு வகைகளுக்கு ஏற்றது", alluvialSoilDesc: "வளமான மண், நெல் மற்றும் கோதுமைக்கு சிறந்தது", lateriteSoilDesc: "தோட்டப் பயிர்களுக்கு உகந்தது" },
  gu: { blackSoil: "કાળી માટી", redSoil: "રાતી માટી", alluvialSoil: "ગોરાડુ / કાંપવાળી માટી", lateriteSoil: "લેટેરાઇટ માટી", otherSoil: "અન્ય માટી", blackSoilDesc: "ભેજ સંગ્રહણ શક્તિ વધુ, કપાસ અને સોયાબીન માટે શ્રેષ્ઠ", redSoilDesc: "સારા નિકાલવાળી, કઠોળ પાકો માટે ઉત્તમ", alluvialSoilDesc: "ફળદ્રુપ કાંપ, ઘઉં અને ડાંગર માટે ઉત્તમ", lateriteSoilDesc: "બાગાયતી પાકો માટે અનુકૂળ" },
  kn: { blackSoil: "ಕಪ್ಪು ಮಣ್ಣು", redSoil: "ಕೆಂಪು ಮಣ್ಣು", alluvialSoil: "ಮೆಕ್ಕಲು ಮಣ್ಣು", lateriteSoil: "ಲ್ಯಾಟರೈಟ್ ಮಣ್ಣು", otherSoil: "ಇತರ ಮಣ್ಣು", blackSoilDesc: "ಹೆಚ್ಚು ತೇವಾಂಶ ಉಳಿಸಿಕೊಳ್ಳುವ ಸಾಮರ್ಥ್ಯ, ಹತ್ತಿ ಮತ್ತು ಸೋಯಾಬೀನ್‌ಗೆ ಉತ್ತಮ", redSoilDesc: "ಉತ್ತಮ ಒಳಚರಂಡಿ, ಬೇಳೆಕಾಳುಗಳಿಗೆ ಸೂಕ್ತ", alluvialSoilDesc: "ಫಲವತ್ತಾದ ಮಣ್ಣು, ಭತ್ತ ಮತ್ತು ಗೋಧಿಗೆ ಸೂಕ್ತ", lateriteSoilDesc: "ತೋಟಗಾರಿಕಾ ಬೆಳೆಗಳಿಗೆ ಸೂಕ್ತ" },
  ml: { blackSoil: "കറുത്ത മണ്ണ്", redSoil: "ചുവന്ന മണ്ണ്", alluvialSoil: "എക്കൽ മണ്ണ്", lateriteSoil: "ലാറ്ററൈറ്റ് മണ്ണ്", otherSoil: "മറ്റ് മണ്ണ്", blackSoilDesc: "കൂടിയ ഈർപ്പ സംഭരണ ശേഷി, പരുത്തിക്കും സോയാബീനും അനുയോജ്യം", redSoilDesc: "നല്ല നീർവാർച്ച, പയറുവർഗ്ഗങ്ങൾക്ക് അനുയോജ്യം", alluvialSoilDesc: "ഫലഭൂയിഷ്ഠമായ മണ്ണ്, നെല്ലിനും ഗോതമ്പിനും ഉത്തമം", lateriteSoilDesc: "തോട്ടവിളകൾക്ക് അനുയോജ്യം" },
  pa: { blackSoil: "ਕਾਲੀ ਮਿੱਟੀ", redSoil: "ਲਾਲ ਮਿੱਟੀ", alluvialSoil: "ਜਲੋੜ ਮਿੱਟੀ", lateriteSoil: "ਲੈਟਰਾਈਟ ਮਿੱਟੀ", otherSoil: "ਹੋਰ ਮਿੱਟੀ", blackSoilDesc: "ਨਮੀ ਸੰਭਾਲਣ ਦੀ ਉੱਚ ਸਮਰੱਥਾ, ਕਪਾਹ ਅਤੇ ਸੋਇਆਬੀਨ ਲਈ ਉੱਤਮ", redSoilDesc: "ਵਧੀਆ ਨਿਕਾਸ ਵਾਲੀ, ਦਾਲਾਂ ਲਈ ਢੁਕਵੀਂ", alluvialSoilDesc: "ਬਹੁਤ ਜ਼ਰਖੇਜ਼, ਕਣਕ ਅਤੇ ਝੋਨੇ ਲਈ ਉੱਤਮ", lateriteSoilDesc: "ਬਾਗਬਾਨੀ ਫਸਲਾਂ ਲਈ ਢੁਕਵੀਂ" },
  or: { blackSoil: "କଳା ମାଟି", redSoil: "ନାଲି ମାଟି", alluvialSoil: "ପଟୁ ମାଟି", lateriteSoil: "ଲାଟେରାଇଟ ମାଟି", otherSoil: "ଅନ୍ୟାନ୍ୟ ମାଟି", blackSoilDesc: "ଉଚ୍ଚ ଆର୍ଦ୍ରତା ଧାରଣ କ୍ଷମତା, କପା ଓ ସୋୟାବିନ ପାଇଁ ଉତ୍ତମ", redSoilDesc: "ଉତ୍ତମ ଜଳ ନିଷ୍କାସନ, ଡାଲି ଜାତୀୟ ଫସଲ ପାଇଁ ଉପଯୋଗୀ", alluvialSoilDesc: "ଅତ୍ୟନ୍ତ ଉର୍ବର, ଗହମ ଓ ଧାନ ପାଇଁ ଉତ୍କୃଷ୍ଟ", lateriteSoilDesc: "ବଗିଚା ଫସଲ ପାଇଁ ଅନୁକୂଳ" },
  as: { blackSoil: "কলা মাটি", redSoil: "ৰঙা মাটি", alluvialSoil: "পলসুৱা মাটি", lateriteSoil: "লেটেৰাইট মাটি", otherSoil: "অন্য মাটি", blackSoilDesc: "উচ্চ আৰ্দ্ৰতা ধাৰণ ক্ষমতা, কপাহ আৰু ছয়াবিনৰ বাবে উপযুক্ত", redSoilDesc: "উন্নত পানী নিষ্কাশন, দাইল শস্যৰ বাবে উপযোগী", alluvialSoilDesc: "অতি উৰ্বৰ পলসুৱা মাটি, ঘেঁহু আৰু ধানৰ বাবে উত্তম", lateriteSoilDesc: "বাগিচা শস্যৰ বাবে উপযোগী" },
  ur: { blackSoil: "کالی مٹی", redSoil: "سرخ مٹی", alluvialSoil: "زرخیز مٹی", lateriteSoil: "لیٹرائٹ مٹی", otherSoil: "دیگر مٹی", blackSoilDesc: "نمی برقرار رکھنے کی اعلی صلاحیت، کپاس اور سویا بین کے لیے بہترین", redSoilDesc: "بہترین نکاسی، دالوں کے لیے موزوں", alluvialSoilDesc: "انتہائی زرخیز، گندم اور چاول کے لیے بہترین", lateriteSoilDesc: "باغبانی فصلوں کے لیے موزوں" }
};

// Months in all languages
const monthTranslations = {
  hi: { all: "सभी महीने", January: "जनवरी", February: "फ़रवरी", March: "मार्च", April: "अप्रैल", May: "मई", June: "जून", July: "जुलाई", August: "अगस्त", September: "सितंबर", October: "अक्टूबर", November: "नवंबर", December: "दिसंबर" },
  mr: { all: "सर्व महिने", January: "जानेवारी", February: "फेब्रुवारी", March: "मार्च", April: "एप्रिल", May: "मे", June: "जून", July: "जुलै", August: "ऑगस्ट", September: "सप्टेंबर", October: "ऑक्टोबर", November: "नोव्हेंबर", December: "डिसेंबर" },
  bn: { all: "সব মাস", January: "জানুয়ারি", February: "ফেব্রুয়ারি", March: "মার্চ", April: "এপ্রিল", May: "মে", June: "জুন", July: "জুলাই", August: "আগস্ট", September: "সেপ্টেম্বর", October: "অক্টোবর", November: "নভেম্বর", December: "ডিসেম্বর" },
  te: { all: "అన్ని నెలలు", January: "జనవరి", February: "ఫిబ్రవరి", March: "మార్చి", April: "ఏప్రిల్", May: "మే", June: "జూన్", July: "జూలై", August: "ఆగస్టు", September: "సెప్టెంబరు", October: "అక్టోబరు", November: "నవంబరు", December: "డిసెంబరు" },
  ta: { all: "அனைத்து மாதங்கள்", January: "ஜனவரி", February: "பிப்ரவரி", March: "மார்ச்", April: "ஏப்ரல்", May: "மே", June: "ஜூன்", July: "ஜூலை", August: "ஆகஸ்ட்", September: "செப்டம்பர்", October: "அக்டோபர்", November: "நவம்பர்", December: "டிசம்பர்" },
  gu: { all: "બધા મહિના", January: "જાન્યુઆરી", February: "ફેબ્રુઆરી", March: "માર્ચ", April: "એપ્રિલ", May: "મે", June: "જૂન", July: "જુલાઇ", August: "ઓગસ્ટ", September: "સપ્ટેમ્બર", October: "ઓક્ટોબર", November: "નવેમ્બર", December: "ડિસેમ્બર" },
  kn: { all: "ಎಲ್ಲಾ ತಿಂಗಳುಗಳು", January: "ಜನವರಿ", February: "ಫೆಬ್ರವರಿ", March: "ಮಾರ್ಚ್", April: "ಏಪ್ರಿಲ್", May: "ಮೇ", June: "ಜೂನ್", July: "ಜುಲೈ", August: "ಆಗಸ್ಟ್", September: "ಸೆಪ್ಟೆಂಬರ್", October: "ಅಕ್ಟೋಬರ್", November: "ನವೆಂಬರ್", December: "ಡಿಸೆಂಬರ್" },
  ml: { all: "എല്ലാ മാസങ്ങളും", January: "ജനുവരി", February: "ഫെബ്രുവരി", March: "മാർച്ച്", April: "ഏപ്രിൽ", May: "മേയ്", June: "ജൂൺ", July: "ജൂലൈ", August: "ഓഗസ്റ്റ്", September: "സെപ്റ്റംബർ", October: "ഒക്ടോബർ", November: "നവംബർ", December: "ഡിസംബർ" },
  pa: { all: "ਸਾਰੇ ਮਹੀਨੇ", January: "ਜਨਵਰੀ", February: "ਫਰਵਰੀ", March: "ਮਾਰਚ", April: "ਅਪ੍ਰੈਲ", May: "ਮਈ", June: "ਜੂਨ", July: "ਜੁਲਾਈ", August: "ਅਗਸਤ", September: "ਸਤੰਬਰ", October: "ਅਕਤੂਬਰ", November: "ਨਵੰਬਰ", December: "ਦਸੰਬਰ" },
  or: { all: "ସମସ୍ତ ମାସ", January: "ଜାନୁଆରୀ", February: "ଫେବୃଆରୀ", March: "ମାର୍ଚ୍ଚ", April: "ଅପ୍ରେଲ", May: "ମେ", June: "ଜୁନ", July: "ଜୁଲାଇ", August: "ଅଗଷ୍ଟ", September: "ସେପ୍ଟେମ୍ବର", October: "ଅକ୍ଟୋବର", November: "ନଭେମ୍ବର", December: "ଡିସେମ୍ବର" },
  as: { all: "সকলো মাহ", January: "জানুৱাৰী", February: "ফেব্ৰুৱাৰী", March: "মাৰ্চ", April: "এপ্ৰিল", May: "মে'", June: "জুন", July: "জুলাই", August: "আগষ্ট", September: "ছেপ্টেম্বৰ", October: "অক্টোবৰ", November: "নৱেম্বৰ", December: "ডিচেম্বৰ" },
  ur: { all: "تمام مہینے", January: "جنوری", February: "فروری", March: "مارچ", April: "اپریل", May: "مئی", June: "جون", July: "جولائی", August: "اگست", September: "ستمبر", October: "اکتوبر", November: "نومبر", December: "دسمبر" }
};

// Common navigation and groups
const navTranslations = {
  hi: { home: "होम", dashboard: "किसान डैशबोर्ड", cropRecommendation: "फसल सिफारिश", diseaseDetection: "रोग पहचान", marketPrices: "मंडी बाजार भाव", pricePrediction: "एआई मूल्य पूर्वानुमान", marketComparison: "मंडी तुलना", yieldPrediction: "उपज अनुमान", irrigation: "स्मार्ट सिंचाई", farmCalendar: "फसल कैलेंडर", farmOperations: "कृषि कार्य व श्रम", cropSpacing: "फसल दूरी गाइड", farmProfile: "मेरा खेत प्रोफाइल", googleDrive: "ड्राइव लॉकर", settings: "सेटिंग्स", landing: "कृषिAI के बारे में", notifications: "कृषि सूचनाएं", productTour: "उत्पाद परिचय", enterDashboard: "डैशबोर्ड में जाएं" },
  mr: { home: "मुख्यपृष्ठ", dashboard: "शेतकरी डॅशबोर्ड", cropRecommendation: "पीक शिफारस", diseaseDetection: "रोग निदान", marketPrices: "बाजार भाव", pricePrediction: "एआय भाव अंदाज", marketComparison: "मार्केट तुलना", yieldPrediction: "उत्पादन अंदाज", irrigation: "स्मार्ट सिंचन", farmCalendar: "पीक दिनदर्शिका", farmOperations: "शेती कामे व मजूर", cropSpacing: "पीक अंतर मार्गदर्शक", farmProfile: "माझे शेत प्रोफाईल", googleDrive: "ड्राईव्ह लॉकर", settings: "सेटिंग्ज", landing: "कृषीAI विषयी", notifications: "शेती सूचना", productTour: "माहिती व वैशिष्ट्ये", enterDashboard: "शेतकरी डॅशबोर्ड" },
  bn: { home: "হোম", dashboard: "কৃষক ড্যাশবোর্ড", cropRecommendation: "ফসল সুপারিশ", diseaseDetection: "রোগ নির্ণয়", marketPrices: "বাজার দর", pricePrediction: "এআই দামের পূর্বাভাস", marketComparison: "বাজার তুলনা", yieldPrediction: "ফলন অনুমান", irrigation: "স্মার্ট সেচ", farmCalendar: "ফসল ক্যালেন্ডার", farmOperations: "কৃষি কাজ ও শ্রমিক", cropSpacing: "ফসল ব্যবধান নির্দেশিকা", farmProfile: "আমার খামার প্রোফাইল", googleDrive: "ড্রাইভ লকার", settings: "সেটিংস", landing: "কৃষিAI সম্পর্কে", notifications: "খামার বিজ্ঞপ্তি", productTour: "পণ্য পরিচিতি", enterDashboard: "ড্যাশবোর্ডে প্রবেশ করুন" },
  te: { home: "హోమ్", dashboard: "రైతు డ్యాష్‌బోర్డ్", cropRecommendation: "పంట సిఫార్సు", diseaseDetection: "తెగుళ్ళ గుర్తింపు", marketPrices: "మార్కెట్ ధరలు", pricePrediction: "ధరల ముందస్తు అంచనా", marketComparison: "మార్కెట్ల పోలిక", yieldPrediction: "దిగుబడి అంచనా", irrigation: "స్మార్ట్ నీటిపారుదల", farmCalendar: "పంట క్యాలెండర్", farmOperations: "వ్యవసాయ పనులు & కూలీలు", cropSpacing: "మొక్కల దూరం గైడ్", farmProfile: "నా వ్యవసాయ ప్రొఫైల్", googleDrive: "డ్రైవ్ లాకర్", settings: "సెట్టింగ్‌లు", landing: "కృషిAI గురించి", notifications: "వ్యవసాయ నోటిఫికేషన్‌లు", productTour: "ఉత్పత్తి పరిచయం", enterDashboard: "డ్యాష్‌బోర్డ్‌లోకి వెళ్లండి" },
  ta: { home: "முகப்பு", dashboard: "விவசாயி டாஷ்போர்டு", cropRecommendation: "பயிர் பரிந்துரை", diseaseDetection: "நோய் கண்டறிதல்", marketPrices: "சந்தை விலைகள்", pricePrediction: "விலை முன்னறிவிப்பு", marketComparison: "சந்தை ஒப்பீடு", yieldPrediction: "மகசூல் மதிப்பீடு", irrigation: "ஸ்மார்ட் பாசனம்", farmCalendar: "பயிர் காலண்டர்", farmOperations: "பண்ணை பணிகள் & தொழிலாளர்கள்", cropSpacing: "பயிர் இடைவெளி வழிகாட்டி", farmProfile: "என் பண்ணை விவரம்", googleDrive: "டிரைவ் லாக்கர்", settings: "அமைப்புகள்", landing: "கிருஷிAI பற்றி", notifications: "பண்ணை அறிவிப்புகள்", productTour: "பயணத்தை தொடங்கு", enterDashboard: "டாஷ்போர்டிற்கு செல்" },
  gu: { home: "હોમ", dashboard: "ખેડૂત ડેશબોર્ડ", cropRecommendation: "પાક ભલામણ", diseaseDetection: "રોગ નિદાન", marketPrices: "બજાર ભાવો", pricePrediction: "ભાવ અનુમાન", marketComparison: "બજારોની સરખામણી", yieldPrediction: "ઉત્પાદન અંદાજ", irrigation: "સ્માર્ટ સિંચાઈ", farmCalendar: "પાક કેલેન્ડર", farmOperations: "ખેતી કાર્યો અને મજૂર", cropSpacing: "પાક અંતર ગાઈડ", farmProfile: "મારી ખેતી પ્રોફાઇલ", googleDrive: "ડ્રાઇવ લોકર", settings: "સેટિંગ્સ", landing: "કૃષિAI વિશે", notifications: "ખેતી સૂચનાઓ", productTour: "ઉત્પાદન પરિચય", enterDashboard: "ડેશબોર્ડમાં જાઓ" },
  kn: { home: "ಮುಖಪುಟ", dashboard: "ರೈತ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್", cropRecommendation: "ಬೆಳೆ ಶಿಫಾರಸು", diseaseDetection: "ರೋಗ ಪತ್ತೆ", marketPrices: "ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳು", pricePrediction: "ಬೆಲೆ ಮುನ್ಸೂಚನೆ", marketComparison: "ಮಾರುಕಟ್ಟೆ ಹೋಲಿಕೆ", yieldPrediction: "ಇಳುವರಿ ಅಂದಾಜು", irrigation: "ಸ್ಮಾರ್ಟ್ ನೀರಾವರಿ", farmCalendar: "ಬೆಳೆ ಕ್ಯಾಲೆಂಡರ್", farmOperations: "ಕೃಷಿ ಕೆಲಸಗಳು & ಕಾರ್ಮಿಕರು", cropSpacing: "ಬೆಳೆ ಅಂತರ ಮಾರ್ಗದರ್ಶಿ", farmProfile: "ನನ್ನ ಜಮೀನು ಪ್ರೊಫೈಲ್", googleDrive: "ಡ್ರೈವ್ ಲಾಕರ್", settings: "ಸೆಟ್ಟಿಂಗ್‌ಗಳು", landing: "ಕೃಷಿAI ಬಗ್ಗೆ", notifications: "ಕೃಷಿ ಅಧಿಸೂಚನೆಗಳು", productTour: "ಉತ್ಪನ್ನ ಪರಿಚಯ", enterDashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ಪ್ರವೇಶಿಸಿ" },
  ml: { home: "ഹോം", dashboard: "കർഷക ഡാഷ്‌ബോർഡ്", cropRecommendation: "വിള ശുപാർശ", diseaseDetection: "രോഗനിർണയം", marketPrices: "വിപണി വിലകൾ", pricePrediction: "വില പ്രവചനം", marketComparison: "വിപണി താരതമ്യം", yieldPrediction: "വിളവ് കണക്കാക്കൽ", irrigation: "സ്മാർട്ട് ജലസേചനം", farmCalendar: "വിള കലണ്ടർ", farmOperations: "കൃഷിപ്പണികളും തൊഴിലാളികളും", cropSpacing: "വിള അകലം ഗൈഡ്", farmProfile: "എന്റെ ഫാം പ്രൊഫൈൽ", googleDrive: "ഡ്രൈവ് ലോക്കർ", settings: "ക്രമീകരണങ്ങൾ", landing: "കൃഷിAI കുറിച്ച്", notifications: "കൃഷി അറിയിപ്പുകൾ", productTour: "ഉൽപ്പന്ന പരിചയം", enterDashboard: "ഡാഷ്‌ബോർഡിലേക്ക് പോകുക" },
  pa: { home: "ਮੁੱਖ ਪੰਨਾ", dashboard: "ਕਿਸਾਨ ਡੈਸ਼ਬੋਰਡ", cropRecommendation: "ਫ਼ਸਲ ਸਿਫ਼ਾਰਸ਼", diseaseDetection: "ਬਿਮਾਰੀ ਦੀ ਪਛਾਣ", marketPrices: "ਮੰਡੀ ਦੇ ਭਾਅ", pricePrediction: "ਭਾਅ ਦਾ ਅਨੁਮਾਨ", marketComparison: "ਮੰਡੀਆਂ ਦੀ ਤੁਲਨਾ", yieldPrediction: "ਝਾੜ ਦਾ ਅੰਦਾਜ਼ਾ", irrigation: "ਸਮਾਰਟ ਸਿੰਚਾਈ", farmCalendar: "ਫ਼ਸਲੀ ਕੈਲੰਡਰ", farmOperations: "ਖੇਤੀ ਕੰਮ ਤੇ ਮਜ਼ਦੂਰ", cropSpacing: "ਫ਼ਸਲੀ ਵਿੱਥ ਗਾਈਡ", farmProfile: "ਮੇਰਾ ਖੇਤ ਪ੍ਰੋਫ਼ਾਈਲ", googleDrive: "ਡਰਾਈਵ ਲਾਕਰ", settings: "ਸੈਟਿੰਗਾਂ", landing: "ਕ੍ਰਿਸ਼ੀAI ਬਾਰੇ", notifications: "ਖੇਤੀ ਸੂਚਨਾਵਾਂ", productTour: "ਉਤਪਾਦ ਜਾਣ-ਪਛਾਣ", enterDashboard: "ਡੈਸ਼ਬੋਰਡ 'ਤੇ ਜਾਓ" },
  or: { home: "ମୁଖ୍ୟ ପୃଷ୍ଠା", dashboard: "କୃଷକ ଡ୍ୟାସବୋର୍ଡ", cropRecommendation: "ଫସଲ ସୁପାରିଶ", diseaseDetection: "ରୋଗ ଚିହ୍ନଟ", marketPrices: "ମଣ୍ଡି ବଜାର ଦର", pricePrediction: "ଦର ପୂର୍ବାନୁମାନ", marketComparison: "ମଣ୍ଡି ତୁଳନା", yieldPrediction: "ଅମଳ ଅନୁମାନ", irrigation: "ସ୍ମାର୍ଟ ଜଳସେଚନ", farmCalendar: "ଫସଲ କ୍ୟାଲେଣ୍ଡର", farmOperations: "କୃଷି କାର୍ଯ୍ୟ ଓ ଶ୍ରମିକ", cropSpacing: "ଫସଲ ବ୍ୟବଧାନ ଗାଇଡ", farmProfile: "ମୋ ଫାର୍ମ ପ୍ରୋଫାଇଲ", googleDrive: "ଡ୍ରାଇଭ ଲକର", settings: "ସେଟିଂସ", landing: "କୃଷିAI ବିଷୟରେ", notifications: "କୃଷି ସୂଚନା", productTour: "ଉତ୍ପାଦ ପରିଚୟ", enterDashboard: "ଡ୍ୟାସବୋର୍ଡକୁ ଯାଆନ୍ତୁ" },
  as: { home: "গৃহপৃষ্ঠা", dashboard: "কৃষক ডেচবৰ্ড", cropRecommendation: "শস্য পৰামৰ্শ", diseaseDetection: "ৰোগ চিনাক্তকৰণ", marketPrices: "বজাৰ মূল্য", pricePrediction: "মূল্যৰ পূৰ্বাভাস", marketComparison: "বজাৰ তুলনা", yieldPrediction: "উৎপাদন অনুমান", irrigation: "স্মাৰ্ট জলসিঞ্চন", farmCalendar: "শস্য পঞ্জী", farmOperations: "কৃষি কাম আৰু শ্ৰমিক", cropSpacing: "শস্যৰ দূৰত্ব নিৰ্দেশিকা", farmProfile: "মোৰ কৃষি প্ৰফাইল", googleDrive: "ড্ৰাইভ লকাৰ", settings: "ছেটিংছ", landing: "কৃষিAI বিষয়ে", notifications: "কৃষি জাননী", productTour: "পণ্যৰ পৰিচয়", enterDashboard: "ডেচবৰ্ডলৈ যাওক" },
  ur: { home: "ہوم", dashboard: "کسان ڈیش بورڈ", cropRecommendation: "فصل کی سفارش", diseaseDetection: "بیماری کی تشخیص", marketPrices: "منڈی کی قیمتیں", pricePrediction: "قیمت کی پیشگوئی", marketComparison: "منڈیوں کا موازنہ", yieldPrediction: "پیداوار کا تخمینہ", irrigation: "سمارٹ آبپاشی", farmCalendar: "فصل کیلنڈر", farmOperations: "کھیتی کے کام اور مزدور", cropSpacing: "فصل کے فاصلے کی گائیڈ", farmProfile: "میرا فارم پروفائل", googleDrive: "ڈرائيو لاكر", settings: "ترتیبات", landing: "کرشیAI کے بارے میں", notifications: "کھیتی کی اطلاعات", productTour: "پروڈکٹ کا تعارف", enterDashboard: "ڈیش بورڈ میں داخل ہوں" }
};

const languages = ['hi', 'mr', 'bn', 'te', 'ta', 'gu', 'kn', 'ml', 'pa', 'or', 'as', 'ur'];

for (const lang of languages) {
  const existingFile = path.join(localesDir, `${lang}.json`);
  let existing = {};
  if (fs.existsSync(existingFile)) {
    try {
      existing = JSON.parse(fs.readFileSync(existingFile, 'utf-8'));
    } catch (e) {}
  }

  // Deep clone en
  const target = JSON.parse(JSON.stringify(en));

  // Merge existing keys where present and non-empty
  const deepMerge = (base, source) => {
    for (const key of Object.keys(source)) {
      if (typeof source[key] === 'object' && source[key] !== null && !Array.isArray(source[key])) {
        if (!base[key]) base[key] = {};
        deepMerge(base[key], source[key]);
      } else if (source[key] && typeof source[key] === 'string' && source[key].trim() !== '') {
        base[key] = source[key];
      }
    }
  };

  deepMerge(target, existing);

  // Apply dedicated translations
  if (cropTranslations[lang]) {
    target.crops = { ...target.crops, ...cropTranslations[lang] };
  }
  if (soilTranslations[lang]) {
    target.soils = { ...target.soils, ...soilTranslations[lang] };
  }
  if (monthTranslations[lang]) {
    target.months = { ...target.months, ...monthTranslations[lang] };
  }
  if (navTranslations[lang]) {
    target.nav = { ...target.nav, ...navTranslations[lang] };
  }

  fs.writeFileSync(existingFile, JSON.stringify(target, null, 2), 'utf-8');
  console.log(`Updated ${lang}.json`);
}

console.log('All 12 translation files initialized with master schema');
