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

          <div className={s.info}>
            <button type="button" className={s.user}>
              <div>
                <FaRegUser size={30} />
              </div>
              <div className={s.circle}>
                <div className={s.inside_circle}>
                  <span>{username?.slice(0, 1).toUpperCase()}</span>
                </div>
              </div>
            </button>
            <Signout />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
