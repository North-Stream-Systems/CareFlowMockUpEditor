import { SVC_COLORS_LIST } from './common.jsx';

// ── STEP 4: Service types ────────────────────────────────────────────────────
export const Step4 = ({data, setData}) => {
  const svcs = data.svcs || [
    {id:1,name:'Personal Care',color:'#0D9488'},{id:2,name:'Medication',color:'#F59E0B'},
    {id:3,name:'Domestic',color:'#64748B'},{id:4,name:'Social Support',color:'#8B5CF6'},
  ];
  const setSvcs = s => setData({...data, svcs:s});
  const addSvc = () => setSvcs([...svcs, {id:Date.now(),name:'',color:SVC_COLORS_LIST[svcs.length%SVC_COLORS_LIST.length]}]);
  const removeSvc = id => setSvcs(svcs.filter(s=>s.id!==id));
  const updateSvc = (id, field, val) => setSvcs(svcs.map(s=>s.id===id?{...s,[field]:val}:s));
  return (
    <div>
      <div className="step-header">
        <div className="step-num">Step 4 of 9</div>
        <div className="step-title">Service types</div>
        <div className="step-desc">Service types appear on shift bars in the rota, on invoices, and in reports. The colours you choose here apply everywhere in CareFlow.</div>
      </div>
      <div className="form-section">Your service types</div>
      <div className="svc-list">
        {svcs.map(s => (
          <div key={s.id} className="svc-row">
            <input type="color" value={s.color} onChange={e=>updateSvc(s.id,'color',e.target.value)}
              style={{width:28,height:28,border:'none',padding:0,background:'none',cursor:'pointer',borderRadius:6}}/>
            <input className="svc-name-input" placeholder="Service type name" value={s.name}
              onChange={e=>updateSvc(s.id,'name',e.target.value)}/>
            <select className="field-select" style={{width:150,padding:'6px 12px',fontSize:13}} value={s.vat||''} onChange={e=>updateSvc(s.id,'vat',e.target.value)}>
              <option value="">VAT (Exempt)</option>
              <option>Standard rated</option>
              <option>Zero rated</option>
              <option>Exempt</option>
            </select>
            <button className="svc-remove" onClick={()=>removeSvc(s.id)} disabled={svcs.length<=1}>×</button>
          </div>
        ))}
      </div>
      <button className="add-row-btn" onClick={addSvc}>+ Add service type</button>
      <div style={{marginTop:20,fontSize:'13px',color:'var(--slate)',lineHeight:1.6}}>
        VAT note: most domiciliary care services are exempt under Group 7 of Schedule 9 VATA 1994. CareFlow defaults to exempt. Change individual service types here if required.
      </div>
    </div>
  );
};
