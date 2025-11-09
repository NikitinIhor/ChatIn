import { lazy, Suspense, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import Loader from "./components/Loader/Loader";
import { refresh } from "./redux/auth/ops";
import {
  selectIsLoggedIn,
  selectIsRefreshing,
  selectUser,
} from "./redux/auth/slice";
import type { AppDispatch } from "./redux/store";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const ChatPage = lazy(() => import("./pages/ChatPage/ChatPage"));
const AdminPage = lazy(() => import("./pages/AdminPage/AdminPage"));
const NotFoundPage = lazy(() => import("./pages/NotFouundPage/NotFouundPage"));

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isRefreshing = useSelector(selectIsRefreshing);
  const isLoggedin = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  const isAdmin = user?.role === "admin";

  useEffect(() => {
    dispatch(refresh());
  }, [dispatch]);

  // const isRefreshing = false;
  // const isLoggedin = false;
  // const isAdmin = false;

  return isRefreshing ? (
    <Loader />
  ) : (
    <main>
      <Suspense fallback={<Loader />}>
        <Toaster />
        <Routes>
          <Route
            path="/"
            element={
              isLoggedin ? <Navigate to="/chat" replace /> : <HomePage />
            }
          />

          <Route
            path="/chat"
            element={isLoggedin ? <ChatPage /> : <Navigate to="/" replace />}
          />

          <Route
            path="/admin"
            element={isAdmin ? <AdminPage /> : <Navigate to="/" replace />}
          />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </main>
  );
};

export default App;
