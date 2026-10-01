import { useState } from 'react';
import { PAYSLIPS } from './data.jsx';

// ── STAFF PORTAL SCREEN ────────────────────────────────────────────────────────
export const StaffPortalScreen = () => {
  const [view, setView] = useState('home');
  const [showALModal, setShowALModal] = useState(false);
  const [alDays, setAlDays] = useState('');
  const [alToast, setAlToast] = useState(false);

  if(view==='payslips') return (
    <>
      <div className="screen-hd">
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <button onClick={()=>setView('home')} style={{background:'none',border:'none',color:'var(--teal)',fontSize:'22px',cursor:'pointer'}}>←</button>
          <div>
            <div className="screen-hd-title">Payslips</div>
            <div className="screen-hd-sub">View and download your payslips</div>
          </div>
        </div>
      </div>
      <div className="screen-content">
        <div className="card" style={{margin:'12px'}}>
          {PAYSLIPS.map((p,i)=>(
            <div key={i} className="payslip-row" style={{borderBottom:i<PAYSLIPS.length-1?'1px solid var(--border)':'none'}}>
              <div>
                <div className="payslip-period">{p.period}</div>
                <div className="payslip-meta">Net pay · Paid {p.date}</div>
              </div>
              <div style={{textAlign:'right'}}>
                <div className="payslip-amount">{p.net}</div>
                <div style={{fontSize:'11px',color:'var(--slate)'}}>Gross {p.gross}</div>
                <div style={{fontSize:'11.5px',color:'var(--teal)',fontWeight:600,marginTop:3,cursor:'pointer'}}>Download PDF ↓</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{margin:'0 12px',padding:'12px 14px',background:'var(--teal-l)',border:'1px solid var(--teal-m)',borderRadius:12,fontSize:'12.5px',color:'var(--teal)'}}>
          Payslips are generated on the last working day of each month and are available here and by email.
        </div>
        <div style={{height:20}}/>
      </div>
    </>
  );

  if(view==='pension') return (
    <>
      <div className="screen-hd">
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <button onClick={()=>setView('home')} style={{background:'none',border:'none',color:'var(--teal)',fontSize:'22px',cursor:'pointer'}}>←</button>
          <div>
            <div className="screen-hd-title">Pension</div>
            <div className="screen-hd-sub">NEST Workplace Pension</div>
          </div>
        </div>
      </div>
      <div className="screen-content">
        <div className="card" style={{margin:'12px'}}>
          <div className="card-hd"><span className="card-title">Your pension summary</span></div>
          {[
            ['Pension provider','NEST Workplace Pension'],
            ['Employee contribution','5% of qualifying earnings'],
            ['Employer contribution','3% of qualifying earnings'],
            ['Total contribution','8% per pay period'],
            ['Enrolment date','15 March 2021'],
            ['Opt-out window','Closed'],
          ].map(([l,v])=>(
            <div key={l} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'12px 16px',borderBottom:'1px solid var(--border)'}}>
              <span style={{fontSize:'13px',color:'var(--slate)',flex:1}}>{l}</span>
              <span style={{fontSize:'13px',fontWeight:500,color:'var(--navy)',textAlign:'right',flex:1,paddingLeft:10}}>{v}</span>
            </div>
          ))}
        </div>
        <div className="card" style={{margin:'0 12px'}}>
          <div className="card-hd"><span className="card-title">Contribution this month</span></div>
          {[
            ['Your contribution (5%)','£104.56'],
            ['Employer contribution (3%)','£62.74'],
            ['Total paid in','£167.30'],
          ].map(([l,v],i)=>(
            <div key={i} style={{display:'flex',justifyContent:'space-between',padding:'12px 16px',borderBottom:i<2?'1px solid var(--border)':'none'}}>
              <span style={{fontSize:'13px',color:'var(--slate)'}}>{l}</span>
              <span style={{fontSize:'13px',fontWeight:i===2?700:500,color:i===2?'var(--teal)':'var(--navy)',fontFamily:'var(--fm)'}}>{v}</span>
            </div>
          ))}
        </div>
        <div style={{margin:'10px 12px',padding:'12px 14px',background:'var(--teal-l)',border:'1px solid var(--teal-m)',borderRadius:12,fontSize:'12.5px',color:'var(--teal)',lineHeight:1.5}}>
          To manage your pension, view your pot, or change contribution rates, log in to your NEST account at nestpensions.org.uk
        </div>
        <div style={{height:20}}/>
      </div>
    </>
  );

  if(view==='holidays') return (
    <>
      <div className="screen-hd">
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <button onClick={()=>setView('home')} style={{background:'none',border:'none',color:'var(--teal)',fontSize:'22px',cursor:'pointer'}}>←</button>
          <div>
            <div className="screen-hd-title">Annual Leave</div>
            <div className="screen-hd-sub">Book time off and view your balance</div>
          </div>
        </div>
      </div>
      <div className="screen-content">
        {/* Balance bar */}
        <div className="al-bar">
          <div className="al-label">Leave balance — 2025/26</div>
          <div className="al-track"><div className="al-fill" style={{width:`${(10/28)*100}%`}}/></div>
          <div className="al-nums"><span>0 days</span><span>28 days entitlement</span></div>
          <div style={{display:'flex',justifyContent:'space-between',marginTop:12}}>
            {[['Used','10 days','var(--teal)'],['Pending','5 days','var(--amber)'],['Remaining','13 days','var(--green)']].map(([l,v,c])=>(
              <div key={l} style={{textAlign:'center'}}>
                <div style={{fontFamily:'var(--fh)',fontSize:'18px',fontWeight:800,color:c}}>{v.split(' ')[0]}</div>
                <div style={{fontSize:'11px',color:'var(--slate)'}}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming leave */}
        <div className="card" style={{margin:'0 12px 10px'}}>
          <div className="card-hd">
            <span className="card-title">Approved leave</span>
          </div>
          {[
            {dates:'14–18 April 2026',days:5,status:'approved'},
          ].map((l,i)=>(
            <div key={i} style={{padding:'13px 16px',borderBottom:'1px solid var(--border)',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
              <div>
                <div style={{fontSize:'13.5px',fontWeight:500,color:'var(--navy)'}}>{l.dates}</div>
                <div style={{fontSize:'12px',color:'var(--slate)',marginTop:1}}>Annual Leave · {l.days} days</div>
              </div>
              <span className="tag t-green" style={{textTransform:'capitalize'}}>{l.status}</span>
            </div>
          ))}
        </div>

        {/* Request button */}
        <div style={{margin:'0 12px'}}>
          <button className="btn btn-p btn-full" style={{padding:'14px',fontSize:'15px',borderRadius:14}}
            onClick={()=>setShowALModal(true)}>
            + Request annual leave
          </button>
        </div>

        {/* Leave history */}
        <div className="card" style={{margin:'10px 12px 10px'}}>
          <div className="card-hd"><span className="card-title">Previous requests</span></div>
          {[
            {dates:'23–27 Dec 2025',days:5,status:'approved'},
            {dates:'12 Aug 2025',days:1,status:'approved'},
          ].map((l,i)=>(
            <div key={i} style={{padding:'12px 16px',borderBottom:i===0?'1px solid var(--border)':'none',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
              <div>
                <div style={{fontSize:'13px',fontWeight:500,color:'var(--navy)'}}>{l.dates}</div>
                <div style={{fontSize:'12px',color:'var(--slate)',marginTop:1}}>{l.days} day{l.days!==1?'s':''}</div>
              </div>
              <span className="tag t-green">{l.status}</span>
            </div>
          ))}
        </div>
        <div style={{height:20}}/>
      </div>

      {/* AL Request modal */}
      {showALModal && (
        <div style={{position:'absolute',inset:0,background:'rgba(8,18,34,.6)',zIndex:50,display:'flex',alignItems:'flex-end'}}>
          <div style={{background:'#fff',borderRadius:'20px 20px 0 0',padding:'20px',width:'100%',animation:'slide-up .25s ease'}}>
            <div style={{fontFamily:'var(--fh)',fontSize:'17px',fontWeight:700,color:'var(--navy)',marginBottom:4}}>Request Annual Leave</div>
            <div style={{fontSize:'12.5px',color:'var(--slate)',marginBottom:16}}>13 days remaining · Submit request to coordinator</div>
            {[['From',''],['To',''],['Reason','Holiday (optional)']].map(([l,placeholder],i)=>(
              <div key={l} style={{marginBottom:12}}>
                <div style={{fontSize:'12px',fontWeight:600,color:'var(--slate)',marginBottom:5,textTransform:'uppercase',letterSpacing:'.4px'}}>{l}</div>
                <input style={{width:'100%',padding:'11px 14px',borderRadius:11,border:'1.5px solid var(--border)',fontFamily:'var(--fb)',fontSize:'14px',outline:'none',color:'var(--text)'}} placeholder={i<2?'Select date...':placeholder}/>
              </div>
            ))}
            <div style={{display:'flex',gap:8,marginTop:4}}>
              <button className="btn btn-g" style={{flex:1,padding:'13px'}} onClick={()=>setShowALModal(false)}>Cancel</button>
              <button className="btn btn-p" style={{flex:2,padding:'13px'}} onClick={()=>{setShowALModal(false);setAlToast(true);setTimeout(()=>setAlToast(false),2500);}}>Submit request</button>
            </div>
          </div>
        </div>
      )}
      {alToast && <div style={{position:'absolute',bottom:80,left:16,right:16,background:'var(--navy)',color:'#fff',padding:'12px 16px',borderRadius:12,fontFamily:'var(--fb)',fontSize:'13.5px',fontWeight:500,textAlign:'center',zIndex:60}}>✓ Leave request submitted to Cameron D</div>}
    </>
  );

  // Portal home
  return (
    <>
      <div className="screen-hd">
        <div className="screen-hd-title">Staff Portal</div>
        <div className="screen-hd-sub">Your pay, pension, and HR</div>
      </div>
      <div className="screen-content">

        {/* Quick stats */}
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,margin:'12px 12px 4px'}}>
          {[
            {label:'This month',val:'£2,091.18',sub:'Gross pay',col:'var(--teal)'},
            {label:'Leave remaining',val:'13 days',sub:'of 28 entitlement',col:'var(--green)'},
            {label:'Pension pot',val:'3% + 5%',sub:'Contributions',col:'var(--purple)'},
            {label:'Bradford score',val:'186',sub:'Formal threshold',col:'var(--amber)'},
          ].map(item=>(
            <div key={item.label} style={{background:'#fff',borderRadius:14,border:'1px solid var(--border)',padding:'14px',boxShadow:'0 1px 3px rgba(0,0,0,.05)'}}>
              <div style={{fontSize:'10.5px',fontWeight:700,color:'var(--slate)',textTransform:'uppercase',letterSpacing:'.5px',marginBottom:5}}>{item.label}</div>
              <div style={{fontFamily:'var(--fh)',fontSize:'20px',fontWeight:800,color:item.col,lineHeight:1}}>{item.val}</div>
              <div style={{fontSize:'11px',color:'var(--slate)',marginTop:4}}>{item.sub}</div>
            </div>
          ))}
        </div>

        <div className="portal-section">Pay and Benefits</div>
        <div style={{background:'#fff',border:'1px solid var(--border)',borderRadius:14,margin:'0 12px',overflow:'hidden'}}>
          {[
            {ico:'💷',bg:'var(--green-l)',label:'Payslips',sub:'View and download payslips',view:'payslips'},
            {ico:'🏦',bg:'var(--purple-l)',label:'Pension',sub:'NEST workplace pension · 3% + 5%',view:'pension'},
          ].map((item,i)=>(
            <div key={item.view} className="portal-item" style={{borderBottom:i===0?'1px solid var(--border)':'none'}}
              onClick={()=>setView(item.view)}>
              <div className="portal-ico" style={{background:item.bg}}>{item.ico}</div>
              <div className="portal-label">
                <div className="portal-name">{item.label}</div>
                <div className="portal-sub">{item.sub}</div>
              </div>
              <div className="portal-arrow">›</div>
            </div>
          ))}
        </div>

        <div className="portal-section">Time Off</div>
        <div style={{background:'#fff',border:'1px solid var(--border)',borderRadius:14,margin:'0 12px',overflow:'hidden'}}>
          {[
            {ico:'🏖️',bg:'var(--teal-l)',label:'Annual Leave',sub:'13 days remaining · Book time off',view:'holidays'},
            {ico:'🤒',bg:'var(--amber-l)',label:'Absence',sub:'Report or view absence history',view:'absence'},
          ].map((item,i)=>(
            <div key={item.view} className="portal-item" style={{borderBottom:i===0?'1px solid var(--border)':'none'}}
              onClick={()=>item.view==='holidays'?setView('holidays'):null}>
              <div className="portal-ico" style={{background:item.bg}}>{item.ico}</div>
              <div className="portal-label">
                <div className="portal-name">{item.label}</div>
                <div className="portal-sub">{item.sub}</div>
              </div>
              <div className="portal-arrow">›</div>
            </div>
          ))}
        </div>

        <div className="portal-section">Documents and Training</div>
        <div style={{background:'#fff',border:'1px solid var(--border)',borderRadius:14,margin:'0 12px',overflow:'hidden'}}>
          {[
            {ico:'📋',bg:'var(--slate-l)',label:'My Documents',sub:'Contract, certificates, DBS'},
            {ico:'🎓',bg:'var(--blue-l,#EFF6FF)',label:'Training',sub:'2 courses due for renewal'},
            {ico:'📄',bg:'var(--slate-l)',label:'Policies',sub:'3 policies require acknowledgement'},
          ].map((item,i)=>(
            <div key={item.label} className="portal-item" style={{borderBottom:i<2?'1px solid var(--border)':'none'}}>
              <div className="portal-ico" style={{background:item.bg}}>{item.ico}</div>
              <div className="portal-label">
                <div className="portal-name">{item.label}</div>
                <div className="portal-sub">{item.sub}</div>
              </div>
              <div className="portal-arrow">›</div>
            </div>
          ))}
        </div>
        <div style={{height:20}}/>
      </div>
    </>
  );
};
