import { useEffect, useRef, useState } from 'react';
import { DATE_STR, GREET, ORG, USER } from './constants.jsx';
import { DEFAULT_WIDGETS, REGISTRY, lsLoad, lsSave } from './mock-data.jsx';
import { Sidebar, Toast } from './reusables.jsx';
import { WIDGET_MAP } from './new-widgets.jsx';
import { Library } from './library.jsx';
import { DASH_SB } from './sidebar-configs.jsx';

// ── DASHBOARD SCREEN ─────────────────────────────────────────────────────────
export const DashboardScreen = () => {
  const stored = lsLoad();
  const [ids,      setIds]      = useState(stored.ids || DEFAULT_WIDGETS);
  const [editMode, setEditMode] = useState(false);
  const [showLib,  setShowLib]  = useState(false);
  const [toast,    setToast]    = useState(null);
  const timer = useRef(null);

  useEffect(() => { lsSave({ids}); }, [ids]);

  const flash = msg => {
    setToast(msg);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(null), 2200);
  };
  const toggleWidget = id => {
    const on = ids.includes(id);
    setIds(prev => on ? prev.filter(x=>x!==id) : [...prev, id]);
    flash(on ? 'Widget removed' : `${REGISTRY.find(w=>w.id===id)?.name} added`);
  };
  const removeWidget = id => {
    setIds(prev => prev.filter(x => x!==id));
    flash('Widget removed');
  };
  const widgets = ids.map(id => REGISTRY.find(w => w.id===id)).filter(Boolean);

  return (
    <div className="mod">
      <Sidebar items={DASH_SB} active="dashboard" setActive={() => {}} />
      <div className="content">
        <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:18}}>
          <div>
            <div className="dash-greeting">{GREET}, {USER.name}</div>
            <div className="dash-meta">
              <span className="dash-date">{DATE_STR}</span>
              <span className="reg-pill">{ORG.reg}</span>
            </div>
          </div>
          <div style={{display:'flex',gap:8}}>
            <button className="btn btn-g" onClick={() => { setEditMode(true); setShowLib(true); }}>+ Add widget</button>
            <button className={`btn ${editMode?'btn-a':'btn-g'}`} onClick={() => setEditMode(e => !e)}>
              {editMode ? 'Done editing' : 'Edit layout'}
            </button>
          </div>
        </div>
        {editMode && <div className="edit-banner">Edit mode — click × on any widget to remove it</div>}
        {widgets.length > 0 ? (
          <div className="wgrid">
            {widgets.map(cfg => {
              const Comp = WIDGET_MAP[cfg.id];
              return Comp ? <Comp key={cfg.id} cfg={cfg} editMode={editMode} onRemove={removeWidget} /> : null;
            })}
          </div>
        ) : (
          <div className="empty-dash">
            <div className="big">📊</div>
            <h2>Your dashboard is empty</h2>
            <p>Add widgets to build your personal operational view</p>
            <button className="btn btn-p" onClick={() => { setEditMode(true); setShowLib(true); }}>+ Add your first widget</button>
          </div>
        )}
      </div>
      {showLib && <Library activeIds={ids} onClose={() => setShowLib(false)} onToggle={toggleWidget} />}
      <Toast msg={toast} />
    </div>
  );
};
