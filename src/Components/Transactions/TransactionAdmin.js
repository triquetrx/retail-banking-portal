import { useState } from "react";
import { Alert, Container } from "react-bootstrap";
import Deposit from "./Deposit";
import Withdraw from "./Withdraw";
import Transfer from "./Transfer";

export default function TransactionAdmin(props) {
  const [result, setResult] = useState("");
  const [isNext, setNext] = useState(false);
  const [transactionType, setTransactionType] = useState("");
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  let nextTransaction = () => {
    if (transactionType !== "") {
      setResult(transactionType);
      setNext(true);
    } else {
      setError(true);
      setMessage("Please select transaction type");
    }
  };

  let back = () => {
    setResult("");
    setNext(false);
  };

  return (
    <>
      <h3 className="mt-4 text-secondary">Transaction</h3>
      <hr />
      {error ? (
        <Alert key="danger" variant="danger">
          {message}
        </Alert>
      ) : (
        <></>
      )}
      {isNext ? (
        <>
          {result.match("Deposit") ? (
            <Deposit />
          ) : result.match("Withdraw") ? (
            <Withdraw />
          ) : (
            <Transfer />
          )}
          <div className="d-flex justify-content-end mb-3">
            <button className="btn btn-block btn-danger" onClick={back}>
              Back
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="form-group mt-3">
            <label htmlFor="transactionType" className="text-secondary">
              Select Transaction Type
            </label>
            <select
              className="form-control"
              onChange={(e) => setTransactionType(e.target.value)}
              id="transactionType"
            >
              <option value="">Select an option</option>
              <option value="Deposit">Deposit</option>
              <option value="Withdraw">Withdraw</option>
              <option value="Transfer">Transfer</option>
            </select>
          </div>
          <div className="d-flex justify-content-end">
            <button
              className="btn btn-outline-primary"
              onClick={nextTransaction}
            >
              Next
            </button>
          </div>
        </>
      )}
    </>
  );
}
