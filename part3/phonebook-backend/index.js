const express = require('express')
const morgan = require('morgan')

let persons = [
  {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
  },
  {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": 2
  },
  {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
  },
  {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 4
  }
]

const infoPage = `
  <p>Phonebook has info for ${persons.length} people</p>
  <p>${new Date()}</p>
`

const generateId = () => {
  const max = 1_000_000_000
  return Math.floor(Math.random() * max)
}

const app = express()
const requestLogger = morgan('tiny')

app.use(express.json())
app.use(requestLogger)

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const person = persons.find(person => person.id == req.params.id)
  person ? res.json(person) : res.status(404).end()
})

app.get('/info', (req, res) => {
  res.send(infoPage)
})

app.post('/api/persons', (req, res) => {
  const {body} = req
  console.log(body);

  if (!body.name || !body.number)
    return res.status(400).json({error: "Content missing"})
  if (persons.find(person => person.name === body.name))
    return res.status(409).json({error: "Name must be unique"})

  const person = {
    ...body,
    id: generateId()
  };

  persons.push(person)
  res.json(person)
})

app.delete('/api/persons/:id', (req, res) => {
  const index = persons.findIndex(person => person.id == req.params.id)
  index !== -1 && persons.splice(index, 1)
  res.status(index !== -1 ? 204 : 404).end()
})

const port = 3001
app.listen(port)
console.log(`Server running on port ${port}`)