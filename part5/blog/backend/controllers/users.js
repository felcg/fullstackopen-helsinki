const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response, next) => {
    try {
        const users = await User.find({}).populate('blogs', { title: 1, likes: 1 })
        response.json(users.map((u) => u.toJSON()))
    } catch (error) {
        next(error)
    }
})

// eslint-disable-next-line consistent-return
usersRouter.post('/', async (request, response, next) => {
    try {
        const { body } = request

        if (body.password === undefined) {
            return response.status(400).json({ error: 'password is missing' })
        } if (body.password.length < 3) {
            return response.status(400).json({ error: 'password must have more than 3 characters' })
        }

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)

        const user = new User({
            username: body.username,
            name: body.name,
            passwordHash,
        })

        const savedUser = await user.save()
        response.json(savedUser)
    } catch (error) {
        next(error)
    }
})

usersRouter.delete('/:id', async (req, res, next) => {
    try {
        await User.findByIdAndRemove(req.params.id)
        res.status(204).end()
    } catch (error) {
        next(error)
    }
})

module.exports = usersRouter
