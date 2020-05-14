import { createStore, combineReducers } from 'redux'
import anecdoteReducer, {initializeAnecdotes} from './anecdoteReducer'
import notificationReducer from './notificationReducer'
import filterReducer from "./filterReducer"
import { composeWithDevTools } from 'redux-devtools-extension'
import anecdoteService from '../services/anecdotes'

const reducer = combineReducers({
    anecdotes: anecdoteReducer,
    notification: notificationReducer,
    filter: filterReducer
})

const store = createStore(reducer, composeWithDevTools())

anecdoteService.getAll().then(anecdotes => store.dispatch(initializeAnecdotes(anecdotes)))


export default store