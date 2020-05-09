import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Toggable from './components/Toggable'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)

  useEffect(() => {
    const getData = async () => {
      const blogs = await blogService.getAll()
      // Usa o sort para ordenar o array dos blogs pelos blogs com
      // mais likes
      const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(sortedBlogs)
    }
    getData()
  }, [])

  // Checa se o usuario tem suas credenciais gravadas no localStorage
  // do browser, se tiver ele loga o usuario
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const addBlog = async (blogObject) => {
    try {
      // retorna o blog criado pelo blogService e o adiciona a lista de blogs
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setNotificationMessage(`A new blog ${returnedBlog.title} by ${returnedBlog.author} was added`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    } catch (error) {
      setNotificationMessage(error)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const handleLogin = async (returnedUser) => {
    try {
      // usa o setToken do blogService para dar ao usuario seu token
      // para que ele possa criar blogs novos, o coloca como usuario ativo
      blogService.setToken(returnedUser.token)
      setUser(returnedUser)
    } catch (exception) {
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

  // Pergunta ao usuário se ele realmente quer remover o blog e o remove
  // caso a resposta seja positiva, entao atualiza o state dos blogs com
  // um array com os blogs sem o blog que foi removido
  const removeBlog = async (blog) => {
    if (window.confirm(`Do you really want to remove ${blog.title}?`)) {
      await blogService.deleteBlog(blog)
      const newBlogs = blogs.filter((b) => b.id !== blog.id)
      setBlogs(newBlogs)
    }
  }

  // Mostra o login caso o usuário nao esteja logado
  // e os blogs e formulario para postar um novo caso esteja
  return (
    <div>
      <Notification message={notificationMessage} />
      <h1>Please login</h1>
      { user === null ? (
        <div>
          <LoginForm logUser={handleLogin} />
        </div>
      ) : (
        <div>
          <h2>blogs</h2>
          <p>{user.name} logged in</p>
          <button id="logout-button" type="button" onClick={logout}>logout</button>
          <Toggable buttonLabel="Post new blog">
            <h2>Create New</h2>
            <BlogForm
              addBlog={addBlog}
            />
          </Toggable>

          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              removeBlog={removeBlog}
              // showRemoveButton tem o valor true caso o id do usuario
              // seja igual ao id do usuario que postou o blog
              showRemoveButton={user && (user.id === blog.user.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
