import React from 'react'
import { connect } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import {setNotification} from "../reducers/notificationReducer"
import anecdoteService from '../services/anecdotes'

const Anecdote = ({anecdote, handleClick}) => (
    <div>
        <div>{anecdote.content}</div> 
        <div>
            has {anecdote.votes} votes
            <button onClick={handleClick}>vote</button>
        </div>
        <div>
            <button onClick={() => anecdoteService.remove(anecdote.id)}>Remove</button>
        </div>
    </div>
)

const AnecdoteList = (props) => {
 
    return(
    <ul >
        {props.anecdotes.map((anecdote) => (
        <Anecdote
            key={anecdote.id} 
            anecdote={anecdote} 
            handleClick={() => {
                props.addVote(anecdote.id)
                props.setNotification(`You voted for "${anecdote.content}"`, 5)
            }} 
        />
        ))}
    </ul>)
}

const mapStateToProps = (state) => {
    console.log(state)
    if ( state.filter.type === 'FILTER_ON' ) {
        return {
            anecdotes: state.anecdotes.filter((anecdotesArray => anecdotesArray.content.includes(state.filter.content)))
        }
    }
    return {
        anecdotes: state.anecdotes.sort((a, b) => b.votes - a.votes)
    }
}

const mapDispatchToProps = {
    addVote, setNotification
}

const ConnectedAnecdotes = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
export default ConnectedAnecdotes

