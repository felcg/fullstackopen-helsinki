import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { logInUser } from '../../reducers/userReducer'
import { setNotification } from '../../reducers/notificationReducer'
import loginService from '../../services/login'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

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
  }
  return (
    <form onSubmit={login}>
      <div>
        username
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">login</button>
    </form>
  )
}

export default LoginForm
