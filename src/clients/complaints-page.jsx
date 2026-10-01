import { avCol } from './helpers.jsx';
import { CLIENTS, COMPLAINTS_DATA } from './mock-data.jsx';

// ── COMPLAINTS PAGE ───────────────────────────────────────────────────────────
export const ComplaintsPage = () => (
  <>
    <div className="ph">
      <div><div className="ph-title">Complaints</div><div className="ph-sub">{COMPLAINTS_DATA.length} complaints — {COMPLAINTS_DATA.filter(c=>c.days>25).length} approaching statutory deadline</div></div>
      <button className="btn btn-p btn-sm">+ Record complaint</button>
    </div>
    <div className="kpi-row" style={{gridTemplateColumns:'repeat(3,1fr)'}}>
      <div className="kpi kpi-amber"><div className="kpi-label">Open</div><div className="kpi-val">{COMPLAINTS_DATA.length}</div><div className="kpi-sub">Require resolution</div></div>
      <div className="kpi kpi-red"><div className="kpi-label">Approaching deadline</div><div className="kpi-val">{COMPLAINTS_DATA.filter(c=>c.days>25).length}</div><div className="kpi-sub">30-day CIW limit</div></div>
      <div className="kpi kpi-green"><div className="kpi-label">Acknowledged</div><div className="kpi-val">{COMPLAINTS_DATA.filter(c=>c.ack).length}/{COMPLAINTS_DATA.length}</div><div className="kpi-sub">Within 2 days</div></div>
    </div>
    <div className="tbl-wrap">
      <table>
        <thead><tr><th>Client</th><th>Received</th><th>Stage</th><th>Acknowledged</th><th>Days open</th><th>Statutory</th></tr></thead>
        <tbody>
          {COMPLAINTS_DATA.map(cp=>(
            <tr key={cp.id}>
              <td><div className="client-cell"><div className="cav" style={{background:avCol(cp.clientId),width:26,height:26,fontSize:10,borderRadius:7}}>{cp.clientId.slice(-2)}</div><span className="cname" style={{fontSize:'12.5px'}}>{CLIENTS.find(c=>c.id===cp.clientId)?.name||cp.clientId}</span></div></td>
              <td style={{fontFamily:'var(--fm)',fontSize:'11.5px',color:'var(--slate)'}}>{cp.date}</td>
              <td style={{fontSize:'12px',color:'var(--slate)'}}>{cp.stage}</td>
              <td>{cp.ack?<span className="tag t-green">Yes</span>:<span className="tag t-red">Pending</span>}</td>
              <td><span style={{fontFamily:'var(--fm)',fontSize:'12px',fontWeight:600,color:cp.days>25?'var(--red)':cp.days>14?'var(--amber)':'var(--slate)'}}>{cp.days}d</span></td>
              <td><span className={`tag t-${cp.days>30?'red':cp.days>25?'amber':'green'}`}>{cp.days>30?'Breached':cp.days>25?'Due soon':'Within limit'}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </>
);
