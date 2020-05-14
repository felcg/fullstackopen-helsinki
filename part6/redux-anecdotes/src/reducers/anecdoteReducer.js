import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  
  switch (action.type) {
    case 'VOTE':
      const { id } = action.data
      const anecdoteToVote = state.find((n) => n.id === id)
      const changedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes+1,
      }
      return state.map((note) => (note.id !== id ? note : changedAnecdote))
    case 'CREATE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
    }  
}

export const addVote = (id) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.addVote(id)
    dispatch({
      type:"VOTE",
      data: updatedAnecdote
    })
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: "CREATE",
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export default anecdoteReducer