import React, { useRef, useState } from 'react';

const DESKTOP = 'CareFlow_Prototype_v3.html';
const MOBILE  = 'CareFlow_Mobile.html';
const SETUP   = 'CareFlow_Setup.html';

const DEMO_ACCOUNTS = [
  { role:'coordinator', email:'cameron@abercare.co.uk',  password:'careflow2026', name:'Cameron D',    org:'Aber Care Services Ltd', dest:DESKTOP },
  { role:'manager',     email:'manager@abercare.co.uk',  password:'careflow2026', name:'Sian M',        org:'Aber Care Services Ltd', dest:DESKTOP },
  { role:'carer',       email:'emma@abercare.co.uk',     password:'careflow2026', name:'Emma Williams', org:'Aber Care Services Ltd', dest:MOBILE  },
];

const LogoMark = () => (
  <svg viewBox="0 0 22 22" fill="none">
    <rect x="1" y="1"  width="9" height="9" rx="2.5" fill="white" opacity=".9"/>
    <rect x="12" y="1"  width="9" height="9" rx="2.5" fill="white" opacity=".6"/>
    <rect x="1" y="12" width="9" height="9" rx="2.5" fill="white" opacity=".6"/>
    <rect x="12" y="12" width="9" height="9" rx="2.5" fill="white" opacity=".3"/>
  </svg>
);

