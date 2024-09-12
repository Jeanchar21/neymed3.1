import { Navigate } from "react-router-dom"

import { AuthContext } from "./Authrapper";

import { useContext } from "react";

export function PrivateRoute({ children }){
    const {isAuth} = useContext(AuthContext);

    return isAuth ? children : <Navigate to="/login"/>
}

export function PrivateLogin({ children }){
    const {token} = useContext(AuthContext);

    return token ? <Navigate to="/"/> : children
}