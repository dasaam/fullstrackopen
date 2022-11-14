import Person from './Person'
const Persons = ({personsFilter, handlePersonDelete, react}) => {
    return (
      <ul>
        {
          personsFilter.map(person =>
            <react.Fragment key={person.id}>
              <Person person={person} />
              <button onClick={() => handlePersonDelete(person.id) }>Delete</button>
            </react.Fragment>

          )
        }
      </ul>
    )
  }
export default Persons