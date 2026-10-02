import { useState } from 'react';
import { avCol, inits } from './helpers.jsx';
import { INCIDENTS_DATA } from './mock-data.jsx';
import { TabBodyMaps, TabCarePlan, TabDetails, TabIncidents, TabMAR, TabNotes } from './profile-tabs.jsx';
import { TabForms, TabOverview } from './client-form-tabs.jsx';
import { CS, TabDocuments } from './qr-code-generator.jsx';

// ── CLIENT PROFILE MODAL ──────────────────────────────────────────────────────
const PROFILE_TABS = [
  {id:'overview',   label:'Overview'},
  {id:'forms',      label:'Forms'},
  {id:'details',    label:'Client Details'},
  {id:'tasks',      label:'Tasks'},
  {id:'notes',      label:'Notes'},
  {id:'shifts',     label:'Shifts'},
  {id:'careplan',   label:'Care Planning'},
  {id:'medication', label:'Medication'},
  {id:'incidents',  label:'Incidents'},
  {id:'complaints', label:'Complaints'},
  {id:'bodymaps',   label:'Body Maps'},
  {id:'mca',        label:'Mental Capacity'},
  {id:'contacts',   label:'Contacts'},
  {id:'documents',  label:'Documents'},
];

export const ClientProfile = ({ client, onClose }) => {
  const [tab, setTab] = useState('overview');
  const [formId, setFormId] = useState(null);
  const openForm = id => { setFormId(id); setTab('forms'); };
  const color = avCol(client.name);
  const stCls = {active:'sp-active',suspended:'sp-suspended',discharged:'sp-discharged'}[client.status]||'sp-active';
  const alerts = INCIDENTS_DATA.filter(i=>i.clientId===client.id&&i.stage!=='Closed').length;
  return (
    <div className="prof-overlay" onClick={e=>{ if(e.target===e.currentTarget) onClose(); }}>
      <div className="prof-modal">
        <div className="prof-hd">
          <div className="prof-hd-top">
            <div className="prof-big-av" style={{background:color}}>{inits(client.name)}</div>
            <div style={{flex:1}}>
              <div className="prof-name">{client.name}</div>
              <div className="prof-role-line">
                <span className="prof-role">DOB {client.dob} · Age {client.age} · {client.zone} Zone</span>
                <span className={`status-pill ${stCls}`} style={{textTransform:'capitalize'}}>{client.status}</span>
                {alerts>0 && <span className="status-pill sp-alert">{alerts} open incident{alerts>1?'s':''}</span>}
              </div>
            </div>
            <div className="prof-hd-r">
              <button className="btn btn-g btn-sm" style={{background:'rgba(255,255,255,.08)',border:'1px solid rgba(255,255,255,.12)',color:'rgba(255,255,255,.7)'}}>Add note</button>
              <button className="ph-close" onClick={onClose}>×</button>
            </div>
          </div>
          <div className="prof-meta">
            <div className="prof-meta-item">🪪 <strong>{client.id}</strong></div>
            <div className="prof-meta-item">💊 <strong>{client.svc}</strong></div>
            <div className="prof-meta-item">🏛️ <strong>{client.funder}</strong></div>
            <div className="prof-meta-item">👤 KW: <strong>{client.keyworker}</strong></div>
          </div>
          <div className="prof-tabs">
            {PROFILE_TABS.map(t=>(
              <button key={t.id} className={`ptab${tab===t.id?' on':''}`} onClick={()=>{ setTab(t.id); if(t.id==='forms') setFormId(null); }}>{t.label}</button>
            ))}
          </div>
        </div>
        <div className="prof-body">
          {tab==='overview'   && <TabOverview   c={client} onOpenForm={openForm}/>}
          {tab==='forms'      && <TabForms      c={client} formId={formId} setFormId={setFormId}/>}
          {tab==='details'    && <TabDetails    c={client}/>}
          {tab==='tasks'      && <TabNotes      c={client}/>}
          {tab==='notes'      && <TabNotes      c={client}/>}
          {tab==='careplan'   && <TabCarePlan/>}
          {tab==='medication' && <TabMAR        c={client}/>}
          {tab==='incidents'  && <TabIncidents  c={client}/>}
          {tab==='bodymaps'   && <TabBodyMaps/>}
          {tab==='documents'  && <TabDocuments c={client}/>}
          {tab==='shifts'     && <div className="prof-content"><CS label="Shifts"/></div>}
          {tab==='complaints' && <div className="prof-content"><CS label="Complaints"/></div>}
          {tab==='mca'        && <div className="prof-content"><CS label="Mental Capacity"/></div>}
          {tab==='contacts'   && <div className="prof-content"><CS label="Contacts"/></div>}
        </div>
      </div>
    </div>
  );
};
