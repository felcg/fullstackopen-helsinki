import blogService from '../services/blogs'

const userReducer = (state = null, action) => {
  switch (action.type) {
  case 'LOG_IN':
    return action.data
  case 'LOG_OUT':
    return null
  default:
    return state
  }
}


export const logInUser = (user) => async (dispatch) => {
  dispatch({
    type: 'LOG_IN',
    data: user,
  })
  blogService.setToken(user.token)
}

export const logOutUser = () => ({
  type: 'LOG_OUT',
})

export default userReducer
