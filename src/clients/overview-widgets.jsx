// ── OVERVIEW WIDGETS ──────────────────────────────────────────────────────────
// Renders the org's overview layout for one client. Used by the client Overview tab (mode 'view')
// and by Clients › Settings › Client overview as a live preview (mode 'edit').
import { useState } from 'react';
import { getForm } from '../shared/client-overview/store.js';
import { BUILTIN_WIDGETS } from '../shared/client-overview/widgets.js';
import { evaluateRule, fmtAgo, fmtDate, formatValue } from '../shared/client-overview/rules.js';
import { COMPLAINTS_DATA, INCIDENTS_DATA, MAR_DATA, NOTES_DATA, TASKS_DATA } from './mock-data.jsx';
import { entriesFor, latestFor } from './form-submissions.jsx';
import { FieldValue } from './form-fields.jsx';

export const OverviewGrid = ({ client, cfg, subs, mode = 'view', selectedId, onSelect, onMove, onResize, onRemove, onOpenForm }) => {
  const edit = mode === 'edit';
  const [dragId, setDragId] = useState(null);
  const alerts = cfg.layout.filter(w => w.type === 'alert');
  const tiles  = cfg.layout.filter(w => w.type !== 'alert');

  const dnd = w => !edit ? {} : {
    draggable: true,
    onDragStart: e => { setDragId(w.id); e.dataTransfer.effectAllowed = 'move'; },
    onDragEnd:   () => setDragId(null),
    onDragOver:  e => { if (dragId && dragId !== w.id) e.preventDefault(); },
    onDrop:      e => { e.preventDefault(); if (dragId && dragId !== w.id) onMove(dragId, w.id); setDragId(null); },
    onClick:     () => onSelect(w.id),
  };
  const editCls = w => edit ? ` ov-edit${selectedId === w.id ? ' ov-sel' : ''}${dragId === w.id ? ' ov-drag' : ''}` : '';

  const alertState = alerts.map(w => {
    const form = getForm(cfg, w.formId);
    const field = form?.fields.find(f => f.id === w.fieldId);
    const value = latestFor(subs, client.id, w.formId)?.values[w.fieldId];
    return { w, on: !!field && evaluateRule(w, value), text: (w.message || w.title).replace('{value}', formatValue(field, value) || '—').replace('{label}', field?.label || '') };
  });
  const shown = edit ? alertState : alertState.filter(a => a.on);

  return (
    <div>
      {shown.length > 0 && (
        <div className="ov-alerts">
          {shown.map(({ w, on, text }) => (
            <div key={w.id} className={`ov-alert ov-${w.tone}${on ? '' : ' ov-off'}${editCls(w)}`} {...dnd(w)}>
              <span className="ov-alert-ico">{w.tone === 'teal' ? 'ℹ️' : '⚠️'}</span>
              <span style={{flex:1}}>{text}</span>
              {edit && <span className="ov-alert-state">{on ? 'Showing for this client' : 'Hidden — rule not met for this client'}</span>}
              {edit && <EditTools w={w} onRemove={onRemove}/>}
            </div>
          ))}
        </div>
      )}
      <div className="ov-grid">
        {tiles.map(w => (
          <div key={w.id} className={`ov-w${editCls(w)}`} style={{gridColumn:`span ${w.size || 1}`}} {...dnd(w)}>
            <div className="ov-w-hd">
              {edit && <span className="ov-grip" title="Drag to reorder">⋮⋮</span>}
              <span className="ov-w-title">{w.title}</span>
              {!edit && (w.type === 'fields' || w.type === 'latest') && onOpenForm &&
                <button className="ov-link" onClick={() => onOpenForm(w.formId)}>Open form →</button>}
              {edit && <EditTools w={w} onRemove={onRemove} onResize={onResize}/>}
            </div>
            <div className="ov-w-body"><WidgetBody w={w} client={client} cfg={cfg} subs={subs}/></div>
          </div>
        ))}
      </div>
      {!cfg.layout.length && <div className="ov-empty">No widgets yet. {edit ? 'Add one from the left.' : 'An administrator can set this up in Clients › Settings.'}</div>}
    </div>
  );
};

const EditTools = ({ w, onRemove, onResize }) => (
  <span className="ov-tools" onClick={e => e.stopPropagation()}>
    {onResize && [1,2,3].map(s => (
      <button key={s} className={`ov-size${(w.size||1)===s?' on':''}`} title={`${s} column${s>1?'s':''} wide`} onClick={() => onResize(w.id, s)}>{['S','M','L'][s-1]}</button>
    ))}
    <button className="ov-x" title="Remove widget" onClick={() => onRemove(w.id)}>✕</button>
  </span>
);

