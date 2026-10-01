import React, { useState } from 'react';
import { avCol, compLbl, compSt, inits } from './helpers.jsx';

// ── STAFF PROFILE TABS ──────────────────────────────────────────────────────
const shifts = [
  {id:1,client:'Mrs Gwen Williams', date:'Mon 10',time:'08:30-09:30',zone:'North',  svc:'Personal Care',status:'completed'},
  {id:2,client:'Mr Ifan Lloyd',     date:'Mon 10',time:'10:00-10:45',zone:'North',  svc:'Medication',   status:'completed'},
  {id:3,client:'Mrs Mair Roberts',  date:'Tue 11',time:'08:30-09:30',zone:'Central',svc:'Personal Care',status:'completed'},
  {id:4,client:'Mr Dewi Evans',     date:'Wed 12',time:'14:00-15:00',zone:'South',  svc:'Personal Care',status:'upcoming'},
  {id:5,client:'Miss Bethan Rees',  date:'Thu 13',time:'09:00-10:00',zone:'Central',svc:'Personal Care',status:'upcoming'},
];
const absences = [
  {id:1,type:'Sick Leave',  from:'2025-11-04',to:'2025-11-06',days:3,auth:true,rtw:true},
  {id:2,type:'Sick Leave',  from:'2025-08-12',to:'2025-08-12',days:1,auth:true,rtw:true},
  {id:3,type:'Annual Leave',from:'2025-12-23',to:'2025-12-27',days:5,auth:true,rtw:false},
  {id:4,type:'Sick Leave',  from:'2026-01-08',to:'2026-01-10',days:3,auth:true,rtw:true},
];
const docs = [
  {id:1,name:'DBS Certificate',              type:'PDF',date:'Jun 2023',ico:'📄'},
  {id:2,name:'Right to Work - Passport',     type:'PDF',date:'Mar 2021',ico:'🪪'},
  {id:3,name:'Contract of Employment',       type:'PDF',date:'Mar 2021',ico:'📋'},
  {id:4,name:'Manual Handling Certificate',  type:'PDF',date:'Nov 2024',ico:'🎓'},
  {id:5,name:'Induction Sign-off',           type:'PDF',date:'Apr 2021',ico:'✅'},
];

