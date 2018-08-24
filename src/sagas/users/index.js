import { put, call, takeEvery } from 'redux-saga/effects'
import * as actions from '../../actions/users'
import {callGetUsers} from './Api'
import {
  GET_USERS
} from '../../constants/users/ActionType';

export const usersSaga = [
  takeEvery(GET_USERS, getUsers),
]

export function* getUsers(action) {
  try {
    const data = yield call(callGetUsers, action);
    yield put(actions.getUsersSuccess(data));
  } catch(error) {
    yield put(actions.getUsersFailed());
  }
}
