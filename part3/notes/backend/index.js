require('dotenv').config()
const express = require('express')
const cors = require('cors')
const Note = require('./models/note')

const app = express()
const { PORT } = process.env

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// eslint-disable-next-line consistent-return
const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  }

  next(error)
}

app.use(cors())
app.use(express.json())
app.use(express.static('build'))
app.use(requestLogger)

app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>')
})

app.get('/api/notes', (req, res) => {
  Note.find({}).then((notes) => {
    res.json(notes.map((note) => note.toJSON()))
  })
})

app.get('/api/notes/:id', (request, response, next) => {
  Note.findById(request.params.id)
    .then((note) => {
      if (note) {
        response.json(note.toJSON())
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => {
      next(error)
    })
})

app.delete('/api/notes/:id', (request, response, next) => {
  Note.findByIdAndRemove(request.params.id)
    .then((result) => {
      console.log(`"${result.id}" was deleted`)
      response.status(204).end()
    })
    .catch((error) => next(error))
})

app.post('/api/notes', (request, response, next) => {
  const { body } = request

  const note = new Note({
    content: body.content,
    date: new Date(),
    important: body.important || false,
  })

  note
    .save()
    .then((savedNote) => savedNote.toJSON())
    .then((savedAndFormattedNote) => response.json(savedAndFormattedNote))
    .catch((error) => next(error))
})

app.put('/api/notes/:id', (request, response, next) => {
  const { body } = request

  const note = {
    content: body.content,
    important: body.important,
  }

  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then((updatedNote) => {
      response.json(updatedNote.toJSON())
    })
    .catch((error) => next(error))
})

app.use(unknownEndpoint)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
