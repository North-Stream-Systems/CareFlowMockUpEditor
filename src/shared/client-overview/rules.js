// ── ALERT RULES & VALUE FORMATTING ────────────────────────────────────────────
// An alert rule tests one field of a form's LATEST submission for the client.
// If the client has no submission for that form, the value counts as empty.

export const OPERATORS = [
  { id:'is',           label:'is',                    needsValue:true  },
  { id:'is_not',       label:'is not',                needsValue:true  },
  { id:'contains',     label:'contains',              needsValue:true  },
  { id:'not_empty',    label:'has any value',         needsValue:false },
  { id:'empty',        label:'is empty / not recorded', needsValue:false },
  { id:'gt',           label:'is greater than',       needsValue:true, types:['number'] },
  { id:'lt',           label:'is less than',          needsValue:true, types:['number'] },
  { id:'before_today', label:'is in the past',        needsValue:false, types:['date'] },
  { id:'within_days',  label:'is due within (days)',  needsValue:true,  types:['date'] },
];

export const operatorsFor = type => OPERATORS.filter(o => !o.types || o.types.includes(type));

const isEmpty = v => v == null || v === '' || (Array.isArray(v) && v.length === 0);

export const todayISO = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

export function evaluateRule(rule, value) {
  const v = Array.isArray(value) ? value : value == null ? '' : String(value);
  const target = String(rule.value ?? '');
  switch (rule.op) {
    case 'is':           return Array.isArray(v) ? v.includes(target) : v.toLowerCase() === target.toLowerCase();
    case 'is_not':       return !isEmpty(v) && (Array.isArray(v) ? !v.includes(target) : v.toLowerCase() !== target.toLowerCase());
    case 'contains':     return (Array.isArray(v) ? v.join(' ') : v).toLowerCase().includes(target.toLowerCase()) && target !== '';
    case 'not_empty':    return !isEmpty(v);
    case 'empty':        return isEmpty(v);
    case 'gt':           return !isEmpty(v) && Number(v) > Number(target);
    case 'lt':           return !isEmpty(v) && Number(v) < Number(target);
    case 'before_today': return !isEmpty(v) && v < todayISO();
    case 'within_days': {
      if (isEmpty(v)) return false;
      const days = (new Date(v) - new Date(todayISO())) / 86400000;
      return days >= 0 && days <= Number(target || 0);
    }
    default: return false;
  }
}

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
export const fmtDate = iso => {
  if (!iso) return '';
  const d = new Date(iso);
  return isNaN(d) ? iso : `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
};

export const fmtAgo = iso => {
  const days = Math.round((new Date(todayISO()) - new Date(iso.slice(0, 10))) / 86400000);
  if (days <= 0) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 30) return `${days} days ago`;
  return fmtDate(iso);
};

// Human-readable value for display in widgets and alert messages.
export function formatValue(field, value) {
  if (value == null || value === '' || (Array.isArray(value) && !value.length)) return '';
  if (!field) return Array.isArray(value) ? value.join(', ') : String(value);
  switch (field.type) {
    case 'date':        return fmtDate(value);
    case 'number':      return field.unit ? `${value} ${field.unit}` : String(value);
    case 'multiselect': return [].concat(value).join(', ');
    default:            return String(value);
  }
}
