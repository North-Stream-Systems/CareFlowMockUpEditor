// ── STEP 7: Invite team ──────────────────────────────────────────────────────
export const Step7 = ({data, setData}) => {
  const defaultStaff = [
    {id:1,name:'',email:'',role:'Care Coordinator'},
    {id:2,name:'',email:'',role:'Care Worker'},
    {id:3,name:'',email:'',role:'Care Worker'},
  ];
  const staff = data.invites || defaultStaff;
  const setStaff = s => setData({...data, invites:s});
  const addRow = () => setStaff([...staff, {id:Date.now(),name:'',email:'',role:'Care Worker'}]);
  const removeRow = id => setStaff(staff.filter(s=>s.id!==id));
  const updateRow = (id,field,val) => setStaff(staff.map(s=>s.id===id?{...s,[field]:val}:s));
  return (
    <div>
      <div className="step-header">
        <div className="step-num">Step 7 of 8</div>
        <div className="step-title">Invite your team</div>
        <div className="step-desc">Add your team here or skip and do it later. Each person will receive an email with a secure link to set their own password. Care workers will be directed to the CareFlow mobile app.</div>
      </div>
      <div style={{display:'flex',gap:8,marginBottom:18}}>
        <button className="btn btn-g" style={{fontSize:13}}>📄 Import from CSV</button>
        <button className="btn btn-g" style={{fontSize:13}}>Skip — invite later</button>
      </div>
      <div style={{background:'#fff',border:'1px solid var(--border)',borderRadius:12,overflow:'hidden',marginBottom:10}}>
        <table className="import-table">
          <thead>
            <tr>
              <th>Full name</th>
              <th>Email address</th>
              <th>Role</th>
              <th style={{width:40}}></th>
            </tr>
          </thead>
          <tbody>
            {staff.map(s => (
              <tr key={s.id}>
                <td><input className="import-table input" placeholder="Name" value={s.name} onChange={e=>updateRow(s.id,'name',e.target.value)}/></td>
                <td><input className="import-table input" placeholder="email@org.co.uk" value={s.email} onChange={e=>updateRow(s.id,'email',e.target.value)}/></td>
                <td>
                  <select style={{border:'none',outline:'none',fontFamily:'var(--fb)',fontSize:13,color:'var(--text)',background:'transparent',width:'100%',cursor:'pointer'}} value={s.role} onChange={e=>updateRow(s.id,'role',e.target.value)}>
                    <option>Registered Manager</option>
                    <option>Care Coordinator</option>
                    <option>Senior Care Worker</option>
                    <option>Care Worker</option>
                    <option>Finance Administrator</option>
                  </select>
                </td>
                <td><button style={{background:'none',border:'none',color:'var(--slate)',cursor:'pointer',fontSize:16,opacity:.4}} onClick={()=>removeRow(s.id)}>×</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="add-row-btn" onClick={addRow}>+ Add team member</button>
    </div>
  );
};
