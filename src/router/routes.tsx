import { createBrowserRouter, useNavigate } from "react-router-dom";

import Dashboard from "@/features/Dashboard/Index";
import AppLayout from "@/layouts/AppLayout";
import LoginView from "@/features/Auth/Views/LoginView";
import { useAppSelector } from "@/stores/hooks";

function routeGuardMiddleware(route) {
  const navigate = useNavigate();

  if (route.meta && route.meta.requiresAuth) {
    // Check if the user is authenticated (you can replace this with your authentication logic)
    const isAuthenticated = useAppSelector((state) => state.auth);

    if (!isAuthenticated) {
      // Redirect to the login page or show an error message
      navigate("/auth/login");
      return null;
    }
  }

  return route.element;
}

const router = createBrowserRouter([
  {
    path: "/",
    Component: AppLayout,
    children: [
      {
        path: "/",
        Component: Dashboard,
      },
    ],
  },
  {
    path: "/auth/login",
    Component: LoginView,
  },
]);

export default router;
