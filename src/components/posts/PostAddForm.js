import { React, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addNewPost } from "../../reducers/postsSlice";
import { useUsersSelector } from "../../reducers/usersSlice";

const PostAddForm = () => {
    const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [userId, setUserId] = useState("");
  const [content, setContent] = useState("");
  const [addRequestStatus,setAddRequestStatus] = useState('idle')

  const canSave = [title, content, userId].every(Boolean) && addRequestStatus === 'idle';
  
  const users = useSelector(useUsersSelector);
  
  const onSavePostClicked = () => {
    if (canSave) {
     try {
        setAddRequestStatus('pending')
        dispatch(addNewPost({ title, body: content, userId })).unwrap()
        setTitle("");
        setContent("");
        navigate('/')
     } catch (error) {
        console.error('Failed to save the post', error)
     }finally{
        setAddRequestStatus('idle')
     }
    }
  };
  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));
  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select
          id="postAuthor"
          className="form-control"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        >
          <option value=""></option>
          {usersOptions}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          className="form-control"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button className="btn btn-primary" type="button" onClick={onSavePostClicked} disabled={!canSave}>
          Save Post
        </button>
      </form>
    </section>
  );
};

export default PostAddForm;
