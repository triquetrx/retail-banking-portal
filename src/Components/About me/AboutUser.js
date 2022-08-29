import { useEffect, useState } from "react";
import { Table, Modal, Button, Form, Alert } from "react-bootstrap";
import superagent from "superagent";
import Cookie from "universal-cookie";

export default function AboutUser(props) {
  const cookies = new Cookie();
  const [customerId, setCustomerId] = useState("");
  const [accountType, setAccountType] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [balance, setBalance] = useState("");
  const [isMore, setMore] = useState(false);
  const [show, setShow] = useState(false);
  const [password, setPassword] = useState("");
  const [isAlert, setAlert] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    superagent
      .get("http://localhost:8001/validate")
      .set("Authorization", `Bearer ${cookies.get("token")}`)
      .then((res) => {
        console.log(res);
        setCustomerId(res.body.customerId);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleClose = () => setShow(false);

  let verify = async (e) => {
    e.preventDefault();
    superagent
      .post("http://localhost:8001/check-password")
      .set("Authorization", `Bearer ${cookies.get("token")}`)
      .send({
        confirmPassword: password,
      })
      .then((res) => {
        console.log(res);
        setMore(res.body);
        superagent
          .get(`http://localhost:8003/get-my-account`)
          .set("Authorization", `Bearer ${cookies.get("token")}`)
          .then((res) => {
            console.log(res);
            setAccountType(res.body.accountType);
            setAccountNumber(res.body.accountId);
            setBalance(res.body.balance);
          })
          .catch(console.error);
        setShow(false);
      })
      .catch((err) => {
        setAlert(true);
        setAlertType("danger");
        setAlertMessage("Incorrect Password");
      });
  };

  return (
    <>
      <Modal className="text-secondary" show={show} onHide={handleClose}>
        {isAlert ? <Alert variant={alertType}>{alertMessage}</Alert> : <></>}
        <Modal.Header className="bg-light">
          <Modal.Title>Confirm your identity</Modal.Title>
        </Modal.Header>
        <Form onSubmit={verify}>
          <Modal.Body className="bg-light">
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Enter you account password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer className="bg-light">
            <Button variant="danger" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="outline-primary" type="submit">
              Verify
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <h3 className="text-secondary mt-4">About me</h3>
      <hr />
      <div className="text-secondary">
        <Table striped>
          <tbody>
            <tr>
              <td className="text-secondary h6">Customer Name</td>
              <td className="text-secondary h6">{cookies.get("user")}</td>
            </tr>
            <tr>
              <td className="text-secondary h6">Customer ID</td>
              <td className="text-secondary h6">{customerId}</td>
            </tr>
            {isMore ? (
              <>
                <tr>
                  <td className="text-secondary h6">Account Number</td>
                  <td className="text-secondary h6">{accountNumber}</td>
                </tr>
                <tr>
                  <td className="text-secondary h6">Account Type</td>
                  <td className="text-secondary h6">{accountType}</td>
                </tr>
                <tr>
                  <td className="text-secondary h6">Balance</td>
                  <td className="text-success h6">₹ {balance}</td>
                </tr>
              </>
            ) : (
              <></>
            )}
          </tbody>
        </Table>
        <div className="d-flex justify-content-end my-4 text-end">
          <button
            className="btn btn-outline-primary"
            onClick={() => {
              if (isMore) {
                setShow(false);
                setMore(false);
              } else {
                setShow(true);
              }
            }}
          >
            {isMore ? "Show Less" : "Know more about your account"}
          </button>
        </div>
      </div>
    </>
  );
}
