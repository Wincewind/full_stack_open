const Header = (props) => {
  console.log(props)
  return (
  <h1>
    {props.course}
  </h1>
  )
}

const Part = (props) => {
  console.log(props)
  return (
    <p>{props.part} {props.exercises}</p>
      )
}

const Content = (props) => {
  console.log(props)
  return (
    <div>
      <Part part={props.content[0].name} exercises={props.content[0].exercises} />
      <Part part={props.content[1].name} exercises={props.content[1].exercises} />
      <Part part={props.content[2].name} exercises={props.content[2].exercises} />
    </div>
    )
}

const Total = (props) => {
  console.log(props)
  return (
  <p>
    Number of exercises {props.amount}
  </p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
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

  return (
    <div>
      <Header course={course} />
      <Content content={parts} />
      <Total amount={parts.reduce((partialSum, a) => partialSum + a.exercises, 0)} />
    </div>
  )
}

export default App