import { useState } from 'react';

// ── STEP 5: Billing rate sheets ──────────────────────────────────────────────
export const Step5 = ({data, setData}) => {
  const [sel, setSel] = useState(0);
  const funders = [
    {name:'Local authority / council',example:'e.g. Conwy County Council',color:'#0D9488'},
    {name:'NHS / ICB commissioned',  example:'e.g. Betsi Cadwaladr ICB',color:'#3B82F6'},
    {name:'Private / self-funded',   example:'Standard private rates',    color:'#8B5CF6'},
    {name:'Insurance funded',        example:'e.g. Aviva care insurance',  color:'#F59E0B'},
  ];
  const toggleFunder = i => {
    const curr = data.funders||[];
    setData({...data, funders: curr.includes(i) ? curr.filter(x=>x!==i) : [...curr,i]});
  };
  return (
    <div>
      <div className="step-header">
        <div className="step-num">Step 5 of 9</div>
        <div className="step-title">Billing rate sheets</div>
        <div className="step-desc">Rate sheets define what you charge per service type, day of week, and time of day. Each client is assigned a rate sheet — change the sheet once and all invoices update automatically.</div>
      </div>
      <div className="form-section">Which funder types do you work with?</div>
      <div className="check-grid" style={{marginBottom:24}}>
        {funders.map((f,i) => (
          <div key={i} className={`check-item${(data.funders||[]).includes(i)?' on':''}`} onClick={()=>toggleFunder(i)}>
            <div className="check-box" style={(data.funders||[]).includes(i)?{background:f.color,borderColor:f.color}:{}}>{(data.funders||[]).includes(i)?'✓':''}</div>
            <div>
              <div className="check-name" style={{fontSize:'13px'}}>{f.name}</div>
              <div className="check-sub">{f.example}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="form-section">Rate configuration</div>
      <div style={{display:'flex',gap:8,marginBottom:16}}>
        {['Set rates now (quick setup)','Import CSV','Set up later'].map((o,i)=>(
          <button key={i} className={`btn${sel===i?' btn-p':' btn-g'}`} style={{fontSize:13,padding:'8px 14px'}} onClick={()=>setSel(i)}>{o}</button>
        ))}
      </div>
      {sel===0 && (
        <div>
          <div style={{background:'#fff',border:'1px solid var(--border)',borderRadius:12,overflow:'hidden'}}>
            <div style={{padding:'10px 14px',background:'var(--slate-l)',fontFamily:'var(--fm)',fontSize:'10.5px',fontWeight:700,color:'var(--slate)',textTransform:'uppercase',letterSpacing:'.5px',display:'grid',gridTemplateColumns:'1fr 90px 90px 90px 100px',gap:8}}>
              <span>Service type</span><span style={{textAlign:'right'}}>Weekday</span><span style={{textAlign:'right'}}>Saturday</span><span style={{textAlign:'right'}}>Sunday</span><span style={{textAlign:'right'}}>Bank Hol</span>
            </div>
            {['Personal Care','Medication','Domestic','Social Support'].map((svc,si)=>(
              <div key={svc} style={{display:'grid',gridTemplateColumns:'1fr 90px 90px 90px 100px',gap:8,padding:'9px 14px',borderTop:'1px solid var(--border)',alignItems:'center'}}>
                <span style={{fontSize:'13.5px',fontWeight:500,color:'var(--navy)'}}>{svc}</span>
                {['19.50','24.38','29.25','39.00'].map((v,vi)=>(
                  <div key={vi} style={{position:'relative'}}>
                    <span style={{position:'absolute',left:8,top:'50%',transform:'translateY(-50%)',fontSize:'12px',color:'var(--slate)'}}>£</span>
                    <input style={{width:'100%',padding:'6px 8px 6px 20px',borderRadius:7,border:'1.5px solid var(--border)',fontFamily:'var(--fm)',fontSize:13,outline:'none',textAlign:'right'}} defaultValue={v} onFocus={e=>e.target.style.borderColor='var(--teal)'} onBlur={e=>e.target.style.borderColor='var(--border)'}/>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div style={{fontSize:'12px',color:'var(--slate)',marginTop:8}}>Time bands (uplift on top of above): Early AM +15% · Evening +10% · Night +33%</div>
        </div>
      )}
      {sel===1 && (
        <div className="upload-zone">
          <div className="upload-ico">📄</div>
          <div className="upload-title">Drop your rate sheet CSV here</div>
          <div className="upload-sub">or <span className="upload-link">browse files</span> · Download <span className="upload-link">template CSV</span></div>
        </div>
      )}
      {sel===2 && (
        <div style={{padding:'16px',background:'var(--amber-l)',border:'1px solid var(--amber)',borderRadius:10,fontSize:'13px',color:'#92400E',lineHeight:1.6}}>
          You can configure rate sheets later in <strong>Finance → Rate Sheets</strong>. Until rates are set, CareFlow will flag invoices as needing manual rate entry.
        </div>
      )}
    </div>
  );
};
