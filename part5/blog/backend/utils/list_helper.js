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

const mostBlogs = (blogs) => {
    const authors = []

    blogs.forEach((blog) => {
        if (!authors.length) {
            const author = {
                author: blog.author,
                blogs: 1,
            }
            authors.push(author)
        } else {
            let found = false
            authors.forEach((author, index) => {
                if (blog.author === author.author) {
                    authors[index].blogs += 1
                    found = true
                }
            })
            if (!found) {
                authors.push({
                    author: blog.author,
                    blogs: 1,
                })
            }
        }
    })

    authors.sort((a, b) => b.blogs - a.blogs)
    return authors[0]
}

const mostLikes = (blogs) => {
    const authors = []

    blogs.forEach((blog) => {
        if (!authors.length) {
            const author = {
                author: blog.author,
                likes: blog.likes,
            }
            authors.push(author)
        } else {
            let found = false
            authors.forEach((author, index) => {
                if (blog.author === author.author) {
                    authors[index].likes += blog.likes
                    found = true
                }
            })
            if (!found) {
                authors.push({
                    author: blog.author,
                    likes: blog.likes,
                })
            }
        }
    })
    authors.sort((a, b) => b.likes - a.likes)
    return authors[0]
}


module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes,
}
