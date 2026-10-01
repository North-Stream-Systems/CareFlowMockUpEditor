import { COMPLIANCE, SHIFTS, USER, compStatus } from './data.jsx';

// ── PROFILE SCREEN ─────────────────────────────────────────────────────────────
const ProfileScreen = () => (
  <>
    <div className="profile-hero">
      <div className="profile-av">EW</div>
      <div>
        <div className="profile-name">{USER.name}</div>
        <div className="profile-role">{USER.role} · {USER.zone} Zone</div>
        <div className="profile-meta">
          <span className="tag t-green">Active</span>
          <span className="tag t-navy">S001</span>
        </div>
      </div>
    </div>
    <div className="screen-content">
      <div className="card" style={{margin:'12px 12px 10px'}}>
        <div className="card-hd"><span className="card-title">Compliance</span></div>
        {COMPLIANCE.map(c=>{
          const st = compStatus(c.status, c.exp);
          return (
            <div key={c.name} className="comp-item">
              <div className="comp-icon" style={{background:c.status==='warning'?'var(--amber-l)':c.status==='critical'?'var(--red-l)':'var(--green-l)'}}>{c.ico}</div>
              <div style={{flex:1}}>
                <div className="comp-name">{c.name}</div>
                <div className="comp-exp">{st.label}</div>
              </div>
              <div style={{width:8,height:8,borderRadius:'50%',background:st.color,flexShrink:0}}/>
            </div>
          );
        })}
      </div>

      <div className="card" style={{margin:'0 12px 10px'}}>
        <div className="card-hd"><span className="card-title">This week</span></div>
        {[
          ['Shifts completed','1 of 4 today'],
          ['Hours this week','22.5 hrs'],
          ['Next shift',`${SHIFTS[1].time} · ${SHIFTS[1].client}`],
        ].map(([l,v])=>(
          <div key={l} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'12px 16px',borderBottom:'1px solid var(--border)'}}>
            <span style={{fontSize:'13.5px',color:'var(--slate)'}}>{l}</span>
            <span style={{fontSize:'13.5px',fontWeight:600,color:'var(--navy)',textAlign:'right',flex:1,paddingLeft:10}}>{v}</span>
          </div>
        ))}
      </div>

      <div className="card" style={{margin:'0 12px 10px'}}>
        <div className="card-hd"><span className="card-title">Contract details</span></div>
        {[['Contract type','Full-time'],['Contracted hours','37.5 hrs/wk'],['Pay rate','£12.50/hr'],['Zone','North']].map(([l,v])=>(
          <div key={l} style={{display:'flex',justifyContent:'space-between',padding:'12px 16px',borderBottom:'1px solid var(--border)'}}>
            <span style={{fontSize:'13.5px',color:'var(--slate)'}}>{l}</span>
            <span style={{fontSize:'13.5px',fontWeight:500,color:'var(--navy)'}}>{v}</span>
          </div>
        ))}
      </div>
      <div style={{height:20}}/>
    </div>
  </>
);
