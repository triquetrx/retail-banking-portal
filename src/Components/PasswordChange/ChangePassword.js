import { Component } from "react";
import Cookies from "universal-cookie";
import superagent from "superagent";
import { Alert, Button, Container, Form } from "react-bootstrap";
import "../css/home.css";
import { AESDecrypt } from "cookie-cryptr";

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userRole: "",
      cookies: new Cookies(),
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      isAlert: false,
      alertType: "",
      alertMessage: "",
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
    let changePassword = async (e) => {
      e.preventDefault();
      if (this.state.newPassword === this.state.confirmPassword) {
        var token = AESDecrypt(this.state.cookies.get("token"), "test");
        superagent
          .post("http://localhost:8001/change-password")
          .set("Authorization", `Bearer ${token}`)
          .send({
            oldPassword: this.state.oldPassword,
            newPassword: this.state.newPassword,
          })
          .then((res) => {
            this.setState({
              isAlert: true,
              alertType: "success",
              alertMessage: "Password changed successfully",
            });
          })
          .catch((err) => {
            this.setState({
              isAlert: true,
              alertType: "danger",
              alertMessage: "Password does not match",
            });
          });
      } else {
        this.setState({
          isAlert: true,
          alertType: "danger",
          alertMessage: "New password and confirm password didn't match",
        });
      }
    };

    return (
      <>
        {this.state.isAlert ? (
          <Alert variant={this.state.alertType}>
            {this.state.alertMessage}
          </Alert>
        ) : (
          <></>
        )}
        <h3 className="text-secondary mt-3">Change Password</h3>
        <hr />
        <Container className="p-0 m-0 mt-md-3 text-secondary">
          <Form onSubmit={changePassword}>
            <Form.Group className="mb-3" controlId="oldPassword">
              <Form.Label>Old password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your old password"
                onChange={(e) => this.setState({ oldPassword: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="newPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter you new password"
                onChange={(e) => this.setState({ newPassword: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Renter your new password"
                onChange={(e) =>
                  this.setState({ confirmPassword: e.target.value })
                }
              />
            </Form.Group>
            <Button variant="outline-primary" type="submit">
              Submit
            </Button>
          </Form>
        </Container>
      </>
    );
  }
}

export default ChangePassword;
