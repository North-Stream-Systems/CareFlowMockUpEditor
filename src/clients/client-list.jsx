import { useMemo, useState } from 'react';
import { avCol, inits } from './helpers.jsx';
import { CLIENTS, INCIDENTS_DATA } from './mock-data.jsx';
import { ClientProfile } from './client-profile-modal.jsx';

// ── CLIENT LIST ───────────────────────────────────────────────────────────────
export const ClientList = ({ statusFilter }) => {
  const [search,   setSearch]   = useState('');
  const [zone,     setZone]     = useState('All');
  const [stFil,    setStFil]    = useState(statusFilter || 'All');
  const [selected, setSelected] = useState(null);

  const zones = ['All','North','Central','South'];
  const counts = {
    All:        CLIENTS.length,
    Active:     CLIENTS.filter(c=>c.status==='active').length,
    Suspended:  CLIENTS.filter(c=>c.status==='suspended').length,
    Discharged: CLIENTS.filter(c=>c.status==='discharged').length,
  };

  const filtered = useMemo(() => CLIENTS.filter(c=>{
    if(search && !c.name.toLowerCase().includes(search.toLowerCase()) && !c.id.toLowerCase().includes(search.toLowerCase())) return false;
    if(zone!=='All' && c.zone!==zone) return false;
    if(stFil!=='All' && c.status!==stFil.toLowerCase()) return false;
    return true;
  }), [search, zone, stFil]);

  return (
    <>
      <div className="ph">
        <div>
          <div className="ph-title">Clients</div>
          <div className="ph-sub">{CLIENTS.length} clients · {counts.Active} active · {counts.Suspended} suspended</div>
        </div>
        <div className="ph-actions">
          <button className="btn btn-g">📊 Client report</button>
          <button className="btn btn-p">+ New referral</button>
        </div>
      </div>
      <div className="fbar">
        <div className="search-wrap">
          <span className="search-ico">🔍</span>
          <input placeholder="Search by name or ID..." value={search} onChange={e=>setSearch(e.target.value)}/>
        </div>
        <select className="sel" value={zone} onChange={e=>setZone(e.target.value)}>
          {zones.map(z=><option key={z}>{z}{z!=='All'?' Zone':''}</option>)}
        </select>
        <div className="stabs">
          {['All','Active','Suspended','Discharged'].map(s=>(
            <button key={s} className={`stab${stFil===s?' on':''}`} onClick={()=>setStFil(s)}>
              {s} <span style={{fontFamily:'var(--fm)',fontSize:10,opacity:.65}}>({counts[s]||0})</span>
            </button>
          ))}
        </div>
      </div>
      <div className="tbl-wrap">
        <table>
          <thead>
            <tr>
              <th>Client</th><th>Zone</th><th>Funder</th><th>Service</th>
              <th>Alerts</th><th>Key worker</th><th>Status</th><th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(c=>{
              const inc = INCIDENTS_DATA.filter(i=>i.clientId===c.id&&i.stage!=='Closed').length;
              const stc = {active:'green',suspended:'amber',discharged:'slate'}[c.status]||'slate';
              return (
                <tr key={c.id} onClick={()=>setSelected(c)}>
                  <td>
                    <div className="client-cell">
                      <div className="cav" style={{background:avCol(c.name),width:32,height:32,fontSize:12}}>{inits(c.name)}</div>
                      <div>
                        <div className="cname">{c.name}</div>
                        <div className="cid">{c.id} · Age {c.age}</div>
                      </div>
                    </div>
                  </td>
                  <td><span className="tag t-navy">{c.zone}</span></td>
                  <td style={{fontSize:'12px',color:'var(--slate)',maxWidth:140,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{c.funder}</td>
                  <td style={{fontSize:'12px',color:'var(--text)'}}>{c.svc}</td>
                  <td>
                    {inc > 0
                      ? <span className="tag t-red">{inc} open</span>
                      : <span style={{fontSize:'11.5px',color:'var(--slate)'}}>—</span>
                    }
                  </td>
                  <td style={{fontSize:'12px',color:'var(--text)'}}>{c.keyworker}</td>
                  <td><span className={`tag t-${stc}`} style={{textTransform:'capitalize'}}>{c.status}</span></td>
                  <td><span className="flink" style={{fontSize:12}}>View</span></td>
                </tr>
              );
            })}
            {filtered.length===0 && (
              <tr><td colSpan="8" style={{textAlign:'center',padding:32,color:'var(--slate)'}}>No clients match the current filters</td></tr>
            )}
          </tbody>
        </table>
      </div>
      {selected && <ClientProfile client={selected} onClose={()=>setSelected(null)}/>}
    </>
  );
};
