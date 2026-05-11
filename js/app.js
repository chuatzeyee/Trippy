import { addRoute, start, navigate } from './router.js';
import { getTripById, getAllTrips, isCustomTrip } from './trips/registry.js';
import { renderDashboard } from './dashboard.js';
import { initDayBuilder } from './day-builder-ui.js';

let currentTrip = null;

function renderTrip(tripId) {
  const trip = getTripById(tripId);
  if (!trip) return navigate('/');
  currentTrip = trip;
  document.body.classList.remove('dashboard-view');
  document.body.classList.add('trip-view');
  applyTripTheme(trip);
  renderTripShell(trip);
  renderSidebar(trip);
  renderDays(trip);
  calculateTripTotals(trip);
  initDayCounter(trip);
  initAccomSelector(trip);
  initChecklist(trip);
  initMobileMenu();
  if (isCustomTrip(trip.id)) {
    initDayBuilder(trip, () => renderTrip(trip.id));
  }
}

addRoute('/', () => {
  document.body.classList.remove('trip-view');
  document.body.classList.add('dashboard-view');
  renderDashboard();
});

addRoute('/trip/:tripId', (params) => {
  renderTrip(params.tripId);
});

function applyTripTheme(trip) {
  const root = document.documentElement;
  if (trip.theme) {
    if (trip.theme.primary) root.style.setProperty('--tram-gold', trip.theme.primary);
    if (trip.theme.sidebar) root.style.setProperty('--bluestone', trip.theme.sidebar);
    if (trip.theme.surface) root.style.setProperty('--limestone', trip.theme.surface);
    if (trip.theme.card) root.style.setProperty('--cream', trip.theme.card);
  }
  document.title = `${trip.title} - Trippy`;
  const favicon = document.querySelector('link[rel="icon"]');
  if (favicon && trip.emoji) {
    favicon.href = `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${trip.emoji}</text></svg>`;
  }
}

function renderTripShell(trip) {
  const app = document.getElementById('app');
  const toSGD = (aud) => (aud * (trip.currency?.rate || 1)).toFixed(0);
  const homeSym = trip.currency?.homeSymbol || 'S$';
  const sym = trip.currency?.symbol || 'A$';
  const rate = trip.currency?.rate || 1;

  app.innerHTML = `
    <div class="sidebar-overlay"></div>
    <div class="mobile-header">
      <h1>${trip.title}</h1>
      <button class="hamburger" id="hamburger" aria-label="Menu">☰</button>
    </div>
    <nav class="sidebar">
      <div class="sidebar-header">
        <a href="#/" class="back-link">← All Trips</a>
        <h1>${trip.emoji} ${trip.title}</h1>
        <p>${formatTripDates(trip)} &bull; ${tripNights(trip)} Nights</p>
      </div>
      <div class="sidebar-nav" id="sidebar-nav"></div>
      <div class="sidebar-footer">
        1 ${trip.currency?.code || 'AUD'} = ${rate} ${trip.currency?.homeCurrency || 'SGD'}<br>
        TY ❤️ Anita
      </div>
    </nav>
    <main class="main">
      <div class="day-content active" id="overview">
        ${renderOverview(trip)}
      </div>
      <div id="days-container"></div>
    </main>`;
}

function formatTripDates(trip) {
  const s = new Date(trip.dates.start + 'T00:00:00');
  const e = new Date(trip.dates.end + 'T00:00:00');
  const d = (dt) => `${dt.getDate()} ${dt.toLocaleString('en', { month: 'short' })}`;
  return `${d(s)} to ${d(e)}`;
}

function tripNights(trip) {
  return Math.round((new Date(trip.dates.end + 'T00:00:00') - new Date(trip.dates.start + 'T00:00:00')) / 86400000);
}

function tripDays(trip) {
  return tripNights(trip) + 1;
}

