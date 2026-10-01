// ── MOCK DATA ───────────────────────────────────────────────────────────────
export const STAFF = [
  { id:'S001', name:'Emma Williams',  role:'Senior Care Worker', zone:'North',   status:'active',     contract:'Full-time', hrs:37.5, bf:186, bfst:'formal',       dbs:'2025-08-14', phone:'07700900001', email:'e.williams@abercare.co.uk', start:'2021-03-15', address:'14 Maes y Dref, Conwy LL32 8AA',        nok:'Jane Williams (Sister) 07700900011', comp:[{n:'DBS Enhanced',c:'DBS',exp:'2025-08-14',s:'warning'},{n:'Manual Handling',c:'Training',exp:'2026-11-20',s:'ok'},{n:'First Aid',c:'Training',exp:'2026-02-28',s:'ok'},{n:'Right to Work',c:'RTW',exp:null,s:'ok'}] },
  { id:'S002', name:'Sion Parry',     role:'Care Worker',        zone:'North',   status:'active',     contract:'Full-time', hrs:37.5, bf:324, bfst:'disciplinary',  dbs:'2026-01-20', phone:'07700900002', email:'s.parry@abercare.co.uk',    start:'2020-07-01', address:'6 Ffordd y Llan, Llandudno LL30 2UT',   nok:'Mair Parry (Wife) 07700900012',      comp:[{n:'DBS Enhanced',c:'DBS',exp:'2026-01-20',s:'ok'},{n:'Manual Handling',c:'Training',exp:'2026-05-10',s:'ok'},{n:'Medication Admin',c:'Training',exp:'2025-12-01',s:'critical'},{n:'First Aid',c:'Training',exp:'2025-09-15',s:'critical'}] },
  { id:'S003', name:'Lisa Roberts',   role:'Care Worker',        zone:'Central', status:'active',     contract:'Part-time', hrs:22.5, bf:142, bfst:'first',         dbs:'2026-04-10', phone:'07700900003', email:'l.roberts@abercare.co.uk',  start:'2022-01-10', address:'29 Rhodfar Mor, Colwyn Bay LL29 7AH',   nok:'David Roberts (Husband) 07700900013', comp:[{n:'DBS Enhanced',c:'DBS',exp:'2026-04-10',s:'ok'},{n:'Manual Handling',c:'Training',exp:'2025-10-03',s:'critical'},{n:'First Aid',c:'Training',exp:'2026-08-19',s:'ok'},{n:'Right to Work',c:'RTW',exp:null,s:'ok'}] },
  { id:'S004', name:'Rebecca Evans',  role:'Senior Care Worker', zone:'South',   status:'active',     contract:'Full-time', hrs:37.5, bf:48,  bfst:'ok',            dbs:'2027-02-28', phone:'07700900004', email:'r.evans@abercare.co.uk',    start:'2019-05-20', address:'3 Heol y Bryn, Abergele LL22 7RN',      nok:'Tom Evans (Partner) 07700900014',    comp:[{n:'DBS Enhanced',c:'DBS',exp:'2027-02-28',s:'ok'},{n:'Manual Handling',c:'Training',exp:'2026-09-12',s:'ok'},{n:'First Aid',c:'Training',exp:'2026-01-07',s:'warning'},{n:'Medication Admin',c:'Training',exp:'2026-06-30',s:'ok'}] },
  { id:'S005', name:'Thomas Hughes',  role:'Care Worker',        zone:'North',   status:'onboarding', contract:'Full-time', hrs:37.5, bf:0,   bfst:'ok',            dbs:'2026-06-01', phone:'07700900005', email:'t.hughes@abercare.co.uk',   start:'2026-02-01', address:'51 Lon y Dwr, Llandudno LL30 1SQ',      nok:'Ann Hughes (Mother) 07700900015',    comp:[{n:'DBS Enhanced',c:'DBS',exp:'2026-06-01',s:'ok'},{n:'Manual Handling',c:'Training',exp:null,s:'pending'},{n:'First Aid',c:'Training',exp:null,s:'pending'},{n:'Right to Work',c:'RTW',exp:null,s:'ok'}] },
  { id:'S006', name:'Catrin Owen',    role:'Care Worker',        zone:'Central', status:'active',     contract:'Zero-hours',hrs:null, bf:95,  bfst:'info',          dbs:'2026-09-15', phone:'07700900006', email:'c.owen@abercare.co.uk',     start:'2023-03-08', address:'17 Stryd Fawr, Bodelwyddan LL18 5UW',   nok:'Rhys Owen (Brother) 07700900016',    comp:[{n:'DBS Enhanced',c:'DBS',exp:'2026-09-15',s:'ok'},{n:'Manual Handling',c:'Training',exp:'2026-12-20',s:'ok'},{n:'First Aid',c:'Training',exp:'2026-10-04',s:'ok'},{n:'Right to Work',c:'RTW',exp:'2026-05-12',s:'warning'}] },
  { id:'S007', name:'Michael Davies', role:'Care Worker',        zone:'South',   status:'active',     contract:'Full-time', hrs:37.5, bf:62,  bfst:'ok',            dbs:'2025-09-01', phone:'07700900007', email:'m.davies@abercare.co.uk',   start:'2022-08-22', address:'8 Bryn Awel, Rhyl LL18 2YP',            nok:'Sarah Davies (Wife) 07700900017',    comp:[{n:'DBS Enhanced',c:'DBS',exp:'2025-09-01',s:'warning'},{n:'Manual Handling',c:'Training',exp:'2026-07-14',s:'ok'},{n:'First Aid',c:'Training',exp:'2026-04-30',s:'ok'},{n:'Right to Work',c:'RTW',exp:null,s:'ok'}] },
  { id:'S008', name:'Amy Hughes',     role:'Care Worker',        zone:'South',   status:'active',     contract:'Part-time', hrs:22.5, bf:22,  bfst:'ok',            dbs:'2026-11-30', phone:'07700900008', email:'a.hughes@abercare.co.uk',   start:'2024-01-15', address:'22 Ffordd Derwen, Prestatyn LL19 9BH',  nok:'Paul Hughes (Father) 07700900018',   comp:[{n:'DBS Enhanced',c:'DBS',exp:'2026-11-30',s:'ok'},{n:'Manual Handling',c:'Training',exp:'2026-11-14',s:'ok'},{n:'First Aid',c:'Training',exp:'2026-08-02',s:'ok'},{n:'Right to Work',c:'RTW',exp:null,s:'ok'}] },
];

