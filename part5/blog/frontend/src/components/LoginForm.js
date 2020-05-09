import React, { useState } from 'react'
import PropTypes from 'prop-types'
import loginService from '../services/login'

const LoginForm = ({ logUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

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
      // guarda as credenciais no localStorage
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

      logUser(user)

      // reseta os campos de username e password
      setUsername('')
      setPassword('')
    } catch (error) {
      logUser()
    }
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

LoginForm.propTypes = {
  logUser: PropTypes.func.isRequired,
}

export default LoginForm
