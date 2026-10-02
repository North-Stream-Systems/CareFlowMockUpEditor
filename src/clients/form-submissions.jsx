// ── FORM SUBMISSIONS ──────────────────────────────────────────────────────────
// Completed forms per client: { id, formId, clientId, submittedAt (ISO), submittedBy, values:{fieldId:value} }.
// Seeded mock data below (dates relative to today so the demo always looks current), plus anything
// staff add on a client's Forms tab, persisted to localStorage.
import { useSyncExternalStore } from 'react';
import { CLIENTS } from './mock-data.jsx';

const iso = (daysAgo, hh = 9, mm = 30) => {
  const d = new Date(); d.setDate(d.getDate() - daysAgo); d.setHours(hh, mm, 0, 0);
  return d.toISOString();
};
const day = daysFromNow => iso(-daysFromNow).slice(0, 10);

// Per-client facts used to seed realistic entries.
const SEED = {
  CL001: { pref:'Gwen',   keySafe:'4721', access:'Key safe left of front door. Small dog — keep kitchen door closed.', lang:'Welsh', religion:'Chapel (Methodist)',
           dx:'Hypertension, osteoarthritis, mild cognitive impairment', allergies:'Penicillin', dnacpr:'Yes', respect:'Yes', mob:'Walking frame', comm:['Hearing impaired','Welsh speaker'], diabetic:'No',
           risk:[{ago:40, falls:'Medium', w:12, review:-3}, {ago:120, falls:'Low', w:10, review:-90}], lpa:'Yes', meds:['Administer','Boots, Conwy','Yes','Paracetamol 500mg — max 4 doses/24h'] },
  CL002: { pref:'Ifan',   keySafe:'—', access:'Client answers door. Ring twice and wait.', lang:'Bilingual', religion:'',
           dx:'Type 2 diabetes, COPD', allergies:'', dnacpr:'No', respect:'No', mob:'Independent', comm:[], diabetic:'Yes',
           risk:[{ago:20, falls:'Low', w:6, review:70}], lpa:'No', meds:['Prompt only','Well Pharmacy, Llandudno','Yes','Salbutamol inhaler'] },
  CL003: { pref:'Mair',   keySafe:'0915', access:'Ground-floor flat, side entrance. Hoist in bedroom.', lang:'English', religion:'Church in Wales',
           dx:'Multiple sclerosis; pressure ulcer (R heel, stage 2)', allergies:'Latex, codeine', dnacpr:'No', respect:'Yes', mob:'Hoist', comm:['Speech difficulty'], diabetic:'No',
           risk:[{ago:6, falls:'High', w:22, review:5}], lpa:'Yes', meds:['Administer','Boots, Colwyn Bay','Yes','Oramorph 2.5ml PRN for breakthrough pain'] },
  CL004: { pref:'Arthur', keySafe:'3388', access:'Key safe on garage wall. May not remember carers — introduce yourself each visit.', lang:'English', religion:'',
           dx:'Vascular dementia (moderate)', allergies:'', dnacpr:'Yes', respect:'No', mob:'Walking stick', comm:['Dementia','Hearing impaired'], diabetic:'No',
           risk:[], lpa:'Yes', meds:['Administer','Rowlands, Conwy','Yes',''] },
  CL005: { pref:'Beth',   keySafe:'—', access:'Ramp at rear. Client opens door via intercom.', lang:'English', religion:'',
           dx:'Spinal cord injury (T10), neuropathic pain', allergies:'Ibuprofen', dnacpr:'No', respect:'No', mob:'Wheelchair', comm:[], diabetic:'No',
           risk:[{ago:55, falls:'Medium', w:16, review:35}], lpa:'No', meds:['Self-administers','Boots, Rhyl','No','Gabapentin as prescribed'] },
  CL006: { pref:'Dewi',   keySafe:'—', access:'Wife usually home. Park on street.', lang:'Welsh', religion:'Chapel',
           dx:"Parkinson's disease (early stage)", allergies:'', dnacpr:'No', respect:'No', mob:'Independent', comm:['Welsh speaker'], diabetic:'No',
           risk:[{ago:85, falls:'Low', w:8, review:12}], lpa:'No', meds:['Self-administers','Prestatyn Pharmacy','No',''] },
  CL007: { pref:'Nerys',  keySafe:'6602', access:'Service suspended — hospital admission. Do not visit until restart confirmed.', lang:'English', religion:'',
           dx:'Post-stroke left-sided weakness', allergies:'Sulfonamides', dnacpr:'No', respect:'Yes', mob:'Walking frame', comm:['Speech difficulty'], diabetic:'Yes',
           risk:[{ago:70, falls:'High', w:18, review:-14}], lpa:'No', meds:['Administer','Boots, Prestatyn','Yes',''] },
  CL008: { pref:'Danny',  keySafe:'1204', access:'Key safe by back door. Lights on timer.', lang:'English', religion:'',
           dx:'Atrial fibrillation, glaucoma', allergies:'', dnacpr:'No', respect:'No', mob:'Walking stick', comm:['Visually impaired'], diabetic:'No',
           risk:[{ago:30, falls:'Medium', w:11, review:60}], lpa:'No', meds:['Administer','Well Pharmacy, Llandudno','Yes','GTN spray PRN'] },
};

