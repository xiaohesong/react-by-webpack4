import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import PrivateLayout from './';
import routes from '../routes';

const link = () => (
  <Router>
    <PrivateLayout>
      <Switch>
        {
          routes.map((item,i) => {
            return(<Route exact key={i} path={item.path} component={item.component}/>)
          })
        }
      </Switch>
    </PrivateLayout>
  </Router>
)

export default link