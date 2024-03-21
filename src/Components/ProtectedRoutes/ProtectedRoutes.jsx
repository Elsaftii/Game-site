import { Navigate } from "react-router-dom";
const ProtectedRoutes = ({ userToken, children }) => {
  if (userToken) {
    return <Navigate to="/" replace />;
  }
  return children;
};
export default ProtectedRoutes;
