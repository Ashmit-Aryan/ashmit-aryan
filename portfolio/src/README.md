# Ashmit Aryan Portfolio

A modern, performant portfolio website built with React, TypeScript, Three.js (R3F), and Tailwind CSS.

## Features

- **3D Hero Background** - Interactive particle system with floating geometries using React Three Fiber
- **Responsive Design** - Mobile-first approach with fluid typography
- **Performance Optimized** - Code splitting, lazy loading, optimized builds
- **Accessibility** - WCAG 2.1 AA compliant, keyboard navigation, reduced motion support
- **Contact Form** - FastAPI backend with rate limiting and multiple email providers
- **CI/CD** - GitHub Actions deployment to GitHub Pages

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **3D Graphics**: React Three Fiber, @react-three/drei, @react-three/postprocessing
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod validation
- **Backend**: FastAPI, Uvicorn
- **Deployment**: GitHub Pages + GitHub Actions, Railway/Render for API

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+

### Installation

```bash
# Clone and install frontend
cd portfolio
npm install --legacy-peer-deps

# Install backend (optional)
cd ../api
pip install -r requirements.txt
```

### Development

```bash
# Frontend (port 3000)
cd portfolio
npm run dev

# Backend (port 8000)
cd api
uvicorn main:app --reload
```

### Build

```bash
cd portfolio
npm run build
npm run preview  # Preview production build
```

### Linting & Type Checking

```bash
npm run lint       # Check for issues
npm run lint:fix   # Auto-fix issues
npm run typecheck  # TypeScript type checking
npm run format     # Format with Prettier
```

## Project Structure

```
portfolio/
├── .github/workflows/     # CI/CD pipeline
├── public/                # Static assets
├── src/
│   ├── components/
│   │   ├── ui/           # Reusable UI components
│   │   ├── layout/       # Header, Footer
│   │   ├── hero/         # Hero section with 3D
│   │   ├── about/        # About section
│   │   ├── projects/     # Projects showcase
│   │   ├── skills/       # Skills with 3D viz
│   │   ├── experience/   # Timeline
│   │   ├── contact/      # Contact form
│   │   └── canvas/       # R3F canvas wrapper
│   ├── hooks/            # Custom React hooks
│   ├── data/             # Content data
│   ├── utils/            # Utility functions
│   ├── App.tsx
│   └── main.tsx
├── api/                   # FastAPI backend
│   ├── main.py
│   ├── requirements.txt
│   └── Dockerfile
└── package.json
```

## Deployment

### Frontend (GitHub Pages)

1. Push to `main` branch
2. GitHub Actions builds and deploys automatically
3. Enable GitHub Pages in repository settings (source: GitHub Actions)

### Backend (Railway/Render)

**Railway:**
```bash
# Connect GitHub repo to Railway
# Add environment variables from api/.env.example
# Deploy automatically
```

**Render:**
```yaml
# Use render.yaml config
# Add environment variables in dashboard
```

### Environment Variables

**Frontend** (GitHub Actions secrets):
- `VITE_API_URL` - Your FastAPI backend URL

**Backend** (Railway/Render env vars):
- `RESEND_API_KEY` or `SENDGRID_API_KEY` - Email provider
- `FROM_EMAIL` - Sender email
- `TO_EMAIL` - Recipient email

## Performance Targets

| Metric | Target |
|--------|--------|
| Performance | ≥ 90 |
| Accessibility | ≥ 95 |
| Best Practices | ≥ 95 |
| SEO | ≥ 95 |

## Accessibility

- Semantic HTML5
- ARIA labels and roles
- Focus visible states
- Color contrast ≥ 4.5:1
- Keyboard navigation
- `prefers-reduced-motion` respected
- Screen reader compatible

## License

MIT License - feel free to use as inspiration for your own portfolio!