import { useEffect, useRef, useState } from 'react';
import { SHIFTS, SVC_COLORS } from './data.jsx';
import { EVVSignIn } from './evv-sign-in.jsx';

// ── CO-WORKER CARD ─────────────────────────────────────────────────────────────
const CoWorkerCard = ({ coWorker, compact=false }) => {
  const [showPhone, setShowPhone] = useState(false);
  const cw = coWorker;

  if(compact) {
    // Slim version for active screen header (on coloured background)
    return (
      <div style={{display:'flex',alignItems:'center',gap:8,padding:'7px 10px',
        background:'rgba(255,255,255,.12)',borderRadius:10,border:'1px solid rgba(255,255,255,.2)',
        cursor:'pointer'}}
        onClick={()=>setShowPhone(s=>!s)}>
        <div style={{width:26,height:26,borderRadius:7,background:cw.color,display:'flex',
          alignItems:'center',justifyContent:'center',fontSize:'10px',fontWeight:700,
          color:'#fff',flexShrink:0,border:'1.5px solid rgba(255,255,255,.3)'}}>
          {cw.initials}
        </div>
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontSize:'12.5px',fontWeight:700,color:'#fff'}}>{cw.name}</div>
          <div style={{fontSize:'10.5px',color:'rgba(255,255,255,.6)'}}>
            {showPhone ? cw.phone : `${cw.role} · tap for number`}
          </div>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:6}}>
          <div style={{width:7,height:7,borderRadius:'50%',
            background:cw.signedIn?'#4ade80':'rgba(255,255,255,.4)',flexShrink:0}}/>
          <span style={{fontSize:'10.5px',color:'rgba(255,255,255,.6)',fontWeight:600}}>
            {cw.signedIn?'Signed in':'Not yet arrived'}
          </span>
        </div>
        {showPhone && (
          <a href={`tel:${cw.phone.replace(/\s/g,'')}`}
            style={{padding:'5px 10px',background:'var(--green)',borderRadius:7,fontSize:'12px',
              fontWeight:700,color:'#fff',textDecoration:'none',flexShrink:0}}
            onClick={e=>e.stopPropagation()}>
            📞
          </a>
        )}
      </div>
    );
  }

  // Full version for arrive screen
  return (
    <div style={{background:'#fff',borderRadius:12,overflow:'hidden',
      border:'1.5px solid rgba(139,92,246,.3)',boxShadow:'0 2px 8px rgba(139,92,246,.1)'}}>
      <div style={{display:'flex',alignItems:'center',gap:11,padding:'12px 14px',cursor:'pointer'}}
        onClick={()=>setShowPhone(s=>!s)}>
        <div style={{width:38,height:38,borderRadius:11,background:cw.color,display:'flex',
          alignItems:'center',justifyContent:'center',fontSize:'13px',fontWeight:700,
          color:'#fff',flexShrink:0,border:`2px solid ${cw.color}40`}}>
          {cw.initials}
        </div>
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontSize:'14px',fontWeight:700,color:'var(--navy)'}}>{cw.name}</div>
          <div style={{fontSize:'12px',color:'var(--slate)',marginTop:1}}>{cw.role}</div>
        </div>
        <div style={{textAlign:'right',flexShrink:0}}>
          <div style={{display:'flex',alignItems:'center',gap:5,justifyContent:'flex-end',marginBottom:3}}>
            <div style={{width:7,height:7,borderRadius:'50%',
              background:cw.signedIn?'var(--green)':'var(--amber)'}}/>
            <span style={{fontSize:'11px',fontWeight:600,
              color:cw.signedIn?'var(--green)':'var(--amber)'}}>
              {cw.signedIn?'Signed in':'Not yet arrived'}
            </span>
          </div>
          <div style={{fontSize:'11.5px',color:'var(--teal)',fontWeight:600}}>
            {showPhone?'Tap to hide':'Tap for number'}
          </div>
        </div>
      </div>

      {showPhone && (
        <div style={{borderTop:'1px solid var(--border)',padding:'11px 14px',
          background:'var(--purple-l)',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <div>
            <div style={{fontSize:'11px',fontWeight:700,color:'var(--purple)',
              textTransform:'uppercase',letterSpacing:'.4px',marginBottom:3}}>Mobile number</div>
            <div style={{fontFamily:'var(--fm)',fontSize:'16px',fontWeight:700,color:'var(--navy)',
              letterSpacing:'1px'}}>{cw.phone}</div>
          </div>
          <a href={`tel:${cw.phone.replace(/\s/g,'')}`}
            style={{display:'flex',alignItems:'center',gap:6,padding:'10px 16px',
              background:'var(--green)',borderRadius:11,fontSize:'13.5px',fontWeight:700,
              color:'#fff',textDecoration:'none',boxShadow:'0 3px 10px rgba(16,185,129,.3)',
              transition:'all .15s'}}
            onClick={e=>e.stopPropagation()}>
            📞 Call
          </a>
        </div>
      )}
    </div>
  );
};

