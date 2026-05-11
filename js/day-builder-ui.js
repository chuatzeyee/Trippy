import {
  addDay, updateDay, removeDay,
  addActivity, updateActivity, removeActivity, moveActivity,
  escapeHtml, maxDays
} from './day-builder.js';
import { saveCustomTrip, getTripById } from './trips/registry.js';

let reRenderFn = null;

const WEATHER_ICONS = ['☀️', '⛅', '☁️', '🌧️', '🌦️', '🌩️', '🌬️', '❄️'];
const ACTIVITY_TYPES = [
  { value: 'food', label: '🍽️ Food' },
  { value: 'transport', label: '🚌 Transport' },
  { value: 'culture', label: '🏛️ Culture' },
  { value: 'nature', label: '🌿 Nature' }
];

function removeModal() {
  document.getElementById('builder-modal')?.remove();
}

function showConfirm(message, onConfirm) {
  const el = document.createElement('div');
  el.className = 'builder-confirm-overlay';
  el.innerHTML = `<div class="builder-confirm">
    <p>${escapeHtml(message)}</p>
    <div class="builder-confirm-actions">
      <button class="btn-cancel" data-action="cancel">Cancel</button>
      <button class="btn-delete" data-action="delete">Delete</button>
    </div>
  </div>`;
  document.body.appendChild(el);
  el.addEventListener('click', (e) => {
    if (e.target.dataset.action === 'cancel' || e.target === el) el.remove();
    if (e.target.dataset.action === 'delete') { el.remove(); onConfirm(); }
  });
}

function save(trip) {
  saveCustomTrip(trip);
  if (reRenderFn) reRenderFn();
}

function showDayModal(trip, dayIndex) {
  removeModal();
  const isEdit = dayIndex !== null && dayIndex !== undefined;
  const day = isEdit ? trip.days[dayIndex] : null;
  const max = maxDays(trip);
  const currentCount = trip.days?.length || 0;

  if (!isEdit && currentCount >= max) {
    showConfirm(`This trip spans ${max} days. You already have ${currentCount} days planned.`, () => {});
    return;
  }

  const modal = document.createElement('div');
  modal.id = 'builder-modal';
  modal.className = 'modal-overlay';
  modal.innerHTML = `<div class="modal">
    <h2>${isEdit ? 'Edit Day' : 'Add Day'}</h2>
    <form id="builder-day-form">
      <label>
        <span>Title</span>
        <input type="text" name="title" required placeholder="e.g. Arrival & Exploration" value="${isEdit ? escapeHtml(day.title) : ''}">
      </label>
      <label>
        <span>Theme</span>
        <input type="text" name="theme" placeholder="e.g. Temples & Street Food" value="${isEdit ? escapeHtml(day.theme) : ''}">
      </label>
      <label>
        <span>Weather</span>
        <div class="weather-picker">
          ${WEATHER_ICONS.map(icon => `<label><input type="radio" name="weatherIcon" value="${icon}" ${(isEdit ? day.weather.icon : '☁️') === icon ? 'checked' : ''}><span>${icon}</span></label>`).join('')}
        </div>
      </label>
      <div class="form-row">
        <label>
          <span>High (°C)</span>
          <input type="number" name="weatherHigh" value="${isEdit ? day.weather.high : 20}">
        </label>
        <label>
          <span>Low (°C)</span>
          <input type="number" name="weatherLow" value="${isEdit ? day.weather.low : 10}">
        </label>
      </div>
      <label>
        <span>Weather Description</span>
        <input type="text" name="weatherDesc" placeholder="e.g. Sunny, warm" value="${isEdit ? escapeHtml(day.weather.desc) : ''}">
      </label>
      <div class="modal-actions">
        <button type="button" class="btn-cancel" id="builder-cancel">Cancel</button>
        <button type="submit" class="btn-create">${isEdit ? 'Save' : 'Add Day'}</button>
      </div>
    </form>
  </div>`;

  document.body.appendChild(modal);
  modal.querySelector('#builder-cancel').addEventListener('click', removeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) removeModal(); });

  modal.querySelector('#builder-day-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const dayData = {
      title: fd.get('title').trim(),
      theme: fd.get('theme').trim(),
      weather: {
        high: parseInt(fd.get('weatherHigh')) || 20,
        low: parseInt(fd.get('weatherLow')) || 10,
        icon: fd.get('weatherIcon') || '☁️',
        desc: fd.get('weatherDesc').trim()
      }
    };
    removeModal();
    const updated = isEdit ? updateDay(trip, dayIndex, dayData) : addDay(trip, dayData);
    save(updated);
  });
}

