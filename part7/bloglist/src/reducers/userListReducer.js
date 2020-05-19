import usersService from '../services/users'

const userListReducer = (state = null, action) => {
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
  dispatch({
    type: 'ALL_USERS',
    data: users,
  })
}

export const getLoggedUser = (credentials) => async (dispatch) => {
  const users = await usersService.getAll()
  const loggedUser = users.find((user) => user.id === credentials.id)
  dispatch({
    type: 'LOGGED_USER',
    data: loggedUser,
  })
}

export default userListReducer
