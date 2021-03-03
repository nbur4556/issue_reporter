import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const isAuthenticated = false;

// Check for Authentication

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest}>
            {(isAuthenticated === true) ? <Component /> : <Redirect to='/' />}
        </Route>
    );
}

export default PrivateRoute;