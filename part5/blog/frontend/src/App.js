import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Toggable from './components/Toggable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  // Checa se o usuario tem suas credenciais gravadas no localStorage
  // do browser, se tiver ele loga o usuario
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogeappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const addBlog = async (event) => {
    event.preventDefault()
    try {
      // cria um objeto blog com titulo, author e url
      const BlogObject = {
        title,
        author,
        url,
      }

      // retorna o blog criado pelo blogService e o adiciona a lista de blogs
      const returnedBlog = await blogService.create(BlogObject)
      setBlogs(blogs.concat(returnedBlog))

      setNotificationMessage(`A new blog ${title} by ${author} was added`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)

      // reseta o state do titulo, author e url
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (error) {
      setNotificationMessage(error)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      // recebe o objeto do usuario quando ele tenta logar
      const user = await loginService.login({
        username,
        password,
      })

      // guarda as credenciais no localStorage
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      // usa o setToken do blogService para dar ao usuario seu token
      // para que ele possa criar blogs novos, o coloca como usuario ativo
      // e reseta os campos de username e password
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(exception)
      setNotificationMessage('Wrong credentials')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const logout = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)
  }

  // Mostra o login caso o usuário nao esteja logado
  // e os blogs e formulario para postar um novo caso esteja
  return (
    <div>
      <Notification message={notificationMessage} />
      <h1>Please login</h1>
      { user === null ? (
        <div>
          <LoginForm
            handleLogin={handleLogin}
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
          />
        </div>
      ) : (
        <div>
          <h2>blogs</h2>
          <p>{user.name} logged in</p>
          <button type="button" onClick={logout}>logout</button>
          <Toggable buttonLabel="Post new blog">
            <h2>Create New</h2>
            <BlogForm
              onSubmit={addBlog}
              title={title}
              author={author}
              url={url}
              setTitle={setTitle}
              setAuthor={setAuthor}
              setUrl={setUrl}
            />
          </Toggable>

          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
