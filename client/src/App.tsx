import { lazy, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router-dom";
import Loader from "./components/forms/Loader/Loader";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const ChatPage = lazy(() => import("./pages/ChatPage/ChatPage"));
const AdminPage = lazy(() => import("./pages/AdminPage/AdminPage"));
const NotFoundPage = lazy(() => import("./pages/NotFouundPage/NotFouundPage"));

const App: React.FC = () => {
  //   const dispatch = useDispatch<AppDispatch>();
  // const isRefreshing = useSelector(selectIsRefreshing);

  // useEffect(() => {
  //   dispatch(refresh());
  // }, [dispatch]);

  const isRefreshing = false;
  const isLoggedin = false;
  const isAdmin = false;

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
