import { useState } from 'react';

// ── VISIT SCREEN ───────────────────────────────────────────────────────────────
// ── EVV SIGN-IN ────────────────────────────────────────────────────────────────
const EVV_METHODS = [
  { id:'qr',  label:'Scan QR code',  ico:'⬛', desc:'Scan the QR code displayed at the property',       color:'var(--navy)'  },
  { id:'nfc', label:'Tap NFC',        ico:'📡', desc:'Hold your phone to the NFC tag at the door',       color:'#0069A8'      },
  { id:'gps', label:'GPS location',   ico:'📍', desc:'Use your current GPS location to verify arrival',  color:'var(--teal)'  },
];

export const EVVSignIn = ({ onSignIn }) => {
  const [method,   setMethod]   = useState('qr');
  const [scanning, setScanning] = useState(false);
  const [done,     setDone]     = useState(false);

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => { setScanning(false); setDone(true); }, 1800);
  };

  const handleSignIn = () => {
    if(!done && method !== 'gps') return;
    onSignIn();
  };

  const sel = EVV_METHODS.find(m=>m.id===method);

  return (
    <div>
      {/* Method tabs */}
      <div style={{display:'flex',gap:6,marginBottom:12}}>
        {EVV_METHODS.map(m=>(
          <button key={m.id} onClick={()=>{setMethod(m.id);setScanning(false);setDone(false);}}
            style={{flex:1,padding:'9px 4px',borderRadius:10,border:`1.5px solid ${method===m.id?m.color:'var(--border)'}`,
              background:method===m.id?`${m.color}12`:'#fff',cursor:'pointer',transition:'all .15s'}}>
            <div style={{fontSize:18,marginBottom:3}}>{m.ico}</div>
            <div style={{fontSize:'10.5px',fontWeight:700,color:method===m.id?m.color:'var(--slate)',lineHeight:1.2}}>{m.label}</div>
          </button>
        ))}
      </div>

      {/* QR scanner simulation */}
      {method==='qr' && (
        <div>
          {!done ? (
            <div onClick={!scanning?handleScan:undefined}
              style={{borderRadius:14,overflow:'hidden',border:`2px solid ${scanning?'var(--teal)':'var(--border)'}`,
                background:'#000',cursor:scanning?'default':'pointer',transition:'border-color .3s',marginBottom:12}}>
              {/* Simulated viewfinder */}
              <div style={{position:'relative',height:180,display:'flex',alignItems:'center',justifyContent:'center'}}>
                <div style={{position:'absolute',inset:0,background:'linear-gradient(rgba(0,0,0,.7),rgba(0,0,0,.5))'}}>
                  {/* Corner brackets */}
                  {['tl','tr','bl','br'].map(c=>(
                    <div key={c} style={{position:'absolute',width:22,height:22,
                      top:c.startsWith('t')?16:'auto',bottom:c.startsWith('b')?16:'auto',
                      left:c.endsWith('l')?16:'auto',right:c.endsWith('r')?16:'auto',
                      borderTop:c.startsWith('t')?'3px solid var(--teal)':'none',
                      borderBottom:c.startsWith('b')?'3px solid var(--teal)':'none',
                      borderLeft:c.endsWith('l')?'3px solid var(--teal)':'none',
                      borderRight:c.endsWith('r')?'3px solid var(--teal)':'none',
                    }}/>
                  ))}
                </div>
                {/* QR code grid */}
                <div style={{width:90,height:90,background:'#fff',borderRadius:6,padding:8,position:'relative',zIndex:1}}>
                  <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:1,width:'100%',height:'100%'}}>
                    {Array.from({length:49},(_,i)=>{
                      const qr=[1,1,1,1,1,1,0,1,0,0,0,1,0,1,1,0,1,0,1,0,1,1,0,1,0,1,0,1,1,0,1,0,1,0,1,1,0,0,0,1,0,1,0,1,1,1,1,1,1,0];
                      return <div key={i} style={{background:qr[i]?'#0D1F3C':'transparent',borderRadius:1}}/>;
                    })}
                  </div>
                </div>
                {scanning && (
                  <div style={{position:'absolute',inset:0,display:'flex',flexDirection:'column',
                    alignItems:'center',justifyContent:'center',zIndex:2}}>
                    <div style={{width:200,height:2,background:'var(--teal)',animation:'scan-line 1s ease-in-out',
                      boxShadow:'0 0 8px var(--teal)',borderRadius:1}}/>
                  </div>
                )}
              </div>
              <div style={{padding:'10px',textAlign:'center',background:'rgba(0,0,0,.8)'}}>
                <div style={{fontSize:'12.5px',color:'#fff',fontWeight:500}}>
                  {scanning ? '⏳ Scanning...' : '▶ Tap to scan client QR code'}
                </div>
                <div style={{fontSize:'11px',color:'rgba(255,255,255,.4)',marginTop:2}}>
                  {scanning ? 'Hold steady' : 'QR code is displayed at the property entrance'}
                </div>
              </div>
            </div>
          ) : (
            <div style={{padding:'12px 14px',background:'var(--green-l)',border:'1.5px solid var(--green)',
              borderRadius:12,display:'flex',alignItems:'center',gap:10,marginBottom:12}}>
              <span style={{fontSize:22}}>✅</span>
              <div>
                <div style={{fontSize:'13.5px',fontWeight:700,color:'#065F46'}}>QR code verified</div>
                <div style={{fontSize:'11.5px',color:'var(--green)'}}>Client location confirmed · Mrs H Thomas</div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* NFC simulation */}
      {method==='nfc' && (
        <div>
          {!done ? (
            <div onClick={!scanning?handleScan:undefined}
              style={{borderRadius:14,padding:'24px 16px',background:scanning?'#EFF6FF':'var(--slate-l)',
                border:`2px solid ${scanning?'#0069A8':'var(--border)'}`,cursor:'pointer',
                textAlign:'center',marginBottom:12,transition:'all .3s'}}>
              <div style={{fontSize:48,marginBottom:10,animation:scanning?'pulse 1s infinite':undefined}}>📡</div>
              <div style={{fontSize:'14px',fontWeight:700,color:scanning?'#0069A8':'var(--navy)',marginBottom:4}}>
                {scanning ? 'Reading NFC tag...' : 'Hold phone to NFC tag'}
              </div>
              <div style={{fontSize:'12px',color:'var(--slate)'}}>
                {scanning ? 'Keep phone near the tag' : 'The NFC tag is on the door frame or key safe'}
              </div>
            </div>
          ) : (
            <div style={{padding:'12px 14px',background:'var(--green-l)',border:'1.5px solid var(--green)',
              borderRadius:12,display:'flex',alignItems:'center',gap:10,marginBottom:12}}>
              <span style={{fontSize:22}}>✅</span>
              <div>
                <div style={{fontSize:'13.5px',fontWeight:700,color:'#065F46'}}>NFC tag verified</div>
                <div style={{fontSize:'11.5px',color:'var(--green)'}}>Tag ID: CF-C003 · Mrs H Thomas</div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* GPS */}
      {method==='gps' && (
        <div style={{padding:'12px 14px',background:'var(--teal-l)',border:'1px solid var(--teal-m)',
          borderRadius:12,display:'flex',alignItems:'center',gap:10,marginBottom:12}}>
          <span style={{fontSize:18}}>📍</span>
          <div>
            <div style={{fontSize:'13px',fontWeight:600,color:'var(--teal)'}}>GPS verification</div>
            <div style={{fontSize:'11.5px',color:'var(--teal)'}}>Location will be recorded at sign-in time</div>
          </div>
        </div>
      )}

      {/* Sign in button */}
      <button className="sign-in-btn" style={{margin:0}}
        disabled={method!=='gps' && !done}
        onClick={handleSignIn}
        style={{margin:0,opacity:method!=='gps'&&!done?.45:1,transition:'opacity .2s'}}>
        {method==='qr'  && !done ? '⬛ Scan QR code first' :
         method==='nfc' && !done ? '📡 Tap NFC tag first' :
         '✓ Sign in to visit'}
      </button>
      <div style={{fontSize:'11.5px',color:'var(--slate)',textAlign:'center',marginTop:8}}>
        {method==='qr'  ? 'QR verification confirms you are at the correct property' :
         method==='nfc' ? 'NFC tag is fixed at the property — cannot be spoofed remotely' :
         'GPS records your coordinates at sign-in'}
      </div>
    </div>
  );
};
