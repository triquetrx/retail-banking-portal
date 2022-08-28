import { Component } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "universal-cookie";
import superagent from "superagent";
import "../css/home.css";
import TopBarAdmin from "./TopBarAdmin";
import TopBarUser from "./TopBarUser";

class TopBar extends Component {
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
      <div className="topBar">
        {this.state.cookies.get("token") ? (
          this.state.userRole.match("ROLE_EMPLOYEE") ? (
            <TopBarAdmin />
          ) : (
            <>
              <TopBarUser />
            </>
          )
        ) : (
          <Navigate to="/login" />
        )}
      </div>
    );
  }
}

export default TopBar;
