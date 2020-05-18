import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'TOGGLE_VISIBILITY': {
    const { id } = action.data
    const blogToToggle = state.find((blog) => blog.id === id)
    const toggledBlog = { ...blogToToggle, visibility: !blogToToggle.visibility }
    return state.map((blog) => (blog.id !== id ? blog : toggledBlog))
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

export const toggleVisibility = (id) => async (dispatch) => {
  const blogToToggle = await blogService.toggleVisibility(id)
  dispatch({
    type: 'TOGGLE_VISIBILITY',
    data: blogToToggle,
  })
}


export default blogReducer
