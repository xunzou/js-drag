import React from 'react';
import {Link} from 'react-router-dom';

export const Post = ({ post ,isList}) => {
  return (
    <article className="post-excerpt">
      <h2>
        {isList ? <Link to={`post${post.id}`}> {post.title} </Link> : post.title }
      </h2>
      <p>{isList ? post.body.substring(0, 100) + '...' : post.body }</p>
      {isList ? <p><Link to={`post${post.id}`} className="button"> more content ... </Link></p> : '' }
    </article>
  )

}