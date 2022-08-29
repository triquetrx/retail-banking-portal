import {
  Container,
  Form,
  Image,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import $ from "jquery";
import { useState } from "react";
import Cookies from "universal-cookie";

export default function TopBarLandingPage(props) {
  const [isModeToggle, setModeToggle] = useState(false);
  const cookies = new Cookies();

  let toggleMode = () => {
    if (isModeToggle) {
      cookies.set("mode", "light");
    } else {
      cookies.set("mode", "dark");
    }
  };

  $(document).ready(function () {
    if (cookies.get("mode") === "dark") {
      $(".App").css("background-color", "#040404");
      $(".dropdown-menu").css("background-color", "#040404");
      $(".App .text-secondary")
        .addClass("text-light")
        .removeClass("text-secondary");
      $(".App .bg-light").addClass("bg-dark").removeClass("bg-light");
      $(".App .text-danger").addClass("text-white").removeClass("text-danger");
    } else {
      $(".App").css("background-color", "#fff");
      $(".dropdown-menu").css("background-color", "white");
      $(".App .text-light")
        .addClass("text-secondary")
        .removeClass("text-light");
      $(".App .bg-dark").addClass("bg-light").removeClass("bg-dark");
      $(".App .text-white").addClass("text-danger").removeClass("text-white");
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
          <Navbar.Brand href="#home">
            <Image src={require("../../images/banking-logo.png")} width="100" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            className="justify-content-end text-danger"
            id="basic-navbar-nav"
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
                  Login
                </NavDropdown.Item>
                <NavDropdown.Item className="text-danger" href="/signup">
                  Sign Up
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <div
                  className="text-danger mode-toggle form-check form-switch"
                  style={{ padding: "0.2rem 2.5rem" }}
                >
                  <input
                    type="checkbox"
                    id="mode-toggle"
                    className="form-check-input"
                    onChange={(e) => setModeToggle(e.target.checked)}
                    onClick={toggleMode}
                  />
                  <label htmlFor="mode-toggle" className="form-check-label">
                    {isModeToggle ? "Dark" : "Light"}
                  </label>
                </div>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
