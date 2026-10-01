import { fmt } from './mock-data.jsx';

// ── RATE BREAKDOWN POPOVER ────────────────────────────────────────────────────
export const RatePop = ({ line, onClose }) => (
  <div className="rate-pop">
    <div style={{ fontWeight:700, marginBottom:6, fontSize:'12px', color:'rgba(255,255,255,.9)' }}>Rate breakdown — {line.svc}</div>
    <div style={{ fontSize:'10px', color:'rgba(255,255,255,.45)', marginBottom:8, fontFamily:'var(--fm)' }}>{line.dayType} · {line.dur}min</div>
    {line.bands.map((b, i) => (
      <div key={i} className="rate-pop-row">
        <span style={{ color:'rgba(255,255,255,.65)', fontSize:'11px' }}>{b.label}</span>
        <span style={{ fontFamily:'var(--fm)', fontSize:'11.5px' }}>{b.mins}min @ {fmt(b.rate)}/hr</span>
      </div>
    ))}
    <div className="rate-pop-row">
      <span style={{ color:'rgba(255,255,255,.8)' }}>Line total</span>
      <span style={{ fontFamily:'var(--fm)', fontSize:'13px', color:'#fff' }}>{fmt(line.total)}</span>
    </div>
  </div>
);
