import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import {fetchPost} from '../actions/postActions';
import { useParams } from 'react-router-dom';
import {Post } from '../components/Post';



const PostSingle = ({dispatch,loading,post,hasErrors}) => {
  console.log(dispatch,loading,post,hasErrors)
  let { id } = useParams();

  useEffect( () => {
    dispatch(fetchPost(id))
  },[dispatch,id])

  const renderPost = () => {
    if(loading) return <p>加载中……</p>
    if(hasErrors) return <p>靠，出错了</p>
    return <Post post={post} />
  }

  return (
    <section>
      {renderPost()}
      <h2>评论：</h2>
      
    </section>
  )
}

const mapStateToProps = state => ({
  loading: state.post.loading,
  post: state.post.post,
  hasErrors: state.post.hasErrors,
})

export default  connect(mapStateToProps)(PostSingle);