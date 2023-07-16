import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import {useAddNewPostMutation } from "../../reducers/postsSlice";
import {useGetUsersQuery } from "../../reducers/usersSlice";

const PostAddForm = () => {
  const navigate = useNavigate();
  const [addNewPost,isLoading] = useAddNewPostMutation()
  const [title, setTitle] = useState("");
  const [userId, setUserId] = useState("");
  const [content, setContent] = useState("");

  const canSave = [title, content, userId].every(Boolean) && !isLoading;
  
  const { data: users, isSuccess } = useGetUsersQuery('getUsers')
  
  const onSavePostClicked =async () => {
    if (canSave) {
     try {
       await addNewPost({ title, body: content, userId }).unwrap()
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
  if (isSuccess) {
      usersOptions = users.ids.map(id => (
          <option key={id} value={id}>
              {users.entities[id].name}
          </option>
      ))
  }

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
