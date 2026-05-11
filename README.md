# Trippy

A personal travel planner built with vanilla JavaScript. Plan trips with detailed day-by-day itineraries, budget tracking, accommodation comparisons, and booking checklists. No build step, no dependencies, no framework - just HTML, CSS, and ES modules.

**Live demo:** [chuatzeyee.github.io/Trippy](https://chuatzeyee.github.io/Trippy/)

## Quick Start

```bash
git clone https://github.com/chuatzeyee/Trippy.git
cd Trippy
python3 -m http.server 8080
# Open http://localhost:8080
```

Any static file server works (VS Code Live Server, `npx serve`, etc). No `npm install` needed.

## Deploy to GitHub Pages

1. Fork the repo on GitHub
2. Go to Settings > Pages
3. Set Source to "Deploy from a branch", branch `main`, folder `/ (root)`
4. Your site will be live at `https://<your-username>.github.io/Trippy/`

## Features

- **Multi-trip dashboard** - trip cards with status, countdown, and cover images
- **Day-by-day itinerary** - timeline view with activity cards, transport info, and costs
- **Trip essentials** - public transport, weather, exchange rates, flights
- **Accommodation cards** - selectable hotel comparisons with localStorage persistence
- **Booking checklist** - interactive progress tracking with links
- **Budget tracking** - per-day and trip-total cost breakdowns in local + home currency
- **Day builder** - add/edit/delete days and activities for custom trips
- **Responsive** - sidebar nav on desktop, hamburger menu on mobile
- **Offline-friendly** - all data is in static JS, no API calls needed

## Project Structure

```
Trippy/
  index.html                  # SPA entry point
  css/
    style.css                 # Trip view styles + design tokens
    dashboard.css             # Dashboard grid + modals
    day-builder.css           # Builder UI (toolbars, modals, pickers)
  js/
    app.js                    # Entry point, routing, all renderers
    router.js                 # Hash-based router with :param support
    dashboard.js              # Dashboard grid + create-trip modal
    day-builder.js            # Pure data functions (immutable trip mutations)
    day-builder-ui.js         # Builder UI (modals, controls, event handling)
    trips/
      registry.js             # Trip registry (built-in + localStorage custom)
      melbourne-2026.js       # Example: Melbourne 2026 trip data
```

## How It Works

- **Routing**: Hash-based (`#/`, `#/trip/melbourne-2026`). No server config needed.
- **Data**: Built-in trips are JS modules. Custom trips are stored in `localStorage`.
- **State**: Accommodation selection and checklist progress persist in `localStorage` per trip.
- **Builder**: Custom trips get edit controls (add/edit/delete days and activities). Built-in trips are read-only.
- **Theming**: CSS custom properties. Each trip can override colors via `trip.theme`.

## Creating Your Own Trip

### Step 1: Create the trip data file

Create `js/trips/my-trip.js`. Here is the full data model with every field documented:

```js
export const myTrip = {
  // --- Required ---
  id: "tokyo-2026",                    // URL-safe unique ID
  title: "Tokyo 2026",                 // Display name
  emoji: "🗼",                         // Favicon + dashboard card
  destination: "Tokyo, Japan",         // Shown in hero section
  dates: {
    start: "2026-09-01",              // YYYY-MM-DD
    end: "2026-09-08"                 // YYYY-MM-DD
  },
  travelers: 2,                        // Used for group budget calculation

  // --- Currency ---
  currency: {
    code: "JPY",                       // Destination currency code
    symbol: "Y",                       // Prefix for destination prices
    rate: 0.0089,                      // 1 [destination currency] = X [home currency]
    homeCurrency: "SGD",               // Your home currency code
    homeSymbol: "S$"                   // Prefix for home currency
  },

  // --- Optional: Dashboard ---
  coverImage: "https://example.com/tokyo.jpg",  // Dashboard card background
  subtitle: "Culture, Food & Autumn Colors",     // Hero subtitle
  theme: {                              // Override CSS custom properties
    primary: "#E44D4D",                // Accent color (--tram-gold)
    sidebar: "#1A1A2E",               // Sidebar bg (--bluestone)
    surface: "#FFF5F5",               // Surface bg (--limestone)
    card: "#FFFAFA"                   // Card bg (--cream)
  },

  // --- Days (the itinerary) ---
  days: [
    {
      num: 1,                          // Day number (auto-set by builder)
      date: "Mon, 1 Sep",             // Display date (auto-set by builder)
      title: "Arrival Day",
      theme: "Shinjuku & First Ramen",
      weather: {
        high: 28,                      // Celsius
        low: 22,
        icon: "☀️",                   // Weather emoji
        desc: "Sunny, warm"
      },
      activities: [
        {
          time: "14:00",               // HH:MM (24h), used for timeline ordering
          end: "",                     // Optional end time
          title: "Check In at Hotel",
          type: "transport",           // transport | food | culture | nature
          desc: "Description text shown in the card body.",
          atmosphere: ["busy", "touristy"],  // Tag pills (optional)
          img: "https://...",          // Activity card image (optional)
          map: "https://maps.google.com/?q=...",    // Map link (optional)
          booking: "https://...",      // Booking link (optional)
          cost: {
            aud: 200,                  // Cost in DESTINATION currency (despite field name)
            note: "A$200/night"        // Cost label
          },
          transport: [                 // How to get there (optional)
            {
              mode: "Train",
              cost: "Y270",
              time: "45 min",
              note: "Narita Express to Shinjuku"
            }
          ]
        }
        // ... more activities
      ],
      dayCost: {                       // Per-person daily totals (destination currency)
        transport: 30,
        food: 50,
        activities: 0,
        accommodation: 200
      }
    }
    // ... more days
  ],

  // --- Optional: Trip Essentials cards ---
  essentials: [
    {
      icon: "🚃",
      title: "Rail Pass",
      value: "7-Day JR Pass",
      detail: "Covers all JR trains including Shinkansen."
    }
  ],

  // --- Optional: Flights ---
  flights: {
    outbound: {
      airline: "ANA",
      code: "NH802",
      from: "SIN T1",
      to: "NRT T1",
      depart: "08:00 SGT, 1 Sep",
      arrive: "16:00 JST, 1 Sep",
      duration: "7h",
      aircraft: "Boeing 787-9"
    },
    inbound: { /* same structure */ }
  },

  // --- Optional: Accommodation comparison ---
  accommodation: [
    {
      id: "hotel-shinjuku",            // Unique within this trip
      name: "Hotel Gracery Shinjuku",
      recommended: true,               // Highlight badge
      img: "https://...",              // Card image
      address: "1-19-1 Kabukicho, Shinjuku",
      distance: "1 min to Shinjuku Station",
      price: "Y15,000/night",
      rating: "8.5/10",
      features: [                      // Bullet points
        "Godzilla head on roof",
        "Free WiFi",
        "Coin laundry"
      ],
      badge: "Recommended",            // Badge text (optional)
      badgeColor: "",                  // CSS color (optional)
      links: [
        { label: "Booking.com", url: "https://..." },
        { label: "Agoda", url: "https://..." }
      ]
    }
  ],

  // --- Optional: Booking checklist ---
  checklist: [
    {
      group: "Must Book Ahead",        // Section heading
      items: [
        {
          id: "teamlab",               // Unique within trip (used for localStorage)
          label: "teamLab Borderless",
          meta: "Timed entry, sells out",
          links: [
            { text: "Official site", url: "https://..." }
          ]
        }
      ]
    }
  ]
};
```

### Step 2: Register the trip

In `js/trips/registry.js`, import your trip and add it to the built-in set:

```js
import { melbourne2026 } from './melbourne-2026.js';
import { myTrip } from './my-trip.js';

const BUILTIN_IDS = new Set([melbourne2026.id, myTrip.id]);

export function getAllTrips() {
  return [melbourne2026, myTrip, ...getCustomTrips()];
}
```

### Step 3: Done

Refresh the page. Your trip appears on the dashboard and is fully navigable.

## Day Builder (Custom Trips)

Trips created from the dashboard UI are "custom trips" stored in localStorage. These get edit controls:

- **+ Add Day** button in the sidebar
- **Edit/Delete** buttons on day headers (visible on hover)
- **+ Add Activity** button at the end of each day's timeline
- **Edit/Delete/Reorder** buttons on activity cards (visible on hover)

The builder uses modals with weather pickers and activity type selectors. All changes auto-save to localStorage and the view re-renders immediately.

Built-in trips (registered in `BUILTIN_IDS`) are read-only - no edit controls appear.

## Customization

### Colors

Override the CSS custom properties in `css/style.css` or per-trip via `trip.theme`:

```css
:root {
  --tram-gold: #C5933A;      /* Accent / primary */
  --bluestone: #2C363F;      /* Sidebar background */
  --limestone: #F8F4EC;      /* Surface background */
  --cream: #FFFCF7;          /* Card background */
  --ink-primary: #3A322A;    /* Primary text */
  --ink-secondary: #5A534B;  /* Secondary text */
}
```

### Fonts

The app uses Google Fonts loaded in `index.html`:
- **DM Sans** - body text
- **DM Serif Display** - headings
- **JetBrains Mono** - mono/code elements

### Activity Types

Four types with color-coded timeline dots: `transport`, `food`, `culture`, `nature`. Defined in `day-builder-ui.js` and styled in `css/style.css`.

## Architecture Notes

- **No build step** - vanilla ES modules, served as-is
- **No dependencies** - zero npm packages
- **Immutable data** - all trip mutations in `day-builder.js` return new objects
- **XSS safe** - all user input goes through `escapeHtml()` before innerHTML
- **Event delegation** - builder controls use delegation on `.main` and `.sidebar` for dynamic content
- **~12 files, ~3000 lines total** - small enough to understand in one sitting

## License

MIT
