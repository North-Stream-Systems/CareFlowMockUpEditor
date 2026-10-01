// ── MOCK DATA ─────────────────────────────────────────────────────────────────
export const FUNDERS = [
  { id:'f1', name:'Conwy County Council', type:'Local Authority', terms:30, clients:4 },
  { id:'f2', name:'Betsi Cadwaladr ICB',  type:'NHS / ICB',       terms:30, clients:1 },
  { id:'f3', name:'Self-funded',          type:'Private',         terms:14, clients:3 },
];

export const fmt = n => `£${n.toFixed(2)}`;
export const fmtK = n => n >= 1000 ? `£${(n/1000).toFixed(1)}k` : fmt(n);

export const INVOICES = [
  { id:'INV-00421', funderId:'f1', funder:'Conwy County Council', period:'1–31 Mar 2026', date:'1 Apr 2026', due:'1 May 2026', total:4872.50, status:'draft',    lines:18 },
  { id:'INV-00420', funderId:'f2', funder:'Betsi Cadwaladr ICB',  period:'1–31 Mar 2026', date:'1 Apr 2026', due:'1 May 2026', total:2341.75, status:'draft',    lines:9  },
  { id:'INV-00419', funderId:'f3', funder:'Self-funded',          period:'1–31 Mar 2026', date:'1 Apr 2026', due:'15 Apr 2026',total:1104.00, status:'reviewed', lines:6  },
  { id:'INV-00418', funderId:'f1', funder:'Conwy County Council', period:'1–28 Feb 2026', date:'1 Mar 2026', due:'1 Apr 2026', total:4611.00, status:'overdue',  lines:17 },
  { id:'INV-00417', funderId:'f2', funder:'Betsi Cadwaladr ICB',  period:'1–28 Feb 2026', date:'1 Mar 2026', due:'1 Apr 2026', total:2190.50, status:'paid',     lines:8  },
  { id:'INV-00416', funderId:'f3', funder:'Self-funded',          period:'1–28 Feb 2026', date:'1 Mar 2026', due:'15 Mar 2026',total:1104.00, status:'paid',     lines:6  },
  { id:'INV-00415', funderId:'f1', funder:'Conwy County Council', period:'1–31 Jan 2026', date:'1 Feb 2026', due:'3 Mar 2026', total:4750.00, status:'paid',     lines:18 },
];

// INV-00421 line items with rate breakdown
export const INV421_LINES = [
  { id:'l1',  client:'Mrs G Williams',  date:'Mon 2 Mar', time:'07:30-08:30', svc:'Personal Care',  dayType:'Weekday',  dur:60,  rate:19.50, bands:[{label:'Standard day 07:30-08:30',mins:60,rate:19.50}], total:19.50,  status:'confirmed' },
  { id:'l2',  client:'Mrs G Williams',  date:'Tue 3 Mar', time:'07:30-08:30', svc:'Personal Care',  dayType:'Weekday',  dur:60,  rate:19.50, bands:[{label:'Standard day 07:30-08:30',mins:60,rate:19.50}], total:19.50,  status:'confirmed' },
  { id:'l3',  client:'Mrs G Williams',  date:'Sat 7 Mar', time:'07:30-08:30', svc:'Personal Care',  dayType:'Saturday', dur:60,  rate:24.38, bands:[{label:'Saturday 07:30-08:30',mins:60,rate:24.38}],     total:24.38,  status:'confirmed' },
  { id:'l4',  client:'Mr A Hughes',     date:'Mon 2 Mar', time:'09:00-10:00', svc:'Social Support', dayType:'Weekday',  dur:60,  rate:17.80, bands:[{label:'Standard day 09:00-10:00',mins:60,rate:17.80}], total:17.80,  status:'confirmed' },
  { id:'l5',  client:'Mr I Lloyd',      date:'Mon 2 Mar', time:'07:00-07:45', svc:'Medication',     dayType:'Weekday',  dur:45,  rate:18.20, bands:[{label:'Early morning 07:00-07:30',mins:30,rate:22.10},{label:'Standard day 07:30-07:45',mins:15,rate:19.50}], total:16.52, status:'confirmed' },
  { id:'l6',  client:'Mr I Lloyd',      date:'Tue 3 Mar', time:'07:00-07:45', svc:'Medication',     dayType:'Weekday',  dur:45,  rate:18.20, bands:[{label:'Early morning 07:00-07:30',mins:30,rate:22.10},{label:'Standard day 07:30-07:45',mins:15,rate:19.50}], total:16.52, status:'confirmed' },
  { id:'l7',  client:'Mr D Evans',      date:'Wed 4 Mar', time:'09:00-09:45', svc:'Domestic',       dayType:'Weekday',  dur:45,  rate:15.50, bands:[{label:'Standard day 09:00-09:45',mins:45,rate:15.50}], total:11.63,  status:'confirmed' },
  { id:'l8',  client:'Mrs G Williams',  date:'Sun 8 Mar', time:'07:30-08:30', svc:'Personal Care',  dayType:'Sunday',   dur:60,  rate:29.25, bands:[{label:'Sunday 07:30-08:30',mins:60,rate:29.25}],      total:29.25,  status:'confirmed' },
  { id:'l9',  client:'Mrs G Williams',  date:'Mon 9 Mar', time:'18:30-19:30', svc:'Personal Care',  dayType:'Weekday',  dur:60,  rate:19.50, bands:[{label:'Evening 18:30-19:30',mins:60,rate:21.45}],     total:21.45,  status:'confirmed' },
  { id:'l10', client:'Mr A Hughes',     date:'Fri 6 Mar', time:'09:00-10:00', svc:'Social Support', dayType:'Weekday',  dur:60,  rate:17.80, bands:[{label:'Standard day 09:00-10:00',mins:60,rate:17.80}],total:17.80,  status:'confirmed' },
];

