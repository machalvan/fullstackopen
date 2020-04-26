import React, {useEffect, useState} from 'react'
import axios from "axios";

const PersonForm = ({addPerson, handleNameChange, handleNumberChange}) => (
  <form onSubmit={addPerson}>
    <Input label="name: " onChange={handleNameChange} />
    <Input label="number: " onChange={handleNumberChange} />
    <SubmitButton text="add" />
  </form>
)

const Input = ({label, onChange}) => (
  <div>
    {label}
    <input onChange={onChange} />
  </div>
)

const SubmitButton = ({text}) => (
  <div>
    <button type="submit">{text}</button>
  </div>
)

const Persons = ({persons}) => persons.map(p => <div key={p.name}>{p.name} {p.number}</div>)

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const addPerson = (event) => {
    event.preventDefault()
    if (!persons.find(person => person.name === newName)) {
      setPersons(persons.concat({name: newName, number: newNumber}));
    } else {
      alert(`${newName} is already added to phonebook`)
    }
  }

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(res => setPersons(res.data))
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <PersonForm {...{addPerson, handleNameChange, handleNumberChange}} />
      <h2>Numbers</h2>
      <Persons persons={persons} />
    </div>
  )
}

export default App