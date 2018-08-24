import {
  LOGIN_FAILED,
  START_LOGIN,
  LOGIN_SUCCESS
} from '../../../constants/session/login/ActionType';

const initState = {
  loading: false,
}

export default function contracts(state = initState, action) {
  switch (action.type) {
    case START_LOGIN:
      return {
        ...state,
        loading: true
      }
    case LOGIN_FAILED:
      return {
        ...state,
        loading: false
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false
      }
    default:
      return state
  }
}
