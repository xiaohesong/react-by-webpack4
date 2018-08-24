import { GET_USERS, GET_USERS_SUCCESS, GET_USERS_FAILED } from '../../constants/users/ActionType';

export const getUsers = () => ({type: GET_USERS})
export const getUsersSuccess = (data) => ({type: GET_USERS_SUCCESS, data})
export const getUsersFailed = () => ({type: GET_USERS_FAILED})