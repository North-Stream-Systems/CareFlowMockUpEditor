import { createRoot } from 'react-dom/client';
import './common.jsx';
import './step-1-organisation-details.jsx';
import './step-2-regulator-and-region.jsx';
import './step-3-zones.jsx';
import './step-4-service-types.jsx';
import './step-5-billing-rate-sheets.jsx';
import './step-6-roles-and-permissions.jsx';
import './step-7-invite-team.jsx';
import './step-8-client-profiles.jsx';
import './step-9-go-live.jsx';
import './complete-screen.jsx';
import { App } from './App.jsx';

createRoot(document.getElementById('root')).render(<App/>);
