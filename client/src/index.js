// src/index.js  (CRA)  OR  src/main.jsx  (Vite)
// ─────────────────────────────────────────────
// Make sure THIS IMPORT EXISTS at the top.
// Without it, Tailwind styles will NEVER load.

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';   // <── THIS LINE IS CRITICAL
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);