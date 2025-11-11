import { NavLink } from "react-router-dom";
import s from "./User.module.css";
import defaultAcatar from "/public/images/default-avatar.jpg";

interface UserProps {
  user: {
    _id: string;
    username: string;
    avatar: string | null;
    isActive: boolean;
  };
}

const User: React.FC<UserProps> = ({ user }) => {
  return (
    <NavLink to={`/userchat/${user._id}`} className={s.item}>
      <img src={user.avatar || defaultAcatar} alt={user.username} />
      <span className={s.name}>{user.username}</span>
      <span
        className={s.status}
        title={user.isActive ? "Active" : "Inactive"}
      />
    </NavLink>
  );
};

export default User;
