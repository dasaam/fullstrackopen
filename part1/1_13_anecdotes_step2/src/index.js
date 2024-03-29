import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const anecdotesSpaces = Array(6).fill(0)  
  const [selected, setSelected] = useState(0)
  const [allVotes, setVotes] = useState(anecdotesSpaces)
  
  const getRandomAnecdote = () => {
    const random = Math.floor(Math.random() * props.anecdotes.length);
    setSelected(random)
  }

  const incrementVote = () => {
    const copyAllVotes = [...allVotes]
    copyAllVotes[selected] += 1
    setVotes(copyAllVotes)
  }
  
  return (
    <div>
      <p>{props.anecdotes[selected]}</p>
      <p>has {allVotes[selected]} votes</p>
      <button onClick={ incrementVote }>vote</button>
      <button onClick={ getRandomAnecdote }>next anecdote</button>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)