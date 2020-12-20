import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import personsServices from './services/personsServices'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ notification, setNotification ] = useState( {
    style: null,
    message: null
  })
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [filter, setFilter] = useState('')
  const [filteredPersons, setFilteredPersons] = useState([])

  // fetch initial data from json server
  useEffect(() => {
    personsServices
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  // addPerson function
  const addPerson = (event) => {
    event.preventDefault()
    // check whether name already exists in phone book
    const personAlreadyExists = persons.some(person => person.name === newName)
    if(personAlreadyExists){
      const updateNumber = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if(updateNumber){
        const existingPerson = persons.find(person=> person.name === newName)
        const { id } = existingPerson
        // create shallow copy of person to be updated with their new number
        const newPerson = {...existingPerson, number: newNumber}
        personsServices
          .update(id, newPerson)
          .then(returnedPerson => {
            console.log(returnedPerson);
            setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
            setNotification({
              style: 'successful',
              message: `Added ${returnedPerson.name}`
            });
            setTimeout(() => {
              setNotification({style: null, message: null}) // reset notification in order to disappear after three seconds
            }, 3000)
          })
          .catch(error => {
            setNotification({
              style: 'error',
              message:`${existingPerson.name} has already been removed from the server`
            });
            setTimeout(() => {
              setNotification({style: null, message: null}) // reset notification in order to disappear after three seconds
            }, 3000)
          });  
      }
    } else {
      // otherwise create new Person object
      const newPersonObject = {
        name: newName,
        number: newNumber
      }
      // use personsServices component to accomplish addition to backend server via HTTP Post 
      personsServices
        .create(newPersonObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setNotification({
            style: 'successful',
            message: `Added ${returnedPerson.name}`
          })
          setTimeout(() => {
            setNotification({message: null, style: null}) // reset notification in order to disappear after three seconds
          }, 3000);

        })
        .catch(error => {
          setNotification({
            // message accesses .error element which we appended to the json response in the backend errorHandler
            message: `CAUTION: ${error.response.data.error}`,
            style: 'error' 
          })
          setTimeout(() => {
            setNotification({message: null, style: null})
          }, 3000)
      })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    const personsToShow = persons.filter((person) =>
      person.name.toLowerCase().includes(filter.toLowerCase()))
    console.log(personsToShow);
    setFilteredPersons(personsToShow)
  }

  const handlePersonDelete = (id) => {
    // retrieve person to be deleted acc. to id
    const personToBeDeleted = persons.find((p) => p.id === id);
    const confirmDelete = window.confirm(`Delete ${personToBeDeleted.name}?`);
    if (confirmDelete) {
      // make use of personsService component for HTTP delete request
      personsServices
        .deletePerson(id)
        .then(() => {
          // filter out all OTHER persons
          const filteredPersons = persons.filter((person) => person.id !== id);
          setPersons(filteredPersons);
          setNotification({
            style: 'successful',
            message: `${personToBeDeleted.name} has been removed`
          });
          setTimeout(() => {
            setNotification({ message: null, style: null });
          }, 3000)
        })
        .catch((error) => {
          setNotification({
            style: 'error',
            message: `${personToBeDeleted.name} has already been removed before`
          });
          setTimeout(() => {
            setNotification({ message: null, style: null });
          }, 3000);
          setPersons(filteredPersons);
        });
    }
  }

  return (
    <div>
      <Notification notification={notification}/>
      <PersonForm filter={filter} handleFilterChange={handleFilterChange} onSubmit={addPerson}
      handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} newName={newName} newNumber={newNumber} />
      <h2>Numbers</h2>
      <Persons persons={persons} filteredPersons={filteredPersons} filter={filter} handlePersonDelete={handlePersonDelete}/>
    </div>
  )
};

export default App;