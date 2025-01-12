import SelectUser from "../SelectUser/SelectUser";
import styles from "./Header.module.css";

function Header() {
  return (
    <>
      <p className={styles.logo}>Логотип какой-то я хз</p>
      <SelectUser />
    </>
  );
}

export default Header;
