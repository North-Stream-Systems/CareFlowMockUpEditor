import React from 'react';
import { COMPLAINTS_DATA, INCIDENTS_DATA, MAR_DATA, NOTES_DATA, TASKS_DATA } from './mock-data.jsx';

// ── PROFILE TABS ──────────────────────────────────────────────────────────────
export const TabDashboard = ({ c }) => {
  const incidents = INCIDENTS_DATA.filter(i => i.clientId===c.id && i.stage!=='Closed');
  const complaints = COMPLAINTS_DATA.filter(cp => cp.clientId===c.id);
  const tasks = (TASKS_DATA[c.id]||[]).filter(t=>!t.done);
  const priCol = p => ({high:'red',medium:'amber',low:'slate'}[p]||'slate');
  return (
    <div className="prof-content">
      <div className="kpi-row">
        <div className={`kpi${incidents.length>0?' kpi-red':' kpi-green'}`}>
          <div className="kpi-label">Open Incidents</div>
          <div className="kpi-val">{incidents.length}</div>
          <div className="kpi-sub">{incidents.length>0?`${incidents.filter(i=>i.sev==='major'||i.sev==='serious').length} major`:'All closed'}</div>
        </div>
        <div className={`kpi${complaints.length>0?' kpi-amber':' kpi-green'}`}>
          <div className="kpi-label">Complaints</div>
          <div className="kpi-val">{complaints.length}</div>
          <div className="kpi-sub">{complaints.length>0?'Under investigation':'None open'}</div>
        </div>
        <div className={`kpi${tasks.length>0?' kpi-teal':''}`}>
          <div className="kpi-label">Open Tasks</div>
          <div className="kpi-val">{tasks.length}</div>
          <div className="kpi-sub">{tasks.filter(t=>t.pri==='high').length} high priority</div>
        </div>
        <div className="kpi">
          <div className="kpi-label">Care Hours/wk</div>
          <div className="kpi-val" style={{fontFamily:'var(--fm)'}}>{c.hours}</div>
          <div className="kpi-sub">{c.package}</div>
        </div>
      </div>
      {incidents.length > 0 && (
        <div className="card">
          <div className="card-hd"><span className="card-title">Open Incidents</span><span className="flink" style={{fontSize:11,color:'var(--teal)',cursor:'pointer'}}>View all</span></div>
          {incidents.map(inc => (
            <div key={inc.id} className="inc-row">
              <div className="inc-icon" style={{background: inc.sev==='major'?'var(--red-l)':'var(--amber-l)'}}>⚠️</div>
              <div className="inc-body">
                <div className="inc-title">{inc.type}</div>
                <div className="inc-meta">{inc.stage} · {inc.date}</div>
              </div>
              <span className={`tag t-${inc.sev==='major'||inc.sev==='serious'?'red':'amber'}`} style={{textTransform:'capitalize'}}>{inc.sev}</span>
            </div>
          ))}
        </div>
      )}
      {tasks.length > 0 && (
        <div className="card">
          <div className="card-hd"><span className="card-title">Open Tasks</span><button className="btn btn-p btn-sm">+ Add task</button></div>
          <div className="card-body" style={{padding:'0 16px'}}>
            {tasks.map(t => (
              <div key={t.id} className="task-row">
                <div className="task-check"><span style={{fontSize:10,color:'var(--slate)'}}>○</span></div>
                <div style={{flex:1}}>
                  <div style={{fontSize:'12.5px',fontWeight:500,color:'var(--text)'}}>{t.title}</div>
                  <div style={{fontSize:'11px',color:'var(--slate)',marginTop:1}}>Due {t.due}</div>
                </div>
                <span className={`tag t-${priCol(t.pri)}`} style={{textTransform:'capitalize'}}>{t.pri}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="card">
        <div className="card-hd"><span className="card-title">Service Summary</span></div>
        <div className="card-body">
          {[['Funder',c.funder],['Service type',c.svc],['Package',c.package],['Hours per week',`${c.hours} hours`],['Zone',c.zone+' Zone'],['Key worker',c.keyworker],['Status',c.status]].map(([l,v])=>(
            <div key={l} className="drow"><span className="dlabel">{l}</span><span className="dval" style={{textTransform:'capitalize'}}>{v}</span></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const TabDetails = ({ c }) => (
  <div className="prof-content">
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
      <div className="card">
        <div className="card-hd"><span className="card-title">Personal Details</span><button className="btn btn-g btn-sm">Edit</button></div>
        <div className="card-body">
          {[['Client ID',c.id],['Full name',c.name],['Date of birth',c.dob],['Age',`${c.age} years`],['NHS number',c.nhs],['Address',c.address],['Phone',c.phone]].map(([l,v])=>(
            <div key={l} className="drow"><span className="dlabel">{l}</span><span className="dval" style={{fontFamily:l==='Client ID'||l==='NHS number'?'var(--fm)':undefined}}>{v}</span></div>
          ))}
        </div>
      </div>
      <div>
        <div className="card">
          <div className="card-hd"><span className="card-title">Emergency Contact</span></div>
          <div className="card-body">
            <div className="drow"><span className="dlabel">Contact</span><span className="dval">{c.emergency}</span></div>
            <div className="drow"><span className="dlabel">GP</span><span className="dval">{c.gp}</span></div>
          </div>
        </div>
        <div className="card">
          <div className="card-hd"><span className="card-title">Service Details</span></div>
          <div className="card-body">
            {[['Zone',c.zone],['Funder',c.funder],['Service type',c.svc],['Key worker',c.keyworker],['Package',c.package]].map(([l,v])=>(
              <div key={l} className="drow"><span className="dlabel">{l}</span><span className="dval">{v}</span></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const NOTE_TYPES = ['Care Note','Concern','Medical','Family Contact','HR','Handover','Other'];
const ASSIGNEES = [
  { id:'coord-cameron',  type:'person', label:'Cameron D',           role:'Care Coordinator',       icon:'👤' },
  { id:'coord-sian',     type:'person', label:'Sian M',              role:'Registered Manager',      icon:'👤' },
  { id:'coord-lisa',     type:'person', label:'Lisa R',              role:'Senior Coordinator',      icon:'👤' },
  { id:'grp-hr',         type:'group',  label:'HR Group',            role:'HR · 3 members',          icon:'👥' },
  { id:'grp-clinical',   type:'group',  label:'Clinical Team',       role:'Clinical · 4 members',    icon:'👥' },
  { id:'grp-management', type:'group',  label:'Management Team',     role:'Management · 2 members',  icon:'👥' },
  { id:'grp-finance',    type:'group',  label:'Finance Team',        role:'Finance · 2 members',     icon:'👥' },
];

export const TabNotes = ({ c }) => {
  const baseNotes = NOTES_DATA[c.id] || [
    { id:'gen1', author:'Emma Williams', type:'Care Note', date:'13 Mar 2026 09:34', body:'Routine visit completed. Client well and in good spirits. Had breakfast and took medication without issue. No concerns to report.', flagged:false, assignee:null, priority:null, read:true },
  ];
  const [notes, setNotes] = React.useState([
    { id:'alert1', author:'Emma Williams', type:'Concern', date:'Today 09:34',
      body:'Pressure sore noted on left heel — district nurse referral required before next visit. Client reported it has been there for 3 days. Photograph taken and uploaded to body maps.',
      flagged:true, assignee:'Cameron D', assigneeType:'person', assigneeRole:'Care Coordinator', priority:'urgent', read:false },
    { id:'alert2', author:'Lisa Roberts', type:'Medical', date:'Today 08:21',
      body:'Family have requested medication times are moved 30 mins later to align with client morning routine — awaiting GP confirmation. Please update care plan once confirmed and notify all carers.',
      flagged:true, assignee:'Clinical Team', assigneeType:'group', assigneeRole:'Clinical · 4 members', priority:'high', read:false },
    ...baseNotes,
  ]);
  const [showForm, setShowForm] = React.useState(false);
  const [form, setForm] = React.useState({ type:'Care Note', body:'', flagged:false, assignee:'', priority:'info' });
  const [filter, setFilter] = React.useState('all');
  const unread = notes.filter(n=>n.flagged&&!n.read).length;
  const PRI = { urgent:{bg:'var(--red-l)',dot:'var(--red)',label:'Urgent',tc:'var(--red)'},
                high:  {bg:'var(--amber-l)',dot:'var(--amber)',label:'Action needed',tc:'#92400E'},
                info:  {bg:'var(--teal-l)', dot:'var(--teal)', label:'FYI',tc:'var(--teal)'} };
  const visible = filter==='all' ? notes : filter==='flagged' ? notes.filter(n=>n.flagged) : notes.filter(n=>!n.flagged);

  const handleAdd = () => {
    if(!form.body.trim()) return;
    const sel = ASSIGNEES.find(a=>a.id===form.assignee);
    const newNote = {
      id:`n${Date.now()}`, author:'Cameron D', type:form.type, date:'Just now',
      body:form.body, flagged:form.flagged,
      assignee: sel ? sel.label : '',
      assigneeType: sel ? sel.type : '',
      assigneeRole: sel ? sel.role : '',
      priority:form.flagged?form.priority:null, read:true
    };
    setNotes(prev=>[newNote,...prev]);
    setForm({ type:'Care Note', body:'', flagged:false, assignee:'', priority:'info' });
    setShowForm(false);
  };

  return (
    <div className="prof-content">
      {/* Header row */}
      <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:14,flexWrap:'wrap'}}>
        <div style={{display:'flex',gap:6,flex:1}}>
          {['all','flagged','standard'].map(f=>(
            <button key={f} onClick={()=>setFilter(f)}
              style={{padding:'6px 12px',borderRadius:8,border:`1.5px solid ${filter===f?'var(--teal)':'var(--border)'}`,
                background:filter===f?'var(--teal)':'#fff',color:filter===f?'#fff':'var(--slate)',
                fontFamily:'var(--fb)',fontSize:'12.5px',fontWeight:600,cursor:'pointer',transition:'all .15s',
                display:'flex',alignItems:'center',gap:5}}>
              {f==='flagged'?'🚩':f==='all'?'📋':'📝'} {f==='all'?'All notes':f==='flagged'?`Flagged (${notes.filter(n=>n.flagged).length})`:'Standard'}
              {f==='flagged'&&unread>0 && <span style={{background:'var(--red)',color:'#fff',fontSize:'10px',fontWeight:700,
                padding:'1px 5px',borderRadius:8,fontFamily:'var(--fm)'}}>{unread}</span>}
            </button>
          ))}
        </div>
        <button className="btn btn-p btn-sm" onClick={()=>setShowForm(s=>!s)}>+ Add note</button>
      </div>

      {/* Add note form */}
      {showForm && (
        <div className="card" style={{marginBottom:14,border:'1.5px solid var(--teal)',background:'var(--teal-l)'}}>
          <div className="card-hd" style={{background:'var(--teal-l)'}}>
            <span className="card-title" style={{color:'var(--teal)'}}>New note</span>
          </div>
          <div style={{padding:'14px 16px',display:'flex',flexDirection:'column',gap:10}}>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
              <div>
                <div style={{fontSize:'11px',fontWeight:700,color:'var(--navy)',textTransform:'uppercase',letterSpacing:'.4px',marginBottom:4}}>Note type</div>
                <select className="sel" style={{width:'100%'}} value={form.type} onChange={e=>setForm(f=>({...f,type:e.target.value}))}>
                  {NOTE_TYPES.map(t=><option key={t}>{t}</option>)}
                </select>
              </div>
              <div style={{display:'flex',flexDirection:'column',justifyContent:'flex-end'}}>
                <label style={{display:'flex',alignItems:'center',gap:8,cursor:'pointer',padding:'8px 12px',
                  borderRadius:9,border:`1.5px solid ${form.flagged?'var(--red)':'var(--border)'}`,
                  background:form.flagged?'var(--red-l)':'#fff',transition:'all .15s'}}>
                  <input type="checkbox" checked={form.flagged} onChange={e=>setForm(f=>({...f,flagged:e.target.checked}))} style={{accentColor:'var(--red)',width:15,height:15}}/>
                  <span style={{fontSize:'13px',fontWeight:600,color:form.flagged?'var(--red)':'var(--slate)'}}>
                    🚩 Flag for action
                  </span>
                </label>
              </div>
            </div>

            {form.flagged && (
              <div style={{display:'flex',flexDirection:'column',gap:10,padding:'10px 12px',
                background:'var(--red-l)',borderRadius:9,border:'1px solid var(--red)30'}}>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
                  <div>
                    <div style={{fontSize:'11px',fontWeight:700,color:'var(--red)',textTransform:'uppercase',letterSpacing:'.4px',marginBottom:4}}>Assign to</div>
                    <select className="sel" style={{width:'100%',borderColor:'var(--red)'}} value={form.assignee}
                      onChange={e=>setForm(f=>({...f,assignee:e.target.value}))}>
                      <option value="">Select person or group...</option>
                      <optgroup label="── Coordinators">
                        {ASSIGNEES.filter(a=>a.type==='person').map(a=>(
                          <option key={a.id} value={a.id}>{a.icon} {a.label} — {a.role}</option>
                        ))}
                      </optgroup>
                      <optgroup label="── Groups (notifies all members)">
                        {ASSIGNEES.filter(a=>a.type==='group').map(a=>(
                          <option key={a.id} value={a.id}>{a.icon} {a.label} — {a.role}</option>
                        ))}
                      </optgroup>
                    </select>
                    {form.assignee && (()=>{
                      const sel = ASSIGNEES.find(a=>a.id===form.assignee);
                      if(!sel) return null;
                      return (
                        <div style={{marginTop:6,padding:'5px 9px',borderRadius:7,
                          background:sel.type==='group'?'var(--purple-l)':'var(--teal-l)',
                          border:`1px solid ${sel.type==='group'?'var(--purple)':'var(--teal)'}30`,
                          fontSize:'11.5px',color:sel.type==='group'?'var(--purple)':'var(--teal)',fontWeight:500,
                          display:'flex',alignItems:'center',gap:5}}>
                          {sel.icon}
                          {sel.type==='group'
                            ? <span>All <strong>{sel.role.split('·')[1]?.trim()}</strong> will be notified</span>
                            : <span>Notification sent to <strong>{sel.label}</strong></span>}
                        </div>
                      );
                    })()}
                  </div>
                  <div>
                    <div style={{fontSize:'11px',fontWeight:700,color:'var(--red)',textTransform:'uppercase',letterSpacing:'.4px',marginBottom:4}}>Priority</div>
                    <div style={{display:'flex',gap:6}}>
                      {['urgent','high','info'].map(p=>(
                        <button key={p} onClick={()=>setForm(f=>({...f,priority:p}))}
                          style={{flex:1,padding:'6px 4px',borderRadius:7,border:`1.5px solid ${form.priority===p?PRI[p].dot:'var(--border)'}`,
                            background:form.priority===p?PRI[p].bg:'#fff',color:form.priority===p?PRI[p].tc:'var(--slate)',
                            fontSize:'11px',fontWeight:600,cursor:'pointer',textTransform:'capitalize',transition:'all .15s'}}>
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div>
              <div style={{fontSize:'11px',fontWeight:700,color:'var(--navy)',textTransform:'uppercase',letterSpacing:'.4px',marginBottom:4}}>Note</div>
              <textarea style={{width:'100%',minHeight:80,padding:'10px 12px',borderRadius:9,border:'1.5px solid var(--border)',
                fontFamily:'var(--fb)',fontSize:'13.5px',color:'var(--text)',resize:'vertical',outline:'none',transition:'border-color .15s'}}
                placeholder="Enter note..."
                value={form.body} onChange={e=>setForm(f=>({...f,body:e.target.value}))}
                onFocus={e=>e.target.style.borderColor='var(--teal)'}
                onBlur={e=>e.target.style.borderColor='var(--border)'}/>
            </div>
            <div style={{display:'flex',gap:8,justifyContent:'flex-end'}}>
              <button className="btn btn-g btn-sm" onClick={()=>setShowForm(false)}>Cancel</button>
              <button className="btn btn-p btn-sm" onClick={handleAdd}>Save note</button>
            </div>
          </div>
        </div>
      )}

      {/* Notes list */}
      <div className="card">
        <div className="card-hd">
          <span className="card-title">Notes ({visible.length})</span>
          <select className="sel" style={{fontSize:'11.5px',padding:'4px 8px'}} onChange={()=>{}}>
            <option>All types</option>
            {NOTE_TYPES.map(t=><option key={t}>{t}</option>)}
          </select>
        </div>
        <div className="card-body" style={{padding:'0 16px'}}>
          {visible.length===0 && <div style={{padding:'24px',textAlign:'center',color:'var(--slate)',fontSize:'13.5px'}}>No notes to show</div>}
          {visible.map(n=>{
            const ps = n.flagged && n.priority ? PRI[n.priority] : null;
            return (
              <div key={n.id} style={{borderBottom:'1px solid var(--border)',padding:'14px 0',
                background:n.flagged&&!n.read?ps?.bg:'transparent',margin:'0 -16px',padding:'14px 16px',
                cursor:n.flagged&&!n.read?'pointer':'default',transition:'background .15s'}}
                onClick={()=>n.flagged&&!n.read&&setNotes(prev=>prev.map(x=>x.id===n.id?{...x,read:true}:x))}>
                <div style={{display:'flex',alignItems:'flex-start',gap:8,marginBottom:6}}>
                  {n.flagged && <span style={{fontSize:14,flexShrink:0,marginTop:1}}>🚩</span>}
                  <div style={{flex:1}}>
                    <div style={{display:'flex',alignItems:'center',gap:6,flexWrap:'wrap'}}>
                      <span style={{fontFamily:'var(--fh)',fontSize:'13px',fontWeight:700,color:'var(--navy)'}}>{n.author}</span>
                      <span style={{fontSize:'11px',color:'var(--slate)',background:'var(--slate-l)',padding:'1px 6px',borderRadius:4}}>{n.type}</span>
                      {n.flagged && ps && <span style={{fontSize:'10.5px',fontWeight:700,color:ps.tc,background:ps.bg,padding:'1px 6px',borderRadius:4,border:`1px solid ${ps.dot}30`}}>{ps.label}</span>}
                      {!n.read && n.flagged && <span style={{fontSize:'10px',fontWeight:700,color:ps?.tc,marginLeft:'auto'}}>● Unread</span>}
                    </div>
                    <div style={{fontSize:'11px',color:'var(--slate)',marginTop:2,fontFamily:'var(--fm)'}}>{n.date}</div>
                  </div>
                </div>
                <div style={{fontSize:'13.5px',color:'var(--text)',lineHeight:1.55,marginBottom:n.flagged&&n.assignee?6:0}}>{n.body}</div>
                {n.flagged && n.assignee && (
                  <div style={{display:'flex',alignItems:'center',gap:6,marginTop:6,padding:'6px 10px',
                    background:n.assigneeType==='group'?'var(--purple-l)':'var(--slate-l)',
                    borderRadius:7,fontSize:'12px',
                    border:`1px solid ${n.assigneeType==='group'?'var(--purple)':'var(--border)'}20`}}>
                    <span>{n.assigneeType==='group'?'👥':'👤'}</span>
                    <span style={{color:'var(--slate)'}}>{n.assigneeType==='group'?'Group:':'Assigned to:'}</span>
                    <span style={{fontWeight:700,color:n.assigneeType==='group'?'var(--purple)':'var(--navy)'}}>{n.assignee}</span>
                    {n.assigneeType==='group' && n.assigneeRole &&
                      <span style={{fontSize:'11px',color:'var(--slate)'}}>· {n.assigneeRole.split('·')[1]?.trim()}</span>}
                    {n.read && <span style={{marginLeft:'auto',fontSize:'10.5px',color:'var(--green)',fontWeight:600}}>✓ Acknowledged</span>}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const TabIncidents = ({ c }) => {
  const incidents = INCIDENTS_DATA.filter(i=>i.clientId===c.id);
  const sevCol = s => ({serious:'red',major:'red',moderate:'amber',minor:'teal'}[s]||'slate');
  return (
    <div className="prof-content">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
        <div style={{fontFamily:'var(--fh)',fontSize:'13.5px',fontWeight:600,color:'var(--navy)'}}>{incidents.length} incidents on record</div>
        <button className="btn btn-p btn-sm">+ Report incident</button>
      </div>
      {incidents.length===0 ? (
        <div className="cs"><div className="big">✅</div><h3>No incidents on record</h3></div>
      ) : (
        <div className="card">
          {incidents.map(inc=>(
            <div key={inc.id} className="inc-row">
              <div className="inc-icon" style={{background:`var(--${sevCol(inc.sev)}-l,var(--amber-l))`}}>🚨</div>
              <div className="inc-body">
                <div className="inc-title">{inc.type}</div>
                <div className="inc-meta">{inc.date} · {inc.stage}</div>
                <div style={{fontSize:'11.5px',color:'var(--slate)',marginTop:4,lineHeight:1.4}}>{inc.desc}</div>
              </div>
              <div className="inc-right">
                <span className={`tag t-${sevCol(inc.sev)}`} style={{textTransform:'capitalize'}}>{inc.sev}</span>
                {inc.open>0 && <div className="inc-days" style={{marginTop:4}}>{inc.open}d open</div>}
                {inc.notified && <div style={{fontSize:'10px',color:'var(--teal)',marginTop:3,fontWeight:600}}>CIW notified</div>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const TabMAR = ({ c }) => {
  const mar = MAR_DATA[c.id] || [
    { med:'Medication details not on file', time:'—', records:[] },
  ];
  const days = Array.from({length:13},(_,i)=>`${i+1}`);
  const marColor = r => ({G:'mar-given',R:'mar-refused',M:'mar-missed','':'mar-empty'}[r]||'mar-empty');
  const marLabel = r => ({G:'✓',R:'✕',M:'!','':'·'}[r]||'·');
  return (
    <div className="prof-content">
      <div className="card">
        <div className="card-hd">
          <span className="card-title">Medication Administration Record — March 2026</span>
          <div style={{display:'flex',gap:10,fontSize:'11px',color:'var(--slate)'}}>
            <span style={{display:'flex',alignItems:'center',gap:4}}><div style={{width:10,height:10,borderRadius:3,background:'var(--green-l)',border:'1px solid var(--green)'}}/>Given</span>
            <span style={{display:'flex',alignItems:'center',gap:4}}><div style={{width:10,height:10,borderRadius:3,background:'var(--red-l)',border:'1px solid var(--red)'}}/>Refused</span>
            <span style={{display:'flex',alignItems:'center',gap:4}}><div style={{width:10,height:10,borderRadius:3,background:'var(--amber-l)',border:'1px solid var(--amber)'}}/>Missed</span>
          </div>
        </div>
        <div className="card-body" style={{padding:'0 16px',overflowX:'auto'}}>
          <div style={{display:'flex',padding:'8px 0',borderBottom:'1px solid var(--border)',marginBottom:4}}>
            <div style={{width:220,flexShrink:0,fontSize:'10.5px',fontWeight:700,color:'var(--slate)',textTransform:'uppercase',letterSpacing:'.4px'}}>Medication</div>
            <div style={{display:'flex',gap:4}}>{days.map(d=><div key={d} style={{width:22,height:22,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'var(--fm)',fontSize:'9px',color:'var(--slate)',fontWeight:600}}>{d}</div>)}</div>
          </div>
          {mar.map((m,mi)=>(
            <div key={mi} className="mar-row">
              <div style={{width:220,flexShrink:0}}>
                <div style={{fontSize:'12.5px',fontWeight:500,color:'var(--navy)'}}>{m.med}</div>
                <div style={{fontFamily:'var(--fm)',fontSize:'10px',color:'var(--slate)'}}>{m.time}</div>
              </div>
              <div className="mar-cells">
                {days.map((d,di)=>{
                  const r = m.records[di]||'';
                  return <div key={d} className={`mar-cell ${marColor(r)}`}>{marLabel(r)}</div>;
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const TabCarePlan = () => {
  const [services, setServices] = React.useState([
    { id:'s1', type:'Personal Care',  freq:'2x daily, 7 days', time:'07:30–08:30 / 18:30–19:30', dur:60, twoHanded:true,  qualRule:'both', qual:'Moving and Handling (Hoist)', carerLevel:'Senior Care Worker' },
    { id:'s2', type:'Medication',     freq:'2x daily, 7 days', time:'07:30 / 18:30',              dur:15, twoHanded:false, qualRule:null,   qual:'Medication Administration',  carerLevel:'Medication L1' },
    { id:'s3', type:'Social Support', freq:'1x weekly',         time:'Flexible 10:00–14:00',        dur:120,twoHanded:false, qualRule:null,   qual:null,                         carerLevel:'Standard' },
  ]);
  const ruleStyle = {
    both:{ bg:'var(--red-l)',   color:'var(--red)',   label:'Both carers must hold' },
    one: { bg:'var(--amber-l)', color:'#92400E',      label:'At least 1 must hold'  },
  };
  return (
    <div className="prof-content">
      <div style={{display:'flex',justifyContent:'flex-end',gap:8,marginBottom:12}}>
        <button className="btn btn-g btn-sm">Version history</button>
        <button className="btn btn-p btn-sm">Edit care plan</button>
      </div>

      {/* Services Required */}
      <div className="card" style={{marginBottom:14}}>
        <div className="card-hd">
          <span className="card-title">Services Required</span>
          <button className="btn btn-g btn-sm" style={{fontSize:'11px',padding:'4px 10px'}}>+ Add service</button>
        </div>
        {services.map((svc, i) => (
          <div key={svc.id} style={{padding:'13px 16px',borderBottom:i<services.length-1?'1px solid var(--border)':'none'}}>
            <div style={{display:'flex',alignItems:'flex-start',gap:10}}>
              <div style={{width:10,height:10,borderRadius:3,background:{
                'Personal Care':'var(--teal)','Medication':'var(--amber)',
                'Domestic':'var(--slate)','Social Support':'var(--purple)','Complex Care':'#3B82F6'}[svc.type]||'var(--slate)',
                flexShrink:0,marginTop:4}}/>
              <div style={{flex:1}}>
                <div style={{display:'flex',alignItems:'center',gap:7,flexWrap:'wrap',marginBottom:5}}>
                  <span style={{fontFamily:'var(--fh)',fontSize:'14px',fontWeight:700,color:'var(--navy)'}}>{svc.type}</span>
                  {svc.twoHanded && (
                    <span style={{display:'inline-flex',alignItems:'center',gap:4,padding:'2px 8px',borderRadius:5,
                      background:'var(--purple-l)',color:'var(--purple)',fontSize:'11px',fontWeight:700,
                      border:'1px solid rgba(139,92,246,.25)'}}>
                      👥 Double-handed
                    </span>
                  )}
                  <span style={{fontSize:'11.5px',color:'var(--slate)',background:'var(--slate-l)',padding:'2px 7px',borderRadius:4}}>{svc.carerLevel}</span>
                </div>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,fontSize:'12.5px',color:'var(--slate)',marginBottom:svc.twoHanded?8:0}}>
                  <span>📅 {svc.freq}</span>
                  <span>⏰ {svc.time}</span>
                  <span>⏱ {svc.dur} min</span>
                </div>
                {/* Qualification rule — only for double-handed */}
                {svc.twoHanded && svc.qual && (
                  <div style={{display:'flex',alignItems:'flex-start',gap:8,padding:'8px 10px',
                    borderRadius:9,background:ruleStyle[svc.qualRule].bg,
                    border:`1px solid ${ruleStyle[svc.qualRule].color}20`,marginTop:4}}>
                    <span style={{fontSize:14,flexShrink:0}}>🎓</span>
                    <div style={{flex:1}}>
                      <div style={{fontSize:'11.5px',fontWeight:700,color:ruleStyle[svc.qualRule].color,marginBottom:2}}>
                        {ruleStyle[svc.qualRule].label}
                      </div>
                      <div style={{fontSize:'12px',color:'var(--text)'}}>
                        <strong>{svc.qual}</strong>
                      </div>
                      <div style={{fontSize:'11px',color:'var(--slate)',marginTop:2}}>
                        {svc.qualRule==='both'
                          ? 'Both carers assigned to this call must hold this qualification'
                          : 'At least one of the two carers must hold this qualification — the second slot is open to any carer'}
                      </div>
                      {svc.qualRule==='both' ? (
                        <button onClick={()=>setServices(prev=>prev.map(s=>s.id===svc.id?{...s,qualRule:'one'}:s))}
                          style={{marginTop:6,fontSize:'11px',color:'var(--amber)',fontWeight:600,background:'none',border:'none',cursor:'pointer',padding:0,textDecoration:'underline'}}>
                          Switch to "At least 1 must hold" — easier to cover →
                        </button>
                      ) : (
                        <button onClick={()=>setServices(prev=>prev.map(s=>s.id===svc.id?{...s,qualRule:'both'}:s))}
                          style={{marginTop:6,fontSize:'11px',color:'var(--slate)',fontWeight:500,background:'none',border:'none',cursor:'pointer',padding:0,textDecoration:'underline'}}>
                          Switch to "Both carers must hold"
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Care plan sections */}
      {[
        {title:'Personal Care', items:['Assisted wash and dress, morning routine','Oral hygiene support','Skin integrity check']},
        {title:'Nutrition and Hydration', items:['Prepare light breakfast','Encourage fluid intake throughout visit','Record any refusal of food or drink']},
        {title:'Mobility', items:['Assist with transfers using Sara Stedy frame','Do not attempt manual handling — two-carer call required for hoisting','Report any changes in mobility immediately']},
        {title:'Medication', items:['Administer morning medications as per prescribed list','Record on MAR chart','Do not administer PRN without telephoning office first']},
        {title:'Risk and Safety', items:['Fall risk — high. Non-slip mat in bathroom. Alert GP if further falls.','Key safe code on file — do not share verbally','Allergies: Penicillin']},
      ].map(sec=>(
        <div key={sec.title} className="card">
          <div className="card-hd"><span className="card-title">{sec.title}</span></div>
          <div className="card-body">
            {sec.items.map((item,i)=>(
              <div key={i} style={{display:'flex',gap:9,padding:'7px 0',borderBottom:i<sec.items.length-1?'1px solid var(--border)':'none'}}>
                <div style={{width:6,height:6,borderRadius:'50%',background:'var(--teal)',flexShrink:0,marginTop:6}}/>
                <span style={{fontSize:'12.5px',color:'var(--text)',lineHeight:1.5}}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export const TabBodyMaps = () => (
  <div className="prof-content">
    <div style={{display:'flex',justifyContent:'flex-end',marginBottom:12}}>
      <button className="btn btn-p btn-sm">+ Add body map entry</button>
    </div>
    <div className="card">
      <div className="card-hd"><span className="card-title">Body Map Record</span></div>
      <div className="card-body">
        <div className="body-map-wrap">
          {/* Simple SVG body outline */}
          <svg width="120" height="220" viewBox="0 0 120 220" className="body-map-svg">
            <ellipse cx="60" cy="22" rx="18" ry="20" fill="none" stroke="#E2E8F0" strokeWidth="1.5"/>
            <line x1="60" y1="42" x2="60" y2="120" stroke="#E2E8F0" strokeWidth="1.5"/>
            <line x1="60" y1="50" x2="25" y2="90" stroke="#E2E8F0" strokeWidth="1.5"/>
            <line x1="60" y1="50" x2="95" y2="90" stroke="#E2E8F0" strokeWidth="1.5"/>
            <line x1="60" y1="120" x2="40" y2="180" stroke="#E2E8F0" strokeWidth="1.5"/>
            <line x1="60" y1="120" x2="80" y2="180" stroke="#E2E8F0" strokeWidth="1.5"/>
            <line x1="40" y1="180" x2="38" y2="210" stroke="#E2E8F0" strokeWidth="1.5"/>
            <line x1="80" y1="180" x2="82" y2="210" stroke="#E2E8F0" strokeWidth="1.5"/>
            {/* Alert markers */}
            <circle cx="80" cy="175" r="7" fill="var(--amber)" opacity=".8"/>
            <text x="80" y="178" textAnchor="middle" fontSize="8" fill="white" fontWeight="bold">!</text>
            <circle cx="42" cy="60" r="5" fill="var(--red)" opacity=".7"/>
            <text x="42" y="63" textAnchor="middle" fontSize="7" fill="white" fontWeight="bold">!</text>
          </svg>
          <div className="body-map-list">
            {[
              {loc:'Right heel',type:'Pressure sore',sev:'amber',date:'5 Mar 2026',desc:'Stage 2. District nurse managing. Dressing changed every 48hrs.'},
              {loc:'Left forearm',type:'Bruising',sev:'red',date:'10 Mar 2026',desc:'Bruising noted following fall on 10 Mar. Photograph taken. Healing well.'},
            ].map((entry,i)=>(
              <div key={i} className="bm-entry">
                <div className="bm-dot-wrap" style={{background:`var(--${entry.sev})`,opacity:.7}}/>
                <div>
                  <div style={{fontSize:'12.5px',fontWeight:600,color:'var(--navy)'}}>{entry.loc} — {entry.type}</div>
                  <div style={{fontSize:'11px',color:'var(--slate)',marginTop:1}}>{entry.date}</div>
                  <div style={{fontSize:'12px',color:'var(--text)',marginTop:4,lineHeight:1.4}}>{entry.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);
