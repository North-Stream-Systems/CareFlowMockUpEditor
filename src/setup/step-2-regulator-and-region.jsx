// ── STEP 2: Regulator & region ───────────────────────────────────────────────
export const Step2 = ({data, setData}) => {
  const regs = ['CQC (England)','CIW (Wales)','Both CQC and CIW'];
  const svcTypes = ['Domiciliary care','Residential care','Supported living','Extra care housing','Day services','Complex / nursing care'];
  return (
    <div>
      <div className="step-header">
        <div className="step-num">Step 2 of 8</div>
        <div className="step-title">Regulator & service type</div>
        <div className="step-desc">CareFlow is built for both CQC and CIW. Select your regulator — this controls which inspection frameworks, notification workflows, and report templates are active.</div>
      </div>
      <div className="form-section">Your regulator</div>
      <div style={{display:'flex',gap:12,marginBottom:24}}>
        {regs.map(r => (
          <div key={r} className={`check-item${data.reg===r?' on':''}`} style={{flex:1}} onClick={()=>setData({...data,reg:r})}>
            <div className="check-box">{data.reg===r?'✓':''}</div>
            <div>
              <div className="check-name">{r}</div>
              <div className="check-sub">{r.includes('CQC')?'England':r.includes('CIW')?'Wales':''}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="form-row">
        <div className="field-group">
          <label className="field-label">{data.reg==='CIW (Wales)'?'CIW registration number':'CQC provider ID'}</label>
          <input className="field-input" placeholder="e.g. 1-12345678" style={{fontFamily:'var(--fm)'}} value={data.regNum||''} onChange={e=>setData({...data,regNum:e.target.value})}/>
        </div>
        <div className="field-group">
          <label className="field-label">Date of last inspection</label>
          <input className="field-input" type="date" value={data.lastInspection||''} onChange={e=>setData({...data,lastInspection:e.target.value})}/>
        </div>
      </div>
      <div className="form-section">Services you deliver</div>
      <div className="check-grid">
        {svcTypes.map(s => (
          <div key={s} className={`check-item${(data.services||[]).includes(s)?' on':''}`}
            onClick={()=>{
              const curr = data.services||[];
              setData({...data, services: curr.includes(s) ? curr.filter(x=>x!==s) : [...curr,s]});
            }}>
            <div className="check-box">{(data.services||[]).includes(s)?'✓':''}</div>
            <div className="check-name" style={{fontSize:'13px'}}>{s}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
