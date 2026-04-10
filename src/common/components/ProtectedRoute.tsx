import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Loading } from "./Loading";

interface ProtectedRouteProps {
    allowedRoles?: string [];
    redirectTo?: string
}

export const ProtectedRoute = ({
    allowedRoles,
    redirectTo = 'login'
}: ProtectedRouteProps) => {
    const {user, isLoading, isAuthenticated } = useAuth();

    if(isLoading) {
        return <Loading/>
    }

    if(!isAuthenticated){
        return <Navigate to={redirectTo}/>;
    }

    if(allowedRoles && user?.role && !allowedRoles.includes(user.role)) {
        return <Navigate to="/unauthorized" replace  />
    }

    return <Outlet />
}