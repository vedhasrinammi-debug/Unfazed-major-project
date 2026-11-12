# UNFAZED – Therapist Practice Management Platform
> **College Major Project** | Full-Stack Healthcare SaaS Application  
> Built with **React.js (Vite)**, **Node.js (Express.js)**, **MongoDB / Mongoose**, and **Tailwind CSS**.

---

## 🌟 Executive Summary & Motivation
Mental health clinicians, licensed clinical psychologists, and counseling practices spend over 35% of their working hours on administrative friction: navigating fragmented appointment tools, manually writing and securing clinical records, calculating copays, and juggling video links.

**UNFAZED** is an all-in-one clinical operating system engineered specifically for mental health professionals. It streamlines the full patient lifecycle:
1. **Intelligent Client CRM**: Comprehensive demographic records, diagnostic classifications (DSM-5 / ICD-10), emergency contacts, and personalized treatment goals.
2. **Interactive Clinical Scheduling & Telehealth**: High-definition, encrypted video consultation rooms with real-time in-call clinical scratchpads and meeting link generation.
3. **Dual-Channel SOAP Notes (Subjective, Objective, Assessment, Plan)**: Groundbreaking privacy controls allowing therapists to maintain confidential diagnostic evaluations while distilling supportive homework and coping mechanisms into client-shared summaries.
4. **Billing, Invoicing & Superbills**: Automated receipt generation, CPT 90837 tracking, Stripe payment simulation, insurance copays, and printable superbills.
5. **HIPAA-Compliant Asynchronous Chat**: Secure two-way clinician-to-client messaging with evidence-based canned clinical tools and response simulation.
6. **Tiered Subscription Plans**: Free Starter ($0), Pro Clinician ($49/mo), and Practice Premium ($99/mo) with instant in-app upgrade simulation.
7. **Practice Analytics & Insights**: Interactive visual charts powered by Recharts tracking monthly gross revenue, session attendance adherence, client diagnostic distribution, and caseload growth.

---

## 🎨 Healthcare SaaS Design System
- **Color Palette**: Premium clinical lavender and royal purple accents (`#7C3AED`, `#8B5CF6`, `#EDE9FE`, `#FAF9FF`) paired with clean white surface cards and high-contrast slate typography.
- **Micro-Interactions**: Subtle elevation shadows, smooth state transitions, animated status pulses, and glassmorphic toast notifications.
- **Responsive Layout**: Fluid desktop sidebar with collapsible mobile drawer, sticky page headers, and quick-action shortcuts.

---

## 🛠️ Technology Stack

| Layer | Technologies Used |
| :--- | :--- |
| **Frontend** | React.js 19, Vite, Tailwind CSS, Lucide Icons, Recharts |
| **Backend** | Node.js, Express.js, JWT (JSON Web Tokens), Bcrypt.js, CORS |
| **Database** | MongoDB & Mongoose (with automated fallback to In-Memory Resilient Store for 100% zero-configuration evaluation) |
| **Security** | Role-based authorization, Bcrypt password hashing, Bearer JWT middleware, sanitized API schemas |

---

## 📂 Project Architecture

```
UNFAZED-Major-Project/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection with resilient store fallback
│   ├── controllers/
│   │   ├── authController.js       # Register, login, 1-click demo login, profile
│   │   ├── clientController.js     # Client CRM, diagnostic conditions, treatment goals
│   │   ├── appointmentController.js# Calendar booking, status, telehealth links
│   │   ├── noteController.js       # SOAP notes, privacy toggle (private vs shared)
│   │   ├── paymentController.js    # Invoices, billing summary, superbills
│   │   ├── messageController.js    # Secure chat threads & simulated client replies
│   │   ├── planController.js       # Free, Pro, Premium tiers & upgrades
│   │   └── analyticsController.js  # Revenue trends, attendance, diagnostic charts
│   ├── data/
│   │   ├── seedData.js             # Realistic pre-seeded clinician & client demo data
│   │   └── memoryStore.js          # Full CRUD resilient data store
│   ├── middleware/
│   │   └── authMiddleware.js       # JWT authentication guard
│   ├── models/
│   │   ├── User.js                 # Clinician schema
│   │   ├── Client.js               # Client CRM schema
│   │   ├── Appointment.js          # Appointment schema
│   │   ├── Note.js                 # SOAP clinical record schema
│   │   ├── Payment.js              # Payment & invoice schema
│   │   └── Message.js              # Encrypted message schema
│   ├── routes/                     # Express REST API routes
│   ├── .env.example
│   ├── package.json
│   └── server.js                   # Main API entrypoint (Port 5000)
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/             # Sidebar, Header, StatsCard
│   │   │   ├── appointments/       # VideoSessionModal, AppointmentModal
│   │   │   ├── clients/            # ClientModal
│   │   │   ├── notes/              # NoteEditorModal (SOAP architecture)
│   │   │   └── payments/           # NewInvoiceModal, InvoiceReceiptModal
│   │   ├── context/
│   │   │   ├── AuthContext.jsx     # Global authentication & quick-demo state
│   │   │   └── ToastContext.jsx    # System notifications
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx     # Hero, features, SOAP deep-dive, pricing, FAQ
│   │   │   ├── LoginPage.jsx       # 1-Click Demo Fast Track + password sign-in
│   │   │   ├── RegisterPage.jsx    # Clinician licensing registration
│   │   │   ├── DashboardPage.jsx   # KPI cards, today's schedule, recent activity
│   │   │   ├── ClientsPage.jsx     # Searchable client directory & cards
│   │   │   ├── ClientDetailPage.jsx# Diagnostic summary & treatment milestones
│   │   │   ├── AppointmentsPage.jsx# Clinical schedule & telehealth launcher
│   │   │   ├── NotesPage.jsx       # SOAP records with private/shared badges
│   │   │   ├── PaymentsPage.jsx    # Financial metrics & invoices table
│   │   │   ├── ChatPage.jsx        # HIPAA messaging & simulated replies
│   │   │   ├── PlansPage.jsx       # Free/Pro/Premium interactive upgrade
│   │   │   ├── AnalyticsPage.jsx   # Recharts revenue & attendance dashboards
│   │   │   └── SettingsPage.jsx    # Practice preferences & licensing
│   │   ├── services/
│   │   │   └── api.js              # Centralized API service client
│   │   ├── App.jsx                 # App router & modal coordinator
│   │   ├── main.jsx
│   │   └── index.css               # Tailwind directives & custom utilities
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
│
├── package.json                    # Root orchestration script
└── README.md                       # Comprehensive Project Documentation
```

