import { useState } from 'react';
import { StaffScreen } from './staff-screen.jsx';
import { DashboardScreen } from './dashboard-screen.jsx';
import { MessagesScreen } from './messages-screen.jsx';
import { ComingSoon } from './coming-soon.jsx';
import { Nav } from './nav.jsx';

// ── APP ───────────────────────────────────────────────────────────────────────
export const App = () => {
  const initialScreen = () => {
    try {
      const p = new URLSearchParams(window.location.search).get('screen');
      return p || 'home';
    } catch { return 'home'; }
  };
  const [screen, setScreen] = useState(initialScreen);
  return (
    <>
      <Nav screen={screen} setScreen={setScreen} />
      {screen==='home'      && <DashboardScreen />}
      {screen==='staff'     && <StaffScreen />}
      {screen==='clients'   && <ComingSoon name="Clients"    sbKey="clients" />}
      {screen==='rostering' && <ComingSoon name="Rostering"  sbKey="rostering" />}
      {screen==='finance'   && <ComingSoon name="Finance"    sbKey="finance" />}
      {screen==='reports'   && <ComingSoon name="Reports"    sbKey="reports" />}
      {screen==='messages'  && <MessagesScreen />}
    </>
  );
};
