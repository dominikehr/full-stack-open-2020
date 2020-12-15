import React from 'react'

const Person = ( {person, onDelete} )  => {
    return (
      <>
      {person.name} {person.number} <button onClick={() => onDelete(person.id)}>delete</button> <br></br>
      </>
    )
}

export default Person