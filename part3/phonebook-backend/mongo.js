const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log(`Please either 
    a) provide password, name and phone number as arguments to add a person: node mongo.js <password> <name> <phone number>
    b) provide password to display all persons inside the collection node mongo.js <password>`)
    process.exit(1)
} 

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

//const url = `mongodb+srv://fullstack:${password}@cluster0-bw83a.mongodb.net/test?retryWrites=true`
// switched to node vs 2.12 later as ^3.0 didn't work
const url = `mongodb://fullstack:${password}@cluster0-shard-00-00.bw83a.mongodb.net:27017,cluster0-shard-00-01.bw83a.mongodb.net:27017,cluster0-shard-00-02.bw83a.mongodb.net:27017/<phonebook-app>?ssl=true&replicaSet=atlas-8zc9mw-shard-0&authSource=admin&retryWrites=true&w=majority`
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
  name: String,
  phone_number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
    name: name,
    phone_number: number
})

// user only provided authentication password --> display all entries of the collection
if(process.argv.length === 3){
    // display all persons in the collection
    Person
    .find({})
    .then(persons => {
    persons.forEach(person => {
        console.log(person)
        mongoose.connection.close()
    }) 
    })
} else {
// otherwise just persist the person object passed as command line args to the collection
    person.save()
        .then(result => {
        console.log(`added ${result.name} number ${result.phone_number} to phonebook`)
        mongoose.connection.close()
    })
}