import { useState } from 'react';
import { today } from './data.jsx';
import { ScheduleScreen } from './schedule-screen.jsx';
import { VisitScreen } from './co-worker-card.jsx';
import { MessagesScreen } from './messages-screen.jsx';
import { NotificationsScreen } from './notifications-screen.jsx';
import { StaffPortalScreen } from './staff-portal-screen.jsx';

// ── APP ────────────────────────────────────────────────────────────────────────
const HR = new Date().getHours();
export const GREETING = HR<12?'Good morning':HR<17?'Good afternoon':'Good evening';
const DAYS_FULL = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
export const TODAY_STR = `${DAYS_FULL[today.getDay()]} ${today.getDate()} ${MONTHS[today.getMonth()]}`;

const TABS = [
  { id:'schedule',  label:'Schedule',     ico:'📅' },
  { id:'messages',  label:'Messages',     ico:'💬' },
  { id:'notifs',    label:'Alerts',       ico:'🔔' },
  { id:'portal',    label:'Portal',       ico:'👤' },
];

export const App = () => {
  const [tab,  setTab]  = useState('schedule');
  const [visit,setVisit]= useState(null);

  const totalUnread = 3;
  const notifUnread = 2;

  const handleOpenVisit = shift => { setVisit(shift); setTab('visit'); };
  const handleBackFromVisit = () => { setVisit(null); setTab('schedule'); };

  const nowH = new Date().getHours();
  const nowM = new Date().getMinutes();
  const timeStr = `${String(nowH).padStart(2,'0')}:${String(nowM).padStart(2,'0')}`;

  return (
    <div className="phone-shell">
      <div className="notch">
        <div className="notch-cam"/>
        <div className="notch-speaker"/>
      </div>
      <div className="app-screen">
        {/* Status bar */}
        <div className="status-bar">
          <div className="status-time">{timeStr}</div>
          <div className="status-icons">
            <span>●●●●</span>
            <span>WiFi</span>
            <span>🔋</span>
          </div>
        </div>

        {/* Screens */}
        <div style={{flex:1,overflow:'hidden',display:'flex',flexDirection:'column'}}>
          {tab==='schedule' && <ScheduleScreen onOpenVisit={handleOpenVisit}/>}
          {tab==='visit'    && visit && <VisitScreen shift={visit} onBack={handleBackFromVisit}/>}
          {tab==='messages' && <MessagesScreen/>}
          {tab==='notifs'   && <NotificationsScreen/>}
          {tab==='portal'   && <StaffPortalScreen/>}
        </div>

        {/* Tab bar — hidden during visit */}
        {tab !== 'visit' && (
          <div className="tab-bar">
            {TABS.map(t => (
              <div key={t.id} className={`tab${tab===t.id?' on':''}`} onClick={()=>setTab(t.id)}>
                {t.id==='messages' && totalUnread>0 && tab!=='messages' && <div className="tab-badge">{totalUnread}</div>}
                {t.id==='notifs'   && notifUnread>0 && tab!=='notifs'   && <div className="tab-badge">{notifUnread}</div>}
                <div className="tab-ico">{t.ico}</div>
                <div className="tab-label" style={{color:tab===t.id?'var(--teal)':'var(--slate)'}}>{t.label}</div>
                {tab===t.id && <div className="tab-dot"/>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Hide splash once React has painted
requestAnimationFrame(()=>requestAnimationFrame(()=>{
  const s=document.getElementById('splash');
  if(s){s.classList.add('hide');setTimeout(()=>s.remove(),450);}
}));
