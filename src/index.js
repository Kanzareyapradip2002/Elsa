import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from './App';
import UserContext from './Context/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserContext>
    <App />
  </UserContext>
)
reportWebVitals();
