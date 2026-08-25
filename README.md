# Wishlet Frontend 🎁✨

The modern, responsive web application for **Wishlet** — a micro SaaS platform for creating personalized, animated mini websites for special occasions (Birthday, Anniversary, Congratulations, Thank You, and Sorry).

Built with **Next.js 15 (App Router)**, **Tailwind CSS**, **Framer Motion**, **TanStack Query**, and **Google Analytics 4**.

---

## 🌟 Key Features

- **Interactive Template Showcase**: Authentic preview of all 5 templates with occasion-specific demo data.
- **Split-Screen Builder**: Real-time side-by-side editing and live dynamic preview.
- **5 Curated Occasion Templates**:
  - 🎂 **Birthday Minimal**: Elegant serif typography & floating particle effects.
  - 🌹 **Anniversary Elegant**: Romantic editorial design with interactive photo reveal.
  - 🎉 **Congratulations Celebration**: Energetic display typography with glowing sunburst beams.
  - 💌 **Thank You Simple**: Clean, warm editorial styling with gentle motion.
  - 🕊️ **Sorry Sincere**: Soft, calm aesthetic with subtle ambient animation.
- **Photo Upload Integration**: Direct signed uploads to Cloudinary CDN with Data-URI local fallback.
- **Dynamic OpenGraph Cards**: Automatic social preview cards for WhatsApp, iMessage, and Twitter sharing (`/w/[slug]`).
- **Privacy-First GA4 Analytics**: Privacy-safe product analytics tracking key user funnel steps.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router & Turbopack)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Data Fetching**: [TanStack Query (React Query)](https://tanstack.com/query)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Analytics**: [Google Analytics 4](https://analytics.google.com/)

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm
- Running Wishlet Backend API (local or production)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/anurag-singh2001/Wishlet-Frontend.git
   cd Wishlet-Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment variables:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

4. Configure `.env`:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-T48VSCQFLC
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 Available NPM Scripts

| Script | Command | Description |
| :--- | :--- | :--- |
| `dev` | `next dev --turbopack` | Starts local Next.js development server |
| `build` | `next build` | Builds optimized production bundle |
| `start` | `next start` | Runs production server |
| `typecheck` | `tsc --noEmit` | Validates TypeScript types |
| `lint` | `next lint` | Runs ESLint code quality checks |

---

## 📄 License

MIT License © [Anurag Singh](https://github.com/anurag-singh2001)
