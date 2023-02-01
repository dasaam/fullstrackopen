import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { sendNotificationCreate} from '../reducers/notificationReducer'


const AnecdoteForm = (props) => {
  

  const addAnecdote = async(event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    
    props.createAnecdote(content)


    props.sendNotificationCreate(`you created ${content}`)
    setTimeout(() => {
      props.sendNotificationCreate('') 
    }, 5000)
  }

  return (
    <form onSubmit={addAnecdote}>
      <div><input name="anecdote" /></div>
      <button type="submit">create</button>
    </form>
  )
}

const mapDispatchToProps = {
  createAnecdote,
  sendNotificationCreate
}

export default connect(  
  null,   
  mapDispatchToProps
)(AnecdoteForm)

