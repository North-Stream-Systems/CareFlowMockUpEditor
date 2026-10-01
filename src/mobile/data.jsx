// ── DATA ───────────────────────────────────────────────────────────────────────
export const USER = { name:'Emma Williams', initials:'EW', role:'Senior Care Worker', zone:'North', id:'S001' };

export const SVC_COLORS = {
  'Personal Care':'#0D9488','Medication':'#F59E0B',
  'Domestic':'#64748B','Social Support':'#8B5CF6','Complex Care':'#3B82F6',
};

export const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
export const today = new Date();
export const getDate = offset => {
  const d = new Date(today);
  d.setDate(d.getDate() + offset);
  return d;
};

export const SHIFTS = [
  {
    id:'s1', clientId:'c1', client:'Mrs G Williams', addr:'14 Maes y Dref, Conwy LL32 8AA',
    time:'07:30', end:'08:30', dur:60, svc:'Personal Care', status:'completed',
    keyCode:'1234', travel:{ mins:8, miles:2.1 },
    alerts:[
      { type:'red',   text:'Fall risk — non-slip mat in bathroom' },
      { type:'amber', text:'Penicillin allergy on record' },
    ],
    tasks:[
      { id:0, text:'Knock and announce before entering', done:true },
      { id:1, text:'Assisted wash and dress', done:true },
      { id:2, text:'Oral hygiene support', done:true },
      { id:3, text:'Check skin integrity — document any changes', done:true },
      { id:4, text:'Administer morning medications (see MAR)', done:true },
      { id:5, text:'Prepare breakfast — porridge, no sugar', done:true },
      { id:6, text:'Encourage fluid intake — min 200ml', done:true },
      { id:7, text:'Record on MAR chart before leaving', done:true },
    ],
    meds:[ { name:'Amlodipine 5mg', time:'08:00', route:'Oral' }, { name:'Lisinopril 10mg', time:'08:00', route:'Oral' } ],
    emergency:'Bethan Williams (Daughter) 07700 800001',
    notes:'Client in good spirits. Ate all breakfast. No concerns noted.',
    signedInAt:'07:28', signedOutAt:'08:32',
  },
  {
    id:'s2', clientId:'c2', client:'Mr I Lloyd', addr:'6 Ffordd y Mor, Llandudno LL30 2AA',
    time:'09:00', end:'09:45', dur:45, svc:'Medication', status:'current',
    keyCode:'5678', travel:{ mins:14, miles:3.8 },
    alerts:[
      { type:'amber', text:'Client may refuse medication — do not force. Record refusal on MAR.' },
    ],
    tasks:[
      { id:0, text:'Knock and announce before entering', done:true },
      { id:1, text:'Confirm client identity before administering medication', done:false },
      { id:2, text:'Administer morning medications as per MAR', done:false },
      { id:3, text:'Record outcome on MAR chart', done:false },
      { id:4, text:'Check fluid intake — encourage at least one drink', done:false },
      { id:5, text:'General welfare check — report any concerns', done:false },
    ],
    meds:[ { name:'Metformin 500mg', time:'09:00', route:'Oral' }, { name:'Aspirin 75mg', time:'09:00', route:'Oral' }, { name:'Atorvastatin 40mg', time:'09:00', route:'Oral' } ],
    emergency:'Sian Lloyd (Wife) 07700 800002',
    notes:'',
    signedInAt:'09:03', signedOutAt:null,
  },
  {
    id:'s3', clientId:'c3', client:'Mrs H Thomas', addr:'22 Bryn Rd, Conwy LL32 8HH',
    time:'10:30', end:'11:30', dur:60, svc:'Personal Care', status:'upcoming',
    keyCode:'9012', travel:{ mins:11, miles:2.9 },
    coWorker:{ name:'Lisa Roberts', role:'Care Worker', phone:'07700 900123', initials:'LR', color:'#8B5CF6', signedIn:false },
    alerts:[
      { type:'red',   text:'Two-carer call for hoisting — DO NOT hoist alone' },
      { type:'amber', text:'Catheter care required — gloves in bottom kitchen drawer' },
    ],
    tasks:[
      { id:0, text:'Knock and announce before entering', done:false },
      { id:1, text:'Personal care — full wash, gloves required', done:false },
      { id:2, text:'Catheter care and bag check', done:false },
      { id:3, text:'Assisted dressing — client chooses outfit', done:false },
      { id:4, text:'Reposition and pressure area check', done:false },
      { id:5, text:'Prepare light lunch if requested', done:false },
      { id:6, text:'General welfare check', done:false },
    ],
    meds:[],
    emergency:'Dafydd Thomas (Son) 07700 800003',
    notes:'',
    signedInAt:null, signedOutAt:null,
  },
  {
    id:'s4', clientId:'c4', client:'Mr R Jones', addr:'8 Stryd Fawr, Conwy LL32 8BB',
    time:'12:00', end:'12:45', dur:45, svc:'Domestic', status:'upcoming',
    keyCode:'3456', travel:{ mins:6, miles:1.4 },
    alerts:[],
    tasks:[
      { id:0, text:'Knock and announce before entering', done:false },
      { id:1, text:'Hoovering — all downstairs rooms', done:false },
      { id:2, text:'Laundry — load and start machine', done:false },
      { id:3, text:'Kitchen clean — surfaces and floor', done:false },
      { id:4, text:'Check food supplies — report if low', done:false },
      { id:5, text:'General welfare check before leaving', done:false },
    ],
    meds:[],
    emergency:'Carol Jones (Daughter) 07700 800004',
    notes:'',
    signedInAt:null, signedOutAt:null,
  },
];

