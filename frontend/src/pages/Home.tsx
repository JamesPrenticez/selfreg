import React, { type ReactElement } from "react";
import Body from "../components/layout/Body";
import Todos from "../components/todos/Todos";
import InstallPWAButton from "../components/pwa/InstallPWAButton";

const Home = (): ReactElement => {
  return (
    <Body>
      <div className="flex flex-col min-h-[88vh]">
        <Todos />
        <div className="mt-auto">
          <InstallPWAButton />
        </div>
      </div>
    </Body>
  );
};

export default Home;
