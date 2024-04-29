import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "./pages/LoginPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import DashboardLayout from "./layouts/DashboardLayout.tsx";
import BooksPage from "./pages/BooksPage.tsx";
import AuthLayout from "./layouts/AuthLayout.tsx";
import CreateBook from "./pages/CreateBook.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={"/dashboard/home"} />,
  },
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
      {
        path: "books/create",
        element: <CreateBook />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },
]);

export default router;
