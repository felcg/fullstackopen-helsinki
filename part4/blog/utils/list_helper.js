// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => 1

const totalLikes = (blogs) => {
    const sumLikes = (sum, item) => sum + item.likes
    return blogs.reduce(sumLikes, 0)
}

module.exports = {
    dummy, totalLikes,
}
