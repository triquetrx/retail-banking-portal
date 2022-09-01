import { Alert, Button, Container, Form, Row } from "react-bootstrap";
import TopBarLandingPage from "./TopBarLandingPage";
import Bottom from "./Bottom";
import { useState } from "react";
import superagent from "superagent";
import $ from "jquery";

export default function TrackRequest(props) {
  const [searchText, setSearchText] = useState("");
  const [name, setName] = useState("");
  const [isValid, setValid] = useState(false);
  const [result, setResult] = useState("");
  const [err, setErr] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const search = (e) => {
    e.preventDefault();
    superagent
      .get(`http://localhost:8006/track-request/${searchText}/${name}`)
      .then((res) => {
        console.log(res.body);
        setValid(true);
        setErr(false);
        setResult(res.body);
      })
      .catch((err) => {
        console.log(err.response);
        setErr(true);
        setValid(false);
        setErrorMessage(err.response.text);
      });
  };

  $(document).ready(function () {
    if (isValid) {
      if (result.accountCreated === true) {
        $("#accountCreated").addClass("active-track");
      }
    }
  });

  return (
    <>
      <TopBarLandingPage />
      <Container className="mt-5 pt-5 text-secondary">
        <h2 className="text-secondary mb-3">Track Account opening request</h2>
        {err ? (
          <>
            <Alert variant="warning" key="warning">
              {errorMessage}
            </Alert>
            <br />
          </>
        ) : (
          <></>
        )}
        <Form onSubmit={search}>
          <Row>
            <div className="col-md">
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  required
                />
              </Form.Group>
            </div>
            <div className="col-md">
              <Form.Group className="mb-3" controlId="requestId">
                <Form.Label>Request ID</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder="Enter your request id"
                  required
                />
              </Form.Group>
            </div>
          </Row>
          <Button type="submit" variant="outline-primary">
            Search
          </Button>
        </Form>
        <br />
        {isValid ? (
          <div className="result mb-5">
            <div className="card p-2 mb-5 border-none">
              <h3 className="text-secondary text-center p-2">
                Status for {result.requestId}
              </h3>
              <ul className="d-flex justify-content-center bs4-order-tracking">
                <li className="step active-track">
                  <div>
                    <i className="fa-solid fa-user"></i>
                  </div>
                  Raised
                </li>
                <li className="step active-track">
                  <div>
                    <i className="fa-solid fa-file-invoice"></i>
                  </div>
                  Received
                </li>
                <li className="step" id="accountCreated">
                  <div>
                    <i className="fa-solid fa-user-lock"></i>
                  </div>
                  Created
                </li>
              </ul>
              <div className="text-center text-secondary">
                {result.accountCreated ? (
                  <>
                    <p className="mb-0">
                      Account created, try logging in your username is
                      <b> {result.email.split("@")[0]}</b> & your customer id is
                      <b> {result.customerId}</b>.
                    </p>
                    <Form.Text className="text-muted text-left">
                      *Note: Password will be customerIDFirstName
                    </Form.Text>
                  </>
                ) : (
                  <p>
                    Account will be created soon if it is nore than 24 business
                    days try contacting our support
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <br />
        )}
      </Container>
      <Bottom />
    </>
  );
}
