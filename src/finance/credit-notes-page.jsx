import { useRef, useState } from 'react';
import { CREDIT_NOTES, fmt } from './mock-data.jsx';

// ── CREDIT NOTES PAGE ─────────────────────────────────────────────────────────
export const CreditNotesPage = () => {
  const [toast, setToast] = useState(null);
  const timer = useRef(null);
  const flash = msg => { setToast(msg); clearTimeout(timer.current); timer.current = setTimeout(() => setToast(null), 2800); };
  const stCol = s => ({ draft:'amber', sent:'green', reviewed:'teal' }[s]||'slate');
  return (
    <>
      <div className="ph">
        <div>
          <div className="ph-title">Credit Notes</div>
          <div className="ph-sub">{CREDIT_NOTES.length} credit notes · {CREDIT_NOTES.filter(c=>c.status==='draft').length} draft</div>
        </div>
        <button className="btn btn-p btn-sm">+ Manual credit note</button>
      </div>
      <div className="kpi-strip" style={{ gridTemplateColumns:'repeat(3,1fr)' }}>
        <div className="kpi kpi-amber"><div className="kpi-label">Draft</div><div className="kpi-mono">{CREDIT_NOTES.filter(c=>c.status==='draft').length}</div><div className="kpi-sub">Awaiting review</div></div>
        <div className="kpi"><div className="kpi-label">Sent this month</div><div className="kpi-mono">{CREDIT_NOTES.filter(c=>c.status==='sent').length}</div><div className="kpi-sub">Total {fmt(CREDIT_NOTES.filter(c=>c.status==='sent').reduce((s,c)=>s+c.amount,0))}</div></div>
        <div className="kpi kpi-red"><div className="kpi-label">Total credited</div><div className="kpi-mono">{fmt(CREDIT_NOTES.reduce((s,c)=>s+c.amount,0))}</div><div className="kpi-sub">This period</div></div>
      </div>
      <div className="tbl">
        <table>
          <thead><tr><th>Credit note</th><th>Invoice</th><th>Client</th><th>Reason</th><th>Date</th><th className="r">Amount</th><th>Status</th><th></th></tr></thead>
          <tbody>
            {CREDIT_NOTES.map(cn => (
              <tr key={cn.id}>
                <td style={{ fontFamily:'var(--fm)', fontSize:'12px', fontWeight:600, color:'var(--navy)' }}>{cn.id}</td>
                <td style={{ fontFamily:'var(--fm)', fontSize:'11.5px', color:'var(--teal)' }}>{cn.invoiceId}</td>
                <td style={{ fontSize:'12.5px' }}>{cn.client}</td>
                <td style={{ fontSize:'12px', color:'var(--slate)', maxWidth:200, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{cn.reason}</td>
                <td style={{ fontFamily:'var(--fm)', fontSize:'11.5px', color:'var(--slate)' }}>{cn.date}</td>
                <td className="r" style={{ fontFamily:'var(--fm)', fontSize:'13px', fontWeight:600, color:'var(--red)' }}>-{fmt(cn.amount)}</td>
                <td><span className={`tag t-${stCol(cn.status)}`} style={{ textTransform:'capitalize' }}>{cn.status}</span></td>
                <td style={{ textAlign:'right' }}>
                  {cn.status==='draft' && (
                    <button className="btn btn-p btn-sm" style={{ fontSize:'11px', padding:'3px 9px' }} onClick={() => flash(`${cn.id} sent to funder`)}>Send</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {toast && <div className="toast">✓ {toast}</div>}
    </>
  );
};
