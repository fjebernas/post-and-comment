import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import ReactTimeAgo from 'react-time-ago';
import commentService from "../../service/CommentService";
import { toastError, toastSuccess } from "../../toast/toast";
import CommentsList from "../comments-list/CommentsList";
import CreateCommentForm from "../create-comment-form/CreateCommentForm";
import PostOptionsDropdown from "./post-options-dropdown/PostOptionsDropdown";

function Post(props) {

  const [comments, setComments] = useState([]);

  const [isCommentsLoading, setIsCommentsLoading] = useState(false);

  const getComments = async () => {
    setIsCommentsLoading(true);
    await commentService.getAllPosts(props.post.id)
      .then(res => {
        setComments(res.data.content);
      })
      .catch(err => {
        toastError(err.message);
      });
    setIsCommentsLoading(false);
  }

  useEffect(() => {
    getComments();
  }, []);

  const handleCommentCreate = (comment) => {
    commentService.createComment(props.post.id, comment)
      .then(res => {
        toastSuccess("Comment created");
        getComments();
      })
      .catch(err => {
        Object.values(err.response.data).forEach(message => toastError(message));
      });
  }

  return (
    <Card className="my-4 position-relative">
      <Card.Header>
        <Card.Title>{props.post.title}</Card.Title>
        <Card.Subtitle className="fs-6 text-muted fw-light">
          <span>Posted:&nbsp;</span>
          <ReactTimeAgo date={Date.parse(props.post.createdAt)} locale="en" />
          {
            props.post.updatedAt != props.post.createdAt && (
              <span className="ms-2">
                <span>Modified:&nbsp;</span>
                <ReactTimeAgo date={Date.parse(props.post.updatedAt)} locale="en" />
              </span>
            )
          }
        </Card.Subtitle>
      </Card.Header>
      <Card.Body>
        <Card.Subtitle className="mb-2 text-muted fst-italic">{props.post.description}</Card.Subtitle>
        <Card.Text>{props.post.content}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <CreateCommentForm handleCommentCreate={handleCommentCreate} />
        <CommentsList comments={comments} isLoading={isCommentsLoading} />
      </Card.Footer>

      <PostOptionsDropdown
        postId={props.post.id}
        handleDeleteButton={props.handleDeleteButton}
        handleEditButton={props.handleEditButton}
      />
    </Card>
  );
}

export default Post;