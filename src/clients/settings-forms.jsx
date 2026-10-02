// ── SETTINGS › FORMS (form builder) ───────────────────────────────────────────
// Org admins create and edit the forms staff complete for each client. Every field here can be
// placed on the client Overview via Settings › Client overview. Changes save immediately.
import { useState } from 'react';
import { useOverviewConfig } from '../shared/client-overview/store.js';
import { FIELD_TYPES, FORM_ICONS, newFieldId, newFormId } from '../shared/client-overview/forms.js';
import { FormRenderer } from './form-fields.jsx';

const usesForm  = (w, formId) => w.type !== 'builtin' && w.formId === formId;
const usesField = (w, formId, fieldId) => usesForm(w, formId) && (w.fieldId === fieldId || (w.fieldIds || []).includes(fieldId));

export const FormsSettingsPage = () => {
  const [cfg, update] = useOverviewConfig();
  const [selId, setSelId] = useState(cfg.forms[0]?.id);
  const form = cfg.forms.find(f => f.id === selId) || cfg.forms[0];

  const patchForm = p => update(s => ({ forms: s.forms.map(f => f.id === form.id ? { ...f, ...p } : f) }));
  const addForm = () => {
    const f = { id: newFormId('custom'), name:'New form', icon:'📝', repeatable:false, system:false, description:'',
                fields:[{ id: newFieldId('question'), label:'New question', type:'text' }] };
    update(s => ({ forms: [...s.forms, f] }));
    setSelId(f.id);
  };
  const deleteForm = () => {
    update(s => ({ forms: s.forms.filter(f => f.id !== form.id), layout: s.layout.filter(w => !usesForm(w, form.id)) }));
    setSelId(cfg.forms.find(f => f.id !== form.id)?.id);
  };

  return (
    <div>
      <div className="ph">
        <div>
          <div className="ph-title">Forms</div>
          <div className="ph-sub">{cfg.forms.length} forms · Completed on each client's Forms tab · Any field can be shown on the client Overview</div>
        </div>
        <div className="ph-actions">
          <a className="btn btn-g btn-sm" href="CareFlow_Clients.html?page=settings-overview">🧩 Overview layout</a>
          <button className="btn btn-p btn-sm" onClick={addForm}>+ New form</button>
        </div>
      </div>

      <div className="fb">
        <div className="fb-list">
          {cfg.forms.map(f => (
            <button key={f.id} className={`fb-item${f.id === form?.id ? ' on' : ''}`} onClick={() => setSelId(f.id)}>
              <span style={{fontSize:16}}>{f.icon}</span>
              <span style={{flex:1,textAlign:'left'}}>
                <span className="cf-name">{f.name}</span>
                <span className="cf-sub">{f.fields.length} fields · {f.repeatable ? 'Repeating' : 'Single record'}</span>
              </span>
              <span className={`tag t-${f.system ? 'slate' : 'teal'}`}>{f.system ? 'Built-in' : 'Custom'}</span>
            </button>
          ))}
        </div>
        {form ? <FormEditor key={form.id} form={form} layout={cfg.layout} patchForm={patchForm} onDelete={deleteForm}/> : <div className="ov-empty">No forms. Create one to get started.</div>}
      </div>
    </div>
  );
};

