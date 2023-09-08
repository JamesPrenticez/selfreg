import React, { type ReactElement } from "react";
import Body from "../components/layout/Body";
import Todos from "../components/todos/Todos";

const Home = (): ReactElement => {
  return (
    <Body>
      <Todos />
    </Body>
  );
};

export default Home;
