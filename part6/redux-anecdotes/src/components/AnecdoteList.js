import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addVote} from '../reducers/anecdoteReducer'

const Anecdote = ({anecdote, handleClick}) => (
    <div>
        <div>{anecdote.content}</div> 
        <div>
            has {anecdote.votes} votes
            <button onClick={handleClick}>vote</button>
        </div>
    </div>
)

const AnecdoteList = () => {
    const state = useSelector(state=> state)
    console.log(state)
    const anecdotes = useSelector(({anecdotes, notification}) => anecdotes.sort((a, b) => b.votes - a.votes))
    
    const dispatch = useDispatch()
  
    return(
    <ul >
        {anecdotes.map((anecdote) => (
        <Anecdote 
            key={anecdote.id} 
            anecdote={anecdote} 
            handleClick={() => dispatch(addVote(anecdote.id))} 
        />
        ))}
    </ul>)
}

export default AnecdoteList

