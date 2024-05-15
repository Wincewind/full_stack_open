const Course = ( { course } ) => {
    console.log(course)
    return (
      <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )
  }
  
  const Header = ( {course} ) => {
    console.log(course)
    return (
    <h1>
      {course}
    </h1>
    )
  }
  
  const Part = ( { part }) => {
    console.log(part)
    return (
      <p>{part.name} {part.exercises}</p>
        )
  }
  
  const Content = ({ parts }) => {
    console.log(parts)
    return (
      <div>
        { parts.map(part => 
          <Part key={part.id} part={part} />
        ) }
      </div>
      )
  }
  
  const Total = ( {parts} ) => {
    console.log(parts)
    return (
    <b><p>
      Total of {parts.reduce((partialSum, a) => partialSum + a.exercises, 0)} exercises
    </p></b>
    )
  }

export default Course