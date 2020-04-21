import React, { useState } from "react";
import { Jumbotron } from "react-bootstrap";
import Layout from "../components/Layout";
import fetch from "isomorphic-unfetch";

const HtmlApp = (value) => {
  return (
    <>
      <Jumbotron>
        <h1>{value.data.title}</h1>
        <p
          className="content-html"
          dangerouslySetInnerHTML={{ __html: value.data.body }}
        />
      </Jumbotron>
    </>
  );
};

const Post = (props) => {
  return (
    <Layout>
      {props.dataStatus ? <HtmlApp data={props.data} /> : <h1>Loading</h1>}
    </Layout>
  );
};
Post.getInitialProps = async ({ query }) => {
  const { id } = query;
  try {
    const [RES_DATA] = await Promise.all([
      fetch("https://jsonplaceholder.typicode.com/posts/" + id, {
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
export default Post;
