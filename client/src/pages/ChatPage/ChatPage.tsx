import Header from "../../components/Header/Header";
import UsersList from "../../components/Users/UsersList/UserList";

interface ChatPageProps {}

const ChatPage: React.FC<ChatPageProps> = () => {
  return (
    <div className="container">
      <Header />

      <p>ChatPage</p>

      <UsersList />
    </div>
  );
};

export default ChatPage;
