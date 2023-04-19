import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'fontsource-roboto';
import { initDatabase } from './database/mapper/sql.main';

async function init() {
  if (window.utools === undefined) {
    ReactDOM.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
      document.getElementById('root'),
    );
  } else {
    await initDatabase();
    ReactDOM.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
      document.getElementById('root'),
    );
  }
}

init();
