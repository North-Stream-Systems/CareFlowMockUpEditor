import { SVC_COLORS } from './constants.jsx';
import { durationMins, durationW, timeToX } from './helpers.jsx';

// ── SHIFT BAR ─────────────────────────────────────────────────────────────────
export const ShiftBar = ({ shift, isDragging, dragX, onMouseDown, onClick }) => {
  const svc    = SVC_COLORS[shift.svc] || SVC_COLORS['Personal Care'];
  const isUnass = shift.status === 'unassigned';

  const baseLeft = timeToX(shift.start);
  const left = isDragging ? dragX : baseLeft;
  const width = Math.max(durationW(shift.start, shift.end) - 4, 30);

  const dur = durationMins(shift.start, shift.end);
  const showTime = width > 70;
  const showFull = width > 110;

  return (
    <div
      className={`shift-bar${isDragging ? ' dragging' : ''}${isUnass ? ' unassigned-bar' : ''}`}
      style={{
        left:    left + 2,
        width:   width,
        background: isUnass ? 'transparent' : svc.bg,
        borderColor: shift.twoHanded ? 'var(--purple)' : svc.bg,
        color:  isUnass ? svc.bg : svc.fg,
        boxShadow: isDragging ? '0 8px 24px rgba(0,0,0,.25)' : shift.twoHanded ? `0 0 0 1.5px var(--purple)` : undefined,
      }}
      onMouseDown={e => { e.stopPropagation(); onMouseDown(e, shift); }}
      onClick={e  => { e.stopPropagation(); if(!isDragging) onClick(shift); }}
    >
      {shift.twoHanded && <div className="two-handed-link"/>}
      {showFull && (
        <div className="sb-svc-dot" style={{background: isUnass ? svc.bg : 'rgba(255,255,255,.5)', border: isUnass ? `2px solid ${svc.bg}` : 'none'}} />
      )}
      <span className="sb-client" style={{fontSize: width < 80 ? 10 : 11}}>
        {width < 60 ? '' : shift.client.split(' ').slice(-1)[0]}
        {showFull ? ` — ${shift.client.split(' ')[0]} ${shift.client.split(' ')[1]}`.replace(' — Mrs','').replace(' — Mr','').replace(' — Miss','') : ''}
      </span>
      {showTime && (
        <span className="sb-time">{shift.start}</span>
      )}
      {shift.twoHanded && width > 50 && (
        <span style={{position:'absolute',top:2,right:3,fontSize:10,opacity:.85}}>👥</span>
      )}
    </div>
  );
};
