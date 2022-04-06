import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './App';
import ir from './ir';
import store from './store';

const reactContainer = document.getElementById('form');
const root = ReactDOM.createRoot(reactContainer);
root.render(
  <Provider store={store}>
    <App/>
  </Provider>
);

const d3Container = document.getElementById('chart');
ir(store, d3Container);
