const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, '../src/locales');

// Load en, hi, mr
const en = JSON.parse(fs.readFileSync(path.join(localesDir, 'en.json'), 'utf-8'));
const hi = JSON.parse(fs.readFileSync(path.join(localesDir, 'hi.json'), 'utf-8'));
const mr = JSON.parse(fs.readFileSync(path.join(localesDir, 'mr.json'), 'utf-8'));

// Detailed landing & modules in Hindi
const hiAdditions = {
  landing: {
    featuresTitle: "10 बुद्धिमान कृषि निर्णय मॉड्यूल",
    featuresSubtitle: "विशेष रूप से भारतीय कृषि-जलवायु परिस्थितियों और छोटे किसान जोतों के लिए तैयार।",
    featCropTitle: "एआई फसल सिफारिश",
    featCropDesc: "मृदा एनपीके, पीएच और वर्षा विश्लेषण से सर्वोत्तम लाभ वाली फसल का चुनाव।",
    featDiseaseTitle: "पत्ती रोग पहचान",
    featDiseaseDesc: "तत्काल कंप्यूटर विजन रोग निदान और बिना रसायन के सुरक्षित आईपीएम प्रबंधन।",
    featPricesTitle: "एपीएमसी मंडी भाव",
    featPricesDesc: "प्रमुख मंडियों के दैनिक मॉडल भाव और आवक मात्रा का विस्तृत ब्यौरा।",
    featForecastTitle: "एआई मूल्य पूर्वानुमान",
    featForecastDesc: "फसल कटाई और बिक्री के सबसे लाभप्रद समय का मौसमी व मांग आधारित अनुमान।",
    featCompareTitle: "मंडी लाभ तुलना",
    featCompareDesc: "ट्रक भाड़ा घटाकर अपने हाथ में आने वाले वास्तविक शुद्ध लाभ की गणना।",
    featYieldTitle: "उपज अनुमान मॉडल",
    featYieldDesc: "मिट्टी के प्रकार और जल उपलब्धता के आधार पर प्रति हेक्टेयर उत्पादन का आकलन।",
    featIrrigationTitle: "स्मार्ट सिंचाई सलाह",
    featIrrigationDesc: "फसल जल आवश्यकता (ET0) अनुसार सिंचाई कर पानी व बिजली की बचत।",
    featCalendarTitle: "सक्रिय फसल कैलेंडर",
    featCalendarDesc: "खेत की तैयारी से लेकर कटाई तक माह-दर-माह कृषि कार्यों की समय-सारणी।",
    featOperationsTitle: "श्रम व कार्य योजना",
    featOperationsDesc: "प्रति हेक्टेयर आवश्यक मानव श्रम और ट्रैक्टर जुताई लागत का सटीक नियोजन।",
    featDriveTitle: "गूगल ड्राइव कृषि लॉकर",
    featDriveDesc: "खेत विवरण, मृदा परीक्षण रिपोर्ट और बिक्री रसीदों का सुरक्षित क्लाउड संचयन।",
    howTitle: "कृषि-एआई 4 चरणों में कैसे काम करता है",
    howSubtitle: "खेत में व्यस्त किसान भाइयों के लिए एक सरल और सहज प्रणाली।",
    howStep1Title: "1. अपना खेत विवरण दर्ज करें",
    howStep1Desc: "गांव, खेत का आकार, मुख्य मिट्टी का प्रकार और सिंचाई साधन चुनें।",
    howStep2Title: "2. खेत की जानकारी भरें",
    howStep2Desc: "मृदा जांच के आंकड़े डालें या मोबाइल कैमरे से रोगग्रस्त पत्ती की फोटो खींचें।",
    howStep3Title: "3. एआई विश्लेषण करता है",
    howStep3Desc: "कृषि निर्णय इंजन मौसम, मंडी आवक और फसल विज्ञान के आधार पर गणना करता है।",
    howStep4Title: "4. अमल करें और मुनाफा बढ़ाएं",
    howStep4Desc: "दैनिक प्राथमिक कार्य पूरे करें, सही मंडी में बेचें और रिकॉर्ड सुरक्षित रखें।",
    cropIntelTitle: "फसल बुद्धिमत्ता पूर्वावलोकन",
    cropIntelSubtitle: "लाइव फसल अनुकूलता स्कोर देखने के लिए नीचे दिए गए मिट्टी के मान बदलें।",
    demoNitrogenLabel: "नाइट्रोजन (N) किग्रा/हेक्टेयर",
    demoPhosphorusLabel: "फास्फोरस (P) किग्रा/हेक्टेयर",
    demoPotassiumLabel: "पोटाश (K) किग्रा/हेक्टेयर",
    suitabilityScoreLabel: "आकलित फसल अनुकूलता स्कोर",
    openFullEngine: "पूर्ण फसल सिफारिश इंजन खोलें →",
    diseasePreviewTitle: "कंप्यूटर विजन पत्ती रोग निदान पूर्वावलोकन",
    diseasePreviewSubtitle: "वास्तविक खेत के पत्तों पर हमारे रोग पहचान मॉडल का परीक्षण करें।",
    sampleTomatoBlight: "नमूना: टमाटर अगेती झुलसा",
    sampleHealthySoybean: "नमूना: स्वस्थ सोयाबीन",
    pathologyDiagnosis: "रोग निदान रिपोर्ट",
    testLeafSpecimen: "नमूना पत्ती जांचें",
    openFullDisease: "पूर्ण रोग निदान टूल खोलें →",
    marketPreviewTitle: "मंडी भाव व लाभ तुलना पूर्वावलोकन",
    marketPreviewSubtitle: "परिवहन भाड़ा काटने के बाद विभिन्न मंडियों से मिलने वाले शुद्ध लाभ की तुलना करें।",
    sellingQtyLabel: "बिक्री मात्रा",
    topRealizationMandi: "सर्वाधिक शुद्ध लाभ वाली मंडी",
    openFullMarket: "पूर्ण मंडी तुलना इंजन खोलें →",
    irrigationPreviewTitle: "सिंचाई बुद्धिमत्ता पूर्वावलोकन",
    irrigationPreviewSubtitle: "वास्तविक समय में मिट्टी की नमी और फसल वाष्पोत्सर्जन पर नजर रखें।",
    soilMoistureSlider: "जड़ क्षेत्र की नमी (%) सिमुलेट करें",
    irrigationRecommendation: "सिंचाई सलाह",
    openFullIrrigation: "पूर्ण स्मार्ट सिंचाई सलाहकार खोलें →",
    farmPlanningTitle: "संपूर्ण खेत नियोजन एवं संचालन",
    farmPlanningSubtitle: "वैज्ञानिक फसल दूरी, श्रम नियोजन और मौसमी समय-सारणी का पालन करें।",
    spacingGeometryTitle: "फसल दूरी एवं ज्यामिति",
    spacingGeometryDesc: "ट्रैक्टर जुताई और धूप के सही प्रवेश के लिए पंक्ति और पौधे की वैज्ञानिक दूरी।",
    labourPlanningTitle: "मानव श्रम का सटीक अनुमान",
    labourPlanningDesc: "बुवाई, निराई, छिड़काव और कटाई के लिए प्रति हेक्टेयर आवश्यक मानव दिवस।",
    seasonRoadmapTitle: "मौसमी कृषि समय-सारणी",
    seasonRoadmapDesc: "मानसून चक्र और फसल वृद्धि चरणों के अनुसार सुव्यवस्थित कार्य योजना।",
    openFarmPlanning: "खेत नियोजन टूल्स देखें →",
    multilingualTitle: "भारतीय किसानों के लिए 13 भाषाओं में पूर्ण सुविधा",
    multilingualSubtitle: "कृषि-एआई 13 भारतीय भाषाओं में स्थानीय कृषि शब्दावली के साथ उपलब्ध है।",
    whyTitle: "कृषि-एआई क्यों — पारंपरिक बनाम एआई-संचालित खेती",
    whySubtitle: "डेटा-आधारित आधुनिक खेती से किसान अपनी लागत कैसे घटाते हैं और मुनाफा बढ़ाते हैं।",
    traditionalFarming: "पारंपरिक खेती (अनुमान आधारित)",
    traditional1: "दुकानदारों या सुनी-सुनाई बातों पर निर्भर होकर अनावश्यक दवा छिड़कना",
    traditional2: "बिना भाड़ा जाने स्थानीय मंडी में सस्ते में माल बेचना",
    traditional3: "जरूरत न होने पर भी बोरवेल चलाकर पानी और बिजली बर्बाद करना",
    traditional4: "पूरे खेत में रोग फैल जाने के बाद बीमारी का पता चलना",
    traditional5: "कागजी रिकॉर्ड खो जाना, जिससे बैंक केसीसी ऋण मिलने में परेशानी",
    krushiAiFarming: "कृषि-एआई स्मार्ट खेती (डेटा आधारित)",
    krushi1: "मिट्टी के N-P-K और मौसम के सटीक मिलान से सही फसल का चुनाव",
    krushi2: "ट्रांसपोर्ट खर्च घटाकर सर्वाधिक शुद्ध मुनाफा देने वाली मंडी की पहचान",
    krushi3: "मिट्टी में पर्याप्त नमी रहने पर सिंचाई टालकर पानी व बिजली की बचत",
    krushi4: "मोबाइल से पत्ती स्कैन कर शुरुआती अवस्था में ही जैविक व सुरक्षित समाधान",
    krushi5: "गूगल ड्राइव में खेत की सभी रिपोर्ट व रसीदें सुरक्षित सहेजना",
    ctaHeading: "क्या आप अपने खेत के निर्णय स्मार्ट बनाने के लिए तैयार हैं?",
    ctaSubheading: "लाखों भारतीय किसानों की तरह कृषि-एआई से अपनी लागत घटाएं और मंडी में अधिकतम मुनाफा कमाएं।",
    ctaButton: "कृषि-एआई डैशबोर्ड शुरू करें"
  }
};

