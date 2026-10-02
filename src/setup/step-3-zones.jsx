import { SVC_COLORS_LIST } from './common.jsx';

// ── STEP 3: Zones ────────────────────────────────────────────────────────────
export const Step3 = ({data, setData}) => {
  const zones = data.zones || [{id:1,name:'North',color:'#0D9488'},{id:2,name:'Central',color:'#3B82F6'},{id:3,name:'South',color:'#8B5CF6'}];
  const setZones = z => setData({...data, zones:z});
  const addZone = () => setZones([...zones, {id:Date.now(),name:'',color:SVC_COLORS_LIST[zones.length%SVC_COLORS_LIST.length]}]);
  const removeZone = id => setZones(zones.filter(z=>z.id!==id));
  const updateZone = (id, field, val) => setZones(zones.map(z=>z.id===id?{...z,[field]:val}:z));
  return (
    <div>
      <div className="step-header">
        <div className="step-num">Step 3 of 9</div>
        <div className="step-title">Service zones</div>
        <div className="step-desc">Zones group clients and staff geographically. Shifts, rounds, and compliance reports can all be filtered by zone. You can add or edit zones at any time.</div>
      </div>
      <div className="form-section">Your zones</div>
      <div className="svc-list">
        {zones.map(z => (
          <div key={z.id} className="svc-row">
            <input type="color" value={z.color} onChange={e=>updateZone(z.id,'color',e.target.value)}
              style={{width:28,height:28,border:'none',padding:0,background:'none',cursor:'pointer',borderRadius:6}}/>
            <input className="svc-name-input" placeholder="Zone name e.g. North" value={z.name}
              onChange={e=>updateZone(z.id,'name',e.target.value)}/>
            <select className="field-select" style={{width:160,padding:'6px 12px',fontSize:13}} value={z.type||''} onChange={e=>updateZone(z.id,'type',e.target.value)}>
              <option value="">Type (optional)</option>
              <option>Urban</option><option>Rural</option><option>Mixed</option>
            </select>
            <button className="svc-remove" onClick={()=>removeZone(z.id)} disabled={zones.length<=1}>×</button>
          </div>
        ))}
      </div>
      <button className="add-row-btn" onClick={addZone}>+ Add another zone</button>
      <div style={{marginTop:24,padding:'14px 16px',background:'var(--amber-l)',border:'1px solid var(--amber)',borderRadius:10,fontSize:'13px',color:'#92400E',lineHeight:1.6}}>
        <strong>Tip:</strong> Keep zones broad — most providers use 2–4. Fine-grained geography is handled at the round/route level within each zone.
      </div>
    </div>
  );
};
