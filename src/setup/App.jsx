import { useState } from 'react';
import { LogoMark, STEPS } from './common.jsx';
import { Step1 } from './step-1-organisation-details.jsx';
import { Step2 } from './step-2-regulator-and-region.jsx';
import { Step3 } from './step-3-zones.jsx';
import { Step4 } from './step-4-service-types.jsx';
import { Step5 } from './step-5-billing-rate-sheets.jsx';
import { Step6 } from './step-6-roles-and-permissions.jsx';
import { Step7 } from './step-7-invite-team.jsx';
import { Step8 } from './step-8-go-live.jsx';
import { CompleteScreen } from './complete-screen.jsx';

// ── APP ───────────────────────────────────────────────────────────────────────
export const App = () => {
  const [step,     setStep]     = useState(1);
  const [allData,  setAllData]  = useState({});
  const [complete, setComplete] = useState(false);

  const setStepData = d => setAllData(prev => ({...prev, [step]:d}));
  const data = allData[step] || {};

  const goNext = () => { if(step < 8) setStep(s => s+1); };
  const goPrev = () => { if(step > 1) setStep(s => s-1); };

  const STEP_COMPONENTS = {
    1: <Step1 data={data} setData={setStepData}/>,
    2: <Step2 data={data} setData={setStepData}/>,
    3: <Step3 data={data} setData={setStepData}/>,
    4: <Step4 data={data} setData={setStepData}/>,
    5: <Step5 data={data} setData={setStepData}/>,
    6: <Step6 data={data} setData={setStepData}/>,
    7: <Step7 data={data} setData={setStepData}/>,
    8: <Step8 data={data} allData={allData} onComplete={()=>setComplete(true)}/>,
  };

  const pct = Math.round((step/8)*100);

  if(complete) return (
    <div className="setup-layout">
      <div className="setup-sidebar">
        <div className="setup-logo">
          <div className="logo-mark"><LogoMark/></div>
          <div><div className="logo-name">CareFlow</div><div className="logo-sub">Organisation setup</div></div>
        </div>
        <div className="setup-steps">
          {STEPS.map((s,i)=>(
            <div key={s.num} className={`setup-step done`}>
              <div className="step-line"/>
              <div className="step-circle">✓</div>
              <div className="step-info">
                <div className="step-label">{s.label}</div>
                <div className="step-sub">{s.sub}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="setup-footer">
          <div className="setup-progress-label"><span>Setup complete</span><span>100%</span></div>
          <div className="setup-progress-track"><div className="setup-progress-fill" style={{width:'100%'}}/></div>
        </div>
      </div>
      <div className="setup-main">
        <CompleteScreen allData={allData}/>
      </div>
    </div>
  );

  return (
    <div className="setup-layout">
      {/* Sidebar */}
      <div className="setup-sidebar">
        <div className="setup-logo">
          <div className="logo-mark"><LogoMark/></div>
          <div><div className="logo-name">CareFlow</div><div className="logo-sub">Organisation setup</div></div>
        </div>
        <div className="setup-steps">
          {STEPS.map((s,i)=>{
            const isDone   = s.num < step;
            const isActive = s.num === step;
            return (
              <div key={s.num} className={`setup-step${isDone?' done':''}${isActive?' active':''}`}
                onClick={()=>s.num<=step&&setStep(s.num)}>
                <div className="step-line"/>
                <div className="step-circle">{isDone?'✓':s.num}</div>
                <div className="step-info">
                  <div className="step-label">{s.label}</div>
                  <div className="step-sub">{s.sub}</div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="setup-footer">
          <div className="setup-progress-label"><span>Setup progress</span><span>{pct}%</span></div>
          <div className="setup-progress-track"><div className="setup-progress-fill" style={{width:`${pct}%`}}/></div>
          <button className="save-exit">Save and exit</button>
        </div>
      </div>

      {/* Main */}
      <div className="setup-main">
        <div className="setup-topbar">
          <span className="topbar-step">Step <strong>{step}</strong> of 8 — <strong>{STEPS[step-1].label}</strong></span>
          <div className="topbar-actions">
            <button className="btn btn-g" style={{fontSize:13,padding:'7px 14px'}} onClick={()=>window.location.href='CareFlow_Login.html'}>← Back to sign in</button>
          </div>
        </div>

        <div style={{flex:1,overflowY:'auto'}}>
          <div className="setup-content" key={step}>
            {STEP_COMPONENTS[step]}
          </div>
        </div>

        {/* Bottom nav */}
        <div className="step-nav">
          <button className="btn btn-g" onClick={goPrev} disabled={step===1} style={{opacity:step===1?.3:1}}>
            ← Back
          </button>
          <div className="step-dots">
            {STEPS.map(s=>(
              <div key={s.num} className={`step-dot${s.num===step?' on':s.num<step?' done':''}`}
                onClick={()=>s.num<=step&&setStep(s.num)}/>
            ))}
          </div>
          {step < 8
            ? <button className="btn btn-p" onClick={goNext}>Next →</button>
            : <button className="btn btn-navy" onClick={()=>setComplete(true)}>Activate →</button>
          }
        </div>
      </div>
    </div>
  );
};
