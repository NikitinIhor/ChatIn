import { FaRegUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/slice";
import Signout from "../forms/Signout/Signout";
import s from "./Header.module.css";
import logo from "/images/logo.png";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const user = useSelector(selectUser);
  const username = user?.username;

  return (
    <header>
      <div className="container">
        <div className={s.wrapper}>
          <div>
            <img className={s.logo} src={logo} alt="logo" />
          </div>

          <div>
            <button type="button">
              <FaRegUser size={28} />
              <div>
                <span>{username}</span>
              </div>
            </button>
          </div>
          <Signout />
        </div>
      </div>
    </header>
  );
};

export default Header;
