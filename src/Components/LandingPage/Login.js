import { useState } from "react";
import { Alert, Col, Container, Form, Image, Row } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import Cookie from "universal-cookie";
import superagent from "superagent";
import TopBarLandingPage from "./TopBarLandingPage";

export default function Login(props) {
  const [isError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const cookies = new Cookie();

  const login = async (e) => {
    e.preventDefault();
    superagent
      .post("http://localhost:8001/authenticate")
      .send({
        username: username,
        password: password,
      })
      .then((res) => {
        cookies.set("token", res.body.token, {
          path: "/",
          expires: new Date(Date.now() + 1 * 60 * 60 * 1000),
          secure: true,
          sameSite: true,
        });
        cookies.set("user", res.body.name, {
          path: "/",
          expires: new Date(Date.now() + 1 * 60 * 60 * 1000),
          secure: true,
          sameSite: true,
        });
        setLoggedIn(true);
      })
      .catch((err) => {
        console.error(err);
        setError(true);
        setErrorMessage("Invalid Credentials");
      });
  };

  return (
    <>
      {cookies.get("token") ? (
        <Navigate to="/dashboard" />
      ) : (
        <>
          <TopBarLandingPage />
          <Container className="mt-5 mt-md-4 mb-5 mb-md-0">
            <Row>
              <Col className="border-bottom border-md-none">
                <Image src={require("../../images/login-page.png")} fluid />
              </Col>
              <div className="col-md px-3 px-md-2 pt-1 pt-md-5 mt-1 mt-md-5">
                {isError && !isLoggedIn ? (
                  <Alert key="danger" variant="danger">
                    {errorMessage}
                  </Alert>
                ) : (
                  <></>
                )}
                <h2 className="text-secondary mb-4">Login</h2>
                <Form onSubmit={login}>
                  <Form.Group className="mb-3" controlId="username">
                    <Form.Label className="text-secondary">Username</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your username"
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className="text-secondary">Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <Form.Text className="text-muted">
                      Note: Your session will be only valid for 2hrs
                    </Form.Text>
                    <div className="mt-3 text-right">
                      <Link to="/signup">Create new account</Link>
                    </div>
                  </Form.Group>
                  <Row>
                    <Col>
                      <button
                        className="btn btn-block btn-outline-primary"
                        type="submit"
                      >
                        Sign in
                      </button>
                    </Col>
                    <Col>
                      <div className="btn btn-block btn-danger">Clear</div>
                    </Col>
                  </Row>
                </Form>
              </div>
            </Row>
          </Container>
          <div
            className="text-center bg-danger p-3 mt-4"
            style={{ color: "#fff" }}
          >
            © Designed by
            <a
              className="fw-bold pl-1"
              style={{ color: "#fff" }}
              href="https://triquetrx.netlify.app"
            >
              triquetrx
            </a>
          </div>
        </>
      )}
    </>
  );
}
