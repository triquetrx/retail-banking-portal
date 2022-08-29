import { useState } from "react";
import { Alert } from "react-bootstrap";
import AccountStatement from "./AccountStatement";
import TransactionStatement from "./TransactionStatement";

export default function StatementAdmin(props) {
  const [result, setResult] = useState("");
  const [isNext, setNext] = useState(false);
  const [statementType, setStatementType] = useState("");
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  let nextStatement = () => {
    if (statementType !== "") {
      setResult(statementType);
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
      <h3 className="text-secondary mt-4">Statement</h3>
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
          {result.match("TransactionHistory") ? (
            <TransactionStatement />
          ) : result.match("AccountStatement") ? (
            <AccountStatement />
          ) : (
            <></>
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
              Select statement search type
            </label>
            <select
              className="form-control"
              onChange={(e) => setStatementType(e.target.value)}
              id="statementType"
            >
              <option value="">Select an option</option>
              <option value="AccountStatement">Account Statement</option>
              <option value="TransactionHistory">
                Account Transaction History
              </option>
            </select>
          </div>
          <div className="d-flex justify-content-end">
            <button className="btn btn-outline-primary" onClick={nextStatement}>
              Next
            </button>
          </div>
        </>
      )}
    </>
  );
}
