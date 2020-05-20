import blogService from '../services/blogs'
import { getAllUsers } from './userListReducer'

const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'TOGGLE_VISIBILITY': {
    const { id } = action.data
    const blogToToggle = state.find((blog) => blog.id === id)
    const toggledBlog = { ...blogToToggle, visibility: !blogToToggle.visibility }
    return state.map((blog) => (blog.id !== id ? blog : toggledBlog))
  }
  case 'ADD_LIKE': {
    const { id } = action.data
    const blogToLike = state.find((blog) => blog.id === id)
    const likedBlog = { ...blogToLike, likes: blogToLike.likes + 1 }
    return state.map((blog) => (blog.id !== id ? blog : likedBlog))
  }
  case 'REMOVE_BLOG': {
    const id = action.data
    return state.filter((blogs) => blogs.id !== id)
  }
  case 'ADD_BLOG': {
    return [...state, action.data]
  }
  case 'INIT_BLOGS':
    return action.data
  default:
    return state
  }
}

export const initializeBlogs = () => async (dispatch) => {
  const blogs = await blogService.getAll()
  const visibilityAdded = blogs.map((blog) => ({ ...blog, visibility: false }))
  dispatch({
    type: 'INIT_BLOGS',
    data: visibilityAdded,
  })
}

export const toggleVisibility = (blog) => async (dispatch) => {
  const blogToToggle = await blogService.toggleVisibility(blog)
  dispatch({
    type: 'TOGGLE_VISIBILITY',
    data: blogToToggle,
  })
}

export const addLike = (blog) => async (dispatch) => {
  const likedBlog = { ...blog, likes: blog.likes + 1 }
  const blogToLike = await blogService.updateLikes(likedBlog)
  dispatch({
    type: 'ADD_LIKE',
    data: blogToLike,
  })
}

export const removeBlog = (blog) => async (dispatch) => {
  if (window.confirm(`Do you really want to remove ${blog.title}?`)) {
    const { id } = blog
    await blogService.deleteBlog(blog)
    dispatch({
      type: 'REMOVE_BLOG',
      data: id,
    })
    dispatch(getAllUsers())
  }
}

export const addBlog = (blog) => async (dispatch) => {
  const newBlog = await blogService.create(blog)
  dispatch({
    type: 'ADD_BLOG',
    data: newBlog,
  })
  dispatch(getAllUsers())
}

export default blogReducer
