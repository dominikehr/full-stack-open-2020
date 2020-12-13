const express = require('express')
const app = express()

const morgan = require('morgan')

morgan.token('person', (request, response) => {
    if(request.method === 'POST'){
        return JSON.stringify(request.body)
    } else {
        return null
    }
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :person'))
app.use(express.json())

let persons = [
    {
        "id":1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id":2,
        "name": "Ada Lovelace",
        "number": "39-44-5323323"
    },
    {
        "id":3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    const numberPersons = persons.length
    response.send(`Phonebook has info for ${numberPersons} people <br/> ${Date()}`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if(person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})


const generateRandomId = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

app.post('/api/persons', (request, response) => {
    // generate id by assigning random number
    const body = request.body

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

    if(persons.some(person => person.name === body.name)){
        return response.status(400).json({
            error: 'name already exists in list of persons'
        })
    }

    const person = {
        id: generateRandomId(0, 1000),
        name: body.name,
        number: body.number
    }
    
    persons = persons.concat(person)
    response.json(person)
})

const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })

