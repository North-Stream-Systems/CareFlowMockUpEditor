import React from 'react';

// ── QR CODE GENERATOR ─────────────────────────────────────────────────────────
const ClientQRCode = ({ clientId, clientName }) => {
  const [tab, setTab] = React.useState('qr');
  // Deterministic pseudo-QR grid based on clientId
  const seed = clientId.split('').reduce((a,c)=>a+c.charCodeAt(0),0);
  const qrGrid = Array.from({length:49},(_,i)=>{
    // Fixed corner markers (top-left, top-right, bottom-left)
    const r=Math.floor(i/7), c=i%7;
    if((r<3&&c<3)||(r<3&&c>3)||(r>3&&c<3)) return 1;
    return ((seed*17+i*31+i*i*7)%3)===0?1:0;
  });
  const nfcId = `CF-${clientId.toUpperCase().replace(/[^A-Z0-9]/g,'')}`;
  const qrData = `careflow://visit/${clientId}`;

  return (
    <div className="card" style={{marginBottom:14}}>
      <div className="card-hd">
        <span className="card-title">EVV Verification</span>
        <span style={{fontSize:'11px',color:'var(--slate)'}}>Auto-generated on client creation</span>
      </div>

      {/* Tab switcher */}
      <div style={{display:'flex',borderBottom:'1px solid var(--border)'}}>
        {[['qr','⬛ QR Code'],['nfc','📡 NFC Tag'],['info','ℹ️ Setup']].map(([id,label])=>(
          <button key={id} onClick={()=>setTab(id)}
            style={{flex:1,padding:'10px 4px',border:'none',background:'none',cursor:'pointer',
              fontFamily:'var(--fb)',fontSize:'12.5px',fontWeight:tab===id?700:500,
              color:tab===id?'var(--teal)':'var(--slate)',
              borderBottom:tab===id?'2px solid var(--teal)':'2px solid transparent',
              transition:'all .15s'}}>
            {label}
          </button>
        ))}
      </div>

      {/* QR Tab */}
      {tab==='qr' && (
        <div style={{padding:'20px 16px',textAlign:'center'}}>
          <div style={{display:'inline-block',padding:14,background:'#fff',borderRadius:12,
            boxShadow:'0 2px 12px rgba(0,0,0,.1)',border:'1px solid var(--border)',marginBottom:14}}>
            {/* QR Code SVG */}
            <svg width="140" height="140" viewBox="0 0 7 7" style={{display:'block',imageRendering:'pixelated'}}>
              {qrGrid.map((cell,i)=>(
                <rect key={i} x={i%7} y={Math.floor(i/7)} width={1} height={1}
                  fill={cell?'#0D1F3C':'white'}/>
              ))}
            </svg>
          </div>
          <div style={{fontFamily:'var(--fm)',fontSize:'11px',color:'var(--slate)',marginBottom:4}}>{qrData}</div>
          <div style={{fontFamily:'var(--fh)',fontSize:'13.5px',fontWeight:700,color:'var(--navy)',marginBottom:12}}>{clientName}</div>
          <div style={{display:'flex',gap:8,justifyContent:'center',flexWrap:'wrap'}}>
            <button className="btn btn-p btn-sm">🖨️ Print QR</button>
            <button className="btn btn-g btn-sm">📥 Download PNG</button>
            <button className="btn btn-g btn-sm">📧 Email to carer</button>
          </div>
          <div style={{marginTop:14,padding:'10px 14px',background:'var(--teal-l)',border:'1px solid var(--teal-m)',
            borderRadius:10,fontSize:'12px',color:'var(--teal)',lineHeight:1.5,textAlign:'left'}}>
            <strong>Where to place this:</strong> Print and laminate. Attach to the inside of the front door, key safe, or care folder. Carer scans on arrival — confirms they are physically at this property.
          </div>
        </div>
      )}

      {/* NFC Tab */}
      {tab==='nfc' && (
        <div style={{padding:'20px 16px'}}>
          <div style={{textAlign:'center',marginBottom:16}}>
            <div style={{width:72,height:72,borderRadius:20,background:'#EFF6FF',border:'2px solid #0069A820',
              display:'flex',alignItems:'center',justifyContent:'center',fontSize:36,margin:'0 auto 10px'}}>📡</div>
            <div style={{fontFamily:'var(--fh)',fontSize:'15px',fontWeight:700,color:'var(--navy)',marginBottom:3}}>NFC Tag</div>
            <div style={{fontFamily:'var(--fm)',fontSize:'13px',color:'var(--slate)',marginBottom:2}}>{nfcId}</div>
            <div style={{fontSize:'12px',color:'var(--slate)'}}>NTAG213 · ISO/IEC 14443-3A</div>
          </div>
          {[
            ['Tag ID',         nfcId],
            ['Encoded data',   qrData],
            ['Tag type',       'NTAG213 (NFC Forum Type 2)'],
            ['Write protected','Yes — read only after programming'],
            ['Status',         'Programmed and active'],
          ].map(([l,v])=>(
            <div key={l} style={{display:'flex',justifyContent:'space-between',padding:'9px 0',
              borderBottom:'1px solid var(--border)',fontSize:'12.5px'}}>
              <span style={{color:'var(--slate)',fontWeight:500}}>{l}</span>
              <span style={{color:'var(--navy)',fontWeight:500,textAlign:'right',maxWidth:220,fontFamily:l==='Tag ID'||l==='Encoded data'?'var(--fm)':undefined}}>{v}</span>
            </div>
          ))}
          <div style={{marginTop:14,display:'flex',gap:8}}>
            <button className="btn btn-p btn-sm" style={{flex:1,justifyContent:'center'}}>📦 Order pre-programmed tag</button>
            <button className="btn btn-g btn-sm" style={{flex:1,justifyContent:'center'}}>📋 Write to blank tag</button>
          </div>
        </div>
      )}

      {/* Info / Setup Tab */}
      {tab==='info' && (
        <div style={{padding:'16px'}}>
          <div style={{fontFamily:'var(--fh)',fontSize:'13.5px',fontWeight:700,color:'var(--navy)',marginBottom:8}}>How EVV verification works</div>
          <div style={{display:'flex',flexDirection:'column',gap:10}}>
            {[
              { ico:'⬛', title:'QR Code', col:'var(--navy)',
                text:'Print the QR code and place it at the property. When the carer arrives, they open the visit on the CareFlow app and scan the code. The app confirms they are at the correct address. No GPS needed — the QR code is physical proof of presence.' },
              { ico:'📡', title:'NFC Tag', col:'#0069A8',
                text:'A pre-programmed NFC sticker is fixed to the door frame or key safe. The carer taps their phone to the tag — the app reads the tag ID and verifies the location instantly. Works even without mobile data.' },
              { ico:'📍', title:'GPS (fallback)', col:'var(--teal)',
                text:'GPS is available as a fallback for carers without access to the QR code or NFC tag, or for outdoor visits. GPS is less reliable indoors and can be spoofed — QR and NFC are the recommended primary methods.' },
            ].map(m=>(
              <div key={m.ico} style={{display:'flex',gap:10,padding:'11px 12px',background:'var(--slate-l)',borderRadius:10}}>
                <div style={{fontSize:20,flexShrink:0,marginTop:1}}>{m.ico}</div>
                <div>
                  <div style={{fontFamily:'var(--fh)',fontSize:'13px',fontWeight:700,color:m.col,marginBottom:3}}>{m.title}</div>
                  <div style={{fontSize:'12px',color:'var(--text)',lineHeight:1.55}}>{m.text}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{marginTop:14,padding:'10px 12px',background:'var(--amber-l)',border:'1px solid var(--amber)30',
            borderRadius:10,fontSize:'12px',color:'#92400E',lineHeight:1.5}}>
            <strong>Placement tip:</strong> QR codes fade in direct sunlight — use a laminate pouch. NFC tags should be placed on non-metallic surfaces. Both should be positioned where carers can reach them from outside the property if needed.
          </div>
        </div>
      )}
    </div>
  );
};

export const TabDocuments = ({ c }) => {
  const docs = [
    {name:'Care Plan — March 2026', type:'PDF', date:'1 Mar 2026', ico:'📋'},
    {name:'Risk Assessment', type:'PDF', date:'1 Mar 2026', ico:'📄'},
    {name:'Mental Capacity Assessment', type:'PDF', date:'14 Jan 2026', ico:'⚖️'},
    {name:'Consent to Care', type:'PDF', date:'15 Sep 2025', ico:'✅'},
    {name:'GP Letter — Medication Review', type:'PDF', date:'3 Feb 2026', ico:'💊'},
  ];
  return (
    <div className="prof-content">
      {/* EVV QR / NFC section — auto-generated per client */}
      <ClientQRCode clientId={c?.id||'CL001'} clientName={c?.name||'Client'}/>

      <div style={{display:'flex',justifyContent:'flex-end',marginBottom:12}}>
        <button className="btn btn-g btn-sm">+ Upload document</button>
      </div>
      <div className="card">
        <div className="card-hd"><span className="card-title">Documents</span></div>
        <div className="card-body" style={{padding:'0 16px'}}>
          {docs.map(d=>(
            <div key={d.name} className="doc-row">
              <div className="doc-ico">{d.ico}</div>
              <div style={{flex:1}}>
                <div style={{fontSize:'12.5px',fontWeight:500,color:'var(--text)'}}>{d.name}</div>
                <div style={{fontSize:'11px',color:'var(--slate)'}}>{d.type} · Uploaded {d.date}</div>
              </div>
              <span style={{fontSize:'11.5px',color:'var(--teal)',fontWeight:500,cursor:'pointer'}}>Download</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const CS = ({ label }) => (
  <div className="cs"><div className="big">🚧</div><h3>{label}</h3><p style={{fontSize:'12.5px'}}>Coming in the next prototype build.</p></div>
);
