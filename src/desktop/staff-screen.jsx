import { useMemo, useState } from 'react';
import { avCol, inits } from './helpers.jsx';
import { CANDIDATES, PIPELINE_STAGES, STAFF } from './mock-data.jsx';
import { Sidebar } from './reusables.jsx';
import { StaffProfile } from './staff-profile-tabs.jsx';
import { STAFF_SB } from './sidebar-configs.jsx';
import { AbsencePage, BroadcastPage, CompliancePage, LeavePage } from './staff-sub-pages.jsx';

// ── STAFF SCREEN ─────────────────────────────────────────────────────────────
export const StaffScreen = () => {
  const [sub,    setSub]    = useState('staff-list');
  const [search, setSearch] = useState('');
  const [zone,   setZone]   = useState('All');
  const [role,   setRole]   = useState('All');
  const [stFil,  setStFil]  = useState('All');
  const [selected,setSelected] = useState(null);

  const zones = ['All', ...[...new Set(STAFF.map(s => s.zone))]];
  const roles = ['All', ...[...new Set(STAFF.map(s => s.role))]];

  const filtered = useMemo(() => STAFF.filter(s => {
    if(search && !s.name.toLowerCase().includes(search.toLowerCase()) && !s.id.toLowerCase().includes(search.toLowerCase())) return false;
    if(zone !== 'All' && s.zone !== zone) return false;
    if(role !== 'All' && s.role !== role) return false;
    if(stFil !== 'All' && s.status !== stFil.toLowerCase()) return false;
    return true;
  }), [search, zone, role, stFil]);

  const counts = {
    All: STAFF.length,
    Active: STAFF.filter(s => s.status==='active').length,
    Onboarding: STAFF.filter(s => s.status==='onboarding').length,
  };

  const showList = ['staff-list','candidates','onboarding','training','timesheets','doc-templates'].includes(sub);

  return (
    <div className="mod">
      <Sidebar items={STAFF_SB} active={sub} setActive={setSub} />
      <div className="content">
        {sub==='leave'      && <LeavePage />}
        {sub==='absence'    && <AbsencePage />}
        {sub==='compliance' && <CompliancePage />}
        {sub==='broadcast'  && <BroadcastPage />}
        {showList && (
          <>
            <div className="ph">
              <div>
                <div className="ph-title">{sub==='candidates'?'Candidates':sub==='onboarding'?'Onboarding':'Staff'}</div>
                <div className="ph-sub">{STAFF.length} staff · {counts.Active} active · {counts.Onboarding} onboarding</div>
              </div>
              <div className="ph-actions">
                <button className="btn btn-g">Compliance report</button>
                <button className="btn btn-p">+ New candidate</button>
              </div>
            </div>
            <div className="fbar">
              <div className="search-wrap">
                <span className="search-ico">🔍</span>
                <input placeholder="Search by name or ID..." value={search} onChange={e => setSearch(e.target.value)} />
              </div>
              <select className="sel" value={zone} onChange={e => setZone(e.target.value)}>
                {zones.map(z => <option key={z}>{z}{z!=='All'?' Zone':''}</option>)}
              </select>
              <select className="sel" value={role} onChange={e => setRole(e.target.value)}>
                {roles.map(r => <option key={r}>{r}</option>)}
              </select>
              <div className="stabs">
                {['All','Active','Onboarding'].map(s => (
                  <button key={s} className={`stab${stFil===s?' on':''}`} onClick={() => setStFil(s)}>
                    {s} <span style={{fontFamily:'var(--fm)',fontSize:10,opacity:.65}}>({counts[s]})</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="tbl-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Staff member</th><th>Zone</th><th>Contract</th>
                    <th>Compliance</th><th>Bradford</th><th>Status</th><th></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(s => {
                    const crit = s.comp.filter(c => c.s==='critical').length;
                    const warn = s.comp.filter(c => c.s==='warning').length;
                    const ok   = s.comp.filter(c => c.s==='ok').length;
                    const pend = s.comp.filter(c => c.s==='pending').length;
                    const bfc  = s.bf>200?'red':s.bf>100?'amber':s.bf>50?'teal':'slate';
                    const stc  = {active:'green',onboarding:'amber'}[s.status]||'slate';
                    return (
                      <tr key={s.id} onClick={() => setSelected(s)}>
                        <td>
                          <div className="staff-cell">
                            <div className="av" style={{background:avCol(s.name),width:32,height:32,fontSize:12}}>{inits(s.name)}</div>
                            <div>
                              <div className="sname">{s.name}</div>
                              <div className="sid">{s.id} · {s.role}</div>
                            </div>
                          </div>
                        </td>
                        <td><span className="tag t-navy">{s.zone}</span></td>
                        <td>
                          <div style={{fontSize:'12.5px',color:'var(--text)'}}>{s.contract}</div>
                          <div style={{fontFamily:'var(--fm)',fontSize:'10.5px',color:'var(--slate)'}}>{s.hrs?`${s.hrs}h/wk`:'Variable'}</div>
                        </td>
                        <td>
                          <div className="pips">
                            {[...Array(crit)].map((_,i) => <div key={`c${i}`} className="pip" style={{background:'var(--red)'}} />)}
                            {[...Array(warn)].map((_,i) => <div key={`w${i}`} className="pip" style={{background:'var(--amber)'}} />)}
                            {[...Array(pend)].map((_,i) => <div key={`p${i}`} className="pip" style={{background:'var(--slate)',opacity:.3}} />)}
                            {[...Array(Math.min(ok,4))].map((_,i) => <div key={`o${i}`} className="pip" style={{background:'var(--green)'}} />)}
                          </div>
                          {crit>0 && <div style={{fontSize:10,color:'var(--red)',marginTop:3,fontWeight:600}}>{crit} critical</div>}
                        </td>
                        <td>
                          <div className="bf-val" style={{color:`var(--${bfc})`}}>{s.bf}</div>
                          <span className={`tag t-${bfc}`} style={{marginTop:3,fontSize:9,textTransform:'capitalize'}}>{s.bfst==='ok'?'OK':s.bfst}</span>
                        </td>
                        <td><span className={`tag t-${stc}`} style={{textTransform:'capitalize'}}>{s.status}</span></td>
                        <td><span className="flink" style={{fontSize:12}}>View</span></td>
                      </tr>
                    );
                  })}
                  {filtered.length===0 && (
                    <tr><td colSpan="7" style={{textAlign:'center',padding:32,color:'var(--slate)'}}>No staff match the current filters</td></tr>
                  )}
                </tbody>
              </table>
            </div>
            <div style={{marginTop:20}}>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:12}}>
                <div style={{fontFamily:'var(--fh)',fontSize:14,fontWeight:700,color:'var(--navy)'}}>Candidate Pipeline</div>
                <button className="btn btn-g btn-sm" onClick={() => setSub('candidates')}>View full pipeline</button>
              </div>
              <div className="pipeline-row">
                {PIPELINE_STAGES.map(stage => {
                  const cards = CANDIDATES.filter(c => c.stage===stage);
                  return (
                    <div key={stage} className="pcol">
                      <div className="pcol-title">{stage}<span className="p-count">{cards.length}</span></div>
                      {cards.map(c => (
                        <div key={c.id} className="pcard">
                          <div className="pcard-name">{c.name}</div>
                          <div className="pcard-sub">{c.id}</div>
                          <div className="pcard-days">{c.days}d in stage</div>
                        </div>
                      ))}
                      {cards.length===0 && (
                        <div style={{height:52,border:'1px dashed var(--border)',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,color:'var(--slate)'}} />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
      {selected && <StaffProfile staff={selected} onClose={() => setSelected(null)} />}
    </div>
  );
};
