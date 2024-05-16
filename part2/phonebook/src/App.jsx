import { useState } from 'react'

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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  // const [filtered_persons, setFiltered] = useState(persons)
  const [filterString, setNewFilter] = useState('')

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