import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { selectPostById, updatePost , deletePost} from '../../reducers/postsSlice'
import { useUsersSelector } from "../../reducers/usersSlice";


const PostEdit = () => {
    const { postId } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
  
    
    const users = useSelector(useUsersSelector);
    const post = useSelector((state) => selectPostById(state, Number(postId)))

    const [title, setTitle] = useState(post?.title);
    const [userId, setUserId] = useState(post?.userId);
    const [content, setContent] = useState(post?.body);
    const [requestStatus,setRequestStatus] = useState('idle')
    
    const canSave = [title, content, userId].every(Boolean) && requestStatus === 'idle';

    if (!post) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        )
    }
    const onSavePostClicked = () => {
        if (canSave) {
         try {
            setRequestStatus('pending')
            dispatch(updatePost({ id:Number(post.id),title, body: content, userId,reactions:post.reactions })).unwrap()
            setTitle("");
            setContent("");
            setUserId('')
            navigate('/')
         } catch (error) {
            console.error('Failed to save the post', error)
         }finally{
            setRequestStatus('idle')
         }
        }
      };
      const usersOptions = users.map((user) => (
        <option key={user.id} value={user.id}>
          {user.name}
        </option>
      ));
      const onDeletePostClicked = () => {
        try {
            setRequestStatus('pending')
            dispatch(deletePost({ id: post.id })).unwrap()

            setTitle('')
            setContent('')
            setUserId('')
            navigate('/')
        } catch (err) {
            console.error('Failed to delete the post', err)
        } finally {
            setRequestStatus('idle')
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