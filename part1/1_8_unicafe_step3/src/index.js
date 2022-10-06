//importar rear pero con manejo del estado
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Display = (props) => (
  <div>
    <p>{ props.text } { props.value }</p>
  </div>
  
)

const Stadistics = (props) => (
  <div>
    <h2>stadistics</h2>
    <Display value={props.good} text={props.textGood} />
    <Display value={props.neutral} text={props.textNeutra} />
    <Display value={props.bad} text={props.textBad} />
    <Display value={props.allComments} text={props.textAll} />
    <Display value={props.commentAvegage} text={props.textAverage} />
    <Display value={props.positivePercent} text={props.textPoitive} />
  </div>
)

const Button = (props) => (
  <button onClick={ props.handleClick }>
    { props.text }
  </button>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allComments, setAll] = useState(0)
  const [commentAvegage, setAverage] = useState(0)
  const [positivePercent, setPositivePercent] = useState(0)

  const increaseGood = () => {
    
    setGood(good + 1)
    setAll(allComments + 1)
    setAverage(((good + 1) - bad) / (allComments + 1))
    setPositivePercent((100 / (allComments + 1 )) * (good + 1))
  }

  const increaseNeutral = () => {
    setNeutral(neutral + 1)
    setAll(allComments + 1)
    setAverage(commentAvegage / (allComments + 1))
    setPositivePercent((100 / (allComments + 1 )) * (good))
  }

  const increaseBad = () => {
    setBad(bad + 1)
    setAll(allComments + 1)
    setAverage((good - (bad + 1))  / (allComments + 1))
    setPositivePercent((100 / (allComments + 1 )) * (good))
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick = { increaseGood } text="Good" />
      <Button handleClick = { increaseNeutral } text="Neutral" />
      <Button handleClick = { increaseBad } text="Bad" />

      
      <Stadistics good = { good } textGood="good" 
      neutral = { neutral } textNeutra="neutral"
      bad = { bad } textBad="bad"
      allComments = { allComments } textAll="all"
      commentAvegage = { commentAvegage } textAverage="average" 
      positivePercent = { positivePercent } textPoitive="positive"/>
      
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)