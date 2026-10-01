import React from 'react';
import { W } from './widget-shell.jsx';
import { WAbsent, WBradford, WCompliance, WCoverage, WIncidents, WRounds, WTasks, WUnassigned } from './dashboard-widgets.jsx';

// ── NEW WIDGETS ──────────────────────────────────────────────────────────────

const FLAGGED_NOTES = [
  { id:'fn1', client:'Mrs G Williams', type:'client', priority:'urgent', text:'Pressure sore noted on left heel — district nurse referral required before next visit. Do not allow carer to sign off without checking.', assignee:'Cameron D',    assigneeType:'person', from:'Emma Williams', time:'09:34',    read:false },
  { id:'fn2', client:'Mr I Lloyd',     type:'client', priority:'high',   text:'Family have requested medication times are moved 30 mins later — awaiting GP confirmation. Coordinator to update care plan when confirmed.', assignee:'Clinical Team', assigneeType:'group',  from:'Lisa Roberts',  time:'08:21',    read:false },
  { id:'fn3', client:'Mrs H Thomas',   type:'client', priority:'info',   text:'Client asked about increasing visit frequency from 2x to 3x daily. Family in agreement. Coordinator to review funding and contact commissioner.', assignee:'Cameron D',    assigneeType:'person', from:'Emma Williams', time:'Yesterday', read:true },
  { id:'fn4', client:'Sion Parry',     type:'staff',  priority:'high',   text:'Third absence this quarter — Bradford Factor now at 118. Suggested informal conversation before next shift.', assignee:'HR Group',      assigneeType:'group',  from:'System',        time:'Yesterday', read:true },
];

const NOTE_PRI = {
  urgent:{ bg:'var(--red-l)',   dot:'var(--red)',   label:'Urgent', tc:'var(--red)' },
  high:  { bg:'var(--amber-l)', dot:'var(--amber)', label:'Action', tc:'#92400E'   },
  info:  { bg:'var(--teal-l)',  dot:'var(--teal)',  label:'Info',   tc:'var(--teal)'},
};

const WFlaggedNotes = ({cfg, editMode, onRemove}) => {
  const [notes, setNotes] = React.useState(FLAGGED_NOTES);
  const unread = notes.filter(n=>!n.read).length;
  return (
    <W id="flagged" {...cfg} editMode={editMode} onRemove={onRemove}
      badge={unread||undefined} bc="red" footer={`${notes.length} flagged notes · ${unread} unread`}>
      <div style={{display:'flex',flexDirection:'column',gap:8}}>
        {notes.map(n => {
          const ps = NOTE_PRI[n.priority];
          return (
            <div key={n.id} style={{background:n.read?'var(--slate-l)':ps.bg,borderRadius:10,padding:'10px 12px',
              border:`1.5px solid ${n.read?'var(--border)':ps.dot}`,opacity:n.read?.75:1,cursor:'pointer',transition:'all .15s'}}
              onClick={()=>setNotes(prev=>prev.map(x=>x.id===n.id?{...x,read:true}:x))}>
              <div style={{display:'flex',alignItems:'center',gap:6,marginBottom:5}}>
                <div style={{width:7,height:7,borderRadius:'50%',background:n.read?'var(--slate)':ps.dot,flexShrink:0}}/>
                <span style={{fontFamily:'var(--fh)',fontSize:'13px',fontWeight:700,color:'var(--navy)',flex:1}}>{n.client}</span>
                <span style={{fontSize:'10px',fontWeight:700,color:n.read?'var(--slate)':ps.tc,
                  background:n.read?'var(--border)':ps.bg,padding:'2px 6px',borderRadius:4,
                  border:`1px solid ${n.read?'var(--border)':ps.dot}`}}>{ps.label}</span>
                <span style={{fontSize:'10.5px',color:'var(--slate)',fontFamily:'var(--fm)'}}>{n.time}</span>
              </div>
              <div style={{fontSize:'12.5px',color:'var(--text)',lineHeight:1.45,marginBottom:4}}>{n.text}</div>
              <div style={{fontSize:'11px',color:'var(--slate)',display:'flex',gap:8,alignItems:'center'}}>
                <span>{n.type==='client' ? '👤' : '👔'} {n.type}</span>
                <span>· From: {n.from}</span>
                {n.assignee && (
                  <span style={{display:'flex',alignItems:'center',gap:3,
                    color:n.assigneeType==='group'?'var(--purple)':'var(--teal)',fontWeight:600}}>
                    · {n.assigneeType==='group'?'👥':'👤'} {n.assignee}
                  </span>
                )}
                {!n.read && <span style={{marginLeft:'auto',color:ps.tc,fontWeight:600}}>Tap to acknowledge →</span>}
              </div>
            </div>
          );
        })}
      </div>
    </W>
  );
};

