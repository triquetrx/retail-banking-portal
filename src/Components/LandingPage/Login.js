import { useState } from "react";
import {
  Alert,
  Col,
  Container,
  Form,
  Image,
  Modal,
  Row,
} from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import Cookie from "universal-cookie";
import superagent from "superagent";
import TopBarLandingPage from "./TopBarLandingPage";
import { AESEncrypt } from "cookie-cryptr";
import "../css/home.css";
import Bottom from "./Bottom";

export default function Login(props) {
  const [isError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const cookies = new Cookie();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const login = async (e) => {
    e.preventDefault();
    setShow(true);
    superagent
      .post("http://localhost:8001/authenticate")
      .send({
        username: username,
        password: password,
      })
      .then((res) => {
        cookies.set("token", AESEncrypt(res.body.token, "test"), {
          path: "/",
          expires: new Date(Date.now() + 1 * 60 * 60 * 1000),
          secure: true,
          sameSite: true,
        });
        cookies.set("user", AESEncrypt(res.body.name, "test"), {
          path: "/",
          expires: new Date(Date.now() + 1 * 60 * 60 * 1000),
          secure: true,
          sameSite: true,
        });
        setShow(false);
        setLoggedIn(true);
      })
      .catch((err) => {
        console.error(err);
        setShow(false);
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
          <Container className="mt-5 pt-5 mt-md-4 mb-5 mb-md-4">
            <Row>
              <Col>
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
                <Modal show={show} onHide={handleClose}>
                  <Modal.Body className="d-flex justify-content-center py-5">
                    <h2 className="loader-container text-center">
                      <span className="bg-danger circle"></span>
                      <span className="bg-danger circle"></span>
                      <span className="bg-danger circle"></span>
                      <span className="bg-danger circle"></span>
                    </h2>
                  </Modal.Body>
                </Modal>
                <h2 className="text-secondary mb-5 mb-md-4">Login</h2>
                <Form onSubmit={login}>
                  <Form.Group className="mb-3" controlId="username">
                    <Form.Label className="text-secondary">Username</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your username"
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className="text-secondary">Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                      required
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
          <Bottom />
        </>
      )}
    </>
  );
}
