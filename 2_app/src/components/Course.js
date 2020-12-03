import React from 'react'


const Course = ( {course} ) => {
    return (
    <>
        <Header name={course.name}/>
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
    </>
    )
}

const Header = ({ name }) => {
    return (
      <h2>{name}</h2>
    )
  }
  
  const Total = ({ parts }) => {
    const total = parts.reduce((accumulator, currentValue) => accumulator + currentValue.exercises,0)
    return(
      <p><b>total of {total} exercises</b></p>
    ) 
  }
  
  const Part = ( {name, exercises} ) => {
    return (
      <p>
        {name} {exercises}
      </p>    
    )
  }
  
  const Content = ({ parts }) => {
    return (
      <div>
       {parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises}/>)}
      </div>
    )
  }

  export default Course;
