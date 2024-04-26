import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login.tsx";
import HomePage from "./pages/HomePage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import DashboardLayout from "./layouts/DashboardLayout.tsx";
import BooksPage from "./pages/BooksPage.tsx";

const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "home",
        element: <HomePage />,
      },
      {
        path: "books",
        element: <BooksPage />,
      },
    ],
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
