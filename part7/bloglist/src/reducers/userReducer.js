import usersService from '../services/users'

const userReducer = (state = null, action) => {
  switch (action.type) {
  case 'ALL_USERS':
    return action.data
  case 'LOGGED_USER':
    return action.data
  default:
    return state
  }
}

export const getAllUsers = () => async (dispatch) => {
  const users = await usersService.getAll()
  console.log(users)
  dispatch({
    type: 'ALL_USERS',
    data: users,
  })
}

export const getLoggedUser = (credentials) => async (dispatch) => {
  const users = await usersService.getAll()
  const loggedUser = users.find((user) => user.id === credentials.id)
  console.log(loggedUser)
  dispatch({
    type: 'LOGGED_USER',
    data: loggedUser,
  })
}

export default userReducer
