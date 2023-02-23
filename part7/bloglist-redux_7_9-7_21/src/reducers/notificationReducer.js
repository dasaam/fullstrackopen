const notificationReducer = (state = '', action) => {
    switch (action.type) {
      case 'SET_NOTIFICATION':
        return action.notification
      default:
        return state
    }
}

export const handleNotification = (message, typeMessage) => {
    return {
        type: 'SET_NOTIFICATION',
        notification: {
          message,
          typeMessage
        },
    }
}

export default notificationReducer