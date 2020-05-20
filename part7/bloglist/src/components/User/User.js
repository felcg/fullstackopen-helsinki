import React from 'react'

const User = ({ user }) => {
  console.log(user)
  if (!user) {
    return null
  }
  return (
    <div>
      <h1>{user.username}</h1>
      <h2>added blogs</h2>
      {user.blogs.length
        ? (
          <ul>
            {user.blogs.map((blog) => (
              <li key={blog.id}>{blog.title}</li>
            ))}
          </ul>
        )
        : <div> This user has no blog posts</div>}

    </div>
  )
}

export default User
