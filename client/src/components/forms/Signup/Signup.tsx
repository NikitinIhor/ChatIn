import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { signup } from "../../../redux/auth/ops";
import { selectError, selectLoading } from "../../../redux/auth/slice";
import type { AppDispatch } from "../../../redux/store";
import Error from "../../Error/Error";
import Loader from "../../Loader/Loader";
import s from "./Signup.module.css";

interface SignupFormProps {
  login: boolean;
  handleChangeForm: () => void;
}

interface SignupFormValues {
  username: string;
  email: string;
  password: string;
}

const initialValues: SignupFormValues = {
  username: "",
  email: "",
  password: "",
};

const FeedbackSchema = Yup.object().shape({
  username: Yup.string().min(3, "Too Short!").max(50, "Too Long!").required(),
  email: Yup.string().email("Enter a valid email").required(),
  password: Yup.string().min(6, "Too short").max(256, "Too long").required(),
});

const Signup: React.FC<SignupFormProps> = ({ login, handleChangeForm }) => {
  const [showIcon, setShowIcon] = useState(false);

  const dispatch: AppDispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError) as unknown;

  const handleShowIcon = () => {
    setShowIcon((prev) => !prev);
  };

  const handleSubmit = async (values: SignupFormValues) => {
    try {
      await dispatch(signup(values)).unwrap();

      toast.success("Successfully registered!", {
        duration: 4000,
        position: "top-right",
      });
    } catch (error) {
      const errorMessage = error as string;
      toast.error(errorMessage, {
        duration: 4000,
        position: "top-right",
      });
    }
  };

  if (loading) return <Loader />;
  if (error) return <Error />;

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={FeedbackSchema}
    >
      {({ errors, touched }) => (
        <Form className={s.form}>
          <div className={s.container}>
            <label htmlFor="username">Name:</label>
            <Field
              className={`${s.field} ${s.name} ${
                errors.username && touched.username
                  ? s.errorField
                  : touched.username && !errors.username
                  ? s.validField
                  : ""
              }`}
              type="text"
              name="username"
              placeholder="your name"
            />
            <ErrorMessage
              className={s.error}
              name="username"
              component="span"
            />
          </div>

          <div className={s.container}>
            <label htmlFor="email">Mail:</label>
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
              placeholder="your email"
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
            <button
              type="button"
              className={s.btn_icon}
              onClick={handleShowIcon}
            >
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

export default Signup;
