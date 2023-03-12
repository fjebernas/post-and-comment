import { Dropdown } from "react-bootstrap";

function PostOptionsDropdown(props) {
  return (
    <Dropdown className="d-inline position-absolute top-0 end-0">
      <Dropdown.Toggle
        id="dropdown-autoclose-true"
        className="border-0 bg-transparent text-dark"
      >
        ...
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => props.handleEditButton(props.postId)}>
          <span className="text-black">Edit</span>
        </Dropdown.Item>
        <Dropdown.Item onClick={() => props.handleDeleteButton(props.postId)}>
          <span className="text-danger">Delete</span>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default PostOptionsDropdown;