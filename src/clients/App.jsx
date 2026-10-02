import { useState } from 'react';
import { LOGIN_FILE, NAV_LINKS, ORG, USER, V3 } from './constants.jsx';
import { Sidebar } from './sidebar.jsx';
import { ClientList } from './client-list.jsx';
import { ReferralsPage } from './referrals-page.jsx';
import { IncidentsPage } from './incidents-page.jsx';
import { ComplaintsPage } from './complaints-page.jsx';
import { OverviewSettingsPage } from './settings-overview.jsx';
import { FormsSettingsPage } from './settings-forms.jsx';
import { BodyMapsPage, DischargedPage, MCAPage, MedicationsPage, SuspendedPage } from './simple-cs-pages.jsx';

// ── APP ───────────────────────────────────────────────────────────────────────
export const App = () => {
  const getInitialPage = () => {
    try { return new URLSearchParams(window.location.search).get('page')||'clients'; } catch { return 'clients'; }
  };
  const [page, setPage] = useState(getInitialPage);

  const pageMap = {
    clients:    <ClientList statusFilter="All"/>,
    referrals:  <ReferralsPage/>,
    suspended:  <SuspendedPage/>,
    discharged: <DischargedPage/>,
    incidents:  <IncidentsPage/>,
    complaints: <ComplaintsPage/>,
    medications:<MedicationsPage/>,
    'body-maps':<BodyMapsPage/>,
    mca:        <MCAPage/>,
    'settings-overview': <OverviewSettingsPage/>,
    'settings-forms':    <FormsSettingsPage/>,
  };

  return (
    <>
      {/* NAV */}
      <nav className="nav">
        <div className="nav-logo" onClick={()=>window.location.href=`${V3}?screen=home`} style={{cursor:'pointer'}}>
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
              className={`nav-btn${name==='Clients'?' on':''}`}
              onClick={()=>href&&(window.location.href=href)}
              style={{cursor:href?'pointer':'default',opacity:href||name==='Clients'?1:.5}}
            >{name}</button>
          ))}
        </div>
        <div className="nav-r">
          <span className="org-pill">{ORG.short}</span>
          <button className="nav-icon">🔔<span className="notif-dot"/></button>
          <button className="nav-icon">⚙️</button>
          <div className="nav-div"/>
          <div className="nav-av" onClick={()=>window.location.href=LOGIN_FILE} title="Sign out" style={{cursor:'pointer'}}>{USER.initials}</div>
        </div>
      </nav>

      {/* MODULE LAYOUT */}
      <div className="mod">
        <Sidebar active={page} setActive={setPage}/>
        <div className="content">
          {pageMap[page] || <ClientList statusFilter="All"/>}
        </div>
      </div>
    </>
  );
};