const WidgetBody = ({ w, client, cfg, subs }) => {
  if (w.type === 'builtin') return <Builtin id={w.builtinId} c={client}/>;
  const form = getForm(cfg, w.formId);
  if (!form) return <div className="fv-empty">Form no longer exists — choose another in settings.</div>;
  const fields = (w.fieldIds || []).map(id => form.fields.find(f => f.id === id)).filter(Boolean);

  if (w.type === 'fields') {
    const latest = latestFor(subs, client.id, w.formId);
    if (!latest) return <div className="fv-empty">{form.name} not completed yet.</div>;
    return (
      <>
        {fields.map(f => (
          <div key={f.id} className="drow"><span className="dlabel">{f.label}</span><span className="dval"><FieldValue field={f} value={latest.values[f.id]}/></span></div>
        ))}
        {!fields.length && <div className="fv-empty">No fields selected.</div>}
      </>
    );
  }

  if (w.type === 'latest') {
    const entries = entriesFor(subs, client.id, w.formId).slice(0, w.entries || 1);
    if (!entries.length) return <div className="fv-empty">No {form.name.toLowerCase()} recorded yet.</div>;
    if (entries.length === 1) {
      const e = entries[0];
      return (
        <>
          <div className="ov-meta">{fmtDate(e.submittedAt)} · {e.submittedBy}</div>
          {fields.map(f => (
            <div key={f.id} className="drow"><span className="dlabel">{f.label}</span><span className="dval"><FieldValue field={f} value={e.values[f.id]}/></span></div>
          ))}
        </>
      );
    }
    return (
      <table className="ov-tbl">
        <thead><tr><th>When</th>{fields.map(f => <th key={f.id}>{f.label}</th>)}<th>By</th></tr></thead>
        <tbody>
          {entries.map(e => (
            <tr key={e.id}>
              <td style={{whiteSpace:'nowrap'}}>{fmtAgo(e.submittedAt)}</td>
              {fields.map(f => <td key={f.id}>{formatValue(f, e.values[f.id]) || '—'}</td>)}
              <td style={{color:'var(--slate)'}}>{e.submittedBy}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  return null;
};

// ── Built-in widgets: live data owned by other CareFlow modules ──
const VISIT_TIMES = { 1:['09:00'], 2:['08:00','17:30'], 3:['08:00','12:30','18:00'], 4:['08:00','12:30','17:00','20:30'] };

const Builtin = ({ id, c }) => {
  const priCol = p => ({high:'red',medium:'amber',low:'slate'}[p]||'slate');
  const incidents = INCIDENTS_DATA.filter(i => i.clientId === c.id && i.stage !== 'Closed');
  const tasks = (TASKS_DATA[c.id] || []).filter(t => !t.done);

  switch (id) {
    case 'kpis': {
      const complaints = COMPLAINTS_DATA.filter(cp => cp.clientId === c.id);
      return (
        <div className="kpi-row" style={{marginBottom:0}}>
          <div className={`kpi${incidents.length?' kpi-red':''}`}><div className="kpi-label">Open Incidents</div><div className="kpi-val">{incidents.length}</div></div>
          <div className="kpi"><div className="kpi-label">Complaints</div><div className="kpi-val">{complaints.length}</div></div>
          <div className="kpi"><div className="kpi-label">Open Tasks</div><div className="kpi-val">{tasks.length}</div></div>
          <div className="kpi"><div className="kpi-label">Care Hours/wk</div><div className="kpi-val" style={{fontFamily:'var(--fm)'}}>{c.hours}</div></div>
        </div>
      );
    }
    case 'visits': {
      if (c.status !== 'active') return <div className="fv-empty">No visits — service {c.status}.</div>;
      const perDay = Number((c.package.match(/(\d)x daily/) || [])[1]);
      if (!perDay) return <div className="drow"><span className="dlabel">Next visit</span><span className="dval">Thu 10:00 · {c.keyworker}</span></div>;
      return (VISIT_TIMES[perDay] || []).map((t, i) => (
        <div key={t} className="drow">
          <span className="dlabel" style={{fontFamily:'var(--fm)'}}>Today {t}</span>
          <span className="dval">{i === 0 ? <span className="tag t-green">Completed</span> : c.keyworker}</span>
        </div>
      ));
    }
    case 'incidents':
      if (!incidents.length) return <div className="fv-empty">No open incidents.</div>;
      return incidents.map(inc => (
        <div key={inc.id} className="inc-row" style={{padding:'8px 0'}}>
          <div className="inc-body"><div className="inc-title">{inc.type}</div><div className="inc-meta">{inc.stage} · {inc.date}</div></div>
          <span className={`tag t-${inc.sev==='major'||inc.sev==='serious'?'red':'amber'}`} style={{textTransform:'capitalize'}}>{inc.sev}</span>
        </div>
      ));
    case 'tasks':
      if (!tasks.length) return <div className="fv-empty">No open tasks.</div>;
      return tasks.map(t => (
        <div key={t.id} className="drow"><span className="dlabel" style={{color:'var(--text)'}}>{t.title}<br/><span style={{fontSize:11,color:'var(--slate)'}}>Due {t.due}</span></span><span className={`tag t-${priCol(t.pri)}`} style={{textTransform:'capitalize'}}>{t.pri}</span></div>
      ));
    case 'mar': {
      const rows = MAR_DATA[c.id];
      if (!rows) return <div className="fv-empty">No MAR chart for this client.</div>;
      return rows.map(r => (
        <div key={r.med} className="drow">
          <span className="dlabel">{r.med} <span style={{fontFamily:'var(--fm)',fontSize:11}}>{r.time}</span></span>
          <span className="mar-cells">{r.records.slice(-7).map((x, i) => <span key={i} className={`mar-cell ${{G:'mar-given',R:'mar-refused',M:'mar-missed'}[x]||'mar-empty'}`}>{x}</span>)}</span>
        </div>
      ));
    }
    case 'notes': {
      const notes = (NOTES_DATA[c.id] || []).slice(0, 2);
      if (!notes.length) return <div className="fv-empty">No notes recorded.</div>;
      return notes.map(n => (
        <div key={n.id} style={{padding:'6px 0',borderBottom:'1px solid var(--border)'}}>
          <div className="ov-meta">{n.date} · {n.author} · {n.type}</div>
          <div style={{fontSize:12.5}}>{n.body}</div>
        </div>
      ));
    }
    case 'service':
      return [['Funder',c.funder],['Service',c.svc],['Package',c.package],['Hours/wk',c.hours],['Key worker',c.keyworker]].map(([l,v]) => (
        <div key={l} className="drow"><span className="dlabel">{l}</span><span className="dval">{v}</span></div>
      ));
    default:
      return <div className="fv-empty">Unknown widget: {BUILTIN_WIDGETS.find(b => b.id === id)?.name || id}</div>;
  }
};
