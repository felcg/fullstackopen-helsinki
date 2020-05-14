import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  
  switch (action.type) {
    case 'VOTE':
      const { id } = action
      const anecdoteToVote = state.find((n) => n.id === id)
      const changedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes+1,
      }
    return state.map((note) => (note.id !== id ? note : changedAnecdote))
    case 'CREATE':
      return [...state, action.content]
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
    }  
}

export const addVote = (id) => ({
  type: "VOTE", 
  id: id
})

export const createAnecdote = (content) => ({
  type: "CREATE", content
})

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