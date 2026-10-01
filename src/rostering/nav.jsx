// ── NAV ────────────────────────────────────────────────────────────────────────
const V3 = 'CareFlow_Prototype_v3.html';
const NAV_LINKS = {
  Home:      `${V3}?screen=home`,
  Staff:     `${V3}?screen=staff`,
  Clients:   'CareFlow_Clients.html',
  Rostering: null,
  Finance:   'CareFlow_Finance.html',
  Reports:   `${V3}?screen=reports`,
  Messages:  `${V3}?screen=messages`,
};

export const Nav = () => (
  <nav className="nav">
    <div className="nav-logo" onClick={() => window.location.href=`${V3}?screen=home`} style={{cursor:'pointer'}}>
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
      {Object.entries(NAV_LINKS).map(([name, href]) => (
        <button
          key={name}
          className={`nav-btn${name==='Rostering'?' on':''}`}
          onClick={() => href && (window.location.href = href)}
          style={{cursor: href ? 'pointer' : 'default', opacity: href || name==='Rostering' ? 1 : .5}}
        >{name}</button>
      ))}
    </div>
    <div className="nav-r">
      <span className="org-pill">Aber Care</span>
      <button className="nav-icon">🔔<span className="notif-dot"/></button>
      <button className="nav-icon">⚙️</button>
      <div className="nav-div"/>
      <div className="nav-av" onClick={()=>window.location.href=LOGIN_FILE} title="Sign out" style={{cursor:"pointer"}}>CD</div>
    </div>
  </nav>
);
