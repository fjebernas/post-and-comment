import { Container, Navbar } from "react-bootstrap";
import logo from '../../logo.svg';

function Header() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">
          <img
            alt=""
            src={logo}
            width="50"
            height="50"
            className="d-inline-block"
          />
          <span className="text-light">Post</span>
          <span className="text-secondary">&</span>
          <span className="text-light">Comment</span>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default Header;