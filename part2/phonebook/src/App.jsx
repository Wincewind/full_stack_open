import { useState, useEffect } from 'react'
import axios from 'axios'

const Contacts = ({ persons }) => {
  return (
    <div>
      {persons.map(person =>
        <Contact key={person.name} person={person} />
      )}
    </div>
  )
}

const Contact = ({ person }) => <div>{person.name} {person.number}</div>

const Filter = ({ handleFilterChange, filterString }) =>
  <form>
    <input onChange={handleFilterChange} value={filterString} />
  </form>

const PersonForm = ({ addContact, handleNameChange, handleNumberChange, newName, newNumber }) =>
  <form onSubmit={addContact}>
    <div>
      name: <input onChange={handleNameChange} value={newName} />
    </div>
    <div>
      number: <input onChange={handleNumberChange} value={newNumber} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterString, setNewFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'notes')

  const addContact = (event) => {
    event.preventDefault()
    if (!persons.map(person => person.name).includes(newName)) {
      const contactObj = { name: newName, number: newNumber }
      setPersons(persons.concat(contactObj))
      setNewName('')
      setNewNumber('')
      setNewFilter('')
    }
    else {
      alert(`${newName} is already added to phonebook`)
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange} filterString={filterString} />
      <h3>add a new</h3>
      <PersonForm
        addContact={addContact}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />
      <h3>Numbers</h3>
      <Contacts persons={persons.filter(person => person.name.toLowerCase().includes(filterString.toLowerCase()))} />
    </div>
  )

}

export default App