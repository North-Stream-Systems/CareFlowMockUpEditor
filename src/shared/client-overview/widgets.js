// ── WIDGETS & LAYOUT ──────────────────────────────────────────────────────────
// The org has ONE overview layout, applied to every client. A layout is an ordered list of widgets.
// Alerts always render as banners above the grid; everything else flows through a 3-column grid
// where `size` is the column span (1–3).
//
//   { type:'fields',  title, formId, fieldIds[], size }            → chosen fields from a form's latest record
//   { type:'latest',  title, formId, fieldIds[], entries, size }   → most recent entry/entries of a form, with who & when
//   { type:'alert',   title, formId, fieldId, op, value, tone, message } → banner shown only when the rule matches
//   { type:'builtin', builtinId, title, size }                     → live data CareFlow already owns (visits, incidents…)

export const WIDGET_TYPES = [
  { id:'fields',  icon:'🔢', name:'Form fields',       desc:'Pick fields from any form — e.g. key safe, allergies, mobility.' },
  { id:'latest',  icon:'🕘', name:'Latest form entry', desc:'Most recent entry of a form, with who completed it and when.' },
  { id:'alert',   icon:'🚩', name:'Status alert',      desc:'Banner that appears only when a field meets a condition.' },
  { id:'builtin', icon:'⚡', name:'Built-in widget',   desc:'Live CareFlow data — visits, incidents, tasks, MAR.' },
];

export const BUILTIN_WIDGETS = [
  { id:'kpis',      name:'Key numbers',      icon:'📊', defaultSize:3, desc:'Open incidents, complaints, tasks and care hours.' },
  { id:'visits',    name:'Upcoming visits',  icon:'🗓️', defaultSize:1, desc:"Today's scheduled calls from Rostering." },
  { id:'incidents', name:'Open incidents',   icon:'🚨', defaultSize:2, desc:'Incidents not yet closed.' },
  { id:'tasks',     name:'Open tasks',       icon:'✅', defaultSize:1, desc:'Outstanding tasks for this client.' },
  { id:'mar',       name:'Medication (MAR)', icon:'💊', defaultSize:2, desc:'Last 7 days of MAR outcomes.' },
  { id:'notes',     name:'Recent notes',     icon:'📝', defaultSize:2, desc:'Latest care notes from visits.' },
  { id:'service',   name:'Service summary',  icon:'🏛️', defaultSize:1, desc:'Funder, package, hours and key worker.' },
];

export const TONES = [
  { id:'red',   label:'Critical (red)' },
  { id:'amber', label:'Warning (amber)' },
  { id:'teal',  label:'Info (teal)' },
];

let seq = 0;
export const newWidgetId = () => `w${Date.now().toString(36)}${(seq++).toString(36)}`;

// ── Alert rules shared by all templates ──
const A = {
  dnacpr:   { type:'alert', title:'DNACPR',               formId:'medical-summary', fieldId:'dnacpr',      op:'is',           value:'Yes',  tone:'red',   message:'DNACPR in place — do not attempt CPR' },
  allergy:  { type:'alert', title:'Allergies',            formId:'medical-summary', fieldId:'allergies',   op:'not_empty',    value:'',     tone:'red',   message:'Allergies: {value}' },
  overdue:  { type:'alert', title:'Risk review overdue',  formId:'risk-assessment', fieldId:'next_review', op:'before_today', value:'',     tone:'amber', message:'Risk assessment review overdue — was due {value}' },
  noRisk:   { type:'alert', title:'No risk assessment',   formId:'risk-assessment', fieldId:'next_review', op:'empty',        value:'',     tone:'amber', message:'No risk assessment on file' },
  falls:    { type:'alert', title:'High falls risk',      formId:'risk-assessment', fieldId:'falls_risk',  op:'is',           value:'High', tone:'amber', message:'High falls risk — see latest risk assessment' },
};

const W = {
  keyInfo:   { type:'fields',  title:'Key information', formId:'client-details',  fieldIds:['preferred_name','key_safe','access','language'], size:1 },
  medical:   { type:'fields',  title:'Medical summary', formId:'medical-summary', fieldIds:['diagnoses','mobility','communication','diabetic'], size:1 },
  nok:       { type:'fields',  title:'Next of kin',     formId:'next-of-kin',     fieldIds:['nok_name','relationship','nok_phone','lpa_health'], size:1 },
  meds:      { type:'fields',  title:'Medication support', formId:'medication-profile', fieldIds:['support_level','blister','pharmacy'], size:1 },
  risk:      { type:'latest',  title:'Latest risk assessment', formId:'risk-assessment', fieldIds:['falls_risk','waterlow','next_review'], entries:1, size:1 },
  wellbeing: { type:'latest',  title:'Wellbeing (last 3 visits)', formId:'daily-wellbeing', fieldIds:['mood','appetite','fluids'], entries:3, size:2 },
  kpis:      { type:'builtin', builtinId:'kpis',      title:'Key numbers',     size:3 },
  visits:    { type:'builtin', builtinId:'visits',    title:'Upcoming visits', size:1 },
  incidents: { type:'builtin', builtinId:'incidents', title:'Open incidents',  size:2 },
  tasks:     { type:'builtin', builtinId:'tasks',     title:'Open tasks',      size:1 },
  mar:       { type:'builtin', builtinId:'mar',       title:'Medication (MAR)',size:2 },
  notes:     { type:'builtin', builtinId:'notes',     title:'Recent notes',    size:2 },
  service:   { type:'builtin', builtinId:'service',   title:'Service summary', size:1 },
};

const build = items => items.map((w, i) => ({ id:`d${i}`, ...w }));

// Starter layouts offered in the Setup wizard. 'standard' is the default.
export const TEMPLATES = [
  {
    id:'standard', name:'Standard domiciliary', icon:'🏠',
    desc:'Balanced view for most home-care teams: safety alerts, key access info, visits and recent wellbeing.',
    layout: build([A.dnacpr, A.allergy, A.overdue, A.noRisk, A.falls, W.keyInfo, W.visits, W.medical, W.nok, W.risk, W.tasks, W.wellbeing, W.service, W.incidents]),
  },
  {
    id:'clinical', name:'Clinical focus', icon:'🩺',
    desc:'For complex and nursing-led care: medication, risk and incidents up front.',
    layout: build([A.dnacpr, A.allergy, A.overdue, A.noRisk, A.falls, W.kpis, W.medical, W.meds, W.risk, W.mar, W.incidents, W.wellbeing, W.notes]),
  },
  {
    id:'minimal', name:'Minimal', icon:'✨',
    desc:'Just the essentials. A good starting point if you plan to build your own.',
    layout: build([A.dnacpr, A.allergy, W.keyInfo, W.visits, W.nok]),
  },
];

export const DEFAULT_LAYOUT = TEMPLATES[0].layout;
