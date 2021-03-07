import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';

// Utilities
import ApiConnection from '../../utils/ApiConnection';
const authConnection = new ApiConnection('/api/authenticate');

const PrivateRoute = ({ component: Component, ...rest }) => {
    const [auth, setAuth] = useState({
        isAuthenticated: false,
        redirectToReferer: false
    });

    // Check for authentication on load
    useEffect(() => {
        const authToken = localStorage.getItem('authToken');

        if (!authToken) {
            setAuth({ isAuthenticated: false, redirectToReferer: true });
        }

        authConnection.getQuery({ urlExtension: `/${authToken}` }).then(({ data }) => {
            (data?._id)
                ? setAuth({ isAuthenticated: true, redirectToReferer: false })
                : setAuth({ isAuthenticated: false, redirectToReferer: true });

        });
    }, []);

    return (
        <Route {...rest}>
            {(auth.redirectToReferer) ? <Redirect to='/' /> : null}
            {(auth.isAuthenticated) ? <Component /> : null}
        </Route>
    );
}

export default PrivateRoute;