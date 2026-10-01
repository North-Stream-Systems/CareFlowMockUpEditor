import { Section } from './shared-page-wrapper.jsx';

// ── WEEK VIEW ─────────────────────────────────────────────────────────────────
export const WeekView = () => {
  const weekDays = ['Mon 17','Tue 18','Wed 19','Thu 20','Fri 21','Sat 22','Sun 23'];
  const staffRows = [
    { name:'Emma Williams',  color:'#0D9488', shifts:[4,4,3,3,3,0,0] },
    { name:'Lisa Roberts',   color:'#8B5CF6', shifts:[5,3,3,2,3,1,0] },
    { name:'Rebecca Evans',  color:'#3B82F6', shifts:[3,3,2,3,3,2,1] },
    { name:'Sion Parry',     color:'#F59E0B', shifts:[0,2,2,2,2,0,0] },
  ];
  const coverage = [100,95,87,100,95,60,40];
  const covCol   = p => p>=90?'var(--green)':p>=70?'var(--amber)':'var(--red)';

  return (
    <div style={{padding:'20px 24px'}}>
      <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:18}}>
        <div>
          <div style={{fontFamily:'var(--fh)',fontSize:21,fontWeight:700,color:'var(--navy)',letterSpacing:'-.3px'}}>Week View</div>
          <div style={{fontSize:'12.5px',color:'var(--slate)',marginTop:2}}>w/c Monday 17 March 2026</div>
        </div>
        <div style={{display:'flex',gap:8}}>
          <button className="btn btn-g btn-sm">← Prev week</button>
          <button className="btn btn-g btn-sm">This week</button>
          <button className="btn btn-g btn-sm">Next week →</button>
          <button className="btn publish-btn btn-sm">Publish week</button>
        </div>
      </div>

      {/* Coverage strip */}
      <Section title="Weekly Coverage">
        <div style={{display:'flex',borderBottom:'1px solid var(--border)'}}>
          <div style={{width:160,flexShrink:0,padding:'10px 16px',fontSize:'11px',color:'var(--slate)',fontWeight:600,textTransform:'uppercase',letterSpacing:'.5px'}}>Day</div>
          {weekDays.map((d,i) => (
            <div key={d} style={{flex:1,padding:'10px 6px',textAlign:'center',borderLeft:'1px solid var(--border)'}}>
              <div style={{fontSize:'11px',fontWeight:700,color:'var(--slate)',textTransform:'uppercase'}}>{d.split(' ')[0]}</div>
              <div style={{fontFamily:'var(--fm)',fontSize:'10px',color:'var(--slate)',opacity:.6}}>{d.split(' ')[1]} Mar</div>
            </div>
          ))}
        </div>
        <div style={{display:'flex',borderBottom:'1px solid var(--border)',background:'var(--slate-l)'}}>
          <div style={{width:160,flexShrink:0,padding:'10px 16px',fontSize:'11.5px',color:'var(--slate)',fontWeight:600}}>Coverage</div>
          {coverage.map((p,i) => (
            <div key={i} style={{flex:1,padding:'10px 6px',textAlign:'center',borderLeft:'1px solid var(--border)'}}>
              <div style={{fontFamily:'var(--fm)',fontSize:'13px',fontWeight:700,color:covCol(p)}}>{p}%</div>
              <div style={{height:4,background:'var(--border)',borderRadius:2,margin:'4px 8px 0',overflow:'hidden'}}>
                <div style={{height:'100%',borderRadius:2,background:covCol(p),width:`${p}%`}}/>
              </div>
            </div>
          ))}
        </div>
        {staffRows.map(row => (
          <div key={row.name} style={{display:'flex',borderBottom:'1px solid var(--border)'}}>
            <div style={{width:160,flexShrink:0,padding:'10px 16px',display:'flex',alignItems:'center',gap:8}}>
              <div style={{width:22,height:22,borderRadius:6,background:row.color,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'var(--fh)',fontSize:9,fontWeight:700,color:'#fff',flexShrink:0}}>
                {row.name.split(' ').map(n=>n[0]).join('')}
              </div>
              <span style={{fontSize:'12px',fontWeight:500,color:'var(--navy)',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{row.name.split(' ')[0]}</span>
            </div>
            {row.shifts.map((count, i) => (
              <div key={i} style={{flex:1,padding:'10px 6px',textAlign:'center',borderLeft:'1px solid var(--border)',display:'flex',flexWrap:'wrap',gap:3,alignContent:'flex-start',justifyContent:'center'}}>
                {count===0
                  ? <div style={{width:'100%',textAlign:'center',fontSize:'10px',color:'var(--border)'}}>—</div>
                  : Array.from({length:count}).map((_,j) => (
                      <div key={j} style={{width:10,height:10,borderRadius:3,background:row.color,opacity:.8}}/>
                    ))
                }
              </div>
            ))}
          </div>
        ))}
      </Section>
    </div>
  );
};
