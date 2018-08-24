import {
  GET_USERS_SUCCESS
} from '../../constants/users/ActionType';

const initState = {
  loading: false,
  userList: [{}]
}

export default function contracts(state = initState, action) {
  switch (action.type) {
    case GET_USERS_SUCCESS:
      return {
        ...state,
        userList: action.data
      }
    default:
      return state
  }
}
