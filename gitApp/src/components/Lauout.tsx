import { Outlet } from "react-router";
import Header from "./Header/Header";
import React from "react";
import "../index.css";

const Lauout = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default Lauout;
