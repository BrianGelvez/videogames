import React from "react";
import "./LandingPage.modules.css";
import { Link } from "react-router-dom";

export const LandingPage = () => {
  return (
      <div className="LandingPage">
        <h1>Proyecto Individual</h1>
        <h2>by: Brian Gelvez</h2>
        <Link to="/home/1">
        <button>Go to Home Page</button>
      </Link>
      </div>
  );
};
