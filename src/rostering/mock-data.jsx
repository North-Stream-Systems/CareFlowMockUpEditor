import { START_HOUR, TOTAL_HOURS } from './constants.jsx';

// ── MOCK DATA ─────────────────────────────────────────────────────────────────
export const ROUNDS_DATA = [
  { id:'r1', name:'Monday AM North',   carer:'Emma Williams',  carerColor:'#0D9488', status:'assigned',   zone:'North'   },
  { id:'r2', name:'Monday AM South',   carer:null,             carerColor:null,       status:'unassigned', zone:'South'   },
  { id:'r3', name:'Monday PM Central', carer:'Lisa Roberts',   carerColor:'#8B5CF6', status:'assigned',   zone:'Central' },
  { id:'r4', name:'Evening Run 1',     carer:'Rebecca Evans',  carerColor:'#3B82F6', status:'partial',    zone:'North'   },
];

export const INIT_SHIFTS = [
  // Round 1 - Emma / Monday AM North
  { id:'s1',  roundId:'r1', staffId:'e1', clientId:'c1', client:'Mrs G Williams',  start:'07:30', end:'08:30', svc:'Personal Care',  status:'confirmed', notes:'Key safe 1234' },
  { id:'s2',  roundId:'r1', staffId:'e1', clientId:'c2', client:'Mr I Lloyd',      start:'09:00', end:'09:45', svc:'Medication',     status:'confirmed', notes:'Morning meds only' },
  { id:'s3',  roundId:'r1', staffId:'e1', clientId:'c3', client:'Mrs H Thomas',    start:'10:15', end:'11:15', svc:'Personal Care',  status:'confirmed', notes:'', twoHanded:true, secondStaffId:'e2', twoHandedRule:'both', twoHandedQual:'Moving and Handling (Hoist)' },
  { id:'s4',  roundId:'r1', staffId:'e1', clientId:'c4', client:'Mr R Jones',      start:'11:45', end:'12:30', svc:'Domestic',       status:'confirmed', notes:'Hoovering and laundry' },
  // Round 2 - Unassigned / Monday AM South
  { id:'s5',  roundId:'r2', staffId:null, clientId:'c5', client:'Miss B Rees',     start:'08:00', end:'09:00', svc:'Personal Care',  status:'unassigned', notes:'' },
  { id:'s6',  roundId:'r2', staffId:null, clientId:'c6', client:'Mr D Evans',      start:'09:30', end:'10:00', svc:'Domestic',       status:'unassigned', notes:'' },
  { id:'s7',  roundId:'r2', staffId:null, clientId:'c7', client:'Mrs N Williams',  start:'10:30', end:'11:30', svc:'Personal Care',  status:'unassigned', notes:'', twoHanded:true, secondStaffId:null, twoHandedRule:'one', twoHandedQual:'Manual Handling' },
  // Round 3 - Lisa / Monday PM Central
  { id:'s8',  roundId:'r3', staffId:'e3', clientId:'c8', client:'Mrs M Roberts',   start:'13:00', end:'14:00', svc:'Personal Care',  status:'confirmed', notes:'' },
  { id:'s9',  roundId:'r3', staffId:'e3', clientId:'c9', client:'Mr A Hughes',     start:'14:30', end:'15:15', svc:'Medication',     status:'confirmed', notes:'Evening meds' },
  { id:'s10', roundId:'r3', staffId:'e3', clientId:'c10',client:'Mrs P Davies',    start:'15:45', end:'16:45', svc:'Personal Care',  status:'confirmed', notes:'' },
  { id:'s11', roundId:'r3', staffId:'e3', clientId:'c11',client:'Mr G Owen',       start:'17:00', end:'17:45', svc:'Social Support', status:'confirmed', notes:'Trip to shops' },
  { id:'s12', roundId:'r3', staffId:'e3', clientId:'c12',client:'Mrs J Morris',    start:'18:00', end:'19:00', svc:'Personal Care',  status:'confirmed', notes:'' },
  // Round 4 - Rebecca / Evening Run 1
  { id:'s13', roundId:'r4', staffId:'e4', clientId:'c1', client:'Mrs G Williams',  start:'18:30', end:'19:30', svc:'Personal Care',  status:'confirmed', notes:'Evening routine', twoHanded:true, secondStaffId:'e2', twoHandedRule:'one', twoHandedQual:'Complex Care' },
  { id:'s14', roundId:'r4', staffId:'e4', clientId:'c13',client:'Mr D Parry',      start:'19:45', end:'20:30', svc:'Medication',     status:'confirmed', notes:'' },
  { id:'s15', roundId:'r4', staffId:'e4', clientId:'c14',client:'Mrs A Jones',     start:'20:45', end:'21:30', svc:'Personal Care',  status:'confirmed', notes:'' },
  { id:'s16', roundId:'r4', staffId:'e4', clientId:'c15',client:'Mr T Evans',      start:'21:45', end:'22:15', svc:'Domestic',       status:'confirmed', notes:'' },
];

