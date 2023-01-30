const notificationReducer = (state = '', action) => {
    switch (action.type) {
      case 'SET_NOTIFICATION_CREATE':
        
        return action.notification
      
      case 'SET_NOTIFICATION_VOTE':
        return action.notification

      default:
        return state
    }
}
  
export const sendNotificationCreate = notification => {
    return {
        type: 'SET_NOTIFICATION_CREATE',
        notification,
    }
}

export const sendNotificationVote = notification => {
  return {
      type: 'SET_NOTIFICATION_VOTE',
      notification,
  }
}

export default notificationReducer