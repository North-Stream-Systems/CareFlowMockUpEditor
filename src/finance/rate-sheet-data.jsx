// ── RATE SHEET DATA ───────────────────────────────────────────────────────────
export const SVCS = ['Personal Care','Medication','Domestic','Social Support','Complex Care'];
export const DAY_TYPES = ['Weekday','Saturday','Sunday','Bank Holiday'];

export const BILLING_SHEETS = [
  {
    id:'bs1', name:'Conwy Council Standard', type:'billing', funder:'Conwy County Council',
    assignedClients:['Mrs G Williams','Mr A Hughes','Mr D Evans','Mr I Lloyd'],
    rates:{
      'Personal Care':  { Weekday:19.50, Saturday:24.38, Sunday:29.25, 'Bank Holiday':39.00 },
      'Medication':     { Weekday:18.20, Saturday:22.75, Sunday:27.30, 'Bank Holiday':36.40 },
      'Domestic':       { Weekday:15.50, Saturday:19.38, Sunday:23.25, 'Bank Holiday':31.00 },
      'Social Support': { Weekday:17.80, Saturday:22.25, Sunday:26.70, 'Bank Holiday':35.60 },
      'Complex Care':   { Weekday:24.00, Saturday:30.00, Sunday:36.00, 'Bank Holiday':48.00 },
    },
    timeBands:[
      { name:'Early morning', from:'06:00', to:'08:00', uplift:15 },
      { name:'Standard day',  from:'08:00', to:'18:00', uplift:0  },
      { name:'Evening',       from:'18:00', to:'22:00', uplift:10 },
      { name:'Night',         from:'22:00', to:'06:00', uplift:33 },
    ],
    minCall:30, notes:'Conwy LA standard rate — reviewed annually Apr.',
  },
  {
    id:'bs2', name:'NHS ICB Complex Care', type:'billing', funder:'Betsi Cadwaladr ICB',
    assignedClients:['Mrs M Roberts'],
    rates:{
      'Personal Care':  { Weekday:22.00, Saturday:27.50, Sunday:33.00, 'Bank Holiday':44.00 },
      'Medication':     { Weekday:20.50, Saturday:25.63, Sunday:30.75, 'Bank Holiday':41.00 },
      'Domestic':       { Weekday:17.00, Saturday:21.25, Sunday:25.50, 'Bank Holiday':34.00 },
      'Social Support': { Weekday:19.50, Saturday:24.38, Sunday:29.25, 'Bank Holiday':39.00 },
      'Complex Care':   { Weekday:28.50, Saturday:35.63, Sunday:42.75, 'Bank Holiday':57.00 },
    },
    timeBands:[
      { name:'Standard day', from:'07:00', to:'22:00', uplift:0 },
      { name:'Night',        from:'22:00', to:'07:00', uplift:40 },
    ],
    minCall:45, notes:'ICB commissioned complex care rate. Minimum 45min call.',
  },
  {
    id:'bs3', name:'Private Standard', type:'billing', funder:'Self-funded',
    assignedClients:['Mr I Lloyd','Miss B Rees','Mr D Parry'],
    rates:{
      'Personal Care':  { Weekday:24.00, Saturday:30.00, Sunday:36.00, 'Bank Holiday':48.00 },
      'Medication':     { Weekday:22.50, Saturday:28.13, Sunday:33.75, 'Bank Holiday':45.00 },
      'Domestic':       { Weekday:19.00, Saturday:23.75, Sunday:28.50, 'Bank Holiday':38.00 },
      'Social Support': { Weekday:22.00, Saturday:27.50, Sunday:33.00, 'Bank Holiday':44.00 },
      'Complex Care':   { Weekday:30.00, Saturday:37.50, Sunday:45.00, 'Bank Holiday':60.00 },
    },
    timeBands:[
      { name:'Standard', from:'07:00', to:'22:00', uplift:0 },
      { name:'Night',    from:'22:00', to:'07:00', uplift:50 },
    ],
    minCall:30, notes:'Standard private rate. Reviewed quarterly.',
  },
  {
    id:'bs4', name:'Insurance / Third Party', type:'billing', funder:'Insurance',
    assignedClients:['Mrs N Williams'],
    rates:{
      'Personal Care':  { Weekday:21.00, Saturday:26.25, Sunday:31.50, 'Bank Holiday':42.00 },
      'Medication':     { Weekday:19.50, Saturday:24.38, Sunday:29.25, 'Bank Holiday':39.00 },
      'Domestic':       { Weekday:16.50, Saturday:20.63, Sunday:24.75, 'Bank Holiday':33.00 },
      'Social Support': { Weekday:18.50, Saturday:23.13, Sunday:27.75, 'Bank Holiday':37.00 },
      'Complex Care':   { Weekday:26.00, Saturday:32.50, Sunday:39.00, 'Bank Holiday':52.00 },
    },
    timeBands:[
      { name:'Standard', from:'07:00', to:'22:00', uplift:0 },
      { name:'Night',    from:'22:00', to:'07:00', uplift:40 },
    ],
    minCall:30, notes:'Insurance-funded clients. Confirm rate with insurer before admission.',
  },
];

export const PAY_SHEETS = [
  {
    id:'ps1', name:'Care Worker Band 1', type:'pay',
    assignedStaff:['Sion Parry','Catrin Owen','Amy Hughes'],
    baseRate:11.44,
    uplifts:{ Saturday:25, Sunday:50, 'Bank Holiday':100, Evening:0, Night:33 },
    overtime:150, notes:'NLW aligned. Reviewed Apr each year.',
  },
  {
    id:'ps2', name:'Senior Care Worker', type:'pay',
    assignedStaff:['Emma Williams','Rebecca Evans'],
    baseRate:12.50,
    uplifts:{ Saturday:25, Sunday:50, 'Bank Holiday':100, Evening:0, Night:33 },
    overtime:150, notes:'Senior band — supervisory responsibilities.',
  },
  {
    id:'ps3', name:'Care Worker Band 2', type:'pay',
    assignedStaff:['Lisa Roberts','Michael Davies'],
    baseRate:11.90,
    uplifts:{ Saturday:25, Sunday:50, 'Bank Holiday':100, Evening:0, Night:33 },
    overtime:150, notes:'Band 2 — 2+ years experience or specialist skills.',
  },
];
