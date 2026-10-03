# KRUSHIAI (कृषीAI)

> **Tagline:** AI-Powered Smart Agriculture Decision Support System  
> **Secondary Tagline:** From Soil to Market — Intelligent Farming Assistance

---

## ⚠️ Prototype & Academic Demonstration Notice

**IMPORTANT:** This web application is currently a **FUNCTIONAL PROTOTYPE** developed for an engineering and agricultural decision support demonstration.

* Predictions, suitability scores, disease detections, yield figures, and APMC market prices displayed in this application are **demonstration models and simulated datasets**.
* They must **NOT** be treated as certified agricultural diagnoses, binding price quotes, or pesticide recommendations.
* Every prediction view prominently denotes **“Prototype / Demo Prediction”** or **“Demo Data”**.
* Before field application of fertilizers, pest treatments, or commercial crop sales, farmers must consult their local **Krishi Vigyan Kendra (KVK)** or state agricultural university extension officer.

---

## 1. Project Overview & Problem Statement

Indian agriculture supports over 58% of rural livelihoods, yet smallholder farmers face severe informational asymmetry across three critical stages:

1. **Pre-Sowing Uncertainty:** Selecting crops without objective soil chemistry (NPK, pH), local water balance, and seasonal weather alignment.
2. **Crop Lifecycle Management:** Late detection of fungal or bacterial foliar diseases, imprecise irrigation timing leading to over/under-watering, and suboptimal labour deployment.
3. **Post-Harvest Distress Selling:** Lack of transparent mandi price forecasting and inability to evaluate transport logistics freight vs. APMC market realizations.

**KrushiAI** addresses these challenges through a unified decision support system connecting **Soil to Market**.

---

## 2. Key Objectives & Question Answering

The KrushiAI architecture is engineered to guide farmers through 15 fundamental field decisions:

1. **Which crop should I grow?** → AI Crop Recommendation matching soil N-P-K, pH, rainfall, and season.
2. **What price can I expect for my crop?** → Multi-horizon price forecasting (7, 15, 30 days) with uncertainty bands.
3. **Which market provides better estimated net realization?** → Net Revenue Realization Calculator subtracting freight from mandi rates.
4. **What is today's market price?** → Comprehensive Maharashtra APMC mandi board with search and filter capabilities.
5. **Which crop should I plant in which month?** → Dynamic month-by-month agricultural planning calendar.
6. **What crop disease is visible in my crop photo?** → Computer Vision foliar disease diagnostic portal.
7. **What disease-management action should I consider?** → Integrated Pest Management (IPM) guidelines with strict pesticide safety protocols.
8. **How much water does the crop need?** → Crop water requirements classified by low, medium, and high demand.
9. **When should irrigation be considered?** → Root-zone soil moisture gauge and critical physiological stage alerts.
10. **What farming operations are required?** → Sequential field workflow from land prep to curing and marketing.
11. **What spacing should be used?** → Standardized row and intra-plant geometry specs.
12. **What tillage information is relevant?** → Deep summer ploughing and harrowing guidelines.
13. **How much labour may be required?** → Interactive labour estimator based on holding size and mechanization level.
14. **How much yield can I expect per hectare?** → Agronomic yield estimation with positive drivers and limiting constraints.
15. **When should I monitor market conditions for selling?** → Seasonality indicators and price slope notifications.

---

## 3. Application Architecture

```
                          ┌─────────────────────────────────────┐
                          │         KrushiAI Frontend           │
                          │   (React 19 + TypeScript + Vite)    │
                          └──────────────────┬──────────────────┘
                                             │
                       ┌─────────────────────┴─────────────────────┐
                       ▼                                           ▼
          ┌─────────────────────────┐                 ┌─────────────────────────┐
          │     Service Layer       │                 │   Context & Storage     │
          │ (Modular API contracts) │                 │  (Theme, Lang, Profile) │
          └────────────┬────────────┘                 └─────────────────────────┘
                       │
         ┌─────────────┴───────────────────────────────────────────┐
         │ (Simulated Local Mode in Prototype / Direct FastAPI in Prod)
         ▼                                                         ▼
┌─────────────────────────────────┐               ┌─────────────────────────────────┐
│       Future ML Backend         │               │     Live Government APIs        │
│        (Python FastAPI)         │               │                                 │
├─────────────────────────────────┤               ├─────────────────────────────────┤
│ • Random Forest / XGBoost       │               │ • Agmarknet / eNAM Mandi Portal │
│   (Crop Recommendation)         │               │ • IMD Weather / Open-Meteo      │
│ • MobileNetV3 / EfficientNet    │               │ • PM-Kisan & 7/12 Land Registry │
│   (Disease Detection CNN)       │               │ • LoRaWAN / MQTT IoT Sensors    │
│ • Bi-LSTM / GRU                 │               └─────────────────────────────────┘
│   (Price Time-Series Forecast)  │
│ • XGBoost Regressor             │
│   (Yield Prediction Model)      │
└─────────────────────────────────┘
```

