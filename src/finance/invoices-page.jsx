import { useRef, useState } from 'react';
import { FUNDERS, INVOICES, fmt } from './mock-data.jsx';
import { InvoicePanel } from './invoice-detail-panel.jsx';

// ── INVOICES PAGE ─────────────────────────────────────────────────────────────
export const InvoicesPage = ({ initialOpen }) => {
  const [statusFil, setStatusFil]   = useState('All');
  const [openInv,   setOpenInv]     = useState(initialOpen || 'INV-00421');
  const [showCredit,setShowCredit]  = useState(false);
  const [toast,     setToast]       = useState(null);
  const timer = useRef(null);

  const flash = msg => {
    setToast(msg);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(null), 2800);
  };

  const counts = {
    All:      INVOICES.length,
    Draft:    INVOICES.filter(i=>i.status==='draft').length,
    Reviewed: INVOICES.filter(i=>i.status==='reviewed').length,
    Sent:     INVOICES.filter(i=>i.status==='sent').length,
    Overdue:  INVOICES.filter(i=>i.status==='overdue').length,
    Paid:     INVOICES.filter(i=>i.status==='paid').length,
  };

  const filtered = INVOICES.filter(i => statusFil==='All' || i.status===statusFil.toLowerCase());
  const selected = openInv ? INVOICES.find(i => i.id===openInv) : null;

  const stCol = s => ({ draft:'amber', reviewed:'teal', sent:'navy', overdue:'red', paid:'green' }[s]||'slate');
  const stLabel = s => ({ reviewed:'Ready to send' }[s]||s);

  return (
    <>
      <div className="ph">
        <div>
          <div className="ph-title">Invoices</div>
          <div className="ph-sub">{counts.Draft + counts.Reviewed} drafts · £{(4872.50+2341.75+1104.00).toLocaleString()} total pending · £4,611 overdue</div>
        </div>
        <div className="ph-actions">
          <button className="btn btn-g btn-sm">Export CSV</button>
          <button className="btn btn-p btn-sm">Run billing</button>
        </div>
      </div>

      <div className="fbar">
        <div className="stabs">
          {['All','Draft','Reviewed','Overdue','Paid'].map(s => (
            <button key={s} className={`stab${statusFil===s?' on':''}`} onClick={() => setStatusFil(s)}>
              {s} <span style={{ fontFamily:'var(--fm)', fontSize:10, opacity:.65 }}>({counts[s]||0})</span>
            </button>
          ))}
        </div>
        <select className="sel" style={{ fontSize:'12px' }}>
          <option>All funders</option>
          {FUNDERS.map(f => <option key={f.id}>{f.name}</option>)}
        </select>
      </div>

      <div className="tbl" style={{ marginBottom: selected ? 0 : 0 }}>
        <table>
          <thead>
            <tr>
              <th>Invoice</th><th>Funder</th><th>Billing period</th>
              <th className="r">Lines</th><th className="r">Total</th>
              <th>Status</th><th>Due date</th><th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(inv => (
              <tr key={inv.id} onClick={() => setOpenInv(openInv===inv.id ? null : inv.id)}
                style={{ background: openInv===inv.id ? 'var(--teal-l)' : undefined }}>
                <td style={{ fontFamily:'var(--fm)', fontSize:'12px', fontWeight:600, color:'var(--navy)' }}>{inv.id}</td>
                <td style={{ fontSize:'12.5px' }}>{inv.funder}</td>
                <td style={{ fontSize:'12px', color:'var(--slate)' }}>{inv.period}</td>
                <td className="r" style={{ fontFamily:'var(--fm)', fontSize:'12px', color:'var(--slate)' }}>{inv.lines}</td>
                <td className="r" style={{ fontFamily:'var(--fm)', fontSize:'13px', fontWeight:600, color:'var(--navy)' }}>{fmt(inv.total)}</td>
                <td><span className={`tag t-${stCol(inv.status)}`} style={{ textTransform:'capitalize' }}>{stLabel(inv.status)}</span></td>
                <td style={{ fontFamily:'var(--fm)', fontSize:'11.5px', color: inv.status==='overdue' ? 'var(--red)' : 'var(--slate)', fontWeight: inv.status==='overdue'?700:400 }}>{inv.due}</td>
                <td style={{ textAlign:'right' }}><span style={{ fontSize:'12px', color:'var(--teal)', fontWeight:500, cursor:'pointer' }}>Review</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && (
        <InvoicePanel
          invoice={selected}
          onClose={() => setOpenInv(null)}
          onSend={inv => { setOpenInv(null); flash(`${inv.id} sent to ${inv.funder.split(' ')[0]}`); }}
          onCredit={inv => setShowCredit(inv)}
        />
      )}

      {showCredit && (
        <div className="modal-overlay" onClick={e => { if(e.target===e.currentTarget) setShowCredit(false); }}>
          <div className="modal">
            <div className="modal-hd">
              <div>
                <div className="modal-title">Raise Credit Note</div>
                <div style={{ fontSize:'11.5px', color:'var(--slate)', marginTop:2 }}>Against {showCredit.id} — {showCredit.funder}</div>
              </div>
              <button className="modal-x" onClick={() => setShowCredit(false)}>×</button>
            </div>
            <div className="modal-body">
              {[['Originating invoice', showCredit.id], ['Funder', showCredit.funder], ['Credit type', 'Missed visit / dispute']].map(([l,v]) => (
                <div key={l} className="drow"><span className="dlabel">{l}</span><span className="dval" style={{ fontFamily:l==='Originating invoice'?'var(--fm)':undefined }}>{v}</span></div>
              ))}
              <div style={{ marginTop:12 }}>
                <div style={{ fontSize:'11.5px', fontWeight:600, color:'var(--slate)', marginBottom:6, textTransform:'uppercase', letterSpacing:'.4px' }}>Reason</div>
                <textarea style={{ width:'100%', padding:'10px 12px', borderRadius:8, border:'1px solid var(--border)', fontFamily:'var(--fb)', fontSize:'13px', minHeight:80, outline:'none', resize:'vertical', color:'var(--text)' }} defaultValue="Missed visit — client not at home on 4 Mar"/>
              </div>
              <div style={{ marginTop:12, display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                <div>
                  <div style={{ fontSize:'11.5px', fontWeight:600, color:'var(--slate)', marginBottom:6, textTransform:'uppercase', letterSpacing:'.4px' }}>Invoice line</div>
                  <select className="sel" style={{ width:'100%', fontSize:'12.5px' }}><option>Mr D Evans — Domestic 4 Mar — £11.63</option></select>
                </div>
                <div>
                  <div style={{ fontSize:'11.5px', fontWeight:600, color:'var(--slate)', marginBottom:6, textTransform:'uppercase', letterSpacing:'.4px' }}>Credit amount</div>
                  <input style={{ width:'100%', padding:'7px 11px', borderRadius:8, border:'1px solid var(--border)', fontFamily:'var(--fm)', fontSize:'13px', color:'var(--navy)', outline:'none' }} defaultValue="£11.63"/>
                </div>
              </div>
            </div>
            <div className="modal-ft">
              <button className="btn btn-g btn-sm" onClick={() => setShowCredit(false)}>Cancel</button>
              <button className="btn btn-p btn-sm" onClick={() => { setShowCredit(false); flash('CN-0022 created as draft'); }}>Create credit note</button>
            </div>
          </div>
        </div>
      )}

      {toast && <div className="toast">✓ {toast}</div>}
    </>
  );
};