const WECMLive = ({cfg, editMode, onRemove}) => {
  const stats = [
    {label:'Complete',val:7,sub:'1 in progress',col:'var(--green)',bg:'var(--green-l)'},
    {label:'Late',    val:4,sub:'18–35 min late', col:'var(--amber)',bg:'var(--amber-l)'},
    {label:'Missed',  val:3,sub:'Action required',col:'var(--red)',  bg:'var(--red-l)'},
  ];
  return (
    <W id="ecmlive" {...cfg} editMode={editMode} onRemove={onRemove} badge={3} bc="red" footer="Live ECM · refreshes every 30 seconds">
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:10,marginBottom:12}}>
        {stats.map(s=>(
          <div key={s.label} style={{background:s.bg,borderRadius:10,padding:'11px 8px',textAlign:'center',
            border:`1px solid ${s.col}30`}}>
            <div style={{fontFamily:'var(--fh)',fontSize:'28px',fontWeight:800,color:s.col,lineHeight:1}}>{s.val}</div>
            <div style={{fontSize:'10.5px',fontWeight:700,color:s.col,marginTop:3,textTransform:'uppercase',letterSpacing:'.3px'}}>{s.label}</div>
            <div style={{fontSize:'10px',color:'var(--slate)',marginTop:2}}>{s.sub}</div>
          </div>
        ))}
      </div>
      {[
        {client:'Mr D Evans',     carer:'Sion Parry',    status:'missed', time:'09:30', mins:65, col:'var(--red)'},
        {client:'Mr A Hughes',    carer:'Lisa Roberts',  status:'late',   time:'14:30', mins:35, col:'var(--amber)'},
        {client:'Mr I Lloyd',     carer:'Emma Williams', status:'active', time:'09:00', mins:null,col:'var(--teal)'},
      ].map((r,i)=>(
        <div key={i} style={{display:'flex',alignItems:'center',gap:8,padding:'7px 10px',marginBottom:5,
          background:'var(--slate-l)',borderRadius:8,fontSize:'12.5px'}}>
          <div style={{width:8,height:8,borderRadius:'50%',background:r.col,flexShrink:0}}/>
          <span style={{flex:1,fontWeight:500,color:'var(--navy)'}}>{r.client}</span>
          <span style={{color:'var(--slate)',fontSize:'11.5px'}}>{r.carer.split(' ')[0]}</span>
          <span style={{fontFamily:'var(--fm)',fontSize:'11px',color:'var(--slate)',marginLeft:4}}>{r.time}</span>
          <span style={{fontSize:'11px',fontWeight:700,color:r.col,marginLeft:4}}>
            {r.status==='missed'?`${r.mins}min missed`:r.status==='late'?`${r.mins}min late`:'● Active'}
          </span>
        </div>
      ))}
      <div style={{textAlign:'right',marginTop:4}}>
        <button style={{fontSize:'12px',color:'var(--teal)',fontWeight:600,background:'none',border:'none',cursor:'pointer'}}>Open Call Monitoring →</button>
      </div>
    </W>
  );
};

