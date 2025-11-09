import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../../../redux/auth/ops";
import { selectLoading, selectUser } from "../../../redux/auth/slice";
import type { AppDispatch } from "../../../redux/store";
import Loader from "../../Loader/Loader";

const Signout: React.FC = () => {
  const loading = useSelector(selectLoading);

  const user = useSelector(selectUser);
  const username = user?.username;

  const dispatch = useDispatch<AppDispatch>();

  const handleSignout = async () => {
    try {
      await dispatch(signout()).unwrap();

      toast.success(`Good bye ${username}`, {
        duration: 4000,
        position: "top-right",
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      toast.error(errorMessage, {
        duration: 4000,
        position: "top-right",
      });
    }
  };

  if (loading) return <Loader />;

  return <button onClick={handleSignout}>Signout</button>;
};

export default Signout;
