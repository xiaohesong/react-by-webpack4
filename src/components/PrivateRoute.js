import {Route, Redirect} from 'react-router-dom'
import React from 'react'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    loggedIn() ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

export default PrivateRoute

const loggedIn = () => {
  let authId = localStorage.getItem("authId");
  return Boolean(authId)
}
