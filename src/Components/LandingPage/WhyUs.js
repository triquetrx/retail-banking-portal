import { Card, Col, Container, Row } from "react-bootstrap";

export default function WhyUs(props) {
  return (
    <Container className="mb-2">
      <h2 className="text-primary text-center mb-4">Why Us?</h2>
      <Row className="mb-3 text-center text-md-left">
        <Col className="text-secondary d-flex justify-content-center">
          <Card style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src={require("../../images/hassle-free.png")}
            />
            <Card.Body>
              <Card.Title className="text-primary">
                Hassle free transactions
              </Card.Title>
              <Card.Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
                quam accusamus minima id. Aspernatur voluptates iure obcaecati
                perspiciatis accusantium? Maiores?
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col className="text-secondary d-flex justify-content-center">
          <Card style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src={require("../../images/secure-data.png")}
            />
            <Card.Body>
              <Card.Title className="text-primary">Highest Security</Card.Title>
              <Card.Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
                quam accusamus minima id. Aspernatur voluptates iure obcaecati
                perspiciatis accusantium? Maiores?
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col className="text-secondary d-flex justify-content-center">
          <Card style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src={require("../../images/Online transactions.png")}
            />
            <Card.Body>
              <Card.Title className="text-primary">Online Banking</Card.Title>
              <Card.Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
                quam accusamus minima id. Aspernatur voluptates iure obcaecati
                perspiciatis accusantium? Maiores?
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mb-3 text-center text-md-left">
        <Col className="text-secondary d-flex justify-content-center">
          <Card style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src={require("../../images/customer-centric.png")}
            />
            <Card.Body>
              <Card.Title className="text-primary">Customer Centric</Card.Title>
              <Card.Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
                quam accusamus minima id. Aspernatur voluptates iure obcaecati
                perspiciatis accusantium? Maiores?
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col className="text-secondary d-flex justify-content-center">
          <Card style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src={require("../../images/Service24_7.png")}
            />
            <Card.Body>
              <Card.Title className="text-primary">Customer Support</Card.Title>
              <Card.Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
                quam accusamus minima id. Aspernatur voluptates iure obcaecati
                perspiciatis accusantium? Maiores?
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col className="text-secondary d-flex justify-content-center">
          <Card style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src={require("../../images/lowest-rates.png")}
            />
            <Card.Body>
              <Card.Title className="text-primary">
                Low transaction rates
              </Card.Title>
              <Card.Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
                quam accusamus minima id. Aspernatur voluptates iure obcaecati
                perspiciatis accusantium? Maiores?
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
