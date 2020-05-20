import React, {} from 'react'
import { connect } from 'react-redux'
import { addBlog } from '../../reducers/blogReducer'
import { setNotification } from '../../reducers/notificationReducer'

const BlogForm = ({ addBlog, setNotification }) => {
  const addPost = async (event) => {
    try {
      event.preventDefault()
      // cria um objeto blog com titulo, author e url
      const blogObject = {
        title: event.target.title.value,
        author: event.target.author.value,
        url: event.target.author.value,
      }
      // reseta o state do titulo, author e url
      event.target.title.value = ''
      event.target.author.value = ''
      event.target.url.value = ''

      // envia o objeto blog para o metodo addblog no app.js
      await addBlog(blogObject)
      setNotification(`A new blog ${blogObject.title} by ${blogObject.author} was added`, 3)
    } catch (error) {
      setNotification('There was an error with your post, please check all fields', 3)
    }
  }

  return (
    <div>
      <h2>Create New</h2>
      <form onSubmit={addPost} className="blogForm">
        <div>
          title
          <input
            id="title"
            type="text"
            name="title"
          />
        </div>
        <div>
          author
          <input
            id="author"
            type="text"
            name="author"
          />
        </div>
        <div>
          url
          <input
            id="url"
            type="text"
            name="url"
          />
        </div>
        <button id="create-button" type="submit">create</button>
      </form>
    </div>
  )
}


export default connect(null, { addBlog, setNotification })(BlogForm)
