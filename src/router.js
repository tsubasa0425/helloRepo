import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Products from './routes/Products';
import LoginPage from './routes/LoginPage';
import SuccessPage from './routes/SuccessPage';
import CountPage from './routes/CountPage';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/products" exact component={Products} />
        <Route path="/login" exact component={LoginPage} />
        <Route path="/success" exact component={SuccessPage} />
        <Route path="/count" exact component={CountPage} />
      </Switch>
    </Router>
    
  );
}

export default RouterConfig;
