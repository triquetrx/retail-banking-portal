import { useEffect, useState } from "react";
import { Col, Container, Row, Table, Card } from "react-bootstrap";
import superagent from "superagent";

export default function InterestRates(props) {
  const [savings, setSavings] = useState("");
  const [current, setCurrent] = useState("");
  const [zeroBalance, setZeroBalance] = useState("");

  useEffect(() => {
    superagent
      .get("http://localhost:8005/get-service-charges/SAVINGS")
      .then((res) => {
        setSavings(res.body);
      })
      .catch(console.error);
    superagent
      .get("http://localhost:8005/get-service-charges/CURRENT")
      .then((res) => {
        setCurrent(res.body);
      })
      .catch(console.error);
    superagent
      .get("http://localhost:8005/get-service-charges/ZERO BALANCE")
      .then((res) => {
        setZeroBalance(res.body);
      })
      .catch(console.error);
  }, []);

  return (
    <Container className="mb-2 mt-5">
      <h2 className="text-primary text-center mb-4">Our Transaction rates</h2>

      <Row className="text-secondary">
        <Col className="text-secondary d-flex justify-content-center mt-4 mt-md-1">
          <Card style={{ width: "20rem", height: "18rem" }}>
            <Card.Body>
              <Card.Title className="text-primary text-center text-md-left">
                Savings Account
              </Card.Title>
              <Card.Text className="text-center text-md-left">
                A savings account is an interest-bearing deposit account held at
                a bank or other financial institution. It is ideal for an
                individual, who is just looking for a place to save. Our
                interest rate: {savings * 100}%
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col className="text-secondary d-flex justify-content-center mt-4 mt-md-1">
          <Card style={{ width: "20rem", height: "18rem" }}>
            <Card.Body>
              <Card.Title className="text-primary text-center text-md-left">
                Current Account
              </Card.Title>
              <Card.Text className="text-center text-md-left">
                A current account or financial account is a deposit account
                maintained by individuals who carry out significantly higher
                number of transactions. Our interest rate: {current * 100}%
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col className="text-secondary d-flex justify-content-center mt-4 mt-md-1">
          <Card style={{ width: "20rem", height: "18rem" }}>
            <Card.Body>
              <Card.Title className="text-primary text-center text-md-left">
                Zero Balance Account
              </Card.Title>
              <Card.Text className="text-center text-md-left">
                A savings account is an interest-bearing deposit account held at
                a bank. Same as savings account but without any minimum amount
                restrictions Our interest rate: {zeroBalance * 100}%
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