export const App = () => {
  const [role,     setRole]     = useState('coordinator');
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState('');
  const [success,  setSuccess]  = useState(null);
  const [showPw,   setShowPw]   = useState(false);
  const emailRef = useRef(null);

  const ROLES = [
    { id:'coordinator', ico:'🖥️',  label:'Coordinator',  sub:'Desktop dashboard' },
    { id:'carer',       ico:'📱',  label:'Care Worker',  sub:'Mobile app'         },
  ];

  const demoForRole = r => DEMO_ACCOUNTS.find(a => a.role === r);
  const demo = demoForRole(role);

  const handleRoleSwitch = r => {
    setRole(r);
    setEmail('');
    setPassword('');
    setError('');
  };

  const handleFillDemo = () => {
    if(demo) { setEmail(demo.email); setPassword(demo.password); setError(''); }
  };

  const handleSubmit = () => {
    setError('');
    if(!email.trim()) { setError('Please enter your email address'); return; }
    if(!password)     { setError('Please enter your password'); return; }

    setLoading(true);
    setTimeout(() => {
      const match = DEMO_ACCOUNTS.find(a => a.email===email.trim().toLowerCase() && a.password===password);
      if(match) {
        setLoading(false);
        setSuccess(match);
        setTimeout(() => { window.location.href = match.dest; }, 2200);
      } else {
        setLoading(false);
        setError('Incorrect email or password. Use the demo credentials below.');
      }
    }, 1200);
  };

  const handleKeyDown = e => { if(e.key==='Enter') handleSubmit(); };

  if(success) return (
    <div className="login-wrap fade-in">
      <div className="login-card">
        <div className="success-state">
          <div className="success-tick">✓</div>
          <div className="success-title">Welcome back, {success.name.split(' ')[0]}</div>
          <div className="success-sub">{success.org}</div>
          <div className="routing-indicator">
            <div style={{fontSize:22,flexShrink:0}}>{success.role==='carer'?'📱':'🖥️'}</div>
            <div>
              <div className="routing-text">Opening {success.role==='carer'?'CareFlow Mobile':'CareFlow Desktop'}</div>
              <div className="routing-sub">{success.role==='carer'?'Care worker view — today\'s visits':'Coordinator dashboard'}</div>
            </div>
            <div className="spinner" style={{marginLeft:'auto',borderTopColor:'var(--teal)',border:'2px solid var(--teal-m)'}}/>
          </div>
        </div>
      </div>
      <div className="login-footer">
        <span>If you are not redirected, </span>
        <a href={success.dest}>click here</a>
      </div>
    </div>
  );

  return (
    <div className="login-wrap">
      <div className="login-card">
        {/* Logo */}
        <div className="logo-row">
          <div className="logo-mark"><LogoMark/></div>
          <div>
            <div className="logo-name">CareFlow</div>
            <div className="logo-reg">CQC &amp; CIW Regulated</div>
          </div>
        </div>

        <div className="login-title">Sign in</div>
        <div className="login-sub">Select your role, then sign in with your account.</div>

        {/* Role toggle */}
        <div className="role-row">
          {ROLES.map(r => (
            <div key={r.id} className={`role-btn${role===r.id?' on':''}`} onClick={() => handleRoleSwitch(r.id)}>
              <div className="role-check">✓</div>
              <span className="role-ico">{r.ico}</span>
              <div className="role-label">{r.label}</div>
              <div className="role-sub">{r.sub}</div>
            </div>
          ))}
        </div>

        {/* Demo credentials box */}
        <div className="demo-box" style={{cursor:'pointer'}} onClick={handleFillDemo}>
          <div style={{fontSize:18,flexShrink:0}}>💡</div>
          <div>
            <div className="demo-label">Demo account — tap to fill</div>
            <div className="demo-cred">📧 {demo?.email}</div>
            <div className="demo-cred">🔑 {demo?.password}</div>
          </div>
        </div>

        {/* Fields */}
        <div className="field">
          <label className="field-label">Email address</label>
          <input
            ref={emailRef}
            className={`field-input${error&&!email?' err':''}`}
            type="email"
            placeholder="your@email.co.uk"
            value={email}
            onChange={e => { setEmail(e.target.value); setError(''); }}
            onKeyDown={handleKeyDown}
            autoComplete="email"
          />
        </div>
        <div className="field">
          <label className="field-label">Password</label>
          <div style={{position:'relative'}}>
            <input
              className={`field-input${error&&!password?' err':''}`}
              type={showPw?'text':'password'}
              placeholder="Enter your password"
              value={password}
              onChange={e => { setPassword(e.target.value); setError(''); }}
              onKeyDown={handleKeyDown}
              autoComplete="current-password"
              style={{paddingRight:44}}
            />
            <button onClick={() => setShowPw(p => !p)} style={{position:'absolute',right:13,top:'50%',transform:'translateY(-50%)',background:'none',border:'none',cursor:'pointer',color:'var(--slate)',fontSize:16,padding:2}}>
              {showPw ? '🙈' : '👁'}
            </button>
          </div>
        </div>

        {error && <div className="field-err" style={{marginBottom:12,display:'flex',gap:5,alignItems:'center'}}><span>⚠</span>{error}</div>}

        <button className={`submit-btn${loading?' loading':''}`} onClick={handleSubmit} disabled={loading}>
          {loading ? <><div className="spinner"/><span>Signing in...</span></> : <>Sign in →</>}
        </button>

        <div className="link-row">
          <button className="text-link">Forgot password?</button>
          <button className="text-link">Need help?</button>
        </div>

        <div className="divider">
          <div className="divider-line"/>
          <span className="divider-label">New to CareFlow?</span>
          <div className="divider-line"/>
        </div>

        <button className="new-org-btn" onClick={() => window.location.href=SETUP}>
          ✦ Set up your organisation
        </button>

        {/* Regulator badges */}
        <div className="reg-strip">
          {[['CQC','#DA3754'],['CIW','#0069A8'],['ICO','#2B4490'],['ISO','#2B7A3A']].map(([label,col]) => (
            <div key={label} className="reg-badge">
              <div className="reg-icon" style={{background:col}}>{label.slice(0,2)}</div>
              {label}
            </div>
          ))}
          <div className="reg-badge">
            <div className="reg-icon" style={{background:'#1a1a2e',fontSize:8}}>CE</div>
            Cyber Essentials
          </div>
        </div>
      </div>

      <div className="login-footer">
        <span>© 2026 CareFlow · </span>
        <a href="#">Privacy</a>
        <span> · </span>
        <a href="#">Terms</a>
        <span> · </span>
        <a href="#">Security</a>
        <span> · </span>
        <a href="#">Status</a>
      </div>
    </div>
  );
};
