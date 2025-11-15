import s from "./Error.module.css";

const Error: React.FC = () => {
  return (
    <div className={s.container}>
      <p className={s.text}>
        Ooops... something went wrong, please, reload the page
      </p>
    </div>
  );
};

export default Error;