function renderOverview(trip) {
  const toHome = (v) => (v * (trip.currency?.rate || 1)).toFixed(0);
  const sym = trip.currency?.symbol || 'A$';
  const homeSym = trip.currency?.homeSymbol || 'S$';
  const rate = trip.currency?.rate || 1;
  const numDays = tripDays(trip);
  const numNights = tripNights(trip);

  let html = `
    <div class="hero">
      <span class="hero-badge">${numDays} Days &bull; ${numNights} Nights</span>
      <h2>${trip.subtitle || trip.title}</h2>
      <div class="hero-meta">
        <div class="hero-meta-item">📅 ${formatTripDates(trip)}</div>
        <div class="hero-meta-item">👫 ${trip.travelers || 2} Adults</div>
        <div class="hero-meta-item">📍 ${trip.destination}</div>
      </div>
      <div class="day-counter" id="day-counter"></div>
    </div>`;

  if (!trip.days || !trip.days.length) {
    html += `
      <div class="empty-trip">
        <div class="empty-icon">🗺️</div>
        <h3>No itinerary yet</h3>
        <p>This trip doesn't have any days planned. Use Google Takeout to import your saved places, or plan your days manually.</p>
      </div>`;
    return html;
  }

  html += `<h3 class="section-heading">📌 Trip Essentials</h3>
    <div class="overview-grid">`;

  if (trip.essentials) {
    trip.essentials.forEach(e => {
      html += `<div class="overview-card"><h3>${e.icon} ${e.title}</h3><div class="value" style="font-size:18px">${e.value}</div><div class="detail">${e.detail}</div></div>`;
    });
  }

  html += `<div class="overview-card exchange-card">
        <h3>💱 Exchange Rate</h3>
        <div class="exchange-hero">
          <div class="exchange-side"><span class="exchange-cur">${trip.currency?.code || 'AUD'}</span></div>
          <div class="exchange-rate-val">${rate}</div>
          <div class="exchange-side"><span class="exchange-cur">${trip.currency?.homeCurrency || 'SGD'}</span></div>
        </div>
        <div class="exchange-grid">
          <div class="exchange-pair"><span>${sym}50</span><span>${homeSym}${toHome(50)}</span></div>
          <div class="exchange-pair"><span>${sym}100</span><span>${homeSym}${toHome(100)}</span></div>
          <div class="exchange-pair"><span>${sym}200</span><span>${homeSym}${toHome(200)}</span></div>
          <div class="exchange-pair"><span>${sym}500</span><span>${homeSym}${toHome(500)}</span></div>
        </div>
      </div>
    </div>`;

  if (trip.flights) {
    html += `<h3 class="section-heading">✈️ Flights</h3><div class="flight-cards">`;
    ['outbound', 'inbound'].forEach(dir => {
      const f = trip.flights[dir];
      if (!f) return;
      const label = dir === 'outbound' ? 'Outbound' : 'Return';
      const fromCode = f.from.split(' ')[0];
      const toCode = f.to.split(' ')[0];
      const fromTerminal = f.from.includes(' ') ? f.from.split(' ').slice(1).join(' ') : '';
      const toTerminal = f.to.includes(' ') ? f.to.split(' ').slice(1).join(' ') : '';
      const departParts = f.depart.match(/^(\d{1,2}:\d{2})\s*(\w+)?,?\s*(.*)$/);
      const arriveParts = f.arrive.match(/^(\d{1,2}:\d{2})\s*(\w+)?,?\s*(.*)$/);
      const dTime = departParts ? departParts[1] : f.depart;
      const dTz = departParts && departParts[2] ? departParts[2] : '';
      const dDate = departParts && departParts[3] ? departParts[3] : '';
      const aTime = arriveParts ? arriveParts[1] : f.arrive;
      const aTz = arriveParts && arriveParts[2] ? arriveParts[2] : '';
      const aDate = arriveParts && arriveParts[3] ? arriveParts[3] : '';
      const logoHtml = f.logo ? `<img class="flight-card-logo" src="${f.logo}" alt="${f.airline}">` : '';
      html += `<div class="flight-card">
        <div class="flight-card-header">
          <span class="flight-card-label">${label}</span>
          <div class="flight-card-airline">${logoHtml}<span class="flight-card-code">${f.code}</span></div>
        </div>
        <div class="flight-route">
          <div class="flight-airport">
            <span class="flight-airport-code">${fromCode}</span>
            <span class="flight-airport-name">${fromTerminal}</span>
          </div>
          <div class="flight-path">
            <div class="flight-path-line"></div>
            <span class="flight-path-duration">${f.duration}</span>
          </div>
          <div class="flight-airport">
            <span class="flight-airport-code">${toCode}</span>
            <span class="flight-airport-name">${toTerminal}</span>
          </div>
        </div>
        <div class="flight-times">
          <div class="flight-time-block">
            <span class="flight-time-label">Departs</span>
            <span class="flight-time-value">${dTime} <small style="font-size:10px;opacity:0.6">${dTz}</small></span>
            <span class="flight-time-date">${dDate}</span>
          </div>
          <div class="flight-time-block">
            <span class="flight-time-label">Arrives</span>
            <span class="flight-time-value">${aTime} <small style="font-size:10px;opacity:0.6">${aTz}</small></span>
            <span class="flight-time-date">${aDate}</span>
          </div>
        </div>
        <div class="flight-meta">
          <span class="flight-meta-tag">🛩️ ${f.aircraft}</span>
        </div>
      </div>`;
    });
    html += `</div>`;
  }

  html += `<h3 class="section-heading">📅 ${numDays}-Day Overview</h3>
    <div class="overview-grid" style="grid-template-columns:1fr">
      <div class="overview-card" style="padding:0;overflow:hidden">
        <div class="table-scroll">
        <table style="width:100%;border-collapse:collapse;font-size:13px;min-width:600px">
          <thead><tr style="background:var(--limestone,#F8F4EC)"><th style="text-align:left;padding:10px 16px;font-size:11px;text-transform:uppercase;color:var(--ink-tertiary,#8A7E72)">Day</th><th style="text-align:left;padding:10px 16px;font-size:11px;text-transform:uppercase;color:var(--ink-tertiary,#8A7E72)">Date</th><th style="text-align:left;padding:10px 16px;font-size:11px;text-transform:uppercase;color:var(--ink-tertiary,#8A7E72)">Theme</th><th style="text-align:left;padding:10px 16px;font-size:11px;text-transform:uppercase;color:var(--ink-tertiary,#8A7E72)">Highlights</th></tr></thead>
          <tbody>`;

  trip.days.forEach((d, i) => {
    const bg = i % 2 ? `background:var(--limestone,#FAF6EE)` : '';
    const highlights = d.activities.filter(a => a.title).map(a => a.title).slice(0, 4).join(', ');
    html += `<tr style="border-top:1px solid var(--border,#E8E0D4);${bg}"><td style="padding:10px 16px;font-weight:600">${d.num}</td><td style="padding:10px 16px">${d.date}</td><td style="padding:10px 16px">${d.theme}</td><td style="padding:10px 16px">${highlights}</td></tr>`;
  });

  html += `</tbody></table></div></div></div>`;

  if (trip.accommodation && trip.accommodation.length) {
    html += `<h3 class="section-heading">🏨 Accommodation Options</h3>
      <p style="font-size:13px;color:var(--ink-secondary);margin:0 0 var(--sp-3);padding-left:var(--sp-10)">Click a card to select your hotel. Your choice is saved locally.</p>
      <button class="accom-deselect" id="accom-deselect" style="display:none">✕ Clear selection</button>
      <div class="accom-strip-wrapper"><div class="accom-strip">`;
    trip.accommodation.forEach(a => {
      html += `<div class="accom-card${a.recommended ? ' recommended' : ''}" data-accom="${a.id}">`;
      if (a.img) html += `<img class="accom-card-img" src="${a.img}" alt="${a.name}" loading="lazy" onerror="this.classList.add('error');this.outerHTML='<div class=\\'accom-card-img error\\' style=\\'display:flex;align-items:center;justify-content:center;font-size:32px\\'>🏨</div>'">`;
      html += `<div class="accom-card-body">`;
      if (a.badge) html += `<div class="badge" ${a.badgeColor ? `style="background:${a.badgeColor}"` : ''}>${a.badge}</div>`;
      html += `<h4>${a.name}</h4>`;
      html += `<div class="accom-addr">${a.address} · ${a.distance}</div>`;
      html += `<div class="accom-price">${a.price}</div>`;
      if (a.rating) html += `<div class="accom-rating">★ ${a.rating}</div>`;
      if (a.features) {
        html += '<ul>';
        a.features.forEach(f => html += `<li>${f}</li>`);
        html += '</ul>';
      }
      if (a.links) {
        html += '<div class="accom-links">';
        a.links.forEach(l => html += `<a href="${l.url}" target="_blank" rel="noopener">${l.label}</a>`);
        html += '</div>';
      }
      html += '</div></div>';
    });
    html += '</div></div>';
  }

  if (trip.checklist && trip.checklist.length) {
    const totalItems = trip.checklist.reduce((n, g) => n + g.items.length, 0);
    html += `<h3 class="section-heading">📋 Booking Checklist</h3>
      <div style="padding:0 var(--sp-10)">
      <div class="overview-card checklist-card">
        <div class="checklist-progress"><div class="checklist-progress-bar" style="width:0%"></div></div>
        <div class="checklist-progress-text">0 / ${totalItems} booked</div>`;
    trip.checklist.forEach(group => {
      html += `<div class="checklist-group"><div class="checklist-group-title">${group.group}</div>`;
      group.items.forEach(item => {
        html += `<label class="checklist-item"><input type="checkbox" data-booking="${item.id}"><span class="checklist-check"></span><span class="checklist-label"><strong>${item.label}</strong>`;
        if (item.meta) html += ` <span style="color:var(--ink-tertiary);font-size:11px">${item.meta}</span>`;
        if (item.links && item.links.length) {
          item.links.forEach(l => html += ` <a href="${l.url}" target="_blank" rel="noopener">${l.text}</a>`);
        }
        html += `</span></label>`;
      });
      html += '</div>';
    });
    html += '</div></div>';
  }

  const homeSym = trip.currency?.homeSymbol || 'S$';
  const fixedHtml = trip.fixedCosts ? `
    <div class="overview-grid">
      <div class="overview-card"><h3>✈️ Flights</h3><div class="value">${homeSym}${trip.fixedCosts.flights.totalSGD.toLocaleString()}</div><div class="detail">${homeSym}${trip.fixedCosts.flights.perPerson.toLocaleString()} pp</div><div class="detail">${trip.fixedCosts.flights.note}</div></div>
      <div class="overview-card"><h3>🏨 Accommodation</h3><div class="value">${homeSym}${trip.fixedCosts.accommodation.totalSGD.toLocaleString()}</div><div class="detail">${homeSym}${trip.fixedCosts.accommodation.perPerson.toLocaleString()} pp (${trip.fixedCosts.accommodation.nights} nights)</div><div class="detail">${trip.fixedCosts.accommodation.note}</div></div>
    </div>` : '';
  html += `<h3 class="section-heading">💰 Trip Budget (Per Person)</h3>
    ${fixedHtml}
    <div class="overview-grid"${trip.fixedCosts ? ' style="padding-top:0"' : ''}>
      <div class="overview-card"><h3>🚌 Transport</h3><div class="value" id="total-transport">-</div></div>
      <div class="overview-card"><h3>🍽️ Food & Drink</h3><div class="value" id="total-food">-</div></div>
      <div class="overview-card"><h3>🎫 Activities</h3><div class="value" id="total-activities">-</div></div>
    </div>
    <div class="overview-grid" style="padding-top:0">
      <div class="overview-card" style="background:var(--bluestone,#2C363F);color:#fff;grid-column:1/-1">
        <h3 style="color:var(--tram-gold,#C5933A)">Trip Total</h3>
        <div style="display:flex;gap:32px;flex-wrap:wrap;align-items:baseline">
          <div><div class="value" style="color:#fff;font-size:24px"><span id="total-grand-sgd">-</span></div><div class="detail" style="color:rgba(255,255,255,.6)">Per Person</div></div>
          <div><div class="value" style="color:#fff;font-size:24px"><span id="total-grand-sgd-2x">-</span></div><div class="detail" style="color:rgba(255,255,255,.6)">For ${trip.travelers || 2} People</div></div>
        </div>
      </div>
    </div>`;

  return html;
}

