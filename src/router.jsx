/**
 * 定义应用路由
 */

import React from 'react';
// import { Router, Route, IndexRoute, IndexRedirect, browserHistory } from 'react-router';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import '../build/static/css/reset.css';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import RootReducer from './reducers';


import List from './components/List/index';
import Player from './components/Player/index';
import Header from './components/Header/index';

let store = createStore(RootReducer);

export default (
  <Provider store={store}>
    <Router>
      <div>
        <Header />
        {/*<Route exact path="/" component={MusicList}></Route>*/}
        <Route path="/player" component={Player}/>
        <Route path="/list" component={List}/>
      </div>
    </Router>
  </Provider>
);
