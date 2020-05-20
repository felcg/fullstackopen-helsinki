import React from 'react'
import { useSelector } from 'react-redux'

const User = ({ user }) => (
  <tr>
    <td>{user.username}</td>
    <td>{user.blogs.length}</td>
  </tr>
)


const UserList = () => {
  const users = useSelector((state) => state.users)
  return (
    <div>
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <th />
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map((user) => <User key={user.id} user={user} />)
          }
        </tbody>
      </table>
    </div>
  )
}

export default UserList
