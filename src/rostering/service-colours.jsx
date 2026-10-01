import { useState } from 'react';
import { Section, Toggle } from './shared-page-wrapper.jsx';

// ── SERVICE COLOURS ────────────────────────────────────────────────────────────
export const ServiceColours = () => {
  const SWATCHES = ['#0D9488','#3B82F6','#8B5CF6','#F59E0B','#10B981','#EC4899','#64748B','#DC2626','#0D1F3C','#F97316'];
  const [services, setServices] = useState([
    {id:'pc', name:'Personal Care',   color:'#0D9488', active:true,  qualRule:'both', qual:'Manual Handling' },
    {id:'me', name:'Medication',      color:'#F59E0B', active:true,  qualRule:'both', qual:'Medication Administration' },
    {id:'do', name:'Domestic',        color:'#64748B', active:true,  qualRule:'one',  qual:'Manual Handling' },
    {id:'ss', name:'Social Support',  color:'#8B5CF6', active:true,  qualRule:'one',  qual:null },
    {id:'cc', name:'Complex Care',    color:'#3B82F6', active:true,  qualRule:'both', qual:'Moving and Handling (Hoist)' },
    {id:'nv', name:'Night Visit',     color:'#0D1F3C', active:false, qualRule:'both', qual:'Manual Handling' },
  ]);
  const [editing, setEditing] = useState(null);

  return (
    <div style={{padding:'20px 24px'}}>
      <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:18}}>
        <div>
          <div style={{fontFamily:'var(--fh)',fontSize:21,fontWeight:700,color:'var(--navy)',letterSpacing:'-.3px'}}>Service Colours</div>
          <div style={{fontSize:'12.5px',color:'var(--slate)',marginTop:2}}>Colours apply to shift bars on the gantt and all reports</div>
        </div>
        <button className="btn btn-p btn-sm">+ Add service type</button>
      </div>

      <div style={{maxWidth:700}}>
        <Section title="Service types — colour and double-handed qualification rule">
          {services.map(svc => (
            <div key={svc.id} style={{display:'flex',flexDirection:'column',borderBottom:'1px solid var(--border)'}}>
              <div style={{display:'flex',alignItems:'center',gap:12,padding:'12px 16px'}}>
                {/* Colour swatch */}
                <div
                  onClick={() => setEditing(editing===svc.id?null:svc.id)}
                  style={{width:32,height:32,borderRadius:8,background:svc.color,cursor:'pointer',flexShrink:0,boxShadow:'0 2px 4px rgba(0,0,0,.15)',border:editing===svc.id?'2px solid var(--navy)':'2px solid transparent',transition:'border .15s'}}
                />
                <div style={{flex:1}}>
                  <div style={{fontSize:'13px',fontWeight:600,color:svc.active?'var(--navy)':'var(--slate)'}}>{svc.name}</div>
                  <div style={{fontFamily:'var(--fm)',fontSize:'10.5px',color:'var(--slate)',marginTop:2}}>{svc.color.toUpperCase()}</div>
                  {editing===svc.id && (
                    <div style={{display:'flex',gap:6,marginTop:8,flexWrap:'wrap'}}>
                      {SWATCHES.map(c => (
                        <div key={c}
                          onClick={() => { setServices(prev=>prev.map(s=>s.id===svc.id?{...s,color:c}:s)); setEditing(null); }}
                          style={{width:24,height:24,borderRadius:6,background:c,cursor:'pointer',border:svc.color===c?'2px solid var(--navy)':'2px solid transparent',transition:'border .1s'}}
                        />
                      ))}
                    </div>
                  )}
                </div>
                <Toggle on={svc.active}/>
                <div style={{padding:'4px 10px',borderRadius:6,background:svc.color,color:'#fff',fontSize:'10.5px',fontWeight:600}}>Preview</div>
              </div>
              {/* Qualification rule row */}
              <div style={{display:'flex',alignItems:'flex-start',gap:10,padding:'8px 16px 12px 60px',background:'var(--slate-l)',borderTop:'1px dashed var(--border)'}}>
                <span style={{fontSize:14,marginTop:1}}>🎓</span>
                <div style={{flex:1}}>
                  <div style={{fontSize:'11.5px',fontWeight:600,color:'var(--navy)',marginBottom:5}}>
                    Double-handed qualification rule
                    {svc.qual && <span style={{fontSize:'11px',fontWeight:400,color:'var(--slate)',marginLeft:6}}>— {svc.qual}</span>}
                  </div>
                  <div style={{display:'flex',gap:7}}>
                    {[
                      {val:'both', label:'Both carers must hold', desc:'Stricter — cover harder to find', color:'var(--red)'},
                      {val:'one',  label:'At least 1 must hold',  desc:'Flexible — easier to cover',      color:'var(--amber)'},
                      {val:'none', label:'No requirement',        desc:'Any carer can cover',              color:'var(--green)'},
                    ].map(opt=>(
                      <button key={opt.val}
                        onClick={()=>setServices(prev=>prev.map(s=>s.id===svc.id?{...s,qualRule:opt.val}:s))}
                        style={{
                          flex:1,padding:'7px 8px',borderRadius:8,cursor:'pointer',transition:'all .15s',
                          border:`1.5px solid ${svc.qualRule===opt.val?opt.color:'var(--border)'}`,
                          background:svc.qualRule===opt.val?`${opt.color}15`:'#fff',
                          textAlign:'center',
                        }}>
                        <div style={{fontSize:'11.5px',fontWeight:700,color:svc.qualRule===opt.val?opt.color:'var(--slate)'}}>{opt.label}</div>
                        <div style={{fontSize:'10px',color:'var(--slate)',marginTop:2}}>{opt.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Section>
        <div style={{padding:'12px 16px',background:'var(--teal-l)',border:'1px solid var(--teal-m)',borderRadius:10,fontSize:'12.5px',color:'var(--teal)',marginTop:4}}>
          The qualification rule applies when arranging cover for double-handed calls. <strong>At least 1 must hold</strong> means the second carer slot can be filled by anyone — making cover much easier to arrange.
        </div>
      </div>
    </div>
  );
};
