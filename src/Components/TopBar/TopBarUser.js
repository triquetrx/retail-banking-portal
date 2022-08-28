import { useState } from "react";
import { Col, Image, Modal, NavLink, Row } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Cookies from "universal-cookie";
import $ from "jquery";
import { Link } from "react-router-dom";

function TopBarUser() {
  const [isLogout, setLogout] = useState(false);
  const cookies = new Cookies();

  let logoutRemove = () => {
    cookies.remove("token");
    cookies.remove("user");
  };

  $(document).ready(function () {
    if (window.location.href.includes("dashboard")) {
      $("#dashboard").addClass("active text-danger");
    } else if (window.location.href.includes("transaction")) {
      $("#transaction").addClass("active text-danger");
    } else if (window.location.href.includes("about-me")) {
      $("#about-me").addClass("active text-danger");
    } else if (window.location.href.includes("statement")) {
      $("#statement").addClass("active text-danger");
    } else if (window.location.href.includes("change-password")) {
      $("#change-password").addClass("active text-danger");
    }
  });

  let show = () => setLogout(true);
  let handleClose = () => setLogout(false);

  return (
    <>
      <Modal
        show={isLogout}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header className="bg-light">
          <Modal.Title className="text-secondary">Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-light">
          You sure, you want to logout?
        </Modal.Body>
        <Modal.Footer className="bg-light">
          <button className="btn btn-outline-danger" onClick={handleClose}>
            No, not yet
          </button>
          <Link to="/login" className="btn btn-primary" onClick={logoutRemove}>
            Yes, Logout
          </Link>
        </Modal.Footer>
      </Modal>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand>
            <Image
              src={require("../../images/banking-logo.png")}
              fluid
              width="100"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <div className="text-left pl-3" id="nav-option">
                <Row>
                  <Col>
                    <NavLink
                      className="text-secondary m-0"
                      href="/dashboard"
                      id="dashboard"
                    >
                      Dashboard
                    </NavLink>
                    <NavLink
                      className="text-secondary m-0"
                      href="/transaction"
                      id="transaction"
                    >
                      Transfer
                    </NavLink>
                    <NavLink
                      className="text-secondary m-0"
                      href="/statement"
                      id="statement"
                    >
                      Statement
                    </NavLink>
                  </Col>
                  <Col>
                    <NavLink
                      className="text-secondary m-0"
                      href="/change-password"
                      id="change-password"
                    >
                      Change Password
                    </NavLink>
                    <NavLink
                      className="text-secondary m-0"
                      href="/about-me"
                      id="about-me"
                    >
                      About me
                    </NavLink>
                    <NavLink
                      className="text-secondary m-0"
                      onClick={show}
                      to="/login"
                      id="signup-requests"
                    >
                      Logout
                    </NavLink>
                  </Col>
                </Row>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default TopBarUser;