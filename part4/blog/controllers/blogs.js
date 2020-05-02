const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response, next) => {
    try {
        const blogs = await Blog.find({})
        response.json(blogs)
    } catch (error) {
        next(error)
    }
})

blogsRouter.post('/', async (request, response, next) => {
    const { body } = request
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes ? body.likes : 0,
    })

    try {
        const newBlog = await blog.save()
        response.status(201).json(newBlog)
    } catch (error) {
        next(error)
    }
})

blogsRouter.delete('/:id', async (req, res, next) => {
    try {
        await Blog.findByIdAndRemove(req.params.id)
        res.status(204).end()
    } catch (error) {
        next(error)
    }
})

blogsRouter.put('/:id', async (req, res, next) => {
    const { body } = req

    const blog = {
        likes: body.likes,
    }

    try {
        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
        res.json(updatedBlog.toJSON())
    } catch (error) {
        next(error)
    }
})

module.exports = blogsRouter
