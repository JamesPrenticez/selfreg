import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="text-primary flex flex-col space-y-2">
      <h1>Home</h1>
      <Link to="/sign-in">Sign In</Link>
      <Link to="/test" className="text-fuchsia-500">Test</Link>
    </div>
  );
}

export default Home;
