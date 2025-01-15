import SelectUser from "../SelectUser/SelectUser";
import Logo from "../Logo/Logo";
import { useState } from "react";
const logos = ["Логотип какой-то я хз", " Другой Логотип какой-то"];

function Header() {
  const [logoIndex, setLogoIndex] = useState(0);
  return (
    <>
      <Logo image={logos[logoIndex]} />
      <SelectUser />
    </>
  );
}

export default Header;
