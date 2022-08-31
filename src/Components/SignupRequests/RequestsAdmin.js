import { Component } from "react";
import Cookie from "universal-cookie";
import superagent from "superagent";
import { Button, Card, Col, Container, Modal, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AESDecrypt } from "cookie-cryptr";

class RequestsAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cookies: new Cookie(),
      array: [],
      isReady: false,
    };
  }

  componentDidMount() {
    var token = AESDecrypt(this.state.cookies.get("token"), "test");
    superagent
      .get("http://localhost:8006/view-all-requests")
      .set("Authorization", `Bearer ${token}`)
      .then((res) => {
        console.log(res);
        this.setState({
          array: res.body,
          isReady: true,
        });
      })
      .catch(console.error);
  }

  render() {
    return (
      <>
        <h3 className="text-secondary">Sign up requests</h3>
        <hr />
        {this.state.isReady ? (
          <>
            {this.state.array.length === 0 ? (
              <h5 className="text-secondary">
                Seems like there are no request at this time
              </h5>
            ) : (
              <Container>
                <Row>
                  {this.state.array.map((item, key) => (
                    <Col key={key}>
                      <Card
                        className="text-secondary"
                        style={{ width: "18rem" }}
                      >
                        <Card.Body>
                          <Card.Title>{item.name}</Card.Title>
                          <Card.Text>
                            Request Id: {item.requestId}
                            <br />
                            Pan number: {item.panNumber}
                          </Card.Text>
                          <Link
                            to="/new-user"
                            className="btn btn-outline-primary"
                            onClick={this.state.cookies.set("request", item, {
                              path: "/",
                              expires: new Date(Date.now() + 30 * 60 * 1000),
                              secure: true,
                              sameSite: true,
                            })}
                          >
                            Create User
                          </Link>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Container>
            )}
          </>
        ) : (
          <></>
        )}
      </>
    );
  }
}

export default RequestsAdmin;
