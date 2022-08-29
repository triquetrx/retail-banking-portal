import { useEffect, useState } from "react";
import { Card, Row } from "react-bootstrap";
import superagent from "superagent";

export default function News(props) {
  const [news, setNews] = useState([]);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(6);

  useEffect(() => {
    superagent
      .get(
        "https://newsapi.org/v2/everything?domains=wsj.com&apiKey=6066dd1391af46b9844917b6f8c1a759"
      )
      .then((res) => {
        setNews(res.body.articles);
      })
      .catch(console.error);
  });

  let showLess = () => {
    setStart(start - 6);
    setEnd(end - 6);
  };
  let showMore = () => {
    setStart(start + 6);
    setEnd(end + 6);
  };

  return (
    <>
      <h3 className="text-secondary ml-3 ml-md-0">
        Wallstreet Journal Articles
      </h3>
      <div className="news">
        <Row className="d-flex justify-content-center">
          {news.slice(start, end).map((item, key) => (
            <div key={key} className="m-1">
              <Card style={{ width: "15rem" }}>
                <Card.Img variant="top" src={item.urlToImage} height="200" />
                <Card.Body>
                  <Card.Title
                    className="text-secondary"
                    style={{ height: "12rem" }}
                  >
                    {item.title}
                  </Card.Title>
                  <a className="btn btn-outline-primary" href={item.url}>
                    Read More
                  </a>
                </Card.Body>
              </Card>
            </div>
          ))}
        </Row>
        {news.length > start ? (
          <div className="d-flex justify-content-end my-4 text-end">
            {start > 6 ? (
              <button
                className="text-danger mx-1"
                style={{ border: "none", backgroundColor: "transparent" }}
                onClick={showLess}
              >
                Less
              </button>
            ) : (
              <></>
            )}
            <button
              className="text-primary mx-1"
              style={{ border: "none", backgroundColor: "transparent" }}
              onClick={showMore}
            >
              More
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
