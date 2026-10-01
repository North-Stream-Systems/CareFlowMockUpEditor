import React, { useState } from 'react';
import { SVC_COLORS } from './constants.jsx';
import { ECM_CALLS, inits2 } from './ecm-data.jsx';

// ── ECM COMPONENT ─────────────────────────────────────────────────────────────
export const ECMPage = () => {
  const [filter, setFilter]   = useState('all');
  const [selId,  setSelId]    = useState(null);
  const [clock,  setClock]    = useState(new Date());

  React.useEffect(() => {
    const t = setInterval(() => setClock(new Date()), 30000);
    return () => clearInterval(t);
  }, []);

  const timeStr = `${String(clock.getHours()).padStart(2,'0')}:${String(clock.getMinutes()).padStart(2,'0')}`;

  const complete    = ECM_CALLS.filter(c => c.status==='complete' || c.status==='in-progress');
  const inProgress  = ECM_CALLS.filter(c => c.status==='in-progress');
  const late        = ECM_CALLS.filter(c => c.status==='late');
  const missed      = ECM_CALLS.filter(c => c.status==='missed');

  const cols = [
    { id:'complete', label:'Calls Complete', count:complete.length, color:'var(--green)', bgColor:'var(--green-l)', ico:'✓', calls:complete },
    { id:'late',     label:'Late / Running', count:late.length,     color:'var(--amber)', bgColor:'var(--amber-l)', ico:'⏱', calls:late     },
    { id:'missed',   label:'Missed',         count:missed.length,   color:'var(--red)',   bgColor:'var(--red-l)',   ico:'!', calls:missed   },
  ];

  const EcmCard = ({ call }) => {
    const isSelected = selId === call.id;
    const svcCol = SVC_COLORS[call.svc]||'#64748B';
    const statusClass = call.status==='in-progress' ? 'in-progress' : call.status;

    return (
      <div className={`ecm-card ${statusClass}`} onClick={() => setSelId(s => s===call.id ? null : call.id)}>
        <div className="ecm-card-hd">
          <div className="ecm-card-av" style={{background:call.carerColor}}>{inits2(call.carer)}</div>
          <div style={{flex:1,minWidth:0}}>
            <div className="ecm-card-client">{call.client}</div>
            <div className="ecm-card-carer">{call.carer} · {call.zone} Zone</div>
          </div>
          <div style={{textAlign:'right',flexShrink:0}}>
            <div style={{fontFamily:'var(--fm)',fontSize:'12px',fontWeight:600,color:'var(--navy)'}}>{call.sched}</div>
            <div style={{fontFamily:'var(--fm)',fontSize:'10px',color:'var(--slate)'}}>{call.schedEnd}</div>
          </div>
        </div>
        <div className="ecm-card-detail">
          <div className="ecm-detail-item">
            <div style={{width:8,height:8,borderRadius:2,background:svcCol,flexShrink:0}}/>
            {call.svc}
          </div>
          {call.signIn && (
            <div className="ecm-detail-item">
              🟢 In: <strong style={{fontFamily:'var(--fm)',marginLeft:2}}>{call.signIn}</strong>
            </div>
          )}
          {call.signOut && (
            <div className="ecm-detail-item">
              🔴 Out: <strong style={{fontFamily:'var(--fm)',marginLeft:2}}>{call.signOut}</strong>
            </div>
          )}
          {call.dur && (
            <div className="ecm-detail-item">
              ⏱ <strong style={{fontFamily:'var(--fm)',marginLeft:2}}>{call.dur}min</strong>
            </div>
          )}
          {call.lateBy && (
            <div className="ecm-detail-item" style={{color:'var(--amber)',fontWeight:600}}>
              ⚠ {call.signIn ? `Started ${call.lateBy}min late` : `${call.lateBy}min overdue, not signed in`}
            </div>
          )}
        </div>

        {/* Expanded detail */}
        {isSelected && (
          <div style={{padding:'10px 12px',background:'var(--slate-l)',borderTop:'1px solid var(--border)'}}>
            {[
              ['Key safe',       call.keyCode],
              ['Scheduled',      `${call.sched} – ${call.schedEnd}`],
              ['Signed in',      call.signIn || '—'],
              ['Signed out',     call.signOut || (call.status==='in-progress'?'In progress…':'Not yet')],
              ['Duration',       call.dur ? `${call.dur} min` : '—'],
              ...(call.missReason ? [['Reason', call.missReason]] : []),
            ].map(([l,v]) => (
              <div key={l} style={{display:'flex',justifyContent:'space-between',padding:'4px 0',borderBottom:'1px solid var(--border)',fontSize:'12px'}}>
                <span style={{color:'var(--slate)',fontWeight:500}}>{l}</span>
                <span style={{fontFamily:l==='Key safe'||l==='Signed in'||l==='Signed out'?'var(--fm)':undefined,color:'var(--navy)',fontWeight:500,textAlign:'right',maxWidth:180}}>{v}</span>
              </div>
            ))}
            <div style={{display:'flex',gap:6,marginTop:10}}>
              {call.status==='missed' && (
                <button className="btn btn-g btn-sm" style={{flex:1,justifyContent:'center',fontSize:11.5}}>📞 Call carer</button>
              )}
              {(call.status==='late'||call.status==='missed') && (
                <button className="btn btn-g btn-sm" style={{flex:1,justifyContent:'center',fontSize:11.5}}>🔁 Arrange cover</button>
              )}
              {call.status==='in-progress' && (
                <button className="btn btn-g btn-sm" style={{flex:1,justifyContent:'center',fontSize:11.5}}>📞 Welfare check</button>
              )}
              <button className="btn btn-g btn-sm" style={{flex:1,justifyContent:'center',fontSize:11.5}}>📋 View client</button>
            </div>
          </div>
        )}

        <div className="ecm-card-status-row">
          <div className="ecm-time-display" style={{color:
            call.status==='complete'?'var(--green)':
            call.status==='in-progress'?'var(--teal)':
            call.status==='late'?'var(--amber)':'var(--red)'}}>
            {call.status==='complete'   ? `✓ Done ${call.signOut}` :
             call.status==='in-progress'? '● Active now' :
             call.status==='late'       ? `⏱ ${call.lateBy}min late` :
             '✕ Missed'}
          </div>
          <span className="ecm-badge" style={{
            background:
              call.status==='complete'?'var(--green-l)':
              call.status==='in-progress'?'var(--teal-l)':
              call.status==='late'?'var(--amber-l)':'var(--red-l)',
            color:
              call.status==='complete'?'#065F46':
              call.status==='in-progress'?'var(--teal)':
              call.status==='late'?'#92400E':'var(--red)',
          }}>
            {call.svc.split(' ')[0]}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="ecm-wrap">
      {/* Top bar */}
      <div className="ecm-topbar">
        <div>
          <div className="ecm-title">Call Monitoring</div>
          <div className="ecm-meta">Today · {ECM_CALLS.length} calls scheduled · Aber Care North, Central, South</div>
        </div>
        <div className="ecm-live">
          <div className="ecm-live-dot"/>
          Live
        </div>
        <div className="ecm-time">{timeStr}</div>
        <div className="ecm-filters" style={{marginLeft:8}}>
          <select className="filter-sel" style={{fontSize:'12px',height:32}}>
            <option>All zones</option>
            <option>North</option>
            <option>Central</option>
            <option>South</option>
          </select>
          <select className="filter-sel" style={{fontSize:'12px',height:32}}>
            <option>All carers</option>
            <option>Emma Williams</option>
            <option>Lisa Roberts</option>
            <option>Rebecca Evans</option>
            <option>Sion Parry</option>
          </select>
        </div>
      </div>

      {/* KPI strip */}
      <div className="ecm-kpi-row">
        {[
          { id:'complete', cls:'complete', ico:'✓', label:'Calls Complete', val:complete.length, sub:`${inProgress.length} in progress now`, filt:'complete' },
          { id:'late',     cls:'late',     ico:'⏱', label:'Late / Running', val:late.length,     sub:'Not yet signed in or overdue', filt:'late' },
          { id:'missed',   cls:'missed',   ico:'✕', label:'Missed',         val:missed.length,   sub:'No sign-in recorded — action needed', filt:'missed' },
        ].map(k => (
          <div key={k.id} className={`ecm-kpi ${k.cls}${filter===k.filt?' active-filter':''}`}
            onClick={() => setFilter(f => f===k.filt ? 'all' : k.filt)}>
            <div className="ecm-kpi-ico" style={{fontSize:22}}>{k.ico}</div>
            <div>
              <div className="ecm-kpi-val">{k.val}</div>
              <div className="ecm-kpi-label">{k.label}</div>
              <div className="ecm-kpi-sub">{k.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* In-progress banner */}
      {inProgress.length > 0 && (
        <div className="ecm-in-progress-banner">
          <div className="live" style={{width:8,height:8}}/>
          <span><strong>{inProgress.length} call{inProgress.length>1?'s':''} in progress:</strong> {inProgress.map(c=>c.carer.split(' ')[0]).join(', ')} · Signed in, visit ongoing</span>
        </div>
      )}

      {/* Three-column board */}
      <div className="ecm-board">
        {cols.map(col => {
          const visible = filter==='all' ? col.calls : filter===col.id ? col.calls : [];
          const isFiltered = filter!=='all' && filter!==col.id;
          return (
            <div key={col.id} className="ecm-col">
              <div className="ecm-col-hd">
                <div className="ecm-col-title" style={{color:col.color}}>
                  <span style={{width:22,height:22,borderRadius:7,background:col.bgColor,display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,fontWeight:800,flexShrink:0}}>
                    {col.ico}
                  </span>
                  {col.label}
                </div>
                <span className="ecm-col-count" style={{background:col.bgColor,color:col.color}}>
                  {col.count}
                </span>
              </div>
              <div className="ecm-col-body">
                {isFiltered ? (
                  <div className="ecm-empty">
                    <div className="ecm-empty-ico">🔍</div>
                    <div className="ecm-empty-label">Filtered out</div>
                  </div>
                ) : visible.length === 0 ? (
                  <div className="ecm-empty">
                    <div className="ecm-empty-ico">
                      {col.id==='complete'?'✓':col.id==='late'?'⏱':'✕'}
                    </div>
                    <div className="ecm-empty-label">
                      {col.id==='missed' ? 'No missed calls ✓' : col.id==='late' ? 'All calls on time' : 'No completed calls yet'}
                    </div>
                  </div>
                ) : (
                  visible.map(call => <EcmCard key={call.id} call={call}/>)
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
