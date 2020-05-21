import React from 'react'
import { styled } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logOutUser } from '../../reducers/userReducer'


const MyAppBar = styled(AppBar)({
  background: '#1fbb87',
  'margin-bottom': '20px',
  'box-shadow': 'none',
})

const MyToolBar = styled(Toolbar)({
  padding: '0',
  margin: '0',
})

const MyGrid = styled(Grid)({
  display: 'flex',
  'align-items': 'baseline',
})

const Navbar = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const logout = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    dispatch(logOutUser())
  }

  return (
    <MyAppBar position="static" color="secondary">
      <MyToolBar>
        <div style={{ flex: 1 }}>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/users">
            Users
          </Button>
        </div>
        {user && (
          <MyGrid>
            <Typography variant="subtitle2">
              Logged as {user.name}
            </Typography>
            <Button color="inherit" component={Link} to="/newBlog">Post new blog
            </Button>
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          </MyGrid>
        )}
      </MyToolBar>
    </MyAppBar>
  )
}

export default Navbar
