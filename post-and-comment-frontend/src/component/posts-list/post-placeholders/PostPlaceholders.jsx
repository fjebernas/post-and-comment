import { Card, Placeholder } from "react-bootstrap";
import { POSTS_PER_PAGE } from "../../../config";

function PostPlaceholders() {

  let postsPlaceholders = [];

  for (let i = 0; i < POSTS_PER_PAGE; i++) {
    postsPlaceholders.push(
      <Card className="my-4">
        <Card.Header>
          <Placeholder as={Card.Title} animation="glow">
            <Placeholder xs={6} />
          </Placeholder>
          <Placeholder as={Card.Subtitle} animation="glow">
            <Placeholder xs={3} />
          </Placeholder>
        </Card.Header>
        <Card.Body>
          <Placeholder as={Card.Text} animation="glow">
            <Placeholder xs={9} />
          </Placeholder>
          <Placeholder as={Card.Text} animation="glow">
            <Placeholder xs={7} bg="secondary" /> <Placeholder xs={4} bg="secondary" /> <Placeholder xs={4} bg="secondary" />{' '}
            <Placeholder xs={6} bg="secondary" /> <Placeholder xs={8} bg="secondary" />
          </Placeholder>
        </Card.Body>
        <Placeholder as={Card.Footer} animation="glow">
          <Placeholder xs={12} />
        </Placeholder>
        <Placeholder as={Card.Footer} animation="glow">
          <Placeholder xs={12} size="lg" bg="secondary" />
        </Placeholder>
      </Card>
    );
  }

  return (
    <>{postsPlaceholders}</>
  );
}

export default PostPlaceholders;