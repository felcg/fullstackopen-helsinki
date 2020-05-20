/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { toggleVisibility, addLike, removeBlog } from '../../reducers/blogReducer'

const Blog = ({
  blog, removeBlog, addLike,
}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 2,
    width: 400,
  }
  const flex = { display: 'flex' }
  const history = useHistory()

  if (!blog) {
    return null
  }
  console.log(blog)
  return (
    <div className="blogFull">
      <div style={blogStyle}>
        <div style={flex}>
          <p>"{blog.title}" - {blog.author}</p>
        </div>
        <p>{blog.url}</p>
        <div className="blogLikes" style={flex}>
          <p id="likes">{blog.likes}</p>
          {/* se colocasse addLike(blog) direto ao invés de
        () => addLike() o onlick dispararia para todos os blogs */}
          <button
            id="like-button"
            onClick={() => {
              addLike(blog)
            }}
          >like
          </button>
        </div>
        <p>{blog.user ? blog.user.username : null}</p>
        {/* usando o Inline If with Logical && Operator mostramos o botão para remover
      o blog caso showRemoveButton seja true */}
        {/* {showRemoveButton &&
        <button onClick={() => removeBlog(blog)}>remove</button> } */}
        <button onClick={() => {
          removeBlog(blog)
          history.push('/')
        }}
        >remove
        </button>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  blogs: state.blogs,
})

const mapDispatchToProps = {
  toggleVisibility, addLike, removeBlog,
}

const ConnectedBlog = connect(mapStateToProps, mapDispatchToProps)(Blog)

export default ConnectedBlog
