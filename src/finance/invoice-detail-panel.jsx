import { useState } from 'react';
import { INV421_LINES, fmt } from './mock-data.jsx';
import { RatePop } from './rate-breakdown-popover.jsx';

// ── INVOICE DETAIL PANEL ──────────────────────────────────────────────────────
export const InvoicePanel = ({ invoice, onClose, onSend, onCredit }) => {
  const [activeLine, setActiveLine] = useState(null);
  const lines = invoice.id === 'INV-00421' ? INV421_LINES : [];
  const subTotal = lines.reduce((s, l) => s + l.total, 0);

  return (
    <div className="inv-panel">
      <div className="inv-panel-hd">
        <div className="inv-panel-title">{invoice.id} — {invoice.funder}</div>
        <div className="inv-panel-sub">Billing period {invoice.period}</div>
        <div className="inv-panel-meta">
          <div className="inv-meta-item">📅 Invoice date: <strong>{invoice.date}</strong></div>
          <div className="inv-meta-item">⏰ Due: <strong>{invoice.due}</strong></div>
          <div className="inv-meta-item">Status: <strong style={{ color:invoice.status==='draft'?'#FCD34D':'#6EE7B7', textTransform:'capitalize' }}>{invoice.status}</strong></div>
        </div>
        <button className="inv-panel-close" onClick={onClose}>×</button>
      </div>

      <div className="inv-panel-body">
        {lines.length > 0 ? (
          <>
            <div className="line-hd">
              <span>Client / Service</span>
              <span style={{ textAlign:'right' }}>Date</span>
              <span style={{ textAlign:'right' }}>Time</span>
              <span style={{ textAlign:'right' }}>Dur</span>
              <span style={{ textAlign:'right' }}>Rate</span>
              <span style={{ textAlign:'right' }}>Total</span>
            </div>
            {lines.map(line => (
              <div key={line.id}>
                <div className="line-row" onClick={() => setActiveLine(activeLine===line.id ? null : line.id)}>
                  <div>
                    <div className="line-client">{line.client}</div>
                    <div className="line-svc">{line.svc} · <span className="tag t-slate" style={{ fontSize:'9.5px', padding:'1px 5px' }}>{line.dayType}</span></div>
                  </div>
                  <div className="line-date">{line.date.split(' ').slice(1).join(' ')}</div>
                  <div className="line-num">{line.time}</div>
                  <div className="line-num">{line.dur}m</div>
                  <div className="line-num">{fmt(line.rate)}</div>
                  <div className="line-total">{fmt(line.total)}</div>
                </div>
                {activeLine === line.id && (
                  <div style={{ padding:'0 20px 10px', background:'var(--teal-l)', borderBottom:'1px solid var(--teal-m)' }}>
                    <RatePop line={line} onClose={() => setActiveLine(null)} />
                  </div>
                )}
              </div>
            ))}
            {invoice.lines > lines.length && (
              <div style={{ padding:'12px 20px', textAlign:'center', color:'var(--slate)', fontSize:'12px', borderBottom:'1px solid var(--border)' }}>
                + {invoice.lines - lines.length} more lines · showing first {lines.length} for demo
              </div>
            )}
          </>
        ) : (
          <div style={{ padding:'24px', textAlign:'center', color:'var(--slate)', fontSize:'12.5px' }}>
            Line items for this invoice are not expanded in the prototype.
            <br />Open INV-00421 to see the full line item breakdown.
          </div>
        )}
      </div>

      {lines.length > 0 && (
        <div className="inv-totals">
          {[['Subtotal', fmt(subTotal)], ['VAT (exempt)', '£0.00'], ['Credit notes applied', '-£0.00']].map(([l,v]) => (
            <div key={l} className="totals-row">
              <span className="totals-label">{l}</span>
              <span className="totals-val">{v}</span>
            </div>
          ))}
          <div className="totals-row totals-grand">
            <span className="totals-label">Total due</span>
            <span className="totals-val">{fmt(subTotal)}</span>
          </div>
        </div>
      )}

      <div className="inv-panel-ft">
        <div style={{ display:'flex', alignItems:'center', gap:8, flexWrap:'wrap' }}>
          <button className="btn btn-g btn-sm" onClick={() => onCredit(invoice)}>+ Raise credit note</button>
          <button className="btn btn-g btn-sm">Download PDF</button>
          <div style={{ flex:1 }} />
          {invoice.status === 'draft' && (
            <button className="btn btn-p btn-sm">Mark as reviewed</button>
          )}
          {(invoice.status === 'draft' || invoice.status === 'reviewed') && (
            <button className="btn btn-navy btn-sm" onClick={() => onSend(invoice)}>
              Send to {invoice.funder.split(' ')[0]} →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
