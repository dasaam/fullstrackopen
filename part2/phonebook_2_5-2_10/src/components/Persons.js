import Person from './Person'
const Persons = ({personsFilter}) => {
    return (
      <ul>
        {personsFilter.map(person =>
          <Person key={person.name} person={person} />
        )}
      </ul>
    )
  }
export default Persons