function showActivityModal(trip, dayIndex, activityIndex) {
  removeModal();
  const isEdit = activityIndex !== null && activityIndex !== undefined;
  const act = isEdit ? trip.days[dayIndex].activities[activityIndex] : null;

  const modal = document.createElement('div');
  modal.id = 'builder-modal';
  modal.className = 'modal-overlay';
  modal.innerHTML = `<div class="modal">
    <h2>${isEdit ? 'Edit Activity' : 'Add Activity'}</h2>
    <form id="builder-activity-form">
      <div class="form-row">
        <label>
          <span>Time</span>
          <input type="time" name="time" required value="${isEdit ? act.time : '09:00'}">
        </label>
        <label>
          <span>Title</span>
          <input type="text" name="title" required placeholder="e.g. Visit Senso-ji Temple" value="${isEdit ? escapeHtml(act.title) : ''}">
        </label>
      </div>
      <label>
        <span>Type</span>
        <div class="type-select">
          ${ACTIVITY_TYPES.map(t => `<label><input type="radio" name="type" value="${t.value}" ${(isEdit ? act.type : 'culture') === t.value ? 'checked' : ''}>${t.label}</label>`).join('')}
        </div>
      </label>
      <label>
        <span>Description</span>
        <textarea name="desc" placeholder="What to expect, tips, atmosphere...">${isEdit ? escapeHtml(act.desc) : ''}</textarea>
      </label>
      <div class="form-row">
        <label>
          <span>Cost (${escapeHtml(trip.currency?.symbol || '$')})</span>
          <input type="number" name="costAud" min="0" step="1" value="${isEdit ? (act.cost?.aud || 0) : 0}">
        </label>
        <label>
          <span>Cost Note</span>
          <input type="text" name="costNote" placeholder="e.g. Entry fee pp" value="${isEdit ? escapeHtml(act.cost?.note || '') : ''}">
        </label>
      </div>
      <label>
        <span>Map Link</span>
        <input type="url" name="map" placeholder="https://maps.google.com/..." value="${isEdit ? escapeHtml(act.map || '') : ''}">
      </label>
      <label>
        <span>Booking Link</span>
        <input type="url" name="booking" placeholder="https://..." value="${isEdit ? escapeHtml(act.booking || '') : ''}">
      </label>
      <div class="modal-actions">
        <button type="button" class="btn-cancel" id="builder-cancel">Cancel</button>
        <button type="submit" class="btn-create">${isEdit ? 'Save' : 'Add Activity'}</button>
      </div>
    </form>
  </div>`;

  document.body.appendChild(modal);
  modal.querySelector('#builder-cancel').addEventListener('click', removeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) removeModal(); });

  modal.querySelector('#builder-activity-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const data = {
      time: fd.get('time'),
      title: fd.get('title').trim(),
      type: fd.get('type') || 'culture',
      desc: fd.get('desc').trim(),
      costAud: parseFloat(fd.get('costAud')) || 0,
      costNote: fd.get('costNote').trim(),
      map: fd.get('map').trim(),
      booking: fd.get('booking').trim()
    };
    removeModal();
    const updated = isEdit
      ? updateActivity(trip, dayIndex, activityIndex, data)
      : addActivity(trip, dayIndex, data);
    save(updated);
  });
}

function injectDayControls(trip) {
  document.querySelectorAll('.day-header').forEach((header, i) => {
    if (header.querySelector('.builder-toolbar')) return;
    const toolbar = document.createElement('div');
    toolbar.className = 'builder-toolbar';
    toolbar.innerHTML = `
      <button class="builder-btn" data-action="edit-day" data-day="${i}" title="Edit day">&#9998;</button>
      <button class="builder-btn danger" data-action="delete-day" data-day="${i}" title="Delete day">&#128465;</button>`;
    header.appendChild(toolbar);
  });
}

