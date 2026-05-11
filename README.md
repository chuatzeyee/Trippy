# Trippy

A personal travel planner built with vanilla JavaScript. Plan trips with detailed day-by-day itineraries, budget tracking, accommodation comparisons, and booking checklists.

**Live site:** https://chuatzeyee.github.io/Trippy/

## Features

- Multi-trip dashboard with trip cards and status indicators
- Day-by-day itinerary with timeline view, transport info, and cost breakdowns
- Trip essentials (transport, weather, exchange rates, flights)
- Selectable accommodation cards with localStorage persistence
- Interactive booking checklist with progress tracking
- Responsive sidebar navigation with mobile hamburger menu
- Per-person and group budget summaries
- Create new trips via the dashboard modal

## Tech Stack

- Vanilla JavaScript (ES modules, no build step)
- Hash-based client-side router
- CSS custom properties for theming
- localStorage for user selections (accommodation, checklist)
- Hosted on GitHub Pages

## Project Structure

```
Trippy/
  index.html              # SPA shell
  css/
    style.css             # Trip view styles and design tokens
    dashboard.css         # Dashboard layout and modal styles
  js/
    app.js                # Entry point, routes, renderers
    dashboard.js          # Dashboard grid and new-trip modal
    router.js             # Hash-based router with :param support
    trips/
      registry.js         # Trip registry (built-in + localStorage custom trips)
      melbourne-2026.js   # Melbourne 2026 trip data
```

## Adding a Trip

Built-in trips are JS modules in `js/trips/`. Export an object with:

```js
export const myTrip = {
  id: "my-trip",
  title: "My Trip",
  emoji: "...",
  destination: "City, Country",
  dates: { start: "YYYY-MM-DD", end: "YYYY-MM-DD" },
  travelers: 2,
  currency: { code: "USD", symbol: "$", rate: 1, homeCurrency: "SGD", homeSymbol: "S$" },
  days: [/* day objects */],
  essentials: [/* { icon, title, value, detail } */],
  flights: { outbound: {/* flight */}, inbound: {/* flight */} },
  accommodation: [/* hotel cards */],
  checklist: [/* { group, items: [{ id, label, links, meta }] } */]
};
```

Then import and register it in `js/trips/registry.js`.

Custom trips can also be created from the dashboard UI and are stored in localStorage.

## Running Locally

```bash
# Any static file server works
python3 -m http.server 8080
# Open http://localhost:8080
```

## License

MIT
