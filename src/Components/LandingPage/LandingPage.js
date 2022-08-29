import { Component } from "react";
import TopBarLandingPage from "./TopBarLandingPage";
import "../css/landingPage.css";
import { Col, Container, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import WhyUs from "./WhyUs";
import InterestRates from "./InterestRates";
import Bottom from "./Bottom";

class LandingPage extends Component {
  render() {
    return (
      <div className="landing-page">
        <TopBarLandingPage />
        <Container className="mt-5 mb-3">
          <Row>
            <div className="col-md d-block d-md-none mt-3">
              <Image src={require("../../images/landing-page.png")} fluid />
            </div>
            <Col className="col col-md-4 mt-md-5 pt-md-5 text-center text-md-left">
              <h2 className="text-primary mt-2 justify-content-md-start">
                Store
                <br /> your savings
                <br className="d-none d-md-block" /> in an easiest way
                <br className="d-none d-md-block" />
              </h2>
              <p className="mt-1 text-secondary">
                Money is hard to earn and easy to lose, let us guard your
                earning the best way possible
              </p>
              <Link
                to="/signup"
                className="mt-3 py-2 px-3 btn btn-outline-primary"
              >
                Start saving today
                <i className="ml-2 fa fa-arrow-right" />
              </Link>
            </Col>
            <div className="col-md-8 d-none d-md-block pt-0 mt-0">
              <Image src={require("../../images/landing-page.png")} fluid />
            </div>
          </Row>
        </Container>
        <div className="whyus bg-light p-2 py-5" id="whyus">
          <WhyUs />
        </div>
        <InterestRates />
        <Bottom />
      </div>
    );
  }
}

export default LandingPage;
