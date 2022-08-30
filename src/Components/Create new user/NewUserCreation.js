import { useEffect, useState } from "react";
import { Alert, Col, Form, Row } from "react-bootstrap";
import Cookies from "universal-cookie";
import superagent from "superagent";
import { AESDecrypt } from "cookie-cryptr";

export default function NewUserCreation(props) {
  const cookies = new Cookies();
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
  const [username, setUsername] = useState("");

  let newUser = async (e) => {
    var token = AESDecrypt(cookies.get("token"), "test");
    e.preventDefault();
    superagent
      .post("http://localhost:8002/create-customer")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: name,
        addressLine1: address1,
        addressLine2: address2,
        panNo: panNumber,
        phoneNumber: phoneNumber,
        email: email,
        dateOfBirth: dateOfBirth,
        username: username,
      })
      .then((res) => {
        console.log(res);
        setAlert(true);
        setAlertType("success");
        setAlertMessage(`${res.body.message}_WITH_ID_${res.body.customerId}`);
        document.getElementById("name").value = "";
        document.getElementById("emailId").value = "";
        document.getElementById("phoneNumber").value = "";
        document.getElementById("dateOfBirth").value = "";
        document.getElementById("address1").value = "";
        document.getElementById("address2").value = "";
        document.getElementById("pan").value = "";
        document.getElementById("username").value = "";
        if (cookies.get("request")) {
          cookies.remove("request");
        }
      })
      .catch((err) => {
        console.error(err);
        setAlert(true);
        setAlertType("warning");
        setAlertMessage("Something went south. please try again later");
      });
  };

  useEffect(() => {
    if (cookies.get("request")) {
      document.getElementById("name").value = cookies.get("request").name;
      setName(cookies.get("request").name);
      document.getElementById("emailId").value = cookies.get("request").email;
      setEmail(cookies.get("request").email);
      document.getElementById("phoneNumber").value =
        cookies.get("request").phoneNumber;
      setPhoneNumber(cookies.get("request").phoneNumber);
      document.getElementById("dateOfBirth").value = cookies
        .get("request")
        .dateOfBirth.split("T")[0];
      setDateOfBirth(cookies.get("request").dateOfBirth);
      document.getElementById("address1").value =
        cookies.get("request").address1;
      setAddress1(cookies.get("request").address1);
      document.getElementById("address2").value =
        cookies.get("request").address2;
      setAddress2(cookies.get("request").address2);
      document.getElementById("pan").value = cookies.get("request").panNumber;
      setPanNumber(cookies.get("request").panNumber);
      document.getElementById("username").value = cookies
        .get("request")
        .email.split("@")[0];
      setUsername(cookies.get("request").email.split("@")[0]);
    }
  });

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
      <h3 className="text-secondary">Create new user</h3>
      <hr />
      {isAlert ? (
        <Alert className="my-1" key={alertType} variant={alertType}>
          {alertMessage}
        </Alert>
      ) : (
        <></>
      )}
      <Form onSubmit={newUser}>
        <Form.Group className="mb-3 text-secondary" controlId="name">
          <Form.Label>Customer name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter customer name"
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
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3 text-secondary" controlId="phoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter customer's phone number"
                onChange={(e) => setPhoneNumber(e.target.value)}
                minLength="10"
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="mb-3 text-secondary" controlId="dateOfBirth">
          <Form.Label>Customer's Date of Birth</Form.Label>
          <Form.Control
            type="date"
            placeholder="Enter customer's date of birth"
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
                placeholder="Enter customer's address line 1"
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
                placeholder="Enter customer's address line 2"
                onChange={(e) => setAddress2(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3 text-secondary" controlId="pan">
              <Form.Label>Customer's pan number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter customer's pan number"
                onChange={(e) => setPanNumber(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3 text-secondary" controlId="username">
              <Form.Label>Customer's username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter customer's username for netbanking"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <Form.Text className="text-muted">
                Defualt password is 'customerIdfirstName'
              </Form.Text>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <button className="btn btn-block btn-outline-primary" type="submit">
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
    </>
  );
}
