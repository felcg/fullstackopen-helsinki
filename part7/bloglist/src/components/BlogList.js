/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import { connect } from 'react-redux'
import { toggleVisibility } from '../reducers/blogReducer'


const Blog = ({
  blog, removeBlog, showRemoveButton, toggleVisibility,
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

  return (
    <div>
      {!blog.visibility
        ? (
          <div className="blogPartial">
            <div style={blogStyle}>
              <div style={flex}>
                <p>"{blog.title}" - {blog.author}</p>
                <button onClick={() => toggleVisibility(blog.id)}>view more</button>
              </div>
            </div>
          </div>
        )
        : (
          <div className="blogFull">
            <div style={blogStyle}>
              <div style={flex}>
                <p>"{blog.title}" - {blog.author}</p>
                <button onClick={() => toggleVisibility(blog.id)}>hide</button>
              </div>
              <p>{blog.url}</p>
              <div className="blogLikes" style={flex}>
                {/* <p id="likes">{likes}</p> */}
                {/* se colocasse addLike(blog) direto ao invés de
                () => addLike() o onlick dispararia para todos os blogs */}
                {/* <button id="like-button" onClick={() => addLike(blog)}>like</button> */}
              </div>
              <p>{blog.user ? blog.user.username : null}</p>
              {/* usando o Inline If with Logical && Operator mostramos o botão para remover
              o blog caso showRemoveButton seja true */}
              {showRemoveButton && <button onClick={() => removeBlog(blog)}>remove</button> }
            </div>
          </div>
        )}
    </div>
  )
}

const BlogList = ({ blogs, toggleVisibility }) => (
  <div>
    {blogs.map((blog) => (
      <Blog
        key={blog.id}
        blog={blog}
        toggleVisibility={toggleVisibility}
      />
    ))}
  </div>
)

const mapStateToProps = (state) => ({
  blogs: state.blogs,
})

const mapDispatchToProps = {
  toggleVisibility,
}

const ConnectedBlogs = connect(mapStateToProps, mapDispatchToProps)(BlogList)

export default ConnectedBlogs
