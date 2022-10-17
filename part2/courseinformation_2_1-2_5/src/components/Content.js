import Part from './Part'
import Total from './Total'

const Content = ({ parts }) => {
  /*let sum = 0
  parts.map(part => (
    sum = sum + part.exercises
  ))*/

  const total = parts.reduce((previus, current) => {
    console.log('what is happening', previus, current)
    
    return previus + current.exercises
  }, 0)

  return (
    <>
      {
        parts.map(
          part => (
            <Part key={part.id} part={part} />  
          )
        )
      }  
      <Total sum={total} />
    </>
  )
}
export default Content 