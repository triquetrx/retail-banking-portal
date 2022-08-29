import { Container, Image, Modal, NavLink } from "react-bootstrap";
import $ from "jquery";
import { useState } from "react";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";

export default function SidebarAdmin(props) {
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

  let lightRandomColor = () => {
    var letters = "BCDEF".split("");
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * letters.length)];
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

    if (cookies.get("mode") === "dark") {
      $(".App").css("background-color", "#040404");
      $(".dropdown-menu").css("background-color", "#040404");
      $(".App .text-secondary")
        .addClass("text-light")
        .removeClass("text-secondary");
      $(".App .bg-light").addClass("bg-dark").removeClass("bg-light");
      $(".App .text-danger").addClass("text-white").removeClass("text-danger");
      $(".news #card-body").addClass("text-white").remove("text-secondary");
      $(".design").css("background-color", lightRandomColor);
      $(".sidebar")
        .css("background", "rgba( 4, 4, 4, 0.8 )")
        .css("box-shadow", " 0 8px 32px 0 rgba( 31, 38, 135, 0.4 )")
        .css("border", "1px solid rgba( 255, 255, 255, 0.18 )");
    } else {
      $(".App").css("background-color", "#fff");
      $(".design").css("background-color", randomColor);
      $(".dropdown-menu").css("background-color", "white");
      $(".App .text-light")
        .addClass("text-secondary")
        .removeClass("text-light");
      $(".App .bg-dark").addClass("bg-light").removeClass("bg-dark");
      $(".App .text-white").addClass("text-danger").removeClass("text-white");
      $(".sidebar")
        .css("background", "rgba(255, 255, 255, 0.8)")
        .css("box-shadow", "0 8px 32px 0 rgba(31, 38, 135, 0.4)")
        .css("border", "1px solid rgba(255, 255, 255, 0.5)");
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
            <i className="fa-solid fa-coins pr-1" />
            Transaction
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
            href="/new-user"
            id="new-user"
          >
            <i className="fa-solid fa-user-plus pr-1"></i>
            Create new user
          </NavLink>
          <NavLink
            className="text-secondary m-0"
            href="/new-account"
            id="new-account"
          >
            <i className="fa-solid fa-square-plus pr-1" />
            Create new account
          </NavLink>
          <NavLink
            className="text-secondary m-0"
            href="/signup-requests"
            id="signup-requests"
          >
            <i className="fa-solid fa-comments pr-1"></i>
            Signup requests
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
