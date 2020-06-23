import * as actions from  '../actions/userActions'

export const initialState = {
  userInfo:{},
  pers:[],
}

export default function userReducer( state = initialState,action){
  switch (action.type) {
    case actions.GET_USER:
      return {...state,userInfo: action.payload}
    case actions.GET_PERS:
      return {...state,pers: action.payload}
    default:
      return state
  }

}