import { AESDecrypt } from "cookie-cryptr";
import { useState } from "react";
import { Alert, Col, Form, Row } from "react-bootstrap";
import superagent from "superagent";
import Cookies from "universal-cookie";

export default function Deposit(props) {
  const [amount, setAmount] = useState("");
  const [accountId, setAccountId] = useState("");
  const [narration, setNarration] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const [isAlert, setAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("");
  const cookies = new Cookies();

  let deposit = async (e) => {
    e.preventDefault();
    var token = AESDecrypt(cookies.get("token"), "test");
    superagent
      .post("http://localhost:8004/deposit")
      .set("Authorization", `Bearer ${token}`)
      .send({
        accountId: accountId,
        narration: narration,
        transactionType: transactionType,
        amount: amount,
      })
      .then((res) => {
        console.log(res);
        setAlert(true);
        setVariant("success");
        setMessage(res.body.message + "_BALANCE_" + res.body.balance);
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
      <h4 className="text-secondary">Transaction Type: Deposit</h4>
      <br />
      {isAlert ? (
        <Alert variant={variant} key={variant}>
          {message}
        </Alert>
      ) : (
        <></>
      )}
      <Form onSubmit={deposit}>
        <Form.Group className="mb-3" controlId="accountId">
          <Form.Label className="text-secondary">Enter account id</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter customer account Id"
            onChange={(e) => setAccountId(e.target.value)}
            required
          />
        </Form.Group>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="narration">
              <Form.Label className="text-secondary">
                Enter Narration
              </Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setNarration(e.target.value)}
                placeholder="Reason if specified"
              />
            </Form.Group>
          </Col>
          <Col>
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
                <option value="Deposit">Cash</option>
                <option value="Withdraw">Cheque</option>
              </select>
            </div>
          </Col>
        </Row>

        <Form.Group className="mb-3" controlId="amount">
          <Form.Label className="text-secondary">Enter amount</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter the amount to deposit"
            onChange={(e) => setAmount(e.target.value)}
            min="100"
            required
          />
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
