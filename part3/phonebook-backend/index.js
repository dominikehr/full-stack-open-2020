const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
// retrieve and instantiate Person model
const Person = require('./models/person')

app.use(cors())
app.use(express.static("build"));

const morgan = require('morgan')
const person = require('./models/person')

morgan.token('person', (request, response) => {
    if(request.method === 'POST'){
        return JSON.stringify(request.body)
    } else {
        return null
    }
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :person'))
app.use(express.json())


app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons.map(person => person.toJSON()))
    })
})

app.get('/info', (request, response) => {
    Person.find({})
        .then(persons => {
            const numberPersons = persons.length
            const date = new Date()
            response.send(`Phonebook has info for ${numberPersons} people <br/> ${date}`)
        })
})

app.get('/api/persons/:id', (request, response) => {
    const { id } = request.params
    Person.findById(id).then(person => {
        if(person){
            response.json(person.toJSON())
        } else {
            response.status(404).end
        }
    })
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const { body } = request

    if(!body.name){
        return response.status(400).json({
            error: 'name missing'
        })
    }

    if(!body.number){
        return response.status(400).json({
            error: 'number missing'
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number,
    });
    
    person.save().then(savedPerson => {
        response.json(savedPerson.toJSON())
    })
})

const PORT = process.env.PORT
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })

