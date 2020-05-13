
export const GET_POST = 'GET POST';
export const GET_POST_SUCCESS = 'GET POST SUCCESS';
export const GET_POST_FAILURE = 'GET POST FAILURE';


export const getPost = () => ({
  type: GET_POST,
});

export const getPostSuccess = post => ({
  type: GET_POST_SUCCESS,
  payload: post,
});

export const getPostFailure = () => ({
  type: GET_POST_FAILURE,
});


export function fetchPost(id){
  return async dispatch => {
    dispatch(getPost())

    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      const data = await res.json()
      dispatch(getPostSuccess(data))
    } catch(error) {
      dispatch(getPostFailure())
    }



  }
}