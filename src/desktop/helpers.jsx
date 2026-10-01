import { today } from './constants.jsx';

// ── HELPERS ─────────────────────────────────────────────────────────────────
const AV_COLORS = ['#0D9488','#3B82F6','#8B5CF6','#EC4899','#F59E0B','#10B981','#0D1F3C','#64748B'];
export const avCol  = n => AV_COLORS[n.charCodeAt(0) % AV_COLORS.length];
export const inits  = n => n.split(' ').map(x => x[0]).join('').slice(0,2).toUpperCase();
export const scopeLabel = v => { if(v===0)return'Today'; if(v===-1)return'Yesterday'; if(v===1)return'Tomorrow'; if(v<0)return`Last ${Math.abs(v)} days`; return`Next ${v} days`; };
export const sevCol = s => ({critical:'red',warning:'amber',info:'teal'}[s]||'slate');
export const bfCol  = s => ({disciplinary:'red',formal:'amber',first:'teal'}[s]||'slate');
export const covCol = p => p>=90?'green':p>=70?'amber':'red';

export const compSt  = s => ({ok:'green',warning:'amber',critical:'red',pending:'slate'}[s]||'slate');
export const compLbl = (s,exp) => {
  if(s==='pending') return 'Pending';
  if(!exp) return 'Verified';
  const d = Math.round((new Date(exp) - today)/86400000);
  if(d<0) return `${Math.abs(d)}d overdue`;
  if(d<30) return `${d}d left`;
  return exp;
};
