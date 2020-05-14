import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import {fetchPost} from '../store/actions/postActions';
import {fetchCommits} from '../store/actions/commitsActions';
import { useParams } from 'react-router-dom';
import {Post } from '../components/Post';



const PostSingle = ({dispatch,post,loading,hasErrors,commits,cloading,chasErrors}) => {
  // console.log(arguments)
  // console.log(dispatch,post,loading,hasErrors,commits,cloading,chasErrors)
  let { id } = useParams();

  useEffect( () => {
    dispatch(fetchPost(id))
    dispatch(fetchCommits(id))
  },[dispatch,id])

  const renderPost = () => {
    if(loading) return <p>加载中……</p>
    if(hasErrors) return <p>靠，出错了</p>
    return <Post post={post} />
  }
  const renderCommits = () => {
    if(cloading) return <p>加载中……</p>
    if(chasErrors) return <p>靠，出错了</p>
    return commits.map( el =>{
       return ( <div key={el.id}>
          <h3>Name:{el.name}    </h3>
          <i>Email:{el.email}</i>
          <p>Commit:{el.body}</p>
          <hr />
        </div> )
    })
  }

  return (
    <section>
      {renderPost()}
      <h2>评论：</h2>
      {renderCommits()}
    </section>
  )
}

const mapStateToProps = state => ({
  loading: state.post.loading,
  post: state.post.post,
  hasErrors: state.post.hasErrors,
  cloading: state.commits.loading,
  commits: state.commits.commits,
  chasErrors: state.commits.hasErrors,
})

export default  connect(mapStateToProps)(PostSingle);