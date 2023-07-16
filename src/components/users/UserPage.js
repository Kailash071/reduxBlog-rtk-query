import React from "react"
import { useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { selectUserById } from "../../reducers/usersSlice"
import {  selectPostByUser } from "../../reducers/postsSlice"
const UserPage = () => {
  const { userId } = useParams()
  const user = useSelector((state) => selectUserById(state, Number(userId)))
  const postsForUser = useSelector((state) =>
    selectPostByUser(state, Number(userId))
  )
  return (
    <section>
      <h2>{user?.name}</h2>

      <ol className="list-group">
        {postsForUser.map((post) => (
          <li key={post.id} className="list-group-item">
            <Link to={`/post/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ol>
    </section>
  )
}

export default UserPage
