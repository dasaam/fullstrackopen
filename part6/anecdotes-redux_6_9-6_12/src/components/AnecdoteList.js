import { useDispatch, useSelector } from 'react-redux'
import { generateVote } from '../reducers/anecdoteReducer'
import { sendNotificationVote} from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()  
  const anecdotes = useSelector(state => state.anecdote)
  const handleVote = (id) => {

    dispatch(generateVote(id)) 

    const anecdoteToVote = anecdotes.find(n => n.id === id)
    
    dispatch(sendNotificationVote(`you voted ${anecdoteToVote.content}`))
    setTimeout(() => {
      dispatch(sendNotificationVote(''))  
    }, 5000)
  }
  return(
    anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => handleVote(anecdote.id)}>vote</button>
        </div>
      </div>
    )
  )
}

export default AnecdoteList