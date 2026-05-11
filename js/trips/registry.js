import { melbourne2026 } from './melbourne-2026.js';

const STORAGE_KEY = 'trippy_custom_trips';

function getCustomTrips() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch { return []; }
}

export function getAllTrips() {
  return [melbourne2026, ...getCustomTrips()];
}

export function getTripById(id) {
  return getAllTrips().find(t => t.id === id) || null;
}

export function saveCustomTrip(trip) {
  const custom = getCustomTrips();
  const idx = custom.findIndex(t => t.id === trip.id);
  if (idx >= 0) {
    custom[idx] = trip;
  } else {
    custom.push(trip);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(custom));
}

export function deleteCustomTrip(id) {
  const custom = getCustomTrips().filter(t => t.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(custom));
}
