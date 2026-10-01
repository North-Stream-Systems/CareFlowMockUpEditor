import { createRoot } from 'react-dom/client';
import './common.jsx';
import './mock-data.jsx';
import './sidebar.jsx';
import './revenue-chart.jsx';
import './finance-dashboard.jsx';
import './rate-breakdown-popover.jsx';
import './invoice-detail-panel.jsx';
import './invoices-page.jsx';
import './credit-notes-page.jsx';
import './funders-page.jsx';
import './payroll-page.jsx';
import './coming-soon.jsx';
import './rate-sheet-data.jsx';
import './rate-sheets-page.jsx';
import { App } from './App.jsx';

createRoot(document.getElementById('root')).render(<App />);
