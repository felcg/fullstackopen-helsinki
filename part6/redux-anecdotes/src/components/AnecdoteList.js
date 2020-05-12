import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addVote} from '../reducers/anecdoteReducer'
import {setNotification, removeNotification} from "../reducers/notificationReducer"

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
    const anecdotes = useSelector(({anecdotes, notification}) => anecdotes.sort((a, b) => b.votes - a.votes))
    
    const dispatch = useDispatch()
  
    return(
    <ul >
        {anecdotes.map((anecdote) => (
        <Anecdote 
            key={anecdote.id} 
            anecdote={anecdote} 
            handleClick={() => {
                dispatch(addVote(anecdote.id))
                dispatch(setNotification(`You voted for "${anecdote.content}"`))
                setTimeout(() => {
                    dispatch(removeNotification());
                  }, 5000);
            }} 
        />
        ))}
    </ul>)
}

export default AnecdoteList

