import { useState } from "react";
import { Alert, Col, Form, Row } from "react-bootstrap";
import superagent from "superagent";
import Cookies from "universal-cookie";

export default function Transfer(props) {
  const [amount, setAmount] = useState("");
  const [fromAccountId, setFromAccountId] = useState("");
  const [toAccountId, setToAccountId] = useState("");
  const [narration, setNarration] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const [isAlert, setAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("");
  const cookies = new Cookies();

  let transfer = async (e) => {
    e.preventDefault();
    superagent
      .post("http://localhost:8004/transfer")
      .set("Authorization", `Bearer ${cookies.get("token")}`)
      .send({
        fromAccountId: fromAccountId,
        toAccountId: toAccountId,
        narration: narration,
        transactionType: transactionType,
        amount: amount,
      })
      .then((res) => {
        console.log(res);
        setAlert(true);
        setVariant("success");
        setMessage(res.body.fromAccount + "_AND_" + res.body.toAccount);
      })
      .catch((err) => {
        console.error(err);
        setAlert(true);
        setVariant("danger");
        setMessage("Error occured");
      });
  };

  return (
    <div className="mb-2">
      <h4 className="text-secondary">Transaction Type: Transfer</h4>
      <br />
      {isAlert ? (
        <Alert variant={variant} key={variant}>
          {message}
        </Alert>
      ) : (
        <></>
      )}
      <Form onSubmit={transfer}>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="fromAccountId">
              <Form.Label className="text-secondary">
                From account id
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter from account Id"
                onChange={(e) => setFromAccountId(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="toAccountId">
              <Form.Label className="text-secondary">To account id</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter to account Id"
                onChange={(e) => setToAccountId(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3" controlId="narration">
          <Form.Label className="text-secondary">Enter Narration</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => setNarration(e.target.value)}
            placeholder="Reason if specified"
          />
        </Form.Group>
        <div className="form-group">
          <label htmlFor="paymentType" className="text-secondary">
            Select Transaction Type
          </label>
          <select
            className="form-control"
            onChange={(e) => setTransactionType(e.target.value)}
            id="paymentType"
            required
          >
            <option value="">Select an option</option>
            <option value="CASH">Cash</option>
            <option value="CHEQUE">Cheque</option>
          </select>
        </div>

        <Form.Group className="mb-3" controlId="amount">
          <Form.Label className="text-secondary">Enter amount</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter the amount to deposit"
            onChange={(e) => setAmount(e.target.value)}
            min="100"
            required
          />
          <Form.Text className="text-muted">
            Service charges will be added
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            className="text-secondary"
            label="Yes, all the details provided are correct"
            required
          />
        </Form.Group>
        <button className="btn btn-block btn-outline-primary" type="submit">
          Submit
        </button>
      </Form>
    </div>
  );
}