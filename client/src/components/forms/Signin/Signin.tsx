import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { signin } from "../../../redux/auth/ops";
import { selectLoading, selectUser } from "../../../redux/auth/slice";
import type { AppDispatch } from "../../../redux/store";
import Loader from "../../Loader/Loader";
import s from "../Signup/Signup.module.css";

interface SignInFormProps {
  login: boolean;
  handleChangeForm: () => void;
}

interface SigninFormValues {
  email: string;
  password: string;
}

const initialValues: SigninFormValues = {
  email: "",
  password: "",
};

const FeedbackSchema = Yup.object().shape({
  email: Yup.string().email("Enter a valid email").required(),
  password: Yup.string().min(6, "Too short").max(256, "Too long").required(),
});

const Signin: React.FC<SignInFormProps> = ({ login, handleChangeForm }) => {
  const [showIcon, setShowIcon] = useState(false);

  const dispatch: AppDispatch = useDispatch();
  const loading = useSelector(selectLoading);

  const user = useSelector(selectUser);
  const username = user?.username;

  const handleShowIcon = () => {
    setShowIcon((prev) => !prev);
  };

  const handleSubmit = async (values: SigninFormValues) => {
    try {
      await dispatch(signin(values)).unwrap();

      toast.success(`Welcome ${username}`, {
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

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={FeedbackSchema}
    >
      {({ errors, touched }) => (
        <Form className={s.form}>
          <div className={s.container}>
            <label htmlFor="mail">Mail:</label>
            <Field
              className={`${s.field} ${s.mail} ${
                errors.email && touched.email
                  ? s.errorField
                  : touched.email && !errors.email
                  ? s.validField
                  : ""
              }`}
              type="email"
              name="email"
              placeholder="you email"
            />
            <ErrorMessage className={s.error} name="email" component="span" />
          </div>

          <div className={s.container}>
            <label htmlFor="password">Password:</label>
            <Field
              className={`${s.field} ${s.password} ${
                errors.password && touched.password
                  ? s.errorField
                  : touched.password && !errors.password
                  ? s.validField
                  : ""
              }`}
              type={showIcon ? "password" : "text"}
              name="password"
              placeholder="your password"
            />
            <button className={s.btn_icon} onClick={handleShowIcon}>
              {showIcon ? <HiEyeOff size={20} /> : <HiEye size={20} />}
            </button>
            <ErrorMessage
              className={s.error}
              name="password"
              component="span"
            />
          </div>
          <div className={s.btns}>
            <button type="submit" className={s.registration}>
              {login ? "Log in" : "Registration"}
            </button>
            <button
              type="button"
              className={s.login}
              onClick={handleChangeForm}
            >
              {login ? "Don’t have an account?" : "Already have an account?"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Signin;
