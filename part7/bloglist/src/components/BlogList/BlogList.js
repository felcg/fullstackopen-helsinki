/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { toggleVisibility, addLike, removeBlog } from '../../reducers/blogReducer'


const Blog = ({ blog }) => {
  const flex = { display: 'flex' }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 2,
    width: 400,
  }
  return (
    <div>
      <div className="blogPartial">
        <div style={blogStyle}>
          <div style={flex}>
            <Link to={`/blogs/${blog.id}`}>"{blog.title}" - {blog.author}</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

const BlogList = ({
  blogs, toggleVisibility, addLike, removeBlog,
}) => (
  <div>
    {blogs.map((blog) => (
      <Blog
        key={blog.id}
        blog={blog}
        toggleVisibility={toggleVisibility}
        removeBlog={removeBlog}
        addLike={addLike}
      />
    ))}
  </div>
)

const mapStateToProps = (state) => ({
  blogs: state.blogs,
})

const mapDispatchToProps = {
  toggleVisibility, addLike, removeBlog,
}

const ConnectedBlogs = connect(mapStateToProps, mapDispatchToProps)(BlogList)

export default ConnectedBlogs
