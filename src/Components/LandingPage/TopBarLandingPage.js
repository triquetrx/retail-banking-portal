import { Container, Image, Nav, Navbar } from "react-bootstrap";
import $ from "jquery";

export default function TopBarLandingPage(props) {
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
            className="justify-content-end"
            id="basic-navbar-nav"
          >
            <Nav>
              <Nav.Link className="text-danger" id="home" href="/">
                Home
              </Nav.Link>
              <Nav.Link className="text-danger" href="/home#whyus">
                Why us
              </Nav.Link>
              <Nav.Link className="text-danger" href="/login">
                Login
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
