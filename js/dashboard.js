import { getAllTrips, saveCustomTrip } from './trips/registry.js';
import { navigate } from './router.js';

function formatDateRange(start, end) {
  const s = new Date(start + 'T00:00:00');
  const e = new Date(end + 'T00:00:00');
  const opts = { day: 'numeric', month: 'short', year: 'numeric' };
  return `${s.toLocaleDateString('en-GB', opts)} — ${e.toLocaleDateString('en-GB', opts)}`;
}

function dayCount(start, end) {
  const ms = new Date(end + 'T00:00:00') - new Date(start + 'T00:00:00');
  return Math.round(ms / 86400000) + 1;
}

function daysUntil(start) {
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const tripStart = new Date(start + 'T00:00:00');
  const diff = Math.ceil((tripStart - startOfToday) / 86400000);
  if (diff > 0) return `${diff} day${diff === 1 ? '' : 's'} away`;
  if (diff === 0) return 'Today!';
  return 'Completed';
}

export function renderDashboard() {
  const app = document.getElementById('app');
  const trips = getAllTrips();

  let html = `
    <div class="dashboard">
      <div class="dash-header">
        <div class="dash-header-content">
          <h1>✈️ Trippy</h1>
          <p class="dash-subtitle">Your trips, your way.</p>
        </div>
      </div>
      <div class="dash-grid">`;

  trips.forEach(trip => {
    const days = dayCount(trip.dates.start, trip.dates.end);
    const status = daysUntil(trip.dates.start);
    html += `
      <a class="trip-card" href="#/trip/${trip.id}">
        <div class="trip-card-img" style="background-image:url('${trip.coverImage || ''}')">
          <span class="trip-card-emoji">${trip.emoji || '🌍'}</span>
        </div>
        <div class="trip-card-body">
          <h3>${trip.title}</h3>
          <p class="trip-card-dest">${trip.destination || ''}</p>
          <p class="trip-card-dates">${formatDateRange(trip.dates.start, trip.dates.end)}</p>
          <div class="trip-card-meta">
            <span class="trip-card-days">${days} days</span>
            <span class="trip-card-status">${status}</span>
          </div>
        </div>
      </a>`;
  });

  html += `
      <button class="trip-card trip-card-new" id="new-trip-btn">
        <div class="trip-card-new-icon">+</div>
        <h3>New Trip</h3>
        <p>Plan your next adventure</p>
      </button>
    </div>
  </div>`;

  app.innerHTML = html;

  document.getElementById('new-trip-btn').addEventListener('click', () => {
    showNewTripModal();
  });
}

function showNewTripModal() {
  const existing = document.getElementById('new-trip-modal');
  if (existing) existing.remove();

  const modal = document.createElement('div');
  modal.id = 'new-trip-modal';
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="modal">
      <h2>Create New Trip</h2>
      <form id="new-trip-form">
        <label>
          <span>Trip Name</span>
          <input type="text" name="title" required placeholder="e.g. Tokyo 2027">
        </label>
        <label>
          <span>Destination</span>
          <input type="text" name="destination" required placeholder="e.g. Tokyo, Japan">
        </label>
        <label>
          <span>Emoji</span>
          <input type="text" name="emoji" maxlength="4" placeholder="🗼" value="🌍">
        </label>
        <div class="form-row">
          <label>
            <span>Start Date</span>
            <input type="date" name="startDate" required>
          </label>
          <label>
            <span>End Date</span>
            <input type="date" name="endDate" required>
          </label>
        </div>
        <label>
          <span>Travelers</span>
          <input type="number" name="travelers" min="1" max="20" value="2">
        </label>
        <div class="form-row">
          <label>
            <span>Currency Code</span>
            <input type="text" name="currCode" maxlength="3" placeholder="JPY" value="AUD">
          </label>
          <label>
            <span>Currency Symbol</span>
            <input type="text" name="currSymbol" maxlength="4" placeholder="¥" value="A$">
          </label>
          <label>
            <span>Rate to Home</span>
            <input type="number" name="rate" step="0.001" min="0" placeholder="0.915" value="1">
          </label>
        </div>
        <div class="modal-actions">
          <button type="button" class="btn-cancel" id="cancel-trip">Cancel</button>
          <button type="submit" class="btn-create">Create Trip</button>
        </div>
      </form>
    </div>`;

  document.body.appendChild(modal);

  document.getElementById('cancel-trip').addEventListener('click', () => modal.remove());
  modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });

  document.getElementById('new-trip-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const id = fd.get('title').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '');
    const trip = {
      id,
      title: fd.get('title'),
      subtitle: '',
      emoji: fd.get('emoji') || '🌍',
      destination: fd.get('destination'),
      dates: { start: fd.get('startDate'), end: fd.get('endDate') },
      travelers: parseInt(fd.get('travelers')) || 2,
      currency: {
        code: fd.get('currCode') || 'AUD',
        symbol: fd.get('currSymbol') || 'A$',
        rate: parseFloat(fd.get('rate')) || 1,
        homeCurrency: 'SGD',
        homeSymbol: 'S$'
      },
      coverImage: '',
      theme: {},
      days: []
    };
    saveCustomTrip(trip);
    modal.remove();
    navigate(`/trip/${id}`);
  });
}
