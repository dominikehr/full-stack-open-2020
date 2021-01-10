// import bcrypt library which handels all encryption needed in conjunction to password hashes
const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

// get all users currently in db
usersRouter.get('/', async(request, response, next) => {
  try {
    const users = await User.find({}).populate('blogs')
    response.json(users.map(u => u.toJSON()))
  } catch (err) {
    next(err)
  }
})

// add new users to the database
usersRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body
  
    if (body.password.length < 3) {
      return response.status(400).json({ error: 'invalid password length' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name : body.name,
      passwordHash,
      blogs : request.body.blogs
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
  } catch (err) {
    next(err)
  }
})


module.exports = usersRouter