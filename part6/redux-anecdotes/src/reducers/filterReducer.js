const filterReducer = (state = '', action) => {
    switch (action.type) {
    case("FILTER_ON"):
        return action
    default:
        return state
    }
}

export const filterChange = (content) => ({
  type: 'FILTER_ON',
  content,
})

export default filterReducer