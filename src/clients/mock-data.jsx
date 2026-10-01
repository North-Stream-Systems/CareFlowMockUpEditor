// ── MOCK DATA ─────────────────────────────────────────────────────────────────
export const CLIENTS = [
  { id:'CL001', name:'Mrs Gwen Williams',    dob:'14 Mar 1939', age:87, zone:'North',   status:'active',     funder:'Conwy County Council', svc:'Personal Care', alerts:2, tasks:1, keyworker:'Emma Williams',    address:'14 Maes y Dref, Conwy LL32 8AA',     phone:'01492 123456', emergency:'Bethan Williams (Daughter) 07700 800001', gp:'Dr A Patel, Conwy Surgery', nhs:'123 456 7890', package:'2x daily, 7 days', hours:14 },
  { id:'CL002', name:'Mr Ifan Lloyd',        dob:'2 Sep 1945',  age:80, zone:'North',   status:'active',     funder:'Self-funded',          svc:'Medication',    alerts:0, tasks:2, keyworker:'Emma Williams',    address:'6 Ffordd y Mor, Llandudno LL30 2AA', phone:'01492 234567', emergency:'Sian Lloyd (Wife) 07700 800002',          gp:'Dr B Jones, Llandudno Practice', nhs:'234 567 8901', package:'1x daily, 7 days', hours:7 },
  { id:'CL003', name:'Mrs Mair Roberts',     dob:'30 Jun 1952', age:73, zone:'Central', status:'active',     funder:'NHS ICB',              svc:'Complex Care',  alerts:1, tasks:0, keyworker:'Lisa Roberts',     address:'29 Rhodfar Bryn, Colwyn Bay LL29 7AH',phone:'01492 345678', emergency:'Dafydd Roberts (Son) 07700 800003',       gp:'Dr C Evans, Colwyn Bay Surgery', nhs:'345 678 9012', package:'3x daily, 7 days', hours:21 },
  { id:'CL004', name:'Mr Arthur Hughes',     dob:'17 Nov 1936', age:88, zone:'North',   status:'active',     funder:'Conwy County Council', svc:'Social Support',alerts:0, tasks:1, keyworker:'Emma Williams',    address:'3 Lon y Llan, Conwy LL32 8BB',        phone:'01492 456789', emergency:'Carol Hughes (Daughter) 07700 800004',   gp:'Dr A Patel, Conwy Surgery', nhs:'456 789 0123', package:'1x daily, 5 days', hours:5 },
  { id:'CL005', name:'Miss Bethan Rees',     dob:'8 Apr 1968',  age:57, zone:'South',   status:'active',     funder:'Self-funded',          svc:'Personal Care', alerts:0, tasks:0, keyworker:'Sion Parry',       address:'51 Stryd y Dwr, Rhyl LL18 1AA',       phone:'01745 123456', emergency:'John Rees (Brother) 07700 800005',        gp:'Dr D Williams, Rhyl Practice', nhs:'567 890 1234', package:'2x daily, 5 days', hours:10 },
  { id:'CL006', name:'Mr Dewi Evans',        dob:'23 Jan 1941', age:84, zone:'South',   status:'active',     funder:'Conwy County Council', svc:'Domestic',      alerts:0, tasks:0, keyworker:'Catrin Owen',      address:'8 Heol y Coed, Prestatyn LL19 9AA',   phone:'01745 234567', emergency:'Mary Evans (Wife) 07700 800006',          gp:'Dr D Williams, Rhyl Practice', nhs:'678 901 2345', package:'1x weekly', hours:2 },
  { id:'CL007', name:'Mrs Nerys Williams',   dob:'5 Jul 1958',  age:66, zone:'South',   status:'suspended',  funder:'NHS ICB',              svc:'Personal Care', alerts:1, tasks:2, keyworker:'Amy Hughes',       address:'22 Ffordd yr Eglwys, Prestatyn LL19',  phone:'01745 345678', emergency:'Tom Williams (Husband) 07700 800007',     gp:'Dr E Thomas, Prestatyn Surgery', nhs:'789 012 3456', package:'2x daily', hours:14 },
  { id:'CL008', name:'Mr Daniel Parry',      dob:'12 Dec 1947', age:77, zone:'North',   status:'active',     funder:'Self-funded',          svc:'Medication',    alerts:0, tasks:1, keyworker:'Rebecca Evans',    address:'17 Bryn Awelon, Llandudno LL30 1AA',  phone:'01492 567890', emergency:'Ann Parry (Sister) 07700 800008',         gp:'Dr B Jones, Llandudno Practice', nhs:'890 123 4567', package:'2x daily, 7 days', hours:14 },
];

