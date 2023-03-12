import { useRef, useState } from "react";
import { Button, Card, Collapse, FloatingLabel, Form } from "react-bootstrap";

function CreatePostForm(props) {

  const [open, setOpen] = useState(false);

  const [post, setPost] = useState({
    title: '',
    description: '',
    content: ''
  });

  const formRef = useRef();

  const handleInputChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    setPost({...post, [name]: value});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleCreateButton(post);

    // TODO only do the below if create post is successful
    setPost({
      title: '',
      description: '',
      content: ''
    });
    formRef.current.reset();
    setOpen(false);
  }

  return (
    <Card>
      <Collapse in={open} >
        <Card.Body>
          <Card.Title>Create Post</Card.Title>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <FloatingLabel
              controlId="floatingInput"
              label="Title"
              className="mb-3"
            >
              <Form.Control
                name="title"
                onChange={handleInputChange}
                type="text"
                placeholder="The Post's Title"
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingInput"
              label="Description"
              className="mb-3"
            >
              <Form.Control
                name="description"
                onChange={handleInputChange}
                type="text"
                placeholder="The Post's Description"
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingTextarea2" label="Content">
              <Form.Control
                name="content"
                onChange={handleInputChange}
                as="textarea"
                placeholder="The Post's Content"
                style={{ height: '100px' }}
                className="mb-3"
              />
            </FloatingLabel>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Collapse>
      <Button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="bg-transparent border-0"
      >
        {open ? <span className="text-warning">Hide</span> : <span className="text-primary">Create new Post</span>}
      </Button>
    </Card>
  );
}

export default CreatePostForm;