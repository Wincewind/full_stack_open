import { useState, useEffect } from 'react'
import personService from './services/persons'


const Notification = ({ message, isError }) => {
  const notificationStyle = {
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  notificationStyle.color = isError ? "red" : "green"


  if (message === null) {
    return null
  }

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

const Contacts = ({ persons, removePerson }) => {
  return (
    <div>
      {persons.map(person =>
        <Contact key={person.id} person={person} removePerson={removePerson} />
      )}
    </div>
  )
}

const Contact = ({ person, removePerson }) =>
  <div>
    {person.name} {person.number}  <button onClick={() =>
      removePerson(person.id)}>delete</button>
  </div>

const Filter = ({ handleFilterChange, filterString }) =>
  <form>
    filter shown with <input onChange={handleFilterChange} value={filterString} />
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
  const [notificationMsg, setNotificationMsg] = useState({ msg: null, isError: true })

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const flashNotificationMsg = (msg, isError) => {
    setNotificationMsg(
      { msg, isError }
    )
    setTimeout(() => {
      setNotificationMsg({ msg: null, isError: isError })
    }, 5000)
  }

  const addContact = (event) => {
    event.preventDefault()
    if (!persons.map(person => person.name).includes(newName)) {
      const contactObj = { name: newName, number: newNumber }
      personService
        .create(contactObj)
        .then(returnedContact => {
          setPersons(persons.concat(returnedContact))
          setNewFilter('')
          flashNotificationMsg(`Added ${newName}`, false)
        })
        .catch(error => {
          flashNotificationMsg(`${error.response.data.error}`, true)})
    }
    else {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(p => p.name === newName)
        const changedPerson = { ...person, number: newNumber }

        personService
          .update(changedPerson.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
            flashNotificationMsg(`Updated ${newName}`, false)
          })
          .catch(error => {
            flashNotificationMsg(`Information of ${newName} has already been removed from server`, true)
            setPersons(persons.filter(p => p.id !== changedPerson.id))
          })
      }
    }
    setNewName('')
    setNewNumber('')
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

  const removePerson = id => {
    const personToRemove = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${personToRemove.name} ?`)) {
      personService
        .remove(id)
        .then(removedPerson => {
          console.log("removed", removedPerson)
          setPersons(persons.filter(p => p.id !== id))
          flashNotificationMsg(`Deleted ${personToRemove.name}`, false)
        })
    }
  }


  return (
    <div>
      <Notification message={notificationMsg.msg} isError={notificationMsg.isError} />
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
      <Contacts persons={persons.filter(person => person.name.toLowerCase().includes(filterString.toLowerCase()))} removePerson={removePerson} />
    </div>
  )

}

export default App