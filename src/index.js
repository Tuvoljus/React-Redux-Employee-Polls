import React from 'react';
import ReactDOM from 'react-dom/client';

// import { configureStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

// import reducer from './reducers';
// import middleware from './middleware';
import App from './App';
// import configureStore from './configureStore';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

// const store = configureStore(reducer, middleware);

import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
