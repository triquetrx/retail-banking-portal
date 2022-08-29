import { Card, Col, Row } from "react-bootstrap";
import Cookies from "universal-cookie";

export default function DashBoardAdmin(props) {
  const cookies = new Cookies();
  const array = [
    {
      title: "Transfer Money for a customer",
      description:
        "Make a Transfer, deposit, withdraw money for a user/customer",
      button: "Make Transaction",
      icon: "fa-solid fa-coins pl-1",
      url: "/transaction",
    },
    {
      title: "Get statement for a customer",
      description: "Get Statement for consumer on basis of date range",
      button: "Get Details",
      icon: "fa-solid fa-book-open-reader pl-1",
      url: "/statement",
    },
    {
      title: "Create new account for a user",
      description: "Create new account for an existing consumer",
      button: "Create Account",
      icon: "fa-solid fa-square-plus pl-1",
      url: "/new-account",
    },
    {
      title: "Create new user with details",
      description: "Create new user with the help of the details provided",
      button: "Create User",
      icon: "fa-solid fa-user-plus pl-1",
      url: "/new-user",
    },
    {
      title: "View signup requests",
      description:
        "Create new user and there account on the basis of there request",
      button: "See requests",
      icon: "fa-solid fa-comments pl-1",
      url: "/signup-request",
    },
    {
      title: "Change Password for your account",
      description:
        "Create new user and there account on the basis of there request",
      button: "Change password",
      icon: "fa-solid fa-key pl-1",
      url: "/change-password",
    },
  ];

  return (
    <>
      <Row className="mt-3 p-3 p-md-0">
        <Col>
          <h2 className="mt-2 text-secondary">Dashboard</h2>
        </Col>
        <Col>
          <h5 className="mt-3 text-secondary text-right text-danger">
            <i className="fa-solid fa-circle-user mr-1" />
            {cookies.get("user")}
          </h5>
        </Col>
      </Row>
      <hr />
      <h3 className="text-secondary ml-3 ml-md-0">Shortcuts</h3>
      <Row className="d-flex justify-content-center">
        {array.map((item, key) => (
          <div key={key} className="m-1 mt-3 mb-2">
            <Card style={{ width: "15rem" }}>
              <Card.Body className="text-secondary">
                <Card.Title style={{ height: "2.6rem" }}>
                  {item.title}
                </Card.Title>
                <Card.Text style={{ height: "5rem" }}>
                  {item.description}
                </Card.Text>
                <a className="btn btn-outline-primary" href={item.url}>
                  {item.button}
                  <i className={item.icon} />
                </a>
              </Card.Body>
            </Card>
          </div>
        ))}
      </Row>
      <hr />
    </>
  );
}
