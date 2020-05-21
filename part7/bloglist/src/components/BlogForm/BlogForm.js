import React, {} from 'react'
import { connect } from 'react-redux'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'

import { addBlog } from '../../reducers/blogReducer'
import { setNotification } from '../../reducers/notificationReducer'


const useStyles = makeStyles({
  form: {
    display: 'flex',
    'flex-direction': 'column',
  },
})

const BlogForm = ({ addBlog, setNotification }) => {
  const classes = useStyles()
  const addPost = async (event) => {
    try {
      event.preventDefault()
      // cria um objeto blog com titulo, author e url
      const blogObject = {
        title: event.target.title.value,
        author: event.target.author.value,
        url: event.target.author.value,
      }
      // reseta o state do titulo, author e url
      event.target.title.value = ''
      event.target.author.value = ''
      event.target.url.value = ''

      // envia o objeto blog para o metodo addblog no app.js
      await addBlog(blogObject)
      setNotification(`A new blog ${blogObject.title} by ${blogObject.author} was added`, 3)
    } catch (error) {
      setNotification('There was an error with your post, please check all fields', 3)
    }
  }

  return (
    <Grid
      container
      spacing={0}
      direction="row"
      justify="center"
    >
      <Grid item xs={10} sm={6}>
        <h2>Create New</h2>
        <form className={classes.form} onSubmit={addPost}>
          <TextField
            id="title"
            type="text"
            name="title"
            label="Title"
          />
          <TextField
            id="author"
            type="text"
            name="author"
            label="Author"
          />
          <TextField
            id="url"
            type="text"
            name="url"
            label="Url"
          />
          <Button id="create-button" type="submit">create</Button>
        </form>
      </Grid>

    </Grid>
  )
}


export default connect(null, { addBlog, setNotification })(BlogForm)
