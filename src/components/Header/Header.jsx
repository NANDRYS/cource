import SelectUser from "../SelectUser/SelectUser";
import Button from "../Button/Button";
import Logo from "../Logo/Logo";
import { useState } from "react";
const logos = ["Логотип какой-то я хз", " Другой Логотип какой-то"];

function Header() {
  const [logoIndex, setLogoIndex] = useState(0);

  console.log("header");

  const toggleLogo = () => {
    setLogoIndex((state) => Number(!state));
  };
  return (
    <>
      <Logo image={logos[logoIndex]} />
      <SelectUser />
      <Button onClick={toggleLogo}>Сменить лого</Button>
    </>
  );
}

export default Header;
