import { TEMPLATES } from '../shared/client-overview/widgets.js';
import { DEFAULT_FORMS } from '../shared/client-overview/forms.js';
import { applyTemplate, useOverviewConfig } from '../shared/client-overview/store.js';

// ── STEP 8: Client profiles ──────────────────────────────────────────────────
// Picks a starter overview layout. Writes to the same org config that Clients › Settings edits.
export const Step8 = ({data, setData}) => {
  const [cfg] = useOverviewConfig();
  const chosen = data.template || (TEMPLATES.some(t => t.id === cfg.templateId) ? cfg.templateId : 'standard');
  const choose = id => { applyTemplate(id); setData({...data, template:id}); };
  return (
    <div>
      <div className="step-header">
        <div className="step-num">Step 8 of 9</div>
        <div className="step-title">Client profiles</div>
        <div className="step-desc">Every client has an Overview built from widgets. Each widget shows information from a form your team completes, so you decide what matters most. Pick a starting layout — it applies to all clients and you can change it any time.</div>
      </div>

      <div className="tpl-grid">
        {TEMPLATES.map(t => {
          const alerts = t.layout.filter(w => w.type === 'alert');
          const tiles  = t.layout.filter(w => w.type !== 'alert');
          return (
            <button key={t.id} className={`tpl-card${chosen===t.id?' on':''}`} onClick={() => choose(t.id)}>
              <div className="tpl-mini">
                {alerts.slice(0, 3).map(w => <div key={w.id} className={`tpl-alert tpl-${w.tone}`}/>)}
                <div className="tpl-tiles">
                  {tiles.map(w => <div key={w.id} className={`tpl-tile${w.type==='builtin'?' tpl-live':''}`} style={{gridColumn:`span ${w.size||1}`}}>{w.title}</div>)}
                </div>
              </div>
              <div className="tpl-name">{t.icon} {t.name}{chosen===t.id && <span className="tpl-tick">✓ Selected</span>}</div>
              <div className="tpl-desc">{t.desc}</div>
              <div className="tpl-count">{alerts.length} alerts · {tiles.length} widgets</div>
            </button>
          );
        })}
      </div>

      <div className="form-section">Forms included</div>
      <div className="tpl-forms">
        {DEFAULT_FORMS.map(f => <span key={f.id} className="tpl-form">{f.icon} {f.name}</span>)}
      </div>
      <div className="field-hint" style={{marginTop:10}}>
        You can add questions to these, create your own forms, and rearrange the overview later in <strong>Clients › Settings</strong>.{' '}
        <a className="upload-link" href="CareFlow_Clients.html?page=settings-overview" target="_blank" rel="noreferrer">Open the layout editor ↗</a>
      </div>
    </div>
  );
};
