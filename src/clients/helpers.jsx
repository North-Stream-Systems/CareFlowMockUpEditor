// ── HELPERS ───────────────────────────────────────────────────────────────────
const AV_COLS = ['#0D9488','#3B82F6','#8B5CF6','#EC4899','#F59E0B','#10B981','#0D1F3C'];
export const avCol = n => AV_COLS[(n.charCodeAt(0) + n.charCodeAt(n.length-1)) % AV_COLS.length];
export const inits = n => n.split(' ').filter(p=>p).map(p=>p[0]).join('').slice(0,2).toUpperCase();
