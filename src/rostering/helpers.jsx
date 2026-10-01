import { HOUR_W, SNAP_MINS, START_HOUR } from './constants.jsx';

// ── HELPERS ──────────────────────────────────────────────────────────────────
export const timeToMins = t => {
  const parts = t.split(':');
  return parseInt(parts[0]) * 60 + parseInt(parts[1]);
};

export const minsToTime = m => {
  const h = Math.floor(m / 60);
  const min = m % 60;
  return `${String(h).padStart(2,'0')}:${String(min).padStart(2,'0')}`;
};

export const timeToX = t => (timeToMins(t) - START_HOUR * 60) / 60 * HOUR_W;
export const xToMins = x => Math.round(x / HOUR_W * 60) + START_HOUR * 60;
export const snapMins = m => Math.round(m / SNAP_MINS) * SNAP_MINS;
export const durationMins = (s, e) => timeToMins(e) - timeToMins(s);
export const durationW = (s, e) => durationMins(s, e) / 60 * HOUR_W;

const nowMins = () => new Date().getHours() * 60 + new Date().getMinutes();
export const nowX    = () => (nowMins() - START_HOUR * 60) / 60 * HOUR_W;
