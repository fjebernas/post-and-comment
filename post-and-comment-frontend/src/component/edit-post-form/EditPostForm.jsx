import { useEffect, useRef, useState } from "react";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import postService from "../../service/PostService";

function EditPostForm(props) {

  const formRef = useRef();

  const [post, setPost] = useState({
    title: '',
    description: '',
    content: ''
  });

  useEffect(() => {
    const getPostById = () => {
      postService.getPostById(props.postId)
        .then(res => {
          setPost({
            title: res.data.title,
            description: res.data.description,
            content: res.data.content
          });
        })
        .catch(err => {
          console.log(err);
        });
    }

    if (props.postId !== null) {
      getPostById();
    }
  }, [props.postId]);

  const handleInputChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    setPost({...post, [name]: value});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleUpdateButton(props.postId, post);

    // TODO only do the below if create post is successful
    handleClose();
  }

  const handleClose = () => {
    setPost({
      title: '',
      description: '',
      content: ''
    });
    formRef.current.reset();
    props.onHide();
  }

  return (
    <Modal
      show={props.show}
      onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Post
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <FloatingLabel
            controlId="floatingInput"
            label="Title"
            className="mb-3"
          >
            <Form.Control
              name="title"
              type="text"
              placeholder="The Post's Title"
              defaultValue={post.title}
              onChange={handleInputChange}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Description"
            className="mb-3"
          >
            <Form.Control
              name="description"
              type="text"
              placeholder="The Post's Description"
              defaultValue={post.description}
              onChange={handleInputChange}
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingTextarea2" label="Content">
            <Form.Control
              name="content"
              as="textarea"
              placeholder="The Post's Content"
              style={{ height: '100px' }}
              className="mb-3"
              defaultValue={post.content}
              onChange={handleInputChange}
            />
          </FloatingLabel>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditPostForm;