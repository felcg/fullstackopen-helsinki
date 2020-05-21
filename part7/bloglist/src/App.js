import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Switch, Route, useRouteMatch,
} from 'react-router-dom'
import './App.css'

import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'

import { initializeBlogs } from './reducers/blogReducer'
import { logInUser } from './reducers/userReducer'
import { getAllUsers } from './reducers/userListReducer'

import BlogList from './components/BlogList/BlogList'
import Blog from './components/Blog/Blog'
import BlogForm from './components/BlogForm/BlogForm'
import UserList from './components/UserList/UserList'
import User from './components/User/User'
import LoginForm from './components/LoginForm/LoginForm'
import Notification from './components/Notification/Notification'
import Navbar from './components/Navbar/Navbar'

const useStyles = makeStyles({
  container: {
    padding: '0',
    margin: '0',
    maxWidth: 'none',
  },
})

const App = () => {
  const dispatch = useDispatch()
  const classes = useStyles()
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

  // Checa se o usuario tem suas credenciais gravadas no localStorage
  // do browser, se tiver ele loga o usuario
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(logInUser(user))
    }
  }, [dispatch])

  // Mostra o login caso o usuário nao esteja logado
  // e os blogs e formulario para postar um novo caso esteja
  return (
    <Container className={classes.container}>
      <Navbar />
      <Notification />
      { user === null ? (
        <LoginForm />
      ) : (
        <div>
          <Switch>
            <Route path="/newBlog">
              <BlogForm />
            </Route>
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
              <BlogList />
            </Route>
          </Switch>
        </div>
      )}
    </Container>
  )
}

export default App
