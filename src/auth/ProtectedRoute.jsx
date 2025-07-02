import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, role }) => {
    const { user } = useAuth();

    if (!user || (role && user.role !== role)) {
        return <Navigate to="/login" />;
    }


    console.log(user)

    return children;
};

export default ProtectedRoute;