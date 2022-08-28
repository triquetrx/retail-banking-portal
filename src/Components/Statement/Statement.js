import { Component } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "universal-cookie";
import superagent from "superagent";
import { Container, Row } from "react-bootstrap";
import Sidebar from "../Sidebar/Sidebar";
import "../css/home.css";
import TopBar from "../TopBar/TopBar";
import StatementAdmin from "./StatementAdmin";
import StatementUser from "./StatementUser";

class Statement extends Component {
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
        if (window.location.href.includes("transaction")) {
          this.state.cookies.set("customerId", res.body.customerId);
        } else {
          this.state.cookies.remove("customerId");
        }
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
                  <div className="d-block col p-2 d-md-none">
                    <TopBar />
                  </div>
                  <div className="d-block col-md-8 px-5 p-md-0" id="main">
                    <StatementAdmin />
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
                  <div className="d-block col p-2 d-md-none">
                    <TopBar />
                  </div>
                  <div className="d-block col-md-8 px-5 p-md-0" id="main">
                    <StatementUser />
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

export default Statement;
