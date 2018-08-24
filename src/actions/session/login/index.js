import {START_LOGIN, LOGIN_SUCCESS, LOGIN_FAILED} from '../../../constants/session/login/ActionType';

export const startLogin = (params) => ({type: START_LOGIN, params})
export const loginSuccess = () => ({type: LOGIN_SUCCESS})
export const loginFailed = () => ({type: LOGIN_FAILED})