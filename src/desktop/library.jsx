import { REGISTRY } from './mock-data.jsx';

// ── LIBRARY ──────────────────────────────────────────────────────────────────
export const Library = ({activeIds, onClose, onToggle}) => {
  const cats = [...new Set(REGISTRY.map(w => w.cat))];
  return (
    <>
      <div className="overlay" onClick={onClose} />
      <div className="lib">
        <div className="lib-hd">
          <div>
            <div className="lib-title">Widget Library</div>
            <div className="lib-sub">Build your personal dashboard</div>
          </div>
          <button className="lib-x" onClick={onClose}>×</button>
        </div>
        <div className="lib-body">
          {cats.map(cat => (
            <div key={cat}>
              <div className="lib-cat">{cat}</div>
              {REGISTRY.filter(w => w.cat===cat).map(w => {
                const on = activeIds.includes(w.id);
                return (
                  <div key={w.id} className={`lib-item ${on?'on':'off'}`} onClick={() => onToggle(w.id)}>
                    <span className="lib-ico">{w.icon}</span>
                    <div>
                      <div className="lib-name">{w.name}</div>
                      <div className="lib-src">{w.src}{w.arrow?' · Time Arrow':''}</div>
                    </div>
                    <span className={`lib-tog ${on?'on':'off'}`}>{on?'Active':'+ Add'}</span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
