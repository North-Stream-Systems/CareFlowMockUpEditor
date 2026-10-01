import { avCol } from './helpers.jsx';
import { CLIENTS, INCIDENTS_DATA } from './mock-data.jsx';

// ── INCIDENTS PAGE ────────────────────────────────────────────────────────────
export const IncidentsPage = () => {
  const sevCol = s => ({serious:'red',major:'red',moderate:'amber',minor:'teal'}[s]||'slate');
  const open = INCIDENTS_DATA.filter(i=>i.stage!=='Closed');
  return (
    <>
      <div className="ph">
        <div><div className="ph-title">Incidents</div><div className="ph-sub">{open.length} open incidents across all clients</div></div>
        <button className="btn btn-p btn-sm">+ Report incident</button>
      </div>
      <div className="kpi-row">
        <div className="kpi kpi-red"><div className="kpi-label">Open</div><div className="kpi-val">{open.length}</div><div className="kpi-sub">Require action</div></div>
        <div className="kpi kpi-amber"><div className="kpi-label">Major / Serious</div><div className="kpi-val">{open.filter(i=>i.sev==='major'||i.sev==='serious').length}</div><div className="kpi-sub">CIW notifiable</div></div>
        <div className="kpi"><div className="kpi-label">CIW Notified</div><div className="kpi-val">{open.filter(i=>i.notified).length}</div><div className="kpi-sub">This period</div></div>
        <div className="kpi kpi-green"><div className="kpi-label">Closed (30d)</div><div className="kpi-val">{INCIDENTS_DATA.filter(i=>i.stage==='Closed').length}</div><div className="kpi-sub">Resolved</div></div>
      </div>
      <div className="tbl-wrap">
        <table>
          <thead><tr><th>Client</th><th>Type</th><th>Date</th><th>Severity</th><th>Stage</th><th>CIW</th><th>Days open</th></tr></thead>
          <tbody>
            {INCIDENTS_DATA.map(inc=>(
              <tr key={inc.id}>
                <td><div className="client-cell"><div className="cav" style={{background:avCol(inc.clientId.replace('CL','C')),width:26,height:26,fontSize:10,borderRadius:7}}>{inc.clientId.slice(-2)}</div><span className="cname" style={{fontSize:'12.5px'}}>{CLIENTS.find(c=>c.id===inc.clientId)?.name||inc.clientId}</span></div></td>
                <td style={{fontSize:'12.5px',fontWeight:500}}>{inc.type}</td>
                <td style={{fontFamily:'var(--fm)',fontSize:'11.5px',color:'var(--slate)'}}>{inc.date}</td>
                <td><span className={`tag t-${sevCol(inc.sev)}`} style={{textTransform:'capitalize'}}>{inc.sev}</span></td>
                <td style={{fontSize:'12px',color:'var(--slate)'}}>{inc.stage}</td>
                <td>{inc.notified?<span className="tag t-teal">Sent</span>:<span className="tag t-slate">No</span>}</td>
                <td><span style={{fontFamily:'var(--fm)',fontSize:'12px',color:inc.open>14?'var(--red)':inc.open>7?'var(--amber)':'var(--slate)'}}>{inc.open>0?`${inc.open}d`:'Closed'}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
