import React from 'react'
import Person from './Person'

const Persons = ({ persons, filteredPersons, filter, handlePersonDelete } ) => {
    // forces elements to appear after addition even when there currently is a filter in place
    const showPersons = filter ? persons.filter((person) =>
      person.name.toLowerCase().includes(filter.toLowerCase())) : persons
    return (
      <>
        {showPersons.map(person => <Person key={person.name} person={person} onDelete={handlePersonDelete}/>)}
      </>
    )
  }

  export default Persons