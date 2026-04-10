# Recipe Finder

> ⚠️ **Work in Progress** — This project is actively under development. Features, structure, and design are subject to change.

A recipe discovery web application that lets users browse popular picks, vegetarian options, and explore recipes by cuisine category. Built as a personal project to practice modern frontend development patterns.

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
| [Material UI 9](https://mui.com/) | UI component library (Cards, Chips, AppBar, etc.) |
| CSS custom properties | Centralized theming (light/dark mode) |

### Routing & Data
| Technology | Purpose |
|---|---|
| [React Router 7](https://reactrouter.com/) | Client-side routing |
| [Axios](https://axios-http.com/) | HTTP client |
| [Spoonacular API](https://spoonacular.com/food-api) | Recipe data source |
| localStorage | Client-side caching with 24h TTL |

### Internationalization
| Technology | Purpose |
|---|---|
| [i18next](https://www.i18next.com/) | i18n framework |
| [react-i18next](https://react.i18next.com/) | React bindings |
| [i18next-browser-languagedetector](https://github.com/i18next/i18next-browser-languageDetector) | Auto language detection |
| [groq AI](https://groq.com/) | Live auto translation |

Supported languages: **English**, **Spanish**, **Portuguese**, **French**

### UI & Icons
| Technology | Purpose |
|---|---|
| [react-icons](https://react-icons.github.io/react-icons/) | Icon library (fa, gi, md, lu, pi, tb) |
| [@splidejs/react-splide](https://splidejs.com/) | Carousel for Top Picks |

---

## Features (so far)

- **Top Picks** — carousel of popular recipes with diet and cuisine tags
- **Veggie Picks** — curated vegetarian recipes in a list layout
- **Cuisine Categories** — browse all 27 Spoonacular cuisines; click any to navigate to a dedicated recipe page with pagination
- **Dark / Light mode** — toggle with a custom MUI switch; persisted in localStorage
- **Language switcher** — EN / ES / PT / FR, auto-detected from browser
- **Client-side caching** — API responses cached per-cuisine and per-page to minimize quota usage
- **Auto translation** — Groq AI powered auto translation for recipes and ingredients, powered by llama-3.3-70b-versatile

---

## Project Structure

```
src/
├── assets/
├── components/
│   ├── Category/
│   ├── CuisinePills/
│   ├── DietPills/
│   ├── Footer/
│   ├── Header/
│   ├── TopPicks/
│   └── VeggiePicks/
├── context/          # ThemeContext
├── i18n/             # Locale files (en, es, pt, fr)
├── pages/            # Home, CuisinePage
├── services/         # API calls + localStorage caching
└── utils/            # Shared constants (icons, colors) and types
```

---

## Development Notes

This project was built with assistance from **[Claude](https://claude.ai/) (Anthropic)** — used as an AI pair programmer throughout development. All architectural decisions, feature planning, and code review were driven by the developer; Claude assisted with implementation, refactoring, and debugging.

---

## Getting Started

```bash
# Install dependencies
npm install

# Add your Spoonacular API key
echo "VITE_API_KEY=your_key_here" > .env

# Start dev server
npm run dev
```

---

## Roadmap

- [ * ] Recipe detail page
- [ * ] Search by ingredient or name
- [ * ] Auto AI translation
- [ ] Favorites / saved recipes
- [ ] More languages!
- [ ] Unit and integration tests
- [ ] Responsive / mobile layout
