import { AESDecrypt } from "cookie-cryptr";
import { useEffect, useState } from "react";
import { Alert, Col, Form, Row } from "react-bootstrap";
import superagent from "superagent";
import Cookies from "universal-cookie";

export default function TransferUser(props) {
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
    var token = AESDecrypt(cookies.get("token"), "test");
    superagent
      .post("http://localhost:8004/transfer")
      .set("Authorization", `Bearer ${token}`)
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

  useEffect(() => {
    var token = AESDecrypt(cookies.get("token"), "test");
    superagent
      .get(`http://localhost:8003/get-my-account`)
      .set("Authorization", `Bearer ${token}`)
      .then((res) => {
        setFromAccountId(res.body.accountId);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="mt-4 mb-2">
      <h3 className="text-secondary">Transfer Money</h3>
      <hr />
      {isAlert ? (
        <Alert variant={variant} key={variant}>
          {message}
        </Alert>
      ) : (
        <></>
      )}
      <Form onSubmit={transfer}>
        <p className="text-secondary">
          The amount will be deducted from your account i.e.{" "}
          <span className="text-primary border-bottom">
            Account Id: {fromAccountId}
          </span>
        </p>
        <Form.Group className="mb-3" controlId="toAccountId">
          <Form.Label className="text-secondary">Account Id</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter to account Id"
            onChange={(e) => setToAccountId(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="narration">
          <Form.Label className="text-secondary">Enter Narration</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => setNarration(e.target.value)}
            placeholder="Reason for the transfer"
          />
        </Form.Group>
        <Row>
          <Col>
            <div className="form-group">
              <label htmlFor="paymentType" className="text-secondary">
                Select Transaction Type
              </label>
              <select
                className="form-control"
                onChange={(e) => {
                  setTransactionType(e.target.value);
                  if (e.target.value === "UPI") {
                    document.getElementById("narration").value +=
                      "_UPI_TRANSFER";
                    setNarration(narration + "_UPI_TRANSFER");
                  } else {
                    if (narration.includes("_UPI_TRANSFER")) {
                      document.getElementById("narration").value = document
                        .getElementById("narration")
                        .value.replace("_UPI_TRANSFER", "");
                      setNarration(narration.replace("_UPI_TRANSFER", ""));
                    }
                  }
                }}
                id="paymentType"
                required
              >
                <option value="">Select an option</option>
                <option value="FROM ACCOUNT">FROM YOUR ACCOUNT</option>
                <option value="UPI">UPI</option>
              </select>
            </div>
          </Col>
          {transactionType === "UPI" ? (
            <>
              <Col>
                <Form.Group className="mb-3" controlId="upiID">
                  <Form.Label>UPI ID</Form.Label>
                  <Form.Control type="text" placeholder="Enter your upi id" />
                </Form.Group>
              </Col>
            </>
          ) : (
            <></>
          )}
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
