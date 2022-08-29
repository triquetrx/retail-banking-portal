import { AESDecrypt } from "cookie-cryptr";
import { Card, Col, Row } from "react-bootstrap";
import Cookies from "universal-cookie";

export default function DashBoardUser(props) {
  const cookies = new Cookies();

  const array = [
    {
      title: "Change password for your account",
      description:
        "Change your password (recommended if it's your first time login)",
      button: "Change now",
      icon: "fa-solid fa-key pl-1",
      url: "/change-password",
    },
    {
      title: "Transfer money to a user",
      description: "Make a Transfer to an existing user",
      button: "Transfer Money",
      icon: "fa-solid fa-money-bill-transfer pl-1",
      url: "/transaction",
    },
    {
      title: "Check your balance or more",
      description: "Check your account balance or your account id",
      button: "Check now",
      icon: "fa-solid fa-magnifying-glass-dollar pl-1",
      url: "/about-me",
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
            {AESDecrypt(cookies.get("user"), "test")}
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
