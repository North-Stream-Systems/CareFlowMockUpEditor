// ── CONSTANTS ──────────────────────────────────────────────────────────────
export const ORG  = { name:'Aber Care Services Ltd', short:'Aber Care', reg:'CIW' };
export const USER = { name:'Cameron', initials:'CD', role:'Care Coordinator' };
export const today = new Date();
const DAYS = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
export const DATE_STR = `${DAYS[today.getDay()]}, ${today.getDate()} ${MONTHS[today.getMonth()]} ${today.getFullYear()}`;
const HR = today.getHours();
export const GREET = HR < 12 ? 'Good morning' : HR < 17 ? 'Good afternoon' : 'Good evening';
