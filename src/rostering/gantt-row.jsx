import { TOTAL_W } from './constants.jsx';
import { GridLines } from './hour-grid-lines.jsx';
import { ShiftBar } from './shift-bar.jsx';

// ── GANTT ROW ─────────────────────────────────────────────────────────────────
export const GanttRow = ({ label, sub, subColor, dotColor, isUnassigned, rowShifts, dragState, onShiftMouseDown, onShiftClick, onRowMouseMove, onRowMouseUp }) => {
  return (
    <div className="gantt-row">
      <div className="gantt-row-label">
        <div className="row-label-name" style={{color: isUnassigned ? 'var(--red)' : undefined}}>{label}</div>
        <div className="row-label-sub">
          {dotColor && <div className="carer-dot" style={{background: dotColor}} />}
          <span className={isUnassigned ? 'row-label-unassigned' : ''}>{sub}</span>
        </div>
      </div>
      <div
        className="gantt-row-track"
        style={{width: TOTAL_W}}
        onMouseMove={onRowMouseMove}
        onMouseUp={onRowMouseUp}
      >
        <div className="gantt-row-bg" />
        <GridLines />
        {rowShifts.map(shift => {
          const isDragging = dragState && dragState.shiftId === shift.id;
          const dragX      = isDragging ? dragState.currentX : null;
          return (
            <ShiftBar
              key={shift.id}
              shift={shift}
              isDragging={isDragging}
              dragX={dragX}
              onMouseDown={onShiftMouseDown}
              onClick={onShiftClick}
            />
          );
        })}
      </div>
    </div>
  );
};
