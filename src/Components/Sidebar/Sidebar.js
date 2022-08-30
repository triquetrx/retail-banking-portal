import { Component } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "universal-cookie";
import superagent from "superagent";
import SidebarAdmin from "./SidebarAdmin";
import "../css/home.css";
import SidebarUser from "./SidebarUser";
import { AESDecrypt } from "cookie-cryptr";

class Sidebar extends Component {
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
            <SidebarAdmin />
          ) : (
            <>
              <SidebarUser />
            </>
          )
        ) : (
          <Navigate to="/login" />
        )}
      </>
    );
  }
}

export default Sidebar;
