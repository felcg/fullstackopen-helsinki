const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const app = require('../app')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogList.map((note) => new Blog(note))
    const promiseArray = blogObjects.map((note) => note.save())
    await Promise.all(promiseArray)
})

test('returns the correct amount of blog posts in JSON format', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('identifier property of the blog posts is named id', async () => {
    const blogs = await helper.blogsInDb()
    const blog = blogs[0]

    expect(blog.id).toBeDefined()
})

afterAll(() => {
    mongoose.connection.close()
})
