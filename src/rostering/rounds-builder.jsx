import { useState } from 'react';
import { SVC_COLORS } from './constants.jsx';
import { DRow, Section, Tag } from './shared-page-wrapper.jsx';

// ── ROUNDS BUILDER ────────────────────────────────────────────────────────────
export const RoundsBuilder = () => {
  const [selRound, setSelRound] = useState('r1');
  const rounds = [
    { id:'r1', name:'Monday AM North',   zone:'North',   carer:'Emma Williams',  carerColor:'#0D9488', visits:4, status:'assigned'   },
    { id:'r2', name:'Monday AM South',   zone:'South',   carer:null,             carerColor:null,       visits:3, status:'unassigned' },
    { id:'r3', name:'Monday PM Central', zone:'Central', carer:'Lisa Roberts',   carerColor:'#8B5CF6', visits:5, status:'assigned'   },
    { id:'r4', name:'Evening Run 1',     zone:'North',   carer:'Rebecca Evans',  carerColor:'#3B82F6', visits:4, status:'partial'    },
  ];
  const roundVisits = {
    r1:[
      {id:'v1',client:'Mrs G Williams',time:'07:30-08:30',svc:'Personal Care', zone:'North'},
      {id:'v2',client:'Mr I Lloyd',    time:'09:00-09:45',svc:'Medication',    zone:'North'},
      {id:'v3',client:'Mrs H Thomas',  time:'10:15-11:15',svc:'Personal Care', zone:'North'},
      {id:'v4',client:'Mr R Jones',    time:'11:45-12:30',svc:'Domestic',      zone:'North'},
    ],
    r2:[
      {id:'v5',client:'Miss B Rees',    time:'08:00-09:00',svc:'Personal Care',zone:'South'},
      {id:'v6',client:'Mr D Evans',     time:'09:30-10:00',svc:'Domestic',     zone:'South'},
      {id:'v7',client:'Mrs N Williams', time:'10:30-11:30',svc:'Personal Care',zone:'South'},
    ],
    r3:[
      {id:'v8', client:'Mrs M Roberts', time:'13:00-14:00',svc:'Personal Care', zone:'Central'},
      {id:'v9', client:'Mr A Hughes',   time:'14:30-15:15',svc:'Medication',    zone:'Central'},
      {id:'v10',client:'Mrs P Davies',  time:'15:45-16:45',svc:'Personal Care', zone:'Central'},
      {id:'v11',client:'Mr G Owen',     time:'17:00-17:45',svc:'Social Support',zone:'Central'},
      {id:'v12',client:'Mrs J Morris',  time:'18:00-19:00',svc:'Personal Care', zone:'Central'},
    ],
    r4:[
      {id:'v13',client:'Mrs G Williams',time:'18:30-19:30',svc:'Personal Care',zone:'North'},
      {id:'v14',client:'Mr D Parry',    time:'19:45-20:30',svc:'Medication',   zone:'North'},
      {id:'v15',client:'Mrs A Jones',   time:'20:45-21:30',svc:'Personal Care',zone:'North'},
      {id:'v16',client:'Mr T Evans',    time:'21:45-22:15',svc:'Domestic',     zone:'North'},
    ],
  };
  const sel = rounds.find(r => r.id === selRound);
  const visits = roundVisits[selRound] || [];
  const scMap = {assigned:'green',unassigned:'red',partial:'amber'};

  return (
    <div style={{padding:'20px 24px'}}>
      <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:18}}>
        <div>
          <div style={{fontFamily:'var(--fh)',fontSize:21,fontWeight:700,color:'var(--navy)',letterSpacing:'-.3px'}}>Rounds Builder</div>
          <div style={{fontSize:'12.5px',color:'var(--slate)',marginTop:2}}>{rounds.length} rounds configured · {rounds.filter(r=>r.status==='unassigned').length} unassigned</div>
        </div>
        <button className="btn btn-p btn-sm">+ New round</button>
      </div>
      <div style={{display:'flex',gap:16}}>
        {/* Round list */}
        <div style={{width:260,flexShrink:0}}>
          <Section title="Rounds">
            {rounds.map(r => (
              <div key={r.id} onClick={() => setSelRound(r.id)} style={{padding:'11px 14px',borderBottom:'1px solid var(--border)',cursor:'pointer',background:selRound===r.id?'var(--teal-l)':'#fff',borderLeft:selRound===r.id?'2px solid var(--teal)':'2px solid transparent',transition:'all .1s'}}>
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:4}}>
                  <span style={{fontFamily:'var(--fh)',fontSize:'12.5px',fontWeight:600,color:selRound===r.id?'var(--teal)':'var(--navy)'}}>{r.name}</span>
                  <Tag color={scMap[r.status]}>{r.status}</Tag>
                </div>
                <div style={{fontSize:'11px',color:'var(--slate)',display:'flex',gap:8}}>
                  <span>{r.zone} Zone</span>
                  <span>·</span>
                  <span>{r.visits} visits</span>
                </div>
                {r.carer
                  ? <div style={{display:'flex',alignItems:'center',gap:5,marginTop:4}}>
                      <div style={{width:7,height:7,borderRadius:'50%',background:r.carerColor,flexShrink:0}}/>
                      <span style={{fontSize:'11px',color:'var(--slate)'}}>{r.carer}</span>
                    </div>
                  : <div style={{fontSize:'11px',color:'var(--red)',fontWeight:600,marginTop:4}}>No carer assigned</div>
                }
              </div>
            ))}
          </Section>
        </div>
        {/* Round detail */}
        {sel && (
          <div style={{flex:1,minWidth:0}}>
            <Section title={sel.name} action={
              <div style={{display:'flex',gap:6}}>
                <button className="btn btn-g btn-sm">Assign carer</button>
                <button className="btn btn-g btn-sm">+ Add visit</button>
              </div>
            }>
              <div style={{display:'flex',gap:0}}>
                <DRow label="Zone" value={sel.zone + ' Zone'} />
                <DRow label="Status" value={sel.status} />
              </div>
              <DRow label="Assigned carer" value={sel.carer || 'Unassigned'} />
              <DRow label="Total visits" value={sel.visits.toString()} />
            </Section>
            <Section title="Visits in this round" action={<span style={{fontSize:'11.5px',color:'var(--slate)'}}>{visits.length} visits</span>}>
              {visits.map((v, i) => {
                const col = SVC_COLORS[v.svc]||SVC_COLORS['Personal Care'];
                return (
                  <div key={v.id} style={{display:'flex',alignItems:'center',gap:10,padding:'10px 16px',borderBottom:'1px solid var(--border)'}}>
                    <div style={{width:28,height:28,borderRadius:7,background:col.bg,display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontSize:12,fontWeight:700,flexShrink:0}}>{i+1}</div>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontSize:'12.5px',fontWeight:500,color:'var(--text)'}}>{v.client}</div>
                      <div style={{fontSize:'11px',color:'var(--slate)'}}>{v.svc}</div>
                    </div>
                    <span style={{fontFamily:'var(--fm)',fontSize:'11.5px',fontWeight:500,color:'var(--navy)',flexShrink:0}}>{v.time}</span>
                    <div style={{display:'flex',gap:4,flexShrink:0}}>
                      <button className="btn btn-g btn-sm" style={{padding:'3px 7px',fontSize:11}}>↑</button>
                      <button className="btn btn-g btn-sm" style={{padding:'3px 7px',fontSize:11}}>↓</button>
                    </div>
                  </div>
                );
              })}
            </Section>
          </div>
        )}
      </div>
    </div>
  );
};