export const STAFF_ROWS_DATA = [
  { id:'e1', name:'Emma Williams',  role:'Senior Care Worker', zone:'North',   color:'#0D9488' },
  { id:'e3', name:'Lisa Roberts',   role:'Care Worker',        zone:'Central', color:'#8B5CF6' },
  { id:'e4', name:'Rebecca Evans',  role:'Senior Care Worker', zone:'South',   color:'#3B82F6' },
  { id:'e2', name:'Sion Parry',     role:'Care Worker',        zone:'North',   color:'#F59E0B' },
];

export const CLIENT_ROWS_DATA = [
  { id:'c1',  name:'Mrs G Williams',  zone:'North',  svc:'Personal Care' },
  { id:'c2',  name:'Mr I Lloyd',      zone:'North',  svc:'Medication'    },
  { id:'c5',  name:'Miss B Rees',     zone:'South',  svc:'Personal Care' },
  { id:'c8',  name:'Mrs M Roberts',   zone:'Central',svc:'Personal Care' },
  { id:'c9',  name:'Mr A Hughes',     zone:'Central',svc:'Medication'    },
  { id:'c13', name:'Mr D Parry',      zone:'North',  svc:'Medication'    },
];

export const UNASSIGNED_VISITS = [
  { id:'u1', client:'Miss B Rees',    zone:'South',  svc:'Personal Care', time:'08:00-09:00' },
  { id:'u2', client:'Mr D Evans',     zone:'South',  svc:'Domestic',      time:'09:30-10:00' },
  { id:'u3', client:'Mrs N Williams', zone:'South',  svc:'Personal Care', time:'10:30-11:30' },
];

export const HOURS = Array.from({length: TOTAL_HOURS + 1}, (_, i) => START_HOUR + i);

const TODAY = new Date();
const DAYS  = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const MONTHS= ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
export const formatDate = d => `${DAYS[d.getDay()]} ${d.getDate()} ${MONTHS[d.getMonth()]}`;

export const WEEK_DAYS = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
export const WEEK_DAYS_FULL = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

