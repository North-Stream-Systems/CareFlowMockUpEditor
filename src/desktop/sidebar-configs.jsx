// ── SIDEBAR CONFIGS ─────────────────────────────────────────────────────────
export const STAFF_SB = [
  {items:[
    {id:'staff-list',  ico:'👥', label:'All Staff',          badge:8, badgeColor:'slate'},
    {id:'candidates',  ico:'🚪', label:'Candidates',         badge:5, badgeColor:'teal'},
    {id:'onboarding',  ico:'✅', label:'Onboarding',         badge:1, badgeColor:'amber'},
  ]},
  {label:'Time and Attendance',items:[
    {id:'leave',       ico:'🏖️', label:'Leave Requests',     badge:3, badgeColor:'amber'},
    {id:'absence',     ico:'🤒', label:'Absence',            badge:2, badgeColor:'red'},
    {id:'timesheets',  ico:'⏱️', label:'Timesheets'},
  ]},
  {label:'Compliance',items:[
    {id:'compliance',  ico:'🛡️', label:'Compliance',         badge:4, badgeColor:'red'},
    {id:'training',    ico:'🎓', label:'Training'},
  ]},
  {label:'Communications',items:[
    {id:'broadcast',   ico:'📢', label:'Broadcast'},
    {id:'doc-templates',ico:'📂',label:'Document Templates'},
  ]},
];

export const DASH_SB = [
  {items:[{id:'dashboard',ico:'🏠',label:'My Dashboard'}]},
  {label:'Quick Access',items:[
    {id:'tasks',       ico:'✅', label:'My Tasks',  badge:5, badgeColor:'red'},
    {id:'notifs',      ico:'🔔', label:'Notifications',badge:3,badgeColor:'amber'},
  ]},
];
