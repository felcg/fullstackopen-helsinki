const noteReducer = (state = [], action) => {
  switch (action.type) {
  case 'NEW_NOTE':
    return [...state, action.data]
  case 'TOGGLE_IMPORTANCE': {
    const { id } = action.data
    const noteToChange = state.find((n) => n.id === id)
    const changedNote = {
      ...noteToChange,
      important: !noteToChange.important,
    }
    return state.map((note) => (note.id !== id ? note : changedNote))
  }
  case 'INIT_NOTES':
    return action.data
  default:
    return state
  }
}

export const createNote = (content) => ({
  type: 'NEW_NOTE',
  data: {
    content,
    important: false,
  },
})

export const toggleImportanceOf = (id) => ({
  type: 'TOGGLE_IMPORTANCE',
  data: { id },
})

export const initializeNotes = (notes) => ({
  type: 'INIT_NOTES',
  data: notes,
})

export default noteReducer
