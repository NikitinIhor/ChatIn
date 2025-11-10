import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../../redux/store";
import { getAllUsers } from "../../../redux/users/ops";
import {
  selectError,
  selectLoading,
  selectUsers,
} from "../../../redux/users/slice";
import Error from "../../Error/Error";
import Loader from "../../Loader/Loader";
import s from "./UsersList.module.css";
import defaultAcatar from "/images/default-avatar.jpg";

interface UsersListProps {}

const UsersList: React.FC<UsersListProps> = () => {
  const dispatch = useDispatch<AppDispatch>();

  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const users = useSelector(selectUsers);

  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getAllUsers(search));
  }, [dispatch, search]);

  if (loading) return <Loader />;
  if (error) return <Error />;

  return (
    <div>
      <h2>Users</h2>

      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={s.input}
      />
      <ul className={s.list}>
        {users.map((user, index) => (
          <li
            key={user._id ?? index}
            className={s.item}
            data-active={user.isActive}
          >
            <img src={user.avatar || defaultAcatar} alt={user.username} />
            <span className={s.name}>{user.username}</span>
            <span
              className={s.status}
              title={user.isActive ? "Active" : "Inactive"}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
