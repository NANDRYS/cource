import SelectUser from "../SelectUser/SelectUser";
import styles from "./Header.module.css";

function Header() {
  const changeUser = (e) => {
    console.log(e.target.value);
  };
  return (
    <>
      <p className={styles.logo}>Логотип какой-то я хз</p>
      <SelectUser changeUser={changeUser} />
    </>
  );
}

export default Header;
