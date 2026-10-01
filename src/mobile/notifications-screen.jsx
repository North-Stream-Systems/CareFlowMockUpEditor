import { useState } from 'react';
import { NOTIFICATIONS } from './data.jsx';

// ── NOTIFICATIONS SCREEN ───────────────────────────────────────────────────────
export const NotificationsScreen = () => {
  const [notifs, setNotifs] = useState(NOTIFICATIONS);
  const unread = notifs.filter(n=>n.unread).length;
  return (
    <>
      <div className="screen-hd">
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <div className="screen-hd-title">Notifications</div>
          {unread>0&&<button onClick={()=>setNotifs(prev=>prev.map(n=>({...n,unread:false})))}
            style={{fontSize:'12.5px',color:'var(--teal)',fontWeight:600,background:'none',border:'none',cursor:'pointer'}}>
            Mark all read
          </button>}
        </div>
        <div className="screen-hd-sub">{unread} unread</div>
      </div>
      <div className="screen-content">
        {notifs.map(n=>(
          <div key={n.id} className={`notif-item${n.unread?' unread':''}`}
            onClick={()=>setNotifs(prev=>prev.map(x=>x.id===n.id?{...x,unread:false}:x))}>
            <div className="notif-ico" style={{background:n.bg}}>{n.ico}</div>
            <div style={{flex:1,minWidth:0}}>
              <div className="notif-title">{n.title}</div>
              <div className="notif-body">{n.body}</div>
              <div className="notif-time">{n.time}</div>
            </div>
            {n.unread && <div className="notif-unread-dot"/>}
          </div>
        ))}
        <div style={{height:20}}/>
      </div>
    </>
  );
};
