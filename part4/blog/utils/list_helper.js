// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => 1

const totalLikes = (blogs) => (blogs.length === 0
    ? 0
    : blogs.map((blog) => blog.likes).reduce((sum, item) => sum + item))

const favoriteBlog = (blogs) => {
    let likes = 0
    // eslint-disable-next-line no-shadow
    let favoriteBlog = {}

    blogs.forEach((blog) => {
        if (blog.likes > likes) {
            likes = blog.likes
            favoriteBlog = blog
        }
    })

    return {
        title: favoriteBlog.title,
        author: favoriteBlog.author,
        likes: favoriteBlog.likes,
    }
}


module.exports = {
    dummy, totalLikes, favoriteBlog,
}
