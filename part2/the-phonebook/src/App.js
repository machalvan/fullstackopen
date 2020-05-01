import React, {useEffect, useState} from 'react'
import {personService} from "./services/personService";

const Input = ({label, ...props}) => (
  <div>
    {label} <input {...props} />
  </div>
)

const PersonForm = ({handleSubmit, input1, input2}) => (
  <form onSubmit={handleSubmit}>
    <Input {...input1} />
    <Input {...input2} />
    <button type="submit">add</button>
  </form>
)

const Person = ({person, deletePerson}) => (
  <div key={person.name}>
    {person.name} {person.number} <button onClick={() => deletePerson(person)}>delete</button>
  </div>
)

const Notification = ({message, type}) => <div className={`button ${type}`}>{message}</div>

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

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
          showNotification(`Added ${newName}`, "success")
        })
    } else {
      setError(`${newName} is already added to phonebook`)
      showNotification(`${newName} is already added to phonebook`, "error")
    }
  }

  const deletePerson = ({id, name}) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
          showNotification(`Successfully deleted ${newName}`, "success")
        })
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    addPerson()
  }

  const showNotification = (message, type) => {
    const timeout = 5000

    if (type === "success") {
      setSuccess(message)
      setTimeout(() => setSuccess(null), timeout);
    } else {
      setError(message)
      setTimeout(() => setError(null), timeout);
    }
  }

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      {success && <Notification message={success} type="success" />}
      {error && <Notification message={error} type="error" />}
      <PersonForm {...{handleSubmit, input1, input2}} />
      <h2>Numbers</h2>
      {persons.map(person => (
        <Person key={person.name} {...{person, deletePerson}} />
      ))}
    </div>
  )
}

export default App