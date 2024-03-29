import anecdoteService from '../services/anecdotes'

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

      anecdoteService.update(id, changedAnecdote)

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

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    })
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export default anecdoteReducer