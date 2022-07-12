import React from "react";
import { Oval } from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import styles from "./loader.module.css";

const Loader = () => {
  return (
    <div className={styles.loader}>
      <Oval height="50" width="50" color="grey" ariaLabel="loading" />
    </div>
  );
};

export default Loader;
