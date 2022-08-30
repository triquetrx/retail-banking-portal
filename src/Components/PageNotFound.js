import { Container } from "react-bootstrap";
import Bottom from "./LandingPage/Bottom";
import TopBarLandingPage from "./LandingPage/TopBarLandingPage";

export default function PageNotFound(props) {
  return (
    <>
      <TopBarLandingPage />
      <Container className="mt-5 pt-5 text-center" style={{ height: "50vh" }}>
        <h2 className="text-secondary">
          <i className="mb-3 mt-4 mt-md-5 mx-1 fa-solid fa-4"></i>
          <i className="mb-3 mt-4 mt-md-5 mx-1 fa-solid fa-ghost"></i>
          <i className="mb-3 mt-4 mt-md-5 mx-1 fa-solid fa-4"></i>
          <br />
          Seems like you seek a ghost
        </h2>
      </Container>
      <Bottom />
    </>
  );
}
