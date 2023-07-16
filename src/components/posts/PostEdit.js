import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {useUpdatePostMutation,useDeletePostMutation,useGetPostsQuery} from '../../reducers/postsSlice'
import { useGetUsersQuery } from "../../reducers/usersSlice";


const PostEdit = () => {
    const { postId } = useParams()
    const navigate = useNavigate()
    const [deletePost] = useDeletePostMutation()
    const [updatePost, { isLoading }] = useUpdatePostMutation()
    const { data: users, isSuccess: isSuccessUsers } = useGetUsersQuery('getUsers')
    const { post, isLoading: isLoadingPosts, isSuccess } = useGetPostsQuery('getPosts', {
        selectFromResult: ({ data, isLoading, isSuccess }) => ({
            post: data?.entities[postId],
            isLoading,
            isSuccess
        }),
    })

    const [title, setTitle] = useState(post?post.title:'');
    const [userId, setUserId] = useState(post?post.userId:'');
    const [content, setContent] = useState(post?post.body:"");
    
    useEffect(() => {
        if (isSuccess) {
            setTitle(post.title)
            setContent(post.body)
            setUserId(post.userId)
        }
    }, [isSuccess, post?.title, post?.body, post?.userId])

    if (isLoadingPosts) return <p>Loading...</p>

    if (!post) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        )
    }

    const canSave = [title, content, userId].every(Boolean) && !isLoading;
    const onSavePostClicked = () => {
        if (canSave) {
         try {
            updatePost({ id:Number(post.id),title, body: content, userId,reactions:post.reactions }).unwrap()
            setTitle("");
            setContent("");
            setUserId('')
            navigate('/')
         } catch (error) {
            console.error('Failed to save the post', error)
         }
        }
      };
      let usersOptions
      if (isSuccessUsers) {
          usersOptions = users.ids.map(id => (
              <option
                  key={id}
                  value={id}
              >{users.entities[id].name}</option>
          ))
      }
      const onDeletePostClicked = () => {
        try {
           deletePost({ id: post.id }).unwrap()

            setTitle('')
            setContent('')
            setUserId('')
            navigate('/')
        } catch (err) {
            console.error('Failed to delete the post', err)
        }
    }
  return (
    <section>
    <h2>Edit Post</h2>
    <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
            type="text"
            id="postTitle"
            name="postTitle"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            className="form-control"
        />
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" className="form-control"  value={userId} onChange={(e)=>setUserId(e.target.value)}>
            <option value=""></option>
            {usersOptions}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea
            id="postContent"
            name="postContent"
            value={content}
            className="form-control"
            onChange={(e)=>setContent(e.target.value)}
        />
        <button
        className='btn btn-primary'
            type="button"
            onClick={onSavePostClicked}
            disabled={!canSave}
        >
            Save Post
        </button>
        <button className="btn btn-danger"
            type="button"
            onClick={onDeletePostClicked}
        >
            Delete Post
        </button>
    </form>
</section>
  )
}

export default PostEdit