import React from 'react';

export const DESKTOP = 'CareFlow_Prototype_v3.html';

export const LogoMark = () => (
  <svg viewBox="0 0 18 18" fill="none">
    <rect x="1" y="1"  width="7" height="7" rx="2" fill="white" opacity=".9"/>
    <rect x="10" y="1" width="7" height="7" rx="2" fill="white" opacity=".6"/>
    <rect x="1" y="10" width="7" height="7" rx="2" fill="white" opacity=".6"/>
    <rect x="10" y="10" width="7" height="7" rx="2" fill="white" opacity=".3"/>
  </svg>
);

export const STEPS = [
  { num:1, label:'Organisation details',   sub:'Name, address, registration'       },
  { num:2, label:'Regulator & region',     sub:'CQC, CIW or both'                   },
  { num:3, label:'Zones',                  sub:'Geographic service areas'            },
  { num:4, label:'Service types',          sub:'What care do you deliver?'           },
  { num:5, label:'Billing rate sheets',    sub:'Set up funder rate tables'           },
  { num:6, label:'Roles & permissions',    sub:'Who can do what'                     },
  { num:7, label:'Invite your team',        sub:'Add staff and coordinators'          },
  { num:8, label:'Go live',               sub:'Review and activate'                  },
];

export const SVC_COLORS_LIST = ['#0D9488','#F59E0B','#64748B','#8B5CF6','#3B82F6','#EC4899','#10B981','#DC2626'];

export const Toggle = ({on, onToggle}) => (
  <div className="toggle" style={{background:on?'var(--teal)':'var(--border)'}} onClick={onToggle}>
    <div className="toggle-knob" style={{left:on?21:3}}/>
  </div>
);
