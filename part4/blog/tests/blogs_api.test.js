const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const app = require('../app')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogList.map((blog) => new Blog(blog))
    const promiseArray = blogObjects.map((blog) => blog.save())
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

test('successfully creates a new blog post', async () => {
    const newBlog = {
        title: 'A Verdade',
        author: 'Lucas Xisde',
        url: 'averade.com.br',
        likes: 108,
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)


    const blogsAtEnd = await helper.blogsInDb()
    const titles = blogsAtEnd.map((blog) => blog.title)
    expect(blogsAtEnd.length).toBe(helper.initialBlogList.length + 1)
    expect(titles).toContain(newBlog.title)
})

afterAll(() => {
    mongoose.connection.close()
})
