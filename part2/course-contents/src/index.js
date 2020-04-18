import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({text}) => <h1>{text}</h1>

const Part = ({name, exercises}) => <p>{name} {exercises}</p>

const Content = ({parts}) => (
  <div>
    {parts.map(({id, ...props}) => <Part key={id} {...props} />)}
  </div>
)

const Total = ({parts}) => {
  const exerciseSum = parts
    .map(el => el.exercises)
    .reduce((acc, cur) => acc + cur)

  return <p>Number of exercises {exerciseSum}</p>
}

const Course = ({name, parts}) => (
  <div>
    <Header text={name} />
    <Content parts={parts} />
    <Total parts={parts} />
  </div>
)

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course {...course} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))