const MOODS = [['Happy','Good',1400,'Chatty and bright. Ate full breakfast.'],
               ['Settled','Fair',1100,'Quiet morning, watched TV. Encouraged fluids.'],
               ['Low','Poor',800,'Seemed tired and low in mood. Left half of lunch. Will monitor.']];

function seed() {
  const out = [];
  let n = 0;
  const add = (clientId, formId, daysAgo, by, values, hh) =>
    out.push({ id:`s${n++}`, clientId, formId, submittedAt: iso(daysAgo, hh), submittedBy: by, values });

  for (const c of CLIENTS) {
    const s = SEED[c.id];
    const [nok, rel, phone] = (() => {
      const m = c.emergency.match(/^(.*?) \((.*?)\) (.*)$/);
      return m ? [m[1], { Wife:'Spouse / partner', Husband:'Spouse / partner' }[m[2]] || m[2], m[3]] : [c.emergency, 'Other', ''];
    })();
    add(c.id, 'client-details', 180, 'Cameron D', {
      preferred_name: s.pref, nhs_number: c.nhs, key_safe: s.keySafe, access: s.access, language: s.lang, religion: s.religion, gp: c.gp,
    });
    add(c.id, 'next-of-kin', 180, 'Cameron D', {
      nok_name: nok, relationship: rel, nok_phone: phone, lpa_health: s.lpa, lpa_holder: s.lpa === 'Yes' ? nok : '',
    });
    add(c.id, 'medical-summary', 60, 'Lisa Roberts', {
      diagnoses: s.dx, allergies: s.allergies, dnacpr: s.dnacpr, respect: s.respect, mobility: s.mob, communication: s.comm, diabetic: s.diabetic,
    });
    const [lvl, pharmacy, blister, prn] = s.meds;
    add(c.id, 'medication-profile', 90, 'Lisa Roberts', { support_level: lvl, pharmacy, blister, prn });
    for (const r of [...s.risk].reverse()) {
      add(c.id, 'risk-assessment', r.ago, 'Lisa Roberts', {
        falls_risk: r.falls, waterlow: r.w, next_review: day(r.review),
        environment: r.falls === 'High' ? 'Loose rugs removed. Grab rails fitted in bathroom. Pendant alarm worn.' : 'No significant hazards identified.',
      });
    }
    if (c.status === 'active') {
      add(c.id, 'care-plan-review', 45, 'Cameron D', {
        outcome: 'Client and family happy with current package. Outcomes being met.', changes: 'No', client_involved: 'Yes', next_review: day(45),
      });
      MOODS.forEach(([mood, appetite, fluids, notes], i) =>
        add(c.id, 'daily-wellbeing', 2 - i + (c.id.charCodeAt(4) % 2), c.keyworker,
          { mood: MOODS[(i + c.id.charCodeAt(4)) % 3][0], appetite, fluids, notes }, 8 + i));
    }
  }
  return out;
}

// ── Store ──
const KEY = 'cf_client_submissions_v1';
const SEEDED = seed();
const listeners = new Set();
let added = (() => { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; } })();
let all = [...SEEDED, ...added];

const subscribe = l => { listeners.add(l); return () => listeners.delete(l); };

export const useSubmissions = () => useSyncExternalStore(subscribe, () => all);

export function addSubmission(sub) {
  added = [...added, { id:`u${Date.now()}`, submittedAt: new Date().toISOString(), submittedBy: 'Cameron D', ...sub }];
  try { localStorage.setItem(KEY, JSON.stringify(added)); } catch { /* keep in memory */ }
  all = [...SEEDED, ...added];
  listeners.forEach(l => l());
}

// Entries for one client & form, newest first.
export const entriesFor = (subs, clientId, formId) =>
  subs.filter(s => s.clientId === clientId && s.formId === formId)
      .sort((a, b) => b.submittedAt.localeCompare(a.submittedAt));

export const latestFor = (subs, clientId, formId) => entriesFor(subs, clientId, formId)[0];
