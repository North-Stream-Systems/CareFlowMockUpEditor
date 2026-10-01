// ── SIDEBAR ───────────────────────────────────────────────────────────────────
const SB_ITEMS = [
  { items:[
    { id:'dashboard',   ico:'💰', label:'Finance Dashboard' },
    { id:'invoices',    ico:'📄', label:'Invoices',         badge:2, badgeColor:'amber' },
    { id:'credit',      ico:'📋', label:'Credit Notes',     badge:1, badgeColor:'red'   },
    { id:'funders',     ico:'🏛️', label:'Funders'                                       },
  ]},
  { label:'Rate Sheets', items:[
    { id:'billing-sheets', ico:'💷', label:'Billing Rate Sheets', badge:4, badgeColor:'slate' },
    { id:'pay-sheets',     ico:'💳', label:'Pay Rate Sheets',     badge:3, badgeColor:'slate' },
  ]},
  { label:'Payroll', items:[
    { id:'payroll',     ico:'🗂️', label:'Payroll',          badge:'!', badgeColor:'teal' },
    { id:'rates',       ico:'⚙️', label:'Pay Rates'                                      },
  ]},
  { label:'Settings', items:[
    { id:'fin-settings', ico:'🔧', label:'Finance Settings' },
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
