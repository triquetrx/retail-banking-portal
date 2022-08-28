import { useState } from "react";
import { Col, Form, Row, Table } from "react-bootstrap";
import superagent from "superagent";
import Cookies from "universal-cookie";

export default function AccountStatement(props) {
  const [searchText, setSearchText] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [isResultReady, setResultReady] = useState(false);
  const [result, setResult] = useState([]);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(6);
  const cookies = new Cookies();

  let search = async (e) => {
    e.preventDefault();
    superagent
      .get(
        `http://localhost:8003/getAccountStatement/${searchText}/${dateFrom}/${dateTo}`
      )
      .set("Authorization", `Bearer ${cookies.get("token")}`)
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
      <h4 className="text-secondary">Account Statement</h4>
      <Form className="mt-3" onSubmit={search}>
        <Form.Group className="mb-3 text-secondary" controlId="accountId">
          <Form.Label>Account Id</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Account Id"
            onChange={(e) => setSearchText(e.target.value)}
          />
        </Form.Group>
        <Row>
          <Col>
            <Form.Group className="mb-3 text-secondary" controlId="dateFrom">
              <Form.Label>Date from</Form.Label>
              <Form.Control
                type="date"
                placeholder="dateFrom"
                onChange={(e) => setDateFrom(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3 text-secondary" controlId="dateTo">
              <Form.Label>Date to</Form.Label>
              <Form.Control
                type="date"
                placeholder="dateTo"
                onChange={(e) => setDateTo(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
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
                <td>Statement ID</td>
                <td>Statement Date</td>
                <td>Reference Number</td>
                <td>Deposit</td>
                <td>Withdrawal</td>
                <td>Closing Balance</td>
              </tr>
            </thead>
            <tbody>
              {result.slice(start, end).map((item, key) => (
                <tr key={key}>
                  <td>{item.statementId}</td>
                  <td>{item.statementDate.split("T")[0]}</td>
                  <td>{item.refNo}</td>
                  <td className={item.deposit > 0 ? "text-success" : ""}>
                    {item.deposit}
                  </td>
                  <td className={item.withdrawal > 0 ? "text-danger" : ""}>
                    {item.withdrawal}
                  </td>
                  <td>{item.closingBalance}</td>
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
