import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const User = ({ user }) => (
  <tr>
    <td><Link to={`/users/${user.id}`}>{user.username}</Link></td>
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
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
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
