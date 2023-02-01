import { connect } from 'react-redux'
import { generateVote } from '../reducers/anecdoteReducer'
import { sendNotificationVote} from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  
  const handleVote = (id) => {

    props.generateVote(id)
    
    const anecdoteToVote = props.anecdotes.find(n => n.id === id)

    props.sendNotificationVote(`you voted ${anecdoteToVote.content}`)
    setTimeout(() => {
      props.sendNotificationVote('')
    }, 5000)
  }
  return(
    props.anecdotes.map(anecdote =>
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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdote
  }
}

const mapDispatchToProps = {
  generateVote,
  sendNotificationVote
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)