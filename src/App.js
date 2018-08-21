import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import RouteLink from './components/layout/Link'
import Input from './components/inputs/Input'

const hello = () => (
  <Router>
    <Switch>
      {/* <Route exact component={Register} path='/register'/>
      <Route exact component={Login} path='/login'/> */}
      <Route component={RouteLink} path='/' />
      {/* <div className='app'>
        <Input value={3} />
      </div> */}
      {/* <PrivateRoute component={MainLayout} path="/"/> */}
    </Switch>
  </Router>
)

export default hello