import { Sidebar } from './sidebar.jsx';

// ── SHARED PAGE WRAPPER ───────────────────────────────────────────────────────
export const PageWrap = ({ children, activePage, setActivePage }) => (
  <div className="app">
    <Sidebar active={activePage} setActive={setActivePage} />
    <div className="main" style={{overflowY:'auto'}}>
      {children}
    </div>
  </div>
);

export const Section = ({ title, children, action }) => (
  <div style={{background:'#fff',border:'1px solid var(--border)',borderRadius:10,boxShadow:'var(--sh-sm)',marginBottom:16,overflow:'hidden'}}>
    <div style={{padding:'11px 16px',borderBottom:'1px solid var(--border)',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
      <div style={{fontFamily:'var(--fh)',fontSize:13,fontWeight:600,color:'var(--navy)'}}>{title}</div>
      {action}
    </div>
    <div>{children}</div>
  </div>
);

export const DRow = ({label, value, mono}) => (
  <div style={{display:'flex',gap:12,padding:'9px 16px',borderBottom:'1px solid var(--border)'}}>
    <span style={{fontSize:'11.5px',color:'var(--slate)',fontWeight:500,width:180,flexShrink:0}}>{label}</span>
    <span style={{fontSize:'12.5px',color:'var(--text)',fontFamily:mono?'var(--fm)':undefined}}>{value}</span>
  </div>
);

export const Toggle = ({on}) => (
  <div style={{width:36,height:20,borderRadius:10,background:on?'var(--teal)':'var(--border)',cursor:'pointer',position:'relative',transition:'background .2s',flexShrink:0}}>
    <div style={{position:'absolute',top:3,left:on?18:3,width:14,height:14,borderRadius:7,background:'#fff',transition:'left .2s',boxShadow:'0 1px 3px rgba(0,0,0,.2)'}}/>
  </div>
);

export const Tag = ({children, color='slate'}) => {
  const map = {green:['var(--green-l)','#065F46'],red:['var(--red-l)','var(--red)'],amber:['var(--amber-l)','#92400E'],teal:['var(--teal-l)','var(--teal)'],slate:['var(--slate-l)','var(--slate)']};
  const [bg,fg] = map[color]||map.slate;
  return <span style={{display:'inline-flex',alignItems:'center',padding:'2px 7px',borderRadius:4,fontSize:'10.5px',fontWeight:600,background:bg,color:fg}}>{children}</span>;
};
