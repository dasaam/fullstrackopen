import React, { useState } from 'react'
import Person from './components/Person'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number:'39-44-5323523' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

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
        {persons.map(person =>
          <Person key={person.name} person={person} />
        )}
      </ul>
    </div>
  )
}

export default App