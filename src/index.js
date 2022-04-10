import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './App';
import ir from './ir';
import payments from './payments';
import store from './store';

const reactContainer = document.getElementById('form');
const root = ReactDOM.createRoot(reactContainer);
root.render(
  <Provider store={store}>
    <App/>
  </Provider>
);

const irContainer = document.getElementById('ir');
ir(store, irContainer);

const paymentsContainer = document.getElementById('payments');
payments(store, paymentsContainer);
