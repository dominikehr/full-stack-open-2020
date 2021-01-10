const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const api = supertest(app)

let initialBlogs = null
let newBlog = null
let blogWithNoLikes = null
let blogNoTitleOrUrl = null
let token = null

beforeAll(async () => {
  /****** authenticate with test user, retrieve token */ 
  // Step 0: Remove all users currently in test db
  await User.deleteMany({})
  // Step 1: Create user (directly in DB instead of going through api/users POST route)
  const user = new User({
    username: 'Dominik Test',
    name: 'Dominik',
    passwordHash: await bcrypt.hash(process.env.TEST_PASSWORD, 10)
  })
  // persist to db
  const validUser = await user.save()
  initialBlogs = [
    {
      title: 'Kochrezept',
      author: 'Dominik Ehr',
      url: 'www.test.de',
      likes: 2,
      user: validUser.id
    },
    {
      title: 'Operating Systems',
      author: 'Dominik Ehr',
      url: 'www.test.de',
      likes: 3,
      user: validUser.id
    },
  ]
  
  newBlog = {
    title: 'Neu',
    author: 'Dominik_Ehr',
    url: 'www.test.de',
    likes: 2,
    user: validUser.id
  }
  
  blogWithNoLikes = {
    title: 'BlogNoLikes',
    author: 'Dominik_Ehr',
    url: 'www.test.de',
  }
  
  blogNoTitleOrUrl = {
    author: 'Dominik_Ehr',
  }

  // retrieve token by issuing post to login route
  const loggedUser = await api
    .post('/api/login')
    .send({ username: user.username, password: process.env.TEST_PASSWORD})
    .expect(200)
  
  // store in token variable for all tests to see
  token = `bearer ${loggedUser.body.token}`

})

beforeEach(async () => {
  // clean up database before initial insertion
  await Blog.deleteMany({})
  
  
  // insert the initial blog posts into the test database
  const blogObjects = initialBlogs.map(blog => new Blog(blog))
  const promiseArr = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArr)
})


describe('tests for already existing blogs', () => {
  // exercise 4.8
  test('blogs are returned as valid number of jsons', async () => {
    const blogs = await api.get('/api/blogs')
    expect(blogs.body).toHaveLength(initialBlogs.length)
  })
  
  // exercise 4.9
  test('blogs have unique property "id" ', async () => {
    const blogs = await api.get('/api/blogs')
    expect(blogs.body[0].id).toBeDefined()
  })
})



describe('addition of new blogs possible when user authenticated', () => {
// exercise 4.10
  test('a blog can be added via POST', async () => {
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set({ Authorization: token})
      .expect(201)
  
    const blogs = await api.get('/api/blogs')
    expect(blogs.body).toHaveLength(initialBlogs.length + 1)
  
    const titles = blogs.body.map((blog) => blog.title)
    expect(titles).toContain('Neu')
  })

  // exercise 4.11 
  test('a blog without a specified likes property should default to 0 likes', async () => {
    await api.
      post('/api/blogs')
      .send(blogWithNoLikes)
      .set({ Authorization: token})
      .expect(201)
    const blogs = await api.get('/api/blogs')
    expect(blogs.body[blogs.body.length-1].likes).toBe(0)
  })

  // exercise 4.12
  test('adding a blog without title or url is not possible', async () => {
    await api.
      post('/api/blogs')
      .send(blogNoTitleOrUrl)
      .set({ Authorization: token})
      .expect(400)
  })
})

// exercise 4.21
describe('unauthenticated user cannot add blog', () => {
  test('test will fail with 401 authorization error', async() => {
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)
  })
})

// exercise 4.13
describe('deletion of a blog possible when user authenticated', () => {
  test('deletion of first blog is possible', async () => {
    const blogsAtStart = await api.get('/api/blogs')
    // pick first blog to delete
    const blogToDelete = blogsAtStart.body[0]
    await api.
      delete(`/api/blogs/${blogToDelete.id}`)
      .set({ Authorization: token})
      .expect(204)
    
    const blogsAtEnd = await api.get('/api/blogs')
    expect(blogsAtEnd.body).toHaveLength(initialBlogs.length - 1)
    const contents = blogsAtEnd.body.map((blog) => blog.title)
    expect(contents).not.toContain(blogToDelete.title)
  })
})

// exercise 4.14
describe('update a blog when user authenticated', () => {
  test('change amount of likes on last blog', async () => {
    const blogsAtStart = await api.get('/api/blogs')
    // pick last blog to update
    const last = blogsAtStart.body.length - 1
    const blogToUpdate = blogsAtStart.body[last]
    const dataToUpdate = {
      likes: 10
    }

    const updatedBlog = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(dataToUpdate)
      .set({ Authorization: token})
      .expect(201)

    const blogsAfterUpdate = await api.get('/api/blogs')
    const contents = blogsAfterUpdate.body.map(blog => blog.likes)
    expect(contents).toContain(updatedBlog.body.likes)
  } )
})

afterAll(() => {
  mongoose.connection.close()
})