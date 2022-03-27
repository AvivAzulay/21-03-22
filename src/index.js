import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux'
import { store } from './store/store';
import './assets/styles/styles.scss'
import ReactDOM from 'react-dom';
import { App } from './App';
import React from 'react';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
