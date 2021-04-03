import api from "../../api";

export const GET_USER = 'GET USER';
export const GET_PERS = 'GET PERS';
export const getUser = (data) => ({
  type: GET_USER,
  payload: data,
});
export const getPers = (data) => ({
  type: GET_PERS,
  payload: data,
});

export function fetchPers(){
  return async dispatch => {
    const res = await api.login.getPers({Proids:[401]})
    dispatch(getPers(res.result))
  }
}
export function fetchUser(){
  return async dispatch => {
    const res = await api.login.getUserRoles({})
    dispatch(getUser(res.result))
  }
}