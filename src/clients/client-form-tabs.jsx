// ── CLIENT OVERVIEW & FORMS TABS ──────────────────────────────────────────────
import { useState } from 'react';
import { useOverviewConfig, getForm } from '../shared/client-overview/store.js';
import { fmtAgo, fmtDate } from '../shared/client-overview/rules.js';
import { OverviewGrid } from './overview-widgets.jsx';
import { addSubmission, entriesFor, useSubmissions } from './form-submissions.jsx';
import { FieldValue, FormRenderer } from './form-fields.jsx';

export const SETTINGS_URL = page => `CareFlow_Clients.html?page=${page}`;

export const TabOverview = ({ c, onOpenForm }) => {
  const [cfg] = useOverviewConfig();
  const subs = useSubmissions();
  return (
    <div className="prof-content">
      <div className="ov-hint">
        <span>This overview is built from your organisation's forms and is the same layout for every client.</span>
        <a className="ov-link" href={SETTINGS_URL('settings-overview')}>⚙ Customise layout</a>
      </div>
      <OverviewGrid client={c} cfg={cfg} subs={subs} onOpenForm={onOpenForm}/>
    </div>
  );
};

export const TabForms = ({ c, formId, setFormId }) => {
  const [cfg] = useOverviewConfig();
  const subs = useSubmissions();
  const form = formId && getForm(cfg, formId);

  if (form) return <FormDetail c={c} form={form} entries={entriesFor(subs, c.id, form.id)} onBack={() => setFormId(null)}/>;

  return (
    <div className="prof-content">
      <div className="ov-hint">
        <span>Information completed here feeds the client's Overview. Forms are managed in Clients › Settings › Forms.</span>
        <a className="ov-link" href={SETTINGS_URL('settings-forms')}>⚙ Manage forms</a>
      </div>
      <div className="cf-list">
        {cfg.forms.map(f => {
          const entries = entriesFor(subs, c.id, f.id);
          const last = entries[0];
          return (
            <button key={f.id} className="cf-item" onClick={() => setFormId(f.id)}>
              <span className="cf-ico">{f.icon}</span>
              <span style={{flex:1,textAlign:'left'}}>
                <span className="cf-name">{f.name}</span>
                <span className="cf-sub">{last ? `Updated ${fmtAgo(last.submittedAt)} by ${last.submittedBy}` : 'Not completed'}{f.repeatable && entries.length ? ` · ${entries.length} entr${entries.length>1?'ies':'y'}` : ''}</span>
              </span>
              <span className={`tag t-${last ? 'green' : 'slate'}`}>{last ? (f.repeatable ? 'Recorded' : 'Complete') : 'To do'}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

const FormDetail = ({ c, form, entries, onBack }) => {
  const [editing, setEditing] = useState(false);
  const [values, setValues] = useState({});
  const current = entries[0];

  const start = () => { setValues(form.repeatable ? {} : { ...(current?.values || {}) }); setEditing(true); };
  const missing = form.fields.filter(f => f.required && (values[f.id] == null || values[f.id] === ''));
  const save = () => { addSubmission({ clientId: c.id, formId: form.id, values }); setEditing(false); };

  return (
    <div className="prof-content">
      <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:14}}>
        <button className="btn btn-g btn-sm" onClick={onBack}>← All forms</button>
        <span style={{fontSize:20}}>{form.icon}</span>
        <div style={{flex:1}}>
          <div style={{fontFamily:'var(--fh)',fontWeight:700,fontSize:16,color:'var(--navy)'}}>{form.name}</div>
          <div style={{fontSize:12,color:'var(--slate)'}}>{form.description} · {form.repeatable ? 'New entry each time' : 'Single record, kept up to date'}</div>
        </div>
        {!editing && <button className="btn btn-p btn-sm" onClick={start}>{form.repeatable ? '+ New entry' : current ? 'Update' : 'Complete form'}</button>}
      </div>

      {editing ? (
        <div className="card">
          <div className="card-body">
            <FormRenderer form={form} values={values} setValues={setValues}/>
            <div style={{display:'flex',gap:8,justifyContent:'flex-end',alignItems:'center',marginTop:14}}>
              {missing.length > 0 && <span style={{fontSize:12,color:'var(--slate)'}}>Required: {missing.map(f => f.label).join(', ')}</span>}
              <button className="btn btn-g btn-sm" onClick={() => setEditing(false)}>Cancel</button>
              <button className="btn btn-p btn-sm" disabled={missing.length > 0} style={{opacity:missing.length?.5:1}} onClick={save}>Save</button>
            </div>
          </div>
        </div>
      ) : !entries.length ? (
        <div className="ov-empty">Not completed for {c.name} yet.</div>
      ) : (
        (form.repeatable ? entries : [current]).map((e, i) => (
          <div key={e.id} className="card">
            <div className="card-hd">
              <span className="card-title">{form.repeatable ? fmtDate(e.submittedAt) : 'Current record'}</span>
              <span style={{fontSize:11.5,color:'var(--slate)'}}>{form.repeatable && i === 0 ? 'Latest · ' : ''}{e.submittedBy} · {fmtAgo(e.submittedAt)}</span>
            </div>
            <div className="card-body">
              {form.fields.map(f => (
                <div key={f.id} className="drow"><span className="dlabel">{f.label}</span><span className="dval"><FieldValue field={f} value={e.values[f.id]}/></span></div>
              ))}
            </div>
          </div>
        ))
      )}
      {!form.repeatable && entries.length > 1 && !editing && (
        <div style={{fontSize:12,color:'var(--slate)',marginTop:4}}>{entries.length - 1} earlier version{entries.length > 2 ? 's' : ''} kept for audit.</div>
      )}
    </div>
  );
};
