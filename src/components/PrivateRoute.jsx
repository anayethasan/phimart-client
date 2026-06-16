import { Navigate } from "react-router";
import useAuthContext from "../hook/useAuthContext";

const PrivateRoute = ({children}) => {
    const {user, } = useAuthContext();
    const token = localStorage.getItem("authTokens");
    if(token && user === null){
           return (<div className="flex justify-center items-center py-10 min-h-screen">
                    <span className="loading loading-spinner loading-xl text-secondary scale-200"></span>
                   </div>)
    }
    return (
        user ? children : <Navigate to={"/login"}></Navigate>
    );
};

export default PrivateRoute;