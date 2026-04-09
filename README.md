# Interactive Wall Calendar

A React + Vite wall-calendar experience: seasonal hero imagery, page-flip month changes, date range selection, monthly notes, and per-day notes with hover popups. Layout adapts for desktop and smaller screens.

## Features

- **Month navigation** — Previous/next month with a page-turn style animation.
- **Seasonal imagery** — Each month shows a curated Unsplash image with a crossfade when the month changes.
- **Themed chrome** — Background and accents shift with the current month for a cohesive look.
- **Date range selection** — Click a start date, then an end date to highlight the range (order is normalized if you pick the end before the start). A third complete selection starts a new range.
- **Monthly notes** — Left column stores notes for the visible month in `localStorage`.
- **Per-day notes** — Hover a day in the current month to open a small popup; notes save per date. Days with saved text show a small indicator dot.
- **Responsive layout** — Card width, hero height, notes/grid stacking, and nav placement adjust below ~900px viewport width.

## Tech stack

- [React](https://react.dev/) 19
- [Vite](https://vite.dev/) 8
- [date-fns](https://date-fns.org/) for calendar math
- ESLint for linting; Tailwind tooling is present in the repo (styling is largely inline + `index.css`)

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)

## Getting started

Install dependencies:

```bash
npm install
```

Run the dev server (with hot reload):

```bash
npm run dev
```

Then open the URL printed in the terminal (typically `http://localhost:5173`).

## Scripts

| Command | Description |
|--------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint |

## Data persistence (localStorage)

Notes are stored in the browser only (no backend):

| Key pattern | Purpose |
|-------------|---------|
| `month-notes-YYYY-MM` | Monthly notes for that calendar month |
| `date-notes-YYYY-MM-DD` | Per-day note for that date |

Clearing site data or using a different browser will reset stored notes.

## Project layout (high level)

- `src/App.jsx` — Shell, themes, responsive layout, hanging strings, month dots
- `src/hooks/useCalendar.js` — Month state, range selection, flip animation flags
- `src/components/Calendar/` — Grid, day cells, header binding
- `src/components/HeroImage/` — Month images and overlays
- `src/components/Notes/` — Monthly notes panel
- `src/utils/dateHelpers.js` — Shared date helpers (`date-fns`)

## License

This project is private. Add a license file if you plan to distribute it.
