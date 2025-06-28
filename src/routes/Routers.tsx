import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loader from "../components/Loader";
import PrivateRoute from "../privateRoute/PrivateRoute";

const Routers = () => {
  const Login = lazy(() => import("../pages/Login/Login"));
  const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
  const Dashboard = lazy(() => import("../pages/Dashboard/Dashboard"));
  const SignUp = lazy(() => import("../pages/SignUp/SignUp"));

  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Routers;
