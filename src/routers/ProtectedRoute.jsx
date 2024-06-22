import { Outlet, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function ProtectedRoute() {
  const tokenUser = Cookies.get("TokenUser");
  if (!tokenUser) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}
