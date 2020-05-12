
export const GET_POSTS = 'GET POSTS';
export const GET_POSTS_SUCCESS = 'GET POSTS SUCCESS';
export const GET_POSTS_FAILURE = 'GET POSTS FAILURE';


export const getPosts = () => ({
  type: GET_POSTS,
});

export const getPostsSuccess = posts => ({
  type: GET_POSTS_SUCCESS,
  payload: posts,
});

export const getPostsFailure = () => ({
  type: GET_POSTS_FAILURE,
});


export function fetchPosts(){
  return async dispatch => {
    dispatch(getPosts())

    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts')
      const data = await res.json()
      dispatch(getPostsSuccess(data))
    } catch(error) {
      dispatch(getPostsFailure())
    }



  }
}