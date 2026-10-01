// ── SIDEBAR ───────────────────────────────────────────────────────────────────
const SB_ITEMS = [
  { items:[
    { id:'clients',    ico:'👤', label:'All Clients',    badge:8,  badgeColor:'slate' },
    { id:'referrals',  ico:'📥', label:'New Referrals',  badge:3,  badgeColor:'teal'  },
    { id:'suspended',  ico:'⏸️', label:'Suspended',      badge:1,  badgeColor:'amber' },
    { id:'discharged', ico:'📁', label:'Discharged'                                   },
  ]},
  { label:'Clinical', items:[
    { id:'incidents',  ico:'🚨', label:'Incidents',      badge:2,  badgeColor:'red'   },
    { id:'complaints', ico:'📣', label:'Complaints',     badge:1,  badgeColor:'amber' },
    { id:'medications',ico:'💊', label:'Medications'                                  },
    { id:'body-maps',  ico:'🫀', label:'Body Maps'                                    },
    { id:'mca',        ico:'⚖️', label:'Mental Capacity'                              },
  ]},
];

export const Sidebar = ({ active, setActive }) => (
  <div className="sidebar">
    {SB_ITEMS.map((sec, si) => (
      <div key={si} className="sb-section">
        {sec.label && <div className="sb-label">{sec.label}</div>}
        {(sec.items||[]).map(item => (
          <button key={item.id} className={`sb-item${active===item.id?' on':''}`} onClick={() => setActive(item.id)}>
            <span className="sb-ico">{item.ico}</span>
            <span>{item.label}</span>
            {item.badge != null && <span className={`sb-badge sb-${item.badgeColor||'slate'}`}>{item.badge}</span>}
          </button>
        ))}
      </div>
    ))}
  </div>
);
