export let timeoutID

const notificationReducer = (state = {}, action) => {
  switch (action.type) {
  case ('NEW_NOTIFICATION'):
    return {
      notification: true,
      message: action.message,
    }
  case ('REMOVE_NOTIFICATION'):
    return {
      notification: false,
      message: '',
    }
  default:
    return state
  }
}

export const removeNotification = () => ({
  type: 'REMOVE_NOTIFICATION',
})

export const setNotification = (message, duration) => async (dispatch) => {
  dispatch({
    type: 'NEW_NOTIFICATION',
    message,
  })
  timeoutID = setTimeout(() => {
    dispatch(removeNotification())
  }, duration * 1000)
}


export default notificationReducer
