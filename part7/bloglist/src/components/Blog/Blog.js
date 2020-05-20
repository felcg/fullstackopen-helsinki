import React from 'react'
import { addLike } from '../../reducers/blogReducer'

const Blog = ({ blog }) => {
  if (!blog) {
    return null
  }
  console.log(blog)
  return (
    <div>
      <p>{blog.url}</p>
      <p>{blog.likes} <button id="like-button" onClick={() => addLike(blog)}>like</button></p>
      <p>added by {blog.user.username}</p>
    </div>
  )
}

export default Blog