export const CANDIDATES = [
  {id:'C001',name:'Priya Sharma',  days:5,  stage:'Application Review'},
  {id:'C002',name:'Jack Watkins',  days:12, stage:'DBS Submitted'},
  {id:'C003',name:'Ffion James',   days:3,  stage:'Interview Scheduled'},
  {id:'C004',name:'Liam Bowen',    days:8,  stage:'References Pending'},
  {id:'C005',name:'Sian Griffiths',days:21, stage:'Offer Sent'},
];
export const PIPELINE_STAGES = ['Application Review','Interview Scheduled','DBS Submitted','References Pending','Offer Sent'];

export const LEAVE_REQS = [
  {id:1,name:'Emma Williams', type:'Annual Leave',from:'21 Mar',to:'25 Mar',days:5,reason:'Family holiday',     submitted:'10 Mar',status:'pending'},
  {id:2,name:'Catrin Owen',   type:'Annual Leave',from:'28 Mar',to:'28 Mar',days:1,reason:'Appointment',        submitted:'11 Mar',status:'pending'},
  {id:3,name:'Amy Hughes',    type:'Sick Leave',  from:'13 Mar',to:'13 Mar',days:1,reason:'Unwell',             submitted:'13 Mar',status:'pending'},
  {id:4,name:'Rebecca Evans', type:'Annual Leave',from:'14 Apr',to:'18 Apr',days:5,reason:'Pre-booked holiday', submitted:'1 Mar', status:'approved'},
  {id:5,name:'Michael Davies',type:'Annual Leave',from:'7 Apr', to:'7 Apr', days:1,reason:'Personal',           submitted:'9 Mar', status:'declined'},
];

export const ABSENT_TODAY = [
  {id:1,name:'Sion Parry',  role:'Care Worker',type:'Sick Leave',  rounds:2},
  {id:2,name:'Amy Hughes',  role:'Care Worker',type:'Annual Leave',rounds:1},
];

