import Header from "../../components/Header/Header";

interface ChatPageProps {}

const ChatPage: React.FC<ChatPageProps> = () => {
  return (
    <div className="container">
      <Header />
      <p>ChatPage</p>
    </div>
  );
};

export default ChatPage;
