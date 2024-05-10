const Header = (props) => {
  console.log(props)
  return (
  <h1>
    {props.course}
  </h1>
  )
}

const Content = (props) => {
  console.log(props)
  return (
  props.content.map((content) =>
      <p key={content.id}>
        {content.part} {content.exercises}
      </p>
      )
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
    id: 1,
    part: part1,
    exercises: exercises1
  }, {
    id: 2,
    part: part2,
    exercises: exercises2
  }, {
    id: 3,
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