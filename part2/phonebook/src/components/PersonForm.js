import React from 'react'

const PersonForm = ( {
    filter,
    handleFilterChange,
    onSubmit,
    handleNameChange,
    handleNumberChange,
    newName,
    newNumber} ) => {
      return (
        <div>
          <h2>Persons</h2>
          <div>
            filter shown with: <input value={filter} onChange={handleFilterChange}/>
          </div>
          <form onSubmit={onSubmit}>
            <h2>add a new</h2>
            <div>
              name: <input value={newName} onChange={handleNameChange}/>
            </div>
            <div>
            number: <input value={newNumber} onChange={handleNumberChange}/>
            </div>
            <div>
            <button type="submit">add</button>
            </div>
          </form>
        </div>
      )
    }

export default PersonForm