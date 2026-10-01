import { useState } from 'react';
import { FUNDERS } from './mock-data.jsx';

// ── FUNDERS PAGE ──────────────────────────────────────────────────────────────
export const FundersPage = () => {
  const [sel, setSel] = useState('f1');
  const funder = FUNDERS.find(f => f.id===sel);
  const RATE_MATRIX = [
    ['Personal Care',  '£19.50','£24.38','£29.25','£39.00'],
    ['Medication',     '£18.20','£22.75','£27.30','£36.40'],
    ['Domestic',       '£15.50','£19.38','£23.25','£31.00'],
    ['Social Support', '£17.80','£22.25','£26.70','£35.60'],
    ['Complex Care',   '£24.00','£30.00','£36.00','£48.00'],
  ];
  return (
    <>
      <div className="ph">
        <div><div className="ph-title">Funders</div><div className="ph-sub">{FUNDERS.length} funders configured</div></div>
        <button className="btn btn-p btn-sm">+ Add funder</button>
      </div>
      <div style={{ display:'flex', gap:16 }}>
        <div style={{ width:240, flexShrink:0 }}>
          <div className="card" style={{ marginBottom:0 }}>
            {FUNDERS.map(f => (
              <div key={f.id} onClick={() => setSel(f.id)} style={{ padding:'12px 14px', borderBottom:'1px solid var(--border)', cursor:'pointer', background:sel===f.id?'var(--teal-l)':'#fff', borderLeft:sel===f.id?'2px solid var(--teal)':'2px solid transparent', transition:'all .1s' }}>
                <div style={{ fontFamily:'var(--fh)', fontSize:'12.5px', fontWeight:600, color:sel===f.id?'var(--teal)':'var(--navy)' }}>{f.name}</div>
                <div style={{ fontSize:'11px', color:'var(--slate)', marginTop:2 }}>{f.type} · {f.clients} clients · {f.terms}d terms</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ flex:1 }}>
          {funder && (
            <>
              <div className="card">
                <div className="card-hd"><span className="card-title">{funder.name}</span><button className="btn btn-g btn-sm">Edit funder</button></div>
                <div style={{ padding:'0 16px' }}>
                  {[['Type',funder.type],['Payment terms',`${funder.terms} days`],['Active clients',funder.clients.toString()],['Invoice frequency','Monthly'],['Delivery method','Email']].map(([l,v])=>(
                    <div key={l} className="drow"><span className="dlabel">{l}</span><span className="dval">{v}</span></div>
                  ))}
                </div>
              </div>
              <div className="card">
                <div className="card-hd">
                  <span className="card-title">Rate Matrix — {funder.name}</span>
                  <div style={{ display:'flex', gap:6 }}>
                    <button className="btn btn-g btn-sm">Import CSV</button>
                    <button className="btn btn-p btn-sm">Edit rates</button>
                  </div>
                </div>
                <div style={{ padding:'14px 16px' }}>
                  <div className="rate-matrix">
                    <table className="rm-table">
                      <thead>
                        <tr>
                          <th>Service type</th>
                          <th>Weekday</th>
                          <th>Saturday</th>
                          <th>Sunday</th>
                          <th>Bank Holiday</th>
                        </tr>
                      </thead>
                      <tbody>
                        {RATE_MATRIX.map(([svc,...rates]) => (
                          <tr key={svc}>
                            <td>{svc}</td>
                            {rates.map((r,i) => <td key={i}>{r}</td>)}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div style={{ marginTop:10, fontSize:'11.5px', color:'var(--slate)' }}>
                    Time bands: Early morning 06:00-08:00 (+15%) · Standard 08:00-18:00 · Evening 18:00-22:00 (+10%) · Night 22:00-06:00 (+33%)
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
