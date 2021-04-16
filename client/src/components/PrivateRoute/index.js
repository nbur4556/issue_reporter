import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ isAuthorized, component: Component, ...rest }) => {
    return (
        <Route {...rest}>
            {(isAuthorized) ? <Component /> : <Redirect to='/' />}
        </Route>
    );
}

export default PrivateRoute;