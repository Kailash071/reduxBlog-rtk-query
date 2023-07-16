import React from 'react'
import { useSelector } from 'react-redux'
import {useUsersSelector} from '../../reducers/usersSlice'

const PostAuthor = ({userId}) => {
const users = useSelector(useUsersSelector)
const author = users.find(user => Number( user.id) === Number(userId))
return <span>By {author ? author.name : 'Unknown author'}</span>
}

export default PostAuthor