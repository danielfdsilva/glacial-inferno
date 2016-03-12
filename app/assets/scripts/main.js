'use strict';
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { syncHistory } from 'react-router-redux';
import reducer from './reducers/reducer';

import UhOh from './views/uhoh';
import App from './views/app';
import Home from './views/home';

// Sync dispatched route actions to the history
const reduxRouterMiddleware = syncHistory(hashHistory);
const finalCreateStore = compose(
  applyMiddleware(reduxRouterMiddleware, thunkMiddleware)
)(createStore);

const store = finalCreateStore(reducer);

render((
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={Home}/>
      </Route>
      <Route path='*' component={App}>
        <IndexRoute component={UhOh}/>
      </Route>
    </Router>
  </Provider>
), document.querySelector('#site-canvas'));
