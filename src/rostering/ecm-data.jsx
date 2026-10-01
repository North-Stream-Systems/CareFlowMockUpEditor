// ── ECM DATA ──────────────────────────────────────────────────────────────────
export const ECM_CALLS = [
  // COMPLETE
  { id:'e1',  client:'Mrs G Williams',  carer:'Emma Williams',   carerColor:'#0D9488', svc:'Personal Care',  zone:'North',   sched:'07:30', schedEnd:'08:30', signIn:'07:28', signOut:'08:34', dur:66,  status:'complete',     keyCode:'1234' },
  { id:'e2',  client:'Mr R Jones',      carer:'Emma Williams',   carerColor:'#0D9488', svc:'Domestic',       zone:'North',   sched:'07:00', schedEnd:'07:45', signIn:'06:58', signOut:'07:49', dur:51,  status:'complete',     keyCode:'3456' },
  { id:'e3',  client:'Mrs P Davies',    carer:'Lisa Roberts',    carerColor:'#8B5CF6', svc:'Personal Care',  zone:'Central', sched:'08:00', schedEnd:'09:00', signIn:'08:03', signOut:'09:07', dur:64,  status:'complete',     keyCode:'7890' },
  { id:'e4',  client:'Mr G Owen',       carer:'Lisa Roberts',    carerColor:'#8B5CF6', svc:'Social Support', zone:'Central', sched:'09:30', schedEnd:'10:15', signIn:'09:28', signOut:'10:18', dur:50,  status:'complete',     keyCode:'2345' },
  { id:'e5',  client:'Mrs A Jones',     carer:'Rebecca Evans',   carerColor:'#3B82F6', svc:'Personal Care',  zone:'North',   sched:'07:00', schedEnd:'08:00', signIn:'07:02', signOut:'08:05', dur:63,  status:'complete',     keyCode:'6789' },
  { id:'e6',  client:'Mr T Evans',      carer:'Rebecca Evans',   carerColor:'#3B82F6', svc:'Domestic',       zone:'North',   sched:'08:30', schedEnd:'09:15', signIn:'08:27', signOut:'09:19', dur:52,  status:'complete',     keyCode:'0123' },
  { id:'e7',  client:'Miss B Rees',     carer:'Amy Hughes',      carerColor:'#EC4899', svc:'Personal Care',  zone:'South',   sched:'08:00', schedEnd:'09:00', signIn:'08:01', signOut:'09:02', dur:61,  status:'complete',     keyCode:'4567' },
  // IN PROGRESS (part of complete column but with active indicator)
  { id:'e8',  client:'Mr I Lloyd',      carer:'Emma Williams',   carerColor:'#0D9488', svc:'Medication',     zone:'North',   sched:'09:00', schedEnd:'09:45', signIn:'09:03', signOut:null,   dur:null,status:'in-progress',  keyCode:'5678' },
  // LATE
  { id:'e9',  client:'Mrs H Thomas',    carer:'Emma Williams',   carerColor:'#0D9488', svc:'Personal Care',  zone:'North',   sched:'10:30', schedEnd:'11:30', signIn:'10:48', signOut:null,   dur:null,status:'late',         lateBy:18, keyCode:'9012' },
  { id:'e10', client:'Mrs M Roberts',   carer:'Lisa Roberts',    carerColor:'#8B5CF6', svc:'Personal Care',  zone:'Central', sched:'13:00', schedEnd:'14:00', signIn:'13:22', signOut:null,   dur:null,status:'late',         lateBy:22, keyCode:'1357' },
  { id:'e11', client:'Mr A Hughes',     carer:'Lisa Roberts',    carerColor:'#8B5CF6', svc:'Medication',     zone:'Central', sched:'14:30', schedEnd:'15:15', signIn:null,    signOut:null,   dur:null,status:'late',         lateBy:35, keyCode:'2468' },
  { id:'e12', client:'Mr D Parry',      carer:'Rebecca Evans',   carerColor:'#3B82F6', svc:'Medication',     zone:'North',   sched:'09:00', schedEnd:'09:45', signIn:'09:19', signOut:null,   dur:null,status:'late',         lateBy:19, keyCode:'8024' },
  // MISSED
  { id:'e13', client:'Mr D Evans',      carer:'Sion Parry',      carerColor:'#F59E0B', svc:'Domestic',       zone:'South',   sched:'09:30', schedEnd:'10:00', signIn:null,    signOut:null,   dur:null,status:'missed',       missReason:'Carer absent — no cover arranged', keyCode:'3690' },
  { id:'e14', client:'Mrs N Williams',  carer:'Sion Parry',      carerColor:'#F59E0B', svc:'Personal Care',  zone:'South',   sched:'10:30', schedEnd:'11:30', signIn:null,    signOut:null,   dur:null,status:'missed',       missReason:'Carer absent — cover declined', keyCode:'1470' },
  { id:'e15', client:'Mrs J Morris',    carer:'Catrin Owen',     carerColor:'#64748B', svc:'Personal Care',  zone:'Central', sched:'08:00', schedEnd:'09:00', signIn:null,    signOut:null,   dur:null,status:'missed',       missReason:'Client hospitalised — not updated on system', keyCode:'2581' },
];


const avColor = n => { const cols=['#0D9488','#3B82F6','#8B5CF6','#EC4899','#F59E0B']; return cols[n.charCodeAt(0)%cols.length]; };
export const inits2  = n => n.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();
