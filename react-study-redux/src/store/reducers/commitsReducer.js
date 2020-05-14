import * as actions from '../actions/commitsActions';

export const initialState = {
  commits:[],
  loading: false,
  hasErrors: false,
}

export default function commitsReducer( state = initialState,action){
  console.log(action.type)
  switch (action.type) {
    case actions.GET_COMMITS:
      return {...state,loading:true,}

    case actions.GET_COMMITS_SUCCESS:
      return {commits: action.payload ,loading:false,hasErrors:false}

    case actions.GET_COMMITS_FAILURE:
      return {...state,loading:false,hasErrors:true}

    default:
      return state
  }

}