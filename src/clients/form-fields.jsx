// ── FORM FIELDS ───────────────────────────────────────────────────────────────
// Renders one form field as an input (Forms tab, form builder preview) or as a read-only value (widgets).
import { formatValue } from '../shared/client-overview/rules.js';

export const FieldInput = ({ field, value, onChange }) => {
  const set = v => onChange(v);
  switch (field.type) {
    case 'textarea':
      return <textarea className="inp" rows={3} value={value || ''} onChange={e => set(e.target.value)}/>;
    case 'number':
      return (
        <div style={{display:'flex',alignItems:'center',gap:6}}>
          <input className="inp" type="number" style={{maxWidth:140}} value={value ?? ''} onChange={e => set(e.target.value === '' ? '' : Number(e.target.value))}/>
          {field.unit && <span style={{fontSize:12,color:'var(--slate)'}}>{field.unit}</span>}
        </div>
      );
    case 'date':
      return <input className="inp" type="date" style={{maxWidth:180}} value={value || ''} onChange={e => set(e.target.value)}/>;
    case 'phone':
      return <input className="inp" type="tel" style={{maxWidth:220}} value={value || ''} onChange={e => set(e.target.value)}/>;
    case 'yesno':
      return (
        <div className="seg">
          {['Yes','No'].map(o => <button key={o} type="button" className={`seg-btn${value===o?' on':''}`} onClick={() => set(value===o ? '' : o)}>{o}</button>)}
        </div>
      );
    case 'select':
      return (
        <select className="sel" style={{minWidth:200}} value={value || ''} onChange={e => set(e.target.value)}>
          <option value="">Select…</option>
          {(field.options || []).map(o => <option key={o}>{o}</option>)}
        </select>
      );
    case 'multiselect': {
      const cur = [].concat(value || []);
      return (
        <div style={{display:'flex',flexWrap:'wrap',gap:6}}>
          {(field.options || []).map(o => {
            const on = cur.includes(o);
            return <button key={o} type="button" className={`chip${on?' on':''}`} onClick={() => set(on ? cur.filter(x => x !== o) : [...cur, o])}>{on ? '✓ ' : ''}{o}</button>;
          })}
        </div>
      );
    }
    default:
      return <input className="inp" value={value || ''} onChange={e => set(e.target.value)}/>;
  }
};

// Read-only value with light styling per type.
export const FieldValue = ({ field, value }) => {
  const text = formatValue(field, value);
  if (!text) return <span className="fv-empty">Not recorded</span>;
  if (field?.type === 'yesno') return <span className={`tag t-${value === 'Yes' ? 'navy' : 'slate'}`}>{text}</span>;
  if (field?.type === 'multiselect') return <span style={{display:'inline-flex',flexWrap:'wrap',gap:4,justifyContent:'flex-end'}}>{[].concat(value).map(v => <span key={v} className="tag t-slate">{v}</span>)}</span>;
  return <span>{text}</span>;
};

// Whole form as a set of inputs.
export const FormRenderer = ({ form, values, setValues }) => (
  <div className="fr">
    {form.fields.map(f => (
      <div key={f.id} className="fr-row">
        <label className="fr-label">{f.label}{f.required && <span style={{color:'var(--red)'}}> *</span>}</label>
        <FieldInput field={f} value={values[f.id]} onChange={v => setValues({ ...values, [f.id]: v })}/>
      </div>
    ))}
    {!form.fields.length && <div className="fv-empty">This form has no fields yet.</div>}
  </div>
);
