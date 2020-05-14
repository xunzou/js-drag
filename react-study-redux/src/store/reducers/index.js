import { combineReducers } from 'redux'

import postsReducer from './postsReducer'
import postReducer from './postReducer'
import commitsReducer from './commitsReducer'

const rootReducer = combineReducers({
  posts: postsReducer,
  post: postReducer,
  commits: commitsReducer,
})

export default rootReducer