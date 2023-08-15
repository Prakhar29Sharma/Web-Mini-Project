import { Box } from "@mui/material";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";

function GroupExample() {
  return (
    <CardGroup>
      <Card>
        <Card.Body>
          <Card.Title>Students</Card.Title>
          <Card.Text>Stats (0+)</Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Last updated 3 mins ago</small>
        </Card.Footer>
      </Card>
      <Card>
        <Card.Body>
          <Card.Title>Contributors</Card.Title>
          <Card.Text>Stats (0+)</Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Last updated 3 mins ago</small>
        </Card.Footer>
      </Card>
      <Card>
        <Card.Body>
          <Card.Title>Evaluators</Card.Title>
          <Card.Text>Stats(0+)</Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Last updated 3 mins ago</small>
        </Card.Footer>
      </Card>
    </CardGroup>
  );
}

export default GroupExample;
