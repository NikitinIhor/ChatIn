import Header from "../../components/Header/Header";

interface AdminPageProps {}

const AdminPage: React.FC<AdminPageProps> = () => {
  return (
    <div className="container">
      <Header />
      <p>AdminPage</p>
    </div>
  );
};

export default AdminPage;
