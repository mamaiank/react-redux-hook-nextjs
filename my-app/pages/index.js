import React, { useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import fetch from "isomorphic-unfetch";
import Layout from "../components/Layout";

const HtmlApp = (value) => {
  return (
    <Container>
      <Row>
        {value.data.map((result, key) => (
          <Col xs={12} md={6} lg={4} key={key}>
            <Card className="mx-auto" style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>
                  <a href={`/post/${result.id}`}>{result.title}</a>
                </Card.Title>
                <span
                  className="content-html"
                  dangerouslySetInnerHTML={{ __html: result.body }}
                />
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

const index = (props) => {
  const isMobile = useSelector((state) => state.isMobile);
  const dispatch = useDispatch();

  console.log("is", isMobile);
  const resize = () => {
    dispatch({
      type: "CHANGE_STATE",
      stateName: "isMobile",
      value: window.innerWidth <= 767,
    });
  };
  useEffect(() => {
    window.addEventListener("resize", resize);
    resize();
  }, []);
  return (
    <>
      <Layout>
        {props.dataStatus ? <HtmlApp data={props.data} /> : <h1>Loading</h1>}
      </Layout>
    </>
  );
};

index.getInitialProps = async () => {
  try {
    const [RES_DATA] = await Promise.all([
      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "GET",
      }),
    ]);

    const RESULT_DATA = await RES_DATA.json();

    return {
      data: RESULT_DATA,
      dataStatus: true,
    };
  } catch (error) {
    console.log("ERROR From Catch ", error);
  }
};

export default index;
