import { avCol, compLbl, compSt, inits } from './helpers.jsx';
import { ABSENT_TODAY, LEAVE_REQS, STAFF } from './mock-data.jsx';

// ── STAFF SUB-PAGES ─────────────────────────────────────────────────────────
export const LeavePage = () => (
  <div>
    <div className="ph">
      <div><div className="ph-title">Leave Requests</div><div className="ph-sub">{LEAVE_REQS.filter(r=>r.status==='pending').length} pending approval</div></div>
      <div className="ph-actions"><button className="btn btn-g">📅 Absence calendar</button></div>
    </div>
    <div className="stabs" style={{display:'inline-flex',marginBottom:14}}>
      {['All','Pending','Approved','Declined'].map(s=>(
        <button key={s} className={`stab${s==='All'?' on':''}`}>{s}</button>
      ))}
    </div>
    <div className="tbl-wrap">
      <table>
        <thead><tr><th>Staff member</th><th>Type</th><th>Dates</th><th>Days</th><th>Reason</th><th>Submitted</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>
          {LEAVE_REQS.map(r => {
            const sc = {pending:'amber',approved:'green',declined:'red'}[r.status]||'slate';
            return (
              <tr key={r.id}>
                <td>
                  <div className="staff-cell">
                    <div className="av" style={{background:avCol(r.name),width:28,height:28,fontSize:11,borderRadius:7}}>{inits(r.name)}</div>
                    <span className="sname" style={{fontSize:'12.5px'}}>{r.name}</span>
                  </div>
                </td>
                <td><span className={`tag t-${r.type==='Sick Leave'?'red':'teal'}`}>{r.type}</span></td>
                <td><span style={{fontFamily:'var(--fm)',fontSize:'11.5px'}}>{r.from}{r.from!==r.to?` - ${r.to}`:''}</span></td>
                <td><span style={{fontFamily:'var(--fm)',fontSize:12,fontWeight:600}}>{r.days}</span></td>
                <td style={{color:'var(--slate)',fontSize:12}}>{r.reason}</td>
                <td style={{fontFamily:'var(--fm)',fontSize:11,color:'var(--slate)'}}>{r.submitted}</td>
                <td><span className={`tag t-${sc}`} style={{textTransform:'capitalize'}}>{r.status}</span></td>
                <td>{r.status==='pending'&&<div style={{display:'flex',gap:5}}><button className="btn btn-p btn-sm">Approve</button><button className="btn btn-danger btn-sm">Decline</button></div>}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
);

export const AbsencePage = () => (
  <div>
    <div className="ph">
      <div><div className="ph-title">Absence</div><div className="ph-sub">{ABSENT_TODAY.length} staff absent today</div></div>
      <div className="ph-actions"><button className="btn btn-g">+ Record absence</button></div>
    </div>
    <div className="kpi-row" style={{marginBottom:18}}>
      <div className="kpi kpi-red"><div className="kpi-label">Absent Today</div><div className="kpi-val">{ABSENT_TODAY.length}</div><div className="kpi-sub">{ABSENT_TODAY.reduce((s,a)=>s+a.rounds,0)} rounds affected</div></div>
      <div className="kpi kpi-amber"><div className="kpi-label">This Week</div><div className="kpi-val">4</div><div className="kpi-sub">Absence episodes</div></div>
      <div className="kpi"><div className="kpi-label">Avg Bradford</div><div className="kpi-val" style={{fontFamily:'var(--fm)'}}>132</div><div className="kpi-sub">Org average</div></div>
      <div className="kpi kpi-red"><div className="kpi-label">At Threshold</div><div className="kpi-val">1</div><div className="kpi-sub">Disciplinary level</div></div>
    </div>
    <div className="tbl-wrap">
      <table>
        <thead><tr><th>Staff member</th><th>Absence type</th><th>Day</th><th>Rounds affected</th><th>Bradford</th><th>RTW required</th></tr></thead>
        <tbody>
          {ABSENT_TODAY.map(a => (
            <tr key={a.id}>
              <td><div className="staff-cell"><div className="av" style={{background:avCol(a.name),width:28,height:28,fontSize:11,borderRadius:7}}>{inits(a.name)}</div><div><div className="sname" style={{fontSize:'12.5px'}}>{a.name}</div><div className="sid">{a.role}</div></div></div></td>
              <td><span className={`tag t-${a.type==='Sick Leave'?'red':'amber'}`}>{a.type}</span></td>
              <td style={{fontSize:12,color:'var(--slate)'}}>Today</td>
              <td><span style={{fontFamily:'var(--fm)',fontSize:12,fontWeight:600,color:a.rounds>0?'var(--red)':'var(--slate)'}}>{a.rounds}</span></td>
              <td><span className="bf-val" style={{color:a.bf>200?'var(--red)':a.bf>100?'var(--amber)':'var(--slate)'}}>{a.bf}</span></td>
              <td><button className="btn btn-g btn-sm">Record RTW</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export const CompliancePage = () => {
  const items = STAFF.flatMap(s => s.comp.filter(c=>c.s==='critical'||c.s==='warning').map(c=>({...c,staff:s.name,role:s.role})));
  return (
    <div>
      <div className="ph">
        <div><div className="ph-title">Compliance</div><div className="ph-sub">{items.filter(i=>i.s==='critical').length} critical · {items.filter(i=>i.s==='warning').length} warning</div></div>
        <div className="ph-actions"><button className="btn btn-g">Export report</button></div>
      </div>
      <div className="tbl-wrap">
        <table>
          <thead><tr><th>Staff member</th><th>Item</th><th>Category</th><th>Expiry</th><th>Status</th><th></th></tr></thead>
          <tbody>
            {items.map((c,i) => (
              <tr key={i}>
                <td><div className="staff-cell"><div className="av" style={{background:avCol(c.staff),width:28,height:28,fontSize:11,borderRadius:7}}>{inits(c.staff)}</div><div><div className="sname" style={{fontSize:'12.5px'}}>{c.staff}</div><div className="sid">{c.role}</div></div></div></td>
                <td style={{fontSize:'12.5px',fontWeight:500}}>{c.n}</td>
                <td><span className="tag t-navy">{c.c}</span></td>
                <td><span style={{fontFamily:'var(--fm)',fontSize:'11.5px'}}>{c.exp||'—'}</span></td>
                <td><span className={`tag t-${compSt(c.s)}`}>{compLbl(c.s,c.exp)}</span></td>
                <td><span className="flink" style={{fontSize:'11.5px'}}>Upload renewal</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const BroadcastPage = () => (
  <div>
    <div className="ph">
      <div><div className="ph-title">Broadcast</div><div className="ph-sub">Send a message to your team</div></div>
    </div>
    <div className="card" style={{maxWidth:680}}>
      <div className="card-hd"><span className="card-title">New Broadcast Message</span></div>
      <div className="card-body">
        <div style={{marginBottom:12}}>
          <div style={{fontSize:'11.5px',fontWeight:600,color:'var(--slate)',marginBottom:6,textTransform:'uppercase',letterSpacing:'.4px'}}>Recipients</div>
          <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
            {['All Staff','North Zone','South Zone','Central Zone','Care Workers','Senior Care Workers'].map(g=>(
              <button key={g} className="btn btn-g btn-sm" style={{borderRadius:20}}>{g}</button>
            ))}
          </div>
        </div>
        <div style={{marginBottom:12}}>
          <div style={{fontSize:'11.5px',fontWeight:600,color:'var(--slate)',marginBottom:6,textTransform:'uppercase',letterSpacing:'.4px'}}>Message</div>
          <textarea style={{width:'100%',padding:'10px 12px',borderRadius:8,border:'1px solid var(--border)',fontFamily:'var(--fb)',fontSize:13,minHeight:100,outline:'none',resize:'vertical',color:'var(--text)'}} placeholder="Type your broadcast message..." />
        </div>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <button className="btn btn-g btn-sm">Schedule send</button>
          <button className="btn btn-p">Send broadcast</button>
        </div>
      </div>
    </div>
  </div>
);
