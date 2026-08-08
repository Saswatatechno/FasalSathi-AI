# 🌾 FasalSathi AI

**AI-powered agricultural decision-support platform for farmers.**

FasalSathi AI brings crop health analysis, crop recommendation, irrigation and fertilizer guidance, and market-price comparison into one farmer-friendly web application.

Built as a **24-hour hackathon MVP**, the project prioritizes working features, transparent logic, reliable data, and simple usability over unnecessary complexity.

---

## 🚀 Core Features

### 🌿 1. Crop Disease & Pest Detection
- Upload a crop/leaf image.
- Analyze the image using the existing AI-powered disease detection service.
- Return an understandable diagnosis/advisory result.

### 🌱 2. Crop Recommendation
- Uses agricultural/environmental inputs to recommend a suitable crop.
- Keeps the recommendation workflow simple and practical for farmers.

### 💧 3. Irrigation & Fertilizer Advisory
- Provides irrigation guidance from crop, soil moisture, temperature, rainfall probability, and growth-stage information.
- Provides nitrogen (N), phosphorus (P), and potassium (K) advisory.
- Uses transparent rule-based logic rather than requiring another ML model.
- Returns explanations for the generated recommendations.

### 📈 4. Market Price Comparison
- Select a crop and retrieve current mandi records.
- Uses the Government of India's **data.gov.in / AGMARKNET** market-price dataset when configured.
- Displays market, location, modal price, minimum price, maximum price, variety, grade, and arrival date.
- Identifies the highest available modal price among returned markets.
- Clearly identifies the data source and does not fabricate live market prices.

---

## 🏗️ Architecture

```text
                    ┌──────────────────────────┐
                    │      React Frontend      │
                    │                          │
                    │ Disease Detection        │
                    │ Crop Recommendation     │
                    │ Irrigation Planner       │
                    │ Market Insights          │
                    └────────────┬─────────────┘
                                 │
                              REST API
                                 │
                                 ▼
                    ┌──────────────────────────┐
                    │     FastAPI Backend      │
                    │                          │
                    │ Routes / Schemas         │
                    │ Services / Validation    │
                    └────────────┬─────────────┘
                                 │
                 ┌───────────────┴───────────────┐
                 ▼                               ▼
        AI / Advisory Services          data.gov.in API
                                                 │
                                                 ▼
                                       AGMARKNET Mandi Data
```

The frontend handles user interaction and presentation. Recommendation and market-data logic remain in the backend.

---

## 🛠️ Tech Stack

### Frontend
- React
- Vite
- JavaScript / JSX
- Tailwind CSS
- Fetch API

### Backend
- Python
- FastAPI
- Pydantic
- Uvicorn
- HTTPX

### External Services
- Google Gemini API — AI-powered functionality
- Government of India `data.gov.in / AGMARKNET` — mandi market prices

---

## 📁 Project Structure

```text
FasalSathi-AI/
│
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── routes/
│   │   │   ├── disease.py
│   │   │   ├── crop.py
│   │   │   ├── irrigation.py
│   │   │   └── market.py
│   │   ├── services/
│   │   │   ├── disease_service.py
│   │   │   ├── crop_service.py
│   │   │   ├── irrigation_service.py
│   │   │   └── market_service.py
│   │   └── schemas/
│   │       ├── disease_schema.py
│   │       ├── crop_schema.py
│   │       ├── irrigation_schema.py
│   │       └── market_schema.py
│   ├── .env
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   └── package.json
│
├── PROJECT_CONTEXT.md
├── AGENT_RULES.md
├── DEVELOPMENT_PLAN.md
├── API_CONTRACT.md
└── README.md
```

---

# ⚙️ Setup

## Prerequisites

Install:

- Python 3.11+
- Node.js 18+
- npm
- Git

## 1. Clone

```bash
git clone https://github.com/Saswatatechno/FasalSathi-AI.git
cd FasalSathi-AI
```

## 2. Backend

