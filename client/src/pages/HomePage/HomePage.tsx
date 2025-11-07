import { useState } from "react";
import Signin from "../../components/forms/Signin/Signin";
import Signup from "../../components/forms/Signup/Signup";

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {
  const [login, setLogin] = useState(false);

  const handleChangeForm = () => {
    setLogin((prev) => !prev);
  };

  return (
    <div className="container">
      <h1>ChatIn</h1>
      <p>welcome to ChatIn</p>
      {login ? (
        <Signin login={login} handleChangeForm={handleChangeForm} />
      ) : (
        <Signup login={login} handleChangeForm={handleChangeForm} />
      )}
    </div>
  );
};

export default HomePage;