---

## ⚡ Quick Start Guide

### 1. Prerequisites
- **Node.js**: v18+ (tested on Node v24)
- **npm**: v9+

### 2. Setup & Installation

Both `backend` and `frontend` have their packages pre-installed. To run the full application:

#### Option A: Run Backend & Frontend in separate terminals (Recommended)
**Terminal 1 (Backend API Server):**
```bash
cd backend
npm start
```
*Backend runs on `http://localhost:5000`.*

**Terminal 2 (Frontend React App):**
```bash
cd frontend
npm run dev
```
*Frontend opens at `http://localhost:5173`.*

---

## 🔑 Demo Evaluator Credentials

To make evaluation seamless without manual registration:
- **1-Click Demo Button**: Click the purple **"Sign In as Dr. Sarah Mitchell (Demo)"** button on the Login page or Landing page.
- **Manual Credentials**:
  - **Email**: `sarah.mitchell@unfazed.health`
  - **Password**: `Password123!`
  - **License**: `PSY-NY-849201`
  - **Practice**: `Mindful Horizons Clinical Psychology`

---

## 📡 REST API Reference

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | System health check & database status | No |
| `POST` | `/api/auth/register` | Register new clinician practice | No |
| `POST` | `/api/auth/login` | Authenticate therapist & issue JWT | No |
| `POST` | `/api/auth/demo-login` | 1-Click instant evaluator authentication | No |
| `GET` | `/api/auth/me` | Fetch logged-in clinician profile | Yes |
| `GET` | `/api/clients` | List all practice clients with search/filters | Yes |
| `POST` | `/api/clients` | Create new client profile & treatment goals | Yes |
| `GET` | `/api/appointments` | List scheduled appointments | Yes |
| `POST` | `/api/appointments` | Book new in-person or telehealth session | Yes |
| `GET` | `/api/notes` | List SOAP notes (with privacy filters) | Yes |
| `POST` | `/api/notes` | Create signed SOAP note with client summary | Yes |
| `PATCH`| `/api/notes/:id/toggle-sharing` | Toggle Private vs Client-Shared status | Yes |
| `GET` | `/api/payments/summary` | Practice revenue and invoice metrics | Yes |
| `GET` | `/api/payments` | List invoices and billing records | Yes |
| `GET` | `/api/messages/conversations` | Grouped client message threads | Yes |
| `POST` | `/api/messages/:id/simulate-reply`| Simulate realistic client reply | Yes |
| `GET` | `/api/plans` | Fetch Free, Pro, Premium tiers | No |
| `POST` | `/api/plans/upgrade` | Update therapist subscription tier | Yes |
| `GET` | `/api/analytics/dashboard` | Dashboard overview statistics | Yes |
| `GET` | `/api/analytics/charts` | Revenue, attendance & diagnosis chart data | Yes |

---

## 🏆 College Evaluation Highlights
1. **Functional vs Static**: Every single module is backed by live REST APIs, interactive state management, error handling, and realistic pre-loaded clinical records.
2. **Clinical Authenticity**: Real psychiatric terminology, SOAP note structure (Subjective, Objective, Assessment, Plan), SUDS scores, CPT 90837 codes, and HIPAA compliance banners.
3. **Resilient Architecture**: Zero-downtime database engine connects to MongoDB automatically if available, and seamlessly activates the In-Memory Resilient Store with full CRUD persistence if MongoDB is absent.
4. **Professional Healthcare UX**: Custom lavender/purple colorway, interactive Telehealth Room with audio/video toggles, Superbill receipt modal with print functionality, and Recharts analytics.