```powershell
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

Create `backend/.env`:

```env
GEMINI_API_KEY=your_gemini_api_key
DATA_GOV_API_KEY=your_data_gov_api_key
```

**Never commit `.env` or expose API keys in the frontend.**

Start FastAPI:

```powershell
uvicorn app.main:app --reload
```

Backend:

```text
http://127.0.0.1:8000
```

Swagger:

```text
http://127.0.0.1:8000/docs
```

## 3. Frontend

Open a second terminal:

```powershell
cd frontend
npm install
npm run dev
```

Vite normally runs at:

```text
http://localhost:5173
```

---

# 🔌 API Overview

## Disease Detection

```text
POST /api/disease/...
```

See Swagger for the exact request schema in the current version.

## Crop Recommendation

```text
POST /api/crop/...
```

See Swagger for the exact request schema in the current version.

## Irrigation & Fertilizer Advisory

```text
POST /api/irrigation/recommend
```

Example:

```json
{
  "crop": "Rice",
  "soil_moisture": 30,
  "temperature": 32,
  "rainfall_probability": 20,
  "growth_stage": "Vegetative",
  "nitrogen": 50,
  "phosphorus": 30,
  "potassium": 40
}
```

## Market Price Comparison

```text
GET /api/market/prices?crop=rice
```

Optional location:

```text
GET /api/market/prices?crop=rice&location=West%20Bengal
```

The normalized market response contains fields such as:

```json
{
  "success": true,
  "crop": "tomato",
  "markets": [
    {
      "market": "Gunpur APMC",
      "location": "Rayagada, Odisha",
      "price": 3300,
      "unit": "quintal",
      "min_price": 3000,
      "max_price": 4300,
      "arrival_date": "08/08/2026",
      "variety": "Deshi",
      "grade": "FAQ",
      "source": "data.gov.in / AGMARKNET"
    }
  ],
  "best_market": {
    "market": "Gunpur APMC",
    "location": "Rayagada, Odisha",
    "price": 3300,
    "unit": "quintal",
    "min_price": 3000,
    "max_price": 4300,
    "arrival_date": "08/08/2026",
    "variety": "Deshi",
    "grade": "FAQ",
    "source": "data.gov.in / AGMARKNET"
  },
  "source": "data.gov.in / AGMARKNET"
}
```

---

# 📊 Market Price Data

Market prices are obtained from the Government of India's open agricultural market data through **data.gov.in / AGMARKNET**.

The source provides information including:

- State
- District
- Market / Mandi
- Commodity
- Variety
- Grade
- Arrival date
- Minimum price
- Maximum price
- Modal price

FasalSathi uses the **modal price** as the primary comparable price and identifies the market with the highest returned modal price.

Prices are represented as:

```text
₹ / quintal
```

Market prices are time-sensitive and can vary by commodity, variety, grade, location, and arrival date.

---

# 🧪 Testing

Start the backend:

```powershell
uvicorn app.main:app --reload
```

Open Swagger:

```text
http://127.0.0.1:8000/docs
```

Test the APIs independently before testing the full frontend workflow.

For Market Insights, test crops such as:

```text
rice
tomato
wheat
```

Then test optional location filtering.

For the complete application, verify:

- Disease Detection
- Crop Recommendation
- Irrigation Planner
- Market Insights
- Loading states
- Empty states
- API/network errors

---

# 🔐 Security

Keep API keys on the backend.

Do not put these secrets into client-side React/Vite configuration:

```text
GEMINI_API_KEY
DATA_GOV_API_KEY
```

Use:

```text
backend/.env
```

and ensure `.env` is listed in `.gitignore`.

If an API key is accidentally exposed, revoke it and generate a replacement.

---

# 🎯 Hackathon Principles

The project follows:

```text
Working Feature
      ↓
Reliable Logic
      ↓
Correct Data
      ↓
Explainability
      ↓
Farmer-Friendly UI
      ↓
Advanced Features
```

The MVP intentionally avoids unnecessary ML models or infrastructure where a transparent rule-based approach or reliable external data source is sufficient.

---

# ⚠️ Agricultural Decision-Support Disclaimer

FasalSathi AI is a **decision-support tool**, not a guarantee of agricultural outcomes.

Irrigation and fertilizer recommendations should be considered alongside local conditions, soil-test results, crop requirements, weather information, and advice from qualified agricultural professionals.

Market prices are time-sensitive and may differ between markets, varieties, grades, dates, and actual transactions.

---

# 🏆 Project Status

| Feature | Status |
|---|---|
| Crop Disease / Pest Detection | ✅ Completed |
| Crop Recommendation | ✅ Completed |
| Irrigation & Fertilizer Advisory | ✅ Completed |
| Market Price Comparison | ✅ Completed |

**All four planned core MVP features are implemented.**

---

# 📄 Project Documentation

- `PROJECT_CONTEXT.md` — overall project context and scope
- `AGENT_RULES.md` — development rules
- `DEVELOPMENT_PLAN.md` — feature development plan
- `API_CONTRACT.md` — backend API contracts
- `README.md` — setup and project overview

---

## 👨‍💻 Built for a 24-Hour Hackathon

FasalSathi AI was developed as a rapid hackathon MVP focused on practical agricultural assistance, explainability, real market data, and a simple farmer-friendly experience.

---

## 📜 License

Add the project's chosen license here before public distribution.
