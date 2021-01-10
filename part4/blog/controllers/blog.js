const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response, next) => {
  try {
    // default link created blog to first user in db
    const blogs = await Blog.find({}).populate('user', {
      username: 1,
      name: 1
    })
    response.json(blogs.map(blog => blog.toJSON()))
  } catch(err) {
    next(err)
  }
})

blogsRouter.get('/:id', async (request, response, next) => {
  const { id } = request.params
  try {
    const blog = await Blog.findById(id)
    if(blog) {
      response.json(blog.toJSON())
    } else {
      response.status(404).end
    }
  } catch (error) {
    next(error)
  }
})

blogsRouter.post('/', async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    // check if token valid
    if (!request.token || !decodedToken.id) {
      return request.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

    request.body.likes = request.body.likes || 0
    request.body.user = user._id

    const blog = new Blog(request.body)
    const result = await blog.save()

    // save the blog under the respective user with the blog id
    user.blogs = user.blogs.concat(result._id)
    response.status(201).json(result)
  } catch (err) {
    next(err)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    // check if token valid
    if (!request.token || !decodedToken.id) {
      return request.status(401).json({ error: 'token missing or invalid' })
    }
    const { body } = request
    const id = request.params.id
    // {new: true} changes the default return value as to return the blog after(!) the update
    const updatedBlog = await Blog.findById(id, body, {new: true})
    if(updatedBlog) {
      const updatedBlogAfterSave = await updatedBlog.save()
      await updatedBlogAfterSave
        .populate({ path: 'user', select: ['name', 'username'] })
        .execPopulate()
        
      return response
        .status(201)
        .json(updatedBlogAfterSave.toJSON())
    } else {
      response.status(404).end
    }
  } catch (err) {
    next(err)
  }
})

// 4.21
blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    // check if tokens match
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return request.status(401).json({ error: 'token missing or invalid' })
    }

    const { id } = request.params

    //query the user and the respective blog
    const user = await User.findById(decodedToken.id)
    const blog = await Blog.findById(id)

    if(user.id === blog.user.toString()) {
      await Blog.findByIdAndRemove(id)
      response.status(204).end()
    } else {
      return response.status(401).json({error : 'Only the real owner of this blog can delete it'})
    }
  } catch (error) {
    next(error)
  }
})


module.exports = blogsRouter