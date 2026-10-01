import { DESKTOP } from './common.jsx';

// ── COMPLETE SCREEN ──────────────────────────────────────────────────────────
export const CompleteScreen = ({allData}) => {
  const staffCount = (allData[7]?.invites||[]).filter(s=>s.email).length;
  const zoneCount  = (allData[3]?.zones||[{},{},{}]).length;
  const svcCount   = (allData[4]?.svcs||[{},{},{},{}]).length;
  return (
    <div className="complete-screen">
      <div className="complete-badge">🚀</div>
      <div className="complete-title">CareFlow is live!</div>
      <div className="complete-sub">
        {allData[1]?.name||'Your organisation'} is now active. Invitations have been sent to your team. Your coordinator dashboard is ready.
      </div>
      <div className="complete-grid">
        {[
          {ico:'👥', val:staffCount||'0',    label:'Team members invited'},
          {ico:'📍', val:zoneCount,           label:'Service zones created'},
          {ico:'🩺', val:svcCount,            label:'Service types configured'},
          {ico:'🛡️', val:allData[2]?.reg?.split(' ')[0]||'CQC', label:'Regulator framework'},
          {ico:'💷', val:(allData[5]?.funders||[]).length||'0',   label:'Funder types configured'},
          {ico:'⚙️', val:(allData[6]?.roles||[]).filter(r=>r.on).length||4, label:'Active roles'},
        ].map((c,i)=>(
          <div key={i} className="complete-card">
            <div className="complete-card-ico">{c.ico}</div>
            <div className="complete-card-val">{c.val}</div>
            <div className="complete-card-label">{c.label}</div>
          </div>
        ))}
      </div>
      <div style={{display:'flex',gap:12,flexWrap:'wrap',justifyContent:'center'}}>
        <button className="btn btn-navy btn-lg" onClick={()=>window.location.href=DESKTOP}>
          Open coordinator dashboard →
        </button>
        <button className="btn btn-g btn-lg" onClick={()=>window.location.href='CareFlow_Login.html'}>
          Back to sign in
        </button>
      </div>
    </div>
  );
};
