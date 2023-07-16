
// import AddPostForm from "./features/posts/AddPostForm";
// import SinglePostPage from "./features/posts/SinglePostPage";
// import EditPostForm from "./features/posts/EditPostForm";
import Layout from "./components/Layout";
import { Routes, Route } from 'react-router-dom';
import PostLists from "./components/posts/PostLists";
import PostAddForm from "./components/posts/PostAddForm";
import SinglePost from "./components/posts/SinglePost";
import PostEdit from "./components/posts/PostEdit";
import UsersList from "./components/users/UsersList";
import UserPage from "./components/users/UserPage";

function App() {
  return (
    <Routes>
    <Route path="/" element={<Layout />}>

      <Route index element={<PostLists />} />

      <Route path="post">
        <Route index element={<PostAddForm/>} />
         <Route path=":postId" element={<SinglePost />} />
       <Route path="edit/:postId" element={<PostEdit />} />
      </Route>
      <Route path="user">
        <Route index element={<UsersList/>} />
         <Route path=":userId" element={<UserPage />} />
      </Route>
    </Route>
  </Routes>
  );
}

export default App;
