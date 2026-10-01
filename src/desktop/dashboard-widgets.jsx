import { useState } from 'react';
import { bfCol, covCol, sevCol } from './helpers.jsx';
import { ABSENT_TODAY, BRADFORD, COMPLIANCE_W, COVERAGE, INCIDENTS, ROUNDS, TASKS, UNASSIGNED } from './mock-data.jsx';
import { TimeArrow } from './reusables.jsx';
import { W } from './widget-shell.jsx';

// ── DASHBOARD WIDGETS ───────────────────────────────────────────────────────
export const WUnassigned = ({cfg, editMode, onRemove}) => {
  const [v, set] = useState(0);
  const items = UNASSIGNED.filter(x => v===0 ? x.d===0 : v<0 ? x.d>=v&&x.d<0 : x.d>0&&x.d<=v);
  return (
    <W id="unassigned" {...cfg} editMode={editMode} onRemove={onRemove}
      badge={items.length} bc={items.length>0?'red':'green'}
      footer={`${items.length} unassigned visit${items.length!==1?'s':''} in scope`}>
      {items.length===0
        ? <div className="wempty">No unassigned visits in this window</div>
        : items.map(x => (
          <div key={x.id} className="wrow">
            <div className="wri ri-red">📋</div>
            <div className="wrow-body">
              <div className="wrow-title">{x.client}</div>
              <div className="wrow-sub">{x.zone} · {x.svc} · {x.dur}min</div>
            </div>
            <div className="wrow-r">
              <div className="wrow-time">{x.time}</div>
              <span className="tag t-red" style={{marginTop:2}}>Unassigned</span>
            </div>
          </div>
        ))
      }
      <TimeArrow v={v} set={set} />
    </W>
  );
};

export const WAbsent = ({cfg, editMode, onRemove}) => (
  <W id="absent" {...cfg} editMode={editMode} onRemove={onRemove}
    badge={ABSENT_TODAY.length} bc={ABSENT_TODAY.length>0?'red':'green'}
    footer={`${ABSENT_TODAY.length} absent · ${ABSENT_TODAY.reduce((s,x)=>s+x.rounds,0)} rounds affected`}>
    {ABSENT_TODAY.map(x => (
      <div key={x.id} className="wrow">
        <div className="wri ri-amber">👤</div>
        <div className="wrow-body">
          <div className="wrow-title">{x.name}</div>
          <div className="wrow-sub">{x.role}</div>
        </div>
        <div className="wrow-r">
          <span className="tag t-amber">{x.type}</span>
          <div style={{fontSize:10,color:'var(--slate)',marginTop:3,fontFamily:'var(--fm)'}}>{x.rounds} round{x.rounds!==1?'s':''}</div>
        </div>
      </div>
    ))}
  </W>
);

export const WCompliance = ({cfg, editMode, onRemove}) => {
  const [v, set] = useState(0);
  const items = COMPLIANCE_W.filter(x => v<=0 ? x.days<=0&&x.days>=v*30 : x.days>0&&x.days<=v*30);
  const crit = items.filter(x => x.sev==='critical').length;
  return (
    <W id="compliance" {...cfg} editMode={editMode} onRemove={onRemove}
      badge={crit>0?crit:items.length} bc={crit>0?'red':'amber'}
      footer={`${crit} critical · ${items.filter(x=>x.sev==='warning').length} warning`}>
      {items.length===0
        ? <div className="wempty">No compliance alerts in this window</div>
        : items.slice(0,5).map(x => (
          <div key={x.id} className="wrow">
            <div className={`wri ri-${sevCol(x.sev)}`}>🛡️</div>
            <div className="wrow-body">
              <div className="wrow-title">{x.staff}</div>
              <div className="wrow-sub">{x.item}</div>
            </div>
            <span className={`tag t-${sevCol(x.sev)}`} style={{fontFamily:'var(--fm)',fontSize:'9.5px',flexShrink:0}}>
              {x.days<0?`${Math.abs(x.days)}d overdue`:`${x.days}d left`}
            </span>
          </div>
        ))
      }
      <TimeArrow v={v} set={set} />
    </W>
  );
};

export const WRounds = ({cfg, editMode, onRemove}) => {
  const unass = ROUNDS.filter(r => r.status==='unassigned').length;
  const sc = s => ({assigned:'green',unassigned:'red',partial:'amber'}[s]||'slate');
  return (
    <W id="rounds" {...cfg} editMode={editMode} onRemove={onRemove}
      badge={unass>0?unass:null} bc="red"
      footer={`${ROUNDS.filter(r=>r.status==='assigned').length}/${ROUNDS.length} rounds covered`}>
      {ROUNDS.map(r => (
        <div key={r.id} className="wrow">
          <div className={`dot dot-${sc(r.status)}`} style={{marginLeft:6}} />
          <div className="wrow-body">
            <div className="wrow-title">{r.name}</div>
            <div className="wrow-sub">{r.carer||'No carer assigned'} · {r.visits} visits</div>
          </div>
          <span className={`tag t-${sc(r.status)}`} style={{textTransform:'capitalize'}}>{r.status}</span>
        </div>
      ))}
    </W>
  );
};

