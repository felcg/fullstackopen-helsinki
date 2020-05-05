const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')
const app = require('../app')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    const blogObjects = helper.initialBlogList.map((blog) => new Blog(blog))
    const promiseArray = blogObjects.map((blog) => blog.save())
    await Promise.all(promiseArray)

    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('password', 10)
    const user = new User({ username: 'Felipe', passwordHash })
    await user.save()
})

describe('when there are blogs already in the db', () => {
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

    test('blog can be deleted', async () => {
        const blogsAtStart = await helper.blogsInDb()

        // Cria um novo post e um novo usuario pois o sistema nao permite
        // que usuarios nao cadastrados criem ou deletem posts
        const newBlog = {
            title: 'A Verdade',
            author: 'Lucas Xisde',
            url: 'averade.com.br',
            likes: 108,
        }

        const user = {
            username: 'Felipe',
            password: 'password',
        }

        // Loga o usuario e pega a token recebida pelo middleware que criamos
        // pois apenas o usuario que criou o post pode deletá-lo
        const loggedInUser = await api.post('/api/login').send(user)
        const { token } = loggedInUser.body

        // Envia o novo post por um POST request
        await api
            .post('/api/blogs')
            .send(newBlog)
            .set('Authorization', `bearer ${token}`)

        // Recebe o psot criado e o seleciona (ja existem 5 posts na lista)
        const postedBlog = await api.get('/api/blogs')
        const blogToDelete = postedBlog.body[6]

        // Finalmente deleta o post
        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set('Authorization', `bearer ${token}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(blogsAtStart.length)

        const authors = blogsAtEnd.map((p) => p.author)
        expect(authors).not.toContain(blogToDelete.author)
    })

    test('blog likes can be edited', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToEdit = blogsAtStart[0]
        const editedBlog = {
            likes: 10,
        }

        const response = await api
            .put(`/api/blogs/${blogToEdit.id}`)
            .send(editedBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtStart.length).toEqual(blogsAtEnd.length)
        expect(response.body.likes).toEqual(editedBlog.likes)
    })
})

describe('when trying to create a new blog', () => {
    test('successfully creates a new blog post', async () => {
        const newBlog = {
            title: 'A Verdade',
            author: 'Lucas Xisde',
            url: 'averade.com.br',
            likes: 108,
        }

        const user = {
            username: 'Felipe',
            password: 'password',
        }
        const loggedInUser = await api.post('/api/login').send(user)
        const { token } = loggedInUser.body

        await api
            .post('/api/blogs')
            .send(newBlog)
            .set('Authorization', `bearer ${token}`)
            .expect(201)
            .expect('Content-Type', /application\/json/)


        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd.length).toBe(helper.initialBlogList.length + 1)
        const titles = blogsAtEnd.map((blog) => blog.title)
        expect(titles).toContain(newBlog.title)
    })

    test('likes default to 0 if missing', async () => {
        const newBlog = {
            title: 'Likes test',
            author: 'Lucas Xisde',
            url: 'averade.com.br',
        }

        const user = {
            username: 'Felipe',
            password: 'password',
        }
        const loggedInUser = await api.post('/api/login').send(user)
        const { token } = loggedInUser.body

        await api
            .post('/api/blogs')
            .send(newBlog)
            .set('Authorization', `bearer ${token}`)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        const createdBlog = blogsAtEnd.find((blog) => blog.title === 'Likes test')
        expect(createdBlog.likes).toBe(0)
    })

    test('blog post without title and url properties is not added', async () => {
        const newBlog = {
            author: 'Lucas Xisde',
            likes: 10,
        }

        const user = {
            username: 'Felipe',
            password: 'password',
        }
        const loggedInUser = await api.post('/api/login').send(user)
        const { token } = loggedInUser.body

        await api
            .post('/api/blogs')
            .send(newBlog)
            .set('Authorization', `bearer ${token}`)
            .expect(400)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd.length).toBe(helper.initialBlogList.length)
    })
})

afterAll(() => {
    mongoose.connection.close()
})
