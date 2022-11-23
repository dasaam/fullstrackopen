import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import Notification from './components/Notification'


const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [typeNotificationMessage, setTypeNotificationMessage] = useState(null)

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
  console.log('render', persons.length, 'persons')
  

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
      //alert(`${newName} is already added to phonebook`);
      const person = persons.find(person => person.name === newName)
  
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        
        const changedPerson = { ...person, number: newNumber }
        
        personService
        .update(person.id, changedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(personTemp => personTemp.id !== person.id ? personTemp : returnedPerson))
          setNewName('')
          setNewNumber('')

          setTypeNotificationMessage('success')
          setNotificationMessage(
            `Updated ${newName} number`
          )
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
        .catch(error => {
          setTypeNotificationMessage('error')
          setNotificationMessage(
            `Information of ${newName} has already been removed from server`
          )
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)

        })
      }else{
        return false;
      }
    }else{
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

        setTypeNotificationMessage('success')
        setNotificationMessage(
          `Added ${newName}`
        )
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)

      }).catch(error => {
        // this is the way to access the error message
        setTypeNotificationMessage('error')
        setNotificationMessage(
          error.response.data.error
        )
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      })
    } 
  }

  const handlePersonDelete = (id, e) => {
    if (window.confirm(`Do you really want to delete person id ${id} ?`)) {
      
      personService
      .deletePerson(id)
      .then(returnedPerson  => {
        console.log(returnedPerson)
        setPersons(persons.filter(person => person.id !== id))
      })
    }
   
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} type={typeNotificationMessage} />
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
      <Persons 
      personsFilter = {personsFilter}
      handlePersonDelete = {handlePersonDelete}
      react={React} />
      
    </div>
  )
}

export default App