import React from "react";
import styles from "../style/Spinner.module.css";

const Spinner = () => {
  return (
    <svg className={styles.loadingSpinner} viewBox="0 0 50 50">
      <circle
        className={styles.loadingSpinnerPath}
        cx="25"
        cy="25"
        r="15"
        fill="none"
        strokeWidth="5"
      ></circle>
      <circle
        className={styles.loadingSpinnerPath2}
        cx="25"
        cy="25"
        r="20"
        fill="none"
        strokeWidth="8"
      ></circle>
    </svg>
  );
};

export default Spinner;
