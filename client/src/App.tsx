import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));

const App: React.FC = () => {
  return (
    <main>
      <Suspense>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
        </Routes>
      </Suspense>
    </main>
  );
};

export default App;
