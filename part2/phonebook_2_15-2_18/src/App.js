import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  const hook = () => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons  => {
        console.log('promise fulfilled')
        setPersons(initialPersons)
      })
  }
  
  useEffect(hook, [])
  console.log('render', persons.length, 'notes')
  

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

    personService
    .create(personObject)
    .then(returnedPerson  => {
      console.log(returnedPerson)
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')
    })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter = { filter } handleFilterChange = { handleFilterChange} />
      
      <h2>add a new</h2>
      <PersonForm 
      newName = {newName} 
      handleNameChange = {handleNameChange}
      newNumber = {newNumber} 
      handleNumberChange = {handleNumberChange}
      addPerson = {addPerson}
      />
      
      <h2>Numbers</h2>
      <Persons personsFilter = {personsFilter}/>
      
    </div>
  )
}

export default App