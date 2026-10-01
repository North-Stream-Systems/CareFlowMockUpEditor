// ── CONSTANTS ────────────────────────────────────────────────────────────────
export const HOUR_W     = 72;   // pixels per hour
export const START_HOUR = 7;    // 07:00
const END_HOUR   = 22;   // 22:00
export const TOTAL_HOURS = END_HOUR - START_HOUR;
export const TOTAL_W    = TOTAL_HOURS * HOUR_W;
export const SNAP_MINS  = 15;
const ROW_H      = 64;

export const SVC_COLORS = {
  'Personal Care':  { bg:'#0D9488', fg:'#fff', dot:'#fff' },
  'Medication':     { bg:'#F59E0B', fg:'#fff', dot:'#fff' },
  'Domestic':       { bg:'#64748B', fg:'#fff', dot:'#fff' },
  'Social Support': { bg:'#8B5CF6', fg:'#fff', dot:'#fff' },
  'Complex Care':   { bg:'#3B82F6', fg:'#fff', dot:'#fff' },
};
