const PersonForm = ({newName, newNumber, handleNameChange, handleNumberChange, addPerson}) => {
  
    return (
      <div>
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
      </div>
    )
  }
export default PersonForm