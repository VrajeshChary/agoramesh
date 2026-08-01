<div align="center">
  <!-- TODO: Insert Banner Image Here -->
  <img src="docs/assets/banner-placeholder.png" alt="AgoraMesh Banner" width="100%" />

  <h1>AgoraMesh</h1>
  <p><b>The Operating System for Autonomous AI</b></p>

  <p>
    <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License: MIT"></a>
    <img src="https://img.shields.io/badge/FastAPI-005571?style=flat&logo=fastapi" alt="FastAPI">
    <img src="https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB" alt="React">
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white" alt="TypeScript">
    <img src="https://img.shields.io/badge/Algorand-000000?style=flat&logo=algorand&logoColor=white" alt="Algorand">
    <img src="https://img.shields.io/badge/OpenRouter-18181B?style=flat" alt="OpenRouter">
    <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=flat&logo=supabase&logoColor=white" alt="Supabase">
    <img src="https://img.shields.io/badge/x402-Ready-FF4D4D?style=flat" alt="x402 Protocol">
  </p>
  
  <p>
    AgoraMesh is a decentralized AI marketplace where developers publish AI agents, and users pay only when they execute them.
  </p>
</div>

<br />

## 📖 Table of Contents
- [Problem Statement](#-problem-statement)
- [Solution](#-solution)
- [Features](#-features)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Screenshots](#-screenshots)
- [Installation](#-installation)
- [API Endpoints](#-api-endpoints)
- [Current Workflow](#-current-workflow)
- [Future Roadmap](#-future-roadmap)
- [Contributors](#-contributors)

---

## 🌩️ Problem Statement

The modern AI ecosystem is fundamentally broken:

- **Subscription Fatigue:** Users are forced into $20/month subscriptions across dozens of isolated platforms just to use a handful of models.
- **Centralized AI:** Large tech conglomerates control access, pricing, and availability of state-of-the-art intelligence.
- **Difficult Monetization:** Independent AI developers lack a standardized, frictionless way to monetize their custom agents and specialized models.
- **No Micropayments:** Traditional payment rails cannot handle fractions of a cent, making pay-per-inference models economically unviable.
- **Opaque Execution:** There is a severe lack of transparent execution logging and provable compute.

---

## 💡 Solution

**AgoraMesh** is a decentralized AI marketplace where developers publish AI agents and users pay only when they execute them. 

No subscriptions. No lock-ins. Just pure, composable intelligence on demand, powered by frictionless micropayments.

---

## ✨ Features

- ✅ **AI Marketplace:** Browse, search, and discover specialized AI agents across various domains.
- ✅ **Live Agent Discovery:** Instantly filter agents by category, trust score, and model architecture.
- ✅ **Agent Categories:** Finance, Vision, Research, Legal, Medical, Automation, Design, Code, and Document analysis.
- ✅ **Dynamic Pricing:** Real-time USDC pricing dynamically calculated per agent execution.
- ✅ **OpenRouter Integration:** Seamlessly route prompts to top-tier models (NVIDIA Nemotron).
- ✅ **FastAPI Backend:** A lightning-fast, asynchronous Python backend tailored for high-throughput inference.
- ✅ **Supabase Database:** Robust PostgreSQL relational data modeling for agents and execution histories.
- ✅ **Execution History:** Transparent, immutable logs of all past agent interactions and latencies.
- ✅ **Analytics Dashboard:** Beautiful telemetry providing macro-level insights into network volume and agent usage.
- ✅ **Pera Wallet Integration:** Frictionless Web3 onboarding using the official Pera Wallet Connect SDK.
- ✅ **HTTP 402 Payment Challenge:** Native implementation of the legendary `402 Payment Required` status code for pay-per-prompt gating.
- ✅ **x402-ready Architecture:** Built from the ground up to integrate the x402 decentralized payment verification protocol.
- ✅ **Premium React Dashboard:** A highly polished, glass-morphic, accessible React frontend.
- ✅ **Responsive UI:** Flawless experience across desktop, laptop, tablet, and mobile devices.

---

## 🏗️ Architecture

AgoraMesh utilizes a modern, decoupled architecture designed for scale and high-speed execution.

```mermaid
flowchart TD
    %% Global Styling
    classDef frontend fill:#61DAFB,stroke:#333,color:#000
    classDef backend fill:#009688,stroke:#333,color:#fff
    classDef db fill:#3ECF8E,stroke:#333,color:#000
    classDef llm fill:#18181B,stroke:#333,color:#fff
    classDef algo fill:#000000,stroke:#333,color:#fff
    classDef protocol fill:#FF4D4D,stroke:#333,color:#fff

    User([User]) --> UI
    
    subgraph Frontend Stack
        UI[React Frontend]:::frontend
    end
    
    subgraph Backend Services
        API[FastAPI Backend]:::backend
    end
    
    subgraph Data Layer
        DB[(Supabase)]:::db
    end

    subgraph AI Network
        OR[OpenRouter]:::llm
    end

    subgraph Settlement Layer
        ALGO[Algorand]:::algo
        X402{x402 Protocol}:::protocol
    end

    UI --> API
    API --> DB
    API --> OR
    API --> ALGO
    ALGO --> X402
```

---

## 🛠️ Tech Stack

<details>
<summary><b>Frontend</b></summary>
<ul>
  <li><b>React</b></li>
  <li><b>TypeScript</b></li>
  <li><b>Vite</b></li>
  <li><b>TailwindCSS</b></li>
  <li><b>Framer Motion</b></li>
</ul>
</details>

<details>
<summary><b>Backend</b></summary>
<ul>
  <li><b>FastAPI</b></li>
  <li><b>SQLAlchemy</b></li>
  <li><b>Alembic</b></li>
  <li><b>Supabase PostgreSQL</b></li>
</ul>
</details>

<details>
<summary><b>AI</b></summary>
<ul>
  <li><b>OpenRouter</b></li>
  <li><b>NVIDIA Nemotron</b></li>
</ul>
</details>

<details>
<summary><b>Blockchain</b></summary>
<ul>
  <li><b>Algorand</b></li>
  <li><b>Pera Wallet</b></li>
  <li><b>x402 Protocol</b></li>
</ul>
</details>

<details>
<summary><b>Deployment</b></summary>
<ul>
  <li><b>Vercel</b></li>
  <li><b>GitHub</b></li>
</ul>
</details>

---

## 📁 Project Structure

```text
agoramesh/
├── backend/               # FastAPI Application
│   ├── app/               # Application logic & routes
│   └── alembic/           # Database migrations
├── frontend/              # React Application
│   ├── src/               # React components, UI, & API logic
│   └── public/            # Static assets
└── x402-template/         # x402 Node template (Demo Server)
```

---

## 📸 Screenshots

> [!NOTE]  
> *The following are placeholders for project screenshots.*

<details>
<summary><b>1. Marketplace</b></summary>
<br>
<!-- TODO: Add Marketplace Screenshot Here -->
<img src="docs/assets/marketplace-placeholder.png" alt="Marketplace View" width="800"/>
<p><i>Discover and filter hundreds of specialized AI agents.</i></p>
</details>

<details>
<summary><b>2. Dashboard</b></summary>
<br>
<!-- TODO: Add Dashboard Screenshot Here -->
<img src="docs/assets/dashboard-placeholder.png" alt="Dashboard View" width="800"/>
<p><i>View real-time system telemetry and recent executions.</i></p>
</details>

<details>
<summary><b>3. Execution Terminal</b></summary>
<br>
<!-- TODO: Add Terminal Screenshot Here -->
<img src="docs/assets/terminal-placeholder.png" alt="Execution Terminal" width="800"/>
<p><i>A sleek, hacker-style terminal interface for interacting with agents.</i></p>
</details>

<details>
<summary><b>4. Payment Challenge (HTTP 402)</b></summary>
<br>
<!-- TODO: Add Payment Modal Screenshot Here -->
<img src="docs/assets/payment-placeholder.png" alt="HTTP 402 Challenge Modal" width="800"/>
<p><i>Seamless pay-per-prompt blockchain gating via HTTP 402.</i></p>
</details>

<details>
<summary><b>5. Analytics</b></summary>
<br>
<!-- TODO: Add Analytics Screenshot Here -->
<img src="docs/assets/analytics-placeholder.png" alt="Analytics View" width="800"/>
<p><i>Macro-level network insights and transaction volume tracking.</i></p>
</details>

<details>
<summary><b>6. Wallet Connection</b></summary>
<br>
<!-- TODO: Add Wallet Screenshot Here -->
<img src="docs/assets/wallet-placeholder.png" alt="Wallet Connection" width="800"/>
<p><i>Frictionless Pera Wallet integration and session persistence.</i></p>
</details>

---

## 🚀 Installation

Follow these steps to run the complete AgoraMesh stack locally.

### Frontend

```bash
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Backend

```bash
cd backend

# Create a virtual environment
python -m venv venv

# Activate the virtual environment
# On Windows: venv\Scripts\activate
# On macOS/Linux: source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run database migrations
python -m alembic upgrade head

# Start the FastAPI server
python -m uvicorn app.main:app --reload
```

---

## 🔐 Environment Variables

Ensure the following environment variables are securely configured in your `.env` files.

### Frontend

```env
VITE_API_URL=http://localhost:8000/api/v1
```

### Backend

```env
DATABASE_URL=postgresql://user:password@aws-0-us-west-1.pooler.supabase.com:6543/postgres
OPENROUTER_API_KEY=sk-or-v1-...
DEFAULT_MODEL=nvidia/nemotron-4-340b-instruct
AVM_ADDRESS=7IHB...TXKY
```

---

## 📡 API Endpoints

The backend provides a robust REST API for the frontend and third-party developers.

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/agents` | Retrieve a list of all available AI agents. |
| `POST` | `/agents` | Register a new AI agent on the marketplace. |
| `POST` | `/agents/{id}/execute` | Send a prompt to an agent. (May return `402 Payment Required`). |
| `GET` | `/executions` | Retrieve the global execution history logs. |
| `GET` | `/agents/{id}/executions`| Retrieve execution history for a specific agent. |
| `GET` | `/agents/{id}/price` | Fetch the dynamic execution cost for an agent. |

---

## 🔄 Current Workflow

Here is how a user interacts with the AgoraMesh ecosystem:

`Browse Marketplace` ⬇️

`Connect Wallet` ⬇️

`Initialize Execution` ⬇️

`HTTP 402 Challenge` ⬇️

`Payment` ⬇️

`AI Execution` ⬇️

`Execution History`

---

## 🗺️ Future Roadmap

- 🔐 Full x402 Verification
- ⚡ Smart Contract Settlement
- 🤝 Trust Engine
- ⭐️ Reputation System
- 📦 AI SDK
- 🏪 Developer Marketplace
- ⛓️ Multi-chain Support

---

## 👥 Contributors

<!-- TODO: Add contributor links/avatars here -->
- [**Vrajesh Chary**](https://github.com/VrajeshChary)

---

## 📄 License

This project is licensed under the **MIT** License.

<br />

<div align="center">
  <p><i>Building the future of decentralized AI, one execution at a time.</i></p>
</div>
