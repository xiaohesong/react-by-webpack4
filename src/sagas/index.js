import { all } from 'redux-saga/effects'

import {usersSaga} from './users'

function* rootSaga() {
  /*The saga is waiting for a action called LOAD_DASHBOARD to be activated */
  yield all(
    [
      ...usersSaga,
    ]
  )
}

export default rootSaga