const FormEditor = ({ form, layout, patchForm, onDelete }) => {
  const [view, setView] = useState('edit');
  const [preview, setPreview] = useState({});
  const widgets = layout.filter(w => usesForm(w, form.id));

  const setFields = fn => patchForm({ fields: fn(form.fields) });
  const patchField = (id, p) => setFields(fs => fs.map(f => f.id === id ? { ...f, ...p } : f));
  const moveField = (i, d) => setFields(fs => { const a = [...fs]; [a[i], a[i + d]] = [a[i + d], a[i]]; return a; });
  const addField = () => setFields(fs => [...fs, { id: newFieldId('question'), label:'New question', type:'text' }]);

  return (
    <div className="fb-main">
      <div className="card">
        <div className="card-body">
          <div style={{display:'flex',gap:12,alignItems:'flex-start'}}>
            <select className="sel fb-icon" value={form.icon} onChange={e => patchForm({ icon: e.target.value })}>
              {FORM_ICONS.map(i => <option key={i}>{i}</option>)}
            </select>
            <div style={{flex:1}}>
              <input className="inp fb-name" value={form.name} onChange={e => patchForm({ name: e.target.value })}/>
              <input className="inp" style={{marginTop:6}} placeholder="Short description" value={form.description} onChange={e => patchForm({ description: e.target.value })}/>
            </div>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:12,marginTop:12,flexWrap:'wrap'}}>
            <span className="le-label" style={{margin:0}}>Record type</span>
            <div className="seg">
              <button className={`seg-btn${!form.repeatable?' on':''}`} onClick={() => patchForm({ repeatable:false })}>Single record — kept up to date</button>
              <button className={`seg-btn${form.repeatable?' on':''}`} onClick={() => patchForm({ repeatable:true })}>Repeating — new entry each time</button>
            </div>
          </div>
          <div className="fb-used">
            {widgets.length
              ? <>Shown on the client Overview by: {widgets.map(w => <span key={w.id} className="tag t-teal" style={{marginLeft:4}}>{w.title}</span>)}</>
              : <>Not on the client Overview yet — add it in <a className="ov-link" href="CareFlow_Clients.html?page=settings-overview">Overview layout</a>.</>}
          </div>
        </div>
      </div>

      <div className="stabs" style={{marginBottom:12}}>
        <button className={`stab${view==='edit'?' on':''}`} onClick={() => setView('edit')}>Fields</button>
        <button className={`stab${view==='preview'?' on':''}`} onClick={() => setView('preview')}>Preview</button>
      </div>

      {view === 'preview' ? (
        <div className="card"><div className="card-hd"><span className="card-title">{form.icon} {form.name}</span><span style={{fontSize:11.5,color:'var(--slate)'}}>As staff will see it</span></div>
          <div className="card-body"><FormRenderer form={form} values={preview} setValues={setPreview}/></div></div>
      ) : (
        <div className="card">
          <div className="fb-fields">
            <div className="fb-fhead"><span/><span>Question</span><span>Answer type</span><span>Options</span><span>Required</span><span/></div>
            {form.fields.map((f, i) => (
              <FieldRow key={f.id} f={f} first={i === 0} last={i === form.fields.length - 1}
                inUse={layout.filter(w => usesField(w, form.id, f.id)).length}
                onPatch={p => patchField(f.id, p)} onMove={d => moveField(i, d)} onRemove={() => setFields(fs => fs.filter(x => x.id !== f.id))}/>
            ))}
          </div>
          <div style={{padding:'10px 14px',borderTop:'1px solid var(--border)'}}>
            <button className="btn btn-g btn-sm" onClick={addField}>+ Add question</button>
          </div>
        </div>
      )}

      {!form.system && (
        <button className="btn btn-danger btn-sm" onClick={onDelete}>
          Delete form{widgets.length ? ` (also removes ${widgets.length} overview widget${widgets.length > 1 ? 's' : ''})` : ''}
        </button>
      )}
      {form.system && <div className="le-note">Built-in form — CareFlow uses it elsewhere, so it can't be deleted. You can still add your own questions.</div>}
    </div>
  );
};

const FieldRow = ({ f, first, last, inUse, onPatch, onMove, onRemove }) => {
  const [opts, setOpts] = useState((f.options || []).join(', '));
  const hasOpts = f.type === 'select' || f.type === 'multiselect';
  return (
    <div className="fb-frow">
      <span className="fb-move">
        <button disabled={first} onClick={() => onMove(-1)} title="Move up">▲</button>
        <button disabled={last} onClick={() => onMove(1)} title="Move down">▼</button>
      </span>
      <span>
        <input className="inp" value={f.label} onChange={e => onPatch({ label: e.target.value })}/>
        {inUse > 0 && <span className="fb-inuse">On overview ({inUse})</span>}
      </span>
      <select className="sel" value={f.type} disabled={f.system} onChange={e => onPatch({ type: e.target.value, options: ['select','multiselect'].includes(e.target.value) ? (f.options?.length ? f.options : ['Option 1','Option 2']) : undefined })}>
        {FIELD_TYPES.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
      </select>
      {hasOpts
        ? <input className="inp" placeholder="Comma-separated" value={opts} onChange={e => setOpts(e.target.value)}
            onBlur={() => onPatch({ options: opts.split(',').map(s => s.trim()).filter(Boolean) })}/>
        : <span className="fv-empty">—</span>}
      <span style={{textAlign:'center'}}><input type="checkbox" checked={!!f.required} onChange={e => onPatch({ required: e.target.checked })}/></span>
      {f.system
        ? <span className="fb-lock" title="Built-in field used elsewhere in CareFlow">🔒</span>
        : <button className="ov-x" title="Delete question" onClick={onRemove}>✕</button>}
    </div>
  );
};
