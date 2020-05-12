import * as actions from '../actions/postActions';

export const initialState = {
  posts:{},
  loading: false,
  hasErrors: false,
}

export default function postsReducer( state = initialState,action){
  switch (action.type) {
    case actions.GET_POST:
      return {...state,loading:true,}

    case actions.GET_POST_SUCCESS:
      return {posts: action.payload ,loading:false,hasErrors:false}

    case actions.GET_POST_FAILURE:
      return {...state,loading:false,hasErrors:true}

    default:
      return state
  }

}