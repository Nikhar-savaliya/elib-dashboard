import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login.tsx";
import HomePage from "./pages/HomePage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);

export default router;
