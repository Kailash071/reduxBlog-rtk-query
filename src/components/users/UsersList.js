import React from "react"
import { Link } from "react-router-dom"
import { useUsersSelector } from "../../reducers/usersSlice"
import { useSelector } from "react-redux"
const UsersList = () => {
  const users = useSelector(useUsersSelector)

  return (
    <>
      <h2 className="mt-1">UsersList</h2>
      <ul className="list-group">
        {users.map((user) => (
          <li key={user.id} className="list-group-item list-group-item-action">
            <Link to={`/user/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export default UsersList
