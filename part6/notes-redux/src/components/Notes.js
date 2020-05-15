import React from 'react'
import { connect } from 'react-redux'
import { toggleImportanceOf } from '../reducers/noteReducer'

const Note = ({ note, handleClick }) => (
  <li>
    {note.content}
    <strong> {note.important ? 'important' : ''}</strong>
    <button onClick={handleClick}>make important</button>
  </li>
)

const Notes = ({ notes, toggleImportanceOf }) => (
  <ul>
    {notes.map((note) => (
      <Note
        key={note.id}
        note={note}
        handleClick={() => toggleImportanceOf(note.id)}
      />
    ))}
  </ul>
)

const mapStateToProps = (state) => {
  if (state.filter === 'ALL') {
    return {
      notes: state.notes,
    }
  }
  return {
    notes: (state.filter === 'IMPORTANT'
      ? state.notes.filter((note) => note.important)
      : state.notes.filter((note) => !note.important)
    ),
  }
}

const mapDispatchToProps = {
  toggleImportanceOf,
}

const ConnectedNotes = connect(mapStateToProps, mapDispatchToProps)(Notes)
export default ConnectedNotes
