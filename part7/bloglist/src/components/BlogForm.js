import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addBlog } from '../reducers/blogReducer'

const BlogForm = () => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


  const addPost = (event) => {
    event.preventDefault()

    // cria um objeto blog com titulo, author e url
    const blogObject = {
      title,
      author,
      url,
    }

    // envia o objeto blog para o metodo addblog no app.js
    dispatch(addBlog(blogObject))

    // reseta o state do titulo, author e url
    setTitle('')
    setAuthor('')
    setUrl('')
  }


  // Passamos o event.target do onChange desestruturado, pegando
  // apenas o targe e o usando para modificar o States desejados
  return (
    <form onSubmit={addPost} className="blogForm">
      <div>
        title
        <input
          id="title"
          type="text"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author
        <input
          id="author"
          type="text"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url
        <input
          id="url"
          type="text"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button id="create-button" type="submit">create</button>
    </form>
  )
}


export default BlogForm
