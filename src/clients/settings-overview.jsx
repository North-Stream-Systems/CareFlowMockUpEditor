// ── SETTINGS › CLIENT OVERVIEW LAYOUT ─────────────────────────────────────────
// Org admins build the one overview layout every client uses. Changes save immediately.
import { useState } from 'react';
import { useOverviewConfig, getForm, resetOverviewConfig } from '../shared/client-overview/store.js';
import { BUILTIN_WIDGETS, TEMPLATES, TONES, WIDGET_TYPES, newWidgetId } from '../shared/client-overview/widgets.js';
import { OPERATORS, operatorsFor } from '../shared/client-overview/rules.js';
import { CLIENTS } from './mock-data.jsx';
import { useSubmissions } from './form-submissions.jsx';
import { OverviewGrid } from './overview-widgets.jsx';

export const OverviewSettingsPage = () => {
  const [cfg, update] = useOverviewConfig();
  const subs = useSubmissions();
  const [clientId, setClientId] = useState(CLIENTS[0].id);
  const [selectedId, setSelectedId] = useState(null);
  const client = CLIENTS.find(c => c.id === clientId);
  const selected = cfg.layout.find(w => w.id === selectedId);

  const setLayout = fn => update(s => ({ layout: fn(s.layout), templateId: 'custom' }));
  const patch = (id, p) => setLayout(l => l.map(w => w.id === id ? { ...w, ...p } : w));
  const remove = id => { setLayout(l => l.filter(w => w.id !== id)); if (selectedId === id) setSelectedId(null); };
  const add = w => { const nw = { id: newWidgetId(), ...w }; setLayout(l => [...l, nw]); setSelectedId(nw.id); };
  const move = (fromId, toId) => setLayout(l => {
    const from = l.findIndex(w => w.id === fromId), to = l.findIndex(w => w.id === toId);
    const a = [...l]; const [x] = a.splice(from, 1); a.splice(to, 0, x); return a;
  });

  const firstFields = f => f.fields.slice(0, 3).map(x => x.id);
  const addOfType = type => {
    if (type === 'fields') { const f = cfg.forms[0]; add({ type, title: f.name, formId: f.id, fieldIds: firstFields(f), size: 1 }); }
    if (type === 'latest') { const f = cfg.forms.find(x => x.repeatable) || cfg.forms[0]; add({ type, title: `Latest ${f.name.toLowerCase()}`, formId: f.id, fieldIds: firstFields(f), entries: 1, size: 1 }); }
    if (type === 'alert')  { const f = cfg.forms[0]; add({ type, title: 'New alert', formId: f.id, fieldId: f.fields[0]?.id, op: 'not_empty', value: '', tone: 'amber', message: '{label}: {value}' }); }
  };
  const onLayout = id => cfg.layout.some(w => w.type === 'builtin' && w.builtinId === id);
  const tpl = TEMPLATES.find(t => t.id === cfg.templateId);

  return (
    <div>
      <div className="ph">
        <div>
          <div className="ph-title">Client overview layout</div>
          <div className="ph-sub">Applies to every client · {cfg.layout.length} widgets · {tpl ? `Based on “${tpl.name}” template` : 'Customised'} · Changes save automatically</div>
        </div>
        <div className="ph-actions">
          <span style={{fontSize:12,color:'var(--slate)'}}>Preview as</span>
          <select className="sel" value={clientId} onChange={e => setClientId(e.target.value)}>
            {CLIENTS.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <button className="btn btn-g btn-sm" onClick={() => { resetOverviewConfig(); setSelectedId(null); }}>Reset to default</button>
        </div>
      </div>

      <div className="le">
        {/* Palette */}
        <div className="le-side">
          <div className="le-h">Add widget</div>
          {WIDGET_TYPES.filter(t => t.id !== 'builtin').map(t => (
            <button key={t.id} className="le-add" onClick={() => addOfType(t.id)}>
              <span className="le-add-ico">{t.icon}</span>
              <span><span className="le-add-name">{t.name}</span><span className="le-add-desc">{t.desc}</span></span>
            </button>
          ))}
          <div className="le-h" style={{marginTop:14}}>Built-in widgets</div>
          {BUILTIN_WIDGETS.map(b => {
            const used = onLayout(b.id);
            return (
              <button key={b.id} className="le-add" disabled={used} onClick={() => add({ type:'builtin', builtinId:b.id, title:b.name, size:b.defaultSize })}>
                <span className="le-add-ico">{b.icon}</span>
                <span><span className="le-add-name">{b.name}{used && <span className="le-on"> · on layout</span>}</span><span className="le-add-desc">{b.desc}</span></span>
              </button>
            );
          })}
        </div>

        {/* Live preview */}
        <div className="le-canvas">
          <div className="le-canvas-hd">Live preview — {client.name} · drag to reorder · click to configure</div>
          <OverviewGrid client={client} cfg={cfg} subs={subs} mode="edit" selectedId={selectedId}
            onSelect={setSelectedId} onMove={move} onRemove={remove} onResize={(id, size) => patch(id, { size })}/>
        </div>

        {/* Config */}
        <div className="le-side le-cfg">
          {selected
            ? <WidgetConfig key={selected.id} w={selected} cfg={cfg} patch={p => patch(selected.id, p)} onRemove={() => remove(selected.id)} onClose={() => setSelectedId(null)}/>
            : <HowItWorks/>}
        </div>
      </div>
    </div>
  );
};

const HowItWorks = () => (
  <>
    <div className="le-h">How it works</div>
    <ol className="le-steps">
      <li><b>Forms</b> hold the information. Build or edit them in <a className="ov-link" href="CareFlow_Clients.html?page=settings-forms">Settings › Forms</a>.</li>
      <li>Staff complete forms on each client's <b>Forms</b> tab.</li>
      <li><b>Widgets</b> choose which form fields appear on the Overview — the same layout for every client.</li>
      <li><b>Alerts</b> appear only for clients where the rule matches, e.g. DNACPR = Yes.</li>
    </ol>
    <div className="le-note">Select a widget in the preview to configure it.</div>
  </>
);

const Row = ({ label, children }) => (
  <div className="le-row"><div className="le-label">{label}</div>{children}</div>
);

const WidgetConfig = ({ w, cfg, patch, onRemove, onClose }) => {
  const type = WIDGET_TYPES.find(t => t.id === w.type);
  const form = getForm(cfg, w.formId);
  const formSelect = (
    <Row label="Source form">
      <select className="sel" style={{width:'100%'}} value={w.formId} onChange={e => {
        const f = getForm(cfg, e.target.value);
        patch(w.type === 'alert'
          ? { formId: f.id, fieldId: f.fields[0]?.id, op: 'not_empty', value: '' }
          : { formId: f.id, fieldIds: f.fields.slice(0, 3).map(x => x.id) });
      }}>
        {cfg.forms.map(f => <option key={f.id} value={f.id}>{f.icon} {f.name}{f.repeatable ? ' (repeating)' : ''}</option>)}
      </select>
    </Row>
  );

  return (
    <>
      <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:12}}>
        <span style={{fontSize:18}}>{type.icon}</span>
        <div className="le-h" style={{margin:0,flex:1}}>{type.name}</div>
        <button className="ov-x" onClick={onClose} title="Close">✕</button>
      </div>

      <Row label="Title"><input className="inp" value={w.title} onChange={e => patch({ title: e.target.value })}/></Row>

      {(w.type === 'fields' || w.type === 'latest') && (
        <>
          {formSelect}
          <Row label="Fields to show">
            <div className="le-checks">
              {form?.fields.map(f => {
                const on = w.fieldIds.includes(f.id);
                return (
                  <label key={f.id} className="le-check">
                    <input type="checkbox" checked={on} onChange={() => patch({ fieldIds: on ? w.fieldIds.filter(x => x !== f.id) : form.fields.map(x => x.id).filter(x => x === f.id || w.fieldIds.includes(x)) })}/>
                    {f.label}
                  </label>
                );
              })}
            </div>
          </Row>
          {w.type === 'latest' && (
            <Row label="Entries to show">
              <div className="seg">{[1,3,5].map(n => <button key={n} className={`seg-btn${(w.entries||1)===n?' on':''}`} onClick={() => patch({ entries: n })}>{n === 1 ? 'Latest only' : `Last ${n}`}</button>)}</div>
            </Row>
          )}
        </>
      )}

      {w.type === 'alert' && <AlertConfig w={w} cfg={cfg} form={form} formSelect={formSelect} patch={patch}/>}

      {w.type === 'builtin' && (
        <div className="le-note">{BUILTIN_WIDGETS.find(b => b.id === w.builtinId)?.desc} This data comes from another CareFlow module, not a form.</div>
      )}

      {w.type !== 'alert' && (
        <Row label="Width">
          <div className="seg">{[1,2,3].map(s => <button key={s} className={`seg-btn${(w.size||1)===s?' on':''}`} onClick={() => patch({ size: s })}>{['Small','Medium','Full'][s-1]}</button>)}</div>
        </Row>
      )}

      <button className="btn btn-danger btn-sm" style={{marginTop:8}} onClick={onRemove}>Remove widget</button>
    </>
  );
};