function renderSidebar(trip) {
  const nav = document.getElementById('sidebar-nav');
  if (!nav) return;
  let html = '<button class="nav-btn active" data-day="overview"><span class="day-num">⌂</span><span class="nav-label">Trip Overview<small>Budget, Essentials</small></span></button>';
  if (trip.days) {
    trip.days.forEach(d => {
      html += `<button class="nav-btn" data-day="${d.num}"><span class="day-num">${d.num}</span><span class="nav-label">${d.title}<small>${d.date}</small></span></button>`;
    });
  }
  nav.innerHTML = html;
  nav.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      nav.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      showDay(btn.dataset.day);
      if (window.innerWidth <= 900) {
        document.querySelector('.sidebar')?.classList.remove('open');
        document.querySelector('.sidebar-overlay')?.classList.remove('open');
      }
    });
  });
}

function showDay(key) {
  document.querySelectorAll('.day-content').forEach(el => el.classList.remove('active'));
  const target = document.getElementById(key === 'overview' ? 'overview' : `day-${key}`);
  if (target) target.classList.add('active');
  window.scrollTo({ top: 0 });
}

function renderDays(trip) {
  const container = document.getElementById('days-container');
  if (!container || !trip.days) return;
  const toHome = (v) => (v * (trip.currency?.rate || 1)).toFixed(0);
  const fmt = (n) => Number(n).toLocaleString();
  const sym = trip.currency?.symbol || 'A$';
  const homeSym = trip.currency?.homeSymbol || 'S$';

  trip.days.forEach(d => {
    const section = document.createElement('div');
    section.className = 'day-content';
    section.id = `day-${d.num}`;
    let html = `<div class="day-header"><h2>Day ${d.num}: ${d.title}</h2><div class="day-subtitle">${d.date} &bull; ${d.theme}</div><div class="day-weather">${d.weather.icon} ${d.weather.desc} &bull; High ${d.weather.high}°C / Low ${d.weather.low}°C</div></div>`;
    html += '<div class="timeline">';
    d.activities.forEach(a => {
      if (!a.title) return;
      const dotClass = a.type || '';
      html += `<div class="timeline-item"><div class="timeline-time"><span>${a.time}</span></div><div class="timeline-dot ${dotClass}"></div><div class="activity-card">`;
      if (a.img) {
        html += `<img class="activity-card-img" src="${a.img}" alt="${a.title}" loading="lazy" onerror="this.classList.add('error');this.outerHTML='<div class=\\'activity-card-img error\\'>🏞️</div>'">`;
      }
      html += '<div class="activity-card-content"><div class="activity-body">';
      html += `<h3>${a.title}</h3>`;
      if (a.atmosphere && a.atmosphere.length) {
        html += '<div class="tags">';
        a.atmosphere.forEach(t => html += `<span class="tag tag-${t}">${t}</span>`);
        html += '</div>';
      }
      if (a.desc) html += `<div class="description">${a.desc}</div>`;
      html += '</div>';
      if (a.transport && a.transport.length) {
        html += '<div class="info-section"><h4>Getting There</h4><table class="transport-table"><thead><tr><th>Mode</th><th>Cost</th><th>Time</th><th>Note</th></tr></thead><tbody>';
        a.transport.forEach(t => {
          html += `<tr><td><strong>${t.mode}</strong></td><td>${t.cost}</td><td>${t.time}</td><td>${t.note || ''}</td></tr>`;
        });
        html += '</tbody></table></div>';
      }
      if (a.cost && (a.cost.aud > 0 || a.cost.note)) {
        html += `<div class="info-section"><h4>Cost</h4><div class="cost-row"><span class="cost-label">${a.cost.note || 'Entry'}</span><span class="cost-values"><span class="cost-aud">${sym}${fmt(a.cost.aud)}</span><span class="cost-sgd">~${homeSym}${fmt(toHome(a.cost.aud))}</span></span></div></div>`;
      }
      let links = '';
      if (a.map) links += `<a href="${a.map}" target="_blank" rel="noopener" class="action-link map">📍 Map</a>`;
      if (a.booking) links += `<a href="${a.booking}" target="_blank" rel="noopener" class="action-link book">📝 Reserve</a>`;
      if (links) html += `<div class="action-links">${links}</div>`;
      html += '</div></div></div>';
    });
    html += '</div>';

    if (d.dayCost) {
      const totalAUD = d.dayCost.transport + d.dayCost.food + d.dayCost.activities;
      html += `<div class="day-summary"><h3>💰 Day ${d.num} Estimated Cost (per person)</h3><div class="summary-grid">
        <div class="summary-item"><div class="label">Transport</div><div class="val">${sym}${fmt(d.dayCost.transport)} <small style="color:var(--ink-tertiary)">~${homeSym}${fmt(toHome(d.dayCost.transport))}</small></div></div>
        <div class="summary-item"><div class="label">Food & Drink</div><div class="val">${sym}${fmt(d.dayCost.food)} <small style="color:var(--ink-tertiary)">~${homeSym}${fmt(toHome(d.dayCost.food))}</small></div></div>
        <div class="summary-item"><div class="label">Activities</div><div class="val">${sym}${fmt(d.dayCost.activities)} <small style="color:var(--ink-tertiary)">~${homeSym}${fmt(toHome(d.dayCost.activities))}</small></div></div>
        <div class="summary-item" style="background:var(--bluestone,#2C363F);color:#fff;grid-column:1/-1"><div class="label" style="color:var(--tram-gold,#C5933A)">Day Total</div><div class="val" style="color:#fff">${sym}${fmt(totalAUD)} <small style="color:var(--tram-gold-soft,#E8C97A)">~${homeSym}${fmt(toHome(totalAUD))}</small></div></div>
      </div></div>`;
    }

    section.innerHTML = html;
    container.appendChild(section);
  });
}

