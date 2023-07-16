import React from "react"
import { useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import {useGetUsersQuery } from "../../reducers/usersSlice"
import {  useGetPostByUserIdQuery } from "../../reducers/postsSlice"
const UserPage = () => {
  const { userId } = useParams()
  const { user,
    isLoading: isLoadingUser,
    isSuccess: isSuccessUser,
    isError: isErrorUser,
    error: errorUser
} = useGetUsersQuery('getUsers', {
    selectFromResult: ({ data, isLoading, isSuccess, isError, error }) => ({
        user: data?.entities[userId],
        isLoading,
        isSuccess,
        isError,
        error
    }),
})
  const {data:postsForUser,isLoading,isSuccess,isError,error} = useGetPostByUserIdQuery(userId)
  let content;
    if (isLoading || isLoadingUser) {
        content = <p>Loading...</p>
    } else if (isSuccess && isSuccessUser) {
        const { ids, entities } = postsForUser
        content = ids.map(id => (
            <li key={id} className="list-group-items">
                <Link to={`/post/${id}`}>{entities[id].title}</Link>
            </li>
        ))
    } else if (isError || isErrorUser) {
        content = <p>{error}</p>;
    }

  return (
    <section>
      <h2>{user?.name}</h2>

      <ol className="list-group">
        {content}
      </ol>
    </section>
  )
}

export default UserPage
