import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({text}) => <h2>{text}</h2>

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

  return <b>total of {exerciseSum} exercises</b>
}

const Course = ({name, parts}) => (
  <div>
    <Header text={name} />
    <Content parts={parts} />
    <Total parts={parts} />
  </div>
)

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map(course => <Course {...course} />)}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))