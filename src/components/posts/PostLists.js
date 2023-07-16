import { React } from "react";
import { useSelector } from "react-redux";
import {
  selectPostIds,
  getPostsError,
  getPostsStatus,
} from "../../reducers/postsSlice";
import Post from "./Post";

const PostLists = () => {
  const orderedPosts = useSelector(selectPostIds);
  const postsStatus = useSelector(getPostsStatus);
  const postsError = useSelector(getPostsError);

  let content;
  if (postsStatus === "loading") {
    content = <p>Loading...</p>;
  } else if (postsStatus === "succeeded") {
     content = orderedPosts.map((postId) => <Post key={postId} postId={postId}/> );
  } else if (postsStatus === "failed") {
    content = <p>{postsError}</p>;
  }
  return (
    <section>
      {content}
    </section>
  );
};

export default PostLists;
