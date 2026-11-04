import React from "react";
import Bloglist from "./Bloglist";
import CreateBlog from "./CreateBlog";

const Home = () => {
  const flex = {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  return (
    <section style={flex}>
      <CreateBlog />
      <Bloglist />
    </section>
  );
};

export default Home;
