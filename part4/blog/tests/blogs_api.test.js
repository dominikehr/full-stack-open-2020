const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)

const initialBlogs = [
  {
    title: 'Kochrezept',
    author: 'Dominik Ehr',
    url: 'www.test.de',
    likes: 2
  },
  {
    title: 'Operating Systems',
    author: 'Dominik Ehr',
    url: 'www.test.de',
    likes: 3
  },
]

const newBlog = {
  title: 'Neu',
  author: 'Dominik_Ehr',
  url: 'www.test.de',
  likes: 2
}

const blogWithNoLikes = {
  title: 'BlogNoLikes',
  author: 'Dominik_Ehr',
  url: 'www.test.de',
}

const blogNoTitleOrUrl = {
  author: 'Dominik_Ehr',
}

beforeEach(async () => {
  // clean up database before initial insertion
  await Blog.deleteMany({})
  
  // insert the initial blog posts into the test database
  const blogObjects = initialBlogs.map(blog => new Blog(blog))
  const promiseArr = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArr)
})

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

// exercise 4.10
test('a blog can be added', async () => {
  await api.post('/api/blogs').send(newBlog).expect(201)
  
  const blogs = await api.get('/api/blogs')
  expect(blogs.body).toHaveLength(initialBlogs.length + 1)
  
  const titles = blogs.body.map((blog) => blog.title)
  expect(titles).toContain('Neu')
})

// exercise 4.11 
test('a blog without a specified likes property should default to 0 likes', async () => {
  await api.post('/api/blogs').send(blogWithNoLikes).expect(201)
  const blogs = await api.get('/api/blogs')
  expect(blogs.body[blogs.body.length-1].likes).toBe(0)
})

// exercise 4.12
test('adding a blog without title or url is not possible', async () => {
  await api.post('/api/blogs').send(blogNoTitleOrUrl).expect(400)
})

afterAll(() => {
  mongoose.connection.close()
})