// Template slots — one record per visit, keyed by staffId + day
export const INIT_TEMPLATE_SLOTS = [
  // Emma Williams
  { id:'t1',  staffId:'e1', clientId:'c1',  client:'Mrs G Williams', day:0, start:'07:30', end:'08:30', svc:'Personal Care',  roundId:'r1' },
  { id:'t2',  staffId:'e1', clientId:'c2',  client:'Mr I Lloyd',     day:0, start:'09:00', end:'09:45', svc:'Medication',     roundId:'r1' },
  { id:'t3',  staffId:'e1', clientId:'c3',  client:'Mrs H Thomas',   day:0, start:'10:15', end:'11:15', svc:'Personal Care',  roundId:'r1' },
  { id:'t4',  staffId:'e1', clientId:'c4',  client:'Mr R Jones',     day:0, start:'11:45', end:'12:30', svc:'Domestic',       roundId:'r1' },
  { id:'t5',  staffId:'e1', clientId:'c1',  client:'Mrs G Williams', day:1, start:'07:30', end:'08:30', svc:'Personal Care',  roundId:'r1' },
  { id:'t6',  staffId:'e1', clientId:'c2',  client:'Mr I Lloyd',     day:1, start:'09:00', end:'09:45', svc:'Medication',     roundId:'r1' },
  { id:'t7',  staffId:'e1', clientId:'c3',  client:'Mrs H Thomas',   day:1, start:'10:15', end:'11:15', svc:'Personal Care',  roundId:'r1' },
  { id:'t8',  staffId:'e1', clientId:'c1',  client:'Mrs G Williams', day:2, start:'07:30', end:'08:30', svc:'Personal Care',  roundId:'r1' },
  { id:'t9',  staffId:'e1', clientId:'c3',  client:'Mrs H Thomas',   day:2, start:'10:15', end:'11:15', svc:'Personal Care',  roundId:'r1' },
  { id:'t10', staffId:'e1', clientId:'c2',  client:'Mr I Lloyd',     day:3, start:'09:00', end:'09:45', svc:'Medication',     roundId:'r1' },
  { id:'t11', staffId:'e1', clientId:'c4',  client:'Mr R Jones',     day:3, start:'11:45', end:'12:30', svc:'Domestic',       roundId:'r1' },
  { id:'t12', staffId:'e1', clientId:'c2',  client:'Mr I Lloyd',     day:4, start:'09:00', end:'09:45', svc:'Medication',     roundId:'r1' },
  { id:'t13', staffId:'e1', clientId:'c1',  client:'Mrs G Williams', day:4, start:'07:30', end:'08:30', svc:'Personal Care',  roundId:'r1' },
  // Lisa Roberts
  { id:'t14', staffId:'e3', clientId:'c8',  client:'Mrs M Roberts',  day:0, start:'13:00', end:'14:00', svc:'Personal Care',  roundId:'r3' },
  { id:'t15', staffId:'e3', clientId:'c9',  client:'Mr A Hughes',    day:0, start:'14:30', end:'15:15', svc:'Medication',     roundId:'r3' },
  { id:'t16', staffId:'e3', clientId:'c10', client:'Mrs P Davies',   day:0, start:'15:45', end:'16:45', svc:'Personal Care',  roundId:'r3' },
  { id:'t17', staffId:'e3', clientId:'c11', client:'Mr G Owen',      day:0, start:'17:00', end:'17:45', svc:'Social Support', roundId:'r3' },
  { id:'t18', staffId:'e3', clientId:'c8',  client:'Mrs M Roberts',  day:1, start:'13:00', end:'14:00', svc:'Personal Care',  roundId:'r3' },
  { id:'t19', staffId:'e3', clientId:'c9',  client:'Mr A Hughes',    day:1, start:'14:30', end:'15:15', svc:'Medication',     roundId:'r3' },
  { id:'t20', staffId:'e3', clientId:'c8',  client:'Mrs M Roberts',  day:2, start:'13:00', end:'14:00', svc:'Personal Care',  roundId:'r3' },
  { id:'t21', staffId:'e3', clientId:'c11', client:'Mr G Owen',      day:3, start:'17:00', end:'17:45', svc:'Social Support', roundId:'r3' },
  { id:'t22', staffId:'e3', clientId:'c12', client:'Mrs J Morris',   day:3, start:'18:00', end:'19:00', svc:'Personal Care',  roundId:'r3' },
  { id:'t23', staffId:'e3', clientId:'c8',  client:'Mrs M Roberts',  day:4, start:'13:00', end:'14:00', svc:'Personal Care',  roundId:'r3' },
  { id:'t24', staffId:'e3', clientId:'c12', client:'Mrs J Morris',   day:5, start:'18:00', end:'19:00', svc:'Personal Care',  roundId:'r3' },
  // Rebecca Evans
  { id:'t25', staffId:'e4', clientId:'c1',  client:'Mrs G Williams', day:0, start:'18:30', end:'19:30', svc:'Personal Care',  roundId:'r4' },
  { id:'t26', staffId:'e4', clientId:'c13', client:'Mr D Parry',     day:0, start:'19:45', end:'20:30', svc:'Medication',     roundId:'r4' },
  { id:'t27', staffId:'e4', clientId:'c14', client:'Mrs A Jones',    day:0, start:'20:45', end:'21:30', svc:'Personal Care',  roundId:'r4' },
  { id:'t28', staffId:'e4', clientId:'c1',  client:'Mrs G Williams', day:1, start:'18:30', end:'19:30', svc:'Personal Care',  roundId:'r4' },
  { id:'t29', staffId:'e4', clientId:'c13', client:'Mr D Parry',     day:1, start:'19:45', end:'20:30', svc:'Medication',     roundId:'r4' },
  { id:'t30', staffId:'e4', clientId:'c14', client:'Mrs A Jones',    day:2, start:'20:45', end:'21:30', svc:'Personal Care',  roundId:'r4' },
  { id:'t31', staffId:'e4', clientId:'c1',  client:'Mrs G Williams', day:3, start:'18:30', end:'19:30', svc:'Personal Care',  roundId:'r4' },
  { id:'t32', staffId:'e4', clientId:'c1',  client:'Mrs G Williams', day:4, start:'18:30', end:'19:30', svc:'Personal Care',  roundId:'r4' },
  { id:'t33', staffId:'e4', clientId:'c13', client:'Mr D Parry',     day:5, start:'19:45', end:'20:30', svc:'Medication',     roundId:'r4' },
  { id:'t34', staffId:'e4', clientId:'c14', client:'Mrs A Jones',    day:6, start:'20:45', end:'21:30', svc:'Personal Care',  roundId:'r4' },
  // Sion Parry
  { id:'t35', staffId:'e2', clientId:'c5',  client:'Miss B Rees',    day:1, start:'08:00', end:'09:00', svc:'Personal Care',  roundId:'r2' },
  { id:'t36', staffId:'e2', clientId:'c6',  client:'Mr D Evans',     day:2, start:'09:30', end:'10:00', svc:'Domestic',       roundId:'r2' },
  { id:'t37', staffId:'e2', clientId:'c7',  client:'Mrs N Williams', day:3, start:'10:30', end:'11:30', svc:'Personal Care',  roundId:'r2' },
  { id:'t38', staffId:'e2', clientId:'c5',  client:'Miss B Rees',    day:4, start:'08:00', end:'09:00', svc:'Personal Care',  roundId:'r2' },
];
