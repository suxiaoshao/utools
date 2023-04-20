import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'fontsource-roboto';
import { initDatabase } from './database/mapper/sql.main';

async function init() {
  if (window.utools === undefined) {
    ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    );
  } else {
    await initDatabase();
    ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    );
  }
}

init();