// Detailed landing & modules in Marathi
const mrAdditions = {
  landing: {
    featuresTitle: "१० प्रगत शेती निर्णय साधने",
    featuresSubtitle: "महाराष्ट्रातील व भारतातील हवामान आणि लहान शेतकऱ्यांच्या गरजांनुसार तयार केलेले व्यासपीठ.",
    featCropTitle: "एआय पीक शिफारस",
    featCropDesc: "मातीतील एनपीके, सामू (pH) आणि पावसाचा अंदाज घेऊन जास्तीत जास्त नफ्याचे पीक निवडा.",
    featDiseaseTitle: "पानावरील रोग निदान",
    featDiseaseDesc: "मोबाईल कॅमेऱ्याने रोगाचे त्वरित अचूक निदान आणि सुरक्षित, विना-रसायन सल्ला.",
    featPricesTitle: "थेट कृषी उत्पन्न बाजार भाव",
    featPricesDesc: "राज्यातील प्रमुख बाजार समित्यांचे आजचे कमाल, किमान व सरासरी भाव.",
    featForecastTitle: "एआय भाव अंदाज",
    featForecastDesc: "मागणी आणि हंगामी चक्राचा अभ्यास करून माल कधी विकावा याचा शास्त्रीय अंदाज.",
    featCompareTitle: "बाजार नफा तुलना",
    featCompareDesc: "गाडीभाडे वजा जाता प्रत्यक्ष हातात किती निव्वळ नफा पडेल याची अचूक तुलना.",
    featYieldTitle: "उत्पादन अंदाज मॉडेल",
    featYieldDesc: "मातीचा प्रकार आणि पाण्याच्या उपलब्धतेनुसार एकरी किती क्विंटल उत्पादन होईल ते तपासा.",
    featIrrigationTitle: "स्मार्ट सिंचन सल्ला",
    featIrrigationDesc: "मातीतील ओलावा तपासून विहीर वा बोअरवेलचे पाणी आणि वीज वाचवा.",
    featCalendarTitle: "सुलभ पीक दिनदर्शिका",
    featCalendarDesc: "मशागतीपासून काढणीपर्यंत दर आठवड्याला काय करावे याचे परिपूर्ण वेळापत्रक.",
    featOperationsTitle: "मजूर व काम नियोजन",
    featOperationsDesc: "खुरपणी, फवारणी व काढणीसाठी किती मजूर लागतील व ट्रॅक्टर खर्च किती होईल याचे नियोजन.",
    featDriveTitle: "गुगल ड्राईव्ह शेत लॉकर",
    featDriveDesc: "माती परीक्षण रिपोर्ट, सातबारा व बाजार पावत्या गुगल ड्राईव्हवर कायम सुरक्षित ठेवा.",
    howTitle: "कृषी-एआई कसे काम करते (४ सोप्या पायऱ्या)",
    howSubtitle: "शेतकऱ्यांसाठी अतिशय सोपी आणि बांधावर वापरता येणारी पद्धत.",
    howStep1Title: "१. शेताची माहिती भरा",
    howStep1Desc: "तुमचे गाव, शेताचे क्षेत्र, मातीचा प्रकार आणि सिंचनाची सोय निवडा.",
    howStep2Title: "२. पिकाची माहिती द्या",
    howStep2Desc: "मातीतील पोषणमूल्य भरा किंवा पानावरील रोगाचा फोटो मोबाईलवरून अपलोड करा.",
    howStep3Title: "३. एआय तपासणी करते",
    howStep3Desc: "आमचे मॉडेल हवामान, बाजार आवक आणि पिकाच्या शास्त्रानुसार सल्ले तयार करते.",
    howStep4Title: "४. योग्य कृती करा आणि नफा मिळवा",
    howStep4Desc: "दररोजची कामे वेळेवर पूर्ण करा, योग्य बाजारात विका आणि शेत समृद्ध करा.",
    cropIntelTitle: "पीक बुद्धिमत्ता थेट चाचणी",
    cropIntelSubtitle: "मातीतील घटकांचे प्रमाण बदलून पिकाचा अनुकूलता स्कोअर तपासा.",
    demoNitrogenLabel: "नत्र (N) किलो/हेक्टर",
    demoPhosphorusLabel: "स्फुरद (P) किलो/हेक्टर",
    demoPotassiumLabel: "पालाश (K) किलो/हेक्टर",
    suitabilityScoreLabel: "गणित केलेला पीक अनुकूलता स्कोअर",
    openFullEngine: "संपूर्ण पीक शिफारस साधन उघडा →",
    diseasePreviewTitle: "रोग निदान कॅमेरा थेट चाचणी",
    diseasePreviewSubtitle: "खऱ्या शेतातील नमुना पानांवर आमचे रोग निदान मॉडेल तपासा.",
    sampleTomatoBlight: "नमुना: टोमॅटो करपा रोग",
    sampleHealthySoybean: "नमुना: निरोगी सोयाबीन",
    pathologyDiagnosis: "रोग निदान अहवाल",
    testLeafSpecimen: "नमुना पान तपासा",
    openFullDisease: "संपूर्ण रोग निदान साधन उघडा →",
    marketPreviewTitle: "बाजार भाव व निव्वळ नफा तुलना",
    marketPreviewSubtitle: "वाहतूक खर्च वजा जाता कोणत्या बाजार समितीत जास्त नफा मिळेल ते पहा.",
    sellingQtyLabel: "विक्रीचे प्रमाण (क्विंटल)",
    topRealizationMandi: "सर्वाधिक निव्वळ नफा देणारी बाजार समिती",
    openFullMarket: "संपूर्ण बाजार तुलना साधन उघडा →",
    irrigationPreviewTitle: "सिंचन बुद्धिमत्ता थेट चाचणी",
    irrigationPreviewSubtitle: "मातीतील ओलावा आणि बाष्पीभवन थेट तपासा.",
    soilMoistureSlider: "मुळांमधील ओलावा (%) तपासा",
    irrigationRecommendation: "सिंचन शिफारस",
    openFullIrrigation: "संपूर्ण स्मार्ट सिंचन सल्लागार उघडा →",
    farmPlanningTitle: "परिपूर्ण शेती कामे व नियोजन",
    farmPlanningSubtitle: "शास्त्रीय पीक अंतर, मजूर नियोजन आणि हंगामी दिनदर्शिका.",
    spacingGeometryTitle: "पीक अंतर व रचना",
    spacingGeometryDesc: "कोळपणी, ट्रॅक्टर फिरवणे आणि पुरेसा सूर्यप्रकाश मिळण्यासाठी दोन रोपांतील योग्य अंतर.",
    labourPlanningTitle: "मानव मजुरांचे नियोजन",
    labourPlanningDesc: "पेरणी, निंदणी, फवारणी व काढणीसाठी एकरी किती मजूर लागतील याचा अंदाज.",
    seasonRoadmapTitle: "हंगामी कामांची रूपरेषा",
    seasonRoadmapDesc: "पावसाचे दिवस आणि पिकाच्या वाढीच्या टप्प्यानुसार कामांची मांडणी.",
    openFarmPlanning: "शेती नियोजन साधने पहा →",
    multilingualTitle: "सर्व भारतीय भाषांमध्ये अस्खलित समर्थन",
    multilingualSubtitle: "कृषी-एआय महाराष्ट्रातील शेतकऱ्यांसाठी मराठीसह १३ भारतीय भाषांमध्ये उपलब्ध आहे.",
    whyTitle: "कृषी-एआय का — जुनी पद्धत विरुद्ध आधुनिक स्मार्ट शेती",
    whySubtitle: "माहितीवर आधारित शेतीमुळे खर्च कसा वाचतो आणि नफा कसा वाढतो.",
    traditionalFarming: "जुनी पारंपरिक पद्धत (केवळ अंदाज)",
    traditional1: "दुकानदाराच्या सांगण्यावरून गरज नसताना महागडी कीटकनाशके फवारणे",
    traditional2: "वाहतूक भाड्याचा विचार न करता स्थानिक बाजारात कमी भावात माल विकणे",
    traditional3: "ओलावा असतानाही विहिरीचे पाणी सोडून वीज व पाणी वाया घालवणे",
    traditional4: "रोग संपूर्ण शेतात पसरल्यानंतरच उशिरा उपाय शोधणे",
    traditional5: "कागदपत्रे हरवल्यामुळे बँकेचे पिककर्ज मिळण्यात अडचणी येणे",
    krushiAiFarming: "कृषी-एआय आधुनिक शेती (डेटावर आधारित)",
    krushi1: "माती परीक्षण आणि हवामानानुसार जास्त भाव देणाऱ्या योग्य पिकाची निवड",
    krushi2: "गाडीभाडे वजा जाता प्रत्यक्ष जास्त पैसे देणारी बाजार समिती शोधणे",
    krushi3: "मातीत पुरेसा ओलावा असल्यास पाणी थांबवून वीज व पाण्याची बचत",
    krushi4: "मोबाईलवरून रोग ओळखणे आणि कमी खर्चात सुरक्षित उपाय योजना",
    krushi5: "सर्व शेत नोंदी, पावत्या व अहवाल गुगल ड्राईव्हवर कायमस्वरूपी सुरक्षित",
    ctaHeading: "शेतीतील निर्णय स्मार्ट बनवण्यासाठी तयार आहात?",
    ctaSubheading: "आजच कृषी-एआय सोबत जुडा, उत्पादन खर्च कमी करा आणि बाजार समितीत जास्तीत जास्त नफा मिळवा.",
    ctaButton: "शेतकरी डॅशबोर्ड सुरू करा"
  }
};

// Deep merge additions
function deepMerge(target, source) {
  for (const k of Object.keys(source)) {
    if (typeof source[k] === 'object' && source[k] !== null && !Array.isArray(source[k])) {
      if (!target[k]) target[k] = {};
      deepMerge(target[k], source[k]);
    } else {
      target[k] = source[k];
    }
  }
}

deepMerge(hi, hiAdditions);
deepMerge(mr, mrAdditions);

fs.writeFileSync(path.join(localesDir, 'hi.json'), JSON.stringify(hi, null, 2), 'utf-8');
fs.writeFileSync(path.join(localesDir, 'mr.json'), JSON.stringify(mr, null, 2), 'utf-8');
console.log('Successfully enriched hi.json and mr.json with comprehensive localized copy!');
