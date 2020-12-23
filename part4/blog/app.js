const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blog')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true })
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

app.get('/', (request, response) => {
  response.send('Hello World!')
})

// router only used if URL of request starts with 'api/blogs'
app.use('/api/blogs', blogsRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app