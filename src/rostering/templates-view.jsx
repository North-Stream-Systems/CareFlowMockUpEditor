import { useState } from 'react';
import { SVC_COLORS } from './constants.jsx';
import { durationMins, timeToMins } from './helpers.jsx';
import { INIT_TEMPLATE_SLOTS, ROUNDS_DATA, STAFF_ROWS_DATA, WEEK_DAYS, WEEK_DAYS_FULL } from './mock-data.jsx';

// ── TEMPLATES VIEW ────────────────────────────────────────────────────────────
export const TemplatesView = ({ onGenerate }) => {
  const [slots,    setSlots]    = useState(INIT_TEMPLATE_SLOTS);
  const [staffId,  setStaffId]  = useState('e1');
  const [selected, setSelected] = useState(null);
  const [addDay,   setAddDay]   = useState(null);

  const staff     = STAFF_ROWS_DATA.find(s => s.id === staffId);
  const mySlots   = slots.filter(s => s.staffId === staffId);
  const selSlot   = selected ? slots.find(s => s.id === selected) : null;
  const totalSlots = mySlots.length;
  const workedDays = [...new Set(mySlots.map(s => s.day))].length;

  const getSlotsForDay = day =>
    mySlots.filter(s => s.day === day).sort((a, b) => timeToMins(a.start) - timeToMins(b.start));

  const handleAddSlot = () => {
    if(addDay === null) return;
    const newSlot = {
      id:       `t${Date.now()}`,
      staffId,
      clientId: 'c_new',
      client:   'New Client',
      day:      addDay,
      start:    '09:00',
      end:      '10:00',
      svc:      'Personal Care',
      roundId:  'r1',
    };
    setSlots(prev => [...prev, newSlot]);
    setSelected(newSlot.id);
    setAddDay(null);
  };

  const handleDelete = () => {
    setSlots(prev => prev.filter(s => s.id !== selected));
    setSelected(null);
  };

  const totalHrs = d => {
    const daySlots = getSlotsForDay(d);
    const mins = daySlots.reduce((s, sl) => s + durationMins(sl.start, sl.end), 0);
    return mins > 0 ? `${(mins/60).toFixed(1)}h` : '';
  };

  return (
    <div className="tpl-wrap">

      {/* Generate banner */}
      <div className="gen-bar">
        <div>
          <div className="gen-bar-label">SmartRota Templates — {staff ? staff.name : ''}</div>
          <div className="gen-bar-sub">{totalSlots} slots across {workedDays} days · Changes save automatically</div>
        </div>
        <button className="gen-btn" onClick={onGenerate}>Generate Week &#10148;</button>
      </div>

      <div style={{flex:1, display:'flex', overflow:'hidden'}}>

        {/* Staff picker list */}
        <div style={{width:200, flexShrink:0, borderRight:'1px solid var(--border)', background:'#fff', display:'flex', flexDirection:'column', overflow:'hidden'}}>
          <div style={{padding:'10px 14px 8px', borderBottom:'1px solid var(--border)', flexShrink:0}}>
            <div style={{fontSize:'10px', fontWeight:700, color:'var(--slate)', textTransform:'uppercase', letterSpacing:'.6px', marginBottom:6}}>Staff</div>
            <input placeholder="Search..." style={{width:'100%', padding:'5px 8px', borderRadius:7, border:'1px solid var(--border)', fontFamily:'var(--fb)', fontSize:12, outline:'none', color:'var(--text)'}} />
          </div>
          <div style={{flex:1, overflowY:'auto'}}>
            {STAFF_ROWS_DATA.map(s => {
              const count = slots.filter(sl => sl.staffId === s.id).length;
              const isActive = s.id === staffId;
              return (
                <div
                  key={s.id}
                  onClick={() => { setStaffId(s.id); setSelected(null); setAddDay(null); }}
                  style={{
                    padding: '10px 14px',
                    borderBottom: '1px solid var(--border)',
                    cursor: 'pointer',
                    background: isActive ? 'var(--teal-l)' : '#fff',
                    borderLeft: isActive ? '2px solid var(--teal)' : '2px solid transparent',
                    transition: 'all .1s',
                  }}
                >
                  <div style={{display:'flex', alignItems:'center', gap:7}}>
                    <div style={{width:26, height:26, borderRadius:7, background:s.color, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--fh)', fontSize:10, fontWeight:700, color:'#fff', flexShrink:0}}>
                      {s.name.split(' ').map(n=>n[0]).join('').slice(0,2)}
                    </div>
                    <div style={{flex:1, minWidth:0}}>
                      <div style={{fontSize:'12px', fontWeight:600, color: isActive ? 'var(--teal)' : 'var(--navy)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{s.name}</div>
                      <div style={{fontSize:'10.5px', color:'var(--slate)'}}>{s.zone}</div>
                    </div>
                    {count > 0 && <div style={{fontFamily:'var(--fm)', fontSize:10, fontWeight:700, color: isActive ? 'var(--teal)' : 'var(--slate)', background: isActive ? 'rgba(13,148,136,.12)' : 'var(--slate-l)', padding:'1px 5px', borderRadius:8}}>{count}</div>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Week grid */}
        <div style={{flex:1, display:'flex', flexDirection:'column', overflow:'hidden', minWidth:0}}>

          {/* Staff header */}
          <div style={{padding:'10px 16px', borderBottom:'1px solid var(--border)', background:'#fff', display:'flex', alignItems:'center', gap:12, flexShrink:0}}>
            <div style={{width:32, height:32, borderRadius:9, background:staff?.color||'var(--slate)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--fh)', fontSize:12, fontWeight:700, color:'#fff', flexShrink:0}}>
              {staff?.name.split(' ').map(n=>n[0]).join('').slice(0,2)}
            </div>
            <div>
              <div style={{fontFamily:'var(--fh)', fontSize:14, fontWeight:700, color:'var(--navy)'}}>{staff?.name}</div>
              <div style={{fontSize:'11.5px', color:'var(--slate)'}}>{staff?.role} · {staff?.zone} Zone · {staff?.contract} · {totalSlots} template slots</div>
            </div>
            <div style={{marginLeft:'auto', display:'flex', gap:7}}>
              <button className="btn btn-g btn-sm">Copy from week 2</button>
              <button className="btn btn-g btn-sm">Clear week</button>
            </div>
          </div>

          {/* Day columns */}
          <div style={{flex:1, display:'flex', overflow:'hidden'}}>
            <div style={{flex:1, display:'flex', overflow:'auto'}}>
              {WEEK_DAYS.map((day, dayIdx) => {
                const daySlots = getSlotsForDay(dayIdx);
                const hrs      = totalHrs(dayIdx);
                const isWknd   = dayIdx >= 5;
                return (
                  <div key={day} style={{flex:1, minWidth:130, display:'flex', flexDirection:'column', borderRight:'1px solid var(--border)'}}>

                    {/* Day header */}
                    <div style={{
                      padding:'8px 10px', borderBottom:'1px solid var(--border)', textAlign:'center',
                      background: isWknd ? '#FFFBEB' : '#fff', flexShrink:0,
                      position:'sticky', top:0, zIndex:5,
                    }}>
                      <div style={{fontSize:'11px', fontWeight:700, color: isWknd ? '#92400E' : 'var(--slate)', textTransform:'uppercase', letterSpacing:'.5px'}}>{WEEK_DAYS_FULL[dayIdx]}</div>
                      {hrs && <div style={{fontFamily:'var(--fm)', fontSize:'10px', color:'var(--teal)', marginTop:2}}>{hrs}</div>}
                    </div>

                    {/* Slots */}
                    <div style={{flex:1, padding:6, display:'flex', flexDirection:'column', gap:5, overflowY:'auto', minHeight:120}}>
                      {daySlots.map(slot => {
                        const col = SVC_COLORS[slot.svc] || SVC_COLORS['Personal Care'];
                        const isSelected = selected === slot.id;
                        const dur = durationMins(slot.start, slot.end);
                        return (
                          <div
                            key={slot.id}
                            onClick={() => { setSelected(s => s===slot.id?null:slot.id); setAddDay(null); }}
                            style={{
                              background: col.bg,
                              color: col.fg,
                              borderRadius: 8,
                              padding: '7px 9px',
                              cursor: 'pointer',
                              outline: isSelected ? '2px solid var(--navy)' : 'none',
                              outlineOffset: 2,
                              transition: 'all .15s',
                              boxShadow: isSelected ? '0 2px 8px rgba(0,0,0,.2)' : '0 1px 2px rgba(0,0,0,.1)',
                              flexShrink: 0,
                            }}
                          >
                            <div style={{fontSize:'12px', fontWeight:700, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{slot.client}</div>
                            <div style={{fontFamily:'var(--fm)', fontSize:'10px', opacity:.85, marginTop:2}}>{slot.start} – {slot.end}</div>
                            <div style={{fontSize:'10px', opacity:.75, marginTop:1}}>{slot.svc} · {dur}min</div>
                          </div>
                        );
                      })}

                      {/* Add button */}
                      <div
                        onClick={() => { setAddDay(dayIdx); setSelected(null); }}
                        style={{
                          border: '1.5px dashed var(--border)',
                          borderRadius: 8,
                          padding: '8px',
                          textAlign: 'center',
                          cursor: 'pointer',
                          color: addDay === dayIdx ? 'var(--teal)' : 'var(--slate)',
                          fontSize: '11.5px',
                          fontWeight: 500,
                          background: addDay === dayIdx ? 'var(--teal-l)' : 'transparent',
                          borderColor: addDay === dayIdx ? 'var(--teal)' : 'var(--border)',
                          transition: 'all .15s',
                          flexShrink: 0,
                        }}
                      >
                        + Add visit
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Side panel — slot detail or add */}
            {(selSlot || addDay !== null) && (
              <div className="slot-panel">
                {selSlot && (
                  <>
                    <div className="sp-hd" style={{background:SVC_COLORS[selSlot.svc]?.bg, position:'relative'}}>
                      <div className="sp-hd-title" style={{color:'#fff'}}>{selSlot.client}</div>
                      <div className="sp-hd-sub" style={{color:'rgba(255,255,255,.65)'}}>{WEEK_DAYS_FULL[selSlot.day]} · {selSlot.start} – {selSlot.end}</div>
                      <button className="sp-close" style={{background:'rgba(255,255,255,.15)',color:'rgba(255,255,255,.8)'}} onClick={() => setSelected(null)}>×</button>
                    </div>
                    <div className="sp-body">
                      <div className="sp-section">Slot details</div>
                      {[
                        ['Day',      WEEK_DAYS_FULL[selSlot.day]],
                        ['Client',   selSlot.client],
                        ['Service',  selSlot.svc],
                        ['Start',    selSlot.start],
                        ['End',      selSlot.end],
                        ['Duration', `${durationMins(selSlot.start, selSlot.end)} minutes`],
                        ['Round',    ROUNDS_DATA.find(r => r.id === selSlot.roundId)?.name || '—'],
                      ].map(([l,v]) => (
                        <div key={l} className="sp-row">
                          <span className="sp-label">{l}</span>
                          <span className="sp-val">{v}</span>
                        </div>
                      ))}
                      <div className="sp-section">Repeats on</div>
                      <div style={{display:'flex',flexWrap:'wrap',gap:5,paddingTop:4}}>
                        {WEEK_DAYS.map((d, i) => {
                          const on = mySlots.some(s => s.clientId===selSlot.clientId && s.day===i);
                          const col = SVC_COLORS[selSlot.svc]?.bg;
                          return (
                            <div key={d} style={{width:33,height:33,borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'11px',fontWeight:700,background:on?col:'var(--slate-l)',color:on?'#fff':'var(--slate)',cursor:'pointer',border:on?'none':'1.5px dashed var(--border)',transition:'all .15s'}}>
                              {d}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="sp-actions">
                      <button className="btn btn-g btn-sm" style={{justifyContent:'center'}}>Edit times</button>
                      <button className="btn btn-g btn-sm" style={{justifyContent:'center'}}>Change client</button>
                      <button className="btn btn-g btn-sm" style={{justifyContent:'center',color:'var(--red)',borderColor:'var(--red-l)'}} onClick={handleDelete}>Remove from template</button>
                    </div>
                  </>
                )}
                {addDay !== null && selSlot === null && (
                  <>
                    <div className="sp-hd">
                      <div className="sp-hd-title">Add template visit</div>
                      <div className="sp-hd-sub">{staff?.name} · {WEEK_DAYS_FULL[addDay]}</div>
                      <button className="sp-close" onClick={() => setAddDay(null)}>×</button>
                    </div>
                    <div className="sp-body">
                      <div className="sp-section">Visit details</div>
                      {[['Client','Select client...'],['Service','Personal Care'],['Start','09:00'],['End','10:00'],['Round','Monday AM North']].map(([l,v]) => (
                        <div key={l} className="sp-row">
                          <span className="sp-label">{l}</span>
                          <span className="sp-val" style={{color:'var(--slate)'}}>{v}</span>
                        </div>
                      ))}
                      <div style={{marginTop:14,padding:'10px 12px',background:'var(--teal-l)',borderRadius:8,fontSize:'12px',color:'var(--teal)',lineHeight:1.5}}>
                        This visit will appear on {WEEK_DAYS_FULL[addDay]} every week until removed from the template.
                      </div>
                    </div>
                    <div className="sp-actions">
                      <button className="btn btn-p btn-sm" style={{justifyContent:'center'}} onClick={handleAddSlot}>Add to template</button>
                      <button className="btn btn-g btn-sm" style={{justifyContent:'center'}} onClick={() => setAddDay(null)}>Cancel</button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
