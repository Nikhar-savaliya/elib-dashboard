import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login.tsx";
import HomePage from "./pages/HomePage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
