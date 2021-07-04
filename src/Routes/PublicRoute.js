import React from "react"
import { Route, Redirect } from "react-router-dom"
import { useSelector } from "react-redux";



const PublicRoute = ({ children, ...rest }) => {
    const userId = useSelector(state => state.auth.userId)
    return (
        <Route {...rest} >
            {userId ? <Redirect to="/" /> : children  }
        </Route>
    )
}

export default PublicRoute