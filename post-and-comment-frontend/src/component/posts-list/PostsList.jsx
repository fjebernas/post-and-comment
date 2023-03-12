import { ListGroup } from "react-bootstrap";
import Post from "../post/Post";
import PostPlaceholders from "./post-placeholders/PostPlaceholders";

function PostsList(props) {

  return (
    <>
      <h1 className="text-center mt-5">Posts</h1>
      <ListGroup variant="flush">
        {
          props.isLoading ? (
            <>
              <PostPlaceholders />
            </>
          ) :
          props.posts.length > 0 ?
            props.posts.map(post => (
              <ListGroup.Item key={post.id}>
                <Post
                  post={post}
                  handleDeleteButton={props.handleDeleteButton}
                  handleEditButton={props.handleEditButton}
                />
              </ListGroup.Item>
            )) : <p className="text-muted text-center my-4">No posts to show</p>
        }
      </ListGroup>
    </>
  );
}

export default PostsList;