export const WTasks = ({cfg, editMode, onRemove}) => {
  const [v, set] = useState(0);
  const items = TASKS.filter(t => v===0 ? t.d<=0 : v<0 ? t.d<0&&t.d>=v : t.d>=0&&t.d<=v);
  const overdue = items.filter(t => t.d<0).length;
  const pc = p => ({high:'red',medium:'amber',low:'slate'}[p]||'slate');
  return (
    <W id="tasks" {...cfg} editMode={editMode} onRemove={onRemove}
      badge={overdue>0?overdue:items.length} bc={overdue>0?'red':'teal'}
      footer={`${overdue} overdue · ${items.filter(t=>t.d===0).length} due today`}>
      {items.length===0
        ? <div className="wempty">No tasks in this window</div>
        : items.slice(0,5).map(t => (
          <div key={t.id} className="wrow">
            <div className={`wri ri-${pc(t.pri)}`}>✅</div>
            <div className="wrow-body">
              <div className="wrow-title" style={{fontSize:12}}>{t.title}</div>
              <div className="wrow-sub">{t.module}</div>
            </div>
            <span className={`tag t-${t.d<0?'red':t.d===0?'amber':'slate'}`}
              style={{fontFamily:'var(--fm)',fontSize:'9.5px',flexShrink:0}}>
              {t.d<0?`${Math.abs(t.d)}d ago`:t.d===0?'Today':`+${t.d}d`}
            </span>
          </div>
        ))
      }
      <TimeArrow v={v} set={set} />
    </W>
  );
};

export const WIncidents = ({cfg, editMode, onRemove}) => {
  const ic = s => ({serious:'red',major:'red',moderate:'amber',minor:'teal'}[s]||'slate');
  return (
    <W id="incidents" {...cfg} editMode={editMode} onRemove={onRemove}
      badge={INCIDENTS.length} bc="amber"
      footer={`${INCIDENTS.length} open incident${INCIDENTS.length!==1?'s':''}`}>
      {INCIDENTS.map(x => (
        <div key={x.id} className="wrow">
          <div className={`wri ri-${ic(x.sev)}`}>⚠️</div>
          <div className="wrow-body">
            <div className="wrow-title">{x.client}</div>
            <div className="wrow-sub">{x.type} · {x.stage}</div>
          </div>
          <div className="wrow-r">
            <span className={`tag t-${ic(x.sev)}`} style={{textTransform:'capitalize'}}>{x.sev}</span>
            <div style={{fontSize:'9.5px',color:'var(--slate)',marginTop:3,fontFamily:'var(--fm)'}}>{x.open}d open</div>
          </div>
        </div>
      ))}
    </W>
  );
};

export const WBradford = ({cfg, editMode, onRemove}) => (
  <W id="bradford" {...cfg} editMode={editMode} onRemove={onRemove}
    badge={BRADFORD.filter(b=>b.status==='disciplinary').length} bc="red"
    footer="Rolling 52-week Bradford Factor scores">
    {BRADFORD.map(b => (
      <div key={b.id} className="wrow">
        <div className={`wri ri-${bfCol(b.status)}`}>👤</div>
        <div className="wrow-body">
          <div className="wrow-title">{b.name}</div>
          <div className="wrow-sub">{b.role}</div>
          <div className="bf-sw">
            <div className="bf-tr"><div className={`bf-tf cf-${bfCol(b.status)}`} style={{width:`${(b.score/b.max)*100}%`}} /></div>
          </div>
        </div>
        <div className="wrow-r">
          <div className="bf-val" style={{color:`var(--${bfCol(b.status)})`}}>{b.score}</div>
          <span className={`tag t-${bfCol(b.status)}`} style={{marginTop:2,fontSize:9,textTransform:'capitalize'}}>{b.status}</span>
        </div>
      </div>
    ))}
  </W>
);

export const WCoverage = ({cfg, editMode, onRemove}) => {
  const avg = Math.round(COVERAGE.reduce((s,c)=>s+c.pct,0)/COVERAGE.length);
  return (
    <W id="coverage" {...cfg} editMode={editMode} onRemove={onRemove}
      badge={`${avg}%`} bc={avg>=90?'green':avg>=70?'amber':'red'}
      footer="This week confirmed shift coverage by day">
      <div className="cov-wrap">
        {COVERAGE.map(c => (
          <div key={c.day} className="cov-row">
            <span className="cov-day">{c.day}</span>
            <div className="cov-track"><div className={`cov-fill cf-${covCol(c.pct)}`} style={{width:`${c.pct}%`}} /></div>
            <span className="cov-pct" style={{color:`var(--${covCol(c.pct)})`}}>{c.pct}%</span>
          </div>
        ))}
      </div>
    </W>
  );
};
