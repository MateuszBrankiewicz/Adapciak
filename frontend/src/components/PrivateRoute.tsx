import { Navigate } from "react-router-dom";
import { checkToken } from "../hooks/api/authHooks";

import { ReactNode } from "react";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { data, isLoading, isError } = checkToken();
  if (isLoading) return <div>Ładowanie...</div>;

  
  if (isError) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default PrivateRoute;
