import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';

// Utilities
import ApiConnection from '../../utils/ApiConnection';
const authConnection = new ApiConnection('/api/authenticate');

const PrivateRoute = ({ authToken, component: Component, ...rest }) => {
    const [auth, setAuth] = useState({
        isAuthenticated: false,
        redirectToReferer: false,
        data: null
    });

    // Check for authentication on load
    useEffect(() => {
        if (!authToken) {
            setAuth({ isAuthenticated: false, redirectToReferer: true });
        }

        authConnection.getQuery({ urlExtension: `/${authToken}` }).then(({ data }) => {
            (data?._id)
                ? setAuth({ ...auth, isAuthenticated: true, redirectToReferer: false, data: data })
                : setAuth({ ...auth, isAuthenticated: false, redirectToReferer: true });

        });
    }, [authToken]);

    return (
        <Route {...rest}>
            {(auth.redirectToReferer) ? <Redirect to='/' /> : null}
            {(auth.isAuthenticated) ? <Component authId={auth.data._id} /> : null}
        </Route>
    );
}

export default PrivateRoute;