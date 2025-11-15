import { useParams } from "react-router-dom";
import s from "./UserChat.module.css";
import defaultAcatar from "/images/default-avatar.jpg";

const UserChat = () => {
  const { userId } = useParams();

  const user = {
    _id: userId,
    username: "Demo User",
    avatar: null,
    isActive: true,
  };

  return (
    <div className={s.item}>
      <img src={user.avatar || defaultAcatar} alt={user.username} />
      <span className={s.name}>{user.username}</span>
      <span
        className={s.status}
        title={user.isActive ? "Active" : "Inactive"}
      />
    </div>
  );
};

export default UserChat;
