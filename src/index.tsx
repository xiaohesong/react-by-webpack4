import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { Provider } from 'react-redux'
import configureStore from './configureStore'
import App from './app'

const store = configureStore()

if (process.env.NODE_ENV === 'production') {
  const RELEASE_VERSION = process.env.XHS_RELEASE_VERSION
  console.group('Release')
  console.log(`Release Version: production-${RELEASE_VERSION}`)
  console.log('Environment: production');
  console.groupEnd()
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)