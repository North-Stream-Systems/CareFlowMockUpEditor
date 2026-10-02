import { Toggle } from './common.jsx';

// ── STEP 6: Roles & permissions ──────────────────────────────────────────────
export const Step6 = ({data, setData}) => {
  const defaultRoles = [
    {id:1,name:'Registered Manager',    desc:'Full access to all modules',   on:true},
    {id:2,name:'Care Coordinator',      desc:'Rota, clients, staff, finance',on:true},
    {id:3,name:'Senior Care Worker',    desc:'Mobile app + supervision',     on:true},
    {id:4,name:'Care Worker',           desc:'Mobile app — shifts only',     on:true},
    {id:5,name:'Finance Administrator', desc:'Finance module only',          on:false},
    {id:6,name:'HR Manager',            desc:'Staff module only',            on:false},
  ];
  const roles = data.roles || defaultRoles;
  const setRoles = r => setData({...data, roles:r});
  const toggleRole = id => setRoles(roles.map(r=>r.id===id?{...r,on:!r.on}:r));
  return (
    <div>
      <div className="step-header">
        <div className="step-num">Step 6 of 9</div>
        <div className="step-title">Roles and permissions</div>
        <div className="step-desc">CareFlow uses role-based access control. Enable the roles you need — you can fine-tune individual permissions for each role in Settings later.</div>
      </div>
      <div className="form-section">Active roles</div>
      <div style={{background:'#fff',border:'1px solid var(--border)',borderRadius:12,padding:'0 16px',marginBottom:18}}>
        {roles.map(r => (
          <div key={r.id} className="toggle-row">
            <div className="toggle-info">
              <div className="toggle-name">{r.name}</div>
              <div className="toggle-sub">{r.desc}</div>
            </div>
            <Toggle on={r.on} onToggle={()=>toggleRole(r.id)}/>
          </div>
        ))}
      </div>
      <div style={{padding:'14px 16px',background:'var(--teal-l)',border:'1px solid var(--teal-m)',borderRadius:10,fontSize:'13px',color:'var(--teal)',lineHeight:1.6}}>
        The <strong>Registered Manager</strong> role is required and cannot be disabled. A full role builder is available in <strong>Settings → Users and Roles</strong> where you can create custom roles and set granular module-level permissions.
      </div>
    </div>
  );
};
