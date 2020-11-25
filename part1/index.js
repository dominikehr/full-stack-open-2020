import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return(
    <>
      <h1>{props.title}</h1>
    </>
  )
}

// 1.2 let the part component take over the rendering of individual name exerise combos
const Part = (props) => {
  return( 
    <p>{props.name} {props.exercise}</p>
  )
}

const Content = (props) => {
  const first = props.syllabus[0];
  const second = props.syllabus[1];
  const third = props.syllabus[2];
  return(
    <div>
      <Part name={first.course_name} exercise={first.course_points}/>
      <Part name={second.course_name} exercise={second.course_points}/>
      <Part name={third.course_name} exercise={third.course_points}/>
    </div>
  )
}

const Total = (props) => {
  // use reduce function to sum up the array integers
  const points_sum = props.total.reduce((acc, cur_elem) => acc + cur_elem.course_points, 0)
  return (
    <>
    <p>Number of exercises {points_sum}</p>
    </>
  )
}

const App = () => {
  // create array of objects with part name and exercise no as attributes
  const coursework = {
    title:"Half Stack application development",
    syllabus_parts: [
      {
        course_name:"Fundamentals of React",
        course_points:10
      },
      {
        course_name:"Using props to pass data",
        course_points:7
      },
      {
        course_name:"State of a component",
        course_points:14
      }
    ]
  };

  return (
    <div>
      <Header title={coursework.title} />
      <Content syllabus={coursework.syllabus_parts}/>
      <Total total={coursework.syllabus_parts}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))