import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import ReduxThunk from 'redux-thunk'
import reducers from './philance/reducers'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'

import indexRoutes from "philance/routes/index.jsx";
import "assets/scss/material-dashboard-pro-react.css?v=1.2.0";

const hist = createBrowserHistory();
const store = createStore(reducers, {}, applyMiddleware(ReduxThunk))

ReactDOM.render(
  <Provider store={store}>
    <Router history={hist}>
      <Switch>
        {indexRoutes.map((prop, key) => {
          return <Route path={prop.path} component={prop.component} key={key} />;
        })}
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
