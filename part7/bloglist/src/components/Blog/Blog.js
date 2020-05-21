/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import { connect, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
  toggleVisibility, addLike, removeBlog, addComment,
} from '../../reducers/blogReducer'
import { setNotification } from '../../reducers/notificationReducer'

const Blog = ({
  blog, removeBlog, addLike, addComment,
}) => {
  const postComment = async (event) => {
    try {
      event.preventDefault()
      const comment = {
        text: event.target.comment.value,
      }
      event.target.comment.value = ''
      await addComment(blog.id, comment)
      setNotification('Your comment was posted', 3)
    } catch (error) {
      setNotification('There was an error with your comment', 3)
    }
  }

  const history = useHistory()
  const user = useSelector((state) => state.user.id)

  if (!blog) {
    return null
  }

  const loggedUserIsCreator = user === blog.user.id

  return (
    <div>
      <div className="blogFull">
        <div>
          <h1>{blog.title}</h1>
          <h3>by {blog.author}</h3>
          <p>{blog.url}</p>
          <div className="blogLikes">
            <p id="likes">{blog.likes}<button id="like-button" onClick={() => addLike(blog)}>like</button></p>
          </div>
          <p>added by {blog.user ? blog.user.username : null}</p>
          {loggedUserIsCreator
        && (
          <button onClick={() => {
            removeBlog(blog)
            history.push('/')
          }}
          >remove
          </button>
        ) }
        </div>
      </div>
      <div>
        <h2>Comments</h2>
        <form onSubmit={postComment}>
          <input
            id="comment"
            type="text"
            name="comment"
          />
          <button id="create-button" type="submit">comment</button>
        </form>
        <ul>{blog.comments.map((comment) => (
          <li key={comment.id}>{comment.text}</li>
        ))}
        </ul>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  blogs: state.blogs,
})

const mapDispatchToProps = {
  toggleVisibility, addLike, removeBlog, addComment, setNotification,
}

const ConnectedBlog = connect(mapStateToProps, mapDispatchToProps)(Blog)

export default ConnectedBlog
