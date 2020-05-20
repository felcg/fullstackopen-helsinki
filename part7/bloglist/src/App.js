import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Switch, Route, Link, useRouteMatch,
} from 'react-router-dom'

import { initializeBlogs } from './reducers/blogReducer'
import { logInUser, logOutUser } from './reducers/userReducer'
import { getAllUsers } from './reducers/userListReducer'

import BlogList from './components/BlogList/BlogList'
import Blog from './components/Blog/Blog'
import BlogForm from './components/BlogForm/BlogForm'
import UserList from './components/UserList/UserList'
import User from './components/User/User'
import LoginForm from './components/LoginForm/LoginForm'
import Notification from './components/Notification/Notification'
import Toggable from './components/Togglable/Togglable'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const users = useSelector((state) => state.users)
  const blogs = useSelector((state) => state.blogs)

  const userMatch = useRouteMatch('/users/:id')
  const userToDisplay = userMatch
    ? users.find((user) => user.id === userMatch.params.id)
    : null

  const blogMatch = useRouteMatch('/blogs/:id')
  const blogToDisplay = blogMatch
    ? blogs.find((blog) => blog.id === blogMatch.params.id)
    : null

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(getAllUsers())
  }, [dispatch])

  // useEffect(() => {
  //   console.log(state)
  // })

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

  const padding = {
    padding: 5,
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
          <div>
            <Link style={padding} to="/">home</Link>
            <Link style={padding} to="/users">users</Link>
          </div>

          <h2>blogs</h2>
          <p>{user.name} logged in</p>
          <button id="logout-button" type="button" onClick={logout}>logout</button>
          <Switch>

            <Route path="/users/:id">
              <User user={userToDisplay} />
            </Route>
            <Route path="/users">
              <UserList />
            </Route>
            <Route path="/blogs/:id">
              <Blog blog={blogToDisplay} />
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
