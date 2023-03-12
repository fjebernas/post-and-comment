import { useRef, useState } from "react";
import { Form } from "react-bootstrap";

function CreateCommentForm(props) {

  const [comment, setComment] = useState({});

  const formRef = useRef();

  const handleCommentChange = (e) => {
    setComment({...comment, text: e.target.value});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleCommentCreate(comment) && setComment({});
    formRef.current.reset();
  }

  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <Form.Control onChange={handleCommentChange} type="text" placeholder="Write comment" className="d-inline" />
    </Form>
  );
}

export default CreateCommentForm;