export const VisitScreen = ({ shift, onBack }) => {
  // step: 'arrive' | 'active' | 'signout' | 'done'
  const [step,     setStep]    = useState(shift.status==='current' ? 'active' : 'arrive');
  const [tasks,    setTasks]   = useState(shift.tasks.map(t=>({...t})));
  const [note,     setNote]    = useState(shift.notes||'');
  const [marState, setMar]     = useState(shift.meds.map(m=>({...m,given:false})));
  const [elapsed,  setElapsed] = useState(shift.status==='current' ? 847 : 0);
  const [activeTab,setActiveTab]= useState('tasks');
  const [showConfirm,setShowConfirm] = useState(false);
  const timer = useRef(null);
  const col = SVC_COLORS[shift.svc]||'#64748B';
  const doneCount  = tasks.filter(t=>t.done).length;
  const allDone    = doneCount === tasks.length;
  const marDone    = marState.filter(m=>m.given).length;

  useEffect(()=>{
    if(step==='active'){
      timer.current = setInterval(()=>setElapsed(e=>e+1),1000);
    }
    return ()=>clearInterval(timer.current);
  },[step]);

  const formatElapsed = s => {
    const m=Math.floor(s/60),sec=s%60;
    return `${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
  };

  const signInTime = new Date();
  const signInStr  = `${String(signInTime.getHours()).padStart(2,'0')}:${String(signInTime.getMinutes()).padStart(2,'0')}`;

  const STEPS = ['Arrive','Active','Sign out','Done'];
  const stepIdx = {arrive:0,active:1,signout:2,done:3}[step];

  // ── ARRIVE SCREEN ──
  if(step==='arrive') return (
    <div style={{display:'flex',flexDirection:'column',height:'100%'}}>
      <div className="visit-hd" style={{background:col}}>
        <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:10}}>
          <button onClick={onBack} style={{background:'rgba(255,255,255,.15)',border:'none',color:'#fff',width:32,height:32,borderRadius:10,cursor:'pointer',fontSize:18,display:'flex',alignItems:'center',justifyContent:'center'}}>←</button>
          <span style={{fontFamily:'var(--fm)',fontSize:'12px',color:'rgba(255,255,255,.7)'}}>{shift.time} – {shift.end} · {shift.dur}min</span>
        </div>
        {/* Step bar */}
        <div style={{display:'flex',alignItems:'center',gap:4,marginBottom:12}}>
          {STEPS.map((s,i)=>(
            <React.Fragment key={s}>
              {i>0 && <div className="vp-step" style={{background:i<=stepIdx?'rgba(255,255,255,.7)':'rgba(255,255,255,.2)'}}/>}
              <div style={{fontSize:9,fontWeight:700,color:i===stepIdx?'#fff':'rgba(255,255,255,.4)',textTransform:'uppercase',letterSpacing:'.3px',flexShrink:0}}>{s}</div>
            </React.Fragment>
          ))}
        </div>
        <div className="visit-hd-client">{shift.client}</div>
        <div className="visit-hd-addr">📍 {shift.addr}</div>
      </div>

      <div className="screen-content" style={{padding:'0 0 20px'}}>
        {/* Key safe */}
        <div className="arrive-card">
          <div className="arrive-section">
            <div className="arrive-label">Key safe code</div>
            <div className="keysafe-display">
              <div>
                <div className="keysafe-label">Enter to access property</div>
                <div className="keysafe-code">{shift.keyCode}</div>
              </div>
              <span style={{fontSize:28}}>🔑</span>
            </div>
          </div>

          {/* Emergency contact */}
          <div className="arrive-section">
            <div className="arrive-label">Emergency contact</div>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
              <span style={{fontSize:'13.5px',fontWeight:500,color:'var(--text)'}}>{shift.emergency}</span>
              <button style={{background:'var(--green-l)',border:'none',borderRadius:8,padding:'7px 12px',fontSize:'12.5px',fontWeight:600,color:'#065F46',cursor:'pointer'}}>📞 Call</button>
            </div>
          </div>

          {/* Co-worker — double-handed calls */}
          {shift.coWorker && (
            <div className="arrive-section" style={{background:'var(--purple-l)',borderTop:'2px solid var(--purple)20'}}>
              <div className="arrive-label" style={{color:'var(--purple)'}}>👥 Double-handed call — your co-worker</div>
              <CoWorkerCard coWorker={shift.coWorker}/>
            </div>
          )}

          {/* Flagged note from coordinator */}
          {shift.alerts.length === 0 && shift.id === 's3' && (
            <div className="arrive-section">
              <div className="arrive-label">Note from coordinator</div>
              <div className="alert-strip" style={{background:'var(--amber-l)',color:'#92400E',marginBottom:0}}>
                <span style={{fontSize:16}}>🚩</span>
                <div>
                  <div style={{fontWeight:700,marginBottom:2}}>Action needed before visit</div>
                  <span>Two-carer call — confirm second carer has arrived before signing in. Contact Cameron D if cover has not arrived.</span>
                </div>
              </div>
            </div>
          )}

          {/* GP / alerts */}
          {shift.alerts.length > 0 && (
            <div className="arrive-section">
              <div className="arrive-label">Alerts — read before entering</div>
              {shift.alerts.map((a,i)=>(
                <div key={i} className="alert-strip" style={{background:a.type==='red'?'var(--red-l)':'var(--amber-l)',color:a.type==='red'?'var(--red)':'#92400E'}}>
                  <span style={{fontSize:16}}>{a.type==='red'?'⛔':'⚠️'}</span>
                  <span style={{lineHeight:1.4}}>{a.text}</span>
                </div>
              ))}
            </div>
          )}

          {/* Tasks preview */}
          <div className="arrive-section">
            <div className="arrive-label">This visit — {shift.tasks.length} tasks</div>
            {shift.tasks.slice(0,3).map((t,i)=>(
              <div key={i} style={{fontSize:'12.5px',color:'var(--slate)',padding:'3px 0',display:'flex',gap:6,alignItems:'flex-start'}}>
                <span style={{color:'var(--border)',marginTop:1}}>○</span>{t.text}
              </div>
            ))}
            {shift.tasks.length>3 && <div style={{fontSize:'12px',color:'var(--teal)',marginTop:4}}>+{shift.tasks.length-3} more tasks</div>}
          </div>
        </div>

        <div style={{padding:'14px 14px 0'}}>
          <EVVSignIn onSignIn={()=>setStep('active')}/>
        </div>
      </div>
    </div>
  );

  // ── ACTIVE SCREEN ──
  if(step==='active') return (
    <div style={{display:'flex',flexDirection:'column',height:'100%',position:'relative'}}>
      <div style={{background:col,flexShrink:0}}>
        <div style={{padding:'12px 16px 0'}}>
          <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:8}}>
            <button onClick={onBack} style={{background:'rgba(255,255,255,.15)',border:'none',color:'#fff',width:32,height:32,borderRadius:10,cursor:'pointer',fontSize:18,display:'flex',alignItems:'center',justifyContent:'center'}}>←</button>
            <span style={{fontFamily:'var(--fm)',fontSize:'12px',color:'rgba(255,255,255,.7)'}}>{shift.time} – {shift.end}</span>
            <div style={{marginLeft:'auto',background:'rgba(255,255,255,.15)',borderRadius:20,padding:'4px 10px',display:'flex',alignItems:'center',gap:5}}>
              <div style={{width:6,height:6,borderRadius:'50%',background:'#fff',animation:'pulse 1.5s infinite'}}/>
              <span style={{fontFamily:'var(--fm)',fontSize:'13px',fontWeight:700,color:'#fff'}}>{formatElapsed(elapsed)}</span>
            </div>
          </div>
          {/* Step bar */}
          <div style={{display:'flex',alignItems:'center',gap:4,marginBottom:10}}>
            {STEPS.map((s,i)=>(
              <React.Fragment key={s}>
                {i>0 && <div className="vp-step" style={{background:i<=stepIdx?'rgba(255,255,255,.7)':'rgba(255,255,255,.2)'}}/>}
                <div style={{fontSize:9,fontWeight:700,color:i===stepIdx?'#fff':'rgba(255,255,255,.4)',textTransform:'uppercase',letterSpacing:'.3px',flexShrink:0}}>{s}</div>
              </React.Fragment>
            ))}
          </div>
          <div style={{fontFamily:'var(--fh)',fontSize:'18px',fontWeight:800,color:'#fff',marginBottom:2}}>{shift.client}</div>
          <div style={{fontSize:'11.5px',color:'rgba(255,255,255,.55)',marginBottom:shift.coWorker?6:10}}>
            Signed in {signInStr} · Location verified ✓
          </div>

          {/* Co-worker strip on active screen */}
          {shift.coWorker && (
            <div style={{marginBottom:10}}>
              <CoWorkerCard coWorker={shift.coWorker} compact={true}/>
            </div>
          )}

          {/* Inner tabs */}
          <div style={{display:'flex',gap:0,borderBottom:'1px solid rgba(255,255,255,.15)'}}>
            {['tasks','notes',...(shift.meds.length>0?['meds']:[])].map(t=>(
              <button key={t} onClick={()=>setActiveTab(t)} style={{
                padding:'8px 14px',background:'none',border:'none',cursor:'pointer',
                color:activeTab===t?'#fff':'rgba(255,255,255,.45)',
                fontFamily:'var(--fb)',fontSize:'13px',fontWeight:activeTab===t?600:500,
                borderBottom:activeTab===t?'2px solid #fff':'2px solid transparent',
                textTransform:'capitalize',
              }}>
                {t==='tasks'?`Tasks (${doneCount}/${tasks.length})`:t==='meds'?`Meds (${marDone}/${marState.length})`:t}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="screen-content">
        {/* Tasks tab */}
        {activeTab==='tasks' && (
          <div className="card" style={{margin:'12px 12px'}}>
            {tasks.map(task=>(
              <div key={task.id} className="task-item"
                onClick={()=>setTasks(prev=>prev.map(t=>t.id===task.id?{...t,done:!t.done}:t))}>
                <div className={`task-check${task.done?' done':''}`}>{task.done?'✓':''}</div>
                <div className={`task-text${task.done?' done-text':''}`}>{task.text}</div>
              </div>
            ))}
            {allDone && (
              <div style={{padding:'12px 14px',background:'var(--green-l)',display:'flex',alignItems:'center',gap:8,borderTop:'1px solid var(--border)'}}>
                <span style={{fontSize:18}}>✅</span>
                <span style={{fontSize:'13px',fontWeight:600,color:'#065F46'}}>All tasks completed</span>
              </div>
            )}
          </div>
        )}

        {/* Notes tab */}
        {activeTab==='notes' && (
          <div style={{padding:'12px 14px'}}>
            <div style={{fontSize:'11.5px',color:'var(--slate)',marginBottom:8,fontWeight:600,textTransform:'uppercase',letterSpacing:'.4px'}}>Care note</div>
            <textarea className="note-input" style={{minHeight:140}}
              placeholder="Record observations, client mood, any concerns or changes noted during this visit..."
              value={note} onChange={e=>setNote(e.target.value)}/>
            <div style={{display:'flex',gap:8,marginTop:10,flexWrap:'wrap'}}>
              {['Client comfortable','No concerns','Medication refused','GP contact required','Family informed','Care plan review needed'].map(q=>(
                <button key={q} onClick={()=>setNote(n=>n+(n?'\n':'')+q)}
                  style={{padding:'6px 11px',borderRadius:20,border:'1px solid var(--border)',background:'#fff',fontSize:'12px',cursor:'pointer',color:'var(--navy)',transition:'all .15s'}}>
                  + {q}
                </button>
              ))}
            </div>
            {note.length>0 && <div style={{fontSize:'11px',color:'var(--slate)',marginTop:8,textAlign:'right',fontFamily:'var(--fm)'}}>{note.length} chars</div>}
          </div>
        )}

        {/* Medication tab */}
        {activeTab==='meds' && (
          <div className="card" style={{margin:'12px 12px'}}>
            <div className="card-hd">
              <span className="card-title">MAR — Medication Administration</span>
              <span style={{fontSize:'11px',color:'var(--slate)'}}>{marDone}/{marState.length} recorded</span>
            </div>
            {marState.map((m,i)=>(
              <div key={i} style={{display:'flex',alignItems:'center',gap:12,padding:'13px 16px',borderBottom:i<marState.length-1?'1px solid var(--border)':'none'}}>
                <div style={{flex:1}}>
                  <div style={{fontSize:'13.5px',fontWeight:600,color:'var(--navy)'}}>{m.name}</div>
                  <div style={{fontSize:'11.5px',color:'var(--slate)',marginTop:1}}>{m.time} · {m.route}</div>
                </div>
                <div style={{display:'flex',gap:7}}>
                  <button onClick={()=>setMar(prev=>prev.map((x,j)=>j===i?{...x,given:true,outcome:'given'}:x))}
                    style={{padding:'7px 12px',borderRadius:9,border:'none',background:m.given&&m.outcome==='given'?'var(--green)':'var(--green-l)',color:m.given&&m.outcome==='given'?'#fff':'#065F46',fontSize:'12px',fontWeight:600,cursor:'pointer',transition:'all .15s'}}>
                    ✓ Given
                  </button>
                  <button onClick={()=>setMar(prev=>prev.map((x,j)=>j===i?{...x,given:true,outcome:'refused'}:x))}
                    style={{padding:'7px 12px',borderRadius:9,border:'none',background:m.given&&m.outcome==='refused'?'var(--red)':'var(--red-l)',color:m.given&&m.outcome==='refused'?'#fff':'var(--red)',fontSize:'12px',fontWeight:600,cursor:'pointer',transition:'all .15s'}}>
                    ✕ Refused
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        <div style={{height:100}}/>
      </div>

      {/* Sticky sign out button */}
      <div style={{position:'absolute',bottom:0,left:0,right:0,padding:'10px 14px 16px',background:'linear-gradient(to top,#fff 70%,transparent)',flexShrink:0}}>
        <button className="btn btn-red btn-full" style={{padding:'15px',fontSize:'15px',borderRadius:14}}
          onClick={()=>setShowConfirm(true)}>
          🏁 Sign out of visit
        </button>
      </div>

      {/* Confirm sign-out sheet */}
      {showConfirm && (
        <div style={{position:'absolute',inset:0,background:'rgba(13,31,60,.5)',zIndex:30}}
          onClick={()=>setShowConfirm(false)}>
          <div className="confirm-sheet" onClick={e=>e.stopPropagation()}>
            <div style={{width:36,height:4,borderRadius:2,background:'var(--border)',margin:'0 auto 16px'}}/>
            <div style={{fontFamily:'var(--fh)',fontSize:'17px',fontWeight:700,color:'var(--navy)',marginBottom:6}}>Sign out of visit?</div>
            {!allDone && (
              <div style={{padding:'9px 12px',background:'var(--amber-l)',border:'1px solid var(--amber)',borderRadius:10,fontSize:'12.5px',color:'#92400E',marginBottom:12,display:'flex',gap:7,alignItems:'center'}}>
                <span>⚠️</span><span>{tasks.length-doneCount} task{tasks.length-doneCount!==1?'s':''} not yet completed. You can still sign out.</span>
              </div>
            )}
            <div style={{marginBottom:14}}>
              {[['Tasks completed',`${doneCount} of ${tasks.length}`],['Time in visit',formatElapsed(elapsed)],['Notes',note.length>0?'Recorded':'None added'],...(shift.meds.length>0?[['Medications',`${marDone} of ${marState.length} recorded`]]:[])].map(([l,v])=>(
                <div key={l} className="summary-row"><span className="summary-label">{l}</span><span className="summary-val">{v}</span></div>
              ))}
            </div>
            <button className="btn btn-red btn-full" style={{padding:'14px',fontSize:'15px',marginBottom:8}}
              onClick={()=>{setShowConfirm(false);setStep('done');}}>
              Confirm sign out
            </button>
            <button className="btn btn-g btn-full" style={{padding:'12px',fontSize:'14px'}}
              onClick={()=>setShowConfirm(false)}>
              Continue visit
            </button>
          </div>
        </div>
      )}
    </div>
  );

  // ── DONE SCREEN ──
  if(step==='done') {
    const nextShift = SHIFTS.find(s=>s.id==='s3');
    return (
      <div style={{display:'flex',flexDirection:'column',height:'100%',background:'#fff'}}>
        <div style={{background:col,padding:'14px 16px'}}>
          <button onClick={onBack} style={{background:'rgba(255,255,255,.15)',border:'none',color:'#fff',width:32,height:32,borderRadius:10,cursor:'pointer',fontSize:18,display:'flex',alignItems:'center',justifyContent:'center'}}>←</button>
        </div>
        <div className="screen-content">
          <div className="completed-screen">
            <div className="completed-tick">✓</div>
            <div className="completed-title">Visit complete</div>
            <div className="completed-sub">
              {shift.client}<br/>
              Notes saved · MAR updated · Time recorded
            </div>
            <div style={{width:'100%',background:'var(--slate-l)',borderRadius:14,padding:'4px 16px',marginBottom:16}}>
              {[
                ['Signed in',signInStr],
                ['Signed out',signInStr.replace(/\d+$/,m=>String(parseInt(m)+37).padStart(2,'0'))],
                ['Total time',formatElapsed(elapsed)],
                ['Tasks',`${doneCount}/${tasks.length} completed`],
                ['Notes',note.length>0?'Recorded':'None'],
                ...(shift.meds.length>0?[['Medications',`${marDone}/${marState.length} recorded`]]:[]),
              ].map(([l,v])=>(
                <div key={l} className="summary-row"><span className="summary-label">{l}</span><span className="summary-val">{v}</span></div>
              ))}
            </div>
          </div>

          {nextShift && (
            <div style={{margin:'0 14px 20px'}}>
              <div style={{fontSize:'11px',fontWeight:700,color:'var(--slate)',textTransform:'uppercase',letterSpacing:'.5px',marginBottom:8}}>Next visit</div>
              <div style={{background:'#fff',border:'1px solid var(--border)',borderRadius:14,overflow:'hidden',boxShadow:'0 1px 3px rgba(0,0,0,.05)'}}>
                <div style={{height:4,background:SVC_COLORS[nextShift.svc]||'#64748B'}}/>
                <div style={{padding:'12px 14px'}}>
                  <div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}>
                    <span style={{fontFamily:'var(--fm)',fontSize:'13px',fontWeight:500,color:'var(--navy)'}}>{nextShift.time} – {nextShift.end}</span>
                    <span style={{fontFamily:'var(--fm)',fontSize:'11px',color:'var(--slate)'}}>{nextShift.dur}min</span>
                  </div>
                  <div style={{fontFamily:'var(--fh)',fontSize:'15px',fontWeight:700,color:'var(--navy)',marginBottom:3}}>{nextShift.client}</div>
                  <div style={{fontSize:'12px',color:'var(--slate)',marginBottom:8}}>📍 {nextShift.addr}</div>
                  <div style={{display:'flex',alignItems:'center',gap:5}}>
                    <span style={{fontSize:14}}>🚗</span>
                    <span style={{fontSize:'12px',color:'var(--slate)'}}>{nextShift.travel?.mins} min drive · {nextShift.travel?.miles} miles</span>
                  </div>
                </div>
              </div>
              <button className="btn btn-p btn-full" style={{padding:'14px',fontSize:'15px',marginTop:10,borderRadius:14}}
                onClick={()=>{onBack();}}>
                View full schedule
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
};
