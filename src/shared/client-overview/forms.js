// ── FORMS ─────────────────────────────────────────────────────────────────────
// A form is an org-defined set of fields that staff complete for a client.
// Every piece of information shown on a client's Overview comes from a form field.
//
//   repeatable:false → single record kept up to date (each save is a new version; the latest is "current")
//   repeatable:true  → new entry each time (assessments, reviews, daily logs)
//   system:true      → shipped with CareFlow; other modules rely on it, so it can't be deleted
//                      (fields marked system:true can't be deleted either — orgs can still add fields)

export const FIELD_TYPES = [
  { id:'text',        label:'Short text' },
  { id:'textarea',    label:'Long text' },
  { id:'number',      label:'Number' },
  { id:'date',        label:'Date' },
  { id:'yesno',       label:'Yes / No' },
  { id:'select',      label:'Dropdown (one)' },
  { id:'multiselect', label:'Checkboxes (many)' },
  { id:'phone',       label:'Phone number' },
];

export const FORM_ICONS = ['🪪','👪','🩺','⚠️','📋','🙂','💊','🍽️','🏠','🧠','🛁','📝'];

export const DEFAULT_FORMS = [
  {
    id:'client-details', name:'Client Details', icon:'🪪', repeatable:false, system:true,
    description:'Core identity and access information.',
    fields:[
      { id:'preferred_name', label:'Preferred name',      type:'text' },
      { id:'nhs_number',     label:'NHS number',          type:'text', system:true, required:true },
      { id:'key_safe',       label:'Key safe code',       type:'text' },
      { id:'access',         label:'Access instructions', type:'textarea' },
      { id:'language',       label:'Preferred language',  type:'select', options:['English','Welsh','Bilingual','Other'] },
      { id:'religion',       label:'Religion / beliefs',  type:'text' },
      { id:'gp',             label:'GP practice',         type:'text', system:true },
    ],
  },
  {
    id:'next-of-kin', name:'Next of Kin & LPA', icon:'👪', repeatable:false, system:true,
    description:'Primary contact and Lasting Power of Attorney.',
    fields:[
      { id:'nok_name',     label:'Next of kin',                type:'text', required:true },
      { id:'relationship', label:'Relationship',               type:'select', options:['Spouse / partner','Son','Daughter','Brother','Sister','Friend','Other'] },
      { id:'nok_phone',    label:'Phone',                      type:'phone' },
      { id:'lpa_health',   label:'LPA for health & welfare',   type:'yesno' },
      { id:'lpa_holder',   label:'LPA holder',                 type:'text' },
    ],
  },
  {
    id:'medical-summary', name:'Medical Summary', icon:'🩺', repeatable:false, system:true,
    description:'Diagnoses, allergies and resuscitation status.',
    fields:[
      { id:'diagnoses',     label:'Diagnoses',            type:'textarea' },
      { id:'allergies',     label:'Allergies',            type:'text', system:true },
      { id:'dnacpr',        label:'DNACPR in place',      type:'yesno', system:true },
      { id:'respect',       label:'ReSPECT form in home', type:'yesno' },
      { id:'mobility',      label:'Mobility',             type:'select', options:['Independent','Walking stick','Walking frame','Wheelchair','Hoist','Bedbound'] },
      { id:'communication', label:'Communication needs',  type:'multiselect', options:['Hearing impaired','Visually impaired','Speech difficulty','Dementia','Welsh speaker'] },
      { id:'diabetic',      label:'Diabetic',             type:'yesno' },
    ],
  },
  {
    id:'risk-assessment', name:'Risk Assessment', icon:'⚠️', repeatable:true, system:true,
    description:'Falls, skin integrity and home environment.',
    fields:[
      { id:'falls_risk',  label:'Falls risk',              type:'select', options:['Low','Medium','High'], required:true },
      { id:'waterlow',    label:'Waterlow score',          type:'number' },
      { id:'environment', label:'Environmental hazards',   type:'textarea' },
      { id:'next_review', label:'Next review due',         type:'date', required:true },
    ],
  },
  {
    id:'care-plan-review', name:'Care Plan Review', icon:'📋', repeatable:true, system:false,
    description:'Periodic review of outcomes with the client.',
    fields:[
      { id:'outcome',         label:'Outcome summary',          type:'textarea' },
      { id:'changes',         label:'Changes made to plan',     type:'yesno' },
      { id:'client_involved', label:'Client involved in review',type:'yesno' },
      { id:'next_review',     label:'Next review due',          type:'date' },
    ],
  },
  {
    id:'daily-wellbeing', name:'Daily Wellbeing', icon:'🙂', repeatable:true, system:false,
    description:'Quick check completed by carers each visit.',
    fields:[
      { id:'mood',     label:'Mood',          type:'select', options:['Happy','Settled','Low','Anxious','Agitated'] },
      { id:'appetite', label:'Appetite',      type:'select', options:['Good','Fair','Poor'] },
      { id:'fluids',   label:'Fluid intake',  type:'number', unit:'ml' },
      { id:'notes',    label:'Notes',         type:'textarea' },
    ],
  },
  {
    id:'medication-profile', name:'Medication Profile', icon:'💊', repeatable:false, system:true,
    description:'Level of support and pharmacy details.',
    fields:[
      { id:'support_level', label:'Support level',      type:'select', options:['Self-administers','Prompt only','Administer'], system:true },
      { id:'pharmacy',      label:'Pharmacy',           type:'text' },
      { id:'blister',       label:'Blister packs',      type:'yesno' },
      { id:'prn',           label:'PRN (as required) medication', type:'textarea' },
    ],
  },
];

export const newFieldId = label =>
  (label || 'field').toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '').slice(0, 24) + '_' + Date.now().toString(36).slice(-4);

export const newFormId = name =>
  (name || 'form').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 24) + '-' + Date.now().toString(36).slice(-4);