function calculateTripTotals(trip) {
  if (!trip.days) return;
  const toHome = (v) => (v * (trip.currency?.rate || 1)).toFixed(0);
  const sym = trip.currency?.symbol || 'A$';
  const homeSym = trip.currency?.homeSymbol || 'S$';

  let totals = { transport: 0, food: 0, activities: 0 };
  trip.days.forEach(d => {
    if (!d.dayCost) return;
    totals.transport += d.dayCost.transport;
    totals.food += d.dayCost.food;
    totals.activities += d.dayCost.activities;
  });
  const dailySGD = toHome(totals.transport + totals.food + totals.activities);
  const fixedPP = trip.fixedCosts ? (trip.fixedCosts.flights.perPerson + trip.fixedCosts.accommodation.perPerson) : 0;
  const grandPP = (parseFloat(dailySGD) + fixedPP).toFixed(0);
  const travelers = trip.travelers || 2;
  const grandTotal = (parseFloat(grandPP) * travelers).toFixed(0);
  const el = (id, txt) => { const e = document.getElementById(id); if (e) e.textContent = txt; };
  const fmt = (n) => Number(n).toLocaleString();
  el('total-transport', `${sym}${fmt(totals.transport)} (${homeSym}${fmt(toHome(totals.transport))})`);
  el('total-food', `${sym}${fmt(totals.food)} (${homeSym}${fmt(toHome(totals.food))})`);
  el('total-activities', `${sym}${fmt(totals.activities)} (${homeSym}${fmt(toHome(totals.activities))})`);
  el('total-grand-sgd', `${homeSym}${parseFloat(grandPP).toLocaleString()}`);
  el('total-grand-sgd-2x', `${homeSym}${parseFloat(grandTotal).toLocaleString()}`);
}

