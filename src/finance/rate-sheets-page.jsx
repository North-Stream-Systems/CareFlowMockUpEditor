import React, { useState } from 'react';
import { BILLING_SHEETS, DAY_TYPES, PAY_SHEETS, SVCS } from './rate-sheet-data.jsx';

// ── RATE SHEETS PAGE ──────────────────────────────────────────────────────────
export const RateSheetsPage = ({ type }) => {
  const isBilling = type === 'billing';
  const sheets    = isBilling ? BILLING_SHEETS : PAY_SHEETS;
  const [selId,   setSel]     = useState(sheets[0].id);
  const [editCell,setEditCell]= useState(null);
  const [cellVals,setCellVals]= useState({});
  const [toast,   setToast]   = useState(null);
  const timer = React.useRef(null);

  const flash = msg => { setToast(msg); clearTimeout(timer.current); timer.current = setTimeout(()=>setToast(null),2500); };
  const sel = sheets.find(s=>s.id===selId);

  const getCellVal = (svc, day) => {
    const key = `${selId}:${svc}:${day}`;
    if(cellVals[key] !== undefined) return cellVals[key];
    return isBilling ? sel.rates[svc][day] : null;
  };

  const setCellVal = (svc, day, val) => {
    const key = `${selId}:${svc}:${day}`;
    setCellVals(prev => ({...prev, [key]: parseFloat(val)||0}));
  };

  return (
    <>
      <div className="ph">
        <div>
          <div className="ph-title">{isBilling ? 'Billing Rate Sheets' : 'Pay Rate Sheets'}</div>
          <div className="ph-sub">
            {isBilling
              ? 'Assign a billing sheet to each client — rates auto-apply to invoice lines'
              : 'Assign a pay sheet to each staff member — rates auto-apply to payroll'}
          </div>
        </div>
        <div className="ph-actions">
          <button className="btn btn-p btn-sm" onClick={()=>flash('New rate sheet created as draft')}>+ New rate sheet</button>
        </div>
      </div>

      <div style={{display:'flex',gap:16,alignItems:'flex-start'}}>

        {/* Sheet list */}
        <div style={{width:230,flexShrink:0}}>
          <div className="card" style={{marginBottom:0}}>
            <div className="card-hd" style={{background:'var(--slate-l)'}}>
              <span className="card-title">{sheets.length} rate sheets</span>
            </div>
            {sheets.map(s=>(
              <div key={s.id} onClick={()=>{setSel(s.id);setEditCell(null);}}
                style={{padding:'11px 14px',borderBottom:'1px solid var(--border)',cursor:'pointer',
                  background:selId===s.id?'var(--teal-l)':'#fff',
                  borderLeft:selId===s.id?'2px solid var(--teal)':'2px solid transparent',
                  transition:'all .1s'}}>
                <div style={{fontFamily:'var(--fh)',fontSize:'12.5px',fontWeight:600,
                  color:selId===s.id?'var(--teal)':'var(--navy)'}}>{s.name}</div>
                <div style={{fontSize:'11px',color:'var(--slate)',marginTop:2}}>
                  {isBilling ? s.funder : `Base: £${s.baseRate.toFixed(2)}/hr`}
                </div>
                <div style={{marginTop:5,display:'flex',alignItems:'center',gap:5}}>
                  <span style={{fontFamily:'var(--fm)',fontSize:'10px',background:'var(--slate-l)',
                    color:'var(--slate)',padding:'1px 6px',borderRadius:8}}>
                    {isBilling ? s.assignedClients.length : s.assignedStaff.length} assigned
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sheet detail */}
        {sel && (
          <div style={{flex:1,minWidth:0}}>

            {/* Header card */}
            <div className="card">
              <div className="card-hd">
                <span className="card-title">{sel.name}</span>
                <div style={{display:'flex',gap:6}}>
                  <button className="btn btn-g btn-sm">Duplicate sheet</button>
                  <button className="btn btn-p btn-sm" onClick={()=>flash(`${sel.name} saved`)}>Save changes</button>
                </div>
              </div>
              <div style={{padding:'0 16px'}}>
                {isBilling ? (
                  <>
                    <div className="drow"><span className="dlabel">Funder</span><span className="dval">{sel.funder}</span></div>
                    <div className="drow"><span className="dlabel">Minimum call</span><span className="dval">{sel.minCall} minutes</span></div>
                  </>
                ) : (
                  <>
                    <div className="drow">
                      <span className="dlabel">Base rate</span>
                      <span className="dval" style={{fontFamily:'var(--fm)',fontWeight:700,color:'var(--navy)'}}>£{sel.baseRate.toFixed(2)}/hr</span>
                    </div>
                    <div className="drow">
                      <span className="dlabel">Overtime rate</span>
                      <span className="dval">{sel.overtime}% of base (×{(sel.overtime/100).toFixed(1)})</span>
                    </div>
                  </>
                )}
                <div className="drow"><span className="dlabel">Notes</span><span className="dval" style={{color:'var(--slate)'}}>{sel.notes}</span></div>
              </div>
            </div>

            {/* Rate matrix */}
            <div className="card">
              <div className="card-hd">
                <span className="card-title">
                  {isBilling ? 'Billing rates — £/hr by service type and day' : 'Uplift rates — % above base rate'}
                </span>
                <span style={{fontSize:'11.5px',color:'var(--slate)'}}>Click any cell to edit</span>
              </div>
              <div style={{padding:'14px 16px',overflowX:'auto'}}>
                {isBilling ? (
                  <table style={{width:'100%',borderCollapse:'collapse',minWidth:520}}>
                    <thead>
                      <tr>
                        <th style={{padding:'8px 12px',textAlign:'left',fontSize:'10px',fontWeight:700,color:'var(--slate)',textTransform:'uppercase',letterSpacing:'.5px',background:'var(--slate-l)',border:'1px solid var(--border)',minWidth:140}}>Service type</th>
                        {DAY_TYPES.map(d=>(
                          <th key={d} style={{padding:'8px 12px',textAlign:'center',fontSize:'10px',fontWeight:700,color:'var(--slate)',textTransform:'uppercase',letterSpacing:'.5px',background:'var(--slate-l)',border:'1px solid var(--border)',minWidth:90}}>
                            {d}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {SVCS.map((svc,si)=>(
                        <tr key={svc} style={{background:si%2===0?'#fff':'var(--slate-l)'}}>
                          <td style={{padding:'9px 12px',fontFamily:'var(--fb)',fontSize:'12.5px',fontWeight:500,color:'var(--navy)',border:'1px solid var(--border)'}}>{svc}</td>
                          {DAY_TYPES.map(day=>{
                            const cellKey = `${svc}:${day}`;
                            const isEditing = editCell===`${sel.id}:${cellKey}`;
                            const val = getCellVal(svc,day);
                            const isWeekday = day==='Weekday';
                            const weekdayVal = getCellVal(svc,'Weekday');
                            const upliftPct = !isWeekday && weekdayVal ? Math.round(((val-weekdayVal)/weekdayVal)*100) : null;
                            return (
                              <td key={day} style={{padding:'6px 8px',border:'1px solid var(--border)',textAlign:'center',cursor:'pointer',background:isEditing?'var(--teal-l)':undefined}}
                                onClick={()=>setEditCell(isEditing?null:`${sel.id}:${cellKey}`)}>
                                {isEditing ? (
                                  <input
                                    autoFocus
                                    type="number"
                                    step="0.01"
                                    defaultValue={val}
                                    onChange={e=>setCellVal(svc,day,e.target.value)}
                                    onBlur={()=>{setEditCell(null);flash('Rate updated');}}
                                    onKeyDown={e=>{if(e.key==='Enter'){setEditCell(null);flash('Rate updated');}}}
                                    style={{width:'72px',padding:'4px 6px',borderRadius:5,border:'1.5px solid var(--teal)',fontFamily:'var(--fm)',fontSize:'12px',color:'var(--navy)',outline:'none',textAlign:'center'}}
                                  />
                                ) : (
                                  <div>
                                    <div style={{fontFamily:'var(--fm)',fontSize:'12.5px',fontWeight:600,color:'var(--navy)'}}>£{val.toFixed(2)}</div>
                                    {upliftPct && <div style={{fontSize:'9.5px',color:'var(--teal)',fontWeight:600,marginTop:1}}>+{upliftPct}%</div>}
                                  </div>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <table style={{width:'100%',borderCollapse:'collapse'}}>
                    <thead>
                      <tr>
                        {['Day / Period','Uplift %','Multiplier','Example (base £'+sel.baseRate.toFixed(2)+'/hr)'].map(h=>(
                          <th key={h} style={{padding:'8px 12px',textAlign:h.startsWith('Example')||h==='Multiplier'||h==='Uplift %'?'center':'left',fontSize:'10px',fontWeight:700,color:'var(--slate)',textTransform:'uppercase',letterSpacing:'.5px',background:'var(--slate-l)',border:'1px solid var(--border)'}}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(sel.uplifts).map(([period,pct],i)=>{
                        const multiplier = 1 + pct/100;
                        const example = sel.baseRate * multiplier;
                        const col = pct===0?'var(--slate)':pct>=100?'var(--red)':pct>=50?'var(--amber)':'var(--teal)';
                        return (
                          <tr key={period} style={{background:i%2===0?'#fff':'var(--slate-l)'}}>
                            <td style={{padding:'10px 12px',fontSize:'12.5px',fontWeight:500,color:'var(--navy)',border:'1px solid var(--border)'}}>{period}</td>
                            <td style={{padding:'10px 12px',border:'1px solid var(--border)',textAlign:'center'}}>
                              <span style={{fontFamily:'var(--fm)',fontSize:'13px',fontWeight:700,color:col}}>{pct===0?'Base':'+'+pct+'%'}</span>
                            </td>
                            <td style={{padding:'10px 12px',border:'1px solid var(--border)',textAlign:'center'}}>
                              <span style={{fontFamily:'var(--fm)',fontSize:'12px',color:'var(--slate)'}}>×{multiplier.toFixed(2)}</span>
                            </td>
                            <td style={{padding:'10px 12px',border:'1px solid var(--border)',textAlign:'center'}}>
                              <span style={{fontFamily:'var(--fm)',fontSize:'12px',fontWeight:600,color:'var(--navy)'}}>£{example.toFixed(2)}/hr</span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            </div>

            {/* Time bands (billing only) */}
            {isBilling && (
              <div className="card">
                <div className="card-hd">
                  <span className="card-title">Time bands</span>
                  <span style={{fontSize:'11.5px',color:'var(--slate)'}}>Uplift applied on top of the day rate</span>
                </div>
                <div style={{padding:'0 16px'}}>
                  {sel.timeBands.map((band,i)=>(
                    <div key={i} style={{display:'flex',alignItems:'center',gap:14,padding:'10px 0',borderBottom:i<sel.timeBands.length-1?'1px solid var(--border)':'none'}}>
                      <div style={{flex:1}}>
                        <div style={{fontSize:'12.5px',fontWeight:600,color:'var(--navy)'}}>{band.name}</div>
                        <div style={{fontFamily:'var(--fm)',fontSize:'11.5px',color:'var(--slate)',marginTop:1}}>{band.from} – {band.to}</div>
                      </div>
                      <div style={{textAlign:'center',minWidth:70}}>
                        <span style={{fontFamily:'var(--fm)',fontSize:'13px',fontWeight:700,
                          color:band.uplift===0?'var(--slate)':band.uplift>=33?'var(--amber)':'var(--teal)'}}>
                          {band.uplift===0?'Base':'+'+band.uplift+'%'}
                        </span>
                      </div>
                      <div style={{width:120,height:6,background:'var(--border)',borderRadius:3,overflow:'hidden'}}>
                        <div style={{height:'100%',borderRadius:3,background:band.uplift===0?'var(--border)':'var(--teal)',width:`${Math.min(100,(band.uplift||5)/60*100+8)}%`}}/>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Assigned clients/staff */}
            <div className="card">
              <div className="card-hd">
                <span className="card-title">
                  {isBilling ? `Assigned clients (${sel.assignedClients.length})` : `Assigned staff (${sel.assignedStaff.length})`}
                </span>
                <button className="btn btn-g btn-sm" onClick={()=>flash('Assignment saved')}>
                  + Assign {isBilling?'client':'staff member'}
                </button>
              </div>
              <div style={{padding:'10px 16px',display:'flex',flexWrap:'wrap',gap:7}}>
                {(isBilling ? sel.assignedClients : sel.assignedStaff).map(name=>(
                  <div key={name} style={{display:'flex',alignItems:'center',gap:6,padding:'5px 10px',
                    background:'var(--slate-l)',border:'1px solid var(--border)',borderRadius:20,cursor:'pointer',transition:'all .15s'}}
                    onMouseEnter={e=>e.currentTarget.style.borderColor='var(--teal)'}
                    onMouseLeave={e=>e.currentTarget.style.borderColor='var(--border)'}>
                    <div style={{width:20,height:20,borderRadius:'50%',background:'var(--teal)',
                      display:'flex',alignItems:'center',justifyContent:'center',
                      fontFamily:'var(--fh)',fontSize:'8px',fontWeight:700,color:'#fff',flexShrink:0}}>
                      {name.split(' ').map(n=>n[0]).join('').slice(0,2)}
                    </div>
                    <span style={{fontSize:'12px',fontWeight:500,color:'var(--navy)'}}>{name}</span>
                    <span style={{fontSize:'12px',color:'var(--slate)',cursor:'pointer'}} onClick={e=>{e.stopPropagation();flash(`${name} unassigned`);}}>×</span>
                  </div>
                ))}
                {(isBilling?sel.assignedClients:sel.assignedStaff).length===0 && (
                  <span style={{fontSize:'12.5px',color:'var(--slate)'}}>No {isBilling?'clients':'staff'} assigned yet</span>
                )}
              </div>
            </div>

          </div>
        )}
      </div>
      {toast && <div className="toast">✓ {toast}</div>}
    </>
  );
};
