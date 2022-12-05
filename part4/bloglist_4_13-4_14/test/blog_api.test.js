const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)


beforeEach(async () => {  
  
  await Blog.deleteMany({})

  const blogObject = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObject.map(blog => blog.save())
  await Promise.all(promiseArray)

})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: ".net core",
    author: "Daniel Sanchez",
    url: "https://reactpatterns.com/",
    likes: 7,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const contents = blogsAtEnd.map(n => n.title)
  expect(contents).toContain(
    '.net core'
  )
})

test('blog without likes is not added', async () => {
  const newNote = {
    title: "core 6",
    likes:5
  }

  const savedBlog = await api
    .post('/api/blogs')
    .send(newNote)
    .expect(200)

  expect(savedBlog.body).toHaveProperty('likes')
})

test('blog without title, url is not added', async () => {
  const newBlog = {
    title: "core 6",
    likes:5,
    url:"www.google.com"
  }

  const savedBlog = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)

  expect(savedBlog.body).toHaveProperty('url')
  expect(savedBlog.body).toHaveProperty('title')
})

afterAll(() => {
  mongoose.connection.close()
})