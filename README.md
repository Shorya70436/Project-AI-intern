<div align="center">

# 📈 Super Investing Intelligence
### AI Stock Research Agent for Indian Listed Equities (NSE/BSE)

*Turns a pack of messy, conflicting company documents into a cited, audit-ready research brief.*

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Express](https://img.shields.io/badge/Express-4-000000?logo=express)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white)
![Gemini](https://img.shields.io/badge/Google-Gemini_API-4285F4?logo=google&logoColor=white)

</div>

---

## 📌 Overview

Equity research from raw documents is error-prone: filings say one thing, news says another, similarly named companies get mixed up, and a single malicious line inside a document can try to hijack an LLM.

**Super Investing Intelligence** is a full-stack research agent that treats these as engineering problems. Before (and after) the LLM writes anything, a rule-based pipeline extracts evidence, resolves entities, flags contradictions, audits documents for prompt injection, and verifies every citation in the final brief.

The app ships with a preloaded **sample research pack** (SRV Cables & Telecommunications Ltd) so it can be demoed without any uploads.

## ✨ Key Features

| Feature | What it does |
|---|---|
| **Structured evidence extraction** | Pulls key figures and claims out of documents with source IDs (`[S1]`, `[S2]`…) |
| **Entity resolution** | Separates the listed company from similarly named entities, so a penalty on a local cable TV operator is not attributed to the listed firm |
| **Contradiction detection** | Surfaces conflicting numbers across sources (e.g. filing vs. news revenue) instead of silently merging them |
| **Prompt-injection audit** | Scans documents for embedded instructions (e.g. a fake "SYSTEM OVERRIDE" asking for a BUY rating) |
| **Source authority tiers** | Official filings > earnings transcripts > news > promotional content |
| **Citation verification** | Post-generation check that cited claims map back to the source pack |
| **Research brief** | Snapshot, Bull case, Bear case, Open questions, Sources |
| **Evaluation Lab** | Compares three prompt versions side by side on a scoring rubric |
| **Offline fallback** | Works without an API key, or if the Gemini call fails or times out (6s) |

## 🏗️ Architecture

```
 Documents (sample pack / custom)
            │
            ▼
 ┌──────────────────────────────┐
 │  Rule-based pre-processing   │  evidence extraction · entity resolution ·
 │      (src/agent/rules)       │  contradiction detection · injection audit
 └──────────────┬───────────────┘
                ▼
 ┌──────────────────────────────┐
 │  Gemini (server-side call)   │  hardened system prompt + prompt version A/B/C
 │   or offline heuristic engine│  (fallback on missing key / error / timeout)
 └──────────────┬───────────────┘
                ▼
 ┌──────────────────────────────┐
 │     Citation verification    │
 └──────────────┬───────────────┘
                ▼
     Research brief + metrics → React UI
```

### Prompt versions

| Version | Focus |
|---|---|
| **A: Baseline** | Evidence-focused summary with basic citations |
| **B: Contradiction-aware** | Numeric comparisons, period tracking, keeps unresolved discrepancies visible |
| **C: Hardened agent** *(default)* | Injection defense, entity disambiguation, source hierarchy, citation verification |

## 🧰 Tech Stack

- **Frontend:** React 19, Vite, Tailwind CSS 4, Motion, Lucide React
- **Backend:** Node.js, Express, `tsx`
- **AI:** Google Gemini via `@google/genai` (server-side only, the key never reaches the browser)
- **Language:** TypeScript
- **Template:** Generated from Google's [AI Studio repository template](https://github.com/google-gemini/aistudio-repository-template)

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Server status, Gemini configuration, supported models, cost estimates |
| `GET` | `/api/sample-pack` | Preloaded sample documents and a count by authority tier |
| `POST` | `/api/research/run` | Runs the full research pipeline (optional body: `companyName`, `ticker`, `documents`, `promptVersion`, `model`) |
| `POST` | `/api/research/evaluate` | Runs Evaluation Lab (prompt versions A, B and C) |

## 🚀 Getting Started

### Prerequisites
- Node.js 20+ and npm
- A [Gemini API key](https://aistudio.google.com/apikey) *(optional, the app runs in offline mode without it)*

### Installation

```bash
git clone https://github.com/Shorya70436/Project-AI-intern.git
cd Project-AI-intern
npm install
```

### Configure environment

```bash
cp .env.example .env
```

```env
GEMINI_API_KEY="your_api_key_here"
APP_URL="http://localhost:3000"
```

> If `GEMINI_API_KEY` is missing or left as a placeholder, the server logs *"Using Offline Heuristic Engine"* and still works.

### Run

```bash
npm run dev        # development (Express + Vite middleware) → http://localhost:3000
npm run build      # production build
npm start          # serve the app
npm run lint       # type-check
```

## 📁 Project Structure

```
Project-AI-intern/
├── src/
│   ├── agent/
│   │   ├── prompts.ts        # system instruction + prompt versions A/B/C
│   │   └── rules.ts          # evidence, entities, contradictions, injection, citations, scoring
│   ├── data/
│   │   └── samplePack.ts     # sample documents + company info
│   ├── types/
│   │   └── research.ts       # shared TypeScript types
│   └── ...                   # React UI
├── server.ts                 # Express server + API routes + Vite middleware
├── index.html
├── vite.config.ts
├── tsconfig.json
├── metadata.json
├── .env.example
└── package.json
```

## ⚠️ Known Limitations

Being upfront about what this prototype does and doesn't do:

- **Evaluation Lab runs on the offline engine.** Its scores, latency and token/cost figures are generated from the deterministic engine and fixed values, not measured live Gemini runs.
- **Cost and latency numbers are estimates**, not billed usage.
- **Gemini path:** the model's markdown is used as the brief body, but the snapshot, bull/bear points and open questions shown alongside it are still pre-filled from the sample pack.
- Only the bundled sample pack is fully supported. Custom documents run through the same pipeline but are not yet tuned.
- Model IDs are set in `server.ts`; confirm they are available to your API key before relying on them.
- **Not financial advice.** Output is for research and demonstration only.

## 🗺️ Roadmap

- [ ] Live (non-simulated) Evaluation Lab runs against the Gemini API
- [ ] Generate the brief's snapshot and bull/bear sections from the model output
- [ ] Upload your own filings (PDF/CSV)
- [ ] Export brief as PDF
- [ ] More companies and live NSE/BSE data sources

## 👤 Author

**Shorya**
B.E. CSE (AI & ML), Chandigarh University
GitHub: [@Shorya70436](https://github.com/Shorya70436)

---

<div align="center">
⭐ If you found this useful, consider starring the repo.
</div>
