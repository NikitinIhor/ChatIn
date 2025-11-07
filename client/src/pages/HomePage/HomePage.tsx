import Signup from "../../components/forms/Signup/Signup";

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {
  return (
    <div className="container">
      <h1>ChatIn</h1>
      <p>welcome to ChatIn</p>
      <Signup />
    </div>
  );
};

export default HomePage;
