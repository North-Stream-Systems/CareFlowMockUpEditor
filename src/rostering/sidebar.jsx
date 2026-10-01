// ── SIDEBAR ──────────────────────────────────────────────────────────────────
const SB_ITEMS = [
  { items:[
    { id:'day',        ico:'📅', label:'Day View',             active:true  },
    { id:'ecm',        ico:'📡', label:'Call Monitoring',      badge:'live', badgeColor:'teal' },
    { id:'week',       ico:'📆', label:'Week View'                          },
    { id:'templates',  ico:'🔄', label:'SmartRota Templates'                },
    { id:'rounds-b',   ico:'🔁', label:'Rounds Builder'                     },
    { id:'unassigned', ico:'⚠️', label:'Unassigned Visits',   badge:3, badgeColor:'red' },
  ]},
  { label:'Configuration', items:[
    { id:'rules',      ico:'⚙️', label:'Roster Rules'                       },
    { id:'colours',    ico:'🎨', label:'Service Colours'                    },
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