const TabDashboard = ({s}) => {
  const crit = s.comp.filter(c => c.s==='critical').length;
  const warn = s.comp.filter(c => c.s==='warning').length;
  const upcoming = shifts.filter(sh => sh.status==='upcoming');
  return (
    <div className="prof-content">
      <div className="kpi-row">
        <div className={`kpi${crit>0?' kpi-red':''}`}>
          <div className="kpi-label">Compliance</div>
          <div className="kpi-val">{crit>0?crit:warn>0?warn:'All OK'}</div>
          <div className="kpi-sub">{crit>0?`${crit} critical`:warn>0?`${warn} warning`:'All items current'}</div>
        </div>
        <div className={`kpi${s.bf>200?' kpi-red':s.bf>100?' kpi-amber':' kpi-green'}`}>
          <div className="kpi-label">Bradford Score</div>
          <div className="kpi-val" style={{fontFamily:'var(--fm)'}}>{s.bf}</div>
          <div className="kpi-sub" style={{textTransform:'capitalize'}}>{s.bfst==='ok'?'Below threshold':s.bfst}</div>
        </div>
        <div className="kpi kpi-teal">
          <div className="kpi-label">Upcoming Shifts</div>
          <div className="kpi-val">{upcoming.length}</div>
          <div className="kpi-sub">Next 7 days</div>
        </div>
        <div className="kpi">
          <div className="kpi-label">Contract</div>
          <div className="kpi-val" style={{fontSize:16,paddingTop:3}}>{s.contract}</div>
          <div className="kpi-sub">{s.hrs?`${s.hrs} hrs/wk`:'Variable hours'}</div>
        </div>
      </div>
      <div className="card">
        <div className="card-hd"><span className="card-title">Upcoming Shifts</span><span className="flink">View all</span></div>
        <div className="card-body" style={{padding:'0 16px'}}>
          {upcoming.map(sh => (
            <div key={sh.id} className="shift-row">
              <div className="shift-date">
                <div className="shift-day">{sh.date.split(' ')[0]}</div>
                <div className="shift-num">{sh.date.split(' ')[1]}</div>
              </div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:'12.5px',fontWeight:500,color:'var(--text)'}}>{sh.client}</div>
                <div style={{fontSize:'11px',color:'var(--slate)'}}>{sh.zone} · {sh.svc}</div>
              </div>
              <div style={{textAlign:'right'}}>
                <div style={{fontFamily:'var(--fm)',fontSize:'11.5px',fontWeight:500,color:'var(--navy)'}}>{sh.time}</div>
                <span className="tag t-teal" style={{marginTop:3,fontSize:10}}>Upcoming</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="card">
        <div className="card-hd"><span className="card-title">Compliance Summary</span></div>
        <div className="card-body" style={{padding:'0 16px'}}>
          {s.comp.map(c => (
            <div key={c.n} style={{display:'flex',alignItems:'center',gap:10,padding:'9px 0',borderBottom:'1px solid var(--border)'}}>
              <div className={`dot dot-${compSt(c.s)}`} style={{marginLeft:2}} />
              <div style={{flex:1}}>
                <div style={{fontSize:'12.5px',fontWeight:500,color:'var(--text)'}}>{c.n}</div>
                <div style={{fontSize:'11px',color:'var(--slate)'}}>{c.c}</div>
              </div>
              <span className={`tag t-${compSt(c.s)}`}>{compLbl(c.s,c.exp)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const TabEmployee = ({s}) => (
  <div className="prof-content">
    <div className="card">
      <div className="card-hd"><span className="card-title">Personal Details</span><button className="btn btn-g btn-sm">Edit</button></div>
      <div className="card-body">
        {[['Employee ID',s.id],['Full name',s.name],['Role',s.role],['Zone',s.zone],['Start date',s.start],['Contract',s.contract],['Contracted hours',s.hrs?`${s.hrs} hrs/week`:'Zero-hours'],['Phone',s.phone],['Email',s.email],['Address',s.address],['Next of kin',s.nok]].map(([l,v]) => (
          <div key={l} className="drow">
            <span className="dlabel">{l}</span>
            <span className="dval" style={{fontFamily:l==='Employee ID'?'var(--fm)':undefined}}>{v||'—'}</span>
          </div>
        ))}
      </div>
    </div>
    <div className="card">
      <div className="card-hd"><span className="card-title">Contract and Pay</span></div>
      <div className="card-body">
        {[['Contract type',s.contract],['Contracted hours',s.hrs?`${s.hrs} hrs/week`:'Variable'],['Pay rate','Set in Payroll and Rates tab'],['Holiday entitlement','28 days (pro-rated for PT)'],['Probation status','Completed'],['Notice period','4 weeks']].map(([l,v]) => (
          <div key={l} className="drow">
            <span className="dlabel">{l}</span>
            <span className="dval">{v}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const TabCompliance = ({s}) => (
  <div className="prof-content">
    <div className="card">
      <div className="card-hd"><span className="card-title">Compliance Items</span><button className="btn btn-g btn-sm">+ Add item</button></div>
      <div className="card-body" style={{padding:'0 16px'}}>
        <table className="comp-table">
          <thead>
            <tr>
              <th>Item</th><th>Category</th><th>Expiry</th><th>Status</th><th></th>
            </tr>
          </thead>
          <tbody>
            {s.comp.map(c => (
              <tr key={c.n}>
                <td style={{fontWeight:500,fontSize:'12.5px'}}>{c.n}</td>
                <td><span className="tag t-navy">{c.c}</span></td>
                <td><span style={{fontFamily:'var(--fm)',fontSize:'11.5px'}}>{c.exp||'—'}</span></td>
                <td><span className={`tag t-${compSt(c.s)}`}>{compLbl(c.s,c.exp)}</span></td>
                <td><span className="flink" style={{fontSize:11}}>Upload</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    <div className="card">
      <div className="card-hd"><span className="card-title">DBS Details</span></div>
      <div className="card-body">
        {[['DBS type','Enhanced Disclosure'],['Certificate number','001234567890'],['Issue date',s.dbs],['Update Service','Subscribed'],['Last checked','13 Mar 2026']].map(([l,v]) => (
          <div key={l} className="drow">
            <span className="dlabel">{l}</span>
            <span className="dval" style={{fontFamily:l==='Certificate number'?'var(--fm)':undefined}}>{v}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const TabShifts = () => (
  <div className="prof-content">
    <div className="card">
      <div className="card-hd">
        <span className="card-title">Shift History</span>
        <div style={{display:'flex',gap:6}}>
          <button className="btn btn-g btn-sm">Prev week</button>
          <button className="btn btn-g btn-sm">Next week</button>
        </div>
      </div>
      <div className="card-body" style={{padding:'0 16px'}}>
        {shifts.map(sh => (
          <div key={sh.id} className="shift-row">
            <div className="shift-date">
              <div className="shift-day">{sh.date.split(' ')[0]}</div>
              <div className="shift-num">{sh.date.split(' ')[1]}</div>
            </div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:'12.5px',fontWeight:500,color:'var(--text)'}}>{sh.client}</div>
              <div style={{fontSize:'11px',color:'var(--slate)'}}>{sh.zone} · {sh.svc}</div>
            </div>
            <div style={{textAlign:'right'}}>
              <div style={{fontFamily:'var(--fm)',fontSize:'11.5px',fontWeight:500,color:'var(--navy)'}}>{sh.time}</div>
              <span className={`tag t-${sh.status==='completed'?'green':'teal'}`} style={{marginTop:3,fontSize:10,textTransform:'capitalize'}}>{sh.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
    <div className="card">
      <div className="card-hd"><span className="card-title">Period Summary</span></div>
      <div className="card-body">
        {[['Hours this week','22.5 hrs'],['Hours this month','87 hrs'],['Overtime this month','2.5 hrs'],['Missed shifts (12 months)','0']].map(([l,v]) => (
          <div key={l} className="drow">
            <span className="dlabel">{l}</span>
            <span className="dval" style={{fontFamily:'var(--fm)',fontSize:12}}>{v}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const TabAbsence = ({s}) => {
  const total = absences.reduce((sum,a)=>sum+a.days,0);
  const eps   = absences.filter(a=>a.type==='Sick Leave').length;
  const bc    = s.bf>200?'red':s.bf>100?'amber':s.bf>50?'teal':'green';
  return (
    <div className="prof-content">
      <div className="kpi-row" style={{gridTemplateColumns:'repeat(3,1fr)'}}>
        <div className="kpi"><div className="kpi-label">Total Days Lost</div><div className="kpi-val" style={{fontFamily:'var(--fm)'}}>{total}</div><div className="kpi-sub">Last 52 weeks</div></div>
        <div className="kpi"><div className="kpi-label">Episodes</div><div className="kpi-val" style={{fontFamily:'var(--fm)'}}>{eps}</div><div className="kpi-sub">Sick leave only</div></div>
        <div className={`kpi kpi-${bc}`}><div className="kpi-label">Bradford Factor</div><div className="kpi-val" style={{fontFamily:'var(--fm)'}}>{s.bf}</div><div className="kpi-sub" style={{textTransform:'capitalize'}}>{s.bfst==='ok'?'Below all thresholds':s.bfst+' threshold'}</div></div>
      </div>
      <div className="card">
        <div className="card-hd"><span className="card-title">Bradford Factor Score</span></div>
        <div className="card-body">
          <div className="bf-big" style={{color:`var(--${bc})`}}>{s.bf}</div>
          <div className="bf-big-label">Rolling 52-week Bradford Factor</div>
          <div className="bf-bar-wrap"><div className="bf-bar" style={{width:`${Math.min((s.bf/450)*100,100)}%`,background:`var(--${bc})`}} /></div>
          <div className="bf-thresholds"><span>0</span><span style={{color:'var(--teal)'}}>50</span><span style={{color:'var(--amber)'}}>100</span><span style={{color:'var(--red)'}}>200</span><span style={{color:'var(--red)'}}>450</span></div>
        </div>
      </div>
      <div className="card">
        <div className="card-hd"><span className="card-title">Absence Record</span><button className="btn btn-g btn-sm">+ Record absence</button></div>
        <div className="card-body" style={{padding:'0 16px'}}>
          {absences.map(a => (
            <div key={a.id} className="abs-row">
              <div className={`dot dot-${a.type==='Sick Leave'?'amber':'teal'}`} />
              <div style={{flex:1}}>
                <div style={{fontSize:'12.5px',fontWeight:500,color:'var(--text)'}}>{a.type}</div>
                <div style={{fontSize:'11px',color:'var(--slate)'}}>{a.from} - {a.to}{a.rtw?' · RTW done':''}</div>
              </div>
              <div style={{fontFamily:'var(--fm)',fontSize:12,fontWeight:500,color:'var(--navy)'}}>{a.days}d</div>
              <span className={`tag t-${a.auth?'green':'amber'}`}>{a.auth?'Authorised':'Pending'}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ASSIGNEES = [
  { id:'coord-cameron',  type:'person', label:'Cameron D',       role:'Care Coordinator',      icon:'👤' },
  { id:'coord-sian',     type:'person', label:'Sian M',          role:'Registered Manager',     icon:'👤' },
  { id:'coord-lisa',     type:'person', label:'Lisa R',          role:'Senior Coordinator',     icon:'👤' },
  { id:'grp-hr',         type:'group',  label:'HR Group',        role:'HR · 3 members',         icon:'👥' },
  { id:'grp-clinical',   type:'group',  label:'Clinical Team',   role:'Clinical · 4 members',   icon:'👥' },
  { id:'grp-management', type:'group',  label:'Management Team', role:'Management · 2 members', icon:'👥' },
  { id:'grp-finance',    type:'group',  label:'Finance Team',    role:'Finance · 2 members',    icon:'👥' },
];

const STAFF_NOTE_TYPES = ['General','Supervision','HR','Concern','Positive','Handover','Return to Work','Performance','Other'];

const genNotes = n => [
  { id:'sn-flag1', author:'System', type:'HR', date:'Today 08:12',
    body:`Third absence episode this quarter — Bradford Factor now at 118. First formal trigger threshold is 100. Recommend informal conversation before next shift to understand any underlying factors.`,
    flagged:true, assignee:'HR Group', assigneeType:'group', assigneeRole:'HR · 3 members', priority:'high', read:false },
  { id:'sn1', author:'Cameron D', type:'Supervision', date:'10 Feb 2026',
    body:`Monthly supervision completed with ${n.split(' ')[0]}. Discussed workload balance and client relationships. No concerns raised. Performance remains strong.`,
    flagged:false, assignee:null, assigneeType:null, priority:null, read:true },
  { id:'sn2', author:'Sian M (RM)', type:'HR', date:'3 Jan 2026',
    body:'Return to work interview conducted following absence 8–10 Jan. Reason: respiratory illness. Fit note provided. Cleared to return.',
    flagged:false, assignee:null, assigneeType:null, priority:null, read:true },
];

const NOTE_PRI_STAFF = {
  urgent:{ bg:'var(--red-l)',   dot:'var(--red)',   label:'Urgent', tc:'var(--red)'   },
  high:  { bg:'var(--amber-l)', dot:'var(--amber)', label:'Action', tc:'#92400E'      },
  info:  { bg:'var(--teal-l)',  dot:'var(--teal)',  label:'FYI',    tc:'var(--teal)'  },
};

const TabNotes = ({s}) => {
  const [notes, setNotes] = React.useState(genNotes(s.name));
  const [showForm, setShowForm] = React.useState(false);
  const [form, setForm] = React.useState({ type:'General', body:'', flagged:false, assignee:'', priority:'info' });
  const [filter, setFilter] = React.useState('all');
  const unread = notes.filter(n=>n.flagged&&!n.read).length;

  const visible = filter==='all' ? notes : filter==='flagged' ? notes.filter(n=>n.flagged) : notes.filter(n=>!n.flagged);

  const handleAdd = () => {
    if(!form.body.trim()) return;
    const sel = ASSIGNEES.find(a=>a.id===form.assignee);
    const newNote = {
      id:`sn${Date.now()}`, author:'Cameron D', type:form.type, date:'Just now',
      body:form.body, flagged:form.flagged,
      assignee: sel ? sel.label : '',
      assigneeType: sel ? sel.type : '',
      assigneeRole: sel ? sel.role : '',
      priority: form.flagged ? form.priority : null, read:true
    };
    setNotes(prev=>[newNote,...prev]);
    setForm({ type:'General', body:'', flagged:false, assignee:'', priority:'info' });
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
              {f==='flagged'&&unread>0&&<span style={{background:'var(--red)',color:'#fff',fontSize:'10px',fontWeight:700,padding:'1px 5px',borderRadius:8,fontFamily:'var(--fm)'}}>{unread}</span>}
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
                  {STAFF_NOTE_TYPES.map(t=><option key={t}>{t}</option>)}
                </select>
              </div>
              <div style={{display:'flex',flexDirection:'column',justifyContent:'flex-end'}}>
                <label style={{display:'flex',alignItems:'center',gap:8,cursor:'pointer',padding:'8px 12px',
                  borderRadius:9,border:`1.5px solid ${form.flagged?'var(--red)':'var(--border)'}`,
                  background:form.flagged?'var(--red-l)':'#fff',transition:'all .15s'}}>
                  <input type="checkbox" checked={form.flagged} onChange={e=>setForm(f=>({...f,flagged:e.target.checked}))}
                    style={{accentColor:'var(--red)',width:15,height:15}}/>
                  <span style={{fontSize:'13px',fontWeight:600,color:form.flagged?'var(--red)':'var(--slate)'}}>🚩 Flag for action</span>
                </label>
              </div>
            </div>

            {form.flagged && (
              <div style={{display:'flex',flexDirection:'column',gap:10,padding:'10px 12px',
                background:'var(--red-l)',borderRadius:9,border:'1px solid rgba(220,38,38,.2)'}}>
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
                          style={{flex:1,padding:'6px 4px',borderRadius:7,border:`1.5px solid ${form.priority===p?NOTE_PRI_STAFF[p].dot:'var(--border)'}`,
                            background:form.priority===p?NOTE_PRI_STAFF[p].bg:'#fff',
                            color:form.priority===p?NOTE_PRI_STAFF[p].tc:'var(--slate)',
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
              <textarea style={{width:'100%',minHeight:80,padding:'10px 12px',borderRadius:9,
                border:'1.5px solid var(--border)',fontFamily:'var(--fb)',fontSize:'13.5px',
                color:'var(--text)',resize:'vertical',outline:'none',transition:'border-color .15s'}}
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
          <select className="sel" style={{fontSize:'11.5px',padding:'4px 8px'}}>
            <option>All types</option>
            {STAFF_NOTE_TYPES.map(t=><option key={t}>{t}</option>)}
          </select>
        </div>
        <div className="card-body" style={{padding:'0 16px'}}>
          {visible.length===0 && <div style={{padding:'24px',textAlign:'center',color:'var(--slate)',fontSize:'13.5px'}}>No notes to show</div>}
          {visible.map(n=>{
            const ps = n.flagged && n.priority ? NOTE_PRI_STAFF[n.priority] : null;
            return (
              <div key={n.id} style={{borderBottom:'1px solid var(--border)',
                background:n.flagged&&!n.read?ps?.bg:'transparent',
                margin:'0 -16px',padding:'14px 16px',
                cursor:n.flagged&&!n.read?'pointer':'default',transition:'background .15s'}}
                onClick={()=>n.flagged&&!n.read&&setNotes(prev=>prev.map(x=>x.id===n.id?{...x,read:true}:x))}>
                <div style={{display:'flex',alignItems:'flex-start',gap:8,marginBottom:6}}>
                  {n.flagged&&<span style={{fontSize:14,flexShrink:0,marginTop:1}}>🚩</span>}
                  <div style={{flex:1}}>
                    <div style={{display:'flex',alignItems:'center',gap:6,flexWrap:'wrap'}}>
                      <span style={{fontFamily:'var(--fh)',fontSize:'13px',fontWeight:700,color:'var(--navy)'}}>{n.author}</span>
                      <span style={{fontSize:'11px',color:'var(--slate)',background:'var(--slate-l)',padding:'1px 6px',borderRadius:4}}>{n.type}</span>
                      {n.flagged&&ps&&<span style={{fontSize:'10.5px',fontWeight:700,color:ps.tc,background:ps.bg,padding:'1px 6px',borderRadius:4,border:`1px solid ${ps.dot}30`}}>{ps.label}</span>}
                      {!n.read&&n.flagged&&<span style={{fontSize:'10px',fontWeight:700,color:ps?.tc,marginLeft:'auto'}}>● Unread</span>}
                    </div>
                    <div style={{fontSize:'11px',color:'var(--slate)',marginTop:2,fontFamily:'var(--fm)'}}>{n.date}</div>
                  </div>
                </div>
                <div style={{fontSize:'13.5px',color:'var(--text)',lineHeight:1.55,marginBottom:n.flagged&&n.assignee?6:0}}>{n.body}</div>
                {n.flagged&&n.assignee&&(
                  <div style={{display:'flex',alignItems:'center',gap:6,marginTop:6,padding:'6px 10px',
                    background:n.assigneeType==='group'?'var(--purple-l)':'var(--slate-l)',
                    borderRadius:7,fontSize:'12px',
                    border:`1px solid ${n.assigneeType==='group'?'var(--purple)':'var(--border)'}20`}}>
                    <span>{n.assigneeType==='group'?'👥':'👤'}</span>
                    <span style={{color:'var(--slate)'}}>{n.assigneeType==='group'?'Group:':'Assigned to:'}</span>
                    <span style={{fontWeight:700,color:n.assigneeType==='group'?'var(--purple)':'var(--navy)'}}>{n.assignee}</span>
                    {n.assigneeType==='group'&&n.assigneeRole&&<span style={{fontSize:'11px',color:'var(--slate)'}}>· {n.assigneeRole.split('·')[1]?.trim()}</span>}
                    {n.read&&<span style={{marginLeft:'auto',fontSize:'10.5px',color:'var(--green)',fontWeight:600}}>✓ Acknowledged</span>}
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

const TabDocuments = () => (
  <div className="prof-content">
    <div style={{display:'flex',justifyContent:'flex-end',marginBottom:12}}>
      <button className="btn btn-g btn-sm">+ Upload document</button>
    </div>
    <div className="card">
      <div className="card-hd"><span className="card-title">Documents</span></div>
      <div className="card-body" style={{padding:'0 16px'}}>
        {docs.map(d => (
          <div key={d.id} className="doc-row">
            <div className="doc-ico">{d.ico}</div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:'12.5px',fontWeight:500,color:'var(--text)'}}>{d.name}</div>
              <div style={{fontSize:'11px',color:'var(--slate)'}}>{d.type} · Uploaded {d.date}</div>
            </div>
            <span className="flink" style={{fontSize:'11.5px'}}>Download</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const PTABS = [
  {id:'dashboard', label:'Dashboard'},
  {id:'employee',  label:'Employee'},
  {id:'compliance',label:'Compliance'},
  {id:'shifts',    label:'Shifts'},
  {id:'absence',   label:'Absence'},
  {id:'notes',     label:'Notes'},
  {id:'documents', label:'Documents'},
];

export const StaffProfile = ({staff, onClose}) => {
  const [tab, setTab] = useState('dashboard');
  const color = avCol(staff.name);
  const crit  = staff.comp.filter(c => c.s==='critical').length;
  const stCls = {active:'sp-active',onboarding:'sp-onboard'}[staff.status]||'sp-active';
  const stLbl = {active:'Active',onboarding:'Onboarding'}[staff.status]||staff.status;
  return (
    <div className="prof-overlay" onClick={e => { if(e.target===e.currentTarget) onClose(); }}>
      <div className="prof-modal">
        <div className="prof-hd">
          <div className="prof-hd-top">
            <div className="prof-big-av" style={{background:color}}>{inits(staff.name)}</div>
            <div style={{flex:1}}>
              <div className="prof-name">{staff.name}</div>
              <div className="prof-role-line">
                <span className="prof-role">{staff.role} · {staff.zone} Zone</span>
                <span className={`status-pill ${stCls}`}>{stLbl}</span>
                {crit>0 && <span className="status-pill" style={{background:'rgba(220,38,38,.2)',color:'#FCA5A5'}}>{crit} Critical</span>}
              </div>
            </div>
            <div className="prof-hd-r">
              <button className="msg-btn">Message</button>
              <button className="ph-close" onClick={onClose}>×</button>
            </div>
          </div>
          <div className="prof-meta">
            <div className="prof-meta-item">🪪 <strong>{staff.id}</strong></div>
            <div className="prof-meta-item">📅 Started <strong>{staff.start}</strong></div>
            <div className="prof-meta-item">📋 <strong>{staff.contract}</strong>{staff.hrs?` · ${staff.hrs} hrs/wk`:''}</div>
            <div className="prof-meta-item">📍 <strong>{staff.zone} Zone</strong></div>
          </div>
          <div className="prof-tabs">
            {PTABS.map(t => (
              <button key={t.id} className={`ptab${tab===t.id?' on':''}`} onClick={() => setTab(t.id)}>
                {t.label}
              </button>
            ))}
          </div>
        </div>
        <div className="prof-body">
          {tab==='dashboard'  && <TabDashboard  s={staff} />}
          {tab==='employee'   && <TabEmployee   s={staff} />}
          {tab==='compliance' && <TabCompliance s={staff} />}
          {tab==='shifts'     && <TabShifts />}
          {tab==='absence'    && <TabAbsence    s={staff} />}
          {tab==='notes'      && <TabNotes      s={staff} />}
          {tab==='documents'  && <TabDocuments />}
        </div>
      </div>
    </div>
  );
};
