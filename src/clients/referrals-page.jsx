import { useState } from 'react';
import { avCol, inits } from './helpers.jsx';
import { REFERRALS, REF_STEPS } from './mock-data.jsx';

// ── REFERRALS PAGE ────────────────────────────────────────────────────────────
export const ReferralsPage = () => {
  const [selRef, setSelRef] = useState(null);

  return (
    <>
      <div className="ph">
        <div>
          <div className="ph-title">New Referrals</div>
          <div className="ph-sub">{REFERRALS.length} referrals in progress</div>
        </div>
        <button className="btn btn-p">+ New referral</button>
      </div>

      <div className="tbl-wrap" style={{marginBottom:16}}>
        <table>
          <thead><tr><th>Referral</th><th>Received</th><th>Zone</th><th>Progress</th><th>Stage</th><th></th></tr></thead>
          <tbody>
            {REFERRALS.map(r=>(
              <tr key={r.id} onClick={()=>setSelRef(r.id===selRef?null:r.id)}>
                <td>
                  <div className="client-cell">
                    <div className="cav" style={{background:avCol(r.name),width:30,height:30,fontSize:11}}>{inits(r.name)}</div>
                    <div><div className="cname">{r.name}</div><div className="cid">{r.id}</div></div>
                  </div>
                </td>
                <td style={{fontFamily:'var(--fm)',fontSize:'11.5px',color:'var(--slate)'}}>{r.date}</td>
                <td><span className="tag t-navy">{r.zone}</span></td>
                <td>
                  <div style={{display:'flex',alignItems:'center',gap:8}}>
                    <div style={{flex:1,height:6,background:'var(--border)',borderRadius:3,overflow:'hidden',minWidth:80}}>
                      <div style={{height:'100%',borderRadius:3,background:'var(--teal)',width:`${(r.step/6)*100}%`}}/>
                    </div>
                    <span style={{fontFamily:'var(--fm)',fontSize:'10.5px',color:'var(--slate)',flexShrink:0}}>{r.step}/6</span>
                  </div>
                </td>
                <td><span className="tag t-teal">{REF_STEPS[r.step-1]}</span></td>
                <td><span className="flink" style={{fontSize:12}}>Open</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Expanded referral view */}
      {selRef && (()=>{
        const r = REFERRALS.find(x=>x.id===selRef);
        if(!r) return null;
        return (
          <div className="card">
            <div className="card-hd">
              <span className="card-title">Referral — {r.name}</span>
              <button className="btn btn-g btn-sm">Close</button>
            </div>
            <div className="card-body">
              <div className="stepper">
                {REF_STEPS.map((step, i) => {
                  const st = i+1 < r.step ? 'done' : i+1===r.step ? 'active' : 'todo';
                  return (
                    <div key={step} className="step">
                      {i>0 && <div className={`step-connector${i<r.step?' done':''}`}/>}
                      <div className="step-label">
                        <div className={`step-circle ${st}`}>{st==='done'?'✓':i+1}</div>
                        <div className="step-name">{step}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div style={{background:'var(--teal-l)',border:'1px solid var(--teal-m)',borderRadius:8,padding:'10px 14px',fontSize:'12.5px',color:'var(--teal)',marginTop:8}}>
                Current step: <strong>{REF_STEPS[r.step-1]}</strong> — complete this step to progress the referral.
              </div>
            </div>
          </div>
        );
      })()}
    </>
  );
};
