import { combineReducers } from 'redux'

import list from './List'

const users = combineReducers({
  list,
})

export default users
