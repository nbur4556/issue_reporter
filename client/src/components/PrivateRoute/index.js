import { PromiseProvider } from 'mongoose';
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const isAuthenticated = false;

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest}>
            {(isAuthenticated === true) ? <Component /> : <Redirect to='/' />}
        </Route>
    );
}

export default PrivateRoute;