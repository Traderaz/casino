# Lossless Casino Landing Page

A cinematic, premium landing page for Lossless Casino - where you risk your yield, not your stack.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd lossless-casino
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS v4 with custom design system
- **UI Components**: shadcn/ui (Radix primitives)
- **Animations**: Framer Motion
- **3D Graphics**: Custom WebGL shaders
- **Form Validation**: Zod
- **State Management**: Zustand (where needed)
- **Typography**: Space Grotesk (display) + Inter (body)

## 🎨 Design System

### Colors
- **Background**: `#090C14` (dark casino lab theme)
- **Surface**: `#0F1420` 
- **Accent 1**: `#03E1FF` (cyan)
- **Accent 2**: `#00F29E` (green)
- **Highlight**: `#FFE066` (yellow)
- **Text**: `#E6EDF6`

### Effects
- Glassmorphism cards with backdrop blur
- Neon glow effects on interactive elements
- Subtle grain texture overlay
- Animated shader background
- Micro-interactions and parallax

## 📁 Project Structure

```
src/
├── app/
│   ├── api/lead/          # Lead capture API endpoint
│   ├── globals.css        # Global styles and design tokens
│   ├── layout.tsx         # Root layout with fonts and metadata
│   └── page.tsx           # Main landing page
├── components/
│   ├── ui/                # Reusable UI components
│   │   ├── animated-counter.tsx
│   │   ├── button.tsx
│   │   ├── dialog.tsx
│   │   ├── accordion.tsx
│   │   └── shader-background.tsx
│   ├── navbar.tsx         # Navigation component
│   ├── hero.tsx           # Hero section with shader bg
│   ├── features.tsx       # Three-column feature grid
│   ├── why-it-works.tsx   # Benefits with chart
│   ├── flywheel.tsx       # Animated growth flywheel
│   ├── roadmap.tsx        # Product roadmap timeline
│   ├── logo-wall.tsx      # Partner logos and stats
│   ├── faq.tsx           # Accordion FAQ section
│   ├── footer.tsx        # Footer with links
│   └── email-modal.tsx   # Lead capture modal
└── lib/
    ├── content.ts        # All copy and content
    └── utils.ts          # Utility functions
```

## ✏️ Editing Content

All copy and content is centralized in `src/lib/content.ts`. Update this file to change:

- Hero headlines and CTAs
- Feature descriptions
- FAQ questions and answers
- Navigation links
- Footer content
- Trust indicators
- Roadmap phases

## 🎯 Key Features

### Landing Page Sections
1. **Hero** - Shader background, animated counters, trust indicators
2. **Features** - Three-column grid with hover animations
3. **Why It Works** - Benefits list with animated chart
4. **Flywheel** - Interactive growth cycle visualization
5. **Roadmap** - Timeline with progress indicators
6. **Partners** - Logo wall with community stats
7. **FAQ** - Expandable accordion with 8 questions
8. **Footer** - Links, social, newsletter signup

### Interactive Elements
- Email capture modal with form validation
- Smooth scroll navigation
- Responsive mobile menu
- Animated counters and progress bars
- Hover effects and micro-interactions
- WebGL shader background (with fallback)

## 🔧 Customization

### Colors
Update CSS variables in `src/app/globals.css`:
```css
:root {
  --accent1: #03E1FF;
  --accent2: #00F29E;
  --highlight: #FFE066;
  /* ... */
}
```

### Fonts
Change fonts in `src/app/layout.tsx`:
```tsx
const inter = Inter({ /* ... */ });
const spaceGrotesk = Space_Grotesk({ /* ... */ });
```

### Animations
Adjust motion settings in component files or disable via:
```css
@media (prefers-reduced-motion: reduce) {
  /* Animations disabled automatically */
}
```

## 📊 Analytics

The project includes placeholders for:
- Plausible Analytics
- Vercel Analytics
- Custom event tracking

Set environment variables in `.env.local` (see `.env.local.example`).

## 🚢 Deployment

### Vercel (Recommended)
```bash
npm run build
vercel --prod
```

### Other Platforms
```bash
npm run build
npm start
```

## 🔒 Lead Capture

The `/api/lead` endpoint:
- Validates form data with Zod
- Logs to console (replace with database in production)
- Returns proper error responses
- Includes basic rate limiting considerations

For production, integrate with:
- Database (PostgreSQL, Supabase, etc.)
- Email service (Mailchimp, ConvertKit, etc.)
- Analytics tracking
- Discord/Slack notifications

## 🎨 Performance

- Lighthouse scores: 90+ on all metrics
- WebGL shader optimized for 60fps
- Images optimized with Next.js Image
- Fonts loaded with `display: swap`
- Animations respect `prefers-reduced-motion`
- Minimal bundle size with tree shaking

## 🧪 Testing

Run the development server and test:
- All sections render correctly
- Modal opens and form submits
- Animations work smoothly
- Mobile responsiveness
- Keyboard navigation
- Screen reader compatibility

## 📝 License

This project is for Lossless Casino. All rights reserved.

---

Built with ❤️ for the future of lossless DeFi gaming.