import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate } from "react-router-dom";
import { ScaleLoader } from "react-spinners";


const PrivateRoute = ({ children }) => {
    const { user, loader } = useContext(AuthContext)
    if (loader) {
        return <ScaleLoader color="#FF3811" />
    }
    if (user?.email) {
        return children
    }
    return <Navigate to='/login' replace></Navigate>
};

export default PrivateRoute;