import { ACTIVITY, INVOICES, fmt } from './mock-data.jsx';
import { RevenueChart } from './revenue-chart.jsx';

// ── FINANCE DASHBOARD ─────────────────────────────────────────────────────────
export const FinanceDashboard = ({ setPage }) => (
  <div>
    <div className="ph">
      <div>
        <div className="ph-title">Finance Dashboard</div>
        <div className="ph-sub">March 2026 · Financial year Apr 2025 – Mar 2026</div>
      </div>
      <div className="ph-actions">
        <button className="btn btn-g btn-sm">📊 Export report</button>
        <button className="btn btn-p btn-sm" onClick={() => setPage('invoices')}>Run billing →</button>
      </div>
    </div>

    <div className="kpi-strip">
      <div className="kpi kpi-teal">
        <div className="kpi-label">Revenue this month</div>
        <div className="kpi-mono">£8,318.25</div>
        <div className="kpi-sub"><span className="kpi-trend kpi-up">+5.2%</span> vs Feb</div>
      </div>
      <div className="kpi kpi-amber">
        <div className="kpi-label">Uninvoiced hours</div>
        <div className="kpi-mono">124h</div>
        <div className="kpi-sub">Est. <strong>£2,418.00</strong> · 2 drafts pending</div>
      </div>
      <div className="kpi kpi-red">
        <div className="kpi-label">Overdue invoices</div>
        <div className="kpi-mono">£4,611.00</div>
        <div className="kpi-sub">1 invoice · 30 days past due</div>
      </div>
      <div className="kpi">
        <div className="kpi-label">YTD revenue</div>
        <div className="kpi-mono">£47,893</div>
        <div className="kpi-sub"><span className="kpi-trend kpi-up">+8.1%</span> vs prior year</div>
      </div>
    </div>

    <div style={{ display:'grid', gridTemplateColumns:'1fr 320px', gap:14 }}>
      <div className="card">
        <div className="card-hd">
          <span className="card-title">Monthly Revenue</span>
          <span style={{ fontSize:'11.5px', color:'var(--slate)' }}>Oct 2025 – Mar 2026</span>
        </div>
        <RevenueChart />
      </div>
      <div className="card">
        <div className="card-hd"><span className="card-title">Recent Activity</span><div className="live" /></div>
        {ACTIVITY.map((a, i) => (
          <div key={i} className="activity-item">
            <div className="activity-dot" style={{ background: a.color }} />
            <div className="activity-body">
              <div className="activity-title">{a.text}</div>
              <div className="activity-meta">{a.sub}</div>
              <div style={{ fontSize:'10px', color:'var(--slate)', marginTop:2 }}>{a.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="card">
      <div className="card-hd">
        <span className="card-title">Drafts Awaiting Review</span>
        <button className="btn btn-p btn-sm" onClick={() => setPage('invoices')}>Review all →</button>
      </div>
      <table style={{ width:'100%', borderCollapse:'collapse' }}>
        <thead>
          <tr style={{ background:'var(--slate-l)', borderBottom:'1px solid var(--border)' }}>
            {['Invoice','Funder','Period','Lines','Total',''].map(h => (
              <th key={h} style={{ padding:'9px 14px', textAlign:h===''||h==='Total'||h==='Lines'?'right':'left', fontSize:'10px', fontWeight:700, color:'var(--slate)', textTransform:'uppercase', letterSpacing:'.5px' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {INVOICES.filter(i => i.status==='draft' || i.status==='reviewed').map(inv => (
            <tr key={inv.id} style={{ borderBottom:'1px solid var(--border)', cursor:'pointer' }} onClick={() => setPage('invoices')}>
              <td style={{ padding:'10px 14px', fontFamily:'var(--fm)', fontSize:'12px', color:'var(--navy)', fontWeight:600 }}>{inv.id}</td>
              <td style={{ padding:'10px 14px', fontSize:'12.5px' }}>{inv.funder}</td>
              <td style={{ padding:'10px 14px', fontSize:'12px', color:'var(--slate)' }}>{inv.period}</td>
              <td style={{ padding:'10px 14px', textAlign:'right', fontFamily:'var(--fm)', fontSize:'12px', color:'var(--slate)' }}>{inv.lines}</td>
              <td style={{ padding:'10px 14px', textAlign:'right', fontFamily:'var(--fm)', fontSize:'13px', fontWeight:600, color:'var(--navy)' }}>{fmt(inv.total)}</td>
              <td style={{ padding:'10px 14px', textAlign:'right' }}><span className={`tag t-${inv.status==='draft'?'amber':'teal'}`} style={{ textTransform:'capitalize' }}>{inv.status==='reviewed'?'Ready to send':inv.status}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
