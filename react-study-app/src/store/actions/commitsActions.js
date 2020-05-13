
export const GET_COMMITS = 'GET COMMITS';
export const GET_COMMITS_SUCCESS = 'GET COMMITS SUCCESS';
export const GET_COMMITS_FAILURE = 'GET COMMITS FAILURE';


export const getCommits = () => ({
  type: GET_COMMITS,
});

export const getCommitsSuccess = commits => ({
  type: GET_COMMITS_SUCCESS,
  payload: commits,
});

export const getCommitsFailure = () => ({
  type: GET_COMMITS_FAILURE,
});


export function fetchCommits(id){
  return async dispatch => {
    dispatch(getCommits())

    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`)
      const data = await res.json()
      dispatch(getCommitsSuccess(data))
    } catch(error) {
      dispatch(getCommitsFailure())
    }



  }
}