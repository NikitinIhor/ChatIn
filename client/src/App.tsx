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
const UserChat = lazy(() => import("./pages/UserChat/UserChat"));
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
              isLoggedin ? (
                isAdmin ? (
                  <Navigate to="/admin" replace />
                ) : (
                  <Navigate to="/chat" replace />
                )
              ) : (
                <HomePage />
              )
            }
          />
          <Route
            path="/chat"
            element={
              isLoggedin && !isAdmin ? (
                <ChatPage />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/admin"
            element={isAdmin ? <AdminPage /> : <Navigate to="/" replace />}
          />
          <Route
            path="/userchat/:userId"
            element={
              isLoggedin && !isAdmin ? (
                <UserChat />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </main>
  );
};

export default App;
