import { useEffect, useRef, useState } from 'react';
import { MESSAGES } from './data.jsx';

// ── MESSAGES SCREEN ────────────────────────────────────────────────────────────
export const MessagesScreen = () => {
  const [openThread,setOpenThread] = useState(null);
  const [compose,   setCompose]    = useState('');
  const [threads,   setThreads]    = useState(MESSAGES);
  const [msgs,      setMsgs]       = useState({
    m1:[...MESSAGES[0].thread],
    m2:[...MESSAGES[1].thread],
    m3:[...MESSAGES[2].thread],
  });
  const bottomRef = useRef(null);

  useEffect(()=>{ bottomRef.current?.scrollIntoView({behavior:'smooth'}); },[openThread,msgs]);

  const handleSend = () => {
    if(!compose.trim()||!openThread) return;
    const msg = {id:Date.now(),mine:true,body:compose.trim(),time:'Now',type:'user',receipt:'delivered'};
    setMsgs(prev=>({...prev,[openThread]:[...(prev[openThread]||[]),msg]}));
    setThreads(prev=>prev.map(t=>t.id===openThread?{...t,unread:0,preview:`You: ${compose.trim().slice(0,35)}`}:t));
    setCompose('');

    // Auto-reply from coordinator
    if(openThread==='m1'){
      setTimeout(()=>{
        const reply={id:Date.now()+1,mine:false,body:'Perfect, can you be there by 14:15? I will let the family know.',time:'Now',type:'user'};
        setMsgs(prev=>({...prev,m1:[...(prev.m1||[]),reply]}));
      },2000);
    }
  };

  const thread = openThread ? threads.find(t=>t.id===openThread) : null;
  const threadMsgs = openThread ? (msgs[openThread]||[]) : [];

  if(openThread && thread) {
    return (
      <div className="msg-screen">
        <div className="msg-hd">
          <div className="msg-back" onClick={()=>{setOpenThread(null);setThreads(prev=>prev.map(t=>t.id===openThread?{...t,unread:0}:t));}}>←</div>
          <div className="msg-hd-av" style={{background:thread.color}}>{thread.name.split(' ').map(n=>n[0]).join('').slice(0,2)}</div>
          <div>
            <div className="msg-hd-name">{thread.name}</div>
            <div className="msg-hd-status">{thread.role}{thread.online?' · Online':''}</div>
          </div>
        </div>
        <div className="msg-area">
          {threadMsgs.map(m=>{
            if(m.type==='system') return (
              <div key={m.id} className="mrow sys">
                <div className="mbub sys-b">
                  <div style={{fontSize:'10px',fontWeight:700,color:'var(--teal)',marginBottom:4,textTransform:'uppercase',letterSpacing:'.4px'}}>CareFlow System</div>
                  {m.body.split('\n').map((l,i)=><div key={i}>{l}</div>)}
                  <div style={{fontFamily:'var(--fm)',fontSize:'9px',color:'var(--slate)',marginTop:5}}>{m.time}</div>
                </div>
              </div>
            );
            return (
              <div key={m.id} className={`mrow${m.mine?' mine':''}`}>
                <div>
                  {m.sender&&!m.mine&&<div style={{fontSize:'10.5px',fontWeight:600,color:'var(--teal)',marginBottom:2,paddingLeft:4}}>{m.sender}</div>}
                  <div className={`mbub ${m.mine?'mine':'theirs'}`}>{m.body}</div>
                  <div className={`msg-time`} style={{textAlign:m.mine?'right':'left'}}>
                    {m.time}{m.mine&&m.receipt&&<span style={{marginLeft:4}}>{m.receipt==='seen'?'✓✓':'✓'}</span>}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={bottomRef}/>
        </div>
        <div className="msg-compose">
          <textarea className="compose-inp" rows={1}
            placeholder={`Message ${thread.name}...`}
            value={compose} onChange={e=>setCompose(e.target.value)}
            onKeyDown={e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();handleSend();}}}
          />
          <button className="compose-send" onClick={handleSend} disabled={!compose.trim()}>➤</button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="screen-hd">
        <div className="screen-hd-title">Messages</div>
        <div className="screen-hd-sub">{threads.reduce((s,t)=>s+t.unread,0)} unread</div>
      </div>
      <div className="screen-content">
        {threads.map(t=>(
          <div key={t.id} className="thread-item" onClick={()=>setOpenThread(t.id)}>
            <div className="t-av" style={{background:t.color}}>
              {t.name.split(' ').map(n=>n[0]).join('').slice(0,2)}
              {t.online && <div className="t-av-online"/>}
            </div>
            <div className="t-body">
              <div className="t-name">{t.name}</div>
              <div className={`t-prev${t.unread>0?' unread':''}`}>{t.preview}</div>
            </div>
            <div className="t-right">
              <div className="t-time">{t.time}</div>
              {t.unread>0 && <div className="t-badge">{t.unread}</div>}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
