import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

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
        return <div>Loading...</div> // Nên có một component Loading
    }

    if(!isAuthenticated){
        return <Navigate to={redirectTo}/>;
    }

    // console.log("this is allowedRoles:"+  allowedRoles+" and User role "+ user?.role +" and allowedRoles.includes(user.role) " + allowedRoles.includes(user.role))
    if(allowedRoles && user?.role && !allowedRoles.includes(user.role)) {
        return <Navigate to="/unauthorized" replace  />
    }

    return <Outlet />
}