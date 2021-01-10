const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')

const blogsRouter = require('./controllers/blog')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')


logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
  useCreateIndex : true
})
  .then(() => {
    logger.info('Connected to MongoDb')
  })
  .catch((error) => {
    logger.error('Error happened when connecting to MongoDB', error.message)
  })
  
app.use(cors())
// json parser middleware
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.get('/', (request, response) => {
  response.send('Hello World!')
})

// router only used if URL of request starts with 'api/blogs'
app.use('/api/login', loginRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app