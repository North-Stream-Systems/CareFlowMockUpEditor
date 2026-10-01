import { createRoot } from 'react-dom/client';
import './constants.jsx';
import './helpers.jsx';
import './mock-data.jsx';
import './sidebar.jsx';
import './profile-tabs.jsx';
import './qr-code-generator.jsx';
import './client-profile-modal.jsx';
import './client-list.jsx';
import './referrals-page.jsx';
import './incidents-page.jsx';
import './complaints-page.jsx';
import './simple-cs-pages.jsx';
import { App } from './App.jsx';

createRoot(document.getElementById('root')).render(<App/>);
