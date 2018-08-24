import { combineReducers } from 'redux'

import login from './session/login'

const rootReducer = combineReducers({
  login,
})

export default rootReducer
