import { useState } from "react";
import { Col, Image, Modal, NavLink, Row } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Cookies from "universal-cookie";
import $ from "jquery";
import { Link } from "react-router-dom";

function TopBarAdmin() {
  const [isLogout, setLogout] = useState(false);
  const [currentPage, setCurrentPage] = useState("");
  const [isDarkMode, setDarkMode] = useState(false);
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
    } else if (window.location.href.includes("new-account")) {
      $("#new-account").addClass("active text-danger");
    } else if (window.location.href.includes("new-user")) {
      $("#new-user").addClass("active text-danger");
    } else if (window.location.href.includes("signup-requests")) {
      $("#signup-requests").addClass("active text-danger");
    } else if (window.location.href.includes("statement")) {
      $("#statement").addClass("active text-danger");
    }

    setCurrentPage("");
    if (cookies.get("mode") === "dark") {
      setDarkMode(true);
      $(".App").css("background-color", "#040404");
      $(".dropdown-menu").css("background-color", "#040404");
      $(".App .text-secondary")
        .addClass("text-light")
        .removeClass("text-secondary");
      $(".App .bg-light").addClass("bg-dark").removeClass("bg-light");
      $(".App .text-danger").addClass("text-white").removeClass("text-danger");
      $(".App .btn-danger").addClass("btn-warning").removeClass("btn-danger");
      $(".App .bg-danger").addClass("bg-warning").removeClass("bg-danger");
      $(".App .btn-outline-danger")
        .addClass("btn-outline-warning")
        .removeClass("btn-outline-danger");
      $(".App nav")
        .css("background", "rgba( 4, 4, 4, 0.5 )")
        .css("border", "1px solid rgba( 255, 255, 255, 0.18 )");
      $("#basic-nav-dropdown").css("color", "#fff");
      $("#more-options").css("color", "#fff");
      $(".card")
        .css("background", "rgba( 4, 4, 4, 0.2 )")
        .css("border", "1px solid rgba( 255, 255, 255, 0.18 )");
    } else {
      setDarkMode(false);
      $(".App").css("background-color", "#fff");
      $(".App .bg-warning").addClass("bg-danger").removeClass("bg-warning");
      $("#more-options").css("color", "#000");
      $(".dropdown-menu").css("background-color", "white");
      $(".App .btn-warning").addClass("btn-danger").removeClass("btn-warning");
      $(".App .btn-outline-warning")
        .addClass("btn-outline-danger")
        .removeClass("btn-outline-warning");
      $(".App .text-light")
        .addClass("text-secondary")
        .removeClass("text-light");
      $(".App .bg-dark").addClass("bg-light").removeClass("bg-dark");
      $(".App .text-white").addClass("text-danger").removeClass("text-white");
      $("nav")
        .css("background", "rgba(255, 255, 255, 0.7)")
        .css("border", "1px solid rgba(255, 255, 255, 0.5)");
      $("#basic-nav-dropdown").css("color", "#af1b3f");
      $(".card")
        .css("background", "rgba(255, 255, 255, 0.7)")
        .css("border", "1px solid rgba(255, 255, 255, 0.5)");
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
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#admin-options"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fa-solid fa-bars" id="more-options"></i>
          </button>
          <Navbar.Collapse id="admin-options">
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
                      Transaction
                    </NavLink>
                    <NavLink
                      className="text-secondary m-0"
                      href="/new-user"
                      id="new-user"
                    >
                      Create new user
                    </NavLink>
                  </Col>
                  <Col>
                    <NavLink
                      className="text-secondary m-0"
                      href="/new-account"
                      id="new-account"
                    >
                      Create account
                    </NavLink>
                    <NavLink
                      className="text-secondary m-0"
                      href="/signup-requests"
                      id="signup-requests"
                    >
                      Signup requests
                    </NavLink>
                    <div>
                      <Row>
                        <div className="col-4">
                          <Link
                            className="btn text-light"
                            onClick={() => {
                              if (cookies.get("mode") === "dark") {
                                cookies.set("mode", "light");
                                setCurrentPage(window.location.href);
                              } else {
                                setCurrentPage(window.location.href);
                                cookies.set("mode", "dark");
                              }
                            }}
                            to={currentPage}
                          >
                            {isDarkMode ? (
                              <i className="fa-solid fa-sun"></i>
                            ) : (
                              <i className="fa-solid fa-moon"></i>
                            )}
                          </Link>
                        </div>
                        <div className="col-8">
                          <NavLink
                            className="text-secondary m-0"
                            onClick={show}
                            to="/login"
                            id="signup-requests"
                          >
                            Logout
                          </NavLink>
                        </div>
                      </Row>
                    </div>
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

export default TopBarAdmin;
