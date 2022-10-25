import React, { useState } from 'react'
import Person from './components/Person'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  const personsFilter = (filter == '') ? persons : persons.filter((person) => {
    return person["name"].toLowerCase().indexOf(filter.toLowerCase()) !== -1
  })

  console.log(personsFilter)

  const addPerson = (event) => {
    event.preventDefault()
    
    const personNames = persons.map(person => (person.name))
    
    if(personNames.indexOf(newName) != -1){
      alert(`${newName} is already added to phonebook`);
      return false;
    }

    const personObject = {
      name: newName,
      number: newNumber
    }
  
    setPersons(persons.concat(personObject))
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with: <input value = {filter} onChange={handleFilterChange}/>
      </div>
      <h2>add a new</h2>
      <form onSubmit = { addPerson }>
        <div>
          name: <input value = {newName} onChange={handleNameChange}/>
          <div>debug: {newName}</div>
        </div>
        <div>
          number: <input value = {newNumber} onChange={handleNumberChange}/>
          <div>debug: {newNumber}</div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {personsFilter.map(person =>
          <Person key={person.name} person={person} />
        )}
      </ul>
    </div>
  )
}

export default App