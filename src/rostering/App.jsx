import { useRef, useState } from 'react';
import { TemplatesView } from './templates-view.jsx';
import { Gantt } from './main-gantt.jsx';
import { Nav } from './nav.jsx';
import { PageWrap } from './shared-page-wrapper.jsx';
import { WeekView } from './week-view.jsx';
import { RoundsBuilder } from './rounds-builder.jsx';
import { UnassignedPage } from './unassigned-visits-page.jsx';
import { RosterRules } from './roster-rules.jsx';
import { ServiceColours } from './service-colours.jsx';
import { ECMPage } from './ecm-component.jsx';

// ── APP ────────────────────────────────────────────────────────────────────────
export const App = () => {
  const [activePage, setActivePage] = useState('day');
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

  const showToast = msg => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 3000);
  };

  const handleGenerate = () => {
    showToast('Week generated — 16 draft shifts created. Review in Day View.');
    setActivePage('day');
  };

  const needsGantt = activePage === 'day';

  return (
    <>
      <Nav />
      {needsGantt
        ? <Gantt activePage={activePage} setActivePage={setActivePage} />
        : (
          <PageWrap activePage={activePage} setActivePage={setActivePage}>
            {activePage === 'ecm'        && <ECMPage />}
            {activePage === 'templates'  && <TemplatesView onGenerate={handleGenerate} />}
            {activePage === 'week'       && <WeekView />}
            {activePage === 'rounds-b'   && <RoundsBuilder />}
            {activePage === 'unassigned' && <UnassignedPage />}
            {activePage === 'rules'      && <RosterRules />}
            {activePage === 'colours'    && <ServiceColours />}
          </PageWrap>
        )
      }
      {toast && <div className="toast">✓ {toast}</div>}
    </>
  );
};
