import Signout from "../../components/forms/Signout/Signout";

interface ChatPageProps {}

const ChatPage: React.FC<ChatPageProps> = () => {
  return (
    <div className="container">
      <p>ChatPage</p>
      <Signout />
    </div>
  );
};

export default ChatPage;
