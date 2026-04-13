# Recipe Finder

**[Live demo →](https://recipe-search-app-nu.vercel.app/)**

> ⚠️ **Work in Progress** — This project is actively under development. Features, structure, and design are subject to change.

A recipe discovery web application that lets users browse popular picks, vegetarian options, explore recipes by cuisine, search by keyword, and view full recipe details. Built as a personal project to practice modern frontend development patterns.

---

## Tech Stack

### Core
| Technology | Purpose |
|---|---|
| [React 19](https://react.dev/) | UI library |
| [TypeScript 6](https://www.typescriptlang.org/) | Static typing |
| [Vite 8](https://vite.dev/) | Build tool and dev server |

### Styling
| Technology | Purpose |
|---|---|
| [styled-components 6](https://styled-components.com/) | Component-scoped CSS-in-JS |
| [Material UI 9](https://mui.com/) | UI component library (Cards, Chips, AppBar, Switch, etc.) |
| CSS custom properties | Centralized theming (light/dark mode) |

### Routing & Data
| Technology | Purpose |
|---|---|
| [React Router 7](https://reactrouter.com/) | Client-side routing |
| [Axios](https://axios-http.com/) | HTTP client |
| [Spoonacular API](https://spoonacular.com/food-api) | Recipe data source |
| localStorage | Client-side caching with 24h TTL |

### Internationalization & AI
| Technology | Purpose |
|---|---|
| [i18next](https://www.i18next.com/) | i18n framework |
| [react-i18next](https://react.i18next.com/) | React bindings |
| [i18next-browser-languagedetector](https://github.com/i18next/i18next-browser-languageDetector) | Auto language detection |
| [Groq API](https://groq.com/) (`llama-3.3-70b-versatile`) | AI-powered live translation of recipe content |

Supported languages: **English**, **Spanish**, **Portuguese**, **French**

### UI & Icons
| Technology | Purpose |
|---|---|
| [react-icons](https://react-icons.github.io/react-icons/) | Icon library (fa, fa6, gi, md, lu, pi, tb) |
| [@splidejs/react-splide](https://splidejs.com/) | Carousel for Top Picks |

---

## Features

- **Top Picks** — carousel of popular recipes with diet and cuisine tags
- **Veggie Picks** — curated vegetarian recipes in a list layout
- **Cuisine Categories** — 27 cuisines with icons; click any to navigate to a dedicated page with infinite pagination
- **Search** — keyword search with result count and pagination
- **Recipe Detail Page** — full recipe view with hero image, ingredients (US/Metric toggle with images), step-by-step instructions, diet/cuisine tags, and source link
- **Dark / Light mode** — custom animated MUI switch; state persisted in localStorage
- **Language switcher** — EN / ES / PT / FR, auto-detected from browser; all UI strings via i18n locale files
- **AI Translation** — Groq AI translates recipe titles, summaries, ingredients, and instructions when a non-English language is selected; results cached per recipe+language to minimize API usage
- **Client-side caching** — Spoonacular responses cached per-cuisine, per-query, per-language; session cache preserves accumulated paginated results across navigation
- **US / Metric toggle** — ingredient amounts switch between unit systems using Spoonacular's built-in measures data (no extra API call)

---

## Project Structure

```
src/
├── assets/
├── components/
│   ├── AppSwitch/        # Shared styled MUI Switch (reused in Header and RecipePage)
│   ├── Category/         # Cuisine category grid with animated expand/collapse
│   ├── CuisinePills/     # Localized cuisine tags
│   ├── DietPills/        # Localized diet tags
│   ├── Footer/
│   ├── Header/           # AppBar with theme toggle and language selector
│   ├── SearchBar/        # Search input with navigation
│   ├── TopPicks/         # Splide carousel
│   └── VeggiePicks/      # Card list (layout shared by CuisinePage and SearchPage)
├── context/              # ThemeContext
├── i18n/                 # Locale files (en, es, pt, fr)
├── pages/
│   ├── Home.tsx
│   ├── CuisinePage.tsx   # /:cuisine
│   ├── SearchPage.tsx    # /search/:query
│   └── RecipePage.tsx    # /recipe/:id
├── services/             # API calls + localStorage caching (api, cuisineRecipes, search, topPicks, veggiePicks, recipeDetail, groq)
└── utils/                # constants (icons, colors), types
```

---

## Development Notes

This project was built with assistance from **[Claude](https://claude.ai/) (Anthropic)** — used as an AI pair programmer throughout development. All architectural decisions, feature planning, and code review were driven by the developer; Claude assisted with implementation, refactoring, and debugging.

---

## Getting Started

```bash
# Install dependencies
npm install

# Add your API keys to .env
VITE_API_KEY=your_spoonacular_key
VITE_GROQ_KEY=your_groq_key

# Start dev server
npm run dev
```

---

## Roadmap

- [x] Recipe detail page
- [x] Search by ingredient or name
- [x] AI translation via Groq
- [x] US / Metric ingredient toggle
- [ ] Favorites / saved recipes
- [ ] More languages
- [ ] Unit and integration tests
- [ ] Responsive / mobile layout
