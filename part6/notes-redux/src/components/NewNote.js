import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createNote } from '../reducers/noteReducer'


const NewNote = (props) => {
  const state = useSelector((state) => state)
  const dispatch = useDispatch()

  const addNote = (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    dispatch(createNote(content))
    console.log(state)
  }

  return (
    <form onSubmit={addNote}>
      <input name="note" />
      <button type="submit">add</button>
    </form>
  )
}

export default NewNote