// Dashboard data
export const UNASSIGNED = [
  {id:1,client:'Mrs Gwen Williams',time:'08:30',dur:60,zone:'North',  svc:'Personal Care',d:0},
  {id:2,client:'Mr Ifan Lloyd',    time:'09:00',dur:45,zone:'North',  svc:'Medication',   d:0},
  {id:3,client:'Mrs Mair Roberts', time:'14:00',dur:60,zone:'Central',svc:'Personal Care',d:1},
  {id:4,client:'Mr Dewi Evans',    time:'07:30',dur:30,zone:'South',  svc:'Domestic',     d:2},
  {id:5,client:'Miss Bethan Rees', time:'10:00',dur:60,zone:'Central',svc:'Personal Care',d:-1},
  {id:6,client:'Mr Arthur Hughes', time:'16:00',dur:45,zone:'North',  svc:'Social Support',d:-1},
];
export const COMPLIANCE_W = [
  {id:1,staff:'Michael Davies',item:'DBS Enhanced Check',       days:12, sev:'warning'},
  {id:2,staff:'Lisa Roberts',  item:'Manual Handling Training', days:-3, sev:'critical'},
  {id:3,staff:'Rebecca Evans', item:'First Aid Certificate',    days:8,  sev:'warning'},
  {id:4,staff:'Emma Williams', item:'Medication Administration',days:-8, sev:'critical'},
  {id:5,staff:'Thomas Hughes', item:'Right to Work',            days:28, sev:'info'},
  {id:6,staff:'Catrin Owen',   item:'Moving and Handling',      days:42, sev:'info'},
];
export const ROUNDS = [
  {id:1,name:'Monday AM North',  carer:'Emma Williams',visits:4,status:'assigned'},
  {id:2,name:'Monday AM South',  carer:null,           visits:3,status:'unassigned'},
  {id:3,name:'Monday PM Central',carer:'Lisa Roberts', visits:5,status:'assigned'},
  {id:4,name:'Evening Run 1',    carer:'Rebecca Evans',visits:4,status:'partial'},
];
export const TASKS = [
  {id:1,title:'Complete supervision - Sion Parry',  module:'Staff',  d:-2,pri:'high'},
  {id:2,title:'Review care plan - Mr Ifan Lloyd',   module:'Clients',d:0, pri:'high'},
  {id:3,title:'Return call - Williams family',       module:'Clients',d:0, pri:'medium'},
  {id:4,title:'Submit weekly staffing report',       module:'Reports',d:1, pri:'medium'},
  {id:5,title:'Update risk assessment - Mr D Evans', module:'Clients',d:3, pri:'low'},
];
export const INCIDENTS = [
  {id:1,client:'Mrs Gwen Williams',type:'Fall',             sev:'moderate',open:3,stage:'Under Investigation'},
  {id:2,client:'Mr Arthur Hughes', type:'Medication Refusal',sev:'minor',  open:1,stage:'Initial Report'},
];
export const BRADFORD = [
  {id:1,name:'Sion Parry',  role:'Care Worker',score:324,status:'disciplinary',max:450},
  {id:2,name:'Lisa Roberts',role:'Care Worker',score:186,status:'formal',      max:450},
  {id:3,name:'Catrin Owen', role:'Care Worker',score:142,status:'first',       max:450},
];
export const COVERAGE = [
  {day:'Mon',pct:100},{day:'Tue',pct:100},{day:'Wed',pct:87},
  {day:'Thu',pct:100},{day:'Fri',pct:95},{day:'Sat',pct:67},{day:'Sun',pct:50},
];

export const REGISTRY = [
  {id:'unassigned', icon:'🗓️',name:'Unassigned Visits',      src:'Rostering',        col:7,cat:'Rostering',arrow:true},
  {id:'absent',     icon:'👥',name:'Staff Absent Today',      src:'Staff / Rostering',col:5,cat:'Rostering',arrow:false},
  {id:'compliance', icon:'🛡️',name:'Compliance Alerts',       src:'Staff',            col:4,cat:'Staff',    arrow:true},
  {id:'rounds',     icon:'🔁',name:'Rounds Status',           src:'Rostering',        col:4,cat:'Rostering',arrow:false},
  {id:'tasks',      icon:'✅',name:'My Tasks',                src:'All modules',      col:4,cat:'Tasks',    arrow:true},
  {id:'incidents',  icon:'🚨',name:'Open Incidents',          src:'Clients',          col:4,cat:'Clients',  arrow:false},
  {id:'bradford',   icon:'📈',name:'Bradford Factor Watch',   src:'Staff',            col:4,cat:'Staff',    arrow:false},
  {id:'coverage',   icon:'📊',name:'Rota Coverage',           src:'Rostering',        col:4,cat:'Rostering',arrow:false},
  {id:'flagged',    icon:'🚩',name:'Flagged Notes',           src:'Clients / Staff',  col:5,cat:'Tasks',    arrow:false},
  {id:'ecmlive',    icon:'📡',name:'Call Monitoring (Live)',  src:'Rostering / ECM',  col:7,cat:'Rostering',arrow:false},
  {id:'onshift',    icon:'🟢',name:'On Shift Now',            src:'Rostering',        col:5,cat:'Rostering',arrow:false},
  {id:'revenue',    icon:'💷',name:'Revenue Today',           src:'Finance',          col:4,cat:'Finance',  arrow:false},
  {id:'outlook',    icon:'📅',name:'Outlook Calendar',        src:'Microsoft 365',    col:5,cat:'Integrations',arrow:false},
  {id:'google',     icon:'📆',name:'Google Calendar',         src:'Google Workspace', col:5,cat:'Integrations',arrow:false},
];
export const DEFAULT_WIDGETS = ['flagged','ecmlive','unassigned','absent','onshift','compliance','rounds','tasks','incidents','revenue'];
const LS_KEY = 'cf_dash_v1';
export const lsLoad = () => { try { return JSON.parse(localStorage.getItem(LS_KEY))||{}; } catch { return {}; } };
export const lsSave = s => localStorage.setItem(LS_KEY, JSON.stringify(s));

