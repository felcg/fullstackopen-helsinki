import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import blogsReducer, { initializeBlogs } from './reducers/blogReducer'
import blogService from './services/blogs'

const reducer = combineReducers({ blogs: blogsReducer })

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

blogService.getAll().then((blogs) => store.dispatch(initializeBlogs(blogs)))

export default store
