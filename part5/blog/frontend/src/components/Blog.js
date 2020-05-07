/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react'
import '../App.css'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 2,
  }

  const flex = { display: 'flex' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <div style={blogStyle}>
          <div style={flex}>
            <p>"{blog.title}" - {blog.author}</p>
            <button onClick={toggleVisibility}>view more</button>
          </div>
        </div>
      </div>
      <div style={showWhenVisible}>
        <div style={blogStyle}>
          <div style={flex}>
            <p>"{blog.title}" - {blog.author}</p>
            <button onClick={toggleVisibility}>hide</button>
          </div>
          <p>{blog.url}</p>
          <div style={flex}><p>{blog.likes}</p> <button>like</button></div>
          <p>{blog.user.username}</p>

        </div>
      </div>
    </div>
  )
}

export default Blog
