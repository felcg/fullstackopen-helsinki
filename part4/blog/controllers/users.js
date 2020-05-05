const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users.map((u) => u.toJSON()))
})

usersRouter.post('/', async (request, response) => {
    const { body } = request

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    })

    const savedUser = await user.save()

    response.json(savedUser)
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
