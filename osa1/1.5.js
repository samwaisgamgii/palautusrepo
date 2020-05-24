import React from 'react'
import ReactDOM from 'react-dom'


const Header = (props) => (
  <h1>{props.course}</h1>
)

const Part = (props) => (
  <p>{props.part} {props.exercise}</p>
)

const Content = (props) => (
  <>
    <Part part={props.part[0]} exercise={props.exercise[0]}></Part>
    <Part part={props.part[1]} exercise={props.exercise[1]}></Part>
    <Part part={props.part[2]} exercise={props.exercise[2]}></Part>
  </>
)

const Total = (props) => (
  <p>Number of exercises {props.total} </p>
)

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  const names = [course.parts[0].name, course.parts[1].name, course.parts[2].name]
  const exercises = [course.parts[0].exercises, course.parts[1].exercises, course.parts[2].exercises]

  let summa = 0
  exercises.forEach(exercise => {
    summa += exercise
  })

  return (
    <div>
      <Header course={course.name} />
      <Content part={names} exercise={exercises} />
      <Total total={summa} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))