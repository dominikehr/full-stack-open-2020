const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const body = request.body
  // query the user that attempts to login
  const user = await User.findOne({ username: body.username })
  const passwordCorrect = user === null ? false : 
    bcrypt.compare(body.password, user.passwordHash)

  if(!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id
  }

  // create token now that we have ensured that user credentials are correct
  const token = jwt.sign(userForToken, process.env.SECRET)

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter