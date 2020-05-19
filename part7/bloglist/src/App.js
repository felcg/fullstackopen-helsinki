import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'
import { getLoggedUser, getAllUsers } from './reducers/userReducer'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Toggable from './components/Toggable'
import blogService from './services/blogs'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(getAllUsers())
  }, [dispatch])
  const [user, setUser] = useState(null)

  // Checa se o usuario tem suas credenciais gravadas no localStorage
  // do browser, se tiver ele loga o usuario
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      dispatch(getLoggedUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (returnedUser) => {
    try {
      // usa o setToken do blogService para dar ao usuario seu token
      // para que ele possa criar blogs novos, o coloca como usuario ativo
      blogService.setToken(returnedUser.token)
      setUser(returnedUser)
      dispatch(getLoggedUser(returnedUser))
    } catch (exception) {
      dispatch(setNotification('Wrong credentials', 3))
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
      <Notification />
      { user === null ? (
        <div>
          <h1>Please login</h1>
          <LoginForm logUser={handleLogin} />
        </div>
      ) : (
        <div>
          <h2>blogs</h2>
          <p>{user.name} logged in</p>
          <button id="logout-button" type="button" onClick={logout}>logout</button>
          <Toggable buttonLabel="Post new blog">
            <BlogForm />
          </Toggable>
          <BlogList />
        </div>
      )}
    </div>
  )
}

export default App
