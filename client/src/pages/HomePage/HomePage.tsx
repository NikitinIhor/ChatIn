import { useState } from "react";
import Signin from "../../components/forms/Signin/Signin";
import Signup from "../../components/forms/Signup/Signup";
import s from "./HomePage.module.css";

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {
  const [login, setLogin] = useState(false);

  const handleChangeForm = () => {
    setLogin((prev) => !prev);
  };

  return (
    <div className="container">
      <h1 className={s.title}>ChatIn</h1>
      <p className={s.text}>welcome to ChatIn</p>
      {login ? (
        <Signin login={login} handleChangeForm={handleChangeForm} />
      ) : (
        <Signup login={login} handleChangeForm={handleChangeForm} />
      )}
    </div>
  );
};

export default HomePage;
