import { useState } from "react";
import { Alert, Col, Form, Row, Container, Modal } from "react-bootstrap";
import superagent from "superagent";
import Bottom from "./Bottom";
import TopBarLandingPage from "./TopBarLandingPage";

export default function Signup(props) {
  const [isAlert, setAlert] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [panNumber, setPanNumber] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  let request = async (e) => {
    e.preventDefault();
    setShow(true);
    superagent
      .post("http://localhost:8006/signup-request")
      .send({
        name: name,
        email: email,
        phoneNumber: phoneNumber,
        dateOfBirth: dateOfBirth,
        address1: address1,
        address2: address2,
        panNumber: panNumber,
      })
      .then((res) => {
        console.log(res);
        setAlert(true);
        setAlertType("success");
        setAlertMessage(`${res.body.message}_WITH_ID_${res.body.requestId}`);
        setShow(false);
        document.getElementById("name").value = "";
        document.getElementById("emailId").value = "";
        document.getElementById("phoneNumber").value = "";
        document.getElementById("dateOfBirth").value = "";
        document.getElementById("address1").value = "";
        document.getElementById("address2").value = "";
        document.getElementById("pan").value = "";
      })
      .catch((err) => {
        console.error(err);
        setAlert(true);
        setAlertType("warning");
        setAlertMessage("Something went south. Please try again later");
        setShow(false);
      });
  };

  let clear = (e) => {
    document.getElementById("name").value = "";
    document.getElementById("emailId").value = "";
    document.getElementById("phoneNumber").value = "";
    document.getElementById("dateOfBirth").value = "";
    document.getElementById("address1").value = "";
    document.getElementById("address2").value = "";
    document.getElementById("pan").value = "";
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body className="d-flex justify-content-center py-5">
          <h2 className="loader-container text-center">
            <span className="bg-danger circle"></span>
            <span className="bg-danger circle"></span>
            <span className="bg-danger circle"></span>
            <span className="bg-danger circle"></span>
          </h2>
        </Modal.Body>
      </Modal>
      <TopBarLandingPage />
      <Container className="my-5 py-5">
        <h3 className="text-secondary">New Account Request Form</h3>
        <hr />
        {isAlert ? (
          <Alert className="my-1" key={alertType} variant={alertType}>
            {alertMessage}
          </Alert>
        ) : (
          <></>
        )}
        <Form onSubmit={request}>
          <Form.Group className="mb-3 text-secondary" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Row>
            <Col>
              <Form.Group className="mb-3 text-secondary" controlId="emailId">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email id"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group
                className="mb-3 text-secondary"
                controlId="phoneNumber"
              >
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter your phone number"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  minLength="10"
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3 text-secondary" controlId="dateOfBirth">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              placeholder="Your date of birth"
              onChange={(e) => setDateOfBirth(e.target.value)}
              required
            />
          </Form.Group>
          <Row>
            <Col>
              <Form.Group className="mb-3 text-secondary" controlId="address1">
                <Form.Label>Address Line 1</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your address line 1"
                  onChange={(e) => setAddress1(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3 text-secondary" controlId="address2">
                <Form.Label>Address Line 2</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your address line 2"
                  onChange={(e) => setAddress2(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3 text-secondary" controlId="pan">
            <Form.Label>Pan number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your pan number"
              onChange={(e) => setPanNumber(e.target.value)}
              required
            />
            <Form.Text className="text-muted">
              *Note: Only Zero Balance account can be created via this process
            </Form.Text>
          </Form.Group>
          <Row className="mt-4">
            <Col>
              <button
                className="btn btn-block btn-outline-primary"
                type="submit"
              >
                Submit
              </button>
            </Col>
            <Col>
              <button
                className="btn btn-block btn-danger"
                type="reset"
                onClick={clear}
              >
                Clear
              </button>
            </Col>
          </Row>
        </Form>
      </Container>
      <Bottom />
    </>
  );
}
