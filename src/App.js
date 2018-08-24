import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import asyncComponent from './components/AsyncComponent';
import PrivateRoute from "./components/PrivateRoute";
import './App.css';
import RouteLink from './components/layout/Link'

const Register = asyncComponent(() => import( './components/session/register'));
const Login = asyncComponent(() => import('./components/session/login'))

const hello = () => (
  <Router>
    <Switch>
      <Route exact component={Register} path='/register'/>
      <Route exact component={Login} path='/login'/>
      <PrivateRoute component={RouteLink} path='/' />
    </Switch>
  </Router>
)

export default hello