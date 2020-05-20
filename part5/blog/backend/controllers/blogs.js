const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require('../models/comment')


blogsRouter.get('/', async (request, response, next) => {
    try {
        const blogs = await Blog.find({})
            .populate('user', { username: 1 })
            .populate('comments', { text: 1 })
        response.json(blogs.map((blog) => blog.toJSON()))
    } catch (error) {
        next(error)
    }
})

blogsRouter.post('/', async (request, response, next) => {
    const { body, token } = request
    try {
        const decodedToken = jwt.verify(token, process.env.SECRET)
        if (!token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }
        const user = await User.findById(decodedToken.id)

        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes ? body.likes : 0,
            user: user._id,
        })

        const newBlog = await blog.save()
        user.blogs = user.blogs.concat(newBlog._id)
        await user.save()
        response.status(201).json(newBlog)
    } catch (error) {
        next(error)
    }
})

blogsRouter.delete('/:id', async (request, response, next) => {
    const { token } = request
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const blog = await Blog.findById(request.params.id)
    try {
        if (decodedToken.id.toString() === blog.user.toString()) {
            await Blog.findByIdAndRemove(request.params.id)
            response.status(204).end()
        } else {
            return response.status(401).json({ error: 'Unauthorized can\'t delete posts you are not the owner of' })
        }
    } catch (error) {
        next(error)
    }
})

blogsRouter.put('/:id', async (req, res, next) => {
    const { body } = req
    const blog = {
        likes: body.likes,
        visibility: body.visibility,
    }

    try {
        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
        res.json(updatedBlog.toJSON())
    } catch (error) {
        next(error)
    }
})

blogsRouter.post('/:id/comments', async (req, res, next) => {
    try {
        const { body } = req
        console.log(req.params.id)
        const blog = await Blog.findById(req.params.id)

        const comment = new Comment({
            text: body.text,
            blog: blog._id,
        })

        const newComment = await comment.save()
        console.log(blog)
        blog.comments = blog.comments.concat(newComment._id)
        await blog.save()
        res.status(201).json(newComment)
    } catch (error) {
        next(error)
    }
})

module.exports = blogsRouter
