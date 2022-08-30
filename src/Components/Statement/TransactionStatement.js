import { AESDecrypt } from "cookie-cryptr";
import { useState } from "react";
import { Col, Form, Row, Table } from "react-bootstrap";
import superagent from "superagent";
import Cookies from "universal-cookie";

export default function TransactionHistory(props) {
  const [searchText, setSearchText] = useState("");
  const [isResultReady, setResultReady] = useState(false);
  const [result, setResult] = useState([]);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(6);
  const cookies = new Cookies();

  let search = async (e) => {
    var token = AESDecrypt(cookies.get("token"), "test");
    e.preventDefault();
    superagent
      .get(`http://localhost:8004/get-trasactions/${searchText}`)
      .set("Authorization", `Bearer ${token}`)
      .then((res) => {
        console.log(res);
        setResultReady(true);
        setResult(res.body);
      })
      .catch(console.error);
  };

  let more = () => {
    setStart(start + 6);
    setEnd(end + 6);
  };

  let less = () => {
    setStart(start - 6);
    setEnd(end - 6);
  };

  return (
    <div className="mb-3">
      <h4 className="text-secondary">Transaction History for an account</h4>
      <Form className="mt-3" onSubmit={search}>
        <Form.Group className="mb-3 text-secondary" controlId="accountId">
          <Form.Label>Account Id</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Account Id"
            onChange={(e) => setSearchText(e.target.value)}
          />
        </Form.Group>
        <button
          type="submit"
          className="btn btn-outline-primary btn-block mt-3"
        >
          Search
        </button>
      </Form>
      {isResultReady ? (
        <div className="result mt-4">
          <Table striped>
            <thead>
              <tr className="h6">
                <td>Transaction Id</td>
                <td>To Account ID</td>
                <td>Transaction Date</td>
                <td>Narration</td>
                <td>Payment method</td>
                <td>Amount</td>
              </tr>
            </thead>
            <tbody>
              {result.slice(start, end).map((item, key) => (
                <tr key={key}>
                  <td>{item.transactionId}</td>
                  <td>{item.toAccount}</td>
                  <td>{item.transactionDate.split("T")[0]}</td>
                  <td>{item.toAccount}</td>
                  <td>{item.paymentMethod}</td>
                  <td
                    className={
                      item.transactionType === "DEPOSIT"
                        ? "text-success"
                        : "text-danger"
                    }
                  >
                    {item.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {result.length > end ? (
            <div className="d-flex justify-content-end my-4 text-end">
              {start > 5 ? (
                <button
                  className="text-danger mx-1"
                  style={{ border: "none", backgroundColor: "transparent" }}
                  onClick={less}
                >
                  Less
                </button>
              ) : (
                <></>
              )}
              <button
                className="text-primary mx-1"
                style={{ border: "none", backgroundColor: "transparent" }}
                onClick={more}
              >
                More
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
