import { Component } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "universal-cookie";
import superagent from "superagent";
import { Container, Row } from "react-bootstrap";
import Sidebar from "../Sidebar/Sidebar";
import "../css/home.css";
import TopBar from "../TopBar/TopBar";
import AboutUser from "./AboutUser";

class AboutMe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userRole: "",
      cookies: new Cookies(),
    };
  }

  componentDidMount() {
    superagent
      .get("http://localhost:8001/validate")
      .set("Authorization", `Bearer ${this.state.cookies.get("token")}`)
      .then((res) => {
        this.setState({ userRole: res.body.userRole });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    return (
      <>
        {this.state.cookies.get("token") ? (
          this.state.userRole.match("ROLE_EMPLOYEE") ? (
            <>
              <Container className="p-0 m-0">
                <Row>
                  <div className="d-none d-md-block col-4">
                    <Sidebar />
                  </div>
                  <div className="d-block col d-md-none">
                    <TopBar />
                  </div>
                  <div className="d-block col-md-8 px-5 p-md-0" id="main">
                    <h4 className="text-secondary">
                      Seems like you are lost mate
                    </h4>
                  </div>
                </Row>
              </Container>
            </>
          ) : (
            <>
              <Container className="p-0 m-0">
                <Row>
                  <div className="d-none d-md-block col-4">
                    <Sidebar />
                  </div>
                  <div className="d-block col d-md-none">
                    <TopBar />
                  </div>
                  <div className="d-block col-md-8 px-5 p-md-0" id="main">
                    <AboutUser />
                  </div>
                </Row>
              </Container>
            </>
          )
        ) : (
          <Navigate to="/login" />
        )}
      </>
    );
  }
}

export default AboutMe;