function injectActivityControls(trip) {
  document.querySelectorAll('.day-content').forEach((dayEl) => {
    const dayId = dayEl.id;
    if (!dayId || dayId === 'overview') return;
    const dayNum = parseInt(dayId.replace('day-', ''));
    const dayIndex = trip.days.findIndex(d => d.num === dayNum);
    if (dayIndex < 0) return;

    const titledActivities = trip.days[dayIndex].activities.filter(a => a.title);
    dayEl.querySelectorAll('.activity-card').forEach((card, actIdx) => {
      if (card.querySelector('.builder-toolbar')) return;
      const count = titledActivities.length;
      const toolbar = document.createElement('div');
      toolbar.className = 'builder-toolbar';
      let html = '';
      if (actIdx > 0) html += `<button class="builder-btn" data-action="move-up" data-day="${dayIndex}" data-act="${actIdx}" title="Move up">&#9650;</button>`;
      if (actIdx < count - 1) html += `<button class="builder-btn" data-action="move-down" data-day="${dayIndex}" data-act="${actIdx}" title="Move down">&#9660;</button>`;
      html += `<button class="builder-btn" data-action="edit-activity" data-day="${dayIndex}" data-act="${actIdx}" title="Edit">&#9998;</button>`;
      html += `<button class="builder-btn danger" data-action="delete-activity" data-day="${dayIndex}" data-act="${actIdx}" title="Delete">&#128465;</button>`;
      toolbar.innerHTML = html;
      card.appendChild(toolbar);
    });

    const timeline = dayEl.querySelector('.timeline');
    if (timeline && !dayEl.querySelector('.builder-add-activity')) {
      const btn = document.createElement('button');
      btn.className = 'builder-add-activity';
      btn.dataset.action = 'add-activity';
      btn.dataset.day = String(dayIndex);
      btn.textContent = '+ Add Activity';
      timeline.after(btn);
    }
  });
}

function injectSidebarAddButton() {
  const nav = document.getElementById('sidebar-nav');
  if (!nav || nav.querySelector('.builder-add-day')) return;
  const btn = document.createElement('button');
  btn.className = 'builder-add-day';
  btn.dataset.action = 'add-day-sidebar';
  btn.textContent = '+ Add Day';
  nav.after(btn);
}

function injectEmptyStateButton() {
  const empty = document.querySelector('.empty-trip');
  if (!empty || empty.querySelector('.builder-start-btn')) return;
  const btn = document.createElement('button');
  btn.className = 'builder-start-btn';
  btn.dataset.action = 'add-day-empty';
  btn.textContent = '+ Add Your First Day';
  empty.appendChild(btn);
}

function handleClick(trip, e) {
  const btn = e.target.closest('[data-action]');
  if (!btn) return;

  const action = btn.dataset.action;
  const dayIdx = btn.dataset.day !== undefined ? parseInt(btn.dataset.day) : null;
  const actIdx = btn.dataset.act !== undefined ? parseInt(btn.dataset.act) : null;
  const freshTrip = getTripById(trip.id) || trip;

  switch (action) {
    case 'add-day-sidebar':
    case 'add-day-empty':
      showDayModal(freshTrip, null);
      break;
    case 'edit-day':
      showDayModal(freshTrip, dayIdx);
      break;
    case 'delete-day':
      showConfirm(`Delete Day ${freshTrip.days[dayIdx].num}: ${freshTrip.days[dayIdx].title}?`, () => {
        save(removeDay(freshTrip, dayIdx));
      });
      break;
    case 'add-activity':
      showActivityModal(freshTrip, dayIdx, null);
      break;
    case 'edit-activity':
      showActivityModal(freshTrip, dayIdx, actIdx);
      break;
    case 'delete-activity': {
      const act = freshTrip.days[dayIdx].activities[actIdx];
      showConfirm(`Delete "${act.title}"?`, () => {
        save(removeActivity(freshTrip, dayIdx, actIdx));
      });
      break;
    }
    case 'move-up':
      save(moveActivity(freshTrip, dayIdx, actIdx, -1));
      break;
    case 'move-down':
      save(moveActivity(freshTrip, dayIdx, actIdx, 1));
      break;
  }
}

export function initDayBuilder(trip, reRender) {
  reRenderFn = reRender;

  injectDayControls(trip);
  injectActivityControls(trip);
  injectSidebarAddButton();
  injectEmptyStateButton();

  const main = document.querySelector('.main');
  const sidebar = document.querySelector('.sidebar');

  const listener = (e) => handleClick(trip, e);
  if (main?._builderListener) main.removeEventListener('click', main._builderListener);
  if (sidebar?._builderListener) sidebar.removeEventListener('click', sidebar._builderListener);
  if (main) { main.addEventListener('click', listener); main._builderListener = listener; }
  if (sidebar) { sidebar.addEventListener('click', listener); sidebar._builderListener = listener; }
}
