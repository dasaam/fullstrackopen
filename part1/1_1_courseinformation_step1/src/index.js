import React from 'react'
import ReactDOM from 'react-dom'

/*
const App = () => {
  const now = new Date()
  const a = 10
  const b = 20

  return (
    <div>
      <p>Hello world, it is {now.toString()}</p>
      <p>
        {a} plus {b} is {a + b}
      </p>
    </div>
  )
}
*/
/*
const Hello = () => {
  return (
    <div>
      <p>Hello world</p>
    </div>
  )
}
const App = () => {
  return (
    <div>
      <h1>Greetings</h1>
      <Hello />
      <Hello />
      <Hello />
    </div>
  )
}
*/
/**
 * Props
 * 
const Hello = (props) => {
  return (
    <div>
      <p>Hello {props.name}</p>
      <p>ID {props.id}</p>
    </div>
  )
}

const App = () => {
  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="George" id="idGeorge"/>
      <Hello name="Daisy" id="idDaisy" />
    </div>
  )
}
*/

/*
const Hello = (props) => {
  return (
    <div>
      <p>
        Hello {props.name}, you are {props.age} years old
      </p>
    </div>
  )
}

const Footer = () => {
  return (
    <div>
      greeting app created by <a href="https://github.com/mluukkai">mluukkai</a>
    </div>
  )
}

const App = () => {
  const name = 'Peter'
  const age = 10

  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="Maya" age={26 + 10} />
      <Hello name={name} age={age} />
      <Footer />
    </div>
  )
}
*/
//Exercise 1.1 course info
const Header = (props) => {
  return (
    <div>
      <h1>{ props.course }</h1>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <p>{props.part1} {props.exercises1}</p>
      <p>{props.part2} {props.exercises2}</p>
      <p>{props.part3} {props.exercises3}</p>
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>Number of exercises {props.total}</p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course = {course} />
      <Content part1 = {part1} exercises1 = {exercises1}
      part2 = {part2} exercises2 = {exercises2}
      part3 = {part3} exercises3 = {exercises3} />
      <Total total = {exercises1 + exercises2 + exercises3} />
    </div>
  )
}


ReactDOM.render(<App />, document.getElementById('root')) 