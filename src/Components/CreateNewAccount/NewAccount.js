import { AESDecrypt } from "cookie-cryptr";
import { Component } from "react";
import { Alert, Card, Form, Modal, Row } from "react-bootstrap";
import superagent from "superagent";
import Cookies from "universal-cookie";

class NewAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cookies: new Cookies(),
      accounts: [],
      isAlert: false,
      alertMessage: "",
      alertType: "",
      accountType: "",
      customerId: "",
      deposit: 0,
      show: false,
    };
  }

  componentDidMount() {
    var token = AESDecrypt(this.state.cookies.get("token"), "test");
    superagent
      .get("http://localhost:8002/get-customers-without-account")
      .set("Authorization", `Bearer ${token}`)
      .then((res) => {
        console.log(res);
        this.setState({
          accounts: res.body,
        });
      })
      .catch((err) => {
        this.setState({
          isAlert: true,
          alertMessage: "Something went south, please try again later",
          alertType: "danger",
        });
        console.error(err);
      });
  }

  render() {
    const handleClose = () => this.setState({ show: false });

    let getData = async (e) => {
      this.setState({ show: true });
      var token = AESDecrypt(this.state.cookies.get("token"), "test");
      superagent
        .get("http://localhost:8002/get-customers-without-account")
        .set("Authorization", `Bearer ${token}`)
        .then((res) => {
          console.log(res);
          this.setState({
            accounts: res.body,
            show: false,
          });
        })
        .catch((err) => {
          this.setState({
            isAlert: true,
            alertMessage: "Something went south, please try again later",
            alertType: "danger",
            show: false,
          });
          console.error(err);
        });
    };

    return (
      <div className="text-secondary">
        <Modal show={this.state.show} onHide={handleClose}>
          <Modal.Body className="d-flex justify-content-center py-5">
            <h2 className="loader-container text-center">
              <span className="bg-danger circle"></span>
              <span className="bg-danger circle"></span>
              <span className="bg-danger circle"></span>
              <span className="bg-danger circle"></span>
            </h2>
          </Modal.Body>
        </Modal>
        {this.state.isAlert ? (
          <Alert key={this.state.alertType} variant={this.state.alertType}>
            {this.state.alertMessage}
          </Alert>
        ) : (
          <></>
        )}
        <h3>Create new account</h3>
        <hr />
        {this.state.accounts.length > 0 ? (
          <>
            {this.state.accounts.map((data, key) => (
              <Card
                className="p-1 mb-3"
                style={{ width: "100%", borderRadius: "1.2rem" }}
                key={key}
              >
                <Card.Body>
                  <Row>
                    <div className="col-2">
                      <Card.Title>{data.name}</Card.Title>
                    </div>
                    <div className="col-8">
                      <Card.Text>
                        <table>
                          <tbody>
                            <tr>
                              <td>Customer ID</td>
                              <td>{data.customerId}</td>
                            </tr>
                            <tr>
                              <td>Username</td>
                              <td>{data.username}</td>
                            </tr>
                            <tr>
                              <td>Email</td>
                              <td>{data.email}</td>
                            </tr>
                            <tr>
                              <td>
                                <label
                                  className="mr-sm-2"
                                  htmlFor="accountType"
                                >
                                  Account type
                                </label>
                              </td>
                              <td>
                                <select
                                  className="form-control mr-sm-2"
                                  id="accountType"
                                  onChange={(e) =>
                                    this.setState({
                                      accountType: e.target.value,
                                    })
                                  }
                                  required
                                >
                                  <option value="">Choose Account Type</option>
                                  <option value="SAVINGS">SAVINGS</option>
                                  <option value="CURRENT">CURRENT</option>
                                  <option value="ZERO BALANCE">
                                    ZERO BALANCE
                                  </option>
                                </select>
                              </td>
                            </tr>
                            <tr>
                              <td>*Deposit</td>
                              <td>
                                <Form.Control
                                  className="mt-2"
                                  type="number"
                                  placeholder="Enter deposit amount"
                                  onChange={(e) =>
                                    this.setState({ deposit: e.target.value })
                                  }
                                />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <Form.Text className="text-muted">
                          *Deposit is required for every account except zero
                          balance
                        </Form.Text>
                      </Card.Text>
                    </div>
                    <div className="col-2">
                      <button
                        className="btn btn-outline-primary"
                        onClick={() => {
                          this.setState({ show: true });
                          var token = AESDecrypt(
                            this.state.cookies.get("token"),
                            "test"
                          );
                          if (this.state.accountType === "") {
                            this.setState({
                              isAlert: true,
                              alertMessage: "Please select an account type",
                              alertType: "danger",
                              show: false,
                            });
                          } else {
                            if (
                              (this.state.accountType.match("SAVINGS") &&
                                this.state.accountType < 400) ||
                              (this.state.accountType.match("CURRENT") &&
                                this.state.accountType < 1000)
                            ) {
                              this.setState({
                                isAlert: true,
                                alertMessage:
                                  "Please deposit appropriate money as per the account type i.e. for savings minimum 400 and for current minimum 1000",
                                alertType: "danger",
                              });
                            } else {
                              superagent
                                .post("http://localhost:8003/create-account")
                                .set("Authorization", `Bearer ${token}`)
                                .send({
                                  customerId: data.customerId,
                                  accountType: this.state.accountType,
                                  deposit: this.state.deposit,
                                })
                                .then((res) => {
                                  this.setState({
                                    isAlert: true,
                                    alertMessage: `${res.body.message}_WITH_ACCOUNT_ID_${res.body.accountId}`,
                                    alertType: "success",
                                    show: false,
                                  });
                                  getData();
                                })
                                .catch((err) => {
                                  this.setState({
                                    isAlert: true,
                                    show: false,
                                    alertMessage: err.message
                                      .split(",")[0]
                                      .split(":")[1],
                                    alertType: "danger",
                                  });
                                  console.error(err);
                                });
                            }
                          }
                        }}
                      >
                        Create
                      </button>
                    </div>
                  </Row>
                </Card.Body>
              </Card>
            ))}
          </>
        ) : (
          <h5 className="text-secondary">Seems like no pending requests</h5>
        )}
      </div>
    );
  }
}

export default NewAccount;
