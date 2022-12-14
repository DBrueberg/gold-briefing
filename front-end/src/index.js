// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - index.js
// December 22, 2022
// Last Edited (Initials, Date, Edits):

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import storeFactory from './redux/store';
import stateData from './redux/initialState.json';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Creating the application at 'root'
const root = ReactDOM.createRoot(document.getElementById('root'));
// Using the storeFactory to create a store with default 
// stateData
const store = storeFactory(stateData);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
