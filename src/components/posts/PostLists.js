import { React } from "react";
import { useGetPostsQuery,
} from "../../reducers/postsSlice";
import Post from "./Post";


const PostLists = () => {
  const {
    data: posts,
    isLoading,
    isSuccess,
    isError,
    error
} = useGetPostsQuery('getPosts')

let content;
if (isLoading) {
    content = <p>"Loading..."</p>;
} else if (isSuccess) {
    content = posts.ids.map(postId => <Post key={postId} postId={postId} />)
} else if (isError) {
    content = <p>{error}</p>;
}
  return (
    <section>
      {content}
    </section>
  );
};

export default PostLists;
