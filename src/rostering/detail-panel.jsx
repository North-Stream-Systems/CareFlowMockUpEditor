import { SVC_COLORS } from './constants.jsx';
import { durationMins } from './helpers.jsx';
import { STAFF_ROWS_DATA } from './mock-data.jsx';

// ── DETAIL PANEL ──────────────────────────────────────────────────────────────
export const DetailPanel = ({ shift, round, onClose }) => {
  if(!shift) return null;
  const svc = SVC_COLORS[shift.svc] || SVC_COLORS['Personal Care'];
  const dur = durationMins(shift.start, shift.end);
  const carer1 = round && round.carer ? round.carer : 'Unassigned';
  const carer2Staff = shift.twoHanded ? STAFF_ROWS_DATA.find(s=>s.id===shift.secondStaffId) : null;
  const carer2Name  = carer2Staff ? carer2Staff.name : (shift.twoHanded ? 'No second carer assigned' : null);
  const ruleLabel   = shift.twoHandedRule === 'both' ? 'Both carers required' : 'At least 1 carer required';
  const ruleColor   = shift.twoHandedRule === 'both' ? 'var(--red)' : 'var(--amber)';
  const ruleBg      = shift.twoHandedRule === 'both' ? 'var(--red-l)' : 'var(--amber-l)';

  return (
    <div className="detail-panel" style={{animation:'slide-in-r .22s cubic-bezier(.22,1,.36,1)'}}>
      <div className="dp-header" style={{background: svc.bg, position:'relative'}}>
        <div style={{display:'flex',alignItems:'center',gap:7,marginBottom:4}}>
          <div className="dp-title" style={{margin:0}}>{shift.client}</div>
          {shift.twoHanded && <span className="two-handed-badge" style={{background:'rgba(255,255,255,.2)',color:'#fff',border:'1px solid rgba(255,255,255,.3)'}}>👥 2-carer</span>}
        </div>
        <div className="dp-sub">{shift.svc} · {shift.start} – {shift.end} · {dur}min</div>
        <button className="dp-close" onClick={onClose}>×</button>
      </div>
      <div className="dp-body">

        {/* Two-handed section — shown first when applicable */}
        {shift.twoHanded && (
          <>
            <div className="dp-section" style={{color:'var(--purple)'}}>Double-handed call</div>
            <div style={{display:'flex',flexDirection:'column',gap:8,paddingTop:4,marginBottom:8}}>
              {/* Carer 1 */}
              <div style={{display:'flex',alignItems:'center',gap:8,padding:'8px 10px',background:'var(--slate-l)',borderRadius:8}}>
                <div style={{width:7,height:7,borderRadius:'50%',background:carer1==='Unassigned'?'var(--slate)':'var(--green)',flexShrink:0}}/>
                <div style={{flex:1}}>
                  <div style={{fontSize:'12.5px',fontWeight:600,color:'var(--navy)'}}>{carer1}</div>
                  <div style={{fontSize:'11px',color:'var(--slate)'}}>Carer 1 · Lead</div>
                </div>
                {carer1!=='Unassigned' && <span style={{fontSize:'10.5px',fontWeight:700,color:'var(--green)',background:'var(--green-l)',padding:'2px 7px',borderRadius:5}}>Assigned</span>}
              </div>
              {/* Carer 2 */}
              <div style={{display:'flex',alignItems:'center',gap:8,padding:'8px 10px',background:carer2Staff?'var(--slate-l)':'var(--red-l)',borderRadius:8,border:carer2Staff?'1px solid var(--border)':'1px solid var(--red)30'}}>
                <div style={{width:7,height:7,borderRadius:'50%',background:carer2Staff?'var(--green)':'var(--red)',flexShrink:0}}/>
                <div style={{flex:1}}>
                  <div style={{fontSize:'12.5px',fontWeight:600,color:carer2Staff?'var(--navy)':'var(--red)'}}>{carer2Name}</div>
                  <div style={{fontSize:'11px',color:'var(--slate)'}}>Carer 2 · Support</div>
                </div>
                <span style={{fontSize:'10.5px',fontWeight:700,color:carer2Staff?'var(--green)':'var(--red)',background:carer2Staff?'var(--green-l)':'var(--red-l)',padding:'2px 7px',borderRadius:5}}>
                  {carer2Staff?'Assigned':'Not assigned'}
                </span>
              </div>
              {/* Qualification rule */}
              {shift.twoHandedQual && (
                <div style={{padding:'8px 10px',borderRadius:8,background:ruleBg,border:`1px solid ${ruleColor}30`,display:'flex',alignItems:'flex-start',gap:7}}>
                  <span style={{fontSize:14,flexShrink:0}}>🎓</span>
                  <div>
                    <div style={{fontSize:'11.5px',fontWeight:700,color:ruleColor,marginBottom:2}}>{ruleLabel}</div>
                    <div style={{fontSize:'11.5px',color:'var(--text)'}}>
                      <strong>{shift.twoHandedQual}</strong>
                    </div>
                    <div style={{fontSize:'10.5px',color:'var(--slate)',marginTop:2}}>
                      {shift.twoHandedRule==='both'
                        ? 'Both carers must hold this qualification to cover this call'
                        : 'At least one carer must hold this qualification — the other can be unqualified'}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        <div className="dp-section">Visit details</div>
        {[
          ['Service',   shift.svc],
          ['Start',     shift.start],
          ['End',       shift.end],
          ['Duration',  `${dur} minutes`],
          ['Status',    shift.status],
          ['Round',     round ? round.name : '—'],
          ['Zone',      round ? round.zone : '—'],
        ].map(([l,v]) => (
          <div key={l} className="dp-row">
            <span className="dp-label">{l}</span>
            <span className="dp-val" style={{textTransform:'capitalize', color: l==='Status'&&v==='unassigned'?'var(--red)':undefined}}>{v}</span>
          </div>
        ))}
        {shift.notes && (
          <>
            <div className="dp-section">Notes</div>
            <div style={{fontSize:'12.5px',color:'var(--text)',lineHeight:1.5,paddingTop:4}}>{shift.notes}</div>
          </>
        )}
        <div className="dp-section">Compliance</div>
        <div style={{display:'flex',flexDirection:'column',gap:5,paddingTop:4}}>
          <div style={{display:'flex',alignItems:'center',gap:7,fontSize:'12px'}}>
            <div style={{width:7,height:7,borderRadius:'50%',background:'var(--green)',flexShrink:0}} />
            <span style={{color:'var(--slate)'}}>No compliance blocks</span>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:7,fontSize:'12px'}}>
            <div style={{width:7,height:7,borderRadius:'50%',background:'var(--green)',flexShrink:0}} />
            <span style={{color:'var(--slate)'}}>Min gap satisfied</span>
          </div>
          {shift.twoHanded && !carer2Staff && (
            <div style={{display:'flex',alignItems:'center',gap:7,fontSize:'12px'}}>
              <div style={{width:7,height:7,borderRadius:'50%',background:'var(--red)',flexShrink:0}} />
              <span style={{color:'var(--red)',fontWeight:600}}>Second carer not assigned</span>
            </div>
          )}
        </div>
      </div>
      <div className="dp-actions">
        <button className="btn btn-p" style={{justifyContent:'center'}}>Edit shift</button>
        {(shift.status === 'unassigned' || (shift.twoHanded && !carer2Staff)) && (
          <button className="btn btn-g" style={{justifyContent:'center'}}>Assign carer</button>
        )}
        <button className="btn btn-g" style={{justifyContent:'center',color:'var(--red)',borderColor:'var(--red-l)'}}>Remove shift</button>
      </div>
    </div>
  );
};
