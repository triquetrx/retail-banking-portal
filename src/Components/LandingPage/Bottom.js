import { Container, Row } from "react-bootstrap";

export default function Bottom(props) {
  return (
    <>
      <footer className="bg-light text-secondary text-muted mt-5">
        <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
          <div className="ml-5 d-none d-lg-block text-center text-md-left">
            <span>Get connected with us on social networks:</span>
          </div>
          <div className="text-center text-md-end">
            <a
              href="https://www.facebook.com"
              className="mx-3 mx-md-1 text-danger"
            >
              <i className="fa-brands fa-square-facebook"></i>
            </a>
            <a
              href="https://www.twitter.com"
              className="mx-3 mx-md-1 text-danger"
            >
              <i className="fa-brands fa-square-twitter"></i>
            </a>
            <a
              href="https://www.linkedin.com"
              className="mx-3 mx-md-1 text-danger"
            >
              <i className="fa-brands fa-linkedin"></i>
            </a>
            <a
              href="https://github.com/triquetrx"
              className="mx-3 mx-md-1 text-danger"
            >
              <i className="fa-brands fa-square-github"></i>
            </a>
          </div>
        </section>
        <Container className="py-4">
          <Row>
            <div className="col-md text-center text-secondary text-md-left">
              <h6 className="text-uppercase fw-bold mb-4">banking.com</h6>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
                eveniet aliquam dicta perferendis provident earum, doloribus ex
                iusto iure nulla veniam quasi, culpa illum dolores sapiente sed
                rem magnam omnis ipsam minus assumenda sint! Ipsam saepe facilis
                corrupti provident? Necessitatibus.
              </p>
            </div>
            <div className="col-md mt-3 mt-md-0 text-secondary text-center text-md-right">
              <h6 className="text-uppercase fw-bold mb-4">About creators</h6>
              <p>
                This application was created with{" "}
                <i className="text-danger fa-solid fa-heart"></i>
                <br />
                by Zaid Khan, Sumit Pardule, Chetan <br /> Kandarkar, Bhavya
                Shah,
                <br /> Devika Kadam
              </p>
            </div>
          </Row>
        </Container>

        <div className="text-center bg-danger p-3" style={{ color: "#fff" }}>
          © Designed by
          <a
            className="fw-bold pl-1"
            style={{ color: "#fff" }}
            href="https://triquetrx.netlify.app"
          >
            triquetrx
          </a>
        </div>
      </footer>
    </>
  );
}
