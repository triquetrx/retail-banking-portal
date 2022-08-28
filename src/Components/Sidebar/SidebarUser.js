import { Container, Image, Modal, NavLink } from "react-bootstrap";
import $ from "jquery";
import { useState } from "react";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";

export default function SidebarUser(props) {
  const [isLogout, setLogout] = useState(false);
  const cookies = new Cookies();

  let randomColor = () => {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  let logoutRemove = () => {
    cookies.remove("token");
    cookies.remove("user");
  };

  let show = () => setLogout(true);
  let handleClose = () => setLogout(false);

  $(document).ready(function () {
    $(".design").css("background-color", randomColor);
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

  return (
    <div className="sidebar-min">
      <Modal
        show={isLogout}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header className="bg-light">
          <Modal.Title className="text-secondary">Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body className=" bg-light">
          You sure, you want to logout?
        </Modal.Body>
        <Modal.Footer className="bg-light">
          <button className="btn btn-outline-danger" onClick={handleClose}>
            No, not yet
          </button>
          <Link className="btn btn-primary" to="/login" onClick={logoutRemove}>
            Yes, Logout
          </Link>
        </Modal.Footer>
      </Modal>
      <div className="d-none d-md-block design"></div>
      <Container fluid className="sidebar text-center p-0">
        <Image
          className="pt-4 mb-5"
          src={require("../../images/banking-logo.png")}
          width="150"
          fluid
        />
        <div className="pt-3 mt-5 text-left mb-5" id="nav-option">
          <NavLink
            className="text-secondary m-0"
            href="/dashboard"
            id="dashboard"
          >
            <i className="fa-brands fa-microsoft pr-1" />
            Dashboard
          </NavLink>
          <NavLink
            className="text-secondary m-0"
            href="/transaction"
            id="transaction"
          >
            <i className="fa-solid fa-money-bill-transfer pr-1" />
            Transfer
          </NavLink>
          <NavLink
            className="text-secondary m-0"
            href="/statement"
            id="statement"
          >
            <i className="fa-solid fa-book-open-reader pr-1" />
            Statement
          </NavLink>
          <NavLink
            className="text-secondary m-0"
            href="/change-password"
            id="change-password"
          >
            <i className="fa-solid fa-key pr-1"></i>
            Change Password
          </NavLink>
          <NavLink
            className="text-secondary m-0"
            href="/about-me"
            id="about-me"
          >
            <i className="fa-solid fa-address-card pr-1" />
            About me
          </NavLink>
        </div>
        <div className="logout">
          <button
            className="btn btn-block btn-outline-danger"
            to="/login"
            onClick={show}
          >
            Logout <i className="fa-solid fa-arrow-right-from-bracket"></i>
          </button>
        </div>
      </Container>
    </div>
  );
}