function initDayCounter(trip) {
  const el = document.getElementById('day-counter');
  if (!el) return;
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfTrip = new Date(trip.dates.start + 'T00:00:00');
  const endOfTrip = new Date(trip.dates.end + 'T00:00:00');
  const numDays = tripDays(trip);

  if (startOfToday < startOfTrip) {
    const daysUntil = Math.ceil((startOfTrip - startOfToday) / 86400000);
    el.textContent = `${daysUntil} day${daysUntil === 1 ? '' : 's'} until departure`;
  } else if (startOfToday <= endOfTrip) {
    const dayNum = Math.floor((startOfToday - startOfTrip) / 86400000) + 1;
    el.textContent = `Day ${dayNum} of ${numDays}`;
    el.classList.add('active');
    const navBtn = document.querySelector(`.nav-btn[data-day="${dayNum}"]`);
    if (navBtn) navBtn.classList.add('active');
  } else {
    el.textContent = 'Trip completed';
  }
}

function initAccomSelector(trip) {
  const STORAGE_KEY = `trippy_${trip.id}_accom`;
  const cards = document.querySelectorAll('.accom-card[data-accom]');
  const deselect = document.getElementById('accom-deselect');
  if (!cards.length) return;

  function apply(selected) {
    cards.forEach(c => {
      c.classList.remove('selected', 'greyed');
      c.style.pointerEvents = '';
      if (selected && c.dataset.accom === selected) c.classList.add('selected');
      else if (selected) c.classList.add('greyed');
    });
    if (deselect) deselect.style.display = selected ? 'inline-block' : 'none';
  }

  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) apply(saved);

  cards.forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('a')) return;
      if (card.classList.contains('selected')) return;
      localStorage.setItem(STORAGE_KEY, card.dataset.accom);
      apply(card.dataset.accom);
    });
  });

  if (deselect) {
    deselect.addEventListener('click', () => {
      localStorage.removeItem(STORAGE_KEY);
      apply(null);
    });
  }
}

