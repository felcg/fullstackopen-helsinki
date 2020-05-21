import React, { useState } from 'react'

import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'

import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { logInUser } from '../../reducers/userReducer'
import { setNotification } from '../../reducers/notificationReducer'
import loginService from '../../services/login'


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    background: '#5d78ff',
    color: 'white',
    '&:hover': {
      background: 'white',
      color: '#5d78ff',
      border: '1px solid #5d78ff',
    },
  },
}))

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const history = useHistory()
  const classes = useStyles()


  const login = async (event) => {
    event.preventDefault()
    // tenta logar, caso nao consiga, chama o logUser() sem parametros
    // para ativar a notificação
    try {
      // recebe o objeto do usuario quando ele tenta logar
      const user = await loginService.login({
        username,
        password,
      })

      dispatch(logInUser(user))
      // guarda as credenciais no localStorage
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
    } catch (error) {
      dispatch(setNotification('Wrong credentials', 3))
    }
    // reseta os campos de username e password
    setUsername('')
    setPassword('')
    history.push('/')
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={login} noValidate>
          <TextField
            className={classes.textField}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  )
}


export default LoginForm
