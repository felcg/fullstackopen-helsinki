/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'
import '../App.css'

const Blog = ({ blog, removeBlog, showRemoveButton }) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 2,
    width: 400,
  }

  const flex = { display: 'flex' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  // esse método recebe o blog atual e aumenta em 1 o seus likes
  // em seguida usa o blogService para fazer o PUT request e entao
  // atualiza o state dos likes
  const addLike = async (blog) => {
    blog.likes += 1
    const response = await blogService.updateLikes(blog)
    setLikes(response.likes)
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
          <div style={flex}>
            <p>{likes}</p>
            {/* se colocasse addLike(blog) direto ao invés de
             () => addLike() o onlick dispararia para todos os blogs */}
            <button onClick={() => addLike(blog)}>like</button>
          </div>
          <p>{blog.user.username}</p>
          {/* usando o Inline If with Logical && Operator mostramos o botão para remover
          o blog caso showRemoveButton seja true */}
          {showRemoveButton && <button onClick={() => removeBlog(blog)}>remove</button> }
        </div>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    }),
  }),
  removeBlog: PropTypes.func.isRequired,
  showRemoveButton: PropTypes.bool.isRequired,
}

export default Blog
