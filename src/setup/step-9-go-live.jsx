// ── STEP 9: Go live ──────────────────────────────────────────────────────────
export const Step9 = ({data, allData, onComplete}) => {
  const checks = [
    { label:'Organisation details',  done: !!(allData[1]?.name),       step:1 },
    { label:'Regulator configured',  done: !!(allData[2]?.reg),        step:2 },
    { label:'Zones created',         done: !!(allData[3]?.zones?.length||true), step:3 },
    { label:'Service types set',     done: !!(allData[4]?.svcs?.length||true),  step:4 },
    { label:'Rate sheets configured',done: !!(allData[5]?.funders?.length>0),   step:5 },
    { label:'Roles enabled',         done: true,                        step:6 },
    { label:'Team invited',          done: !!(allData[7]?.invites?.some(s=>s.email)), step:7 },
    { label:'Client profile layout chosen', done: !!(allData[8]?.template), step:8 },
  ];
  const readyCount = checks.filter(c=>c.done).length;
  const allReady   = readyCount === checks.length;
  return (
    <div>
      <div className="step-header">
        <div className="step-num">Step 9 of 9</div>
        <div className="step-title">Ready to go live</div>
        <div className="step-desc">Review your setup checklist. You can go live now and complete missing items later — or finish everything here for the best first-day experience.</div>
      </div>
      <div style={{background:'#fff',border:'1px solid var(--border)',borderRadius:12,padding:'0 16px',marginBottom:20}}>
        {checks.map((c,i) => (
          <div key={i} className="toggle-row">
            <div style={{width:28,height:28,borderRadius:8,background:c.done?'var(--green-l)':'var(--slate-l)',display:'flex',alignItems:'center',justifyContent:'center',marginRight:12,flexShrink:0,fontSize:14}}>
              {c.done ? '✓' : '○'}
            </div>
            <div className="toggle-info">
              <div className="toggle-name" style={{color:c.done?'var(--navy)':'var(--slate)'}}>{c.label}</div>
            </div>
            <span style={{fontSize:'12.5px',fontWeight:600,color:c.done?'var(--green)':'var(--amber)'}}>{c.done?'Complete':'Pending'}</span>
          </div>
        ))}
      </div>
      <div style={{background: allReady ? 'var(--green-l)' : 'var(--amber-l)', border:`1px solid ${allReady?'var(--green)':'var(--amber)'}`,borderRadius:12,padding:'14px 16px',marginBottom:24,display:'flex',gap:12,alignItems:'flex-start'}}>
        <span style={{fontSize:22,flexShrink:0}}>{allReady?'🚀':'⚡'}</span>
        <div>
          <div style={{fontFamily:'var(--fh)',fontSize:'14px',fontWeight:700,color:allReady?'#065F46':'#92400E',marginBottom:3}}>
            {allReady ? 'Everything is set — you are ready to go live.' : `${readyCount} of ${checks.length} items complete — you can still go live and finish the rest later.`}
          </div>
          <div style={{fontSize:'12.5px',color:allReady?'#065F46':'#92400E',lineHeight:1.5}}>
            {allReady ? 'Your organisation will be activated and your team will receive their invitation emails.' : 'Pending items will be flagged in Settings. Your team invites will only be sent for complete entries.'}
          </div>
        </div>
      </div>
      <button className="btn btn-navy btn-lg" onClick={onComplete} style={{width:'100%',justifyContent:'center',fontSize:'16px',padding:'15px'}}>
        {allReady ? '🚀 Activate CareFlow' : '⚡ Go live — complete setup later →'}
      </button>
    </div>
  );
};
