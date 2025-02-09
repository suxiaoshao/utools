import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { initDatabase } from './database/mapper/sql.main';

async function init() {
  if (window.utools === undefined) {
    ReactDOM.createRoot(document.querySelector('#root') as HTMLElement).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    );
  } else {
    await initDatabase();
    ReactDOM.createRoot(document.querySelector('#root') as HTMLElement).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    );
  }
}

init();
