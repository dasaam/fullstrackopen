import Part from './Part'
import Total from './Total'

const Content = ({ parts }) => {
  let sum = 0
  parts.map(part => (
    sum = sum + part.exercises
  ))

  return (
    <>
      {
        parts.map(
          part => (
            <Part key={part.id} part={part} />  
          )
        )
      }  
      <Total sum={sum} />
    </>
  )
}
export default Content 