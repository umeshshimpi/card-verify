import React from 'react';
import ReactDOM from 'react-dom/client';
import CreditCardValidator from './components/CreditCardValidator';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CreditCardValidator />
  </React.StrictMode>
);