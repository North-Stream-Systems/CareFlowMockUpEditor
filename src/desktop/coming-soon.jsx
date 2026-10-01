import { useState } from 'react';
import { Sidebar } from './reusables.jsx';

// ── COMING SOON ───────────────────────────────────────────────────────────────
const CS_SIDEBARS = {
  clients: [
    {items:[{id:'all',ico:'👤',label:'All Clients'},{id:'referrals',ico:'📥',label:'New Referrals',badge:2,badgeColor:'teal'},{id:'suspended',ico:'⏸️',label:'Suspended',badge:1,badgeColor:'amber'}]},
    {label:'Clinical',items:[{id:'incidents',ico:'🚨',label:'Incidents',badge:2,badgeColor:'red'},{id:'complaints',ico:'📣',label:'Complaints',badge:1,badgeColor:'amber'},{id:'medications',ico:'💊',label:'Medications'},{id:'body-maps',ico:'🫀',label:'Body Maps'}]},
  ],
  rostering: [
    {items:[{id:'day',ico:'📅',label:'Day View'},{id:'week',ico:'📆',label:'Week View'},{id:'templates',ico:'🔄',label:'SmartRota Templates'},{id:'rounds',ico:'🔁',label:'Rounds Builder'},{id:'unassigned',ico:'⚠️',label:'Unassigned Visits',badge:3,badgeColor:'red'},{id:'rules',ico:'⚙️',label:'Roster Rules'}]},
  ],
  finance: [
    {items:[{id:'fin',ico:'💰',label:'Finance Dashboard'},{id:'invoices',ico:'📄',label:'Invoices',badge:3,badgeColor:'amber'},{id:'credit',ico:'📋',label:'Credit Notes',badge:1,badgeColor:'red'},{id:'funders',ico:'🏛️',label:'Funders'}]},
    {label:'Payroll',items:[{id:'payroll',ico:'💳',label:'Payroll'},{id:'rates',ico:'⚙️',label:'Pay Rates'}]},
  ],
  reports: [
    {items:[{id:'all-r',ico:'📊',label:'All Reports'}]},
    {label:'Staff',items:[{id:'comp-r',ico:'🛡️',label:'Compliance'},{id:'bf-r',ico:'📈',label:'Bradford Factor'},{id:'abs-r',ico:'🤒',label:'Absence'},{id:'train-r',ico:'🎓',label:'Training Matrix'}]},
    {label:'Clients',items:[{id:'inc-r',ico:'🚨',label:'Incidents'},{id:'comp2-r',ico:'📣',label:'Complaints'},{id:'mar-r',ico:'💊',label:'Medication'}]},
    {label:'Custom',items:[{id:'builder',ico:'🔧',label:'Report Builder'},{id:'saved',ico:'💾',label:'My Saved Reports'},{id:'sched',ico:'📅',label:'Scheduled'}]},
    {divider:true,items:[{id:'insp',ico:'⚡',label:'Inspection Packs'}]},
  ],
};

export const ComingSoon = ({name, sbKey}) => {
  const sbItems = CS_SIDEBARS[sbKey] || [];
  const [sub, setSub] = useState(null);
  return (
    <div className="mod">
      {sbItems.length>0 && <Sidebar items={sbItems} active={sub} setActive={setSub} />}
      <div className="content">
        <div className="cs-wrap">
          <div className="big">🚧</div>
          <h2>{name}</h2>
          <p>This screen is next in the build queue.</p>
        </div>
      </div>
    </div>
  );
};
