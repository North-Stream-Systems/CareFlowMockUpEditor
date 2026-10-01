import { useState } from 'react';
import { LOGIN_FILE, NAV_LINKS, V3 } from './common.jsx';
import { Sidebar } from './sidebar.jsx';
import { FinanceDashboard } from './finance-dashboard.jsx';
import { InvoicesPage } from './invoices-page.jsx';
import { CreditNotesPage } from './credit-notes-page.jsx';
import { FundersPage } from './funders-page.jsx';
import { PayrollPage } from './payroll-page.jsx';
import { CS } from './coming-soon.jsx';
import { RateSheetsPage } from './rate-sheets-page.jsx';

// ── APP ────────────────────────────────────────────────────────────────────────
export const App = () => {
  const getInitialPage = () => {
    try { return new URLSearchParams(window.location.search).get('page')||'dashboard'; } catch { return 'dashboard'; }
  };
  const [page, setPage] = useState(getInitialPage);

  const pageMap = {
    dashboard:       <FinanceDashboard setPage={setPage} />,
    invoices:        <InvoicesPage />,
    credit:          <CreditNotesPage />,
    funders:         <FundersPage />,
    'billing-sheets':<RateSheetsPage type="billing" />,
    'pay-sheets':    <RateSheetsPage type="pay" />,
    payroll:         <PayrollPage />,
    rates:           <CS label="Pay Rates" />,
    'fin-settings':  <CS label="Finance Settings" />,
  };

  return (
    <>
      <nav className="nav">
        <div className="nav-logo" onClick={() => window.location.href=`${V3}?screen=home`} style={{ cursor:'pointer' }}>
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
            <button key={name} className={`nav-btn${name==='Finance'?' on':''}`}
              onClick={() => href && (window.location.href = href)}
              style={{ cursor:href?'pointer':'default', opacity:href||name==='Finance'?1:.5 }}>
              {name}
            </button>
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
      <div className="mod">
        <Sidebar active={page} setActive={setPage} />
        <div className="content">
          {pageMap[page] || <FinanceDashboard setPage={setPage} />}
        </div>
      </div>
    </>
  );
};
