import React, {useEffect, useState} from 'react'
import {personService} from "./services/personService";

const Input = ({label, ...props}) => (
  <div>
    {label}
    <input {...props} />
  </div>
)

const SubmitButton = ({text}) => (
  <div>
    <button type="submit">{text}</button>
  </div>
)

const PersonForm = ({handleSubmit, input1, input2}) => (
  <form onSubmit={handleSubmit}>
    <Input {...input1} />
    <Input {...input2} />
    <SubmitButton text="add" />
  </form>
)

const Persons = ({persons, deletePerson}) => persons.map(person => (
  <div key={person.name}>
    {person.name} {person.number} <button onClick={() => deletePerson(person)}>delete</button>
  </div>
))

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const input1 = { label: "name: ", value: newName, onChange: handleNameChange}
  const input2 = { label: "number: ", value: newNumber, onChange: handleNumberChange}
  const getPerson = (name) => persons.find(p => p.name === name)

  const resetFields = () => {
    setNewName('')
    setNewNumber('')
  }

  const addPerson = () => {
    if (!getPerson(newName)) {
      personService
        .create({name: newName, number: newNumber})
        .then(newPerson => {
          setPersons(persons.concat(newPerson));
          resetFields()
        })
    } else {
      alert(`${newName} is already added to phonebook`)
    }
  }

  const deletePerson = ({id, name}) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .remove(id)
        .then(() => setPersons(persons.filter(p => p.id !== id)))
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    addPerson()
  }

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <PersonForm {...{handleSubmit, input1, input2}} />
      <h2>Numbers</h2>
      <Persons {...{persons, deletePerson}} />
    </div>
  )
}

export default App