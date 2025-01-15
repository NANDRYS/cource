import { memo } from "react";
import styles from "./Logo.module.css";


function Logo({ image }) {
  console.log("logo");

  return <p className={styles.logo}>{image}</p>;
}
export default memo(Logo);
