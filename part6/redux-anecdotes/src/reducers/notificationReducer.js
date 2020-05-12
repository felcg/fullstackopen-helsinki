const initialState = {
  notification:false,
  message: ''
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
  case("NEW_NOTIFICATION"):
    return {
      notification: true,
      message: action.message
    }
    case('REMOVE_NOTIFICATION'):
    return {
      notification: false,
      message: ""
    }
  default:
    return state
  }
}

export const setNotification = (message) => ({
  type: 'NEW_NOTIFICATION',
  message: message
})

export const removeNotification = () => ({
  type: 'REMOVE_NOTIFICATION'
})

export default notificationReducer
