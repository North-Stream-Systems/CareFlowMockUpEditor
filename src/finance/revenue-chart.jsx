import { REVENUE_DATA, fmtK } from './mock-data.jsx';

// ── REVENUE CHART ─────────────────────────────────────────────────────────────
export const RevenueChart = () => {
  const max = Math.max(...REVENUE_DATA.map(d => d.value));
  return (
    <div className="chart-wrap">
      <div className="chart-bars">
        {REVENUE_DATA.map(d => (
          <div key={d.month} className="chart-bar-group">
            <div className="chart-val">{d.current ? fmtK(d.value) : ''}</div>
            <div
              className="chart-bar"
              style={{
                height: `${(d.value / max) * 100}%`,
                background: d.current ? 'var(--teal)' : 'var(--teal-m)',
                opacity: d.current ? 1 : 0.7,
              }}
              title={`${d.month}: ${fmtK(d.value)}`}
            />
          </div>
        ))}
      </div>
      <div style={{ display:'flex', justifyContent:'space-between', marginTop:8 }}>
        {REVENUE_DATA.map(d => (
          <div key={d.month} style={{ flex:1, textAlign:'center' }}>
            <div className="chart-month" style={{ fontWeight: d.current ? 700 : 400, color: d.current ? 'var(--navy)' : 'var(--slate)' }}>{d.month}</div>
            {!d.current && <div className="chart-val">{fmtK(d.value)}</div>}
          </div>
        ))}
      </div>
      <div className="chart-legend">
        <div className="chart-legend-item"><div className="chart-swatch" style={{ background:'var(--teal)' }} />This month</div>
        <div className="chart-legend-item"><div className="chart-swatch" style={{ background:'var(--teal-m)' }} />Previous months</div>
        <div style={{ marginLeft:'auto', fontFamily:'var(--fm)', fontSize:'11.5px', color:'var(--slate)' }}>
          YTD: <strong style={{ color:'var(--navy)' }}>£47,893.00</strong>
        </div>
      </div>
    </div>
  );
};
