import { Accordion, ListGroup, Spinner } from "react-bootstrap";
import Comment from "./comment/Comment";

function CommentsList(props) {
  return (
    <Accordion className="mt-2 text-info">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Comments&nbsp;
        {
          props.isLoading ? <Spinner animation="border" size="sm" variant="primary" />
            : ( <span>{`(${props.comments.length})`}</span> )
        }
        </Accordion.Header>
        <Accordion.Body className="p-0">
          <ListGroup variant="flush" className="bg-transparent">
            {
              props.comments.length > 0 ?
              props.comments.map(comment => (
                <ListGroup.Item
                  key={comment.id}
                  className="bg-transparent d-flex justify-content-between"
                >
                  <Comment comment={comment} />
                </ListGroup.Item>
                )) : <ListGroup.Item className="text-muted fst-italic bg-transparent">No comments yet</ListGroup.Item>
            }
          </ListGroup>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default CommentsList;