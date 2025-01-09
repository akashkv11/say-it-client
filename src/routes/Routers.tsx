import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loader from "../components/Loader";

const Routers = () => {
  const Login = lazy(() => import("../pages/Login"));

  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Routers;
