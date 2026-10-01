import { ORG, USER } from './constants.jsx';

// ── NAV ───────────────────────────────────────────────────────────────────────
const ROSTERING_FILE = 'CareFlow_Rostering.html';
const CLIENTS_FILE   = 'CareFlow_Clients.html';
const FINANCE_FILE   = 'CareFlow_Finance.html';
const LOGIN_FILE     = 'CareFlow_Login.html';

export const Nav = ({screen, setScreen}) => (
  <nav className="nav">
    <div className="nav-logo" onClick={() => setScreen('home')} style={{cursor:'pointer'}}>
      <span className="logo-mark">
        <svg viewBox="0 0 13 13" fill="none">
          <rect x="1" y="1" width="5" height="5" rx="1.5" fill="white" opacity=".9"/>
          <rect x="7" y="1" width="5" height="5" rx="1.5" fill="white" opacity=".6"/>
          <rect x="1" y="7" width="5" height="5" rx="1.5" fill="white" opacity=".6"/>
          <rect x="7" y="7" width="5" height="5" rx="1.5" fill="white" opacity=".3"/>
        </svg>
      </span>
      CareFlow
    </div>
    <div className="nav-items">
      {[['home','Home'],['staff','Staff']].map(([id,label]) => (
        <button key={id} className={`nav-btn${screen===id?' on':''}`} onClick={() => setScreen(id)}>{label}</button>
      ))}
      <button className="nav-btn" onClick={() => window.location.href = CLIENTS_FILE}>Clients</button>
      <button
        className={`nav-btn${screen==='rostering'?' on':''}`}
        onClick={() => window.location.href = ROSTERING_FILE}
      >Rostering</button>
      {[['finance','Finance'],['reports','Reports']].map(([id,label]) => (
        <button key={id} className={`nav-btn${screen===id?' on':''}`}
          onClick={() => id==='finance' ? window.location.href=FINANCE_FILE : setScreen(id)}>{label}</button>
      ))}
      <button className={`nav-btn${screen==='messages'?' on':''}`} onClick={() => setScreen('messages')}>
        Messages <span className="msg-badge">3</span>
      </button>
    </div>
    <div className="nav-r">
      <span className="org-pill">{ORG.short}</span>
      <button className="nav-icon">🔔<span className="notif-dot" /></button>
      <button className="nav-icon">⚙️</button>
      <div className="nav-div" />
      <div className="nav-av" onClick={() => window.location.href=LOGIN_FILE} title="Sign out">{USER.initials}</div>
    </div>
  </nav>
);
