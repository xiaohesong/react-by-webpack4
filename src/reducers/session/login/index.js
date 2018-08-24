import {
  LOGIN_FAILEDF,
  START_LOGIN
} from '../../../constants/session/login';

const initState = {
  loading: false,
  userList: [{}]
}

export default function contracts(state = initState, action) {
  switch (action.type) {
    case START_LOGIN:
      return {
        ...state,
        loading: true
      }
    case LOGIN_FAILEDF:
      return {
        ...state,
        loading: false
      }
    default:
      return state
  }
}