export const MSG_THREADS = [
  {id:'t1',type:'direct',   name:'Emma Williams',         initials:'EW',color:'#0D9488',role:'Senior Care Worker',online:true, unread:2,time:'09:14',preview:'Ok I can cover that, what time?',muted:false},
  {id:'t2',type:'group',    name:'North Zone Team',        initials:'N', color:'#0D1F3C',members:5,             online:false,unread:1,time:'08:47',preview:'Sion: Has anyone done the keys handover?',muted:false},
  {id:'t3',type:'direct',   name:'Lisa Roberts',           initials:'LR',color:'#8B5CF6',role:'Care Worker',    online:false,unread:0,time:'Yesterday',preview:'Thanks for letting me know',muted:false},
  {id:'t4',type:'broadcast',name:'All Staff - Rota Update',initials:'📢',color:'#8B5CF6',role:'System broadcast',online:false,unread:0,time:'Mon',preview:'Your rota has been updated for w/c 17 March',muted:false},
  {id:'t5',type:'direct',   name:'Rebecca Evans',          initials:'RE',color:'#3B82F6',role:'Senior Care Worker',online:true,unread:0,time:'Mon',preview:'Will do, see you tomorrow',muted:false},
  {id:'t6',type:'group',    name:'Weekend Cover',          initials:'W', color:'#F59E0B',members:4,             online:false,unread:0,time:'Sat',preview:'You: Thanks everyone, great job this weekend',muted:true},
];
export const MSG_DATA = {
  t1:[
    {id:1,sender:'EW',name:'Emma Williams',mine:false,time:'09:02',body:'Morning Cameron, just checking - is the Ifan Lloyd call still at 10am today or has it moved?',type:'user'},
    {id:2,sender:'CD',name:'Cameron D',    mine:true, time:'09:05',body:'Morning Emma! Yes still 10am. His daughter called to say he had a rough night so just be prepared for that.',type:'user'},
    {id:3,sender:'EW',name:'Emma Williams',mine:false,time:'09:06',body:'Noted, thanks for the heads up. Will take extra time if needed.',type:'user',receipt:'seen'},
    {id:4,sender:'CD',name:'Cameron D',    mine:true, time:'09:08',body:'Also - any chance you could cover the 14:00 call with Mrs Roberts? Sion called in sick this morning.',type:'user',receipt:'seen'},
    {id:5,sender:'EW',name:'Emma Williams',mine:false,time:'09:14',body:'Ok I can cover that, what time do you need me?',type:'user'},
  ],
  t2:[
    {id:1,sender:'SYS',name:'CareFlow',mine:false,time:'07:30',body:'Rota update: Your shifts for Monday 13 March have been confirmed. Check your schedule for details.',type:'system'},
    {id:2,sender:'SP', name:'Sion Parry',    mine:false,time:'08:40',body:'Morning all - calling in sick today. Really sorry for the short notice.',type:'user'},
    {id:3,sender:'EW', name:'Emma Williams', mine:false,time:'08:42',body:'Hope you feel better soon Sion',type:'user'},
    {id:4,sender:'CD', name:'Cameron D',     mine:true, time:'08:44',body:'Thanks for letting us know Sion, get some rest. I will sort cover.',type:'user',receipt:'seen'},
    {id:5,sender:'SP', name:'Sion Parry',    mine:false,time:'08:47',body:'Has anyone done the keys handover yet?',type:'user'},
  ],
  t4:[
    {id:1,sender:'SYS',name:'CareFlow',mine:false,time:'Mon 16:30',body:'Your rota has been updated for the week commencing 17 March 2026.\n\nMon 17 Mar - Mrs Gwen Williams, 08:30-09:30 (Personal Care)\nTue 18 Mar - Mr Ifan Lloyd, 10:00-10:45 (Medication)\nWed 19 Mar - Mrs Mair Roberts, 14:00-15:00 (Personal Care)\nThu 20 Mar - Miss Bethan Rees, 09:00-10:00 (Personal Care)',type:'system'},
  ],
};