export const MESSAGES = [
  {
    id:'m1', name:'Cameron D', role:'Care Coordinator', color:'#0D1F3C', online:true,
    unread:2, time:'09:14', preview:'Ok I can cover that, what time do you need me?',
    thread:[
      {id:1,mine:false,body:'Morning Emma, just checking — is Ifan Lloyd still at 10am today?',time:'09:02',type:'user'},
      {id:2,mine:true, body:'Morning! Yes still 10am. His daughter called to say he had a rough night so just be aware.',time:'09:05',type:'user',receipt:'seen'},
      {id:3,mine:false,body:'Thanks for the heads up. Also — any chance you can cover the 14:00 Mrs Roberts call? Sion is off sick.',time:'09:08',type:'user'},
      {id:4,mine:true, body:'Ok I can cover that, what time do you need me?',time:'09:14',type:'user'},
    ],
  },
  {
    id:'m2', name:'CareFlow', role:'System', color:'#0D9488', online:false,
    unread:0, time:'07:30', preview:'Your rota has been updated for w/c 17 March',
    thread:[
      {id:1,mine:false,type:'system',body:'Your rota has been updated for the week commencing 17 March 2026.\n\nMon — Mrs G Williams 07:30, Mr I Lloyd 09:00, Mrs H Thomas 10:30, Mr R Jones 12:00\nTue — Mrs G Williams 07:30, Mr I Lloyd 09:00, Mrs H Thomas 10:30\nWed — Mrs G Williams 07:30, Mrs H Thomas 10:30\nThu — Mr I Lloyd 09:00, Mr R Jones 12:00\nFri — Mr I Lloyd 09:00, Mrs G Williams 07:30',time:'07:30'},
    ],
  },
  {
    id:'m3', name:'North Zone Team', role:'Group · 5 members', color:'#3B82F6', online:false,
    unread:1, time:'08:47', preview:'Sion: Has anyone done the keys handover?',
    thread:[
      {id:1,mine:false,body:'Morning all — calling in sick today. Really sorry.',time:'08:40',type:'user',sender:'Sion P'},
      {id:2,mine:true, body:'Thanks for letting us know Sion, get some rest.',time:'08:44',type:'user',receipt:'seen'},
      {id:3,mine:false,body:'Has anyone done the keys handover yet?',time:'08:47',type:'user',sender:'Sion P'},
    ],
  },
];

export const COMPLIANCE = [
  { name:'DBS Enhanced Check',       exp:'2025-08-14', status:'warning', ico:'🪪' },
  { name:'Manual Handling',          exp:'2026-11-20', status:'ok',      ico:'🎓' },
  { name:'First Aid Certificate',    exp:'2026-02-28', status:'ok',      ico:'🚑' },
  { name:'Right to Work',            exp:null,         status:'ok',      ico:'✅' },
  { name:'Medication Administration',exp:'2026-06-30', status:'ok',      ico:'💊' },
];

export const NOTIFICATIONS = [
  { id:'n1', unread:true,  ico:'📅', bg:'#F0FDFA', title:'Rota updated for w/c 17 March', body:'Your schedule has been updated. 5 shifts confirmed across Mon–Fri.', time:'07:30 today' },
  { id:'n2', unread:true,  ico:'💬', bg:'#EFF6FF', title:'New message from Cameron D',    body:'Any chance you can cover the 14:00 Mrs Roberts call?',           time:'09:08 today' },
  { id:'n3', unread:false, ico:'🛡️', bg:'#FEF2F2', title:'Compliance expiry reminder',    body:'Your DBS Enhanced Check expires in 147 days. Please arrange renewal.', time:'Yesterday' },
  { id:'n4', unread:false, ico:'✅', bg:'#F0FDF4', title:'Leave request approved',         body:'Your annual leave request for 14–18 Apr has been approved by Cameron D.', time:'2 days ago' },
  { id:'n5', unread:false, ico:'📄', bg:'#F5F3FF', title:'Payslip available',              body:'Your payslip for March 2026 is now available to view and download.',   time:'1 Apr' },
  { id:'n6', unread:false, ico:'📋', bg:'#FFFBEB', title:'New policy published',           body:'Safeguarding Policy has been updated. Please read and acknowledge.',    time:'28 Mar' },
];

export const PAYSLIPS = [
  { period:'March 2026',    gross:'£2,091.18', net:'£1,698.45', date:'28 Mar 2026', status:'available' },
  { period:'February 2026', gross:'£1,987.50', net:'£1,614.22', date:'28 Feb 2026', status:'available' },
  { period:'January 2026',  gross:'£2,043.75', net:'£1,655.81', date:'31 Jan 2026', status:'available' },
];

export const compStatus = (s, exp) => {
  if(s==='warning') return { color:'var(--amber)', label: exp ? `Exp ${exp}` : 'Warning' };
  if(s==='critical') return { color:'var(--red)', label: exp ? `Exp ${exp}` : 'Expired' };
  return { color:'var(--green)', label: exp ? `Exp ${exp}` : 'Verified' };
};

const fmt = n => `£${n.toFixed(2)}`;
export const timeToMins = t => { const [h,m]=t.split(':'); return parseInt(h)*60+parseInt(m); };
export const nowMins = () => new Date().getHours()*60 + new Date().getMinutes();
