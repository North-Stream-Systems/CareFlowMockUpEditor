// ── WIDGET SHELL ────────────────────────────────────────────────────────────
export const W = ({id, icon, name, src, col, editMode, onRemove, badge, bc='red', footer, children}) => (
  <div className={`widget wc${col}${editMode?' em':''}`}>
    <div className="widget-hd">
      <span className="widget-ico">{icon}</span>
      <div className="widget-tg">
        <div className="widget-title">{name}</div>
        <div className="widget-src">{src}</div>
      </div>
      {badge != null && <span className={`wbadge wb-${bc}`}>{badge}</span>}
      <div className="live" />
      <span className="wts">2m ago</span>
      {editMode && <button className="wx" onClick={() => onRemove(id)}>x</button>}
    </div>
    <div className="widget-body">{children}</div>
    {footer && (
      <div className="widget-ft">
        <span>{footer}</span>
        <span className="flink" style={{fontSize:11}}>View all</span>
      </div>
    )}
  </div>
);
