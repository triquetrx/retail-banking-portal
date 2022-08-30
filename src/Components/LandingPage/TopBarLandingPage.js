import { Container, Image, Nav, Navbar, NavDropdown } from "react-bootstrap";
import $ from "jquery";
import { useState } from "react";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";
import { AESDecrypt } from "cookie-cryptr";

export default function TopBarLandingPage(props) {
  const [isDarkMode, setDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState("");
  const cookies = new Cookies();

  let toggleMode = () => {
    if (isDarkMode) {
      cookies.set("mode", "light");
      setDarkMode(true);
      setCurrentPage(window.location.href);
    } else {
      cookies.set("mode", "dark");
      setDarkMode(false);
      setCurrentPage(window.location.href);
    }
  };

  $(document).ready(function () {
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

  let randomColor = () => {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  $(document).ready(function () {
    $(".nav-design-landing-page").css("background-color", randomColor);
  });

  return (
    <>
      <div className="design-landing-page"></div>
      <Navbar expand="lg" className="nav-landing-page" fixed="top">
        <Container fluid>
          <Navbar.Brand href="/">
            <Image src={require("../../images/banking-logo.png")} width="100" />
          </Navbar.Brand>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#homeBar"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fa-solid fa-bars" id="more-options"></i>
          </button>
          <Navbar.Collapse
            className="justify-content-end text-danger"
            id="homeBar"
          >
            <Nav>
              <Nav.Link className="text-danger" id="home" href="/">
                Home
              </Nav.Link>
              <Nav.Link className="text-danger" href="/home#whyus">
                Why us
              </Nav.Link>
              <NavDropdown title="More Options" id="basic-nav-dropdown">
                <NavDropdown.Item className="text-danger" href="/login">
                  {cookies.get("user") ? (
                    <>
                      <i className="fa-solid fa-circle-user mr-1" />
                      {AESDecrypt(cookies.get("user"), "test")}
                    </>
                  ) : (
                    "Login"
                  )}
                </NavDropdown.Item>
                <NavDropdown.Item className="text-danger" href="/signup">
                  Sign Up
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <div
                  className="text-danger mode-toggle form-check form-switch"
                  style={{ padding: "0.2rem 2.5rem" }}
                >
                  <Link
                    type="checkbox"
                    id="mode-toggle"
                    className="btn btn-block btn-outline-primary"
                    onClick={toggleMode}
                    to={currentPage}
                  >
                    {isDarkMode ? "Light" : "Dark"}
                    {isDarkMode ? (
                      <i className="pl-2 fa-solid fa-sun"></i>
                    ) : (
                      <i className="pl-2 fa-solid fa-moon"></i>
                    )}
                  </Link>
                </div>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
