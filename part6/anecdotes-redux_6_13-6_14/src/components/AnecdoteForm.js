import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { sendNotificationCreate} from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = (props) => {
  const dispatch = useDispatch()

  const addAnecdote = async(event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    
    const newAnecdote = await anecdoteService.createNew(content)    
    dispatch(createAnecdote(newAnecdote))


    dispatch(sendNotificationCreate(`you created ${content}`))
    setTimeout(() => {
      dispatch(sendNotificationCreate(''))  
    }, 5000)
  }

  return (
    <form onSubmit={addAnecdote}>
      <div><input name="anecdote" /></div>
      <button type="submit">create</button>
    </form>
  )
}

export default AnecdoteForm