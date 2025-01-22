import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element, roleRequired }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // If no token or if the role doesn't match the required role, redirect to login
  if (!token || (roleRequired && role !== roleRequired)) {
    return <Navigate to="/" />;
  }

  // If token exists and role matches, render the component
  return element;
};

export default PrivateRoute;
