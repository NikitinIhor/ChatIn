import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import s from "./NotFouundPage.module.css";

export default function NotFoundPage() {
  return (
    <div className={s.wrapper}>
      <motion.h1
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={s.title}
      >
        404
      </motion.h1>

      <motion.h2
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className={s.subtitle}
      >
        Page Not Found
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className={s.text}
      >
        The page you’re looking for doesn’t exist or may have been moved. Let’s
        get you back to safety.
      </motion.p>

      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Link to="/" className={s.button}>
          ⟵ Back to Home
        </Link>
      </motion.div>
    </div>
  );
}
