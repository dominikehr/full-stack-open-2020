const blogsRouter = require('express').Router()
const { result } = require('lodash')
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({})
    response.json(blogs)
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
    request.body.likes = request.body.likes || 0
    const blog = new Blog(request.body)
    const result = await blog.save()
    response.status(201).json(result)
  } catch (err) {
    next(err)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  try {
    const body = request.body
    const id = request.params.id
    // {new: true} changes the default return value as to return the blog after(!) the update
    const updatedBlog = await Blog.findByIdAndUpdate(id, body, {new: true})
    if(updatedBlog) {
      response.status(201).json(updatedBlog)
    } else {
      response.status(404).end
    }
  } catch (err) {
    next(err)
  }
})


blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})


module.exports = blogsRouter