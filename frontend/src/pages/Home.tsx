import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="text-primary">
      <h1>Home</h1>
      <Link to="/sign-in">Sign In</Link>
    </div>
  );
}

export default Home;
