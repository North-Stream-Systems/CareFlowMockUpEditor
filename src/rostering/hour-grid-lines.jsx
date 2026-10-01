import { HOUR_W, START_HOUR } from './constants.jsx';
import { HOURS } from './mock-data.jsx';

// ── HOUR GRID LINES ───────────────────────────────────────────────────────────
export const GridLines = () => (
  <>
    {HOURS.map(h => (
      <div key={h} className="hour-line" style={{left: (h - START_HOUR) * HOUR_W}} />
    ))}
    {HOURS.slice(0,-1).map(h => (
      <div key={`h${h}`} className="hour-line half" style={{left: (h - START_HOUR) * HOUR_W + HOUR_W/2}} />
    ))}
  </>
);
