import { createRoot } from 'react-dom/client';
import './data.jsx';
import './schedule-screen.jsx';
import './evv-sign-in.jsx';
import './co-worker-card.jsx';
import './messages-screen.jsx';
import './profile-screen.jsx';
import './notifications-screen.jsx';
import './staff-portal-screen.jsx';
import { App } from './App.jsx';

createRoot(document.getElementById('root')).render(<App/>);
