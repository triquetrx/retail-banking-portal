import { Component } from "react";
import { Col, Form, Row, Table } from "react-bootstrap";
import Cookies from "universal-cookie";
import superagent from "superagent";
import { AESDecrypt } from "cookie-cryptr";

class StatementUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cookies: new Cookies(),
      ready: false,
      statement: [],
      accountId: "",
      dateFrom: "",
      dateTo: "",
      start: 0,
      end: 6,
    };
  }

  componentDidMount() {
    var token = AESDecrypt(this.state.cookies.get("token"), "test");
    superagent
      .get(`http://localhost:8003/get-my-account`)
      .set("Authorization", `Bearer ${token}`)
      .then((res) => {
        this.setState({
          accountId: res.body.accountId,
        });
      })
      .catch(console.error);
  }

  render() {
    let more = () => {
      this.setState({
        start: this.state.start + 6,
        end: this.state.end + 6,
      });
    };

    let less = () => {
      this.setState({
        start: this.state.start - 6,
        end: this.state.end - 6,
      });
    };

    let search = async (e) => {
      e.preventDefault();
      var token = AESDecrypt(this.state.cookies.get("token"), "test");
      if (this.state.dateFrom === "") {
        superagent
          .get(
            `http://localhost:8003/getAccountStatement/${this.state.accountId}`
          )
          .set("Authorization", `Bearer ${token}`)
          .then((res) => {
            console.log(res);
            this.setState({ statement: res.body, ready: true });
          })
          .catch(console.error);
      } else {
        superagent
          .get(
            `http://localhost:8003/getAccountStatement/${this.state.accountId}/${this.state.dateFrom}/${this.state.dateTo}`
          )
          .set("Authorization", `Bearer ${token}`)
          .then((res) => {
            console.log(res);
            this.setState({ statement: res.body, ready: true });
          })
          .catch(console.error);
      }
    };
    return (
      <>
        <h3 className="text-secondary mt-4">Statements</h3>
        <hr />
        <Form onSubmit={search}>
          <h6 className="text-secondary mb-3">
            The statement will be for account with id:
            <span className="text-primary ml-1">{this.state.accountId}</span>
          </h6>
          <Row>
            <Col>
              <Form.Group className="mb-3 text-secondary" controlId="dateFrom">
                <Form.Label>Date from</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="dateFrom"
                  onChange={(e) => this.setState({ dateFrom: e.target.value })}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3 text-secondary" controlId="dateTo">
                <Form.Label>Date to</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="dateTo"
                  onChange={(e) => this.setState({ dateTo: e.target.value })}
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
        {this.state.ready ? (
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
                {this.state.statement
                  .slice(this.state.start, this.state.end)
                  .map((item, key) => (
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
            {this.state.statement.length > this.state.end ? (
              <div className="d-flex justify-content-end my-4 text-end">
                {this.state.start > 5 ? (
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
      </>
    );
  }
}

export default StatementUser;
