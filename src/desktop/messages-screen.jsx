import { useEffect, useRef, useState } from 'react';
import { avCol, inits } from './helpers.jsx';
import { MSG_DATA, MSG_THREADS } from './mock-data.jsx';

// ── MESSAGES SCREEN ──────────────────────────────────────────────────────────
export const MessagesScreen = () => {
  const [activeThread, setActiveThread]   = useState('t1');
  const [typeFilter,   setTypeFilter]     = useState('All');
  const [compose,      setCompose]        = useState('');
  const [messages,     setMessages]       = useState(MSG_DATA);
  const [threads,      setThreads]        = useState(MSG_THREADS);
  const [typing,       setTyping]         = useState(false);
  const bottomRef = useRef(null);
  const typingTimer = useRef(null);

  const thread = threads.find(t => t.id===activeThread);
  const msgs   = messages[activeThread] || [];

  useEffect(() => { bottomRef.current?.scrollIntoView({behavior:'smooth'}); }, [activeThread, msgs.length]);

  const handleSelect = id => {
    setActiveThread(id);
    setThreads(prev => prev.map(t => t.id===id ? {...t, unread:0} : t));
  };

  const handleSend = () => {
    if(!compose.trim()) return;
    const msg = {id:Date.now(), sender:'CD', name:'Cameron D', mine:true, time:'Now', body:compose.trim(), type:'user', receipt:'delivered'};
    setMessages(prev => ({...prev, [activeThread]:[...(prev[activeThread]||[]), msg]}));
    setThreads(prev => prev.map(t => t.id===activeThread ? {...t, time:'Now', preview:`You: ${compose.trim().slice(0,40)}`} : t));
    setCompose('');
    if(activeThread==='t1') {
      setTimeout(() => setTyping(true), 1200);
      setTimeout(() => {
        setTyping(false);
        const reply = {id:Date.now()+1, sender:'EW', name:'Emma Williams', mine:false, time:'Now', body:'Perfect, I will head straight over after the 10am call. Should be there by 14:10.', type:'user'};
        setMessages(prev => ({...prev, t1:[...(prev.t1||[]), reply]}));
      }, 3500);
    }
  };

  const filtered = threads.filter(t =>
    typeFilter==='All' ||
    (typeFilter==='Direct'&&t.type==='direct') ||
    (typeFilter==='Groups'&&t.type==='group') ||
    (typeFilter==='Broadcasts'&&t.type==='broadcast')
  );

  return (
    <div className="msg-layout">
      <div className="tlist">
        <div className="tlist-hd">
          <div className="tlist-title">
            Messages {threads.reduce((s,t)=>s+t.unread,0)>0 && <span style={{fontFamily:'var(--fm)',fontSize:12,color:'var(--red)',fontWeight:700}}>{threads.reduce((s,t)=>s+t.unread,0)}</span>}
          </div>
          <div className="tsearch-wrap">
            <span className="tsearch-ico">🔍</span>
            <input className="tsearch" placeholder="Search messages..." />
          </div>
          <div className="ttype-tabs">
            {['All','Direct','Groups','Broadcasts'].map(t => (
              <button key={t} className={`ttab${typeFilter===t?' on':''}`} onClick={() => setTypeFilter(t)}>{t}</button>
            ))}
          </div>
        </div>
        <div className="new-msg">
          <button className="btn btn-p btn-sm" style={{width:'100%'}}>+ New message</button>
        </div>
        <div className="titems">
          {filtered.map(t => (
            <div key={t.id} className={`titem${activeThread===t.id?' on':''}`} onClick={() => handleSelect(t.id)}>
              <div className="tav" style={{background:t.type==='broadcast'?'var(--purple)':t.type==='group'?'var(--navy)':t.color}}>
                {t.type==='broadcast' ? '📢' : t.initials}
                {t.online && t.type==='direct' && <div className="tav-online" />}
              </div>
              <div className="titem-body">
                <div className="titem-name">{t.name}{t.muted&&<span style={{marginLeft:4,fontSize:9,color:'var(--slate)'}}>🔇</span>}</div>
                <div className={`titem-prev${t.unread>0?' unread':''}`}>{t.preview}</div>
              </div>
              <div className="titem-r">
                <div className="titem-time">{t.time}</div>
                {t.unread>0 && <div className="tunread">{t.unread}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="tview">
        {thread ? (
          <>
            <div className="thd">
              <div className="thd-av" style={{background:thread.type==='broadcast'?'var(--purple)':thread.type==='group'?'var(--navy)':thread.color}}>
                {thread.type==='broadcast' ? '📢' : thread.initials}
              </div>
              <div style={{flex:1}}>
                <div className="thd-name">{thread.name}</div>
                <div className="thd-meta">
                  {thread.type==='direct' && <><span className={`dot dot-${thread.online?'green':'slate'}`} style={{display:'inline-block',marginRight:4}} />{thread.online?'Online':thread.role}</>}
                  {thread.type==='group' && `${thread.members} members`}
                  {thread.type==='broadcast' && 'Broadcast - recipients cannot reply'}
                </div>
              </div>
              <div style={{display:'flex',gap:5}}>
                {thread.type==='direct' && <button className="thd-btn">📞</button>}
                <button className="thd-btn">🔍</button>
                <button className="thd-btn">ℹ</button>
              </div>
            </div>
            {thread.type==='broadcast' && (
              <div className="bcast-notice">📢 Broadcast message - recipients cannot reply</div>
            )}
            <div className="msgs-area">
              <div className="msg-date-div"><span>Today</span></div>
              {msgs.map((m, i) => {
                if(m.type==='system') return (
                  <div key={m.id} className="mrow sys">
                    <div className="mbubble sys-b">
                      <div style={{fontSize:10,fontWeight:700,color:'var(--teal)',marginBottom:4,textTransform:'uppercase',letterSpacing:'.4px'}}>CareFlow System</div>
                      {m.body.split('\n').map((line,j) => <div key={j}>{line}</div>)}
                      <div style={{fontFamily:'var(--fm)',fontSize:9,color:'var(--slate)',marginTop:5}}>{m.time}</div>
                    </div>
                  </div>
                );
                const showAv = !m.mine && (i===0 || msgs[i-1]?.sender!==m.sender || msgs[i-1]?.type==='system');
                return (
                  <div key={m.id} className={`mrow${m.mine?' mine':''}`}>
                    {!m.mine && (
                      <div className="msav" style={{background:avCol(m.name),visibility:showAv?'visible':'hidden'}}>
                        {inits(m.name)}
                      </div>
                    )}
                    <div>
                      {showAv && !m.mine && <div className="msender">{m.name}</div>}
                      <div className={`mbubble ${m.mine?'mine':'theirs'}`}>{m.body}</div>
                      <div className={`mmeta${m.mine?' mine':''}`}>
                        <span className={`mtime${m.mine?' mine':''}`}>{m.time}</span>
                        {m.mine && m.receipt && <span style={{fontSize:9}}>{m.receipt==='seen'?'✓✓':'✓'}</span>}
                      </div>
                    </div>
                  </div>
                );
              })}
              {typing && (
                <div className="mrow">
                  <div className="msav" style={{background:avCol('Emma Williams')}}>{inits('Emma Williams')}</div>
                  <div>
                    <div className="msender">Emma Williams</div>
                    <div className="mbubble theirs" style={{padding:'10px 14px'}}>
                      <div className="typing-dots"><span /><span /><span /></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>
            {thread.type !== 'broadcast' ? (
              <div className="compose-area">
                <div className="compose-inner">
                  <textarea className="compose-inp" rows={1}
                    placeholder={`Message ${thread.name}...`}
                    value={compose}
                    onChange={e => setCompose(e.target.value)}
                    onKeyDown={e => { if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();handleSend();} }}
                  />
                  <div style={{display:'flex',alignItems:'center',gap:4,flexShrink:0}}>
                    <button className="cbtn">📎</button>
                    <button className="cbtn">🕐</button>
                    <button className="csend" onClick={handleSend} disabled={!compose.trim()}>&#10148;</button>
                  </div>
                </div>
                <div className="compose-meta">
                  <span>Enter to send · Shift+Enter for new line</span>
                  <span style={{fontFamily:'var(--fm)',fontSize:10}}>{compose.length}/10000</span>
                </div>
              </div>
            ) : (
              <div className="compose-area" style={{background:'var(--slate-l)',textAlign:'center',color:'var(--slate)',fontSize:'12.5px',padding:14}}>
                Broadcast - recipients cannot reply
              </div>
            )}
          </>
        ) : (
          <div className="no-thread">
            <div className="ico">💬</div>
            <h3>Select a conversation</h3>
            <p>Choose a thread from the left or start a new message</p>
          </div>
        )}
      </div>
    </div>
  );
};
