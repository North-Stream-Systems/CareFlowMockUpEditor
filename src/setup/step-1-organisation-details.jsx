// ── STEP 1: Organisation details ─────────────────────────────────────────────
export const Step1 = ({data, setData}) => (
  <div>
    <div className="step-header">
      <div className="step-num">Step 1 of 8</div>
      <div className="step-title">Organisation details</div>
      <div className="step-desc">Tell us about your care organisation. This information will appear on invoices, reports, and all regulatory documentation.</div>
    </div>
    <div className="form-section">Organisation</div>
    <div className="form-row">
      <div className="field-group">
        <label className="field-label">Organisation name</label>
        <input className="field-input" placeholder="e.g. Aber Care Services Ltd" value={data.name||''} onChange={e=>setData({...data,name:e.target.value})}/>
      </div>
      <div className="field-group">
        <label className="field-label">Trading name (if different)</label>
        <input className="field-input" placeholder="e.g. Aber Care" value={data.trading||''} onChange={e=>setData({...data,trading:e.target.value})}/>
      </div>
    </div>
    <div className="form-row triple">
      <div className="field-group">
        <label className="field-label">Companies House number</label>
        <input className="field-input" placeholder="12345678" style={{fontFamily:'var(--fm)'}} value={data.company||''} onChange={e=>setData({...data,company:e.target.value})}/>
      </div>
      <div className="field-group">
        <label className="field-label">Organisation type</label>
        <select className="field-select" value={data.type||''} onChange={e=>setData({...data,type:e.target.value})}>
          <option value="">Select...</option>
          <option>Limited Company</option>
          <option>Sole Trader</option>
          <option>Partnership</option>
          <option>CIC</option>
          <option>Charity</option>
          <option>NHS Provider</option>
        </select>
      </div>
      <div className="field-group">
        <label className="field-label">Established year</label>
        <input className="field-input" placeholder="e.g. 2019" style={{fontFamily:'var(--fm)'}} value={data.year||''} onChange={e=>setData({...data,year:e.target.value})}/>
      </div>
    </div>
    <div className="form-section">Registered address</div>
    <div className="form-row single">
      <div className="field-group">
        <label className="field-label">Address line 1</label>
        <input className="field-input" placeholder="Building / street" value={data.addr1||''} onChange={e=>setData({...data,addr1:e.target.value})}/>
      </div>
    </div>
    <div className="form-row">
      <div className="field-group">
        <label className="field-label">Town / city</label>
        <input className="field-input" placeholder="e.g. Conwy" value={data.city||''} onChange={e=>setData({...data,city:e.target.value})}/>
      </div>
      <div className="field-group">
        <label className="field-label">Postcode</label>
        <input className="field-input" placeholder="e.g. LL32 8AA" style={{fontFamily:'var(--fm)',textTransform:'uppercase'}} value={data.postcode||''} onChange={e=>setData({...data,postcode:e.target.value})}/>
      </div>
    </div>
    <div className="form-row">
      <div className="field-group">
        <label className="field-label">Main phone number</label>
        <input className="field-input" placeholder="01492 ..." value={data.phone||''} onChange={e=>setData({...data,phone:e.target.value})}/>
      </div>
      <div className="field-group">
        <label className="field-label">Main email address</label>
        <input className="field-input" placeholder="info@yourorg.co.uk" value={data.email||''} onChange={e=>setData({...data,email:e.target.value})}/>
      </div>
    </div>
  </div>
);