export const INCIDENTS_DATA = [
  { id:'i1', clientId:'CL001', type:'Fall',              sev:'moderate', date:'10 Mar 2026', stage:'Under Investigation', open:8,  notified:true,  desc:'Client found on floor in bedroom at 08:45. No visible injury. GP notified. Family informed.' },
  { id:'i2', clientId:'CL001', type:'Medication concern',sev:'minor',    date:'2 Feb 2026',  stage:'Closed',              open:0,  notified:false, desc:'Client refused medication on three consecutive visits. GP consulted. Alternative plan put in place.' },
  { id:'i3', clientId:'CL003', type:'Pressure sore',     sev:'major',    date:'5 Mar 2026',  stage:'Under Investigation', open:13, notified:true,  desc:'Stage 2 pressure sore noted on right heel. District nurse referral made. Care plan updated.' },
  { id:'i4', clientId:'CL007', type:'Carer concern',     sev:'moderate', date:'1 Mar 2026',  stage:'Initial Report',      open:17, notified:false, desc:'Client reported feeling uncomfortable with a carer. Investigation commenced.' },
];

export const COMPLAINTS_DATA = [
  { id:'cp1', clientId:'CL001', date:'8 Mar 2026',  stage:'Acknowledgement sent', ack:true,  days:10, desc:'Family raised concern about timing of morning call.' },
  { id:'cp2', clientId:'CL007', date:'15 Feb 2026', stage:'Under Investigation',  ack:true,  days:31, desc:'Client complained about quality of domestic service.' },
];

export const TASKS_DATA = {
  CL001: [
    { id:'t1', title:'Review care plan following fall', due:'18 Mar 2026', pri:'high',   done:false },
    { id:'t2', title:'Contact GP re medication review', due:'20 Mar 2026', pri:'medium', done:false },
    { id:'t3', title:'Update risk assessment',          due:'25 Mar 2026', pri:'low',    done:true  },
  ],
  CL002: [
    { id:'t4', title:'Request updated prescription',    due:'19 Mar 2026', pri:'high',   done:false },
    { id:'t5', title:'Book annual review',              due:'30 Mar 2026', pri:'medium', done:false },
  ],
};

export const NOTES_DATA = {
  CL001: [
    { id:'n1', author:'Emma Williams', type:'Care Note', date:'13 Mar 2026', body:'Client in good spirits today. Assisted with personal care and breakfast. No concerns noted. Garden mentioned — may benefit from social activity referral.' },
    { id:'n2', author:'Cameron D',     type:'Concern',   date:'10 Mar 2026', body:'Following this morning fall incident, care plan under review. Client settled and comfortable. Family contact made.' },
    { id:'n3', author:'Lisa Roberts',  type:'Care Note', date:'9 Mar 2026',  body:'PM call — client tired but ate well. Medication administered without issue. Home clean and tidy.' },
  ],
};

export const MAR_DATA = {
  CL001: [
    { med:'Amlodipine 5mg', time:'08:00', records:['G','G','G','G','G','G','G','G','G','G','G','G','G'] },
    { med:'Lisinopril 10mg', time:'08:00', records:['G','G','G','R','G','G','G','G','G','G','G','G','G'] },
    { med:'Simvastatin 20mg', time:'20:00', records:['G','G','G','G','G','G','G','M','G','G','G','G','G'] },
  ],
};

export const REFERRALS = [
  { id:'r1', name:'Patricia Owen',  date:'11 Mar 2026', step:3, status:'In Progress', zone:'North' },
  { id:'r2', name:'Gerald Thomas',  date:'8 Mar 2026',  step:1, status:'In Progress', zone:'Central' },
  { id:'r3', name:'Eileen Morris',  date:'5 Mar 2026',  step:5, status:'In Progress', zone:'South' },
];

export const REF_STEPS = ['Personal Details','Needs Assessment','Risk Assessment','Care Plan','Funder Setup','Activation'];
