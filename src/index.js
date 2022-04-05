import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './App';
import ir from './ir';
import store from './store';

const container = document.createElement('div');
document.body.append(container)
const root = ReactDOM.createRoot(container);
root.render(
  <Provider store={store}>
    <App/>
  </Provider>
);

ir(store);
