const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  //console.log('action', action)

  switch(action.type) {
    case 'VOTE':
      const id = action.data.id
      const anecdoteToChange = state.find(anecdote => anecdote.id === id)

      const changedAnecdote = { 
        ...anecdoteToChange, 
        votes: anecdoteToChange.votes + 1 
      }

      return state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote )
    case 'INIT_ANECDOTES':      
      return action.data
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    default:
      return state
  }

  return state
}

export const generateVote = (noteId) => {
  return {
    type: 'VOTE',
    data: {
      id: noteId
    }
  }
}

export const createAnecdote = (data) => {
  return {
    type: 'NEW_ANECDOTE',
    data
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes,
  }
}

export default anecdoteReducer