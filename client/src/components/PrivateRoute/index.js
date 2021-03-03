import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';

// Utilities
import ApiConnection from '../../utils/ApiConnection';
const authConnection = new ApiConnection('/api/authenticate');

const PrivateRoute = ({ component: Component, ...rest }) => {

    const [isAuthenticated, setIsAuthenticated] = useState(true);

    useEffect(() => {
        authenticate();
    })

    // Check if user is authenticated
    const authenticate = function () {
        const authToken = localStorage.getItem('authToken');

        console.log(authToken);

        authConnection.getQuery({ urlExtension: `/${authToken}` }).then(data => {
            console.log(data._id);

            if (data._id) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
        });
    }

    return (
        <Route {...rest}>
            {(isAuthenticated) ? <Component /> : <Redirect to='/' />}
        </Route>
    );
}

export default PrivateRoute;