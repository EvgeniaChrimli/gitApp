import React from "react";
import { useNavigate } from "react-router";
import arrow from "/arrowleft.svg";
import styles from "./Nav.module.css";

const Navigation = () => {
  const location = useNavigate();
  const goBack = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    location(-1);
  };
  return (
    <button className={styles.btn} onClick={goBack}>
      <img className={styles.img} src={arrow} alt="back" />
    </button>
  );
};

export default Navigation;