const WOnShift = ({cfg, editMode, onRemove}) => {
  const staff = [
    {name:'Emma Williams',initials:'EW',col:'#0D9488',client:'Mr I Lloyd',      svc:'Medication',   time:'09:00–09:45',status:'active'},
    {name:'Lisa Roberts', initials:'LR',col:'#8B5CF6',client:'Mrs M Roberts',   svc:'Personal Care',time:'13:00–14:00',status:'upcoming'},
    {name:'Rebecca Evans',initials:'RE',col:'#3B82F6',client:'Mrs A Jones',     svc:'Personal Care',time:'07:00–08:00',status:'done'},
    {name:'Amy Hughes',   initials:'AH',col:'#EC4899',client:'Miss B Rees',     svc:'Personal Care',time:'08:00–09:00',status:'done'},
  ];
  const active = staff.filter(s=>s.status==='active').length;
  return (
    <W id="onshift" {...cfg} editMode={editMode} onRemove={onRemove}
      footer={`${active} active now · ${staff.length} carers today`}>
      <div style={{display:'flex',flexDirection:'column',gap:7}}>
        {staff.map((s,i)=>(
          <div key={i} style={{display:'flex',alignItems:'center',gap:9,padding:'8px 10px',
            background:s.status==='active'?'var(--teal-l)':'var(--slate-l)',borderRadius:9,
            border:s.status==='active'?'1.5px solid var(--teal-m)':'1px solid var(--border)'}}>
            <div style={{width:28,height:28,borderRadius:8,background:s.col,display:'flex',alignItems:'center',
              justifyContent:'center',fontFamily:'var(--fh)',fontSize:'11px',fontWeight:700,color:'#fff',flexShrink:0}}>
              {s.initials}
            </div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontFamily:'var(--fh)',fontSize:'13px',fontWeight:700,color:'var(--navy)'}}>{s.name}</div>
              <div style={{fontSize:'11.5px',color:'var(--slate)',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{s.client} · {s.svc}</div>
            </div>
            <div style={{textAlign:'right',flexShrink:0}}>
              <div style={{fontFamily:'var(--fm)',fontSize:'11px',color:'var(--slate)'}}>{s.time}</div>
              <div style={{fontSize:'10.5px',fontWeight:700,marginTop:2,color:
                s.status==='active'?'var(--teal)':s.status==='done'?'var(--slate)':'var(--amber)'}}>
                {s.status==='active'?'● Active':s.status==='done'?'✓ Done':'◷ Upcoming'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </W>
  );
};

const WRevenue = ({cfg, editMode, onRemove}) => (
  <W id="revenue" {...cfg} editMode={editMode} onRemove={onRemove} footer="Finance module · live data">
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginBottom:10}}>
      {[
        {label:'Today',     val:'£2,847',sub:'14 visits invoiced', col:'var(--teal)'},
        {label:'This week', val:'£18,420',sub:'On track for £21k', col:'var(--navy)'},
      ].map(r=>(
        <div key={r.label} style={{background:'var(--slate-l)',borderRadius:10,padding:'11px 12px'}}>
          <div style={{fontSize:'10.5px',fontWeight:700,color:'var(--slate)',textTransform:'uppercase',letterSpacing:'.5px',marginBottom:4}}>{r.label}</div>
          <div style={{fontFamily:'var(--fh)',fontSize:'20px',fontWeight:800,color:r.col,lineHeight:1}}>{r.val}</div>
          <div style={{fontSize:'11px',color:'var(--slate)',marginTop:3}}>{r.sub}</div>
        </div>
      ))}
    </div>
    {[
      {label:'Awaiting approval', val:'£4,230', col:'var(--amber)'},
      {label:'Outstanding >30d',  val:'£1,890', col:'var(--red)'},
      {label:'Paid this month',   val:'£32,140',col:'var(--green)'},
    ].map(r=>(
      <div key={r.label} style={{display:'flex',justifyContent:'space-between',alignItems:'center',
        padding:'7px 9px',marginBottom:5,background:'var(--slate-l)',borderRadius:7}}>
        <span style={{fontSize:'12.5px',color:'var(--slate)'}}>{r.label}</span>
        <span style={{fontFamily:'var(--fm)',fontSize:'13px',fontWeight:700,color:r.col}}>{r.val}</span>
      </div>
    ))}
  </W>
);

const WOutlook = ({cfg, editMode, onRemove}) => (
  <W id="outlook" {...cfg} editMode={editMode} onRemove={onRemove} footer="Microsoft 365 · Connect in Settings">
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',
      padding:'24px 16px',gap:14,minHeight:160,textAlign:'center'}}>
      <div style={{width:52,height:52,borderRadius:14,background:'#0078D4',display:'flex',alignItems:'center',
        justifyContent:'center',fontSize:28,boxShadow:'0 4px 16px rgba(0,120,212,.3)'}}>📅</div>
      <div>
        <div style={{fontFamily:'var(--fh)',fontSize:'15px',fontWeight:700,color:'var(--navy)',marginBottom:4}}>Outlook Calendar</div>
        <div style={{fontSize:'13px',color:'var(--slate)',lineHeight:1.6,maxWidth:280,margin:'0 auto 12px'}}>
          Connect Microsoft 365 to see your calendar, meetings, and deadlines alongside the rota.
        </div>
      </div>
      <button style={{padding:'10px 20px',background:'#0078D4',color:'#fff',border:'none',borderRadius:9,
        fontFamily:'var(--fh)',fontSize:'13px',fontWeight:700,cursor:'pointer',transition:'all .15s'}}>
        Connect Microsoft 365
      </button>
      <div style={{fontSize:'11px',color:'var(--slate)'}}>Settings → Integrations → Microsoft 365</div>
    </div>
  </W>
);

const WGoogle = ({cfg, editMode, onRemove}) => (
  <W id="google" {...cfg} editMode={editMode} onRemove={onRemove} footer="Google Workspace · Connect in Settings">
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',
      padding:'24px 16px',gap:14,minHeight:160,textAlign:'center'}}>
      <div style={{width:52,height:52,borderRadius:14,background:'#fff',display:'flex',alignItems:'center',
        justifyContent:'center',fontSize:28,boxShadow:'0 4px 16px rgba(0,0,0,.1)',border:'1px solid var(--border)'}}>📆</div>
      <div>
        <div style={{fontFamily:'var(--fh)',fontSize:'15px',fontWeight:700,color:'var(--navy)',marginBottom:4}}>Google Calendar</div>
        <div style={{fontSize:'13px',color:'var(--slate)',lineHeight:1.6,maxWidth:280,margin:'0 auto 12px'}}>
          Connect Google Workspace to see your calendar and upcoming events alongside the rota.
        </div>
      </div>
      <button style={{padding:'10px 20px',background:'#4285F4',color:'#fff',border:'none',borderRadius:9,
        fontFamily:'var(--fh)',fontSize:'13px',fontWeight:700,cursor:'pointer',transition:'all .15s'}}>
        Connect Google
      </button>
      <div style={{fontSize:'11px',color:'var(--slate)'}}>Settings → Integrations → Google Workspace</div>
    </div>
  </W>
);

export const WIDGET_MAP = {
  unassigned:WUnassigned, absent:WAbsent, compliance:WCompliance,
  rounds:WRounds, tasks:WTasks, incidents:WIncidents,
  bradford:WBradford, coverage:WCoverage,
  flagged:WFlaggedNotes, ecmlive:WECMLive, onshift:WOnShift,
  revenue:WRevenue, outlook:WOutlook, google:WGoogle,
};
