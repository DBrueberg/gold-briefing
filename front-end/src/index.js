// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - index.js
// December 22, 2022
// Last Edited (Initials, Date, Edits):
//  (DAB, 12/22/2022, Added in Browser Router for SPA page navigation)

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
