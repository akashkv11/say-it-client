import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loader from "../components/Loader";
import PrivateRoute from "../privateRoute/PrivateRoute";

const Routers = () => {
  const Login = lazy(() => import("../pages/Login/Login"));
  const HomePage = lazy(() => import("../pages/HomePage/HomePage"));

  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
          </Route>
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Routers;
