import { Navigate } from "react-router-dom";
import { checkToken } from "../hooks/authHooks";

import { ReactNode } from "react";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { data, isLoading, isError } = checkToken();
  console.log(data)
  if (isLoading) return <div>Ładowanie...</div>;

  
  if (isError) {
    console.log("Error: ", isError);
    console.log("Data: ", data);
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default PrivateRoute;
