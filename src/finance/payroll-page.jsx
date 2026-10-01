import { useState } from 'react';
import { PAYROLL_LINES, PAYROLL_PERIOD, fmt } from './mock-data.jsx';

// ── PAYROLL PAGE ──────────────────────────────────────────────────────────────
export const PayrollPage = () => {
  const [exported, setExported] = useState(false);
  const [showExp, setShowExp]   = useState(false);
  const total = PAYROLL_LINES.reduce((s,p) => s + p.gross, 0);

  const CSV_PREVIEW = [
    'employee_id,employee_name,role,period_start,period_end,contracted_hrs,hrs_weekday,hrs_saturday,hrs_sunday,hrs_bank_hol,total_hrs,base_rate,total_base_pay,uplift_pay,mileage_miles,mileage_allowance,total_gross',
    'e1,Emma Williams,Senior Care Worker,01/03/2026,31/03/2026,150.00,142.50,7.50,7.50,0.00,157.50,12.50,1975.00,87.38,64.00,28.80,2091.18',
    'e3,Lisa Roberts,Care Worker,01/03/2026,31/03/2026,90.00,82.50,7.50,0.00,0.00,90.00,11.44,1034.22,35.81,44.00,19.80,1089.83',
    'e4,Rebecca Evans,Senior Care Worker,01/03/2026,31/03/2026,150.00,135.00,15.00,7.50,0.00,157.50,12.50,1968.75,140.63,76.00,34.20,2143.58',
    'e2,Sion Parry,Care Worker,01/03/2026,31/03/2026,75.00,52.50,0.00,0.00,0.00,52.50,11.44,600.60,0.00,28.00,12.60,613.20',
    'p5,Catrin Owen,Care Worker,01/03/2026,31/03/2026,,37.50,7.50,0.00,0.00,45.00,11.44,514.80,21.45,22.00,9.90,546.15',
    'e8,Amy Hughes,Care Worker,01/03/2026,31/03/2026,90.00,82.50,0.00,0.00,0.00,82.50,11.44,944.10,0.00,40.00,18.00,962.10',
  ].join('\n');

  return (
    <>
      <div className="ph">
        <div>
          <div className="ph-title">Payroll</div>
          <div className="ph-sub">Period: {PAYROLL_PERIOD.from} – {PAYROLL_PERIOD.to} · Status: <span style={{ color:'var(--teal)', fontWeight:600, textTransform:'capitalize' }}>{PAYROLL_PERIOD.status}</span></div>
        </div>
        <div className="ph-actions">
          <button className="btn btn-g btn-sm">← Previous period</button>
          <button className="btn btn-p btn-sm" onClick={() => setShowExp(true)}>Export CSV ↓</button>
        </div>
      </div>

      <div className="kpi-strip">
        <div className="kpi kpi-teal"><div className="kpi-label">Total gross pay</div><div className="kpi-mono">{fmt(total)}</div><div className="kpi-sub">6 staff members</div></div>
        <div className="kpi"><div className="kpi-label">Total hours</div><div className="kpi-mono">{PAYROLL_LINES.reduce((s,p)=>s+p.hrs_wd+p.hrs_sat+p.hrs_sun,0).toFixed(1)}h</div><div className="kpi-sub">Weekday + weekend</div></div>
        <div className="kpi kpi-amber"><div className="kpi-label">Total uplift</div><div className="kpi-mono">{fmt(PAYROLL_LINES.reduce((s,p)=>s+p.uplift,0))}</div><div className="kpi-sub">Weekend + evening</div></div>
        <div className="kpi"><div className="kpi-label">Total mileage</div><div className="kpi-mono">{fmt(PAYROLL_LINES.reduce((s,p)=>s+p.mileage,0))}</div><div className="kpi-sub">274 miles @ 45p</div></div>
      </div>

      <div className="tbl">
        <table>
          <thead>
            <tr>
              <th>Staff member</th>
              <th className="r">Contracted</th>
              <th className="r">Weekday hrs</th>
              <th className="r">Sat hrs</th>
              <th className="r">Sun hrs</th>
              <th className="r">Total hrs</th>
              <th className="r">Base pay</th>
              <th className="r">Uplift</th>
              <th className="r">Mileage</th>
              <th className="r">Gross pay</th>
            </tr>
          </thead>
          <tbody>
            {PAYROLL_LINES.map(p => {
              const total_hrs = p.hrs_wd + p.hrs_sat + p.hrs_sun;
              const over = p.contract && total_hrs > p.contract;
              return (
                <tr key={p.id}>
                  <td>
                    <div style={{ fontWeight:600, color:'var(--navy)', fontSize:'12.5px' }}>{p.name}</div>
                    <div style={{ fontSize:'11px', color:'var(--slate)' }}>{p.role}</div>
                  </td>
                  <td className="r" style={{ fontFamily:'var(--fm)', fontSize:'12px', color:'var(--slate)' }}>{p.contract ? `${p.contract}h` : 'ZH'}</td>
                  <td className="r" style={{ fontFamily:'var(--fm)', fontSize:'12px' }}>{p.hrs_wd}</td>
                  <td className="r" style={{ fontFamily:'var(--fm)', fontSize:'12px', color:p.hrs_sat>0?'#92400E':'var(--slate)' }}>{p.hrs_sat}</td>
                  <td className="r" style={{ fontFamily:'var(--fm)', fontSize:'12px', color:p.hrs_sun>0?'var(--red)':'var(--slate)' }}>{p.hrs_sun}</td>
                  <td className="r">
                    <span style={{ fontFamily:'var(--fm)', fontSize:'12px', fontWeight:600, color:over?'var(--amber)':'var(--text)' }}>{total_hrs}h</span>
                    {over && <div style={{ fontSize:'10px', color:'var(--amber)', fontWeight:600 }}>+{total_hrs - p.contract}h OT</div>}
                  </td>
                  <td className="r" style={{ fontFamily:'var(--fm)', fontSize:'12px' }}>{fmt(p.total_base)}</td>
                  <td className="r" style={{ fontFamily:'var(--fm)', fontSize:'12px', color:p.uplift>0?'#92400E':'var(--slate)' }}>{fmt(p.uplift)}</td>
                  <td className="r" style={{ fontFamily:'var(--fm)', fontSize:'12px', color:'var(--slate)' }}>{fmt(p.mileage)}</td>
                  <td className="r" style={{ fontFamily:'var(--fm)', fontSize:'13px', fontWeight:700, color:'var(--navy)' }}>{fmt(p.gross)}</td>
                </tr>
              );
            })}
            <tr style={{ background:'var(--slate-l)', borderTop:'2px solid var(--border)' }}>
              <td colSpan={6} style={{ padding:'10px 14px', fontWeight:700, fontSize:'12.5px', color:'var(--navy)' }}>Totals</td>
              <td className="r" style={{ padding:'10px 14px', fontFamily:'var(--fm)', fontSize:'12px', fontWeight:700 }}>{fmt(PAYROLL_LINES.reduce((s,p)=>s+p.total_base,0))}</td>
              <td className="r" style={{ padding:'10px 14px', fontFamily:'var(--fm)', fontSize:'12px', fontWeight:700 }}>{fmt(PAYROLL_LINES.reduce((s,p)=>s+p.uplift,0))}</td>
              <td className="r" style={{ padding:'10px 14px', fontFamily:'var(--fm)', fontSize:'12px', fontWeight:700 }}>{fmt(PAYROLL_LINES.reduce((s,p)=>s+p.mileage,0))}</td>
              <td className="r" style={{ padding:'10px 14px', fontFamily:'var(--fm)', fontSize:'14px', fontWeight:800, color:'var(--teal)' }}>{fmt(total)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Holiday Pay Section */}
      <div className="card" style={{marginTop:16}}>
        <div className="card-hd">
          <span className="card-title">Holiday Pay — March 2026</span>
          <div style={{display:'flex',alignItems:'center',gap:10}}>
            <div style={{fontSize:'11.5px',color:'var(--slate)',display:'flex',alignItems:'center',gap:6}}>
              <div style={{width:10,height:10,borderRadius:2,background:'var(--teal)',flexShrink:0}}/>Holiday taken this period
              <div style={{width:10,height:10,borderRadius:2,background:'var(--green-l)',border:'1px solid var(--green)',flexShrink:0,marginLeft:6}}/>Accrued
              <div style={{width:10,height:10,borderRadius:2,background:'var(--red-l)',border:'1px solid var(--red)',flexShrink:0,marginLeft:6}}/>Below entitlement
            </div>
            <button className="btn btn-g btn-sm">Holiday settings</button>
          </div>
        </div>
        <div style={{padding:'8px 0',borderBottom:'1px solid var(--border)',background:'var(--slate-l)',display:'flex'}}>
          {['Staff member','Contract','Annual entitlement','Used YTD','Remaining','Accrued this period','Holiday pay this period','Balance'].map((h,i)=>(
            <div key={h} style={{flex:i===0?2:1,padding:'6px 14px',fontSize:'10px',fontWeight:700,color:'var(--slate)',textTransform:'uppercase',letterSpacing:'.5px',textAlign:i>1?'right':'left'}}>{h}</div>
          ))}
        </div>
        {[
          { id:'p1', name:'Emma Williams',  contract:'Full-time', hrs:150, entitlement:28, usedYTD:10, accrued:2.33, rate:12.50 },
          { id:'p2', name:'Lisa Roberts',   contract:'Part-time', hrs:90,  entitlement:16.8,usedYTD:4, accrued:1.40, rate:11.44 },
          { id:'p3', name:'Rebecca Evans',  contract:'Full-time', hrs:150, entitlement:28, usedYTD:7,  accrued:2.33, rate:12.50 },
          { id:'p4', name:'Sion Parry',     contract:'Full-time', hrs:75,  entitlement:28, usedYTD:12, accrued:1.17, rate:11.44 },
          { id:'p5', name:'Catrin Owen',    contract:'Zero-hours',hrs:null, entitlement:null,usedYTD:0, accrued:5.44, rate:11.44, zeroHours:true },
          { id:'p6', name:'Amy Hughes',     contract:'Part-time', hrs:90,  entitlement:16.8,usedYTD:3, accrued:1.40, rate:11.44 },
        ].map((p,i)=>{
          // UK statutory: 5.6 weeks. Full-time=28 days. Part-time pro-rated.
          // Zero-hours: 12.07% of hours worked accrues as holiday pay
          const remaining = p.zeroHours ? null : (p.entitlement - p.usedYTD);
          const holidayPayAmt = p.zeroHours
            ? (() => { const wkd = PAYROLL_LINES.find(l=>l.id===p.id); return wkd ? (wkd.hrs_wd+wkd.hrs_sat+wkd.hrs_sun)*0.1207*p.rate : 0; })()
            : p.accrued * 8 * p.rate;  // accrued days × 8hrs × hourly rate
          const isLow = !p.zeroHours && remaining !== null && remaining < 4;

          return (
            <div key={p.id} style={{display:'flex',borderBottom:'1px solid var(--border)',transition:'background .1s',cursor:'pointer',background:i%2===0?'#fff':'var(--slate-l)'}}
              onMouseEnter={e=>e.currentTarget.style.background='var(--teal-l)'}
              onMouseLeave={e=>e.currentTarget.style.background=i%2===0?'#fff':'var(--slate-l)'}>
              <div style={{flex:2,padding:'11px 14px'}}>
                <div style={{fontSize:'12.5px',fontWeight:600,color:'var(--navy)'}}>{p.name}</div>
                <div style={{fontSize:'11px',color:'var(--slate)'}}>{p.contract}</div>
              </div>
              <div style={{flex:1,padding:'11px 14px',textAlign:'right',fontFamily:'var(--fm)',fontSize:'12px',color:'var(--slate)'}}>{p.hrs?`${p.hrs}h/wk`:'Variable'}</div>
              <div style={{flex:1,padding:'11px 14px',textAlign:'right'}}>
                {p.zeroHours
                  ? <span className="tag t-purple" style={{fontSize:'10px'}}>12.07% accrual</span>
                  : <span style={{fontFamily:'var(--fm)',fontSize:'12px',fontWeight:600,color:'var(--navy)'}}>{p.entitlement}d</span>
                }
              </div>
              <div style={{flex:1,padding:'11px 14px',textAlign:'right',fontFamily:'var(--fm)',fontSize:'12px',color:'var(--text)'}}>
                {p.zeroHours ? '—' : `${p.usedYTD}d`}
              </div>
              <div style={{flex:1,padding:'11px 14px',textAlign:'right'}}>
                {p.zeroHours ? (
                  <span style={{fontSize:'11.5px',color:'var(--slate)'}}>—</span>
                ) : (
                  <span style={{fontFamily:'var(--fm)',fontSize:'12px',fontWeight:600,color:isLow?'var(--amber)':'var(--green)'}}>
                    {remaining}d {isLow && '⚠'}
                  </span>
                )}
              </div>
              <div style={{flex:1,padding:'11px 14px',textAlign:'right'}}>
                <div style={{fontFamily:'var(--fm)',fontSize:'12px',fontWeight:600,color:'var(--teal)'}}>
                  {p.zeroHours ? `${p.accrued.toFixed(2)}h` : `${p.accrued}d`}
                </div>
                {p.zeroHours && <div style={{fontSize:'9.5px',color:'var(--slate)'}}>@ 12.07%</div>}
              </div>
              <div style={{flex:1,padding:'11px 14px',textAlign:'right'}}>
                <div style={{fontFamily:'var(--fm)',fontSize:'13px',fontWeight:700,color:'var(--navy)'}}>
                  {fmt(holidayPayAmt)}
                </div>
                {p.zeroHours && <div style={{fontSize:'9.5px',color:'var(--slate)'}}>Included in gross</div>}
              </div>
              <div style={{flex:1,padding:'11px 14px',textAlign:'right'}}>
                {p.zeroHours ? (
                  <span className="tag t-teal" style={{fontSize:'10px'}}>Rolling</span>
                ) : (
                  <div style={{fontSize:'11px',color:'var(--slate)'}}>
                    <div style={{height:5,background:'var(--border)',borderRadius:3,overflow:'hidden',marginBottom:3,width:60,marginLeft:'auto'}}>
                      <div style={{height:'100%',borderRadius:3,background:isLow?'var(--amber)':'var(--teal)',width:`${Math.min(100,(p.usedYTD/p.entitlement)*100)}%`}}/>
                    </div>
                    {Math.round((p.usedYTD/p.entitlement)*100)}% used
                  </div>
                )}
              </div>
            </div>
          );
        })}
        {/* Footer totals */}
        <div style={{padding:'10px 14px',background:'var(--slate-l)',borderTop:'2px solid var(--border)',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:10}}>
          <div style={{fontSize:'12px',color:'var(--slate)'}}>
            Holiday pay included in gross payroll total · Zero-hours staff accrual calculated at 12.07% per statutory UK guidance
          </div>
          <div style={{display:'flex',gap:16}}>
            <div style={{textAlign:'right'}}>
              <div style={{fontSize:'10.5px',fontWeight:700,color:'var(--slate)',textTransform:'uppercase',letterSpacing:'.4px'}}>Total holiday pay this period</div>
              <div style={{fontFamily:'var(--fm)',fontSize:'15px',fontWeight:800,color:'var(--teal)',marginTop:2}}>
                {fmt([
                  {hrs:150,rate:12.50,accrued:2.33},{hrs:90,rate:11.44,accrued:1.40},
                  {hrs:150,rate:12.50,accrued:2.33},{hrs:75,rate:11.44,accrued:1.17},
                  {hrs:null,rate:11.44,accrued:5.44,zh:true},{hrs:90,rate:11.44,accrued:1.40}
                ].reduce((s,p)=>s+(p.zh?(p.accrued*p.rate):p.accrued*8*p.rate),0))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showExp && (
        <div className="modal-overlay" onClick={e => { if(e.target===e.currentTarget) setShowExp(false); }}>
          <div className="modal" style={{ maxWidth:700 }}>
            <div className="modal-hd">
              <div>
                <div className="modal-title">Payroll Export — March 2026</div>
                <div style={{ fontSize:'11.5px', color:'var(--slate)', marginTop:2 }}>CSV formatted for external payroll processor</div>
              </div>
              <button className="modal-x" onClick={() => setShowExp(false)}>×</button>
            </div>
            <div className="modal-body" style={{ padding:0 }}>
              <div style={{ background:'var(--navy)', borderRadius:'0 0 0 0', padding:'12px 16px', fontFamily:'var(--fm)', fontSize:'11px', color:'rgba(255,255,255,.7)', lineHeight:1.7, overflowX:'auto', maxHeight:260, overflowY:'auto' }}>
                {CSV_PREVIEW.split('\n').map((line, i) => (
                  <div key={i} style={{ color:i===0?'rgba(255,255,255,.4)':'rgba(255,255,255,.8)', whiteSpace:'nowrap' }}>{line}</div>
                ))}
              </div>
            </div>
            <div className="modal-ft">
              <div style={{ fontSize:'11.5px', color:'var(--slate)', flex:1 }}>{PAYROLL_LINES.length} staff · {PAYROLL_PERIOD.from} – {PAYROLL_PERIOD.to}</div>
              <button className="btn btn-g btn-sm" onClick={() => setShowExp(false)}>Close</button>
              <button className="btn btn-p btn-sm" onClick={() => { setShowExp(false); setExported(true); }}>
                Download payroll.csv ↓
              </button>
            </div>
          </div>
        </div>
      )}
      {exported && <div className="toast">✓ payroll_march_2026.csv downloaded</div>}
    </>
  );
};