export const CREDIT_NOTES = [
  { id:'CN-0021', invoiceId:'INV-00421', client:'Mr D Evans',     date:'18 Mar 2026', reason:'Missed visit — carer no-show 4 Mar', amount:11.63, status:'draft'  },
  { id:'CN-0020', invoiceId:'INV-00418', client:'Mrs N Williams', date:'5 Mar 2026',  reason:'Suspension billing adjustment',      amount:84.00, status:'sent'   },
];

export const PAYROLL_PERIOD = { from:'1 Mar 2026', to:'31 Mar 2026', status:'locked' };
export const PAYROLL_LINES = [
  { id:'p1', name:'Emma Williams',  role:'Senior CW', hrs_wd:142.5, hrs_sat:7.5,  hrs_sun:7.5,  hrs_bh:0,   base:12.50, total_base:1975.00, uplift:87.38,  mileage:28.80, gross:2091.18, contract:150 },
  { id:'p2', name:'Lisa Roberts',   role:'Care Worker',hrs_wd:82.5, hrs_sat:7.5,  hrs_sun:0,    hrs_bh:0,   base:11.44, total_base:1034.22, uplift:35.81,  mileage:19.80, gross:1089.83, contract:90  },
  { id:'p3', name:'Rebecca Evans',  role:'Senior CW', hrs_wd:135.0, hrs_sat:15.0, hrs_sun:7.5,  hrs_bh:0,   base:12.50, total_base:1968.75, uplift:140.63, mileage:34.20, gross:2143.58, contract:150 },
  { id:'p4', name:'Sion Parry',     role:'Care Worker',hrs_wd:52.5, hrs_sat:0,    hrs_sun:0,    hrs_bh:0,   base:11.44, total_base:600.60,  uplift:0,      mileage:12.60, gross:613.20,  contract:75  },
  { id:'p5', name:'Catrin Owen',    role:'Care Worker',hrs_wd:37.5, hrs_sat:7.5,  hrs_sun:0,    hrs_bh:0,   base:11.44, total_base:514.80,  uplift:21.45,  mileage:9.90,  gross:546.15,  contract:null},
  { id:'p6', name:'Amy Hughes',     role:'Care Worker',hrs_wd:82.5, hrs_sat:0,    hrs_sun:0,    hrs_bh:0,   base:11.44, total_base:944.10,  uplift:0,      mileage:18.00, gross:962.10,  contract:90  },
];

export const REVENUE_DATA = [
  { month:'Oct', value:7820 },
  { month:'Nov', value:8140 },
  { month:'Dec', value:7390 },
  { month:'Jan', value:8320 },
  { month:'Feb', value:7906 },
  { month:'Mar', value:8318, current:true },
];

export const ACTIVITY = [
  { text:'INV-00421 draft ready for review',   sub:'Conwy County Council · 18 lines · £4,872.50',  color:'var(--teal)',  amount:'£4,872.50', time:'2h ago'  },
  { text:'Payment received INV-00417',          sub:'Betsi Cadwaladr ICB · £2,190.50 cleared',      color:'var(--green)', amount:'+£2,190.50',time:'1d ago'  },
  { text:'CN-0021 auto-generated',              sub:'Missed visit — Mr D Evans 4 Mar · £11.63',     color:'var(--amber)', amount:'-£11.63',   time:'1d ago'  },
  { text:'INV-00418 overdue',                   sub:'Conwy County Council · 30 days past due',      color:'var(--red)',   amount:'£4,611.00', time:'2d ago'  },
  { text:'INV-00420 draft ready for review',    sub:'Betsi Cadwaladr ICB · 9 lines · £2,341.75',   color:'var(--teal)',  amount:'£2,341.75', time:'2h ago'  },
];
