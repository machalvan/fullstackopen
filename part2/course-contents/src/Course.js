import React from "react";

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

export const Course = ({name, parts}) => (
  <div>
    <Header text={name} />
    <Content parts={parts} />
    <Total parts={parts} />
  </div>
)
