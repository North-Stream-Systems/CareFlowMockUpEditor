import { scopeLabel } from './helpers.jsx';

// ── REUSABLES ───────────────────────────────────────────────────────────────
export const TimeArrow = ({v, set}) => (
  <div className="ta-wrap">
    <div className="ta-labels">
      <span className="ta-end">Past</span>
      <span className="ta-scope">{scopeLabel(v)}</span>
      <span className="ta-end">Future</span>
    </div>
    <input type="range" className="ta-range" min="-3" max="3" step="1"
      value={v} onChange={e => set(Number(e.target.value))} />
  </div>
);

export const Toast = ({msg}) => msg ? <div className="toast">✓ {msg}</div> : null;

export const Sidebar = ({items, active, setActive}) => (
  <div className="sidebar">
    {items.map((sec, si) => (
      <div key={si} className="sb-section">
        {sec.label && <div className="sb-label">{sec.label}</div>}
        {sec.divider && <div className="sb-div" />}
        {(sec.items||[]).map(item => (
          <button key={item.id} className={`sb-item${active===item.id?' on':''}`}
            onClick={() => setActive(item.id)}>
            <span className="sb-ico">{item.ico}</span>
            <span>{item.label}</span>
            {item.badge != null &&
              <span className={`sb-badge sb-${item.badgeColor||'slate'}`}>{item.badge}</span>}
          </button>
        ))}
      </div>
    ))}
  </div>
);
