//importar rear pero con manejo del estado
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Stadistic = (props) => (
  <React.Fragment>
    <td>{ props.text }</td> 
    <td>{ props.value }</td>
  </React.Fragment>
  
)

const Stadistics = (props) => {
  
  if(props.allComments == 0){
    return (
      <div>
        <p>No feedback given</p>
      </div>
    ) 
  }

  return (
    
      <table>
        <tbody>
          <tr><Stadistic value={props.good} text={props.textGood} /></tr>
          <tr><Stadistic value={props.neutral} text={props.textNeutra} /></tr>
          <tr><Stadistic value={props.bad} text={props.textBad} /></tr>
          <tr><Stadistic value={props.allComments} text={props.textAll} /></tr>
          <tr><Stadistic value={props.commentAvegage} text={props.textAverage} /></tr>
          <tr><Stadistic value={props.positivePercent} text={props.textPoitive} /></tr>
        </tbody>
      </table>
    
  )
}

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

      <h2>stadistics</h2>
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