import { useState } from 'react';
import { DAYS, SHIFTS, SVC_COLORS, getDate, nowMins, timeToMins } from './data.jsx';
import { GREETING, TODAY_STR } from './App.jsx';

// ── SCHEDULE SCREEN ────────────────────────────────────────────────────────────
export const ScheduleScreen = ({ onOpenVisit }) => {
  const [dayOffset, setDayOffset] = useState(0);
  const now = nowMins();

  const days = Array.from({length:7}, (_,i) => i-1);
  const stIcon = { completed:'✓', current:'▶', upcoming:'○' };

  return (
    <>
      <div className="screen-hd">
        <div className="screen-hd-title">{GREETING}, Emma</div>
        <div className="screen-hd-sub">{TODAY_STR}</div>
      </div>

      <div className="day-pill">
        {days.map(offset => {
          const d = getDate(offset);
          const hasShifts = offset===0||offset===1;
          return (
            <div key={offset} className={`dpill${dayOffset===offset?' on':''}`} onClick={()=>setDayOffset(offset)}>
              <div className="dpill-day">{DAYS[d.getDay()]}</div>
              <div className="dpill-date">{d.getDate()}</div>
              <div className="dpill-dot" style={{background:dayOffset===offset?'rgba(255,255,255,.4)':hasShifts?'var(--teal)':'transparent'}}/>
            </div>
          );
        })}
      </div>

      <div className="screen-content">
        {dayOffset === 0 ? (
          <>
            {/* Summary banner */}
            <div style={{margin:'10px 12px',background:'var(--navy)',borderRadius:14,padding:'13px 15px'}}>
              <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between'}}>
                <div>
                  <div style={{fontFamily:'var(--fh)',fontSize:'11px',fontWeight:700,color:'rgba(255,255,255,.5)',textTransform:'uppercase',letterSpacing:'.5px',marginBottom:4}}>Today</div>
                  <div style={{fontFamily:'var(--fh)',fontSize:'22px',fontWeight:800,color:'#fff',lineHeight:1}}>4 visits</div>
                  <div style={{fontSize:'12.5px',color:'rgba(255,255,255,.5)',marginTop:4}}>4hr 30min · 10.2 miles</div>
                </div>
                <div style={{textAlign:'right'}}>
                  {[['✓','Completed','var(--green)'],['▶','In progress','var(--teal)'],['○','Upcoming','rgba(255,255,255,.3)']].map(([ico,label,col])=>(
                    <div key={label} style={{display:'flex',alignItems:'center',gap:5,justifyContent:'flex-end',marginBottom:3}}>
                      <span style={{fontSize:'11px',color:'rgba(255,255,255,.45)'}}>{label}</span>
                      <span style={{fontSize:'13px',color:col}}>{ico}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Progress bar */}
              <div style={{height:4,background:'rgba(255,255,255,.1)',borderRadius:2,marginTop:10,overflow:'hidden'}}>
                <div style={{height:'100%',width:'25%',background:'var(--teal)',borderRadius:2,transition:'width .5s'}}/>
              </div>
              <div style={{fontSize:'10.5px',color:'rgba(255,255,255,.35)',marginTop:4,fontFamily:'var(--fm)'}}>1 of 4 visits complete</div>
            </div>

            {SHIFTS.map((shift, idx) => {
              const startM = timeToMins(shift.time);
              const endM   = timeToMins(shift.end);
              const isCurrent = shift.status==='current';
              const isNowLine = idx > 0 && timeToMins(SHIFTS[idx-1].end) < now && startM > now;
              const col = SVC_COLORS[shift.svc]||'#64748B';
              const isClickable = shift.status !== 'completed';

              return (
                <div key={shift.id}>
                  {isNowLine && (
                    <div className="now-line">
                      <div className="now-line-bar"/>
                      <div className="now-time">NOW</div>
                      <div className="now-line-bar"/>
                    </div>
                  )}

                  {/* Travel time between visits */}
                  {idx > 0 && shift.travel && (
                    <div className="shift-travel">
                      <span style={{fontSize:14}}>🚗</span>
                      <span>{shift.travel.mins} min drive · {shift.travel.miles} miles to next visit</span>
                    </div>
                  )}

                  <div className={`shift-card${isCurrent?' current':''}`}
                    style={{opacity:shift.status==='completed'?.65:1}}
                    onClick={()=>isClickable&&onOpenVisit(shift)}>
                    <div className="shift-stripe" style={{background:col}}/>
                    <div className="shift-body">
                      <div className="shift-time-row">
                        <span className="shift-time">{shift.time} – {shift.end}</span>
                        <div style={{display:'flex',alignItems:'center',gap:6}}>
                          <span className="shift-dur">{shift.dur}min</span>
                          <span className={`tag t-${shift.status==='completed'?'green':shift.status==='current'?'teal':'slate'}`} style={{fontSize:'10.5px'}}>
                            {stIcon[shift.status]} {shift.status==='current'?'In progress':shift.status==='completed'?'Done':'Upcoming'}
                          </span>
                        </div>
                      </div>
                      <div className="shift-client">{shift.client}</div>
                      <div className="shift-addr" style={{marginBottom:shift.alerts.length>0?8:4}}>📍 {shift.addr}</div>

                      {/* Alerts on card */}
                      {shift.alerts.slice(0,1).map((a,i)=>(
                        <div key={i} className="shift-alert" style={{
                          background:a.type==='red'?'var(--red-l)':'var(--amber-l)',
                          color:a.type==='red'?'var(--red)':'#92400E',
                        }}>
                          <span>{a.type==='red'?'⚠️':'⚡'}</span>
                          <span>{a.text}</span>
                        </div>
                      ))}
                      {shift.alerts.length > 1 && (
                        <div style={{fontSize:'11px',color:'var(--slate)',marginTop:4}}>+{shift.alerts.length-1} more alert{shift.alerts.length>2?'s':''}</div>
                      )}

                      <div className="shift-footer" style={{marginTop:8}}>
                        <div className="shift-svc-dot" style={{background:col}}/>
                        <span style={{fontSize:'12px',color:'var(--slate)',flex:1}}>{shift.svc}</span>
                        {/* Task progress */}
                        <span style={{fontFamily:'var(--fm)',fontSize:'11px',color:'var(--slate)'}}>
                          {shift.tasks.filter(t=>t.done).length}/{shift.tasks.length} tasks
                        </span>
                        {isClickable && (
                          <span style={{fontSize:'12px',color:'var(--teal)',fontWeight:600,marginLeft:8}}>
                            {isCurrent?'Continue →':'Open →'}
                          </span>
                        )}
                      </div>
                    </div>
                    {/* Signed in/out times */}
                    {shift.signedInAt && (
                      <div style={{padding:'7px 14px',background:'var(--slate-l)',borderTop:'1px solid var(--border)',display:'flex',gap:14,fontSize:'11px',color:'var(--slate)'}}>
                        <span>🟢 In: <strong style={{fontFamily:'var(--fm)'}}>{shift.signedInAt}</strong></span>
                        {shift.signedOutAt && <span>🔴 Out: <strong style={{fontFamily:'var(--fm)'}}>{shift.signedOutAt}</strong></span>}
                        {!shift.signedOutAt && <span style={{color:'var(--teal)',fontWeight:600}}>● Currently active</span>}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            <div style={{height:24}}/>
          </>
        ) : (
          <div style={{padding:'40px 20px',textAlign:'center',color:'var(--slate)'}}>
            <div style={{fontSize:40,marginBottom:12}}>📅</div>
            <div style={{fontFamily:'var(--fh)',fontSize:'16px',fontWeight:600,color:'var(--navy)',marginBottom:6}}>
              {dayOffset===1?'Tomorrow':dayOffset===-1?'Yesterday':'No shifts scheduled'}
            </div>
            <div style={{fontSize:'13px',lineHeight:1.6}}>
              {dayOffset===1
                ? '3 visits · Mrs G Williams 07:30 · Mr I Lloyd 09:00 · Mrs H Thomas 10:30'
                : dayOffset===-1
                ? '4 visits completed · 4hr 15min total'
                : 'No shifts scheduled for this day'}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
