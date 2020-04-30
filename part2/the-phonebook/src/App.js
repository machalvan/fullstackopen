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

const PersonForm = ({addPerson, input1, input2}) => (
  <form onSubmit={addPerson}>
    <Input {...input1} />
    <Input {...input2} />
    <SubmitButton text="add" />
  </form>
)

const Persons = ({persons}) => persons.map(({name, number}) => <div key={name}>{name} {number}</div>)

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const addPerson = (event) => {
    event.preventDefault()
    if (!persons.find(({name}) => name === newName)) {
      personService
        .create({name: newName, number: newNumber})
        .then(newPerson =>  {
          setPersons(persons.concat(newPerson));
          setNewName('')
          setNewNumber('')
        })
    } else {
      alert(`${newName} is already added to phonebook`)
    }
  }

  const personFormProps = {
    addPerson,
    input1: { label: "name: ", value: newName, onChange: handleNameChange},
    input2: { label: "number: ", value: newNumber, onChange: handleNumberChange}
  }

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <PersonForm {...personFormProps} />
      <h2>Numbers</h2>
      <Persons persons={persons} />
    </div>
  )
}

export default App