import { Section, Tag, Toggle } from './shared-page-wrapper.jsx';

// ── ROSTER RULES ──────────────────────────────────────────────────────────────
export const RosterRules = () => (
  <div style={{padding:'20px 24px'}}>
    <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:18}}>
      <div>
        <div style={{fontFamily:'var(--fh)',fontSize:21,fontWeight:700,color:'var(--navy)',letterSpacing:'-.3px'}}>Roster Rules</div>
        <div style={{fontSize:'12.5px',color:'var(--slate)',marginTop:2}}>Configure shift gap, hours, and compliance enforcement</div>
      </div>
      <button className="btn btn-p btn-sm">Save changes</button>
    </div>

    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
      <Section title="Shift Gap Rules">
        {[
          ['Minimum gap between calls','11 hours','hard'],
          ['Minimum rest between days','11 hours','hard'],
          ['Maximum shift length','12 hours','soft'],
          ['Manager override permitted','Yes','—'],
        ].map(([l,v,type]) => (
          <div key={l} style={{display:'flex',alignItems:'center',padding:'10px 16px',borderBottom:'1px solid var(--border)'}}>
            <div style={{flex:1}}>
              <div style={{fontSize:'12.5px',fontWeight:500,color:'var(--text)'}}>{l}</div>
              {type!=='—'&&<Tag color={type==='hard'?'red':'amber'}>{type} rule</Tag>}
            </div>
            <div style={{fontFamily:'var(--fm)',fontSize:'12.5px',fontWeight:600,color:'var(--navy)'}}>{v}</div>
          </div>
        ))}
      </Section>

      <Section title="Hours Rules">
        {[
          ['Minimum contracted hours/week','Varies per contract'],
          ['Maximum weekly hours','48 hours (WTD)'],
          ['Overtime threshold','Contracted hours'],
          ['Bank holiday uplift required','Yes'],
        ].map(([l,v]) => (
          <div key={l} style={{display:'flex',alignItems:'center',padding:'10px 16px',borderBottom:'1px solid var(--border)'}}>
            <div style={{flex:1,fontSize:'12.5px',fontWeight:500,color:'var(--text)'}}>{l}</div>
            <div style={{fontFamily:'var(--fm)',fontSize:'12px',color:'var(--navy)'}}>{v}</div>
          </div>
        ))}
      </Section>

      <Section title="Compliance Enforcement">
        {[
          ['Block shift on expired DBS',true],
          ['Block shift on expired training',true],
          ['Warn on expiring compliance (30 days)',true],
          ['Auto-lift block on renewal',true],
          ['Notify RM on compliance block',true],
        ].map(([l,v]) => (
          <div key={l} style={{display:'flex',alignItems:'center',padding:'10px 16px',borderBottom:'1px solid var(--border)',gap:10}}>
            <div style={{flex:1,fontSize:'12.5px',fontWeight:500,color:'var(--text)'}}>{l}</div>
            <Toggle on={v}/>
          </div>
        ))}
      </Section>

      <Section title="Publishing and Notifications">
        {[
          ['Auto-publish on template generate',false],
          ['Notify staff on rota publish',true],
          ['Notify on post-publish changes',true],
          ['Rota lock (days before week)',3],
          ['Push notification on mobile',true],
        ].map(([l,v]) => (
          <div key={l} style={{display:'flex',alignItems:'center',padding:'10px 16px',borderBottom:'1px solid var(--border)',gap:10}}>
            <div style={{flex:1,fontSize:'12.5px',fontWeight:500,color:'var(--text)'}}>{l}</div>
            {typeof v === 'boolean'
              ? <Toggle on={v}/>
              : <span style={{fontFamily:'var(--fm)',fontSize:'12.5px',fontWeight:600,color:'var(--navy)'}}>{v} days</span>
            }
          </div>
        ))}
      </Section>

      <Section title="Zone and Travel">
        {[
          ['Zone warnings on cross-zone shifts',true],
          ['Travel time integration (Google Maps)',false],
          ['Mileage tracking',false],
          ['Zone warning enforcement','Soft warning only'],
        ].map(([l,v]) => (
          <div key={l} style={{display:'flex',alignItems:'center',padding:'10px 16px',borderBottom:'1px solid var(--border)',gap:10}}>
            <div style={{flex:1,fontSize:'12.5px',fontWeight:500,color:'var(--text)'}}>{l}</div>
            {typeof v === 'boolean'
              ? <Toggle on={v}/>
              : <span style={{fontSize:'12px',color:'var(--slate)'}}>{v}</span>
            }
          </div>
        ))}
      </Section>

      <Section title="Double-Handed Calls">
        <div style={{padding:'10px 16px',borderBottom:'1px solid var(--border)',display:'flex',alignItems:'center',gap:10}}>
          <div style={{flex:1}}>
            <div style={{fontSize:'12.5px',fontWeight:500,color:'var(--text)'}}>Block if second carer unassigned at publish</div>
            <div style={{fontSize:'11px',color:'var(--slate)',marginTop:1}}>Prevents publishing a rota with incomplete 2-carer calls</div>
          </div>
          <Toggle on={true}/>
        </div>
        <div style={{padding:'10px 16px',borderBottom:'1px solid var(--border)',display:'flex',alignItems:'center',gap:10}}>
          <div style={{flex:1}}>
            <div style={{fontSize:'12.5px',fontWeight:500,color:'var(--text)'}}>Warn when cover carer breaks qualification rule</div>
            <div style={{fontSize:'11px',color:'var(--slate)',marginTop:1}}>Flags if a replacement doesn't meet the 1-of-2 or both-carers requirement</div>
          </div>
          <Toggle on={true}/>
        </div>
        <div style={{padding:'10px 16px',display:'flex',alignItems:'center',gap:10}}>
          <div style={{flex:1}}>
            <div style={{fontSize:'12.5px',fontWeight:500,color:'var(--text)'}}>Allow manager override on qualification warning</div>
            <div style={{fontSize:'11px',color:'var(--slate)',marginTop:1}}>RM can override with a mandatory audit note</div>
          </div>
          <Toggle on={true}/>
        </div>
      </Section>
    </div>
  </div>
);
