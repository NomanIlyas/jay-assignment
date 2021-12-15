
import React from 'react';
import { Route, Redirect } from "react-router-dom";

const GuardedRoute = ({ component: Component,prop, auth, ...rest }) => (
    <Route {...rest} render={(props) => (
        auth
            ? <Component {...props} {...prop} />
            : <Redirect to='/login' />
    )} />
)

export default GuardedRoute;