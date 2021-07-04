import React from "react"
import { Route, Redirect } from "react-router-dom"
import { useSelector } from "react-redux";



const PrivateRoute = ({ children, ...rest }) => {
    const userId = useSelector(state => state.auth.userId)
    return (
        <Route {...rest} >
            {userId ? children : <Redirect to="/" />}
        </Route>
    )
}

export default PrivateRoute