const AlertConfig = ({ w, form, formSelect, patch }) => {
  const field = form?.fields.find(f => f.id === w.fieldId);
  const ops = operatorsFor(field?.type);
  const op = OPERATORS.find(o => o.id === w.op);
  const choices = field?.type === 'yesno' ? ['Yes','No'] : field?.options;
  return (
    <>
      {formSelect}
      <Row label="Show when">
        <select className="sel" style={{width:'100%',marginBottom:6}} value={w.fieldId} onChange={e => patch({ fieldId: e.target.value, op: 'not_empty', value: '' })}>
          {form?.fields.map(f => <option key={f.id} value={f.id}>{f.label}</option>)}
        </select>
        <select className="sel" style={{width:'100%',marginBottom:6}} value={w.op} onChange={e => patch({ op: e.target.value })}>
          {ops.map(o => <option key={o.id} value={o.id}>{o.label}</option>)}
        </select>
        {op?.needsValue && (choices
          ? <select className="sel" style={{width:'100%'}} value={w.value} onChange={e => patch({ value: e.target.value })}>
              <option value="">Select…</option>{choices.map(o => <option key={o}>{o}</option>)}
            </select>
          : <input className="inp" placeholder={w.op === 'within_days' ? 'Number of days' : 'Value'} value={w.value} onChange={e => patch({ value: e.target.value })}/>)}
      </Row>
      <Row label="Colour">
        <div className="seg">{TONES.map(t => <button key={t.id} className={`seg-btn${w.tone===t.id?' on':''}`} onClick={() => patch({ tone: t.id })}>{t.label.split(' ')[0]}</button>)}</div>
      </Row>
      <Row label="Message">
        <input className="inp" value={w.message} onChange={e => patch({ message: e.target.value })}/>
        <div className="le-note" style={{marginTop:4}}>Use <code>{'{value}'}</code> for the field's value and <code>{'{label}'}</code> for its name.</div>
      </Row>
    </>
  );
};
