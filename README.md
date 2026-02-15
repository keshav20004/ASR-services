<p align="center">
  <img src="public/favicon.jpeg" alt="ASR Services Logo" width="80" height="80" style="border-radius: 16px;" />
</p>

<h1 align="center">ASR Services</h1>
<p align="center">
  <strong>Modern Recruitment Platform</strong>
</p>
<p align="center">
  A premium recruitment platform connecting top talent with leading companies.<br/>
  Built with Next.js 15, featuring a glassmorphism dark-mode UI and real-time analytics.
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#project-structure">Project Structure</a> •
  <a href="#screenshots">Screenshots</a>
</p>

---

## ✨ Features

### 🏢 Recruiter Portal
- **Dashboard** with KPI cards (Jobs Posted, Applications, Active Listings)
- **Post jobs** with title, description, salary range, type, location, and requirements
- **Manage listings** — view, expand applicant details, or delete jobs
- **Analytics** — interactive doughnut chart showing application distribution per job (Chart.js)
- **Applicant tracking** — view cover letters, contact info, and application status

### 💼 Job Seeker Portal
- **Browse jobs** with real-time search and multi-filter (keyword, type, location)
- **Apply instantly** with an optional cover letter
- **Track applications** — view submission status and history in "My Applications" tab
- **Job details** — expandable cards with full descriptions and skill tags

### 🌐 General
- **Dual authentication** — separate signup/login flows for recruiters and job seekers
- **Animated landing page** — interactive particle canvas, gradient orbs, stats counter
- **WhatsApp integration** — floating chat button for instant business communication
- **Responsive design** — works across desktop, tablet, and mobile
- **Data persistence** — client-side localStorage with pre-loaded seed data (9 job listings)

---

## 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 15** | React framework with App Router |
| **React 19** | UI components and state management |
| **Chart.js** | Analytics and data visualization |
| **Vanilla CSS** | Custom design system with CSS variables |
| **localStorage** | Client-side data persistence |
| **Google Fonts** | Inter (body) + Outfit (headings) |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/keshav20004/ASR-services.git

# Navigate to the project
cd ASR-services

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Quick Start
1. Visit the landing page and choose **"I Want to Hire"** or **"I Want a Job"**
2. Create an account (signup)
3. Explore the dashboard — post jobs or browse & apply!

---

## 📁 Project Structure

```
ASR/
├── public/
│   └── favicon.jpeg            # Site favicon
├── src/
│   ├── app/
│   │   ├── globals.css         # Design system & theme
│   │   ├── layout.js           # Root layout with metadata
│   │   ├── page.js             # Landing page
│   │   ├── login/
│   │   │   ├── recruiter/page.js
│   │   │   └── jobseeker/page.js
│   │   ├── recruiter/page.js   # Recruiter dashboard
│   │   └── jobseeker/page.js   # Job seeker dashboard
│   ├── components/
│   │   ├── Navbar.js           # Sticky glassmorphism navbar
│   │   ├── Modal.js            # Reusable modal overlay
│   │   └── WhatsAppButton.js   # Floating WhatsApp chat button
│   └── lib/
│       └── store.js            # localStorage data layer & seed data
├── package.json
└── next.config.mjs
```

---

## 🎨 Design

- **Theme:** Premium dark-mode with deep navy backgrounds
- **UI Style:** Glassmorphism cards with frosted-glass effects
- **Colors:** Purple (`#6c5ce7`) → Teal (`#00cec9`) gradient system
- **Animations:** Particle canvas, slide-up reveals, hover effects, pulse glows
- **Typography:** Inter (body) + Outfit (headings) from Google Fonts



## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  Built with ❤️ by <strong>ASR Services</strong>
</p>
