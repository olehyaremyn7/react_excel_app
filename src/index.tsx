import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import store from './redux';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
);
