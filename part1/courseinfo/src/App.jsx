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
      <Part part={props.content[0].part} exercises={props.content[0].exercises} />
      <Part part={props.content[1].part} exercises={props.content[1].exercises} />
      <Part part={props.content[2].part} exercises={props.content[2].exercises} />
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
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  const content = [{
    part: part1,
    exercises: exercises1
  }, {
    part: part2,
    exercises: exercises2
  }, {
    part: part3,
    exercises: exercises3
  }]

  return (
    <div>
      <Header course={course} />
      <Content content={content} />
      <Total amount={content.reduce((partialSum, a) => partialSum + a.exercises, 0)} />
    </div>
  )
}

export default App