---

## 4. Technology Stack

* **Frontend:** React 19, TypeScript, Vite, Tailwind CSS v4, Lucide React icons, Recharts
* **Google Workspace Integration:** Google Drive v3 REST API, Firebase Auth with Google OAuth 2.0 popup flow, in-memory token security (no access tokens in localStorage)
* **State & Persistence:** React Context API, LocalStorage with Supabase schema readiness
* **Styling & Design System:** Tailored agricultural green and neutral palette following anti-AI slop principles, zero-pill metadata discipline, and WCAG AA contrast standards.
* **Target Backend (Production Roadmap):** Python 3.11, FastAPI, PyTorch, Scikit-learn, XGBoost, Drizzle ORM / PostgreSQL.

---

### Google Drive Farm Locker Features
- **Auto-Provisioned Folder:** Creates and manages files in a dedicated `KrushiAI Farm Records` folder in the user's Drive.
- **Farm Decision Dossier Export:** Backs up complete agronomic profiles, crop recommendations, and soil test indices as Markdown reports.
- **APMC Mandi Rate CSV Export:** Generates daily arrival and modal price comparison spreadsheets in Google Drive.
- **Custom Document Upload:** Upload soil health cards, land registry documents, and leaf disease photographs.
- **Security & User Confirmation:** Strictly prompts explicit user confirmation before executing any destructive operations (e.g. file deletion). Access tokens are cached in memory only.

---

## 5. Machine Learning Models & API Specification

| Module | Planned ML/DL Architecture | Target Endpoint | Training Datasets |
| :--- | :--- | :--- | :--- |
| **Crop Recommendation** | Random Forest / XGBoost Classifier | `POST /api/crop-recommendation` | ICAR & Kaggle Crop Recommendation Datasets (2,200+ samples) |
| **Disease Detection** | MobileNetV3 / ResNet-50 Transfer Learning | `POST /api/disease-detection` | PlantVillage & Field Pathology Datasets (54,000+ images) |
| **Price Forecasting** | Stacked Bi-LSTM + XGBoost | `POST /api/price-prediction` | Agmarknet 10-year historical daily mandi arrival logs |
| **Yield Prediction** | Multi-Layer Perceptron / XGBoost | `POST /api/yield-prediction` | ICRISAT district-level crop yield time-series |
| **Smart Irrigation** | Penman-Monteith ET0 + Sensor Relays | `POST /api/irrigation` | Soil moisture tension curve & IMD evapotranspiration data |

---

## 6. Supported Languages & Regions

* **Primary Focus:** Maharashtra, India (Districts: Pune, Nashik, Jalna, Ahmednagar, Solapur, Nagpur, Kolhapur, Sangli)
* **Supported Crops:** Soybean, Cotton, Wheat, Onion, Tomato, Chickpea, Sorghum, Rice, Sugarcane, Maize
* **Linguistic Support:** English, मराठी (Marathi), हिंदी (Hindi)

---

## 7. Getting Started & Development

### Prerequisites
* Node.js $\ge$ 18.0.0
* npm $\ge$ 9.0.0

### Installation
```bash
# Clone the repository
git clone https://github.com/example/krushiai.git
cd krushiai

# Install dependencies
npm install

# Start local development server
npm run dev
```

Visit `http://localhost:3000` in your web browser.

---

## 8. Safety & Agronomic Disclaimer

* KrushiAI does **not** generate speculative or unauthorized chemical dosages.
* All pesticide and fungicide mentions enforce: *“Follow registered product label instructions and consult a local agricultural expert before applying any pesticide.”*
* Tillage depths, chemical seed treatments, and mechanical calibrations indicate: *“Reference data required”* when not officially verified for specific micro-regions.
