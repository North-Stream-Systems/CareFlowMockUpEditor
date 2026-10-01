import { SVC_COLORS } from './constants.jsx';
import { Section, Tag } from './shared-page-wrapper.jsx';

// ── UNASSIGNED VISITS PAGE ────────────────────────────────────────────────────
export const UnassignedPage = () => {
  const visits = [
    {id:'u1',client:'Miss B Rees',    zone:'South',  svc:'Personal Care', time:'08:00-09:00', dur:60, round:'Monday AM South'},
    {id:'u2',client:'Mr D Evans',     zone:'South',  svc:'Domestic',      time:'09:30-10:00', dur:30, round:'Monday AM South'},
    {id:'u3',client:'Mrs N Williams', zone:'South',  svc:'Personal Care', time:'10:30-11:30', dur:60, round:'Monday AM South'},
  ];
  const suitable = [
    {name:'Sion Parry',  role:'Care Worker',zone:'North', score:82, comp:'green'},
    {name:'Amy Hughes',  role:'Care Worker',zone:'South', score:91, comp:'green'},
    {name:'Catrin Owen', role:'Care Worker',zone:'Central',score:74, comp:'amber'},
  ];

  return (
    <div style={{padding:'20px 24px'}}>
      <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:18}}>
        <div>
          <div style={{fontFamily:'var(--fh)',fontSize:21,fontWeight:700,color:'var(--navy)',letterSpacing:'-.3px'}}>Unassigned Visits</div>
          <div style={{fontSize:'12.5px',color:'var(--slate)',marginTop:2}}>{visits.length} visits require a carer for today</div>
        </div>
        <button className="btn btn-p btn-sm">Bulk assign</button>
      </div>

      <div style={{display:'flex',gap:16}}>
        <div style={{flex:1,minWidth:0}}>
          <Section title="Unassigned visits" action={<Tag color="red">{visits.length} unassigned</Tag>}>
            {visits.map(v => {
              const col = SVC_COLORS[v.svc]||SVC_COLORS['Personal Care'];
              return (
                <div key={v.id} style={{display:'flex',alignItems:'center',gap:12,padding:'12px 16px',borderBottom:'1px solid var(--border)'}}>
                  <div style={{width:10,height:10,borderRadius:2,background:col.bg,flexShrink:0}}/>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:'13px',fontWeight:600,color:'var(--navy)'}}>{v.client}</div>
                    <div style={{fontSize:'11px',color:'var(--slate)',marginTop:2}}>{v.zone} Zone · {v.svc} · {v.round}</div>
                  </div>
                  <span style={{fontFamily:'var(--fm)',fontSize:'12px',fontWeight:500,color:'var(--navy)',flexShrink:0}}>{v.time}</span>
                  <Tag color="slate">{v.dur}min</Tag>
                  <button className="btn btn-p btn-sm">Assign</button>
                </div>
              );
            })}
          </Section>
        </div>
        <div style={{width:280,flexShrink:0}}>
          <Section title="Available staff">
            {suitable.map(s => (
              <div key={s.name} style={{padding:'11px 14px',borderBottom:'1px solid var(--border)'}}>
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:3}}>
                  <span style={{fontSize:'12.5px',fontWeight:600,color:'var(--navy)'}}>{s.name}</span>
                  <div style={{display:'flex',alignItems:'center',gap:5}}>
                    <span style={{fontFamily:'var(--fm)',fontSize:'11px',fontWeight:600,color:'var(--teal)'}}>{s.score}%</span>
                    <span style={{fontSize:'10px',color:'var(--slate)'}}>match</span>
                  </div>
                </div>
                <div style={{fontSize:'11px',color:'var(--slate)'}}>{s.role} · {s.zone} Zone</div>
                <div style={{height:3,background:'var(--border)',borderRadius:2,margin:'6px 0',overflow:'hidden'}}>
                  <div style={{height:'100%',borderRadius:2,background:'var(--teal)',width:`${s.score}%`}}/>
                </div>
              </div>
            ))}
          </Section>
        </div>
      </div>
    </div>
  );
};
