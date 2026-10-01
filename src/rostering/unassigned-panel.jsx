import { SVC_COLORS } from './constants.jsx';

// ── UNASSIGNED PANEL ─────────────────────────────────────────────────────────
export const UnassignedPanel = ({ visits }) => (
  <div className="unassigned-panel">
    <div className="up-header">
      <span className="up-title">Unassigned</span>
      <span className="up-badge">{visits.length}</span>
    </div>
    <div className="up-body">
      {visits.map(v => {
        const svc = SVC_COLORS[v.svc] || SVC_COLORS['Personal Care'];
        return (
          <div key={v.id} className="up-item">
            <div className="up-client">{v.client}</div>
            <div className="up-meta">{v.zone} Zone</div>
            <div className="up-time">{v.time}</div>
            <div className="up-svc">
              <div style={{width:8,height:8,borderRadius:2,background:svc.bg,flexShrink:0}} />
              <span style={{fontSize:'10.5px',color:'var(--slate)'}}>{v.svc}</span>
            </div>
          </div>
        );
      })}
    </div>
    <div className="up-footer">
      <button className="btn btn-p btn-sm" style={{width:'100%',justifyContent:'center'}}>Bulk assign</button>
    </div>
  </div>
);
