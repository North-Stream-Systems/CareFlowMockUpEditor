// ── STORE ─────────────────────────────────────────────────────────────────────
// Org-level config (forms + overview layout) persisted to localStorage so changes made in
// Clients › Settings or the Setup wizard carry across pages and reloads.
// In the real product this is a per-organisation record on the server.
import { useSyncExternalStore } from 'react';
import { DEFAULT_FORMS } from './forms.js';
import { DEFAULT_LAYOUT, TEMPLATES } from './widgets.js';

const KEY = 'cf_client_overview_v1';
const listeners = new Set();
const defaults = () => ({ forms: DEFAULT_FORMS, layout: DEFAULT_LAYOUT, templateId: 'standard' });

let state = load();

function load() {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY));
    if (raw && Array.isArray(raw.forms) && Array.isArray(raw.layout)) return raw;
  } catch { /* fall through to defaults */ }
  return defaults();
}

function write(next) {
  state = next;
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* storage unavailable: keep in memory */ }
  listeners.forEach(l => l());
}

const subscribe = l => { listeners.add(l); return () => listeners.delete(l); };

// [config, update] — update takes a partial object or a function of the current config.
export function useOverviewConfig() {
  const cfg = useSyncExternalStore(subscribe, () => state);
  const update = patch => write({ ...state, ...(typeof patch === 'function' ? patch(state) : patch) });
  return [cfg, update];
}

export const applyTemplate = id => {
  const t = TEMPLATES.find(x => x.id === id);
  if (t) write({ ...state, layout: t.layout, templateId: id });
};

export const resetOverviewConfig = () => write(defaults());

export const getForm = (cfg, id) => cfg.forms.find(f => f.id === id);
