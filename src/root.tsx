import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './app';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/scss/main.scss';
import 'ag-grid-community/styles/ag-grid.css'; // Mandatory CSS required by the grid
import 'ag-grid-community/styles/ag-theme-quartz.css'; // Optional Theme applied to the grid

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
