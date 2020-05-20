import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch, Route, Link,
} from 'react-router-dom'
import { initializeBlogs } from './reducers/blogReducer'
import { logInUser, logOutUser } from './reducers/userReducer'
import { getAllUsers } from './reducers/userListReducer'
import BlogList from './components/BlogList/BlogList'
import LoginForm from './components/LoginForm/LoginForm'
import BlogForm from './components/BlogForm/BlogForm'
import UserList from './components/UserList/UserList'
import Notification from './components/Notification/Notification'
import Toggable from './components/Togglable/Togglable'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(getAllUsers())
  }, [dispatch])

  const user = useSelector((state) => state.user)

  // Checa se o usuario tem suas credenciais gravadas no localStorage
  // do browser, se tiver ele loga o usuario
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(logInUser(user))
    }
  }, [dispatch])

  const logout = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    dispatch(logOutUser())
  }

  // Mostra o login caso o usuário nao esteja logado
  // e os blogs e formulario para postar um novo caso esteja
  return (
    <div>
      <Notification />
      { user === null ? (
        <div>
          <h1>Please login</h1>
          <LoginForm />
        </div>
      ) : (
        <div>
          <h2>blogs</h2>
          <p>{user.name} logged in</p>
          <button id="logout-button" type="button" onClick={logout}>logout</button>
          <Switch>
            <Route path="/users">
              <UserList />
            </Route>
            <Route path="/">
              <Toggable buttonLabel="Post new blog">
                <BlogForm />
              </Toggable>
              <BlogList />
            </Route>
          </Switch>
        </div>
      )}
    </div>
  )
}

export default App
