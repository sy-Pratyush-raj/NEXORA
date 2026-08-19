# NEXORA — "Your work, understood."

> **Acdyon Technologies Engineering "Frontend Challenge — Build It Like You Mean It" (Part 2 Track)**  
> Production-grade, high-craft Full-Stack MERN SaaS application built for modern engineering & product teams.

---

## 🌟 Executive Overview

**Nexora** is an intelligent workspace that brings scattered projects, tasks, and activity together, then turns the noise into actionable insights.

### Core Value Proposition
> *"Turn scattered work into clear direction."*  
> Nexora brings your projects, tasks and activity together, then turns the noise into actionable insights.

---

## 🚀 Key Highlights & Architectural Craft

- **Live Product Visualization in Hero:** Live-rendered interactive SaaS application preview directly inside the hero viewport.
- **Interactive Product Demo:** Real interactive tab switcher (*Overview*, *Projects*, *Tasks*, *Insights*) with dynamic metrics and zero layout shifting.
- **Flagship AI Insights Card:** Real-world blocker diagnostics (Project Atlas slowing down, 3 tasks blocked for >2 days, suggested action).
- **Interactive "Ask Nexora" Engine:** Natural language query simulation with animated step-by-step reasoning checkmarks.
- **Chaos → Clarity Metamorphosis:** Storytelling transformation section with smooth state animations.
- **Complete Dark & Light Mode:** 100% complete color token coverage across every single modal, chart, card, and navigation element.
- **Full MERN Stack CRUD:** True MongoDB database persistence with Express REST APIs, JWT authentication, and protected workspace routes.
- **Resilient Zero-Config DB Engine:** Built-in automatic in-memory MongoDB fallback if local or external MongoDB is unavailable.
- **Strict Honesty & Integrity:** Zero fake social proof, no fabricated user counts, no fake logos.
- **Secret Easter Egg:** Type `NEXORA` on your keyboard anywhere to trigger the executive focus HUD overlay.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS + PostCSS + Extended Design Tokens
- **Routing:** React Router v6 (Protected Route Guards)
- **Animations:** Framer Motion (Restrained Spring Physics)
- **Icons:** Lucide React
- **Data Visualization:** Recharts (Responsive Area & Bar Charts)
- **State/Auth:** React Context (`AuthContext`, `ThemeContext`, `ToastContext`)

### Backend & Database
- **Runtime:** Node.js (v18+) + Express.js + TypeScript
- **Database:** MongoDB + Mongoose (Atlas Cloud & Local Compatible)
- **In-Memory Fallback:** `mongodb-memory-server` for instant zero-configuration testing
- **Authentication:** JWT (JSON Web Tokens) + Bcrypt Password Hashing
- **Security:** Helmet, CORS, Centralized Error Handling, Zod Request Validation

---

## 💻 Beginner-Friendly Quick Start Guide

Follow these exact steps to run the entire project on your machine in under 2 minutes:

### STEP 1: Open Your Terminal
Open Terminal (macOS/Linux) or Command Prompt / PowerShell (Windows).

### STEP 2: Navigate to Project Directory
Navigate into the project workspace:
```bash
cd "/Users/tusharsinha/Desktop/Project Assignment"
```

### STEP 3: Install All Dependencies
Run the unified installer script:
```bash
npm run install:all
```
- **Expected Output:** npm installs dependencies for root, server, and client directories with zero errors.
- **Troubleshooting:** If npm hangs, ensure your internet connection is active and run `npm cache clean --force`.

### STEP 4: Start the Full-Stack Application
Run the concurrent dev command:
```bash
npm run dev
```
- **Expected Output:**
  ```text
  [SERVER] 🚀 Nexora Core API Engine running on http://localhost:5001
  [SERVER] Connected to MongoDB Engine...
  [CLIENT] ➜ Local: http://localhost:5173/
  ```

### STEP 5: Open in Your Browser
Open your browser and navigate to:
```text
http://localhost:5173
```
- Click **"Get Started"** or **"Explore Alex's Demo Workspace"** for instant 1-click login.

---

## 🌐 API Route Specifications

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `POST` | `/api/auth/register` | Register new user & seed initial workspace | No |
| `POST` | `/api/auth/login` | Authenticate user & return JWT | No |
| `POST` | `/api/auth/demo-login` | Instant 1-click demo login as Alex Vance | No |
| `GET` | `/api/auth/me` | Fetch authenticated user profile | Yes |
| `GET` | `/api/projects` | List projects with search & filter | Yes |
| `POST` | `/api/projects` | Create new project | Yes |
| `PUT` | `/api/projects/:id` | Update project metadata or progress | Yes |
| `DELETE` | `/api/projects/:id` | Delete project and cascade tasks | Yes |
| `GET` | `/api/tasks` | List tasks with project & status filters | Yes |
| `POST` | `/api/tasks` | Create new task | Yes |
| `PUT` | `/api/tasks/:id` | Update task status, priority, or blocker | Yes |
| `DELETE` | `/api/tasks/:id` | Delete task | Yes |
| `GET` | `/api/insights` | Retrieve AI insights & blocked diagnostics | Yes |
| `GET` | `/api/insights/momentum` | Get 7-day velocity momentum dataset | Yes |
| `POST` | `/api/insights/ask` | Natural query Ask Nexora simulator | Yes |
| `GET` | `/api/activity` | Chronological workspace audit stream | Yes |
| `PUT` | `/api/user/profile` | Update profile settings and appearance | Yes |

---

## 📦 Deployment Guide

### Deploying Frontend to Vercel
1. Push repository to GitHub.
2. Import project into Vercel and select root directory `client`.
3. Set Build Command: `npm run build` and Output Directory: `dist`.
4. Set Environment Variable: `VITE_API_URL=https://your-backend-url.onrender.com/api`.

### Deploying Backend to Render / Railway
1. Create a new Web Service pointing to the root directory `server`.
2. Build Command: `npm run build`
3. Start Command: `npm run start`
4. Set Environment Variables:
   - `PORT=5001`
   - `NODE_ENV=production`
   - `MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/nexora?retryWrites=true&w=majority`
   - `JWT_SECRET=your_production_secret`
   - `CLIENT_URL=https://your-frontend.vercel.app`

---

## 📄 License & Attribution
Built for the **Acdyon Technologies Engineering "Frontend Challenge — Build It Like You Mean It"**.  
MIT License © 2026 Nexora Team.
