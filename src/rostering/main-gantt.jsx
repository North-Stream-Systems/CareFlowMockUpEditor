import { useCallback, useEffect, useRef, useState } from 'react';
import { HOUR_W, START_HOUR, SVC_COLORS, TOTAL_W } from './constants.jsx';
import { durationMins, minsToTime, nowX, snapMins, timeToMins, timeToX, xToMins } from './helpers.jsx';
import { CLIENT_ROWS_DATA, HOURS, INIT_SHIFTS, ROUNDS_DATA, STAFF_ROWS_DATA, UNASSIGNED_VISITS, formatDate } from './mock-data.jsx';
import { Sidebar } from './sidebar.jsx';
import { DetailPanel } from './detail-panel.jsx';
import { UnassignedPanel } from './unassigned-panel.jsx';
import { GanttRow } from './gantt-row.jsx';

// ── MAIN GANTT ────────────────────────────────────────────────────────────────
export const Gantt = ({ activePage, setActivePage }) => {
  const [view,       setView]       = useState('rounds');  // rounds | staff | client
  const [date,       setDate]       = useState(new Date());
  const [shifts,     setShifts]     = useState(INIT_SHIFTS);
  const [selected,   setSelected]   = useState(null);
  const [dragState,  setDragState]  = useState(null);
  const [tooltip,    setTooltip]    = useState(null);
  const [zoneFilter, setZoneFilter] = useState('All');
  const ganttRef = useRef(null);

  // Advance date
  const prevDay = () => { const d = new Date(date); d.setDate(d.getDate()-1); setDate(d); };
  const nextDay = () => { const d = new Date(date); d.setDate(d.getDate()+1); setDate(d); };

  // Drag handlers
  const handleShiftMouseDown = useCallback((e, shift) => {
    e.preventDefault();
    const rect = e.currentTarget.closest('.gantt-row-track').getBoundingClientRect();
    const offsetX = e.clientX - rect.left - timeToX(shift.start);
    setDragState({
      shiftId: shift.id,
      offsetX,
      currentX: timeToX(shift.start),
      startTime: shift.start,
      newStart: shift.start,
    });
  }, []);

  const handleMouseMove = useCallback((e) => {
    if(!dragState) return;
    const track = ganttRef.current?.querySelector('.gantt-row-track');
    if(!track) return;
    const rect = track.getBoundingClientRect();
    const rawX = e.clientX - rect.left - dragState.offsetX;
    const clampedX = Math.max(0, Math.min(rawX, TOTAL_W - 40));
    const rawMins  = xToMins(clampedX);
    const snapped  = snapMins(rawMins);
    const snappedX = (snapped - START_HOUR * 60) / 60 * HOUR_W;
    setDragState(prev => ({...prev, currentX: snappedX, newStart: minsToTime(snapped)}));
    setTooltip({ x: e.clientX + 14, y: e.clientY - 10, time: minsToTime(snapped) });
  }, [dragState]);

  const handleMouseUp = useCallback(() => {
    if(!dragState) { setTooltip(null); return; }
    const shift = shifts.find(s => s.id === dragState.shiftId);
    if(shift && dragState.newStart !== shift.start) {
      const dur  = durationMins(shift.start, shift.end);
      const newS = dragState.newStart;
      const newE = minsToTime(timeToMins(newS) + dur);
      setShifts(prev => prev.map(s => s.id === shift.id ? {...s, start:newS, end:newE} : s));
    }
    setDragState(null);
    setTooltip(null);
  }, [dragState, shifts]);

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseUp, handleMouseMove]);

  const selectedShift = selected ? shifts.find(s => s.id === selected) : null;
  const selectedRound = selectedShift ? ROUNDS_DATA.find(r => r.id === selectedShift.roundId) : null;

  // Now line
  const nX = nowX();
  const showNow = nX >= 0 && nX <= TOTAL_W;

  // Filter zones
  const filteredRounds  = zoneFilter === 'All' ? ROUNDS_DATA : ROUNDS_DATA.filter(r => r.zone === zoneFilter);
  const filteredStaff   = zoneFilter === 'All' ? STAFF_ROWS_DATA : STAFF_ROWS_DATA.filter(r => r.zone === zoneFilter);
  const filteredClients = CLIENT_ROWS_DATA;

  return (
    <div className="app" onMouseMove={handleMouseMove}>
      <Sidebar active={activePage} setActive={setActivePage} />
      <div className="main">

        {/* Toolbar */}
        <div className="toolbar">
          <div className="toolbar-left">
            <div className="date-nav">
              <button className="date-nav-btn" onClick={prevDay}>&#8249;</button>
              <div className="date-nav-label">{formatDate(date)}</div>
              <button className="date-nav-btn" onClick={nextDay}>&#8250;</button>
            </div>
            <button className="btn btn-g btn-sm" onClick={() => setDate(new Date())}>Today</button>
            <div className="view-toggle">
              {[['rounds','Rounds'],['staff','Staff'],['client','Client']].map(([id,label]) => (
                <button key={id} className={`vt-btn${view===id?' on':''}`} onClick={() => setView(id)}>{label}</button>
              ))}
            </div>
            <select className="filter-sel" value={zoneFilter} onChange={e => setZoneFilter(e.target.value)}>
              {['All','North','Central','South'].map(z => <option key={z}>{z}{z!=='All'?' Zone':''}</option>)}
            </select>
          </div>
          <div className="toolbar-right">
            <div className="live-dot" title="Live" />
            <button className="btn btn-g btn-sm">+ Add shift</button>
            <button className="btn btn-g btn-sm">Draft (4)</button>
            <button className="btn publish-btn btn-sm">Publish rota</button>
          </div>
        </div>

        {/* Service legend */}
        <div className="svc-legend">
          {Object.entries(SVC_COLORS).map(([name, col]) => (
            <div key={name} className="svc-legend-item">
              <div className="svc-swatch" style={{background:col.bg}} />
              <span>{name}</span>
            </div>
          ))}
          <div className="svc-legend-item" style={{marginLeft:'auto'}}>
            <div className="svc-swatch" style={{background:'transparent',border:'1.5px dashed var(--slate)'}} />
            <span>Unassigned</span>
          </div>
        </div>

        {/* Gantt + panels */}
        <div className="gantt-wrap" ref={ganttRef}>
          <div className="gantt-scroll">
            {/* Time header */}
            <div className="gantt-header">
              <div className="gantt-header-label">
                {view==='rounds' ? 'Round / Carer' : view==='staff' ? 'Staff Member' : 'Client'}
              </div>
              <div className="gantt-header-times" style={{width: TOTAL_W, flexShrink:0}}>
                {HOURS.map(h => (
                  <div key={h} className={`time-cell${h%2===0?' major':''}`}
                    style={{width: HOUR_W, position:'absolute', left:(h-START_HOUR)*HOUR_W}}>
                    {String(h).padStart(2,'0')}:00
                  </div>
                ))}
              </div>
            </div>

            {/* Rows */}
            <div className="gantt-rows">
              {view === 'rounds' && filteredRounds.map(round => {
                const rowShifts = shifts.filter(s => s.roundId === round.id);
                const sc = {assigned:'green',unassigned:'red',partial:'partial'}[round.status]||'slate';
                return (
                  <GanttRow
                    key={round.id}
                    label={
                      <span style={{display:'flex',alignItems:'center',gap:6}}>
                        {round.name}
                        <span className={`tag t-${sc}`} style={{fontSize:9,padding:'1px 5px'}}>{round.status}</span>
                      </span>
                    }
                    sub={round.carer || 'No carer assigned'}
                    subColor={round.status === 'unassigned' ? null : round.carerColor}
                    dotColor={round.carerColor}
                    isUnassigned={round.status === 'unassigned'}
                    rowShifts={rowShifts}
                    dragState={dragState}
                    onShiftMouseDown={handleShiftMouseDown}
                    onShiftClick={id => setSelected(s => s===id?null:id)}
                    onRowMouseMove={handleMouseMove}
                    onRowMouseUp={handleMouseUp}
                  />
                );
              })}

              {view === 'staff' && filteredStaff.map(staff => {
                const rowShifts = shifts.filter(s => s.staffId === staff.id);
                return (
                  <GanttRow
                    key={staff.id}
                    label={staff.name}
                    sub={`${staff.role} · ${staff.zone}`}
                    dotColor={staff.color}
                    isUnassigned={false}
                    rowShifts={rowShifts}
                    dragState={dragState}
                    onShiftMouseDown={handleShiftMouseDown}
                    onShiftClick={id => setSelected(s => s===id?null:id)}
                    onRowMouseMove={handleMouseMove}
                    onRowMouseUp={handleMouseUp}
                  />
                );
              })}

              {view === 'client' && filteredClients.map(client => {
                const rowShifts = shifts.filter(s => s.clientId === client.id);
                return (
                  <GanttRow
                    key={client.id}
                    label={client.name}
                    sub={`${client.zone} Zone · ${client.svc}`}
                    dotColor={SVC_COLORS[client.svc]?.bg}
                    isUnassigned={false}
                    rowShifts={rowShifts}
                    dragState={dragState}
                    onShiftMouseDown={handleShiftMouseDown}
                    onShiftClick={id => setSelected(s => s===id?null:id)}
                    onRowMouseMove={handleMouseMove}
                    onRowMouseUp={handleMouseUp}
                  />
                );
              })}

              {/* Now line overlay */}
              {showNow && (
                <div style={{position:'absolute',top:0,bottom:0,left:220+nX,width:2,background:'var(--red)',opacity:.6,pointerEvents:'none',zIndex:10}}>
                  <div style={{position:'absolute',top:0,left:-4,width:10,height:10,background:'var(--red)',borderRadius:'50%',opacity:.8}} />
                </div>
              )}
            </div>
          </div>

          {/* Unassigned panel */}
          <UnassignedPanel visits={UNASSIGNED_VISITS} />

          {/* Detail panel */}
          {selectedShift && (
            <DetailPanel
              shift={selectedShift}
              round={selectedRound}
              onClose={() => setSelected(null)}
            />
          )}
        </div>
      </div>

      {/* Drag tooltip */}
      {tooltip && dragState && (
        <div className="drag-tooltip" style={{left: tooltip.x, top: tooltip.y}}>
          {tooltip.time}
        </div>
      )}
    </div>
  );
};