function initChecklist(trip) {
  const STORAGE_KEY = `trippy_${trip.id}_bookings`;
  const checkboxes = document.querySelectorAll('.checklist-item input[type="checkbox"]');
  if (!checkboxes.length) return;

  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  checkboxes.forEach(cb => {
    if (saved[cb.dataset.booking]) cb.checked = true;
  });

  function updateProgress() {
    const total = checkboxes.length;
    const checked = document.querySelectorAll('.checklist-item input[type="checkbox"]:checked').length;
    const bar = document.querySelector('.checklist-progress-bar');
    const text = document.querySelector('.checklist-progress-text');
    if (bar) bar.style.width = `${(checked / total) * 100}%`;
    if (text) text.textContent = `${checked} / ${total} booked`;
  }

  checkboxes.forEach(cb => {
    cb.addEventListener('change', () => {
      const state = {};
      checkboxes.forEach(c => { if (c.checked) state[c.dataset.booking] = true; });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      updateProgress();
    });
  });
  updateProgress();
}

function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.querySelector('.sidebar-overlay');
  if (hamburger && sidebar) {
    hamburger.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      overlay?.classList.toggle('open');
    });
  }
  if (overlay) {
    overlay.addEventListener('click', () => {
      sidebar?.classList.remove('open');
      overlay.classList.remove('open');
    });
  }
}

start();
