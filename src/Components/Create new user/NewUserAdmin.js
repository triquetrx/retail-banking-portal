import { Component } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "universal-cookie";
import superagent from "superagent";
import { Container, Row } from "react-bootstrap";
import Sidebar from "../Sidebar/Sidebar";
import "../css/home.css";
import TopBar from "../TopBar/TopBar";
import NewUserCreation from "./NewUserCreation";
import PageNotFound from "../PageNotFound";
import { AESDecrypt } from "cookie-cryptr";

class NewUserAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userRole: "",
      cookies: new Cookies(),
    };
  }

  componentDidMount() {
    var token = AESDecrypt(this.state.cookies.get("token"), "test");
    superagent
      .get("http://localhost:8001/validate")
      .set("Authorization", `Bearer ${token}`)
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
              <Container className="p-0 m-0 mt-md-3">
                <Row>
                  <div className="d-none d-md-block col-4">
                    <Sidebar />
                  </div>
                  <div className="d-block col d-md-none">
                    <TopBar />
                  </div>
                  <div className="d-block col-md-8 px-5 p-md-0 my-4" id="main">
                    <NewUserCreation />
                  </div>
                </Row>
              </Container>
            </>
          ) : (
            <>
              <h4 className="text-secondary">
                <PageNotFound />
              </h4>
            </>
          )
        ) : (
          <Navigate to="/login" />
        )}
      </>
    );
  }
}

export default NewUserAdmin;
