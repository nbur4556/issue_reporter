import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';

// Utilities
// import ApiConnection from '../../utils/ApiConnection';
// const authConnection = new ApiConnection('/api/authenticate');

const PrivateRoute = ({ isAuthorized, component: Component, ...rest }) => {
    // const [auth, setAuth] = useState({
    //     isAuthenticated: false
    // });

    // // Check for authentication on load
    // useEffect(() => {
    //     if (!authToken) {
    //         setAuth({ isAuthenticated: false });
    //     }

    //     authConnection.getQuery({ urlExtension: `/${authToken}` }).then(({ data }) => {
    //         (data?._id)
    //             ? setAuth({ isAuthenticated: true })
    //             : setAuth({ isAuthenticated: false });

    //     });
    // }, [authToken]);

    return (
        <Route {...rest}>
            {(isAuthorized) ? <Component /> : <Redirect to='/' />}
        </Route>
    );
}

export default PrivateRoute;